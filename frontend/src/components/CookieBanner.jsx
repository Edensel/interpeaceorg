import React, { useState, useEffect } from 'react';
import './CookieBanner.css';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('ipasud_cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    function acceptAll() {
        localStorage.setItem('ipasud_cookie_consent', 'all');
        setVisible(false);
    }

    function acceptEssential() {
        localStorage.setItem('ipasud_cookie_consent', 'essential');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="cookie-banner" role="dialog" aria-modal="true" aria-label="Cookie preference centre">
            <div className="cookie-banner__inner">
                <div className="cookie-banner__icon">🍪</div>
                <div className="cookie-banner__content">
                    <h3 className="cookie-banner__title">We use cookies</h3>
                    <p className="cookie-banner__text">
                        IPASUD Kenya uses cookies to improve your experience, analyse site traffic, and personalise content.
                        Essential cookies are required for the site to function. By clicking "Accept All", you consent to
                        all cookies in accordance with our{' '}
                        <a href="/data-protection" className="cookie-banner__link">Data Protection Policy</a>.
                    </p>

                    {showDetails && (
                        <div className="cookie-banner__details">
                            <div className="cookie-type">
                                <div className="cookie-type__header">
                                    <strong>Essential Cookies</strong>
                                    <span className="cookie-badge cookie-badge--required">Always On</span>
                                </div>
                                <p>Required for the website to function — login, navigation, security.</p>
                            </div>
                            <div className="cookie-type">
                                <div className="cookie-type__header">
                                    <strong>Analytics Cookies</strong>
                                    <span className="cookie-badge">Optional</span>
                                </div>
                                <p>Help us understand how visitors use our site so we can improve it.</p>
                            </div>
                        </div>
                    )}

                    <button
                        className="cookie-banner__toggle"
                        onClick={() => setShowDetails(d => !d)}
                    >
                        {showDetails ? 'Hide details ▲' : 'Cookie details ▼'}
                    </button>
                </div>

                <div className="cookie-banner__actions">
                    <button className="btn btn-secondary cookie-btn" onClick={acceptEssential}>
                        Essential Only
                    </button>
                    <button className="btn btn-primary cookie-btn" onClick={acceptAll}>
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
