import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart as HeartIcon } from 'lucide-react';
import './About.css';

const milestones = [
    { year: '2010', event: 'IPASUD Kenya founded in Lodwar, Turkana County' },
    { year: '2013', event: 'First major peace agreement facilitated between Turkana and Karamojong communities' },
    { year: '2016', event: 'Launched WASH programme reaching 50,000 people with clean water access' },
    { year: '2018', event: 'Officially recognised as an International Non-Governmental Organisation (INGO)' },
    { year: '2020', event: 'COVID-19 emergency response deployed to 20+ vulnerable communities' },
    { year: '2022', event: 'Partnership signed with UNDP to expand peace education programme' },
    { year: '2024', event: 'Crossed 1 million lives impacted milestone across East Africa' },
    { year: '2026', event: 'Launched expanded WASH initiative benefiting 15,000 families (EU-funded)' },
];

const values = [
    { icon: '🕊️', title: 'Peace First', desc: 'Every action we take is guided by the belief that human dignity and peaceful coexistence are non-negotiable.' },
    { icon: '⚖️', title: 'Justice', desc: 'We work to ensure marginalized communities have equal access to resources, rights, and opportunities.' },
    { icon: '🤝', title: 'Local Ownership', desc: 'Communities lead; we support. Our interventions are driven by local needs, knowledge, and solutions.' },
    { icon: '🌍', title: 'Accountability', desc: 'We are transparent with donors, partners, and communities about how we use resources and measure results.' },
    { icon: '♀️', title: 'Gender Equity', desc: 'We actively promote the meaningful participation of women and girls in peacebuilding and decision-making.' },
    { icon: '🌱', title: 'Sustainability', desc: 'We design programmes that build lasting community capacity, not dependency on external aid.' },
];

export default function About() {
    return (
        <main id="main-content">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Our Story</span>
                    <h1>About IPASUD Kenya</h1>
                    <p>
                        Rooted in the Ateker communities of East Africa. Working for peace, justice, and sustainable
                        development since 2010.
                    </p>
                </div>
            </section>

            {/* Mission/Vision/Purpose */}
            <section className="section mvp-section">
                <div className="container mvp-grid">
                    {[
                        { icon: Target, color: '#1A3A5C', label: 'Our Mission', text: 'To facilitate peaceful coexistence among communities by addressing the root causes of conflict through inclusive dialogue, sustainable development, and community empowerment.' },
                        { icon: Eye, color: '#1E6B4F', label: 'Our Vision', text: 'A peaceful, just, and prosperous East Africa where every community lives with dignity, security, and opportunity — free from violence and displacement.' },
                        { icon: HeartIcon, color: '#E8770A', label: 'Our Purpose', text: 'To be the most trusted peacebuilding organisation in the Ateker region, bridging communities divided by conflict and building bridges to a shared future.' },
                    ].map(({ icon: Icon, color, label, text }) => (
                        <div key={label} className="mvp-card" style={{ '--mvp-color': color }}>
                            <div className="mvp-card__icon">
                                <Icon size={28} color={color} />
                            </div>
                            <h3 style={{ color }}>{label}</h3>
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story */}
            <section className="section section--alt about-story">
                <div className="container about-story__inner">
                    <div className="about-story__text">
                        <span className="section__eyebrow">Our Background</span>
                        <h2>From Turkana to East Africa</h2>
                        <div className="divider divider--left" />
                        <p>
                            Inter-Peace Agency for Sustainable Development (IPASUD) Kenya was established in 2010
                            by a group of community leaders and peacebuilders in Turkana County, Kenya. Founded in
                            the heart of one of East Africa's most conflict-affected pastoralist regions, IPASUD Kenya
                            was born out of a recognition that outside interventions often failed to produce lasting peace
                            because they did not engage communities as active participants.
                        </p>
                        <p>
                            The Ateker communities — spanning Turkana (Kenya), Karamojong (Uganda), Toposa (South Sudan),
                            Jie, and Nyangatom (Ethiopia) — share deep cultural ties but have long faced devastating
                            inter-communal violence driven by cattle raiding, competition for water and pasture, and
                            the proliferation of small arms. IPASUD Kenya's founding insight was simple but powerful:
                            <em> lasting peace must come from within.</em>
                        </p>
                        <p>
                            Today, with headquarters in Lodwar and operations across four countries, we have facilitated
                            over 20 peace agreements, provided clean water to 450,000+ people, and touched over 1 million
                            lives through our programmes.
                        </p>
                    </div>
                    <div className="about-story__image">
                        <img
                            src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop"
                            alt="Community leaders in peace dialogue"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section values-section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__eyebrow">What We Stand For</span>
                        <h2 className="section__title">Our Core Values</h2>
                        <div className="divider" />
                    </div>
                    <div className="values-grid">
                        {values.map(v => (
                            <div key={v.title} className="value-card">
                                <span className="value-card__icon" aria-hidden="true">{v.icon}</span>
                                <h4>{v.title}</h4>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section section--alt timeline-section">
                <div className="container">
                    <div className="section__header">
                        <span className="section__eyebrow">Our Journey</span>
                        <h2 className="section__title">Key Milestones</h2>
                        <div className="divider" />
                    </div>
                    <div className="timeline">
                        {milestones.map((m, i) => (
                            <div key={i} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
                                <div className="timeline-item__content">
                                    <span className="timeline-item__year">{m.year}</span>
                                    <p>{m.event}</p>
                                </div>
                                <div className="timeline-item__dot" aria-hidden="true" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section about-cta">
                <div className="container about-cta__inner">
                    <h2>Join Our Mission</h2>
                    <p>Whether you donate, volunteer, or partner with us — you become part of the solution.</p>
                    <div className="about-cta__buttons">
                        <Link to="/donate" className="btn btn-donate">Donate Now</Link>
                        <Link to="/contact" className="btn btn-white">Contact Us <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
