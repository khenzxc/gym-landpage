import { useState } from 'react';
import { ArrowRight, Clock3, Dumbbell, MapPin, Menu, Phone, X } from 'lucide-react';
import gymFloor from '../assets/db2.jpg';
import photo1 from '../assets/p1.jpg';
import photo2 from '../assets/p2.jpg';
import photo3 from '../assets/p3.jpg';
import photo4 from '../assets/p4.jpg';
import photo5 from '../assets/p5.jpg';
import photo6 from '../assets/p6.jpg';

const gallery = [photo1, photo2, photo3, photo4, photo5, photo6];

const dailyRates = [
  ['Student pass', '₱79'],
  ['Registered member', '₱99'],
  ['Non-member / walk-in', '₱149'],
];

const monthlyRates = [
  ['Student monthly promo', '₱1,299'],
  ['Regular member monthly', '₱1,599'],
  ['Non-member monthly', '₱2,399'],
];

function LandingPage({ setView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="landing-page">
      <header className="landing-header">
        <a className="landing-brand" href="#home" aria-label="Liftmode Fitness Gym home" onClick={closeMenu}>
          <img src="/logo.png" alt="" />
          <span>Liftmode <small>Fitness Gym</small></span>
        </a>

        <button
          className="landing-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`landing-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#experience" onClick={closeMenu}>The gym</a>
          <a href="#rates" onClick={closeMenu}>Rates</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#visit" onClick={closeMenu}>Find us</a>
          <button className="landing-login" type="button" onClick={() => { closeMenu(); setView('login'); }}>
            Staff login
          </button>
        </nav>
      </header>

      <section className="landing-hero" id="home">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow"><span /> Your neighborhood gym in Pulilan</p>
          <h1>A good place<br />to <em>get stronger.</em></h1>
          <p className="landing-lede">
            A welcoming training space, quality equipment, and helpful coaching—everything you need to make progress at your own pace.
          </p>
          <div className="landing-actions">
            <a className="landing-button landing-button-primary" href="#rates">Explore membership <ArrowRight size={17} /></a>
            <a className="landing-text-link" href="#visit">Plan your visit</a>
          </div>
          <div className="landing-hero-note">
            <span className="landing-note-icon"><Clock3 size={17} /></span>
            <span><strong>Open Monday to Saturday</strong><small>10:00 AM – 9:00 PM</small></span>
          </div>
        </div>
        <div className="landing-hero-image">
          <img src={gymFloor} alt="Inside the Liftmode Fitness Gym training floor" />
          <div className="landing-image-caption"><Dumbbell size={16} /><span>Room to move. Equipment to grow.</span></div>
        </div>
      </section>

      <section className="landing-intro" id="experience">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">Training that fits your life</p>
          <h2>Everything you need.<br /><em>Nothing you don't.</em></h2>
        </div>
        <p className="landing-intro-copy">
          Whether you’re just getting started or working toward a new personal best, you’ll find a comfortable space and a team ready to help.
        </p>
        <div className="landing-benefits">
          <article className="landing-benefit">
            <span className="landing-benefit-number">01</span>
            <h3>Well-equipped floor</h3>
            <p>Strength and cardio equipment for a balanced, practical workout.</p>
          </article>
          <article className="landing-benefit">
            <span className="landing-benefit-number">02</span>
            <h3>Personal coaching</h3>
            <p>Get one-on-one guidance to build confidence and train with good form.</p>
          </article>
          <article className="landing-benefit">
            <span className="landing-benefit-number">03</span>
            <h3>Comfortable space</h3>
            <p>Enjoy an air-conditioned gym with a clean floor and friendly staff.</p>
          </article>
        </div>
      </section>

      <section className="landing-rates" id="rates">
        <div className="landing-section-heading landing-rates-heading">
          <p className="landing-eyebrow">Straightforward pricing</p>
          <h2>Choose the way<br /><em>you want to train.</em></h2>
          <p>Drop in for a session or make training part of your routine.</p>
        </div>
        <div className="landing-rate-layout">
          <div className="landing-rate-card">
            <div className="landing-rate-title">
              <div><span className="landing-card-label">Come by today</span><h3>Daily passes</h3></div>
              <span className="landing-rate-icon"><Dumbbell size={20} /></span>
            </div>
            <RateList rates={dailyRates} />
            <div className="landing-rate-divider" />
            <div className="landing-rate-title">
              <div><span className="landing-card-label">Build a routine</span><h3>Monthly access</h3></div>
              <span className="landing-rate-icon"><Clock3 size={20} /></span>
            </div>
            <RateList rates={monthlyRates} />
          </div>
          <aside className="landing-extras">
            <div className="landing-extra-card">
              <span className="landing-card-label">Membership</span>
              <h3>Get set up</h3>
              <div className="landing-price-line"><span>Enrollment fee</span><strong>₱299</strong></div>
              <div className="landing-price-line"><span>Annual membership</span><strong>₱1,699</strong></div>
            </div>
            <div className="landing-extra-card">
              <span className="landing-card-label">One-on-one guidance</span>
              <h3>Personal coaching</h3>
              <div className="landing-price-line"><span>Single session · member</span><strong>₱399</strong></div>
              <div className="landing-price-line"><span>Single session · non-member</span><strong>₱799</strong></div>
              <div className="landing-price-line"><span>12 sessions · member</span><strong>₱3,999</strong></div>
              <div className="landing-price-line"><span>12 sessions · non-member</span><strong>₱7,999</strong></div>
            </div>
            <p className="landing-rate-footnote">Ask our team about available payment options when you visit.</p>
          </aside>
        </div>
      </section>

      <section className="landing-gallery" id="gallery">
        <div className="landing-gallery-heading">
          <div className="landing-section-heading">
            <p className="landing-eyebrow">A look around</p>
            <h2>See you <em>on the floor.</em></h2>
          </div>
          <p>Take a closer look at the space and equipment waiting for you.</p>
        </div>
        <div className="landing-gallery-grid">
          {gallery.map((photo, index) => (
            <button
              className="landing-gallery-photo"
              key={photo}
              type="button"
              onClick={() => setSelectedPhoto(photo)}
              aria-label={`View gym photo ${index + 1}`}
            >
              <img src={photo} alt={`Liftmode Fitness Gym interior, view ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      <section className="landing-visit" id="visit">
        <div className="landing-visit-copy">
          <p className="landing-eyebrow">Come by for a visit</p>
          <h2>Your next workout<br /><em>starts here.</em></h2>
          <p>Drop in, have a look around, and talk with our team about the right option for you.</p>
          <a className="landing-button landing-button-primary" href="https://maps.google.com/?q=Liftmode+Fitness+Gym+Pedro+Reyes+Pulilan+Bulacan" target="_blank" rel="noreferrer">
            Get directions <ArrowRight size={17} />
          </a>
        </div>
        <div className="landing-visit-details">
          <div className="landing-visit-item">
            <span className="landing-visit-icon"><MapPin size={19} /></span>
            <div><span className="landing-card-label">Find us</span><strong>Pedro Reyes, Pulilan, Bulacan</strong></div>
          </div>
          <div className="landing-visit-item">
            <span className="landing-visit-icon"><Clock3 size={19} /></span>
            <div><span className="landing-card-label">Opening hours</span><strong>Monday–Saturday, 10:00 AM–9:00 PM</strong></div>
          </div>
          <div className="landing-visit-item">
            <span className="landing-visit-icon"><Phone size={19} /></span>
            <div><span className="landing-card-label">Give us a call</span><a href="tel:09257040417">0925 704 0417</a></div>
          </div>
          <a className="landing-social-link" href="https://www.facebook.com/profile.php?id=100094266030662" target="_blank" rel="noreferrer">
            Message Liftmode on Facebook <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand" href="#home">
          <img src="/logo.png" alt="" />
          <span>Liftmode <small>Fitness Gym</small></span>
        </a>
        <p>Train at your own pace. We’ll meet you there.</p>
        <span className="landing-copyright">© {new Date().getFullYear()} Liftmode Fitness Gym · Pulilan, Bulacan</span>
      </footer>

      {selectedPhoto && (
        <div className="landing-lightbox" role="dialog" aria-modal="true" aria-label="Gym photo preview" onClick={() => setSelectedPhoto(null)}>
          <button className="landing-lightbox-close" type="button" onClick={() => setSelectedPhoto(null)} aria-label="Close photo preview"><X size={22} /></button>
          <img src={selectedPhoto} alt="Liftmode Fitness Gym interior" onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

function RateList({ rates }) {
  return (
    <ul className="landing-rate-list">
      {rates.map(([label, price]) => (
        <li key={label}><span>{label}</span><strong>{price}</strong></li>
      ))}
    </ul>
  );
}

export default LandingPage;
