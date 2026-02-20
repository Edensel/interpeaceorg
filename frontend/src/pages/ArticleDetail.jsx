import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsArticles } from '../data/content.js';
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import './News.css';
import './ArticleDetail.css';


export default function ArticleDetail() {
    const { slug } = useParams();
    const article = newsArticles.find(a => a.slug === slug);

    if (!article) {
        return (
            <main id="main-content">
                <section className="page-hero">
                    <div className="container">
                        <h1>Article Not Found</h1>
                        <p>The article you're looking for doesn't exist.</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container" style={{ textAlign: 'center' }}>
                        <Link to="/news" className="btn btn-primary">
                            <ArrowLeft size={16} /> Back to News
                        </Link>
                    </div>
                </section>
            </main>
        );
    }

    // Related articles (same category, excluding current)
    const related = newsArticles
        .filter(a => a.id !== article.id && a.category === article.category)
        .slice(0, 2);
    const otherRelated = newsArticles.filter(a => a.id !== article.id).slice(0, 2 - related.length);
    const relatedArticles = [...related, ...otherRelated].slice(0, 2);

    const paragraphs = article.content.split('\n\n').filter(p => p.trim());

    return (
        <main id="main-content">
            {/* Article Hero */}
            <section
                className="article-hero"
                style={{ backgroundImage: `url('${article.image}')` }}
            >
                <div className="article-hero__overlay" />
                <div className="container article-hero__content">
                    <Link to="/news" className="article-back-btn">
                        <ArrowLeft size={16} /> Back to News
                    </Link>
                    <span className="tag tag--green" style={{ marginBottom: '16px', display: 'inline-block' }}>
                        {article.category}
                    </span>
                    <h1 className="article-hero__title">{article.title}</h1>
                    <div className="article-hero__meta">
                        <span><Calendar size={14} /> {new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <span><User size={14} /> {article.author}</span>
                        <span><Tag size={14} /> {article.category}</span>
                    </div>
                </div>
            </section>

            {/* Article Body */}
            <section className="section">
                <div className="container">
                    <div className="article-layout">
                        {/* Main content */}
                        <article className="article-body">
                            <p className="article-lead">{article.excerpt}</p>
                            {paragraphs.map((para, i) => (
                                <p key={i} className="article-para">{para}</p>
                            ))}

                            {/* Share section */}
                            <div className="article-share">
                                <span className="article-share__label">Share this article:</span>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ fontSize: '0.85rem', padding: '8px 18px' }}
                                >
                                    Share on Twitter
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                    style={{ fontSize: '0.85rem', padding: '8px 18px' }}
                                >
                                    Share on Facebook
                                </a>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="article-sidebar">
                            <div className="article-sidebar__card">
                                <h4>About IPASUD Kenya</h4>
                                <img
                                    src={article.image}
                                    alt="Article image"
                                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '10px', marginBottom: '14px' }}
                                />
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                                    Inter-Peace Agency for Sustainable Development (IPASUD) Kenya works to build
                                    lasting peace and sustainable development in the Ateker region of East Africa.
                                </p>
                                <Link to="/about" className="btn btn-primary" style={{ marginTop: '16px', display: 'block', textAlign: 'center' }}>
                                    Learn More About Us
                                </Link>
                            </div>
                            <div className="article-sidebar__card">
                                <h4>Support Our Work</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.7 }}>
                                    Your donation enables IPASUD Kenya to expand programmes like this one, bringing peace and development to more communities.
                                </p>
                                <Link to="/donate" className="btn btn-donate" style={{ display: 'block', textAlign: 'center' }}>
                                    ❤ Donate Now
                                </Link>
                            </div>
                        </aside>
                    </div>

                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <div className="article-related">
                            <h3 className="article-related__title">Related Stories</h3>
                            <div className="divider divider--left" />
                            <div className="article-related__grid">
                                {relatedArticles.map(rel => (
                                    <Link key={rel.id} to={`/news/${rel.slug}`} className="news-card card">
                                        <div className="news-card__image">
                                            <img src={rel.image} alt={rel.title} loading="lazy" />
                                            <span className="tag tag--green news-card__category">{rel.category}</span>
                                        </div>
                                        <div className="news-card__body">
                                            <time className="news-card__date" dateTime={rel.date}>
                                                {new Date(rel.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </time>
                                            <h3 className="news-card__title">{rel.title}</h3>
                                            <p className="news-card__excerpt">{rel.excerpt}</p>
                                            <span className="news-card__read-more">Read more <ArrowRight size={14} /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                                <Link to="/news" className="btn btn-secondary">View All News <ArrowRight size={16} /></Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
