import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { openPolicyPDF } from '../utils/policyPDF';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer" role="contentinfo">
            {/* Top CTA Strip */}
            <div className="footer__cta-strip">
                <div className="container footer__cta-inner">
                    <div className="footer__cta-text">
                        <h3>Make a Difference Today</h3>
                        <p>Your support helps us build lasting peace in Turkana and beyond.</p>
                    </div>
                    <Link to="/donate" className="btn btn-donate footer__cta-btn" id="footer-donate-btn">
                        <Heart size={18} fill="currentColor" />
                        Donate Now
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer__main">
                <div className="container footer__grid">
                    {/* Brand */}
                    <div className="footer__col footer__col--brand">
                        <Link to="/" className="footer__logo">
                            <img src="/assets/logo/logo.jpg" alt="IPASUD Kenya" loading="lazy" />
                            <div>
                                <span className="footer__logo-name">IPASUD Kenya</span>
                                <span className="footer__logo-tagline">Inter-Peace Agency for Sustainable Development</span>
                            </div>
                        </Link>
                        <p className="footer__desc">
                            A registered international non-governmental organisation dedicated to building peace,
                            resolving conflicts, and promoting sustainable development across the Ateker region
                            of East Africa.
                        </p>
                        <div className="footer__social" aria-label="Social media links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                                <Facebook size={18} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="footer__social-link">
                                <Twitter size={18} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-link">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Quick Links</h4>
                        <ul className="footer__links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/team">Our Team</Link></li>
                            <li><Link to="/programmes/wash">Programmes</Link></li>
                            <li><Link to="/projects">Projects</Link></li>
                            <li><Link to="/news">News &amp; Updates</Link></li>
                            <li><Link to="/resources">Resources</Link></li>
                            <li><Link to="/donate">Donate</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Thematic Areas */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Our Programmes</h4>
                        <ul className="footer__links">
                            <li><Link to="/programmes/wash">WASH</Link></li>
                            <li><Link to="/programmes/education">Education</Link></li>
                            <li><Link to="/programmes/refugees">Refugees &amp; Migration</Link></li>
                            <li><Link to="/programmes/food-security">Food Security</Link></li>
                            <li><Link to="/programmes/climate">Climate Change</Link></li>
                            <li><Link to="/projects/success-stories">Success Stories</Link></li>
                            <li><Link to="/resources">Evaluation Reports</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Contact Us</h4>
                        <ul className="footer__contact-list">
                            <li>
                                <MapPin size={16} />
                                <span>Lodwar Town, Turkana County<br />Kenya, East Africa</span>
                            </li>
                            <li>
                                <Mail size={16} />
                                <a href="mailto:info@interpeaceagency.org">info@interpeaceagency.org</a>
                            </li>
                            <li>
                                <Phone size={16} />
                                <a href="tel:+254716397042">+254 716 397 042</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <p>&copy; {year} IPASUD Kenya — Inter-Peace Agency for Sustainable Development. All rights reserved.</p>
                    <div className="footer__legal">
                        <button
                            onClick={openPolicyPDF}
                            className="footer__policy-link"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
                        >
                            Data Protection Policy
                        </button>
                        <Link to="/resources">Transparency Reports</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
