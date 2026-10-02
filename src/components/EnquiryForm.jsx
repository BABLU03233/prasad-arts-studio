import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, ImagePlus, MessageCircle, Phone, X } from 'lucide-react';
import {
  CONTACT_PHONE, FIELD_LIMITS, INITIAL_ENQUIRY, SERVICES,
  buildEnquiryMessage, buildWhatsAppUrl, validateEnquiry, validateReferenceImage,
} from '../lib/enquiry.mjs';
import './enquiry.css';

const LABELS = {
  name: 'Your name', phone: 'Phone number', service: 'What are we creating?',
  date: 'When do you need it?', location: 'Project location', budget: 'Approximate budget',
  whatsapp: 'WhatsApp number', email: 'Email address', message: 'Tell us about your idea',
  reference: 'Reference image',
};
const OPTIONAL_FIELDS = ['date', 'location', 'budget', 'whatsapp', 'email', 'message', 'reference'];

export default function EnquiryForm({ selectedService = '', selectedServiceVersion = 0 }) {
  const uid = useId();
  const [fields, setFields] = useState({ ...INITIAL_ENQUIRY, service: SERVICES.includes(selectedService) ? selectedService : '' });
  const [errors, setErrors] = useState({});
  const [submissionCount, setSubmissionCount] = useState(0);
  const [prepared, setPrepared] = useState(null);
  const [referenceFile, setReferenceFile] = useState(null);
  const [referenceError, setReferenceError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const errorSummaryRef = useRef(null);
  const reviewHeadingRef = useRef(null);
  const firstFieldRef = useRef(null);
  const fileInputRef = useRef(null);
  const focusOnEditRef = useRef(false);

  useEffect(() => {
    if (SERVICES.includes(selectedService)) {
      setFields((previous) => ({ ...previous, service: selectedService }));
      setErrors((previous) => { const next = { ...previous }; delete next.service; return next; });
      setPrepared(null);
    }
  }, [selectedService, selectedServiceVersion]);

  useEffect(() => {
    if (!referenceFile) { setPreviewUrl(''); return undefined; }
    const url = URL.createObjectURL(referenceFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [referenceFile]);

  useEffect(() => {
    if (prepared) reviewHeadingRef.current?.focus();
    else if (focusOnEditRef.current) {
      firstFieldRef.current?.focus();
      focusOnEditRef.current = false;
    }
  }, [prepared]);

  useEffect(() => {
    if (submissionCount > 0) errorSummaryRef.current?.focus();
  }, [submissionCount]);

  function updateField(event) {
    const { name, value } = event.target;
    setFields((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name]) return previous;
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  function handleReference(event) {
    const file = event.target.files?.[0] || null;
    const error = validateReferenceImage(file);
    setReferenceError(error);
    setReferenceFile(error ? null : file);
    setErrors((previous) => { const next = { ...previous }; delete next.reference; return next; });
  }

  function removeReference() {
    setReferenceFile(null);
    setReferenceError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors((previous) => { const next = { ...previous }; delete next.reference; return next; });
  }

  function prepareEnquiry(event) {
    event.preventDefault();
    const result = validateEnquiry(fields);
    const nextErrors = { ...result.errors };
    if (referenceError) nextErrors.reference = referenceError;
    setErrors(nextErrors);
    setSubmissionCount((count) => count + 1);
    if (Object.keys(nextErrors).length > 0) {
      if (OPTIONAL_FIELDS.some((field) => nextErrors[field])) setDetailsOpen(true);
      return;
    }
    setFields(result.values);
    setPrepared({
      message: buildEnquiryMessage(result.values, referenceFile?.name),
      url: buildWhatsAppUrl(result.values, referenceFile?.name),
    });
  }

  function focusField(event, field) {
    event.preventDefault();
    if (OPTIONAL_FIELDS.includes(field)) setDetailsOpen(true);
    requestAnimationFrame(() => document.getElementById(`${uid}-${field}`)?.focus());
  }

  function inputProps(name, options = {}) {
    const error = name === 'reference' ? referenceError || errors.reference : errors[name];
    return {
      id: `${uid}-${name}`, name, value: fields[name], onChange: updateField,
      maxLength: FIELD_LIMITS[name], 'aria-invalid': error ? 'true' : undefined,
      'aria-describedby': error ? `${uid}-${name}-error` : undefined,
      ...options,
    };
  }

  function fieldError(name) {
    return errors[name] ? <span className="enquiry-field-error" id={`${uid}-${name}-error`}>{errors[name]}</span> : null;
  }

  if (prepared) {
    return (
      <div className="enquiry enquiry-review">
        <span className="enquiry-review-icon" aria-hidden="true"><Check size={23} strokeWidth={1.5} /></span>
        <h3 ref={reviewHeadingRef} tabIndex={-1}>Your idea is ready to share.</h3>
        <p>Review your enquiry, then open WhatsApp and tap send to start the conversation.</p>
        <div className="enquiry-message" role="region" tabIndex={0} aria-label="Your prepared enquiry">{prepared.message}</div>
        {referenceFile && <p className="enquiry-reference-reminder"><ImagePlus size={18} aria-hidden="true" />Remember to attach your reference image in WhatsApp. It is not sent automatically.</p>}
        <a className="enquiry-primary" href={prepared.url} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={19} aria-hidden="true" /> Open WhatsApp &amp; send <ArrowUpRight size={18} aria-hidden="true" />
          <span className="enquiry-sr-only"> (opens in a new tab)</span>
        </a>
        <div className="enquiry-review-actions">
          <button type="button" className="enquiry-text-button" onClick={() => { focusOnEditRef.current = true; setPrepared(null); }}>Edit my enquiry</button>
          <a href={`tel:+${CONTACT_PHONE}`}><Phone size={15} aria-hidden="true" /> Prefer a call?</a>
        </div>
        <p className="enquiry-privacy">Nothing has been sent yet. WhatsApp will open with your message ready for you to send.</p>
      </div>
    );
  }

  return (
    <form className="enquiry" onSubmit={prepareEnquiry} noValidate aria-label="Project enquiry">
      <p className="enquiry-intro">A small idea or a grand vision. Let’s make it real.</p>
      {Object.keys(errors).length > 0 && (
        <div className="enquiry-error-summary" ref={errorSummaryRef} tabIndex={-1} role="alert">
          <p>Please check these details:</p>
          <ul>{Object.entries(errors).map(([field, error]) => <li key={field}>{field === 'website' ? error : <a href={`#${uid}-${field}`} onClick={(event) => focusField(event, field)}>{LABELS[field]}: {error}</a>}</li>)}</ul>
        </div>
      )}

      <div className="enquiry-grid">
        <div className="enquiry-field">
          <label htmlFor={`${uid}-name`}>Your name <span aria-hidden="true">*</span></label>
          <input {...inputProps('name', { required: true, autoComplete: 'name', placeholder: 'Your full name', ref: firstFieldRef })} />
          {fieldError('name')}
        </div>
        <div className="enquiry-field">
          <label htmlFor={`${uid}-phone`}>Phone number <span aria-hidden="true">*</span></label>
          <input {...inputProps('phone', { required: true, type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: 'Your 10-digit mobile number' })} />
          {fieldError('phone')}
        </div>
        <div className="enquiry-field enquiry-full">
          <label htmlFor={`${uid}-service`}>What are we creating? <span aria-hidden="true">*</span></label>
          <div className="enquiry-select-wrap">
            <select {...inputProps('service', { required: true })}>
              <option value="">Choose a service</option>
              {SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
            </select>
            <ChevronDown size={17} aria-hidden="true" />
          </div>
          {fieldError('service')}
        </div>
      </div>

      <details className="enquiry-details" open={detailsOpen} onToggle={(event) => setDetailsOpen(event.currentTarget.open)}>
        <summary><span>Add a little more detail <small>(optional)</small></span><ChevronDown size={17} aria-hidden="true" /></summary>
        <div className="enquiry-grid enquiry-optional">
          <div className="enquiry-field">
            <label htmlFor={`${uid}-date`}>When do you need it?</label>
            <input {...inputProps('date', { type: 'date' })} />
            {fieldError('date')}
          </div>
          <div className="enquiry-field">
            <label htmlFor={`${uid}-location`}>Project location</label>
            <input {...inputProps('location', { autoComplete: 'address-level2', placeholder: 'City or area' })} />
            {fieldError('location')}
          </div>
          <div className="enquiry-field enquiry-full">
            <label htmlFor={`${uid}-budget`}>Approximate budget</label>
            <div className="enquiry-select-wrap">
              <select {...inputProps('budget')}>
                <option value="">Choose a range, if you have one</option>
                <option>Under ₹10,000</option>
                <option>₹10,000 – ₹25,000</option>
                <option>₹25,000 – ₹50,000</option>
                <option>₹50,000 – ₹1,00,000</option>
                <option>₹1,00,000 and above</option>
                <option>Please help me estimate</option>
              </select>
              <ChevronDown size={17} aria-hidden="true" />
            </div>
            {fieldError('budget')}
          </div>
          <div className="enquiry-field">
            <label htmlFor={`${uid}-whatsapp`}>WhatsApp number</label>
            <input {...inputProps('whatsapp', { type: 'tel', autoComplete: 'section-whatsapp tel', inputMode: 'tel', placeholder: 'If different from above' })} />
            {fieldError('whatsapp')}
          </div>
          <div className="enquiry-field">
            <label htmlFor={`${uid}-email`}>Email address</label>
            <input {...inputProps('email', { type: 'email', autoComplete: 'email', placeholder: 'you@example.com' })} />
            {fieldError('email')}
          </div>
          <div className="enquiry-field enquiry-full">
            <label htmlFor={`${uid}-message`}>Tell us about your idea</label>
            <textarea {...inputProps('message', { rows: 4, placeholder: 'The occasion, a theme, dimensions, or anything you have in mind…' })} />
            {fieldError('message')}
          </div>
          <div className="enquiry-field enquiry-full">
            <label htmlFor={`${uid}-reference`}>Have a reference image?</label>
            <input id={`${uid}-reference`} name="reference" ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleReference} aria-invalid={referenceError || errors.reference ? 'true' : undefined} aria-describedby={`${uid}-reference-help${referenceError || errors.reference ? ` ${uid}-reference-error` : ''}`} />
            <span className="enquiry-field-hint" id={`${uid}-reference-help`}>JPG, PNG, or WebP · Up to 8 MB. Preview it here, then attach it yourself in WhatsApp.</span>
            {(referenceError || errors.reference) && <span className="enquiry-field-error" id={`${uid}-reference-error`} role="alert">{referenceError || errors.reference}</span>}
            {referenceFile && (
              <div className="enquiry-reference-preview">
                {previewUrl && <img src={previewUrl} alt="Your selected project reference" onError={() => { setReferenceError('This image could not be opened. Please choose another JPG, PNG, or WebP image.'); setReferenceFile(null); }} />}
                <span>{referenceFile.name}</span>
                <button type="button" onClick={removeReference} aria-label="Remove reference image"><X size={18} /></button>
              </div>
            )}
            {referenceError && <button type="button" className="enquiry-text-button enquiry-clear-file" onClick={removeReference}>Remove this file</button>}
          </div>
        </div>
      </details>

      <div className="enquiry-honeypot" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" value={fields.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
      </div>
      <button className="enquiry-primary" type="submit">Prepare my enquiry <ArrowUpRight size={19} aria-hidden="true" /></button>
      <p className="enquiry-privacy">We’ll prepare your message for WhatsApp. You review it and choose when to send. Your details are not stored on this website.</p>
      <div className="enquiry-alternative"><span>Rather talk it through?</span><a href={`tel:+${CONTACT_PHONE}`}><Phone size={14} aria-hidden="true" /> +91 90597 16009</a></div>
    </form>
  );
}
