import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowLeft, Phone, Menu, Plus, Minus, MapPin, Pause, Play, Star } from 'lucide-react';
import Modal from './components/Modal.jsx';
import EnquiryForm from './components/EnquiryForm.jsx';
import { useSiteMotion } from './lib/motion.js';
import { PHONE, PHONE_DISPLAY, EMAIL, GOOGLE_PROFILE, whatsappUrl, projects, services, positioning, processSteps, faqs, CATEGORIES, artworkProps } from './data.js';

export function WhatsAppIcon({ className = '' }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4.1Z"/><path d="M8.5 7.8c.4-.4.8-.1 1 .3l.8 1.7c.2.4-.1.6-.5 1 .7 1.5 1.7 2.4 3.3 3.1l.9-1c.3-.3.5-.3.8-.1l1.7.8c.4.2.5.5.3.9-.5 1.1-1.3 1.6-2.4 1.3-3.5-.8-6.3-3.7-6.8-6.2-.1-.7.3-1.3.9-1.8Z"/></svg>;
}

const Star6 = ({ className = '' }) => <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 2v36M2 20h36M7 7l26 26M7 33 33 7" stroke="currentColor" strokeWidth="1.1" /></svg>;

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#home"><svg className="brand-symbol" viewBox="0 0 44 46" fill="none" aria-hidden="true"><path d="M3 41 21 5l20 36M11 27h23M21 5v36" stroke="currentColor" strokeWidth="1.3"/><circle cx="36" cy="7" r="3" fill="currentColor"/></svg><span><strong>PRASAD ARTS</strong><small>THERMOCOL &amp; 3D WORKS</small></span></a>;
}

const navItems = [['work', 'Work'], ['services', 'Services'], ['studio', 'Studio'], ['process', 'Process'], ['faq', 'FAQ']];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > [id]').forEach(el => observer.observe(el));
    const resize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', resize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize); observer.disconnect(); };
  }, []);
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navItems.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}</nav>
        <a className="header-cta" href="#enquire">Get a quote <ArrowUpRight size={16} /></a>
        <button type="button" className="icon-button mobile-menu-button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu /></button>
      </div>
    </header>
    <Modal open={menuOpen} onClose={() => setMenuOpen(false)} titleId="menu-title" className="menu-modal"><p id="menu-title" className="eyebrow">EXPLORE PRASAD ARTS</p><nav aria-label="Mobile navigation">{[...navItems, ['enquire', 'Get a quote']].map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight /></a>)}</nav><a className="menu-phone" href={`tel:${PHONE}`}><Phone size={17} /> {PHONE_DISPLAY}</a></Modal>
  </>;
}

function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <span className="hero-ghost" aria-hidden="true">3D</span>
    <div className="hero-main shell">
      <div className="hero-copy"><p className="eyebrow hero-enter"><span className="tiny-rule" /> IMAGINED BY YOU. CRAFTED BY US.</p>
        <h1 id="hero-title"><span className="hero-line"><span className="line-inner">Ideas,</span></span><span className="hero-line"><span className="line-inner">brought</span></span><span className="hero-line"><span className="line-inner">to <em>life.</em> <Star6 className="headline-spark" /></span></span></h1>
        <p className="hero-description hero-enter">From a simple block to a world of possibility.<br className="desktop-break" /> Custom thermocol sculptures, event creations<br className="desktop-break" /> and artistic spaces, made in Hyderabad.</p>
        <div className="hero-actions hero-enter"><a className="button button-dark" href="#enquire">Bring us your idea <ArrowUpRight size={18} /></a><a className="hero-whatsapp text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp us</a></div>
        <div className="hero-footnote hero-enter"><span className="location-dot" /> AN ART STUDIO IN HYDERABAD, INDIA</div>
      </div>
      <div className="hero-art">
        <div className="art-image-wrap"><img className="hero-photo" data-parallax="0.05" src="images/hero/eagle-studio-square-960w.webp" srcSet="images/hero/eagle-studio-square-480w.webp 480w, images/hero/eagle-studio-square-960w.webp 960w" sizes="(max-width: 640px) 92vw, 44vw" alt="White thermocol eagle sculpture, digitally styled against a neutral studio background" width="1254" height="1254" fetchPriority="high" /><div className="art-shade" /><div className="art-corner"><span>THE ART OF</span><span>seeing<br /><em>possibility.</em></span></div><span className="art-side-label">MATERIAL → IMAGINATION → FORM</span></div>
        <div className="art-caption"><span><span className="caption-number">01 /</span> A STUDY IN FORM</span><span>Digitally styled. <ArrowUpRight size={14} /></span></div>
        <a className="art-seal" href="#work" aria-label="Made to stand out — see our work"><span aria-hidden="true">MADE TO</span><Star6 className="seal-star" /><span aria-hidden="true">STAND OUT</span></a>
      </div>
    </div>
    <div className="hero-bottom shell"><a href="#work" className="scroll-link"><span className="scroll-circle"><ArrowDown size={16} /></span>SCROLL TO DISCOVER</a><p>Small details. <em>Extraordinary dimensions.</em></p><span className="hero-index">EST. IN IMAGINATION</span></div>
  </section>;
}

function Marquee() {
  const words = ['Thermocol 3D sculptures', 'Sculpted wall reliefs', 'Event & movie sets', 'Devotional art', 'Murals & paint', 'Custom installations'];
  const run = [...words, ...words];
  return <div className="marquee" role="img" aria-label="What we make: thermocol 3D sculptures, sculpted wall reliefs, event and movie sets, devotional art, murals and paint, and custom installations">
    <div className="marquee-track" aria-hidden="true">{run.map((w, i) => <span key={i} className="marquee-item">{w}<Star6 className="marquee-star" /></span>)}</div>
  </div>;
}

function Statement() {
  return <section className="statement section-space" aria-label="Our philosophy">
    <div className="shell statement-grid">
      <div className="statement-copy reveal">
        <p className="eyebrow">THE IDEA BEHIND THE WORK</p>
        <h2>Not just thermocol.<br />A material. A vision.<br /><em>A form.</em></h2>
        <div className="statement-body">
          <span className="studio-rule" />
          <p>Every project begins with an idea and ends as something people can see, touch and remember. We work the simplest of materials into shapes that hold a room — and a moment.</p>
        </div>
      </div>
      <figure className="statement-figure reveal">
        <div className="statement-image"><img data-parallax="0.09" {...artworkProps('feather-relief', '(max-width: 640px) 80vw, 32vw')} alt="A single oversized white feather sculpted in relief" loading="lazy" /></div>
        <figcaption><span>From material to form</span><span>A feather, in relief.</span></figcaption>
      </figure>
    </div>
  </section>;
}

function Portfolio({ onEnquire }) {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState(null);
  const [showOriginal, setShowOriginal] = useState(false);
  useEffect(() => setShowOriginal(false), [selected, filter]);

  const visible = filter === 'All work' ? projects : projects.filter(p => p.category === filter);
  const isAll = filter === 'All work';
  const feature = isAll ? visible[0] : null;
  const wall = isAll ? visible.slice(1) : visible;
  const selectedProject = selected === null ? null : visible[selected];
  const go = (direction) => setSelected(index => (index + direction + visible.length) % visible.length);

  const card = (project, index) => (
    <button className={`project-card shape-${project.shape} reveal`} style={{ '--i': index % 6 }} key={project.id} onClick={() => setSelected(visible.indexOf(project))} aria-label={`View ${project.title}, ${project.medium}`}>
      <div className="project-image"><img {...artworkProps(project.image, '(max-width: 640px) 92vw, (max-width: 1100px) 44vw, 30vw')} alt={project.alt} loading="lazy" decoding="async" />
        <span className="project-view"><ArrowUpRight size={22} /></span>
        <span className="project-tag">{project.category}</span>
        {project.originalImage && <span className="image-edit-note">STUDIO EDIT · ORIGINAL IN VIEWER</span>}
      </div>
      <div className="project-caption"><h3>{project.title}</h3><span className="project-medium">{project.medium}</span></div>
    </button>
  );

  return <section className="portfolio section-space" id="work" aria-labelledby="work-title">
    <div className="shell">
      <div className="section-heading reveal"><div><p className="eyebrow">01 / Selected work</p><h2 id="work-title">A world of <em>possibilities.</em></h2></div><p>Different materials. Different stories.<br />The same love for bringing an idea to life.</p></div>
      <div className="portfolio-toolbar"><div className="filters" role="group" aria-label="Filter artwork">{CATEGORIES.map(category => <button type="button" key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}{filter === category && <span className="filter-dot" />}</button>)}</div><span className="work-count" aria-live="polite">{String(visible.length).padStart(2, '0')} works</span></div>

      {feature && (
        <button className="project-feature reveal" onClick={() => setSelected(0)} aria-label={`View ${feature.title}, ${feature.medium}`}>
          <div className="feature-image"><img data-parallax="0.06" {...artworkProps(feature.image, '(max-width: 1100px) 100vw, 92vw')} alt={feature.alt} loading="lazy" /></div>
          <div className="feature-copy"><span className="eyebrow">Featured · {feature.category}</span><h3>{feature.title}</h3><p>{feature.description}</p><span className="feature-cta">Open the piece <ArrowUpRight size={18} /></span></div>
        </button>
      )}

      <div className={`portfolio-wall ${isAll ? 'is-all' : 'is-filtered'}`} key={filter}>{wall.map((project, i) => card(project, i))}</div>

      <div className="portfolio-end"><span>Something here sparked an idea?</span><button className="text-link" type="button" onClick={() => onEnquire('')}>Let’s make it yours <ArrowUpRight size={19} /></button></div>
    </div>

    <Modal open={selectedProject !== null} onClose={() => setSelected(null)} titleId="project-title" className="project-modal" onKeyDown={event => { if (event.key === 'ArrowRight') { event.preventDefault(); go(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); go(-1); } }}>{selectedProject && <div><div className="lightbox-image"><img {...artworkProps(showOriginal && selectedProject.originalImage ? selectedProject.originalImage : selectedProject.image, '92vw')} alt={selectedProject.alt} /></div><div className="lightbox-bottom"><div><p className="eyebrow">{selectedProject.medium}</p><h2 id="project-title">{selectedProject.title}</h2><p>{selectedProject.description}</p><a className="text-link" href={whatsappUrl(`Hi Prasad Arts, I saw “${selectedProject.title}” (${selectedProject.medium}) on your website. I would like to discuss a similar custom project.`)} target="_blank" rel="noopener noreferrer">Discuss a similar idea <ArrowUpRight size={18} /></a></div><div className="lightbox-tools">{selectedProject.originalImage && <button type="button" className="text-link original-toggle" aria-pressed={showOriginal} onClick={() => setShowOriginal(!showOriginal)}>{showOriginal ? 'View studio edit' : 'View original photo'}</button>}<div className="lightbox-controls"><button type="button" className="icon-button" onClick={() => go(-1)} aria-label="Previous artwork"><ArrowLeft /></button><span aria-live="polite">{selected + 1} / {visible.length}</span><button type="button" className="icon-button" onClick={() => go(1)} aria-label="Next artwork"><ArrowRight /></button></div></div></div></div>}</Modal>
  </section>;
}

function CtaBand({ eyebrow, title, children, variant = '' }) {
  return <section className={`cta-band ${variant}`} aria-label="Start a conversation"><div className="shell cta-inner reveal"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><div className="cta-actions">{children}</div></div></section>;
}

function Services({ onEnquire }) {
  const [activeService, setActiveService] = useState(0);
  const service = services[activeService];
  return <section className="services section-space" id="services" aria-labelledby="services-title"><div className="shell"><div className="section-heading reveal"><div><p className="eyebrow">02 / What we do</p><h2 id="services-title">Your imagination.<br /><em>Our canvas.</em></h2></div><p>A statement piece. An entire setting.<br />Let’s find the right form for your idea.</p></div><div className="services-layout"><div className="service-art reveal"><img key={service.image} data-parallax="0.05" {...artworkProps(service.image, '(max-width: 900px) 90vw, 36vw')} alt={`${service.label} — example from the studio portfolio`} loading="lazy" /><span className="service-art-label">{service.tag}</span></div><div className="service-list">{services.map((s, index) => <div className={`service-item ${activeService === index ? 'active' : ''}`} key={s.label}><h3><button id={`service-tab-${index}`} type="button" aria-expanded={activeService === index} aria-controls={`service-content-${index}`} onClick={() => setActiveService(index)}><span className="service-number">0{index + 1}</span><span>{s.title}</span>{activeService === index ? <Minus size={20} /> : <Plus size={20} />}</button></h3><div id={`service-content-${index}`} role="region" aria-labelledby={`service-tab-${index}`} hidden={activeService !== index}><p>{s.detail}</p><div className="service-links"><button type="button" className="text-link" onClick={() => onEnquire(s.label)}>Enquire about this <ArrowUpRight size={17} /></button><a className="text-link service-wa" href={whatsappUrl(s.wa)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="wa-mini" /> WhatsApp</a></div></div></div>)}<p className="service-extra">Also creating: false ceilings, wall textures &amp; portrait canvas art.</p></div></div></div></section>;
}

function Positioning() {
  return <section className="positioning section-space" aria-labelledby="why-title"><div className="shell"><div className="section-heading reveal"><div><p className="eyebrow">03 / Why Prasad Arts</p><h2 id="why-title">Made to be <em>seen.</em></h2></div><p>No stock claims. Just the way we work,<br />and what that means for your piece.</p></div><div className="positioning-grid">{positioning.map(([title, body], i) => <article className="positioning-item reveal" style={{ '--i': i }} key={title}><span className="positioning-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>;
}

function Studio() {
  return <section className="studio section-space shell" id="studio" aria-labelledby="studio-title"><div className="studio-copy reveal"><p className="eyebrow">04 / The hands behind the art</p><h2 id="studio-title">Simple material.<br />An open mind.<br /><em>Something remarkable.</em></h2><div className="studio-body"><span className="studio-rule" /><div><p>We’re Prasad Arts, a creative workshop in Hyderabad. Our work moves between thermocol sculptures, sculpted interiors and imaginative event settings.</p><p>It starts with your idea — a shape, a story, a space you want to transform. We bring it into the conversation, explore the detail and give it a form of its own.</p><a className="text-link" href="#enquire">Meet your next creative possibility <ArrowUpRight size={18} /></a></div></div></div><div className="studio-image reveal"><img data-parallax="0.07" {...artworkProps('zebra', '(max-width: 900px) 90vw, 40vw')} alt="A sculpted zebra character taking shape among tools and materials in the workshop" loading="lazy" /><div className="studio-image-caption"><span>FROM OUR WORLD</span><span>Art begins with a little curiosity.</span></div><span className="vertical-caption">THE BEAUTY IS IN THE MAKING.</span></div></section>;
}

const processImages = ['eagle', 'wall-texturing', 'process-model', 'landscape-model'];

function Process() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(Number(entry.target.dataset.step)); }), { rootMargin: '-35% 0px -40% 0px', threshold: 0 });
    ref.current?.querySelectorAll('[data-step]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <section className="process section-space" id="process" aria-labelledby="process-title" ref={ref}><div className="shell process-layout"><div className="process-intro"><p className="eyebrow">05 / From thought to three dimensions</p><h2 id="process-title">Every creation<br />begins with<br /><em>“what if?”</em></h2>
    <div className="process-stage" aria-hidden="true">{processImages.map((img, i) => <img key={img} className={active === i ? 'active' : ''} {...artworkProps(img, '40vw')} alt="" loading="lazy" />)}</div>
    <div className="process-progress" aria-hidden="true">{processSteps.map((_, index) => <span key={index} className={index <= active ? 'active' : ''} />)}</div></div><div className="process-steps">{processSteps.map(([title, heading, description], index) => <article key={title} className={`process-step ${active === index ? 'active' : ''}`} data-step={index}><span className="process-step-number">0{index + 1}</span><div><span className="eyebrow">{title}</span><h3>{heading}</h3><p>{description}</p></div></article>)}</div></div></section>;
}

function Trust() {
  return <section className="trust section-space" aria-labelledby="trust-title"><div className="shell trust-inner"><div className="trust-google reveal"><div className="trust-stars" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={17} fill="currentColor" strokeWidth={0} />)}</div><p className="eyebrow">On Google</p><h2 id="trust-title">See our work &amp;<br /><em>customer feedback.</em></h2><p className="trust-note">Browse the latest photos and reviews on our Google Business Profile, then message us to start your own project.</p><a className="button button-line" href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer">View our Google profile <ArrowUpRight size={17} /></a></div>
    <div className="trust-cta reveal"><p className="eyebrow">Ready when you are</p><h2>Let’s create something<br /><em>unforgettable.</em></h2><div className="trust-actions"><a className="button button-dark" href="#enquire">Request a quote <ArrowUpRight size={18} /></a><a className="hero-whatsapp text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp us</a></div></div></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section className="faq section-space shell" id="faq" aria-labelledby="faq-title"><div className="faq-intro reveal"><p className="eyebrow">A little clarity</p><h2 id="faq-title">Before we<br /><em>begin.</em></h2><p>Every project is different.<br />A conversation is a good place to start.</p><a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp <ArrowUpRight size={17} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><h3><button id={`faq-question-${index}`} type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}>{question}{open === index ? <Minus size={19} /> : <Plus size={19} />}</button></h3><div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} hidden={open !== index}><p>{answer}</p></div></div>)}</div></section>;
}

function Contact({ selectedService, selectedServiceVersion }) {
  return <section className="contact section-space" id="enquire" aria-labelledby="contact-title"><div className="shell contact-layout"><div className="contact-copy"><p className="eyebrow">06 / Good things start with a conversation</p><h2 id="contact-title">Let’s build<br />something people<br /><em>remember.</em></h2><p>A bold idea. A small detail. Something you’ve<br className="desktop-break" /> never seen before. We’d love to hear it.</p><a href={`tel:${PHONE}`} className="contact-number">{PHONE_DISPLAY} <ArrowUpRight size={23} /></a><span className="contact-phone-caption">A QUICK CALL CAN BE THE START OF SOMETHING.</span><div className="contact-location"><MapPin size={19} /><div><strong>Find us in Hyderabad</strong><address>Hyderabad, Telangana, India.<br />Call us for the current workshop address.</address><a className="text-link" href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer">View our Google profile <ArrowUpRight size={15} /></a><small>Please call to arrange your visit.</small></div></div></div><div className="form-panel"><EnquiryForm selectedService={selectedService} selectedServiceVersion={selectedServiceVersion} /></div></div></section>;
}

function Footer({ motionPaused, onMotionToggle, onPrivacy }) {
  return <footer className="site-footer"><div className="shell"><div className="footer-top"><Brand footer /><p>Art has a way of making<br /><em>the ordinary extraordinary.</em></p><a className="text-link" href="#home">Back to the top <ArrowUpRight size={17} /></a></div><div className="footer-links"><nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#services">Services</a><a href="#studio">Studio</a><a href="#faq">FAQ</a><a href="#enquire">Contact</a><a href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer">Google profile</a></nav><a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={14} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Prasad Arts. Crafted with imagination.</span><div><button type="button" onClick={onPrivacy}>Privacy</button><button type="button" onClick={onMotionToggle} aria-pressed={motionPaused}>{motionPaused ? <Play size={13} /> : <Pause size={13} />}{motionPaused ? 'Resume motion' : 'Pause motion'}</button><span>HYDERABAD, INDIA</span></div></div></div></footer>;
}

function FloatingContactBar() {
  return <><aside className="desktop-contact" aria-label="Quick contact"><a href={`tel:${PHONE}`} aria-label={`Call us — Prasad Arts, ${PHONE_DISPLAY}`}><Phone size={18} /><span>Call us</span></a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="floating-whatsapp"><WhatsAppIcon /><span>Let’s talk</span></a></aside><nav className="mobile-contact" aria-label="Quick contact"><a href={`tel:${PHONE}`}><Phone size={17} />Call</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />WhatsApp</a><a href="#enquire">Enquire <ArrowUpRight size={18} /></a></nav></>;
}

export default function App() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedServiceVersion, setSelectedServiceVersion] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  useSiteMotion([]);
  useEffect(() => {
    document.documentElement.classList.toggle('motion-paused', motionPaused);
    return () => document.documentElement.classList.remove('motion-paused');
  }, [motionPaused]);

  function enquire(service) {
    setSelectedService(service);
    setSelectedServiceVersion(version => version + 1);
    const target = document.getElementById('enquire');
    target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches || motionPaused ? 'instant' : 'smooth' });
    const title = document.getElementById('contact-title');
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
  }

  return <><a href="#main" className="skip-link">Skip to content</a><Navbar /><main id="main">
    <Hero />
    <Marquee />
    <Statement />
    <Portfolio onEnquire={enquire} />
    <CtaBand eyebrow="Have a project in mind?" title={<>Start a <em>conversation.</em></>} variant="on-noir"><a className="button button-paper" href="#enquire">Tell us what you need <ArrowUpRight size={18} /></a><a className="hero-whatsapp text-link light" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp us</a></CtaBand>
    <Services onEnquire={enquire} />
    <Positioning />
    <Studio />
    <Process />
    <Trust />
    <FAQ />
    <Contact selectedService={selectedService} selectedServiceVersion={selectedServiceVersion} />
  </main><Footer motionPaused={motionPaused} onMotionToggle={() => setMotionPaused(!motionPaused)} onPrivacy={() => setPrivacyOpen(true)} /><FloatingContactBar />
    <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} titleId="privacy-title" className="privacy-modal"><p className="eyebrow">YOUR INFORMATION</p><h2 id="privacy-title">A note on privacy.</h2><p>The enquiry form prepares a message in your browser. Your details are sent to WhatsApp only when you choose “Open WhatsApp &amp; send”. You then send the message in WhatsApp.</p><p>Reference photos stay in your browser as a preview. Attach your photo separately in WhatsApp if you want to share it. This website does not store form submissions or photos on a server, and does not use analytics or advertising cookies.</p><p>WhatsApp and Google apply their own privacy policies when you visit them. For questions about information you share with Prasad Arts, call <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p></Modal>
  </>;
}
