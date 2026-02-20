import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import './Contact.css';

const BACKEND_URL = 'http://localhost:8000';

const subjects = [
    'General Inquiry',
    'Partnership Opportunities',
    'Donation & Funding',
    'Volunteering',
    'Media & Press',
    'Programme Information',
    'Employment',
    'Other',
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', org: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const validate = () => {
        if (!form.name.trim()) return 'Please enter your full name.';
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
        if (!form.subject) return 'Please select a subject.';
        if (!form.message.trim() || form.message.trim().length < 20) return 'Please enter a message of at least 20 characters.';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const validationError = validate();
        if (validationError) { setError(validationError); return; }

        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    subject: form.subject,
                    message: `${form.org ? `Organisation: ${form.org}\nPhone: ${form.phone || 'N/A'}\n\n` : ''}${form.message}`,
                }),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                // Backend responded but with error
                const data = await res.json().catch(() => ({}));
                setError(data.detail || 'Something went wrong. Please try emailing us directly at info@interpeaceagency.org');
            }
        } catch {
            // Backend not reachable — fall back to mailto
            const mailtoLink = `mailto:info@interpeaceagency.org?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
                `Name: ${form.name}\nEmail: ${form.email}${form.phone ? '\nPhone: ' + form.phone : ''}${form.org ? '\nOrg: ' + form.org : ''}\n\n${form.message}`
            )}`;
            window.location.href = mailtoLink;
            // Still show success since we redirected to email
            setSubmitted(true);
        }
        setLoading(false);
    };

    return (
        <main id="main-content">
            <section className="page-hero contact-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Get In Touch</span>
                    <h1>Contact Us</h1>
                    <p>We'd love to hear from you — whether you're interested in partnering, donating, or learning more about our work.</p>
                </div>
            </section>

            <section className="section contact-section">
                <div className="container contact-grid">
                    {/* Form */}
                    <div className="contact-form-card">
                        <h2>Send a Message</h2>
                        {submitted ? (
                            <div className="contact-success">
                                <CheckCircle size={52} color="var(--secondary)" />
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out to IPASUD Kenya. We take every message seriously and our team will get back to you within 2 business days.</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>For urgent matters, call us directly at <a href="tel:+254716397042">+254 716 397 042</a></p>
                                <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', org: '', subject: '', message: '' }); }}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form" noValidate>
                                <div className="contact-form__row">
                                    <div className="contact-form__field">
                                        <label htmlFor="c-name">Full Name *</label>
                                        <input id="c-name" name="name" type="text" placeholder="Your full name" required value={form.name} onChange={handleChange} />
                                    </div>
                                    <div className="contact-form__field">
                                        <label htmlFor="c-email">Email Address *</label>
                                        <input id="c-email" name="email" type="email" placeholder="your@email.com" required value={form.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="contact-form__row">
                                    <div className="contact-form__field">
                                        <label htmlFor="c-phone">Phone Number</label>
                                        <input id="c-phone" name="phone" type="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={handleChange} />
                                    </div>
                                    <div className="contact-form__field">
                                        <label htmlFor="c-org">Organisation / Company</label>
                                        <input id="c-org" name="org" type="text" placeholder="Your organisation (optional)" value={form.org} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="contact-form__field">
                                    <label htmlFor="c-subject">Subject *</label>
                                    <select id="c-subject" name="subject" required value={form.subject} onChange={handleChange}>
                                        <option value="">— Select a subject —</option>
                                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="contact-form__field">
                                    <label htmlFor="c-message">Message *</label>
                                    <textarea id="c-message" name="message" rows={7} placeholder="Tell us more about your enquiry..." required value={form.message} onChange={handleChange} />
                                    <span className="contact-form__char-count">{form.message.length} characters</span>
                                </div>

                                {error && (
                                    <div className="contact-error">
                                        <AlertCircle size={16} />
                                        {error}
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary contact-submit" id="contact-submit-btn" disabled={loading}>
                                    {loading ? (
                                        <><span className="contact-spinner" />Sending…</>
                                    ) : (
                                        <><Send size={16} /> Send Message</>
                                    )}
                                </button>
                                <p className="contact-form__note">
                                    ✅ We typically respond within 2 business days. For urgent matters, call <a href="tel:+254716397042">+254 716 397 042</a>.
                                </p>
                            </form>
                        )}
                    </div>

                    {/* Info */}
                    <aside className="contact-info">
                        <div className="contact-info__card">
                            <h3>Get In Touch</h3>
                            <div className="contact-info__items">
                                <div className="contact-info__item">
                                    <div className="contact-info__icon"><MapPin size={20} /></div>
                                    <div>
                                        <strong>Headquarters</strong>
                                        <p>Lodwar Town, Turkana County<br />Kenya, East Africa</p>
                                    </div>
                                </div>
                                <div className="contact-info__item">
                                    <div className="contact-info__icon"><Mail size={20} /></div>
                                    <div>
                                        <strong>Email</strong>
                                        <p><a href="mailto:info@interpeaceagency.org">info@interpeaceagency.org</a></p>
                                    </div>
                                </div>
                                <div className="contact-info__item">
                                    <div className="contact-info__icon"><Phone size={20} /></div>
                                    <div>
                                        <strong>Phone</strong>
                                        <p><a href="tel:+254716397042">+254 716 397 042</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-info__social">
                                <h4>Follow Us</h4>
                                <div className="contact-social-links">
                                    {[
                                        { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
                                        { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
                                        { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
                                        { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' },
                                    ].map(s => (
                                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="contact-social-link">
                                            <s.icon size={18} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="contact-map">
                            <iframe
                                title="IPASUD Kenya Location — Lodwar, Turkana County"
                                src="https://www.openstreetmap.org/export/embed.html?bbox=35.56%2C3.10%2C35.64%2C3.14&layer=mapnik&marker=3.12%2C35.60"
                                width="100%"
                                height="260"
                                loading="lazy"
                                style={{ border: 0, borderRadius: '12px' }}
                            />
                            <a
                                href="https://www.openstreetmap.org/?mlat=3.12&mlon=35.60#map=14/3.12/35.60"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-map-link"
                            >
                                View larger map →
                            </a>
                        </div>

                        {/* Quick contact CTA */}
                        <div className="contact-faq-card">
                            <h4>Frequently Asked</h4>
                            {[
                                { q: 'How can I volunteer?', a: 'Send an email with your CV and area of interest to info@interpeaceagency.org' },
                                { q: 'How do I donate?', a: 'Visit our Donate page for payment options including mobile money and bank transfer.' },
                                { q: 'Can organisations partner with you?', a: 'Yes — select "Partnership Opportunities" above and tell us about your organisation.' },
                            ].map((faq, i) => (
                                <div key={i} className="contact-faq-item">
                                    <strong>{faq.q}</strong>
                                    <p>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
