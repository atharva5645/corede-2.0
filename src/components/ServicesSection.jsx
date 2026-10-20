import React from "react";

const serviceCategories = [
  { icon: "📊", title: "Digital Marketing", items: ["Influence Marketing","Creative Advertising","B2B Lead Generation","Affiliate Marketing - Amazon Ads","Online Reputation Management","Email Marketing"] },
  { icon: "🎯", title: "Brand Performance", items: ["Performance Marketing","PPC Services","Media Buying","AI Adoption"] },
  { icon: "📱", title: "Social Media Marketing", items: ["Instagram Marketing","Facebook Marketing","LinkedIn Marketing","YouTube Monetize"] },
  { icon: "🔍", title: "Search Engine Optimization", items: ["SEO Overview","Ecommerce SEO","SEO Audit Services","AI SEO & Local SEO","Link Building","Conversion Rate Optimization"] },
  { icon: "🎨", title: "Design & UI/UX", items: ["Graphic Design & Brand Identity","UI Design & UX Research","Wireframing & Prototyping","Web Design & Landing Pages","Logo Design & Rebranding"] },
  { icon: "✍️", title: "Content Strategy", items: ["Content Marketing Strategy","Blog & SEO Content Writing","Copywriting & Ad Copy","Social Media Content","Email Campaign Content"] },
  { icon: "🎬", title: "Video & Production", items: ["Corporate & Brand Films","TV Commercials & Digital Ads","2D / 3D Animation","Motion Graphics","Photography & Post Production"] },
  { icon: "💻", title: "Technology", items: ["Web & Mobile App Development","E-commerce Development","Backend & API Development","Cloud & DevOps (AWS, Azure)","AI & Machine Learning"] },
];

function FaqItem({ question, answer, defaultOpen }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <div className={open ? "faq-item active" : "faq-item"}>
      <div className="faq-question" onClick={() => setOpen(!open)}>
        {question}<span>{open ? "⌃" : "⌄"}</span>
      </div>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <div id="services">
      <section className="services-overview-section">
        <div className="services-overview-header">
          <span className="badge">💻 Our Services</span>
          <h2>Full-Spectrum Digital &amp; Technology Services</h2>
          <p>From concept to execution — we power your entire digital journey with expert teams and proven strategies.</p>
        </div>
        <div className="services-mega-grid">
          {serviceCategories.map((cat, idx) => (
            <div className="service-category-card" key={idx}>
              <div className="service-cat-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <ul>{cat.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>
      <section className="market-section">
        <div className="market-header">
          <p className="market-tag">MARKET EVIDENCE</p>
          <h2>Research from <span className="highlight">Google &amp; HubSpot</span><br/>proves: 70% of B2B buyers search<br/>via Mobile.</h2>
        </div>
        <div className="market-cards">
          <div className="market-card"><div className="icon orange">⚡</div><h3>Speed Optimized</h3><p>Every piece of software we ship is optimized for millisecond-level responsiveness.</p></div>
          <div className="market-card"><div className="icon green">🔍</div><h3>SEO Integrated</h3><p>We build code that search engines love. From structural Schema to semantic HTML5.</p></div>
          <div className="market-card"><div className="icon pink">📱</div><h3>Mobile First</h3><p>Our designs prioritize the mobile touchpoint first, ensuring seamless UX across every device.</p></div>
        </div>
      </section>
      <section className="matrix-section">
        <div className="matrix-header">
          <p className="matrix-tag">SERVICE EXCELLENCE PILLARS</p>
          <div className="matrix-top"><h2>The Corede <span>Service Matrix</span>:<br/>Engineering B2B Dominance.</h2></div>
          <p className="matrix-desc">We provide a full-spectrum technology stack designed to empower global enterprises with a resilient, scalable, and highly performant digital footprint.</p>
        </div>
        <div className="matrix-grid">
          {[
            { icon:"fas fa-desktop", color:"green", title:"Web Development", desc:"Enterprise-grade scalable web portals and applications.", tags:["PORTALS","DASHBOARDS","FINTECH"], hl:"Improved Core Web Vitals by 40%." },
            { icon:"fas fa-mobile-alt", color:"pink", title:"Mobile App Development", desc:"High-performance mobile apps (iOS, Android, Flutter).", tags:["IOS","ANDROID","FLUTTER"], hl:"Logistics app used by 1000+ drivers." },
            { icon:"fas fa-cubes", color:"red", title:"Ecommerce Development", desc:"High-volume platforms with 99.9% uptime.", tags:["SHOPIFY","MAGENTO","WORDPRESS"], hl:"Multi-vendor marketplaces at zero downtime." },
            { icon:"fas fa-link", color:"yellow", title:"Digital Marketing", desc:"Traffic is vanity; conversion is sanity.", tags:["Performance Marketing","360-Degree SEO"], hl:"4.5x ROAS in 120 days for SaaS firm." },
            { icon:"fas fa-microchip", color:"green", title:"Technologies We Cover", desc:"Mastery over Java, Python to MERN and Next.js.", tags:["PHP","JAVA","PYTHON","MERN"], hl:"High-concurrency systems processing millions daily." },
            { icon:"fas fa-database", color:"green", title:"Custom Software Development", desc:"ERP, CRM, and enterprise systems tailored to workflow.", tags:["ERP","CRM","HRM"], hl:"Reduced operational cost by 65%." },
          ].map((c,i) => (
            <div className="matrix-card" key={i}>
              <div className={`icon-box ${c.color}`}><i className={c.icon}></i></div>
              <h3>{c.title}</h3><p>{c.desc}</p>
              <div className="tags">{c.tags.map((t,j)=><span key={j}>{t}</span>)}</div>
              <div className="highlight"><span></span>{c.hl}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="process-header"><p>OUR METHODOLOGY</p><h2>The <span>Enterprise Delivery</span> Framework.</h2></div>
        <div className="process-container">
          <div className="process-line"></div>
          {[["fa-search","Define","Deep requirement gathering and KPI alignment."],["fa-paint-brush","Design","Interactive Wireframes and UI/UX prototypes."],["fa-code","Develop","Agile sprints with CI/CD deployments."],["fa-globe","Deploy","Cloud optimization and go-live security."]].map(([icon,title,desc],i)=>(
            <div className="process-card" key={i}><div className="icon-box"><i className={`fas ${icon}`}></i></div><h3>{title}</h3><p>{desc}</p></div>
          ))}
        </div>
      </section>
      <section className="tech-section">
        <div className="tech-header"><p>TECHNOLOGY STACK</p><h2>Mission-Critical Technologies We Master.</h2></div>
        <div className="tech-grid">
          {[["FRONTEND",["React","Next.js","TypeScript","Vue.js","Angular"],false],["BACKEND",["Node.js",".Net Core","Laravel","Python","Go"],false],["DATABASE",["PostgreSQL","MongoDB","MySQL","Redis","ElasticSearch"],false],["CLOUD & DEVOPS",["AWS","Azure","Docker","Kubernetes","Terraform"],false],["BLOCKCHAIN",["Ethereum","Solidity","Polkadot","Rust","Hyperledger"],true]].map(([label,items,full],i)=>(
            <div className={full?"tech-group full":"tech-group"} key={i}><h4>{label}</h4><div className="tech-items">{items.map((item,j)=><span key={j}>{item}</span>)}</div></div>
          ))}
        </div>
      </section>
      <section className="mobile-first-section">
        <div className="mobile-container">
          <div className="mobile-image">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="mountain"/>
            <div className="floating-card"><p className="tag">📱 B2B TREND</p><h4>"70% of B2B buyers now research exclusively via Mobile."</h4><small>— Source: Google/HubSpot Research</small></div>
          </div>
          <div className="mobile-content">
            <p className="top-tag">EVIDENCE-BASED DEVELOPMENT</p>
            <h2>Why a <span>Mobile-First</span><br/>Approach is Non-Negotiable.</h2>
            <p className="desc">The B2B buying journey has undergone a massive paradigm shift. High-ticket decision-makers are no longer tethered to desktops.</p>
            <p className="desc">Our <strong>Speed-Optimized development</strong> ensures seamless performance across all devices and networks.</p>
            <div className="mobile-tags"><span>⚡ Sub-2s Load Time</span><span>📈 Enhanced ROAS</span></div>
          </div>
        </div>
      </section>
      <section className="consult-section">
        <div className="consult-header"><p className="tag">STRATEGIC PILLAR DISCOVERY</p><h2>Not Sure Where to Start? <span>Find Your Pillar.</span></h2><p className="sub">Use our interactive consultant to identify the high-impact solution for your business.</p></div>
        <div className="consult-box">
          <p className="step">STEP 1 OF 2</p><h3>What is your primary digital objective?</h3>
          <div className="consult-grid">
            {[["📈","Maximize ROI & Sales"],["⚙️","Scale Tech Infrastructure"],["💻","Launch High-Perf Website"],["📱","Build Mobile Ecosystem"]].map(([icon,label],i)=>(
              <div className="consult-card" key={i}><div className="icon">{icon}</div><p>{label}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="faq-header"><p>COMMON ENQUIRIES</p><h2>FAQs &amp; <span>Expert Insights.</span></h2></div>
        <div className="faq-container">
          <FaqItem question="Why choose an India-based Offshore Development Team for my software?" answer="India offers cost-effective, highly skilled developers with strong communication and global experience."/>
          <FaqItem question="What exactly is AI Engine Optimization (AIEO)?" answer="AIEO ensures your brand is optimized for AI-driven search engines like ChatGPT, Gemini, and SGE." defaultOpen={true}/>
          <FaqItem question="How does Corede Technologies handle data security in Development?" answer="We implement secure smart contracts, encryption, and decentralized architecture."/>
          <FaqItem question="What is your typical project delivery timeline?" answer="Timelines vary but typically range from 2-12 weeks depending on complexity."/>
        </div>
      </section>
    </div>
  );
}
