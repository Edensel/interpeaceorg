import React, { useState } from 'react';
import { Mail, Linkedin, X } from 'lucide-react';
import { teamMembers, teamCategories } from '../data/team.js';
import './Team.css';

export default function Team() {
    const [filter, setFilter] = useState('all');
    const [modal, setModal] = useState(null);

    const filtered = filter === 'all'
        ? teamMembers
        : teamMembers.filter(m => m.category === filter);

    return (
        <main id="main-content">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>People Behind the Mission</span>
                    <h1>Our Team</h1>
                    <p>Dedicated professionals and community leaders working every day to build lasting peace.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filters */}
                    <div className="team-filters" role="tablist" aria-label="Filter team members by category">
                        {teamCategories.map(cat => (
                            <button
                                key={cat.id}
                                role="tab"
                                aria-selected={filter === cat.id}
                                className={`team-filter-btn ${filter === cat.id ? 'team-filter-btn--active' : ''}`}
                                onClick={() => setFilter(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="team-grid">
                        {filtered.map(member => (
                            <button
                                key={member.id}
                                className="team-card"
                                onClick={() => setModal(member)}
                                aria-label={`View profile of ${member.name}`}
                            >
                                <div className="team-card__photo-wrap">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        loading="lazy"
                                        className="team-card__photo"
                                        onError={e => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1A3A5C&color=fff&size=200`;
                                        }}
                                    />
                                    <div className="team-card__overlay">
                                        <span>View Profile</span>
                                    </div>
                                </div>
                                <div className="team-card__info">
                                    <h3 className="team-card__name">{member.name}</h3>
                                    <p className="team-card__title">{member.title}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {modal && (
                <div className="team-modal-overlay" onClick={() => setModal(null)} role="dialog" aria-modal="true" aria-label={`Profile of ${modal.name}`}>
                    <div className="team-modal" onClick={e => e.stopPropagation()}>
                        <button className="team-modal__close" onClick={() => setModal(null)} aria-label="Close profile">
                            <X size={20} />
                        </button>
                        <div className="team-modal__inner">
                            <img
                                src={modal.photo}
                                alt={modal.name}
                                className="team-modal__photo"
                                onError={e => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(modal.name)}&background=1A3A5C&color=fff&size=300`;
                                }}
                            />
                            <div className="team-modal__content">
                                <span className={`tag tag--navy`} style={{ textTransform: 'capitalize' }}>{modal.category}</span>
                                <h2 className="team-modal__name">{modal.name}</h2>
                                <p className="team-modal__title">{modal.title}</p>
                                <div className="divider divider--left" />
                                <p className="team-modal__bio">{modal.bio}</p>
                                <div className="team-modal__links">
                                    {modal.linkedin !== '#' && (
                                        <a href={modal.linkedin} target="_blank" rel="noopener noreferrer" className="team-modal__link" aria-label="LinkedIn profile">
                                            <Linkedin size={16} /> LinkedIn
                                        </a>
                                    )}
                                    {modal.email !== '#' && (
                                        <a href={`mailto:${modal.email}`} className="team-modal__link" aria-label={`Email ${modal.name}`}>
                                            <Mail size={16} /> {modal.email}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
