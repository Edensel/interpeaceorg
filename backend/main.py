from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import logging
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="IPASUD Kenya API",
    description="Backend API for the IPASUD Kenya international NGO website",
    version="1.0.0",
)

# CORS — allow the React dev server and the production domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://interpeaceagency.org",
        "https://www.interpeaceagency.org",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Email Config (set via environment variables or edit directly for testing)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")          # e.g. your-email@gmail.com
SMTP_PASS = os.getenv("SMTP_PASS", "")          # App password
TO_EMAIL  = os.getenv("TO_EMAIL", "info@interpeaceagency.org")


def send_email(subject: str, body: str, reply_to: str = "") -> bool:
    """Send an email via SMTP. Returns True on success, False on failure."""
    if not SMTP_USER or not SMTP_PASS:
        logger.warning("SMTP credentials not configured — skipping email send.")
        return False
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"]    = SMTP_USER
        msg["To"]      = TO_EMAIL
        if reply_to:
            msg["Reply-To"] = reply_to
        msg.attach(MIMEText(body, "plain"))
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, TO_EMAIL, msg.as_string())
        logger.info(f"Email sent: {subject}")
        return True
    except Exception as e:
        logger.error(f"Email send failed: {e}")
        return False


# ── Schemas ──────────────────────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class NewsletterSignup(BaseModel):
    email: str
    name: str | None = None


# ── Routes ───────────────────────────────────────────────────────────────────
@app.get("/")
def health():
    return {"status": "ok", "organisation": "IPASUD Kenya", "api_version": "1.0.0"}


@app.get("/api/health")
def api_health():
    return {"status": "healthy"}


@app.post("/api/contact")
async def contact(form: ContactForm):
    """
    Process a contact form submission and optionally send an email.
    Set SMTP_USER and SMTP_PASS environment variables to enable email delivery.
    Without them, the form data is logged and a success response is returned.
    """
    logger.info(f"Contact form received from {form.email} — subject: {form.subject}")

    body = (
        f"New contact form submission from IPASUD Kenya website\n"
        f"{'='*60}\n"
        f"Name:    {form.name}\n"
        f"Email:   {form.email}\n"
        f"Subject: {form.subject}\n"
        f"{'='*60}\n"
        f"Message:\n{form.message}\n"
    )

    email_sent = send_email(
        subject=f"Website Contact: {form.subject} — from {form.name}",
        body=body,
        reply_to=form.email,
    )

    if not email_sent:
        # Log to console — team can check server logs
        logger.info(f"[CONTACT LOG]\n{body}")

    return {
        "success": True,
        "message": "Thank you for contacting IPASUD Kenya. We'll respond within 2 business days.",
        "email_sent": email_sent,
    }


@app.post("/api/newsletter")
async def newsletter(signup: NewsletterSignup):
    """
    Subscribe to the IPASUD Kenya newsletter.
    In production: integrate Mailchimp / Mailerlite / SendGrid.
    """
    logger.info(f"Newsletter signup: {signup.email}")

    body = f"New newsletter subscription\nName: {signup.name or 'N/A'}\nEmail: {signup.email}"
    send_email(subject="New Newsletter Subscription — IPASUD Kenya", body=body)

    return {
        "success": True,
        "message": "You have been subscribed to our newsletter. Thank you!",
    }


@app.get("/api/news")
def get_news(limit: int = 10, category: str | None = None):
    """
    Return news articles (static for now — connect to DB later).
    """
    from data_store import NEWS_ARTICLES
    articles = NEWS_ARTICLES
    if category:
        articles = [a for a in articles if a["category"].lower() == category.lower()]
    return {"articles": articles[:limit], "total": len(articles)}


if __name__ == "__main__":
    import uvicorn
    print("\n" + "="*60)
    print("IPASUD Kenya Backend API")
    print("="*60)
    print(f"Running at: http://localhost:8000")
    print(f"API docs:   http://localhost:8000/docs")
    print(f"Email:      {'Configured ✓' if SMTP_USER else 'Not configured (set SMTP_USER, SMTP_PASS env vars)'}")
    print("="*60 + "\n")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
