import React, { useState } from 'react';
import { Download, Briefcase, Eye, X, FileText, ChevronRight } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { reportFullContent } from '../utils/reportContent';
import './Resources.css';

const reports = [
    {
        title: 'IPASUD Kenya Annual Report 2025',
        description: 'Our comprehensive annual report covering all programme activities, financial performance, impact metrics, and strategic developments throughout 2025.',
        type: 'PDF',
        size: '4.2 MB',
        year: 2025,
        category: 'Annual Report',
        pages: 64,
        filename: 'IPASUD_Annual_Report_2025.pdf'
    },
    {
        title: 'WASH Programme Evaluation 2024',
        description: 'Independent evaluation of our Water, Sanitation & Hygiene programme across 30 communities in Turkana County, assessing sustainability and community ownership.',
        type: 'PDF',
        size: '2.1 MB',
        year: 2024,
        category: 'Evaluation',
        pages: 38,
        filename: 'WASH_Programme_Evaluation_2024.pdf'
    },
    {
        title: 'Peace Education Impact Assessment 2024',
        description: 'Assessment of the transformative outcomes of our peace education curriculum in conflict-affected schools, including improved tolerance and reduced violence incidents.',
        type: 'PDF',
        size: '3.5 MB',
        year: 2024,
        category: 'Impact Assessment',
        pages: 52,
        filename: 'Peace_Education_Impact_Assessment_2024.pdf'
    },
    {
        title: 'Financial Transparency Report 2024',
        description: 'Audited financial statements and donor fund utilisation report for fiscal year 2024, demonstrating our commitment to financial accountability and transparency.',
        type: 'PDF',
        size: '1.8 MB',
        year: 2024,
        category: 'Financial',
        pages: 28,
        filename: 'Financial_Transparency_Report_2024.pdf'
    },
    {
        title: 'Lotikipi Peace Agreement Documentation',
        description: 'Full documentation of the landmark 2026 peace covenant between Turkana, Toposa, and Nyangatom communities, including the agreement text and implementation framework.',
        type: 'PDF',
        size: '1.2 MB',
        year: 2026,
        category: 'Peace Documentation',
        pages: 22,
        filename: 'Lotikipi_Peace_Agreement_2026.pdf'
    },
    {
        title: 'Ateker Region Conflict Analysis 2025',
        description: 'Detailed conflict mapping and root cause analysis across the Kenya-Uganda-South Sudan-Ethiopia border triangle, with recommendations for peacebuilding interventions.',
        type: 'PDF',
        size: '5.1 MB',
        year: 2025,
        category: 'Research',
        pages: 88,
        filename: 'Ateker_Conflict_Analysis_2025.pdf'
    },
];

const jobs = [
    {
        title: 'WASH Engineer',
        location: 'Lodwar, Turkana County',
        type: 'Full-time',
        deadline: '2026-03-15',
        desc: 'Lead the design, implementation, and supervision of water, sanitation, and hygiene infrastructure projects across Turkana County. You will manage contractors, train community WASH committees, and ensure quality standards are met across all projects.',
        requirements: ["BSc in Civil/Water Engineering (minimum)", "5+ years NGO/WASH project experience", "Experience working in arid and semi-arid regions", "Valid driving licence"],
    },
    {
        title: 'Monitoring & Evaluation Officer',
        location: 'Nairobi / Field',
        type: 'Full-time',
        deadline: '2026-03-20',
        desc: 'Develop and implement the MEAL (Monitoring, Evaluation, Accountability and Learning) framework across all active IPASUD Kenya programmes. You will design data collection tools, train field staff, analyse results, and produce high-quality donor reports.',
        requirements: ["Masters in Statistics, Development Studies, or related field", "3+ years M&E experience in humanitarian/development sector", "Proficiency in ODK, SPSS/Stata, and data visualisation tools", "Strong report writing skills in English"],
    },
    {
        title: 'Community Peacebuilding Facilitator',
        location: 'Turkana South',
        type: 'Contract (12 months)',
        deadline: '2026-03-10',
        desc: 'Facilitate community dialogue sessions, peace committee meetings, and inter-community negotiations in Turkana South and border areas. You will work directly with elders, women leaders, and youth to build local conflict resolution capacity.',
        requirements: ["Degree in Peace Studies, Social Work, or related field", "Fluency in Turkana language (essential)", "Demonstrated experience in conflict mediation", "Willingness to live and work in Lodwar"],
    },
    {
        title: 'Communications & Media Officer',
        location: 'Nairobi / Remote',
        type: 'Full-time',
        deadline: '2026-04-05',
        desc: "Develop and implement IPASUD Kenya's communications strategy, manage social media presence, produce programme stories, and coordinate media relations. You will tell the human stories behind our programmes to donors, partners, and the public.",
        requirements: ["Degree in Journalism, Communications, or Marketing", "Strong photography and videography skills", "Experience with NGO communications/advocacy", "Proficiency in design tools (Canva, Adobe Creative Suite)"],
    },
];

function downloadReport(report) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentW = pageW - margin * 2;

    const content = reportFullContent[report.filename];

    // ── helpers ──────────────────────────────────────────────────────────────
    function addHeader() {
        doc.setFillColor(26, 58, 92);
        doc.rect(0, 0, pageW, 30, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text('IPASUD KENYA', margin, 12);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Inter-Peace Agency for Sustainable Development', margin, 19);
        doc.text('www.interpeaceagency.org  |  info@interpeaceagency.org  |  +254 716 397 042', margin, 25);
    }

    function addFooter(pageNum, totalPages) {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(margin, pageH - 14, pageW - margin, pageH - 14);
        doc.setFontSize(7.5);
        doc.setTextColor(130, 130, 130);
        doc.setFont('helvetica', 'normal');
        doc.text(`© ${report.year} IPASUD Kenya. All rights reserved. | ${report.title}`, margin, pageH - 8);
        doc.text(`Page ${pageNum}`, pageW - margin, pageH - 8, { align: 'right' });
    }

    function checkPageBreak(y, needed) {
        if (y + needed > pageH - 22) {
            doc.addPage();
            addHeader();
            return 38;
        }
        return y;
    }

    function writeBody(text, y) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(40, 40, 40);
        const paragraphs = text.split('\n');
        paragraphs.forEach(para => {
            if (para.trim() === '') { y += 3; return; }
            const lines = doc.splitTextToSize(para, contentW);
            lines.forEach(line => {
                y = checkPageBreak(y, 6);
                doc.text(line, margin, y);
                y += 5.5;
            });
            y += 2;
        });
        return y;
    }

    function writeSectionTitle(title, y) {
        y = checkPageBreak(y, 14);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 58, 92);
        doc.text(title, margin, y);
        y += 2;
        doc.setDrawColor(232, 160, 32);
        doc.setLineWidth(0.6);
        doc.line(margin, y, margin + 50, y);
        y += 6;
        return y;
    }

    // ── Cover Page ────────────────────────────────────────────────────────────
    addHeader();
    let y = 46;

    // Category badge
    doc.setFillColor(232, 160, 32);
    doc.roundedRect(margin, y - 5, 44, 8, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(report.category.toUpperCase(), margin + 2, y + 1);
    y += 12;

    doc.setTextColor(26, 58, 92);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    const titleLines = doc.splitTextToSize(report.title, contentW);
    doc.text(titleLines, margin, y);
    y += titleLines.length * 10 + 4;

    doc.setDrawColor(232, 160, 32);
    doc.setLineWidth(1);
    doc.line(margin, y, margin + 80, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Year: ${report.year}   |   Category: ${report.category}   |   Format: ${report.type}`, margin, y);
    y += 7;
    doc.text(`Published by IPASUD Kenya — Inter-Peace Agency for Sustainable Development`, margin, y);
    y += 7;
    doc.text(`Lodwar Town, Turkana County, Kenya`, margin, y);
    y += 14;

    // Cover description
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(50, 50, 50);
    const descLines = doc.splitTextToSize(report.description, contentW);
    doc.text(descLines, margin, y);
    y += descLines.length * 6 + 16;

    // Table of Contents
    if (content && content.tableOfContents) {
        doc.setFillColor(243, 246, 250);
        doc.roundedRect(margin, y, contentW, 10 + content.tableOfContents.length * 7, 3, 3, 'F');
        y += 7;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 58, 92);
        doc.text('Table of Contents', margin + 4, y);
        y += 7;
        doc.setFontSize(9.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        content.tableOfContents.forEach((item, i) => {
            y = checkPageBreak(y, 8);
            doc.text(`${i + 1}.  ${item}`, margin + 4, y);
            y += 7;
        });
    }

    addFooter(1, '—');

    // ── Content Pages ─────────────────────────────────────────────────────────
    if (content && content.sections) {
        content.sections.forEach(section => {
            doc.addPage();
            addHeader();
            y = 38;
            y = writeSectionTitle(section.title, y);
            y = writeBody(section.body, y);
            const pageCount = doc.internal.getNumberOfPages();
            for (let p = 2; p <= pageCount; p++) {
                doc.setPage(p);
                addFooter(p, pageCount);
            }
        });
    } else {
        // Fallback for any report not yet in content database
        doc.addPage();
        addHeader();
        y = 38;
        y = writeSectionTitle('Full Report', y);
        y = writeBody(report.description, y);
        const pageCount = doc.internal.getNumberOfPages();
        for (let p = 2; p <= pageCount; p++) {
            doc.setPage(p);
            addFooter(p, pageCount);
        }
    }

    doc.save(report.filename);
}

// legacy stub kept for import compatibility — no longer used
function generatePDFContent(report) {
    // Create a simple but professional-looking PDF via a Blob
    const content = `
IPASUD Kenya — ${report.title}

INTER-PEACE AGENCY FOR SUSTAINABLE DEVELOPMENT (IPASUD) KENYA
Lodwar Town, Turkana County, Kenya
Email: info@interpeaceagency.org | Tel: +254 716 397 042
Website: www.interpeaceagency.org

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DOCUMENT TITLE: ${report.title}
CATEGORY: ${report.category}
YEAR: ${report.year}
PAGES: ${report.pages}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTIVE SUMMARY

${report.description}

IPASUD Kenya (Inter-Peace Agency for Sustainable Development) is a registered international 
non-governmental organisation dedicated to building peace, resolving conflicts, and promoting 
sustainable development in the Ateker region spanning Kenya, Uganda, South Sudan, and Ethiopia.

Our headquarters are located in Lodwar, Turkana County — headquartered within the very 
communities we serve, ensuring our programmes remain community-led and conflict-sensitive.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ABOUT IPASUD KENYA

IPASUD Kenya was founded to address the complex interplay of conflict, poverty, and fragility 
in the Ateker border triangle. Since our establishment, we have:

• Facilitated over 20 peace agreements among pastoral communities
• Reached over 1 million people across 50+ communities with development programmes  
• Constructed and rehabilitated 180+ water points in Turkana County
• Established 15 emergency learning centres serving 2,500+ conflict-affected children
• Distributed emergency food assistance to 8,000+ families during drought emergencies

We operate five core thematic programmes: WASH, Peace Education, Refugee & Migration Support, 
Food Security & Nutrition, and Climate Resilience & Environment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FULL REPORT CONTENT

The complete content of this report is available through IPASUD Kenya's documentation system. 
For the full ${report.pages}-page report, please contact us:

Email: info@interpeaceagency.org
Phone: +254 716 397 042
Address: Lodwar Town, Turkana County, Kenya

We are committed to full transparency. All our reports are made available free of charge 
to donors, government partners, the academic community, and the general public.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

© ${report.year} IPASUD Kenya. All rights reserved.
This document is produced by IPASUD Kenya as part of our commitment to accountability and transparency.
`;
    return content;
}


export default function Resources() {
    const [activeJob, setActiveJob] = useState(null);
    const [previewReport, setPreviewReport] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', ...new Set(reports.map(r => r.category))];
    const filtered = filter === 'All' ? reports : reports.filter(r => r.category === filter);

    return (
        <main id="main-content">
            <section className="page-hero resources-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Resources</span>
                    <h1>Publications & Resources</h1>
                    <p>Access our reports, evaluations, research publications, and current job openings.</p>
                </div>
            </section>

            {/* Reports */}
            <section className="section">
                <div className="container">
                    <div className="section__header" style={{ textAlign: 'left' }}>
                        <span className="section__eyebrow">Publications</span>
                        <h2 style={{ marginBottom: '8px' }}>Reports & Publications</h2>
                        <div className="divider divider--left" />
                    </div>

                    {/* Category filter */}
                    <div className="resources-filter">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`resources-filter-btn ${filter === cat ? 'resources-filter-btn--active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="reports-grid">
                        {filtered.map((r, i) => (
                            <div key={i} className="report-card">
                                <div className="report-card__icon">
                                    <FileText size={28} />
                                </div>
                                <div className="report-card__body">
                                    <div className="report-card__meta">
                                        <span className="tag tag--navy">{r.category}</span>
                                        <span className="report-card__year">{r.year}</span>
                                    </div>
                                    <h3 className="report-card__title">{r.title}</h3>
                                    <p className="report-card__desc">{r.description}</p>
                                    <div className="report-card__info">
                                        <span>📄 {r.pages} pages</span>
                                        <span>📦 {r.size}</span>
                                        <span>📋 {r.type}</span>
                                    </div>
                                </div>
                                <div className="report-card__actions">
                                    <button
                                        className="btn btn-secondary"
                                        style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                                        onClick={() => setPreviewReport(r)}
                                    >
                                        <Eye size={14} /> Preview
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                                        onClick={() => downloadReport(r)}
                                    >
                                        <Download size={14} /> Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Report Preview Modal */}
            {previewReport && (
                <div className="modal-backdrop" onClick={() => setPreviewReport(null)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-box__header">
                            <div>
                                <span className="tag tag--navy">{previewReport.category}</span>
                                <h3 style={{ marginTop: '8px', marginBottom: '4px' }}>{previewReport.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{previewReport.pages} pages • {previewReport.size} • {previewReport.type}</p>
                            </div>
                            <button className="modal-close" onClick={() => setPreviewReport(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-box__body">
                            <h4>Document Summary</h4>
                            <p style={{ lineHeight: 1.8, color: 'var(--text-dark)', marginBottom: '20px' }}>{previewReport.description}</p>
                            <div className="modal-preview-content">
                                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'monospace', lineHeight: 1.7 }}>
                                    {generatePDFContent(previewReport).slice(0, 1400)}...
                                </pre>
                            </div>
                        </div>
                        <div className="modal-box__footer">
                            <button className="btn btn-secondary" onClick={() => setPreviewReport(null)}>Close</button>
                            <button className="btn btn-primary" onClick={() => downloadReport(previewReport)}>
                                <Download size={14} /> Download Full Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Jobs */}
            <section className="section section--alt">
                <div className="container">
                    <div className="section__header" style={{ textAlign: 'left', marginBottom: '32px' }}>
                        <span className="section__eyebrow">Careers</span>
                        <h2 style={{ marginBottom: '8px' }}>Current Job Openings</h2>
                        <div className="divider divider--left" />
                        <p style={{ maxWidth: '600px', marginTop: '12px' }}>
                            Join our team of dedicated peacebuilders and development practitioners.
                            We offer competitive salaries, meaningful work, and a chance to create real change.
                        </p>
                    </div>

                    <div className="jobs-list">
                        {jobs.map((j, i) => (
                            <div key={i} className={`job-card ${activeJob === i ? 'job-card--open' : ''}`}>
                                <div className="job-card__header" onClick={() => setActiveJob(activeJob === i ? null : i)}>
                                    <div className="job-card__info">
                                        <div className="job-card__top">
                                            <h3>{j.title}</h3>
                                            <span className="tag tag--navy">{j.type}</span>
                                        </div>
                                        <div className="job-card__meta">
                                            <span>📍 {j.location}</span>
                                            <span>💰 {j.salary}</span>
                                            <span style={{ color: 'var(--accent-red)' }}>⏰ Deadline: {j.deadline}</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className={`job-card__chevron ${activeJob === i ? 'job-card__chevron--open' : ''}`} />
                                </div>
                                {activeJob === i && (
                                    <div className="job-card__body">
                                        <p className="job-card__desc">{j.desc}</p>
                                        <h4>Key Requirements</h4>
                                        <ul className="job-card__reqs">
                                            {j.requirements.map((req, ri) => (
                                                <li key={ri}>{req}</li>
                                            ))}
                                        </ul>
                                        <div className="job-card__apply">
                                            <a
                                                href={`mailto:info@interpeaceagency.org?subject=Application: ${j.title}&body=Dear IPASUD Kenya HR Team,%0A%0AI am writing to apply for the position of ${j.title}.%0A%0APlease find my CV and cover letter attached.%0A%0AKind regards,`}
                                                className="btn btn-primary"
                                            >
                                                <Briefcase size={15} /> Apply Now
                                            </a>
                                            <p className="job-card__apply-note">
                                                Send your CV and cover letter to{' '}
                                                <a href="mailto:info@interpeaceagency.org">info@interpeaceagency.org</a>{' '}
                                                with the subject line <em>"Application: {j.title}"</em>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
