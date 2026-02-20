import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';
import './Navbar.css';

const navLinks = [
    { to: '/', label: 'Home' },
    {
        label: 'About',
        children: [
            { to: '/about', label: 'About Us' },
            { to: '/team', label: 'Our Team' },
        ]
    },
    {
        label: 'Programmes',
        children: [
            { to: '/programmes/wash', label: 'WASH' },
            { to: '/programmes/education', label: 'Education' },
            { to: '/programmes/refugees', label: 'Refugees & Migration' },
            { to: '/programmes/food-security', label: 'Food Security' },
            { to: '/programmes/climate', label: 'Climate Change' },
        ]
    },
    {
        label: 'Projects',
        children: [
            { to: '/projects', label: 'Ongoing Projects' },
            { to: '/projects/success-stories', label: 'Success Stories' },
            { to: '/projects/reports', label: 'Evaluation Reports' },
        ]
    },
    {
        label: 'Resources',
        children: [
            { to: '/news', label: 'News & Updates' },
            { to: '/resources', label: 'Publications' },
            { to: '/resources/jobs', label: 'Job Openings' },
        ]
    },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setOpenDropdown(null);
    }, [location.pathname]);

    return (
        <>
            <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
                <div className="navbar__inner container">
                    {/* Logo */}
                    <Link to="/" className="navbar__logo" aria-label="IPASUD Kenya — Home">
                        <img
                            src="/assets/logo/logo.jpg"
                            alt="IPASUD Kenya Logo"
                            className="navbar__logo-img"
                            loading="eager"
                        />
                        <div className="navbar__logo-text">
                            <span className="navbar__logo-name">IPASUD Kenya</span>
                            <span className="navbar__logo-sub">Inter-Peace Agency</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="navbar__nav" aria-label="Main navigation">
                        <ul className="navbar__links">
                            {navLinks.map((item, i) =>
                                item.children ? (
                                    <li
                                        key={i}
                                        className="navbar__item navbar__item--dropdown"
                                        onMouseEnter={() => setOpenDropdown(i)}
                                        onMouseLeave={() => setOpenDropdown(null)}
                                    >
                                        <button className="navbar__link navbar__dropdown-trigger" aria-haspopup="true" aria-expanded={openDropdown === i}>
                                            {item.label} <ChevronDown size={14} />
                                        </button>
                                        <ul className={`navbar__dropdown ${openDropdown === i ? 'navbar__dropdown--open' : ''}`} role="menu">
                                            {item.children.map((child, j) => (
                                                <li key={j} role="none">
                                                    <NavLink to={child.to} role="menuitem" className="navbar__dropdown-link">
                                                        {child.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ) : (
                                    <li key={i} className="navbar__item">
                                        <NavLink
                                            to={item.to}
                                            end={item.to === '/'}
                                            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>

                    {/* CTA */}
                    <div className="navbar__cta">
                        <Link to="/donate" className="btn btn-donate" id="donate-nav-btn" aria-label="Donate to IPASUD Kenya">
                            <Heart size={16} fill="currentColor" />
                            Donate Now
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <button
                        className="navbar__hamburger"
                        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(v => !v)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!mobileOpen}>
                <nav aria-label="Mobile navigation">
                    <ul className="mobile-menu__links">
                        {navLinks.map((item, i) =>
                            item.children ? (
                                <li key={i} className="mobile-menu__item">
                                    <button
                                        className="mobile-menu__link mobile-menu__accordion-btn"
                                        onClick={() => setOpenDropdown(openDropdown === i ? null : i)}
                                        aria-expanded={openDropdown === i}
                                    >
                                        {item.label} <ChevronDown size={16} className={openDropdown === i ? 'rotate' : ''} />
                                    </button>
                                    {openDropdown === i && (
                                        <ul className="mobile-menu__sub">
                                            {item.children.map((child, j) => (
                                                <li key={j}>
                                                    <NavLink to={child.to} className="mobile-menu__sub-link">
                                                        {child.label}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ) : (
                                <li key={i} className="mobile-menu__item">
                                    <NavLink
                                        to={item.to}
                                        end={item.to === '/'}
                                        className={({ isActive }) => `mobile-menu__link${isActive ? ' mobile-menu__link--active' : ''}`}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            )
                        )}
                        <li className="mobile-menu__donate">
                            <Link to="/donate" className="btn btn-donate" style={{ width: '100%', justifyContent: 'center' }}>
                                <Heart size={16} fill="currentColor" />
                                Donate Now
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {mobileOpen && (
                <div className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            )}
        </>
    );
}
