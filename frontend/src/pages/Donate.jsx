import React, { useState } from 'react';
import { Heart, Shield, Clock, Users, CheckCircle } from 'lucide-react';
import './Donate.css';

const amounts = [10, 25, 50, 100, 250, 500];
const impactMap = {
    10: 'Provides hygiene kits for 2 families for one month',
    25: 'Funds school materials for one child for a full year',
    50: 'Clean water access for 10 families for one month',
    100: 'Community peace mediation session (travel + facilitation)',
    250: 'One month of emergency food aid for a displaced family',
    500: 'Supports a community WASH committee for six months',
};

export default function Donate() {
    const [selected, setSelected] = useState(50);
    const [custom, setCustom] = useState('');
    const [frequency, setFrequency] = useState('one-time');
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '' });

    const effectiveAmount = custom ? parseFloat(custom) || 0 : selected;
    const impact = impactMap[effectiveAmount] || `Your $${effectiveAmount} donation helps build lasting peace`;

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now redirect to PayPal. Replace with real processor.
        const paypalUrl = `https://www.paypal.com/donate/?business=info%40interpeaceagency.org&amount=${effectiveAmount}&currency_code=USD&item_name=IPASUD+Kenya+Donation`;
        window.open(paypalUrl, '_blank', 'noopener,noreferrer');
        setSubmitted(true);
    };

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="donate-hero">
                <div className="container donate-hero__inner">
                    <div className="donate-hero__badge">
                        <Heart size={16} fill="currentColor" />
                        <span>Support Our Mission</span>
                    </div>
                    <h1>Give the Gift of Peace</h1>
                    <p>
                        Every donation, no matter the size, helps IPASUD Kenya sustain peace processes,
                        deliver clean water, educate children, and build a more stable East Africa.
                    </p>
                    <div className="donate-hero__trust">
                        <span><Shield size={14} /> Secure &amp; Encrypted</span>
                        <span><CheckCircle size={14} /> Registered NGO</span>
                        <span><Clock size={14} /> 100% Transparent</span>
                    </div>
                </div>
            </section>

            {/* Main section */}
            <section className="section donate-main">
                <div className="container donate-container">
                    {/* Form */}
                    <div className="donate-card">
                        <div className="donate-card__header">
                            <h2>Make a Donation</h2>
                            <div className="donate-frequency">
                                <button
                                    className={`donate-freq-btn ${frequency === 'one-time' ? 'donate-freq-btn--active' : ''}`}
                                    onClick={() => setFrequency('one-time')}
                                >
                                    One-time
                                </button>
                                <button
                                    className={`donate-freq-btn ${frequency === 'monthly' ? 'donate-freq-btn--active' : ''}`}
                                    onClick={() => setFrequency('monthly')}
                                >
                                    Monthly
                                </button>
                            </div>
                        </div>

                        {/* Amounts */}
                        <div className="donate-amounts">
                            {amounts.map(amt => (
                                <button
                                    key={amt}
                                    className={`donate-amount-btn ${selected === amt && !custom ? 'donate-amount-btn--active' : ''}`}
                                    onClick={() => { setSelected(amt); setCustom(''); }}
                                    aria-pressed={selected === amt && !custom}
                                >
                                    ${amt}
                                </button>
                            ))}
                            <div className="donate-custom-wrap">
                                <span className="donate-custom-prefix">$</span>
                                <input
                                    type="number"
                                    placeholder="Custom"
                                    className="donate-custom-input"
                                    value={custom}
                                    min={1}
                                    onChange={e => setCustom(e.target.value)}
                                    aria-label="Custom donation amount"
                                />
                            </div>
                        </div>

                        {/* Impact */}
                        <div className="donate-impact-msg" aria-live="polite">
                            <span className="donate-impact-icon">🕊️</span>
                            <p><strong>${effectiveAmount}</strong> — {impact}</p>
                        </div>

                        {/* Form fields */}
                        <form onSubmit={handleSubmit} className="donate-form">
                            <div className="donate-form__row">
                                <div className="donate-form__field">
                                    <label htmlFor="donor-name">Full Name</label>
                                    <input
                                        id="donor-name"
                                        type="text"
                                        placeholder="Your full name"
                                        required
                                        value={form.name}
                                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    />
                                </div>
                                <div className="donate-form__field">
                                    <label htmlFor="donor-email">Email Address</label>
                                    <input
                                        id="donor-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        value={form.email}
                                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn donate-submit-btn" id="donate-submit-btn">
                                <Heart size={20} fill="currentColor" />
                                {frequency === 'monthly'
                                    ? `Give $${effectiveAmount}/month via PayPal`
                                    : `Donate $${effectiveAmount} Now via PayPal`}
                            </button>

                            <p className="donate-form__note">
                                You'll be redirected to PayPal's secure payment gateway.
                                IPASUD Kenya does not store your payment details.
                            </p>

                            {submitted && (
                                <div className="donate-success" role="status">
                                    <CheckCircle size={20} />
                                    <span>Thank you! Please complete your donation in the PayPal window.</span>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Sidebar */}
                    <aside className="donate-sidebar">
                        <div className="donate-sidebar__card">
                            <h3>Why Donate?</h3>
                            <ul className="donate-sidebar__list">
                                {[
                                    'Sustain peace mediation across 3 countries',
                                    'Fund clean water for 450,000+ people',
                                    'Support 2,500+ children in education',
                                    'Empower women in peacebuilding roles',
                                    'Build climate-resilient communities',
                                ].map((item, i) => (
                                    <li key={i}><CheckCircle size={15} color="var(--secondary)" /> {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="donate-sidebar__card donate-sidebar__card--stats">
                            <div className="donate-stat">
                                <span className="donate-stat__n">95%</span>
                                <span>Goes directly to programmes</span>
                            </div>
                            <div className="donate-stat">
                                <span className="donate-stat__n">100+</span>
                                <span>Global partners trust us</span>
                            </div>
                            <div className="donate-stat">
                                <span className="donate-stat__n">1M+</span>
                                <span>People impacted since founding</span>
                            </div>
                        </div>
                        <div className="donate-sidebar__card donate-sidebar__card--other">
                            <h4>Other Ways to Give</h4>
                            <p><strong>Bank Transfer:</strong> Contact us for wire transfer details</p>
                            <p><strong>Volunteer:</strong> <a href="/contact">Join our team</a></p>
                            <p><strong>In-Kind:</strong> Donate equipment or supplies</p>
                            <p className="donate-sidebar__contact">
                                Questions? <a href="mailto:info@interpeaceagency.org">info@interpeaceagency.org</a>
                            </p>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
