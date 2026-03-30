import React, { useState } from 'react';
import { NEWS_DATA, CATEGORIES, HERO_NEWS } from './data';
import './App.css';

const App = () => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNews = activeCategory === "All" 
    ? NEWS_DATA 
    : NEWS_DATA.filter(n => n.category === activeCategory);

  const openNews = (news) => {
    setSelectedNews(news);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeNews = () => setSelectedNews(null);

  const getDateStr = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="newspaper-wrapper">
      <div className="container">
        {/* Masthead */}
        <header className="masthead">
          <div className="newspaper-title">The Universe Gazette</div>
          <div className="date-bar">
            <span>Vol. CLXII ... No. 57,431</span>
            <span>{getDateStr()}</span>
            <span>Price: One Token</span>
          </div>
          <nav className="classic-nav border-bottom">
            {CATEGORIES.map(c => (
              <button 
                key={c} 
                className={activeCategory === c ? 'active' : ''}
                onClick={() => {setActiveCategory(c); setSelectedNews(null);}}
              >
                {c}
              </button>
            ))}
          </nav>
        </header>

        {selectedNews ? (
          /* Single Article Reader View */
          <div className="article-reader animate-fade">
             <button className="back-btn" onClick={closeNews}>← Back to Front Page</button>
             <div className="article-header">
                <span className="cat-tag">{selectedNews.category}</span>
                <h1>{selectedNews.title}</h1>
                <div className="article-meta">
                   <span>By {selectedNews.author}</span>
                   <span>•</span>
                   <span>{selectedNews.date}</span>
                </div>
             </div>
             <img src={selectedNews.image} alt={selectedNews.title} className="reader-img" />
             <div className="article-content">
                <p className="dropcap">{selectedNews.excerpt}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
             </div>
          </div>
        ) : (
          /* Front Page Layout */
          <main className="front-page animate-fade">
            <div className="main-layout-grid">
              
              {/* Left Column: Briefs / Opinion */}
              <aside className="left-col border-right">
                <div className="col-header">OPINION</div>
                <div className="opinion-list">
                  {NEWS_DATA.slice(4, 6).map(n => (
                    <div key={n.id} className="opinion-item border-bottom" onClick={() => openNews(n)}>
                      <h3>{n.title}</h3>
                      <p>By {n.author}</p>
                    </div>
                  ))}
                </div>
                <div className="col-header mt-lg">QUICK NEWS</div>
                <ul className="bulletins">
                  <li>Global interest rates held steady for the third quarter.</li>
                  <li>Mars colony expansion hits target population of 1000.</li>
                  <li>New AI regulations signed into law across major continents.</li>
                </ul>
              </aside>

              {/* Center Column: Main Headlines */}
              <section className="center-col">
                {/* Hero Headline */}
                {activeCategory === "All" && (
                  <div className="hero-headline border-bottom" onClick={() => openNews({...HERO_NEWS, excerpt: HERO_NEWS.description, id: 'hero'})}>
                    <h1>{HERO_NEWS.title}</h1>
                    <div className="hero-flex">
                      <img src={HERO_NEWS.image} alt="Hero" />
                      <div>
                        <p>{HERO_NEWS.description}</p>
                        <span className="read-on">Read More →</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* News Grid */}
                <div className="news-feed-classic">
                  <div className="section-header">LATEST REPORTING</div>
                  <div className="grid-list">
                    {filteredNews.map(n => (
                      <div key={n.id} className="news-item-classic border-bottom" onClick={() => openNews(n)}>
                        <div className="item-text">
                          <span className="cat">{n.category}</span>
                          <h3>{n.title}</h3>
                          <p>{n.excerpt}</p>
                        </div>
                        <img src={n.image} alt={n.title} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Right Column: Trending / Features */}
              <aside className="right-col border-left">
                <div className="col-header">FEATURED</div>
                <div className="featured-card" onClick={() => openNews(NEWS_DATA[2])}>
                  <img src={NEWS_DATA[2].image} alt="Featured" />
                  <h4>{NEWS_DATA[2].title}</h4>
                  <p>{NEWS_DATA[2].excerpt.slice(0, 50)}...</p>
                </div>
                <div className="ad-box border-top border-bottom">
                  <span className="ad-tag">ADVERTISEMENT</span>
                  <h5>Visit the Moon.</h5>
                  <p>Weekly shuttle starts at 50,000 Tokens.</p>
                </div>
                <div className="col-header mt-lg">MOST READ</div>
                <ol className="most-read">
                  <li>AI Evolution: Part II</li>
                  <li>Sustainable Living in 2026</li>
                  <li>Martian Stock Market Update</li>
                </ol>
              </aside>

            </div>
          </main>
        )}

        <footer className="classic-footer border-top">
          <div className="footer-cols">
            <div className="footer-col">
              <h4>ABOUT THE GAZETTE</h4>
              <p>Since 2026, delivering the most accurate intergalactic information.</p>
            </div>
            <div className="footer-col">
              <h4>SECTIONS</h4>
              <div className="links-grid">
                {CATEGORIES.map(c => <a key={c} href="#">{c}</a>)}
              </div>
            </div>
            <div className="footer-col">
               <h4>CONTACT</h4>
               <p>Main Hub: Sector 7G, Low Orbit</p>
               <p>Email: press@gazette.univ</p>
            </div>
          </div>
          <div className="copyright">© 2026 Universe Gazette Group. All rights reserved. Registered Interstellar Entity.</div>
        </footer>
      </div>
    </div>
  );
};

export default App;
