import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { programmes, impactStats, newsArticles } from '../data/content.js';
import './Home.css';

/* ── Hero Slides ── */
const heroSlides = [
    {
        image: 'https://interpeaceagency.org/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-12-at-14.58.27_c4895ea5-1.jpg',
        title: 'Empowering Communities\nfor a Peaceful &\nSustainable Future',
        subtitle: 'We are an international non-profit organisation dedicated to building peace, resolving conflicts, and creating lasting change in communities across East Africa.',
    },
    {
        image: 'https://interpeaceagency.org/wp-content/uploads/2025/08/DSCN7441.jpg',
        title: 'Building Peace\nFrom the Ground Up',
        subtitle: 'Working hand-in-hand with Ateker communities spanning Turkana, Karamojong, Toposa, Jie, and Nyangatom peoples for lasting transformation.',
    },
    {
        image: 'https://interpeaceagency.org/wp-content/uploads/2025/08/DSCN7504.jpg',
        title: 'Dialogue, Justice\n& Community Resilience',
        subtitle: 'Through peace agreements, WASH infrastructure, education, and food security — we address the root causes of conflict in pastoral communities.',
    },
];

/* ── Animated Counter ── */
function CounterNumber({ target, suffix }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                let start = 0;
                const step = target / 60;
                const timer = setInterval(() => {
                    start += step;
                    if (start >= target) { setCount(target); clearInterval(timer); }
                    else { setCount(Math.floor(start)); }
                }, 16);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Hero Slideshow ── */
function HeroSlideshow() {
    const [current, setCurrent] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            goTo((current + 1) % heroSlides.length);
        }, 5500);
        return () => clearInterval(interval);
    }, [current]);

    function goTo(idx) {
        if (transitioning || idx === current) return;
        setTransitioning(true);
        setTimeout(() => {
            setCurrent(idx);
            setTransitioning(false);
        }, 400);
    }

    const slide = heroSlides[current];

    return (
        <section className="hero" aria-label="Hero">
            {/* Background slides */}
            {heroSlides.map((s, i) => (
                <div
                    key={i}
                    className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
                    style={{ backgroundImage: `url('${s.image}')` }}
                    aria-hidden={i !== current}
                />
            ))}
            <div className="hero__overlay" />

            <div className={`hero__content container ${transitioning ? 'hero__content--fade' : ''}`}>
                <span className="hero__eyebrow animate-fade-in-up">IPASUD Kenya • Established in Turkana County</span>
                <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {slide.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < slide.title.split('\n').length - 1 && <br />}</React.Fragment>)}
                </h1>
                <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {slide.subtitle}
                </p>
                <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link to="/about" className="btn btn-white">Our Story</Link>
                    <Link to="/donate" className="btn btn-donate hero__donate-btn" id="hero-donate-btn">
                        <Heart size={18} fill="currentColor" />
                        Donate Now
                    </Link>
                </div>
            </div>

            {/* Slide controls */}
            <button className="hero__nav hero__nav--prev" onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide">
                <ChevronLeft size={22} />
            </button>
            <button className="hero__nav hero__nav--next" onClick={() => goTo((current + 1) % heroSlides.length)} aria-label="Next slide">
                <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div className="hero__dots">
                {heroSlides.map((_, i) => (
                    <button key={i} className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
                ))}
            </div>

            <a href="#impact" className="hero__scroll-indicator" aria-label="Scroll down">
                <ChevronDown size={24} />
            </a>
        </section>
    );
}

export default function Home() {
    const featuredNews = newsArticles.filter(a => a.featured).slice(0, 3);

    // Partners: only the two logos provided
    const partners = [
        {
            name: 'IPASUD Kenya',
            logo: '/assets/logo/logo.jpg',
            description: 'Inter-Peace Agency for Sustainable Development'
        },
        {
            name: 'Turkana County Government',
            logo: '/assets/images/turkana-county-logo.png',
            description: 'Pamoja Tujijenge'
        },
    ];

    return (
        <main id="main-content">
            <HeroSlideshow />

            {/* ── Impact Stats ── */}
            <section id="impact" className="section stats-section" aria-label="Our impact">
                <div className="container">
                    <div className="stats-grid">
                        {impactStats.map(stat => (
                            <div key={stat.id} className="stat-card" role="figure" aria-label={stat.label}>
                                <span className="stat-card__icon" aria-hidden="true">{stat.icon}</span>
                                <div className="stat-card__number">
                                    <CounterNumber target={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="stat-card__label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About strip ── */}
            <section className="section about-strip">
                <div className="container about-strip__inner">
                    <div className="about-strip__text">
                        <span className="section__eyebrow">About IPASUD Kenya</span>
                        <h2>Building Peace from the Ground Up</h2>
                        <div className="divider divider--left" />
                        <p>
                            Inter-Peace Agency for Sustainable Development (IPASUD) Kenya is rooted in the Ateker
                            community spanning Turkana, Karamojong, Toposa, Jie, and Nyangatom peoples. We believe
                            that sustainable peace requires addressing the root causes of conflict —poverty, resource
                            scarcity, climate vulnerability, and exclusion.
                        </p>
                        <p>
                            With headquarters in Lodwar, Turkana County, we operate across Kenya, Uganda, South Sudan,
                            and Ethiopia, partnering with UN agencies, governments, and local communities to deliver
                            transformative change.
                        </p>
                        <div className="about-strip__values">
                            {['Justice', 'Equality', 'Local Ownership', 'Accountability'].map(v => (
                                <span key={v} className="about-strip__value-pill">{v}</span>
                            ))}
                        </div>
                        <Link to="/about" className="btn btn-primary mt-8">Learn More About Us <ArrowRight size={16} /></Link>
                    </div>
                    <div className="about-strip__visual">
                        <div className="about-strip__img-grid">
                            <img src="https://interpeaceagency.org/wp-content/uploads/2025/08/DSCN7441.jpg" alt="Community gathering" loading="lazy" className="about-strip__img about-strip__img--lg" />
                            <img src="https://interpeaceagency.org/wp-content/uploads/2025/09/DSCN6129-1.jpg" alt="Agricultural training" loading="lazy" className="about-strip__img" />
                            <img src="https://interpeaceagency.org/wp-content/uploads/2025/09/DSCN6334.jpg" alt="Water infrastructure" loading="lazy" className="about-strip__img" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Programmes ── */}
            <section className="section section--alt programmes-section" aria-label="Our programmes">
                <div className="container">
                    <div className="section__header">
                        <span className="section__eyebrow">What We Do</span>
                        <h2 className="section__title">Our Thematic Areas</h2>
                        <div className="divider" />
                        <p className="section__subtitle">
                            Five interconnected programmes addressing the root causes of conflict and fragility
                            in pastoral communities.
                        </p>
                    </div>
                    <div className="programmes-grid">
                        {programmes.map(p => (
                            <Link key={p.id} to={`/programmes/${p.id}`} className="programme-card" aria-label={p.longTitle}>
                                <div className="programme-card__icon" style={{ background: `${p.color}18`, color: p.color }}>
                                    <span aria-hidden="true">{p.icon}</span>
                                </div>
                                <h3 className="programme-card__title">{p.longTitle}</h3>
                                <p className="programme-card__desc">{p.summary}</p>
                                <div className="programme-card__link" style={{ color: p.color }}>
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Call to Action (Donate) ── */}
            <section className="section donate-cta" aria-label="Donation call to action">
                <div className="container donate-cta__inner">
                    <div>
                        <span className="section__eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Support Our Mission</span>
                        <h2 style={{ color: '#fff' }}>Your Donation Creates Real Peace</h2>
                        <div className="divider" />
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem' }}>
                            Every contribution helps us sustain peace agreements, deliver clean water, educate children,
                            and build resilient communities across East Africa.
                        </p>
                        <div className="donate-cta__amounts">
                            {['$10', '$25', '$50', '$100'].map(amt => (
                                <Link key={amt} to={`/donate?amount=${amt.replace('$', '')}`} className="donate-cta__amount-btn">
                                    {amt}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="donate-cta__impact">
                        <h4 style={{ color: '#fff', marginBottom: '16px' }}>Your donation impact:</h4>
                        {[
                            { amt: '$10', desc: 'Provides hygiene kits for 2 families' },
                            { amt: '$25', desc: "Funds a child's school materials for 1 year" },
                            { amt: '$50', desc: 'Delivers clean water to 10 families for 1 month' },
                            { amt: '$100', desc: 'Supports peace mediation for 1 community session' },
                        ].map(i => (
                            <div key={i.amt} className="donate-cta__impact-item">
                                <span className="donate-cta__impact-amt">{i.amt}</span>
                                <span>{i.desc}</span>
                            </div>
                        ))}
                        <Link to="/donate" className="btn btn-donate" id="cta-donate-btn" style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}>
                            <Heart size={18} fill="currentColor" />
                            Donate Securely Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Latest News ── */}
            <section className="section news-section" aria-label="Latest news">
                <div className="container">
                    <div className="section__header">
                        <span className="section__eyebrow">Latest Updates</span>
                        <h2 className="section__title">News &amp; Stories</h2>
                        <div className="divider" />
                    </div>
                    <div className="news-grid">
                        {featuredNews.map(article => (
                            <Link key={article.id} to={`/news/${article.slug}`} className="news-card card">
                                <div className="news-card__image">
                                    <img src={article.image} alt={article.title} loading="lazy" />
                                    <span className={`tag tag--green news-card__category`}>{article.category}</span>
                                </div>
                                <div className="news-card__body">
                                    <time className="news-card__date" dateTime={article.date}>
                                        {new Date(article.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </time>
                                    <h3 className="news-card__title">{article.title}</h3>
                                    <p className="news-card__excerpt">{article.excerpt}</p>
                                    <span className="news-card__read-more">Read more <ArrowRight size={14} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/news" className="btn btn-secondary">View All News <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>

            {/* ── Partners ── */}
            <section className="section section--alt partners-section" aria-label="Our partners">
                <div className="container">
                    <div className="section__header" style={{ marginBottom: '32px' }}>
                        <span className="section__eyebrow">Our Partners</span>
                        <h2 className="section__title">Partnering for Sustainable Peace</h2>
                    </div>
                    <div className="partners-strip">
                        {partners.map(p => (
                            <div key={p.name} className="partner-logo-card" title={p.name}>
                                <img src={p.logo} alt={p.name} loading="lazy" />
                                <div className="partner-logo-card__name">{p.name}</div>
                                <div className="partner-logo-card__desc">{p.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
