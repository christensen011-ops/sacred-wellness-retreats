import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";

const theme = {
  sand: "#F5EFE0",
  cream: "#FAF7F2",
  beige: "#E8DCC8",
  olive: "#6B7A5E",
  oliveLight: "#8A9B7A",
  oliveDark: "#4A5840",
  bark: "#8B7355",
  stone: "#9A8F82",
  charcoal: "#2C2C2A",
  white: "#FEFEFE",
  accent: "#C4A882",
};

// ─── SEO META TAGS ────────────────────────────────────────────────────────────
const pageMeta = {
  home: {
    title: "Sacred Wellness Retreats | Nervous System Reset & Meditation Retreats",
    description: "Premium 5-day wellness retreats in Tulum, Belize, and Bali. Designed for nervous system reset, deep meditation, breathwork, and emotional clarity. Led by Parmananda.",
  },
  retreats: {
    title: "Retreat Dates & Locations | Sacred Wellness Retreats",
    description: "Browse upcoming wellness retreats in Tulum Mexico, Orange Walk Belize, and Ubud Bali. Small groups of 8–12 guests. Book your spot for 2026.",
  },
  "retreat-detail": {
    title: "Retreat Details | Sacred Wellness Retreats",
    description: "Explore what's included in your Sacred Wellness Retreat — daily yoga, breathwork, somatic practices, clean meals, and deep integration work.",
  },
  about: {
    title: "About Parmananda | Sacred Wellness Retreats",
    description: "Meet Parmananda, founder of Sacred Wellness Retreats. 9 years hosting transformational retreats across Mexico, Belize, and Bali.",
  },
  apply: {
    title: "Apply to Join a Retreat | Sacred Wellness Retreats",
    description: "Apply to join an upcoming Sacred Wellness Retreat. Spots are limited to 8–12 guests per retreat for a deeply personal experience.",
  },
  contact: {
    title: "Contact Us | Sacred Wellness Retreats",
    description: "Get in touch with the Sacred Wellness Retreats team. Email us or reach out on WhatsApp.",
  },
  booking: {
    title: "Book Your Retreat | Sacred Wellness Retreats",
    description: "Reserve your spot at a Sacred Wellness Retreat. Pay a deposit or in full. Secure checkout powered by Stripe.",
  },
  privacy: {
    title: "Privacy Policy | Sacred Wellness Retreats",
    description: "Sacred Wellness Retreats privacy policy — how we collect, use, and protect your personal information.",
  },
  terms: {
    title: "Terms & Conditions | Sacred Wellness Retreats",
    description: "Sacred Wellness Retreats terms and conditions — bookings, cancellations, refunds, and participant guidelines.",
  },
};

function useSEO(page) {
  useEffect(() => {
    const meta = pageMeta[page] || pageMeta.home;
    document.title = meta.title;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) { desc = document.createElement("meta"); desc.name = "description"; document.head.appendChild(desc); }
    desc.content = meta.description;
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement("meta"); ogTitle.setAttribute("property","og:title"); document.head.appendChild(ogTitle); }
    ogTitle.content = meta.title;
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) { ogDesc = document.createElement("meta"); ogDesc.setAttribute("property","og:description"); document.head.appendChild(ogDesc); }
    ogDesc.content = meta.description;
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) { ogImg = document.createElement("meta"); ogImg.setAttribute("property","og:image"); document.head.appendChild(ogImg); }
    ogImg.content = "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505014/Tropical_sunrise_from_a_balcony_w4ddcv.png";
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) { ogUrl = document.createElement("meta"); ogUrl.setAttribute("property","og:url"); document.head.appendChild(ogUrl); }
    ogUrl.content = "https://sacredwellnessretreats.com";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://sacredwellnessretreats.com";
    // Twitter/X Card tags
    const twitterTags = {
      "twitter:card": "summary_large_image",
      "twitter:site": "@sacredwellness",
      "twitter:title": meta.title,
      "twitter:description": meta.description,
      "twitter:image": "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505014/Tropical_sunrise_from_a_balcony_w4ddcv.png",
    };
    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement("meta"); tag.name = name; document.head.appendChild(tag); }
      tag.content = content;
    });
    let schema = document.querySelector('#sacred-schema');
    if (!schema) { schema = document.createElement("script"); schema.id = "sacred-schema"; schema.type = "application/ld+json"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristInformationCenter",
      "name": "Sacred Wellness Retreats",
      "description": "Premium 5-day wellness retreats for nervous system reset, meditation, breathwork, and emotional clarity.",
      "url": "https://sacredwellnessretreats.com",
      "email": "info@sacredwellnessretreats.com",
      "image": "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505014/Tropical_sunrise_from_a_balcony_w4ddcv.png",
      "founder": { "@type": "Person", "name": "Parmananda" },
      "offers": retreats.map(r => ({
        "@type": "Offer",
        "name": r.name,
        "description": r.description,
        "price": r.price.replace("$",""),
        "priceCurrency": "USD",
        "url": "https://sacredwellnessretreats.com",
        "availability": "https://schema.org/InStock",
      })),
    });
  }, [page]);
}

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
`;

const globalStyles = `
  ${fonts}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { 
    font-family: 'DM Sans', sans-serif; 
    background: ${theme.cream}; 
    color: ${theme.charcoal}; 
    -webkit-font-smoothing: antialiased;
  }
  h1,h2,h3,h4,h5 { font-family: 'Cormorant Garamond', serif; }

  .fade-in { animation: fadeUp 0.8s ease forwards; opacity: 0; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .delay-1 { animation-delay: 0.15s; }
  .delay-2 { animation-delay: 0.3s; }
  .delay-3 { animation-delay: 0.45s; }
  .delay-4 { animation-delay: 0.6s; }

  .btn-primary {
    display: inline-block;
    background: ${theme.oliveDark};
    color: ${theme.cream};
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 14px 32px;
    border: none;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    text-decoration: none;
  }
  .btn-primary:hover { background: ${theme.olive}; transform: translateY(-1px); }

  .btn-outline {
    display: inline-block;
    background: transparent;
    color: ${theme.cream};
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 13px 30px;
    border: 1px solid rgba(255,255,255,0.6);
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }

  .btn-dark-outline {
    display: inline-block;
    background: transparent;
    color: ${theme.charcoal};
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 13px 30px;
    border: 1px solid ${theme.charcoal};
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
  }
  .btn-dark-outline:hover { background: ${theme.charcoal}; color: ${theme.cream}; }

  section { padding: 80px 24px; }
  .container { max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${theme.olive};
    margin-bottom: 16px;
    display: block;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 400;
    line-height: 1.15;
    color: ${theme.charcoal};
    margin-bottom: 20px;
  }
  .section-sub {
    font-size: 1rem;
    line-height: 1.7;
    color: ${theme.stone};
    max-width: 520px;
  }
  hr.divider {
    border: none;
    border-top: 1px solid ${theme.beige};
    margin: 0;
  }
  @media (max-width: 767px) {
    section { padding: 60px 20px; }
    .section-title { font-size: 1.8rem !important; }
    .container { padding: 0 4px; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const retreats = [
  {
    id: 2,
    name: "Belize Jungle Immersion",
    location: "Orange Walk, Belize",
    dates: "Jul 3–7, 2026",
    price: "$3,600",
    deposit: "$900",
    tagline: "Disappear into the ancient Maya forest and return to what matters.",
    image: "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774913070/Belize-lamanai-group-yoga-warrior_myyjzb.webp",
    description: "Hidden within the lush lowland jungle of northern Belize, this retreat draws on the land's ancient Maya lineage. Days move slowly here — breathwork at dawn, ceremonial cacao, river swims, and evenings around the fire in genuine stillness.",
    included: ["5 nights accommodation", "All meals — plant-forward and freshly prepared", "Daily yoga, meditation & breathwork", "Nervous system regulation sessions", "Group integration circles", "All retreat programming & ceremonies", "Airport transfers from Belize City"],
    excluded: ["International flights", "Travel insurance", "Personal expenses", "Optional private cabana upgrade (+$600)"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Land Connection", content: "Transfer from Belize City, welcome circle, land acknowledgment ceremony, sunset meditation, communal dinner." },
      { day: "Day 2", title: "Roots & Breath", content: "Sunrise breathwork, jungle walk with local guide, cacao ceremony, afternoon integration, group sharing circle." },
      { day: "Day 3", title: "River & Release", content: "Morning yoga, river immersion, somatic movement, free time, evening sound healing." },
      { day: "Day 4", title: "Stillness & Clarity", content: "Silent morning, guided meditation, journaling workshop, Maya ruin visit, emotional release session." },
      { day: "Day 5", title: "Integration & Closing", content: "Final yoga, gratitude circle, closing fire ceremony, farewell feast, departures." },
    ],
  },
  {
    id: 3,
    name: "Bali Mountain Sanctuary",
    location: "Ubud, Bali",
    dates: "Sep 5–9, 2026",
    price: "$4,200",
    deposit: "$1,050",
    tagline: "Ancient healing meets modern wellness in the heart of Bali.",
    image: "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774911904/geio-tischler-7hww7t6NLcg-unsplash_qvuqs8.jpg",
    description: "Set among emerald rice terraces and sacred temples, this Balinese immersion weaves traditional Usui Reiki, Balinese healing rituals, and daily Hatha yoga into a complete reset experience.",
    included: ["5 nights accommodation", "All meals — plant-forward and freshly prepared", "Daily yoga, meditation & breathwork", "Nervous system regulation sessions", "Group integration circles", "All retreat programming & ceremonies", "In-retreat transportation"],
    excluded: ["International flights", "Travel insurance", "Bali visa (if applicable)", "Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Sacred Arrival", content: "Temple blessing, orientation, opening meditation, welcome dinner." },
      { day: "Day 2", title: "Ancient Practices", content: "Sunrise yoga, Balinese healer session, cooking class, evening Reiki." },
      { day: "Day 3", title: "Water Purification", content: "Melukat water blessing ceremony, breathwork, rice terrace walk, rest." },
      { day: "Day 4", title: "Stillness", content: "Silent morning, forest meditation, journaling, group sharing, sound healing." },
      { day: "Day 5", title: "Closing Ceremony", content: "Final yoga, integration circle, Balinese ceremony, farewell feast." },
    ],
  },
  {
    id: 1,
    name: "Tulum Jungle Reset",
    location: "Tulum, Mexico",
    dates: "Oct 22–26, 2026",
    price: "$3,200",
    deposit: "$800",
    tagline: "Reconnect with the earth in a private jungle sanctuary.",
    image: "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505031/TULUM2_zegncv.jpg",
    description: "Nestled among ancient ceiba trees and cenotes, this retreat guides you into profound stillness through daily somatic practices, ceremonial cacao, and sunrise yoga overlooking the jungle canopy.",
    included: ["5 nights accommodation", "All meals — plant-forward and freshly prepared", "Daily yoga, meditation & breathwork", "Nervous system regulation sessions", "Group integration circles", "All retreat programming & ceremonies", "In-retreat transportation"],
    excluded: ["International flights", "Travel insurance", "Personal expenses"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Grounding", content: "Airport transfer, welcome circle, grounding ceremony, sunset yin yoga, nourishing dinner." },
      { day: "Day 2", title: "Nervous System Immersion", content: "Sunrise breathwork, cold immersion, somatic movement, afternoon integration, group sharing." },
      { day: "Day 3", title: "Deep Rest", content: "Slow morning, sound healing, free time, guided forest walk, restorative yoga." },
      { day: "Day 4", title: "Inner Clarity", content: "Sunrise meditation, journaling workshop, cenote swim, emotional release session." },
      { day: "Day 5", title: "Integration & Closing", content: "Morning yoga, gratitude circle, closing ceremony, farewell lunch, transfers." },
    ],
  },
];

const testimonials = [
  { name: "Anthony Sosa", role: "Retreat Guest · Belize, Mexico & Vietnam", quote: "Absolutely incredible, life enhancing and changing experiences. Every time I've had a truly exceptional experience. The food is always healthy and conscious. Healing is a life long process — and this is where it happens." },
  { name: "Kimberly Hutton", role: "Retreat Guest · Mexico", quote: "I went for healing and to get out of my comfort zone. Everyone was so friendly and open without judgment. I felt like I could be my complete self. It was everything you want in a trip. I'll definitely be back." },
  { name: "Carolin", role: "Retreat Guest", quote: "I got the chance to bring body, mind and soul in balance with lots of yoga, meditation and excursions. A beautiful get-away with beautiful people. I highly recommend it!" },
  { name: "Anne Leonards", role: "Retreat Guest · Belize", quote: "Life changing experience! Such beauty and simplicity, really helps you connect to your true self. Being around people who genuinely care and love is cleansing. The food is delicious and the cabins are cozy!" },
  { name: "J", role: "Local Guide · Retreat Guest", quote: "Life enriching experiences with kindred spirits. Can't stress enough just how valuable it is to invest in these sorts of retreats. You'll spend the rest of your life thanking yourself for the important inner work you do here." },
  { name: "Madison Mcgarvey", role: "Retreat Guest · Belize", quote: "Professional and attentive retreat guides, and an overall unforgettable and fun experience! I went with the Belize retreat and look forward to going on many more. I highly recommend it!" },
  { name: "Victoria Murray", role: "Retreat Guest", quote: "Have you ever had such an incredible experience, you were touched mind, body and soul? I have. I was made to feel strong and flexible with each breath. After long hours meditating, this yoga was heaven sent. Anyone who joins is very fortunate." },
  { name: "Laura Johnston", role: "Retreat Guest", quote: "The guidance has been SO helpful with my yoga journey — always suggestions to help me along, given with a gentle and knowledgeable nature. I look forward to taking more classes in the beautiful places they have retreats!" },
  { name: "David Friedrich", role: "Retreat Guest · Belize", quote: "My girlfriend and I had an exceptional experience. Our guides helped us with everything and made sure we were very comfortable. We will be doing another trip very soon!" },
  { name: "Joseph Grygier", role: "Retreat Guest", quote: "This group is amazing. They guide you through everything you need — from travel, to healing ceremonies and methods, to great food. Will continue to move forward with them in the future." },
  { name: "Minksah", role: "Retreat Guest", quote: "Amazing food and company always! There's always something to learn and to be shared. Energy here is unbeatable!" },
  { name: "Dulce Duran", role: "Retreat Guest", quote: "I am very glad I did this trip with very lovely people, very welcoming and such great positive energy. Thank you for your enthusiasm and dedication. Mucho respeto y amor!" },
  { name: "Billy Martin", role: "Retreat Guest", quote: "Great hosts and guidance in this magnificent journey! Highly recommend for those who are interested in a unique, breath-taking experience!" },
  { name: "Isaac Romo", role: "Retreat Guest", quote: "Amazing experience. This experience changed my life. Thank you so much." },
  { name: "Shelly Carpenter", role: "Local Guide · Retreat Guest", quote: "Thanks for the opportunity to help change." },
];

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const nav = (path) => { navigate(path); setMenuOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(250,247,242,0.98)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${theme.beige}` : "none",
        transition: "all 0.4s ease",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <button onClick={() => nav("/")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 500, color: scrolled || menuOpen ? theme.charcoal : theme.cream, letterSpacing: "0.03em", lineHeight: 1.1 }}>
              Sacred<br /><span style={{ fontWeight: 300, fontStyle: "italic" }}>Wellness Retreats</span>
            </div>
          </button>
          <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {[["/","Home"],["/retreats","Retreats"],["/about","About"],["/contact","Contact"]].map(([path,label]) => (
              <button key={path} onClick={() => nav(path)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: scrolled ? theme.charcoal : "rgba(255,255,255,0.85)",
                fontWeight: 400, transition: "color 0.2s", display: "none",
              }} className="desktop-nav-item">{label}</button>
            ))}
            <button className="btn-primary desktop-nav-item" onClick={() => nav("/apply")} style={{ padding: "10px 22px", fontSize: "0.75rem" }}>Apply Now</button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{
              background: "none", border: "none", cursor: "pointer", padding: 4,
              display: "flex", flexDirection: "column", gap: 5, justifyContent: "center",
            }} className="hamburger-btn" aria-label="Menu">
              <span style={{ display: "block", width: 24, height: 1.5, background: scrolled || menuOpen ? theme.charcoal : theme.white, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", width: 24, height: 1.5, background: scrolled || menuOpen ? theme.charcoal : theme.white, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 24, height: 1.5, background: scrolled || menuOpen ? theme.charcoal : theme.white, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </nav>
        </div>
      </header>
      <div style={{
        position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
        background: "rgba(250,247,242,0.98)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.beige}`,
        padding: menuOpen ? "24px" : "0 24px",
        maxHeight: menuOpen ? 400 : 0,
        overflow: "hidden",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[["/","Home"],["/retreats","Retreats"],["/about","About"],["/contact","Contact"],["/apply","Apply Now"]].map(([path,label]) => (
            <button key={path} onClick={() => nav(path)} style={{
              background: "none", border: "none", cursor: "pointer", textAlign: "left",
              fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300,
              color: theme.charcoal, padding: "10px 0", borderBottom: `1px solid ${theme.beige}`,
              transition: "color 0.2s",
            }}>{label}</button>
          ))}
          <a href="https://wa.me/18322911127" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 16,
            color: "#25D366", fontSize: "0.85rem", textDecoration: "none",
            fontFamily: "'DM Sans',sans-serif",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav-item { display: block !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav-item { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  return (
    <div style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505014/Tropical_sunrise_from_a_balcony_w4ddcv.png)",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(30,30,25,0.55) 0%, rgba(20,22,18,0.45) 60%, rgba(10,12,8,0.7) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 24px", paddingTop: 80 }}>
        <span className="fade-in" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: theme.accent, marginBottom: 24, display: "block" }}>
          ✦ 5-Day Curated Retreats
        </span>
        <h1 className="fade-in delay-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 300, color: theme.white, lineHeight: 1.12, marginBottom: 24, maxWidth: 700 }}>
          Reset Your Mind.<br />Recalibrate Your Body.<br /><em>Return Renewed.</em>
        </h1>
        <p className="fade-in delay-2" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 480, marginBottom: 44 }}>
          5-day curated wellness retreats designed for nervous system reset, clarity, and deep restoration.
        </p>
        <div className="fade-in delay-3" style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => { navigate("/retreats"); window.scrollTo(0,0); }}>View Retreat Dates</button>
          <button className="btn-outline" onClick={() => { navigate("/apply"); window.scrollTo(0,0); }}>Apply Now</button>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 2 }}>
        <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.35)", margin: "0 auto", animation: "pulse 2s infinite" }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:.3}50%{opacity:.9} }`}</style>
    </div>
  );
}

// ─── PILLARS ──────────────────────────────────────────────────────────────────
function Pillars() {
  const items = [
    { icon: "◎", title: "Nervous System Reset", desc: "Evidence-informed practices that regulate your stress response and restore baseline calm." },
    { icon: "◇", title: "Mind & Body Practices", desc: "Yoga, meditation, and breathwork sequenced to unlock clarity and embodied awareness." },
    { icon: "○", title: "Emotional Clarity", desc: "Guided integration sessions that help you process, release, and return with purpose." },
  ];
  return (
    <section style={{ background: theme.cream, padding: "80px 24px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label">The Method</span>
          <h2 className="section-title">Three Pillars of Transformation</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40 }}>
          {items.map((it, i) => (
            <div key={i} style={{ textAlign: "center", padding: "40px 24px", background: theme.white, borderTop: `3px solid ${theme.olive}` }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", color: theme.olive, marginBottom: 20 }}>{it.icon}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 500, marginBottom: 12, color: theme.charcoal }}>{it.title}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: theme.stone }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[idx];
  return (
    <section style={{ background: theme.oliveDark, padding: "80px 24px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 16 }}>⭐⭐⭐⭐⭐ 5.0 · 20 Google Reviews</span>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", color: theme.accent, marginBottom: 16 }}>"</div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 28, minHeight: 80 }}>
            {t.quote}
          </p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em", color: theme.accent }}>{t.name}</p>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{t.role}</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 28 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width: i===idx?24:8, height: 8, borderRadius: 4, background: i===idx?theme.accent:"rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── RETREAT CARD ─────────────────────────────────────────────────────────────
function RetreatCard({ retreat }) {
  const navigate = useNavigate();
  return (
    <div style={{ background: theme.white, overflow: "hidden", transition: "transform 0.3s", cursor: "pointer" }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      <div style={{ height: 220, backgroundImage: `url(${retreat.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 16, left: 16, background: theme.olive, color: theme.cream, fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 12px" }}>
          {retreat.location}
        </div>
      </div>
      <div style={{ padding: "28px 28px 32px" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 500, marginBottom: 8, color: theme.charcoal }}>{retreat.name}</h3>
        <p style={{ fontSize: "0.85rem", color: theme.stone, marginBottom: 8 }}>{retreat.dates}</p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: theme.olive }}>{retreat.price} <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans',sans-serif", color: theme.stone }}>/ person</span></p>
          <p style={{ fontSize: "0.78rem", color: theme.stone }}>or <span style={{ color: theme.bark, fontWeight: 500 }}>{retreat.deposit} deposit</span></p>
        </div>
        <p style={{ fontSize: "0.75rem", color: theme.stone, marginBottom: 12, fontStyle: "italic" }}>✈ Flights not included</p>
        <p style={{ fontSize: "0.87rem", color: theme.stone, lineHeight: 1.6, marginBottom: 24 }}>{retreat.tagline}</p>
        <button className="btn-dark-outline" style={{ width: "100%", textAlign: "center" }} onClick={() => { navigate(`/retreat/${retreat.id}`); window.scrollTo(0,0); }}>
          View Retreat
        </button>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Hero />
      <Pillars />
      <section style={{ background: theme.sand, padding: "80px 24px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
            <div>
              <span className="section-label">Upcoming Retreats</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Find Your Reset</h2>
            </div>
            <button className="btn-dark-outline" onClick={() => { navigate("/retreats"); window.scrollTo(0,0); }}>View All Dates</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 28 }}>
            {retreats.map(r => <RetreatCard key={r.id} retreat={r} />)}
          </div>
        </div>
      </section>
      <Testimonials />
      {/* Instagram Placeholder */}
      <section style={{ background: theme.cream, padding: "80px 24px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-label">@sacredwellnessretreats</span>
          <h2 className="section-title" style={{ marginBottom: 40 }}>Life is Sacred</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, maxWidth: 600, margin: "0 auto 40px" }}>
            {[
              "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505014/Tropical_sunrise_from_a_balcony_w4ddcv.png",
              "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774913070/Belize-lamanai-group-yoga-warrior_myyjzb.webp",
              "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774911912/steve-douglas-ioJVccFmWxE-unsplash_eeptut.jpg",
              "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774557361/Swimming_in_Belize_anzopc.jpg",
              "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774911922/simone-bernardini-Q5CdGIkxGVs-unsplash_bnnubx.jpg",
              "https://res.cloudinary.com/dyuinj9pz/image/upload/v1774505031/TULUM2_zegncv.jpg",
            ].map((src, i) => (
              <div key={i} style={{ aspectRatio: "1", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section style={{ background: theme.oliveDark, padding: "100px 24px", textAlign: "center" }}>
        <div className="container">
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 20 }}>Limited Spots Available</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, color: theme.white, marginBottom: 20, lineHeight: 1.2 }}>
            Spots are limited.<br /><em>Your reset is waiting.</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>Apply to join our next retreat and begin your journey back to yourself.</p>
          <button className="btn-primary" style={{ background: theme.accent, color: theme.charcoal }} onClick={() => { navigate("/apply"); window.scrollTo(0,0); }}>Apply Now</button>
        </div>
      </section>
    </>
  );
}

// ─── RETREATS PAGE ────────────────────────────────────────────────────────────
function RetreatsPage() {
  return (
    <>
      <div style={{ background: theme.oliveDark, padding: "140px 24px 80px", textAlign: "center" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 16 }}>2026 Season</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 300, color: theme.white, marginBottom: 16 }}>Upcoming Retreats</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", maxWidth: 420, margin: "0 auto" }}>Each retreat is intentionally small — 8 to 12 guests — for a deeply personal experience.</p>
      </div>
      <section style={{ background: theme.cream, padding: "80px 24px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 32 }}>
            {retreats.map(r => <RetreatCard key={r.id} retreat={r} />)}
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}

// ─── RETREAT DETAIL PAGE ──────────────────────────────────────────────────────
function RetreatDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const retreat = retreats.find(r => r.id === parseInt(id)) || retreats[0];
  const [openDay, setOpenDay] = useState(null);
  const [stickyVisible, setStickyVisible] = useState(false);
  useEffect(() => {
    const fn = () => setStickyVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const experiences = ["Daily meditation & breathwork", "Yoga & mindful movement", "Nervous system regulation practices", "Group integration sessions", "Clean, nourishing meals", "1:1 somatic coaching session", "Nature immersions & ceremonies"];

  return (
    <>
      {/* Hero */}
      <div style={{ position: "relative", height: "70vh", minHeight: 480, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${retreat.image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,22,18,0.55)" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 24px 56px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 12 }}>{retreat.location}</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: theme.white, marginBottom: 12 }}>{retreat.name}</h1>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>📅 {retreat.dates}</span>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32, alignItems: "baseline" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: theme.white }}>{retreat.price} <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>full price</span></span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>or</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", color: theme.accent }}>{retreat.deposit} <span style={{ fontSize: "0.8rem", fontFamily: "'DM Sans',sans-serif", color: "rgba(255,255,255,0.6)" }}>to reserve your spot today</span></span>
            </div>
            <button className="btn-primary" style={{ background: theme.accent, color: theme.charcoal }} onClick={() => { navigate(`/booking/${retreat.id}`); window.scrollTo(0,0); }}>Reserve Your Spot</button>
          </div>
        </div>
      </div>

      <section style={{ background: theme.cream, padding: "80px 24px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 80, maxWidth: 760 }}>
          {/* Overview */}
          <div>
            <span className="section-label">Overview</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 20, color: theme.charcoal }}>Your Transformation Awaits</h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: theme.stone }}>{retreat.description}</p>
          </div>
          <hr className="divider" />
          {/* Experience */}
          <div>
            <span className="section-label">What You'll Experience</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 28, color: theme.charcoal }}>Five Days of Deep Restoration</h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {experiences.map((e, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", fontSize: "0.95rem", color: theme.charcoal }}>
                  <span style={{ color: theme.olive, marginTop: 2, flexShrink: 0 }}>✦</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <hr className="divider" />
          {/* What's Included / Excluded */}
          <div>
            <span className="section-label">Pricing Transparency</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 28, color: theme.charcoal }}>What's Included</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              <div style={{ background: theme.white, padding: "28px", borderTop: `3px solid ${theme.olive}` }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 16 }}>✓ Included</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {retreat.included.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: theme.charcoal, lineHeight: 1.5 }}>
                      <span style={{ color: theme.olive, flexShrink: 0 }}>✦</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: theme.white, padding: "28px", borderTop: `3px solid ${theme.beige}` }}>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.stone, marginBottom: 16 }}>✗ Not Included</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {retreat.excluded.map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, fontSize: "0.88rem", color: theme.stone, lineHeight: 1.5 }}>
                      <span style={{ color: theme.stone, flexShrink: 0 }}>—</span>{item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: "0.78rem", color: theme.stone, marginTop: 16, fontStyle: "italic", lineHeight: 1.6 }}>We strongly recommend purchasing travel insurance before booking.</p>
              </div>
            </div>
          </div>
          <hr className="divider" />
          {/* Itinerary */}
          <div>
            <span className="section-label">Schedule</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 28, color: theme.charcoal }}>Itinerary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {retreat.itinerary.map((item, i) => (
                <div key={i} style={{ borderTop: `1px solid ${theme.beige}` }}>
                  <button onClick={() => setOpenDay(openDay===i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive }}>{item.day}</span>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", color: theme.charcoal }}>{item.title}</span>
                    </div>
                    <span style={{ color: theme.stone, fontSize: "1.2rem", transition: "transform 0.3s", transform: openDay===i?"rotate(45deg)":"rotate(0)" }}>+</span>
                  </button>
                  {openDay===i && <p style={{ fontSize: "0.9rem", color: theme.stone, lineHeight: 1.7, paddingBottom: 18 }}>{item.content}</p>}
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${theme.beige}` }} />
            </div>
          </div>
          <hr className="divider" />
          {/* Accommodations */}
          <div>
            <span className="section-label">Stay</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 20, color: theme.charcoal }}>Accommodations</h2>
            {retreat.id === 2 ? (
              <>
                <div style={{ marginBottom: 32, height: 420, backgroundImage: `url(https://res.cloudinary.com/dyuinj9pz/image/upload/v1774921234/20171217-IMG_3004-scaled_fxjqqt.webp)`, backgroundSize: "cover", backgroundPosition: "center center" }} />
                <p style={{ fontSize: "0.92rem", color: theme.stone, lineHeight: 1.8, marginBottom: 28 }}>
                  You'll be staying in private thatched-roof cabanas nestled in a lush tropical garden. Each cabana is a self-contained sanctuary — cool, quiet, and surrounded by nature.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                  <div style={{ background: theme.white, padding: "28px", borderTop: `3px solid ${theme.olive}` }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", marginBottom: 8, color: theme.charcoal }}>Shared Cabana</h4>
                    <p style={{ fontSize: "0.85rem", color: theme.stone, lineHeight: 1.7, marginBottom: 12 }}>A private cabana shared with one other guest of the same gender. Comfortable beds, en-suite bathroom, and garden access.</p>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: theme.olive }}>{retreat.price} <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',sans-serif", color: theme.stone }}>/ person</span></p>
                  </div>
                  <div style={{ background: theme.white, padding: "28px", borderTop: `3px solid ${theme.accent}` }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", marginBottom: 8, color: theme.charcoal }}>Private Cabana</h4>
                    <p style={{ fontSize: "0.85rem", color: theme.stone, lineHeight: 1.7, marginBottom: 12 }}>The same beautiful cabana — all to yourself. More space, complete privacy, and your own peaceful retreat within the retreat.</p>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: theme.olive }}>+$600 <span style={{ fontSize: "0.75rem", fontFamily: "'DM Sans',sans-serif", color: theme.stone }}>/ person</span></p>
                  </div>
                </div>
                <p style={{ fontSize: "0.8rem", color: theme.stone, marginTop: 16, fontStyle: "italic" }}>All accommodations include daily housekeeping, clean linens, and full board.</p>
              </>
            ) : (
              <div style={{ background: theme.white, padding: "36px", borderTop: `3px solid ${theme.olive}` }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", color: theme.charcoal, marginBottom: 12 }}>Venue to be announced</p>
                <p style={{ fontSize: "0.92rem", color: theme.stone, lineHeight: 1.8 }}>
                  We are carefully selecting a venue that matches the depth and quality of this experience. Accommodation details — including room types, photos, and pricing — will be shared with registered guests once confirmed. All options will include private or shared rooms, clean linens, and full board.
                </p>
                <p style={{ fontSize: "0.85rem", color: theme.olive, marginTop: 16, fontStyle: "italic" }}>
                  Questions? Reach us at info@sacredwellnessretreats.com
                </p>
              </div>
            )}
          </div>
          <hr className="divider" />
          {/* FAQ */}
          <div>
            <span className="section-label">FAQ</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 28, color: theme.charcoal }}>Common Questions</h2>
            {[
              ["Do I need experience with yoga or meditation?", "Not at all. Our practices are accessible for all levels, from complete beginners to seasoned practitioners."],
              ["What is your cancellation policy?", "Full refund up to 60 days before the retreat. 50% refund 30–60 days out. No refunds within 30 days, though your spot can be transferred."],
              ["Are meals included?", "Yes. All meals are included — plant-forward, nourishing, and prepared fresh daily."],
              ["How many guests per retreat?", "We intentionally limit each retreat to 8–12 guests for a deeply personal experience."],
            ].map(([q, a], i) => (
              <div key={i} style={{ borderTop: `1px solid ${theme.beige}`, padding: "18px 0" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", marginBottom: 8, color: theme.charcoal }}>{q}</p>
                <p style={{ fontSize: "0.9rem", color: theme.stone, lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${theme.beige}` }} />
          </div>

          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <button className="btn-primary" style={{ fontSize: "0.9rem", padding: "16px 48px" }} onClick={() => { navigate(`/booking/${retreat.id}`); window.scrollTo(0,0); }}>
              Reserve Your Spot
            </button>
            <p style={{ fontSize: "0.82rem", color: theme.stone, marginTop: 12 }}>
              Reserve with <strong style={{ color: theme.charcoal }}>{retreat.deposit} deposit</strong> today · Full price <strong style={{ color: theme.charcoal }}>{retreat.price}</strong> · Balance due 30 days before retreat
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 99,
        background: theme.oliveDark, padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s ease",
        borderTop: `1px solid ${theme.olive}`,
      }}>
        <div>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{retreat.name}</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: theme.white }}>{retreat.dates} · <span style={{ color: theme.accent }}>{retreat.deposit} deposit</span> · {retreat.price} full</p>
        </div>
        <button className="btn-primary" style={{ background: theme.accent, color: theme.charcoal }} onClick={() => { navigate(`/booking/${retreat.id}`); window.scrollTo(0,0); }}>Book Now</button>
      </div>
    </>
  );
}

// ─── BOOKING FLOW ─────────────────────────────────────────────────────────────
const stripeLinks = {
  1: { deposit: "https://buy.stripe.com/5kQ3cw2a16ur36Odj448006", full: "https://buy.stripe.com/bJe7sMaGx6ur22K5QC48007" },
  2: { deposit: "https://buy.stripe.com/7sYdRaaGx3ifgXE3Iu48008", full: "https://buy.stripe.com/6oUdRag0R6urgXEgvg48009" },
  3: { deposit: "https://buy.stripe.com/aFa14o9Ct5qnbDk92O4800a", full: "https://buy.stripe.com/6oU8wQ15Xf0X5eW2Eq4800b" },
};

function BookingPage() {
  const { id } = useParams();
  const retreatId = parseInt(id) || 2;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ retreat: retreatId, name: "", email: "", phone: "", guests: 1, payment: "deposit" });

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePayment = () => {
    const links = stripeLinks[form.retreat];
    const url = form.payment === "full" ? links.full : links.deposit;
    window.open(url, "_blank");
  };

  const stepLabel = ["Select Retreat", "Your Details", "Payment", "Confirmation"];

  return (
    <div style={{ minHeight: "100vh", background: theme.cream, paddingTop: 100 }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 0, marginBottom: 48 }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step >= s ? theme.olive : theme.beige, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: step >= s ? theme.white : theme.stone, marginBottom: 8, transition: "all 0.3s" }}>{s}</div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: step >= s ? theme.olive : theme.stone }}>{stepLabel[s-1]}</p>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: 8 }}>Select Your Retreat</h2>
            <p style={{ color: theme.stone, fontSize: "0.9rem", marginBottom: 32 }}>Choose the experience that calls to you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {retreats.map(r => (
                <label key={r.id} style={{ display: "flex", gap: 16, padding: "20px", background: form.retreat===r.id ? theme.white : "transparent", border: `2px solid ${form.retreat===r.id ? theme.olive : theme.beige}`, cursor: "pointer", transition: "all 0.2s" }}>
                  <input type="radio" checked={form.retreat===r.id} onChange={() => upd("retreat", r.id)} style={{ marginTop: 3, accentColor: theme.olive }} />
                  <div>
                    <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", marginBottom: 2 }}>{r.name}</p>
                    <p style={{ fontSize: "0.82rem", color: theme.stone }}>{r.location} · {r.dates} · {r.price}</p>
                  </div>
                </label>
              ))}
            </div>
            <button className="btn-primary" style={{ width: "100%", textAlign: "center" }} onClick={() => setStep(2)}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: 8 }}>Your Details</h2>
            <p style={{ color: theme.stone, fontSize: "0.9rem", marginBottom: 32 }}>No account needed. We just need the basics.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
              {[["Full Name","text","name"],["Email Address","email","email"],["Phone Number","tel","phone"]].map(([label, type, key]) => (
                <div key={key}>
                  <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>{label}</label>
                  <input type={type} value={form[key]} onChange={e => upd(key, e.target.value)}
                    style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border 0.2s" }}
                    onFocus={e => e.target.style.borderColor = theme.olive}
                    onBlur={e => e.target.style.borderColor = theme.beige} />
                </div>
              ))}
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>Number of Guests</label>
                <select value={form.guests} onChange={e => upd("guests", e.target.value)}
                  style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", fontFamily: "'DM Sans',sans-serif", outline: "none" }}>
                  {[1,2,3,4].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-dark-outline" style={{ flex: 1, textAlign: "center" }} onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" style={{ flex: 2, textAlign: "center" }} onClick={() => setStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {step === 3 && (() => {
          const r = retreats.find(r => r.id === form.retreat) || retreats[0];
          const total = parseInt(r.price.replace(/\D/g,"")) * form.guests;
          const dep = parseInt(r.deposit.replace(/\D/g,"")) * form.guests;
          return (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", marginBottom: 8 }}>Payment</h2>
              <p style={{ color: theme.stone, fontSize: "0.9rem", marginBottom: 32 }}>Secure payment powered by Stripe.</p>
              <div style={{ background: theme.white, padding: "24px", marginBottom: 28 }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", marginBottom: 4 }}>{r.name}</p>
                <p style={{ fontSize: "0.82rem", color: theme.stone, marginBottom: 20 }}>{r.dates} · {form.guests} guest{form.guests>1?"s":""}</p>
                <div style={{ borderTop: `1px solid ${theme.beige}`, paddingTop: 16 }}>
                  {[["Retreat Price", `$${total.toLocaleString()}`], ["Deposit Option", `$${dep.toLocaleString()}`]].map(([l,v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.9rem", color: theme.stone }}>{l}</span>
                      <span style={{ fontSize: "0.9rem", fontFamily: "'Cormorant Garamond',serif" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[["full",`Pay in Full — $${total.toLocaleString()}`],["deposit",`Pay Deposit — $${dep.toLocaleString()} (balance due 30 days before)`]].map(([val, label]) => (
                  <label key={val} style={{ display: "flex", gap: 14, padding: "16px 20px", border: `2px solid ${form.payment===val ? theme.olive : theme.beige}`, background: form.payment===val ? theme.white : "transparent", cursor: "pointer", transition: "all 0.2s" }}>
                    <input type="radio" checked={form.payment===val} onChange={() => upd("payment", val)} style={{ accentColor: theme.olive }} />
                    <span style={{ fontSize: "0.9rem", color: theme.charcoal }}>{label}</span>
                  </label>
                ))}
              </div>
              <div style={{ background: theme.sand, padding: "20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: theme.olive }}>🔒</span>
                <p style={{ fontSize: "0.82rem", color: theme.stone }}>Payments are processed securely via Stripe. Your financial information is never stored on our servers.</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-dark-outline" style={{ flex: 1, textAlign: "center" }} onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary" style={{ flex: 2, textAlign: "center", background: theme.accent, color: theme.charcoal }} onClick={handlePayment}>
                  Complete Booking — Pay Securely →
                </button>
              </div>
              <p style={{ fontSize: "0.75rem", color: theme.stone, textAlign: "center", marginTop: 16 }}>You'll be redirected to Stripe's secure checkout. After payment, Stripe will confirm your booking.</p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ─── CONFIRMATION PAGE ────────────────────────────────────────────────────────
function ConfirmationPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: theme.oliveDark, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3.5rem", color: theme.accent, marginBottom: 24 }}>✦</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, color: theme.white, marginBottom: 24, lineHeight: 1.2 }}>
          You're in — and we couldn't<br />be more excited to welcome you!
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.15rem", lineHeight: 1.8, marginBottom: 16, fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic" }}>
          "What you just did takes courage, and we honor that. Your journey with Sacred Wellness Retreats has officially begun."
        </p>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: 48 }}>— Parmananda & the Sacred Wellness team</p>
        <div style={{ background: "rgba(255,255,255,0.06)", padding: "32px", textAlign: "left", marginBottom: 48, borderTop: `2px solid ${theme.accent}` }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, marginBottom: 20 }}>What Happens Next</p>
          {[
            "Expect a personal email from Parmananda within 24 hours with your pre-retreat guide",
            "Complete our short pre-retreat health questionnaire",
            "Join our private guest community on WhatsApp",
            "We'll send your packing essentials and logistics 2 weeks before arrival",
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: i < 3 ? 16 : 0 }}>
              <span style={{ color: theme.accent, fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", marginTop: 1, flexShrink: 0 }}>{i + 1}.</span>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>{s}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/18322911127" target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20,
          background: "#25D366", color: "white", padding: "14px 28px",
          fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em",
          textTransform: "uppercase", textDecoration: "none",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Join Our WhatsApp Community
        </a>
        <br />
        <button className="btn-outline" style={{ marginTop: 8 }} onClick={() => { navigate("/"); window.scrollTo(0,0); }}>Back to Home</button>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ background: theme.oliveDark, padding: "140px 24px 80px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 16 }}>Our Story</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 300, color: theme.white, lineHeight: 1.15 }}>
            Born from stillness.<br /><em>Built for those ready to go deeper.</em>
          </h1>
        </div>
      </div>
      <section style={{ background: theme.cream, padding: "80px 24px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", marginBottom: 72, flexWrap: "wrap" }}>
            <div>
              <div style={{ aspectRatio: "3/4", backgroundImage: "url(https://res.cloudinary.com/dyuinj9pz/image/upload/v1774913122/founder_opp1xo.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
            <div>
              <span className="section-label">Founder</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 400, marginBottom: 20 }}>Parmananda</h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 20 }}>
                At 39, Parmananda had already reached the limits of the body. Years of illness, a life-threatening crisis, and multiple surgeries stripped away certainty — leaving behind a single question: what does it mean to truly heal?
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 20 }}>
                Born into a lineage of both medical science and holistic wisdom, he understood the systems of health — but it was in stillness that he discovered something deeper. Through meditation, the nervous system began to settle, the mind grew quiet, and a different kind of intelligence revealed itself.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 20 }}>
                His path led him to India, where he lived among the Naga Babas, and across Mexico and Peru, sitting in ceremony with indigenous shamans and sacred medicines. Yet what stayed with him was not complexity — but clarity: the body does not need to be forced into healing, only guided back into alignment.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 20 }}>
                Today, his work is designed for those who have already done the work on the outside — who eat well, train hard, and think clearly — yet still feel a subtle tension beneath it all. A sense that something deeper is waiting.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 20 }}>
                Through meditation, breathwork, and immersive experiences, he creates the conditions for that shift to occur — not through effort, but through release.
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, fontStyle: "italic" }}>
                Those who find their way here are not searching for more. They are ready for what is real.
              </p>
            </div>
          </div>
          <hr className="divider" style={{ marginBottom: 72 }} />
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 72px" }}>
            <span className="section-label">Our Philosophy</span>
            <blockquote style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.5, color: theme.charcoal }}>
              "We believe real change happens when the nervous system is regulated and the mind is clear."
            </blockquote>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 72 }}>
            {[["100+","Guests transformed"], ["3","Retreat locations"], ["12","Max group size"], ["9","Years hosting"]].map(([n,l]) => (
              <div key={n} style={{ textAlign: "center", padding: "32px 20px", background: theme.white }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", color: theme.olive, marginBottom: 8 }}>{n}</p>
                <p style={{ fontSize: "0.82rem", color: theme.stone, textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn-primary" onClick={() => { navigate("/retreats"); window.scrollTo(0,0); }}>Explore Retreats</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APPLY PAGE ───────────────────────────────────────────────────────────────
function ApplyPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", retreat: "", why: "" });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const retreatName = retreats.find(r => r.id === parseInt(form.retreat))?.name || form.retreat;
      await fetch("https://formspree.io/f/mbdponyn", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          retreat: retreatName,
          message: form.why,
        }),
      });
      setSent(true);
    } catch (e) {
      alert("Something went wrong. Please try again or email us directly at info@sacredwellnessretreats.com");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) return (
    <div style={{ minHeight: "100vh", background: theme.oliveDark, display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px", textAlign: "center" }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", color: theme.accent, marginBottom: 20 }}>✦</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.5rem", fontWeight: 300, color: theme.white, marginBottom: 16 }}>Application Received</h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", maxWidth: 400, lineHeight: 1.7 }}>Thank you, {form.name}. We review all applications personally and will be in touch within 48 hours.</p>
      </div>
    </div>
  );

  return (
    <>
      <div style={{ background: theme.sand, padding: "140px 24px 60px", textAlign: "center" }}>
        <span className="section-label">Limited Spots Available</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: theme.charcoal, marginBottom: 16 }}>Apply to Join a Retreat</h1>
        <p style={{ color: theme.stone, fontSize: "0.95rem", maxWidth: 440, margin: "0 auto" }}>We review each application personally to ensure a great fit for the group.</p>
      </div>
      <section style={{ background: theme.cream, padding: "60px 24px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 36 }}>
            {[["Full Name","text","name"],["Email Address","email","email"],["Phone Number","tel","phone"]].map(([label, type, key]) => (
              <div key={key}>
                <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>{label}</label>
                <input type={type} value={form[key]} onChange={e => upd(key, e.target.value)}
                  style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", fontFamily: "'DM Sans',sans-serif", outline: "none" }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>Retreat of Interest</label>
              <select value={form.retreat} onChange={e => upd("retreat", e.target.value)}
                style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", fontFamily: "'DM Sans',sans-serif", outline: "none" }}>
                <option value="">Select a retreat...</option>
                {retreats.map(r => <option key={r.id} value={r.id}>{r.name} — {r.dates}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>Why are you seeking a reset?</label>
              <textarea rows={4} value={form.why} onChange={e => upd("why", e.target.value)}
                style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", fontFamily: "'DM Sans',sans-serif", outline: "none", resize: "vertical" }} />
            </div>
          </div>
          <button className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "16px", opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </section>
    </>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("https://formspree.io/f/xkoprdby", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      setSent(true);
    } catch (e) {
      alert("Something went wrong. Please try again or email us directly at info@sacredwellnessretreats.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div style={{ background: theme.sand, padding: "140px 24px 60px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 300, color: theme.charcoal, marginBottom: 16 }}>Get in Touch</h1>
        <p style={{ color: theme.stone, fontSize: "0.95rem" }}>We'd love to hear from you.</p>
      </div>
      <section style={{ background: theme.cream, padding: "60px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          {sent ? (
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", textAlign: "center", color: theme.olive }}>Thank you. We'll be in touch within 24 hours. ✦</p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 36 }}>
                {[["Name","text","name"],["Email","email","email"]].map(([l,t,k]) => (
                  <div key={k}>
                    <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>{l}</label>
                    <input type={t} value={form[k]} onChange={e => upd(k, e.target.value)}
                      style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", outline: "none" }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: theme.olive, marginBottom: 8 }}>Message</label>
                  <textarea rows={5} value={form.message} onChange={e => upd("message", e.target.value)}
                    style={{ width: "100%", padding: "14px 16px", border: `1px solid ${theme.beige}`, background: theme.white, fontSize: "0.95rem", outline: "none", resize: "vertical" }} />
                </div>
              </div>
              <button className="btn-primary" style={{ width: "100%", textAlign: "center", opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </>
          )}
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <p style={{ fontSize: "0.85rem", color: theme.stone, marginBottom: 8 }}>Or reach us directly:</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: theme.olive }}>info@sacredwellnessretreats.com</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: theme.olive, marginTop: 4 }}>@sacredwellnessretreats</p>
            <a href="https://wa.me/18322911127" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginTop: 16,
              background: "#25D366", color: "white", padding: "12px 24px",
              fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none", transition: "background 0.3s"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const navigate = useNavigate();
  const nav = p => { navigate(p); window.scrollTo(0,0); };
  return (
    <footer style={{ background: theme.charcoal, color: "rgba(255,255,255,0.5)", padding: "60px 24px 40px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", color: theme.white, marginBottom: 12 }}>Sacred<br /><em style={{ fontWeight: 300 }}>Wellness Retreats</em></h3>
            <p style={{ fontSize: "0.82rem", lineHeight: 1.7 }}>Curated 5-day wellness retreats for nervous system reset and deep restoration.</p>
          </div>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Navigate</p>
            {[["/","Home"],["/retreats","Retreats"],["/about","About"],["/apply","Apply"],["/contact","Contact"]].map(([p,l]) => (
              <button key={p} onClick={() => nav(p)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontSize: "0.87rem", color: "rgba(255,255,255,0.5)", marginBottom: 10, textAlign: "left", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = theme.white}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{l}</button>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>Contact</p>
            <p style={{ fontSize: "0.87rem", marginBottom: 8 }}>info@sacredwellnessretreats.com</p>
            <p style={{ fontSize: "0.87rem", marginBottom: 8 }}>@sacredwellnessretreats</p>
            <a href="https://wa.me/18322911127" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "#25D366", fontSize: "0.87rem", textDecoration: "none", marginTop: 4
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: "0.75rem" }}>© 2026 Sacred Wellness Retreats. All rights reserved.</p>
          <p style={{ fontSize: "0.75rem" }}>
            <button onClick={() => nav("/privacy")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textDecoration: "underline" }}>Privacy Policy</button>
            {" · "}
            <button onClick={() => nav("/terms")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textDecoration: "underline" }}>Terms & Conditions</button>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PRIVACY POLICY PAGE ──────────────────────────────────────────────────────
function PrivacyPage() {
  const navigate = useNavigate();
  const sections = [
    {
      title: "Information We Collect",
      content: `When you interact with Sacred Wellness Retreats, we may collect the following information:

• Personal identification: name, email address, phone number
• Booking information: retreat selection, number of guests, payment details
• Application information: responses to our retreat application questions
• Communications: messages sent through our contact form
• Technical data: browser type, IP address, and pages visited (collected automatically)

We collect this information only when you voluntarily provide it through our booking flow, application form, or contact form.`
    },
    {
      title: "How We Use Your Information",
      content: `We use the information we collect to:

• Process and confirm your retreat booking
• Communicate with you about your upcoming retreat
• Send pre-retreat preparation materials and reminders
• Respond to your inquiries and support requests
• Improve our website and retreat offerings
• Comply with legal obligations

We do not sell, trade, or rent your personal information to third parties. We do not use your information for advertising purposes.`
    },
    {
      title: "Payment Processing",
      content: `All payments are processed securely through Stripe, a PCI-compliant payment processor. Sacred Wellness Retreats does not store your credit card information on our servers. Stripe's privacy policy governs the handling of your payment data. You can review Stripe's privacy policy at stripe.com/privacy.`
    },
    {
      title: "Data Sharing",
      content: `We may share your information with trusted third parties solely to operate our business:

• Stripe: for secure payment processing
• Email service providers: for sending booking confirmations and retreat communications
• We may disclose information if required by law or to protect our legal rights

We ensure any third parties we work with maintain appropriate data protection standards.`
    },
    {
      title: "Data Retention",
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Booking records are typically retained for 7 years for accounting purposes. You may request deletion of your personal data at any time by contacting us at info@sacredwellnessretreats.com.`
    },
    {
      title: "Your Rights",
      content: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your personal data
• Opt out of marketing communications at any time
• Lodge a complaint with your local data protection authority

To exercise any of these rights, please contact us at info@sacredwellnessretreats.com.`
    },
    {
      title: "Cookies",
      content: `Our website uses minimal cookies necessary for basic functionality. We do not use tracking cookies or advertising cookies. You can control cookie settings through your browser preferences.`
    },
    {
      title: "Contact Us",
      content: `If you have questions about this Privacy Policy or how we handle your data, please contact us at info@sacredwellnessretreats.com.`
    },
  ];

  return (
    <>
      <div style={{ background: theme.oliveDark, padding: "140px 24px 60px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 16 }}>Legal</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 300, color: theme.white, lineHeight: 1.15 }}>Privacy Policy</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginTop: 16 }}>Last updated: January 1, 2026</p>
        </div>
      </div>
      <section style={{ background: theme.cream, padding: "80px 24px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 56 }}>
            Sacred Wellness Retreats ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or book a retreat with us.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {sections.map((s, i) => (
              <div key={i}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 500, color: theme.charcoal, marginBottom: 16 }}>{s.title}</h2>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.9, color: theme.stone, whiteSpace: "pre-line" }}>{s.content}</p>
                {i < sections.length - 1 && <hr className="divider" style={{ marginTop: 48 }} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <button className="btn-dark-outline" onClick={() => { navigate("/"); window.scrollTo(0,0); }}>Back to Home</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── TERMS PAGE ───────────────────────────────────────────────────────────────
function TermsPage() {
  const navigate = useNavigate();
  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By accessing our website or booking a retreat with Sacred Wellness Retreats, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.`
    },
    {
      title: "Retreat Bookings",
      content: `All retreat bookings are subject to availability. A booking is confirmed only upon receipt of your deposit or full payment and our written confirmation via email.

Retreat prices are listed in USD and include accommodation, all meals, and scheduled programming as described on each retreat page. Prices do not include airfare, travel insurance, or personal expenses.

We reserve the right to make changes to retreat programming, facilitators, or venue where necessary. Material changes will be communicated to registered guests as soon as possible.`
    },
    {
      title: "Cancellation & Refund Policy",
      content: `Guest cancellations:
• 60+ days before retreat start: full refund minus a $150 administrative fee
• 30–59 days before retreat start: 50% refund
• Less than 30 days before retreat start: no refund; however, your booking may be transferred to another guest

To cancel, email info@sacredwellnessretreats.com with your booking reference.

Sacred Wellness Retreats cancellations:
In the unlikely event we must cancel a retreat, registered guests will receive a full refund or the option to transfer to a future retreat. We are not responsible for non-refundable travel costs; we strongly recommend purchasing travel insurance.`
    },
    {
      title: "Health & Medical Disclaimer",
      content: `Our retreats are wellness experiences designed to support relaxation, mindfulness, and personal growth. They are not medical treatments and are not intended to diagnose, treat, cure, or prevent any disease or medical condition.

By booking a retreat, you confirm that you are in good physical and mental health and are able to participate in wellness activities including yoga, breathwork, and meditation. You agree to inform us of any medical conditions, injuries, or medications that may affect your participation.

We reserve the right to decline participation or ask a guest to discontinue activities if we have concerns about their safety or the safety of the group.`
    },
    {
      title: "Participant Conduct",
      content: `We are committed to maintaining a safe, respectful, and supportive environment for all guests and staff. We reserve the right to remove any participant whose behavior is disruptive, harmful, or disrespectful to others — without refund.

Participants are expected to arrive sober and refrain from the use of alcohol or non-prescribed substances during retreat programming.`
    },
    {
      title: "Photography & Media",
      content: `By attending a retreat, you grant Sacred Wellness Retreats permission to use photographs or video taken during the retreat for marketing purposes, unless you notify us in writing before the retreat begins that you do not consent.

You agree not to photograph or film other guests without their explicit consent.`
    },
    {
      title: "Liability Waiver",
      content: `Participation in retreat activities involves inherent risks. By booking, you acknowledge these risks and agree that Sacred Wellness Retreats, its facilitators, and staff are not liable for any injury, loss, or damage arising from your participation, except where caused by our gross negligence.

We strongly recommend that all guests obtain comprehensive travel and health insurance before attending a retreat.`
    },
    {
      title: "Intellectual Property",
      content: `All content on this website — including text, images, logos, and retreat materials — is the property of Sacred Wellness Retreats and may not be reproduced or used without written permission.`
    },
    {
      title: "Governing Law",
      content: `These Terms and Conditions are governed by the laws of the jurisdiction in which Sacred Wellness Retreats operates. Any disputes shall be resolved through good-faith negotiation, and if necessary, binding arbitration.`
    },
    {
      title: "Contact",
      content: `For questions about these Terms, please contact us at info@sacredwellnessretreats.com.`
    },
  ];

  return (
    <>
      <div style={{ background: theme.oliveDark, padding: "140px 24px 60px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: theme.accent, display: "block", marginBottom: 16 }}>Legal</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 300, color: theme.white, lineHeight: 1.15 }}>Terms & Conditions</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", marginTop: 16 }}>Last updated: January 1, 2026</p>
        </div>
      </div>
      <section style={{ background: theme.cream, padding: "80px 24px" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: theme.stone, marginBottom: 56 }}>
            Please read these Terms and Conditions carefully before booking a retreat with Sacred Wellness Retreats. By completing a booking, you confirm that you have read, understood, and agreed to these terms.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {sections.map((s, i) => (
              <div key={i}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontWeight: 500, color: theme.charcoal, marginBottom: 16 }}>{s.title}</h2>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.9, color: theme.stone, whiteSpace: "pre-line" }}>{s.content}</p>
                {i < sections.length - 1 && <hr className="divider" style={{ marginTop: 48 }} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 64, textAlign: "center" }}>
            <button className="btn-dark-outline" onClick={() => { navigate("/"); window.scrollTo(0,0); }}>Back to Home</button>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function AppInner() {
  const location = window.location.pathname;
  useSEO(location === "/" ? "home" : location.replace("/",""));
  return (
    <>
      <style>{globalStyles}</style>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/retreats" element={<RetreatsPage />} />
          <Route path="/retreat/:id" element={<RetreatDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
