import React from 'react';
import { Link, useParams } from 'react-router-dom';

const subPages = {
    default: {
        title: 'Our Projects',
        desc: 'Discover our ongoing peacebuilding, WASH, education, and food security projects across East Africa.'
    },
    'success-stories': {
        title: 'Success Stories',
        desc: 'Real stories of transformation from our communities.'
    },
    reports: {
        title: 'Evaluation Reports',
        desc: 'Transparency and accountability through rigorous project evaluations.'
    }
};

const projects = [
    {
        title: 'Lotikipi Peace Accord Initiative',
        status: 'Ongoing',
        location: 'Turkana South, Kenya / Toposa, South Sudan',
        period: '2025 – 2027',
        funder: 'UNDP Kenya',
        desc: 'Sustaining the 2026 Lotikipi Peace Agreement through community monitoring committees, early warning systems, and livestock reconciliation mechanisms.',
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop'
    },
    {
        title: 'EU-Funded WASH Initiative — Turkana South',
        status: 'Ongoing',
        location: 'Turkana South Sub-County',
        period: '2026 – 2028',
        funder: 'European Union',
        desc: 'Constructing 45 boreholes, training community water committees, and implementing school WASH facilities for 15,000 families.',
        image: 'https://images.unsplash.com/photo-1596701062351-8ac031b0a726?w=600&auto=format&fit=crop'
    },
    {
        title: 'Emergency Food Security Response',
        status: 'Ongoing',
        location: 'Turkana, Marsabit & Samburu Counties',
        period: '2025 – 2026',
        funder: 'Kenya Red Cross / WFP',
        desc: 'Distributing emergency food parcels and livestock feed to 8,000+ drought-affected families.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop'
    },
    {
        title: 'Peace Education Programme — Phase III',
        status: 'Ongoing',
        location: 'Turkana North & Karamoja border regions',
        period: '2024 – 2026',
        funder: 'UNDP / Save the Children',
        desc: 'Enrolling 2,500+ out-of-school children in temporary learning centres with a peace-centred curriculum.',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop'
    }
];

export default function Projects() {
    const { sub } = useParams();
    const meta = subPages[sub] || subPages.default;

    return (
        <main id="main-content">
            <section className="page-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Field Operations</span>
                    <h1>{meta.title}</h1>
                    <p>{meta.desc}</p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                        {projects.map((p, i) => (
                            <div key={i} className="card" style={{ overflow: 'hidden' }}>
                                <img src={p.image} alt={p.title} loading="lazy" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ padding: '24px' }}>
                                    <span className="tag tag--green">{p.status}</span>
                                    <h3 style={{ marginTop: '10px', fontSize: '1rem' }}>{p.title}</h3>
                                    <p style={{ fontSize: '0.8rem', marginBottom: '4px' }}>📍 {p.location}</p>
                                    <p style={{ fontSize: '0.8rem', marginBottom: '4px' }}>📅 {p.period}</p>
                                    <p style={{ fontSize: '0.8rem', marginBottom: '12px' }}>💰 Funder: {p.funder}</p>
                                    <p style={{ fontSize: '0.85rem' }}>{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
