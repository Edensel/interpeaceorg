import React from 'react';
import { Shield, FileText } from 'lucide-react';
import { openPolicyPDF } from '../utils/policyPDF';

const sections = [
    { id: 1, title: 'Introduction & Commitment' },
    { id: 2, title: 'Legal Basis & Definitions' },
    { id: 3, title: 'Categories of Personal Data' },
    { id: 4, title: 'Purpose of Data Processing' },
    { id: 5, title: 'Data Protection Principles' },
    { id: 6, title: 'Data Subject Rights' },
    { id: 7, title: 'Sensitive Data & Special Protections' },
    { id: 8, title: 'Data Sharing & International Transfers' },
    { id: 9, title: 'Data Retention Periods' },
    { id: 10, title: 'Cookies & Website Data' },
    { id: 11, title: 'Data Security' },
    { id: 12, title: 'Complaints' },
    { id: 13, title: 'Policy Review' },
];

export default function DataProtectionPolicy() {
    return (
        <main id="main-content">
            <section className="page-hero" style={{ background: 'linear-gradient(135deg, #0D2440 0%, #1A3A5C 100%)' }}>
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Legal</span>
                    <h1>Data Protection Policy</h1>
                    <p>IPASUD Kenya is committed to protecting your personal data in compliance with the Kenya Data Protection Act, 2019.</p>
                    <div style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button className="btn btn-white" onClick={openPolicyPDF}>
                            <FileText size={16} /> View Full Policy (PDF)
                        </button>
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', alignSelf: 'center' }}>
                            Version 1.0 · Effective 1 January 2026
                        </span>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="policy-layout">
                        {/* Table of Contents */}
                        <aside className="policy-toc">
                            <div className="policy-toc__inner">
                                <div className="policy-toc__icon">
                                    <Shield size={24} />
                                </div>
                                <h4>Table of Contents</h4>
                                <ol className="policy-toc__list">
                                    {sections.map(s => (
                                        <li key={s.id}>
                                            <a href={`#section - ${ s.id } `}>{s.title}</a>
                                        </li>
                                    ))}
                                </ol>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px', fontSize: '0.875rem' }} onClick={openPolicyPDF}>
                                    <FileText size={15} /> View Full Policy (PDF)
                                </button>
                            </div>
                        </aside>

                        {/* Policy Body */}
                        <article className="policy-body">
                            <div className="policy-header-card">
                                <div className="policy-header-card__badges">
                                    <span className="policy-badge">🇰🇪 Kenya Data Protection Act, 2019</span>
                                    <span className="policy-badge">Version 1.0</span>
                                    <span className="policy-badge">Effective: 1 Jan 2026</span>
                                </div>
                            </div>

                            {POLICY_TEXT.split(/(?=\d+\. [A-Z])/).filter(s => s.trim()).map((section, i) => {
                                const lines = section.trim().split('\n');
                                const titleLine = lines[0];
                                const body = lines.slice(1).join('\n').trim();
                                const secNum = titleLine.match(/^(\d+)\./)?.[1];
                                return (
                                    <section key={i} id={`section - ${ secNum } `} className="policy-section">
                                        <h2 className="policy-section__title">{titleLine}</h2>
                                        <div className="policy-section__body">
                                            {body.split('\n\n').map((para, pi) => (
                                                para.trim().startsWith('•') ? (
                                                    <ul key={pi} className="policy-list">
                                                        {para.split('\n').map((item, ii) => (
                                                            <li key={ii}>{item.replace(/^•\s*/, '')}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p key={pi}>{para.trim()}</p>
                                                )
                                            ))}
                                        </div>
                                    </section>
                                );
                            })}

                            <div className="policy-contact-card">
                                <h3>Data Protection Officer</h3>
                                <p>For any data protection queries or to exercise your rights, contact us:</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                                    <span>📧 <a href="mailto:info@interpeaceagency.org">info@interpeaceagency.org</a></span>
                                    <span>📞 <a href="tel:+254716397042">+254 716 397 042</a></span>
                                    <span>📍 Lodwar Town, Turkana County, Kenya</span>
                                </div>
                                <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={openPolicyPDF}>
                                    <FileText size={15} /> View Policy (PDF)
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
