import test from 'node:test';
import assert from 'node:assert/strict';
import { CONTACT_PHONE, FIELD_LIMITS, INITIAL_ENQUIRY, SERVICES, normalizePhone, validateEnquiry, buildEnquiryMessage, buildWhatsAppUrl, validateReferenceImage } from '../src/lib/enquiry.mjs';

const valid = { ...INITIAL_ENQUIRY, name: 'Asha Rao', phone: '90597 16009', service: SERVICES[0] };

test('requires name, phone and a supported service', () => {
  assert.deepEqual(Object.keys(validateEnquiry().errors), ['name', 'phone', 'service']);
  assert.equal(validateEnquiry(valid).isValid, true);
  assert.equal(validateEnquiry({ ...valid, service: 'Unsupported' }).isValid, false);
  assert.equal(validateEnquiry({ ...valid, name: '   ' }).isValid, false);
});

test('normalizes Indian formats and explicit international numbers', () => {
  for (const number of ['90597 16009', '+91 90597 16009', '919059716009', '09059716009']) {
    assert.equal(normalizePhone(number), '+919059716009');
  }
  assert.equal(normalizePhone('+44 7700 900123'), '+447700900123');
});

test('rejects invalid, ambiguous and excessive phone numbers', () => {
  for (const number of ['', '123', '1234567890', '+91 1234567890', '+91 905971600', '905971600a', '9059716009 ext 1', '44 7700 900123', '+001234567890', '+1234567890123456', '++919059716009', '9'.repeat(80)]) {
    assert.equal(normalizePhone(number), null, number);
  }
  assert.ok(validateEnquiry({ ...valid, whatsapp: '123' }).errors.whatsapp);
});

test('optional contact and date fields validate without making them required', () => {
  assert.equal(validateEnquiry(valid).isValid, true);
  assert.ok(validateEnquiry({ ...valid, email: 'name@' }).errors.email);
  assert.ok(validateEnquiry({ ...valid, date: '2026-02-30' }).errors.date);
  assert.equal(validateEnquiry({ ...valid, email: 'hello@example.com', date: '2028-02-29' }).isValid, true);
});

test('enforces each field length and trims outside whitespace', () => {
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    assert.match(validateEnquiry({ ...valid, [field]: 'x'.repeat(limit + 1) }).errors[field], /characters or fewer/);
  }
  assert.equal(validateEnquiry({ ...valid, name: '  Asha Rao  ' }).values.name, 'Asha Rao');
  assert.ok(validateEnquiry({ ...valid, website: 'spam.example' }).errors.website);
});

test('encodes Unicode and reserved characters in a complete WhatsApp message', () => {
  const values = { ...valid, name: 'ప్రసాద్ & Asha', message: 'A mural: 50% blue + gold?\nFlowers 🌸', location: 'Hyderabad', budget: 'Please advise', email: 'asha@example.com', whatsapp: '+44 7700 900123', date: '2026-12-12' };
  const url = new URL(buildWhatsAppUrl(values, 'flower & reference.png'));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, `/${CONTACT_PHONE}`);
  assert.equal(url.searchParams.size, 1);
  const message = url.searchParams.get('text');
  assert.equal(message, buildEnquiryMessage(values, 'flower & reference.png'));
  for (const text of ['ప్రసాద్ & Asha', 'Flowers 🌸', '50% blue + gold?', '+919059716009', '2026-12-12', 'Hyderabad', 'Please advise', 'asha@example.com', '+447700900123', 'attach this separately']) assert.ok(message.includes(text), text);
  assert.ok(!buildEnquiryMessage(valid).includes('Email:'));
});

test('only accepts nonempty JPEG, PNG or WebP reference images up to 8 MB', () => {
  for (const type of ['image/jpeg', 'image/png', 'image/webp']) assert.equal(validateReferenceImage({ type, size: 8 * 1024 * 1024 }), '');
  assert.ok(validateReferenceImage({ type: 'image/svg+xml', size: 100 }));
  assert.ok(validateReferenceImage({ type: 'image/jpeg', size: 0 }));
  assert.ok(validateReferenceImage({ type: 'image/jpeg', size: 8 * 1024 * 1024 + 1 }));
  assert.equal(validateReferenceImage(null), '');
});
