import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/content.js';
import { Search, ArrowRight } from 'lucide-react';
import './News.css';

const categories = ['All', 'WASH', 'Peacebuilding', 'Education', 'Food Security', 'Partnerships'];

export default function News() {
    const [search, setSearch] = useState('');
    const [catFilter, setCat] = useState('All');

    const filtered = newsArticles.filter(a => {
        const matchCat = catFilter === 'All' || a.category === catFilter;
        const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <main id="main-content">
            <section className="page-hero">
                <div className="container">
                    <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Latest Updates</span>
                    <h1>News &amp; Stories</h1>
                    <p>Stay up to date with our peacebuilding work, programme achievements, and community stories.</p>
                </div>
            </section>

            <section className="section news-page">
                <div className="container">
                    {/* Filters */}
                    <div className="news-controls">
                        <div className="news-search">
                            <Search size={18} className="news-search__icon" />
                            <input
                                type="search"
                                placeholder="Search news..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Search news articles"
                                className="news-search__input"
                            />
                        </div>
                        <div className="news-cats">
                            {categories.map(c => (
                                <button
                                    key={c}
                                    className={`news-cat-btn ${catFilter === c ? 'news-cat-btn--active' : ''}`}
                                    onClick={() => setCat(c)}
                                    aria-pressed={catFilter === c}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Articles */}
                    {filtered.length === 0 ? (
                        <p className="news-empty">No articles found. Try a different search or filter.</p>
                    ) : (
                        <div className="news-page-grid">
                            {filtered.map(article => (
                                <Link key={article.id} to={`/news/${article.slug}`} className="news-article-card card">
                                    <div className="news-article-card__img">
                                        <img src={article.image} alt={article.title} loading="lazy" />
                                        <span className="tag tag--green">{article.category}</span>
                                    </div>
                                    <div className="news-article-card__body">
                                        <time dateTime={article.date} className="news-article-card__date">
                                            {new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </time>
                                        <h3>{article.title}</h3>
                                        <p>{article.excerpt}</p>
                                        <span className="news-article-card__cta">Read full story <ArrowRight size={14} /></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
