export const CONTACT_PHONE = '919059716009';

export const SERVICES = Object.freeze([
  'Thermocol 2D & 3D Work',
  'Event & Movie Sets',
  'Wall Murals',
  'Fiber Work',
  'Portrait Canvas Art',
  'Other / discuss idea',
]);

export const FIELD_LIMITS = Object.freeze({
  name: 80,
  phone: 32,
  service: 80,
  date: 10,
  location: 120,
  budget: 80,
  whatsapp: 32,
  email: 254,
  message: 1500,
});

export const INITIAL_ENQUIRY = Object.freeze({
  name: '', phone: '', service: '', date: '', location: '', budget: '',
  whatsapp: '', email: '', message: '', website: '',
});

/** Ten-digit Indian numbers or explicit international numbers, without extensions. */
export function normalizePhone(value) {
  const input = String(value ?? '').trim();
  if (!input || input.length > FIELD_LIMITS.phone || !/^\+?[\d\s().-]+$/.test(input)) return null;
  const digits = input.replace(/\D/g, '');
  if (/^[6-9]\d{9}$/.test(digits) && !input.startsWith('+')) return `+91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits) && !input.startsWith('+')) return `+91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return `+${digits}`;
  if (digits.startsWith('91') && input.startsWith('+')) return null;
  if (input.startsWith('+') && /^[1-9]\d{7,14}$/.test(digits)) return `+${digits}`;
  return null;
}

export function validateEnquiry(input = {}) {
  const values = Object.fromEntries(Object.keys(INITIAL_ENQUIRY).map((field) => [field, String(input[field] ?? '').trim()]));
  const errors = {};

  if (!values.name) errors.name = 'Please enter your name.';
  if (!values.phone) errors.phone = 'Please enter your phone number.';
  else if (!normalizePhone(values.phone)) errors.phone = 'Enter a 10-digit Indian number, or an international number with + and its country code.';
  if (!SERVICES.includes(values.service)) errors.service = 'Please choose the kind of work you have in mind.';
  if (values.whatsapp && !normalizePhone(values.whatsapp)) errors.whatsapp = 'Enter a valid WhatsApp number, including the country code if outside India.';
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.date) {
    const parsed = new Date(`${values.date}T12:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== values.date) {
      errors.date = 'Please choose a valid project date.';
    }
  }
  for (const [field, max] of Object.entries(FIELD_LIMITS)) {
    if (values[field].length > max) errors[field] = `Please keep this field to ${max} characters or fewer.`;
  }
  if (values.website) errors.website = 'We could not prepare this enquiry. Please reload the page and try again.';
  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

export function buildEnquiryMessage(values, referenceName = '') {
  const lines = [
    "Hello Prasad Arts, I'd like to discuss a project.",
    '',
    `Name: ${values.name.trim()}`,
    `Phone: ${normalizePhone(values.phone) || values.phone.trim()}`,
    `Work: ${values.service.trim()}`,
  ];
  const optional = [
    ['Project date', values.date],
    ['Location', values.location],
    ['Approximate budget', values.budget],
    ['WhatsApp number', values.whatsapp ? normalizePhone(values.whatsapp) || values.whatsapp : ''],
    ['Email', values.email],
  ];
  for (const [label, value] of optional) if (value?.trim()) lines.push(`${label}: ${value.trim()}`);
  if (values.message?.trim()) lines.push('', `My idea: ${values.message.trim()}`);
  if (referenceName) lines.push('', `Reference image: ${referenceName} (I will attach this separately in WhatsApp.)`);
  lines.push('', 'Enquiry from the Prasad Arts website.');
  return lines.join('\n');
}

export function buildWhatsAppUrl(values, referenceName = '') {
  return `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(buildEnquiryMessage(values, referenceName))}`;
}

export function validateReferenceImage(file) {
  if (!file) return '';
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return 'Choose a JPG, PNG, or WebP image.';
  if (file.size === 0) return 'This image is empty. Please choose another file.';
  if (file.size > 8 * 1024 * 1024) return 'Choose an image smaller than 8 MB.';
  return '';
}
