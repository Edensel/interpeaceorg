import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { programmes } from '../data/content.js';
import { ArrowRight, Users, MapPin, TrendingUp } from 'lucide-react';
import './Programmes.css';

// List of all programmes
function ProgrammesList() {
    return (
        <main id="main-content">
            <section className="page-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>What We Do</span>
                    <h1>Our Programmes</h1>
                    <p>Five interconnected thematic areas addressing the root causes of conflict and driving lasting peace.</p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="prg-list-grid">
                        {programmes.map(p => (
                            <Link key={p.id} to={`/programmes/${p.id}`} className="prg-list-card card">
                                <div className="prg-list-card__img" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)` }}>
                                    <img src={p.image} alt={p.longTitle} loading="lazy" />
                                    <div className="prg-list-card__icon" style={{ background: p.color }}>{p.icon}</div>
                                </div>
                                <div className="prg-list-card__body">
                                    <h3 style={{ color: p.color }}>{p.longTitle}</h3>
                                    <p>{p.description.slice(0, 140)}…</p>
                                    <div className="prg-list-card__stats">
                                        <span><Users size={13} /> {p.impact.communities}+ Communities</span>
                                        <span><TrendingUp size={13} /> {p.impact.projects} Projects</span>
                                    </div>
                                    <span className="prg-list-card__cta" style={{ color: p.color }}>Learn more <ArrowRight size={13} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

// Individual programme detail
function ProgrammeDetail({ programme: p }) {
    return (
        <main id="main-content">
            <section className="page-hero" style={{ background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}99 100%)` }}>
                <div className="container">
                    <span className="hero__eyebrow" style={{ color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        Our Programmes
                    </span>
                    <h1>{p.icon} {p.longTitle}</h1>
                    <p>{p.summary}</p>
                </div>
            </section>

            <section className="section">
                <div className="container prg-detail-grid">
                    <div className="prg-detail-main">
                        <img src={p.image} alt={p.longTitle} loading="lazy" className="prg-detail-hero-img" />
                        <h2>About This Programme</h2>
                        <div className="divider divider--left" style={{ background: p.color }} />
                        <p style={{ fontSize: '1.05rem' }}>{p.description}</p>

                        <h3 style={{ marginTop: '32px' }}>Key Objectives</h3>
                        <ul className="prg-detail-objectives">
                            {p.objectives.map((obj, i) => (
                                <li key={i}><span style={{ color: p.color }}>✓</span> {obj}</li>
                            ))}
                        </ul>
                    </div>
                    <aside className="prg-detail-sidebar">
                        <div className="prg-impact-card" style={{ borderTop: `4px solid ${p.color}` }}>
                            <h3>Programme Impact</h3>
                            {[
                                { icon: MapPin, label: 'Communities', value: `${p.impact.communities}+` },
                                { icon: Users, label: 'People Reached', value: p.impact.people.toLocaleString() + '+' },
                                { icon: TrendingUp, label: 'Active Projects', value: p.impact.projects },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="prg-impact-stat">
                                    <div className="prg-impact-stat__icon" style={{ background: `${p.color}18` }}>
                                        <Icon size={18} color={p.color} />
                                    </div>
                                    <div>
                                        <div className="prg-impact-stat__value" style={{ color: p.color }}>{value}</div>
                                        <div className="prg-impact-stat__label">{label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link to="/donate" className="btn btn-donate" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }} id={`donate-prg-${p.id}`}>
                            Support This Programme
                        </Link>
                        <Link to="/contact" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                            Partner With Us
                        </Link>
                        <div className="prg-sidebar-nav">
                            <h4>Other Programmes</h4>
                            {programmes.filter(x => x.id !== p.id).map(x => (
                                <Link key={x.id} to={`/programmes/${x.id}`} className="prg-sidebar-nav-link">
                                    <span>{x.icon}</span> {x.longTitle}
                                </Link>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

export default function Programmes() {
    const { id } = useParams();
    if (!id) return <ProgrammesList />;
    const prog = programmes.find(p => p.id === id);
    if (!prog) return (
        <main id="main-content">
            <section className="page-hero"><div className="container"><h1>Programme Not Found</h1></div></section>
            <section className="section text-center">
                <div className="container"><p>Sorry, that programme doesn't exist.</p><Link to="/programmes" className="btn btn-primary mt-4">View All Programmes</Link></div>
            </section>
        </main>
    );
    return <ProgrammeDetail programme={prog} />;
}
