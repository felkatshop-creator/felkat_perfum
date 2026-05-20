// FELKAT — Home (refined, category-driven, dynamic)
const { useState: useStateH, useEffect: useEffectH } = React;

function HomePage({ setRoute, addToCart, products, categories }) {
  const [scrollY, setScrollY] = useStateH(0);
  useEffectH(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const totalCount = products.length;

  return (
    <main>
      {/* HERO — large editorial */}
      <section style={{ background: 'var(--paper)', paddingTop: 48, paddingBottom: 0, position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, alignItems: 'end', minHeight: '82vh', paddingTop: 80 }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--olive)' }}>Colección Felkat · 57 fragancias · Bogotá</div>
              <h1 className="display italic" style={{
                fontSize: 'clamp(80px, 14vw, 240px)',
                margin: '32px 0 0',
                letterSpacing: '-0.04em',
                lineHeight: 0.86,
                fontWeight: 300,
              }}>
                Aroma<br/>
                <span style={{ color: 'var(--olive)' }}>que recuerdan</span><br/>
                <span style={{ fontStyle: 'normal', fontVariationSettings: '"SOFT" 50' }}>de ti.</span>
              </h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 80, alignItems: 'end' }}>
                <p style={{ maxWidth: 460, color: 'var(--char-soft)', fontSize: 16, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  Felkat es una casa colombiana de fragancias premium inspiradas
                  en perfumes de diseñador. Selección curada — Caballero, Dama
                  y Árabes — al mejor precio del país.
                </p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                  <button className="btn olive" onClick={() => setRoute({ name: 'catalog' })}>Ver catálogo</button>
                  <button className="btn ghost" onClick={() => setRoute({ name: 'quiz' })}>Encuentra tu aroma</button>
                </div>
              </div>
            </div>
          </div>

          {/* marquee strip */}
          <div style={{
            marginTop: 96, padding: '20px 0',
            borderTop: '1px solid var(--char)', borderBottom: '1px solid var(--char)',
            overflow: 'hidden',
          }}>
            <div className="marquee-track">
              {[...Array(2)].map((_, idx) => (
                <React.Fragment key={idx}>
                  {[
                    '— ENVÍO A TODA COLOMBIA',
                    '— PAGO CONTRA ENTREGA',
                    '— GARANTÍA DE AUTENTICIDAD',
                    '— ENVÍO GRATIS DESDE $200.000',
                    '— ATENCIÓN POR WHATSAPP',
                    '— 57 FRAGANCIAS DE CATÁLOGO',
                  ].map((t, i) => (
                    <span key={`${idx}-${i}`} className="mono" style={{ color: 'var(--char)' }}>{t}</span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES — 3 large cards */}
      <section style={{ padding: '120px 0 80px', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56 }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Tres mundos</div>
              <h2 className="display italic" style={{ fontSize: 'clamp(48px, 6vw, 88px)', margin: '20px 0 0', fontWeight: 300 }}>
                Elige tu universo.
              </h2>
            </div>
            <p style={{ maxWidth: 280, color: 'var(--char-soft)', fontSize: 14, fontWeight: 300 }}>
              Cada categoría reúne fragancias seleccionadas por intensidad, ocasión y personalidad.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {categories.map((c, i) => {
              const sample = products.filter(p => p.category === c.id);
              return (
                <Reveal key={c.id} delay={i * 120}>
                  <CategoryCard category={c} count={sample.length} sample={sample[0]}
                    onClick={() => setRoute({ name: 'catalog', filter: c.id })}/>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MANIFESTO — large editorial type */}
      <section style={{ padding: '140px 0', background: 'var(--paper-warm)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 60, alignItems: 'start' }}>
            <Reveal>
              <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Manifiesto</div>
            </Reveal>
            <Reveal delay={140}>
              <p className="display" style={{
                fontSize: 'clamp(32px, 4.2vw, 64px)',
                lineHeight: 1.08,
                margin: 0,
                fontWeight: 300,
                letterSpacing: '-0.02em',
                textWrap: 'balance'
              }}>
                Creemos en perfumes que <em style={{ fontStyle: 'italic', color: 'var(--olive)' }}>permanecen</em>.
                En fragancias auténticas sin pagar el sobreprecio del lujo.
                En el aroma como una <em style={{ fontStyle: 'italic', color: 'var(--ink)' }}>firma</em> que
                te identifica antes de hablar.
              </p>
              <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, maxWidth: 720 }}>
                {[
                  ['57', 'Fragancias en catálogo'],
                  ['100ml', 'Tamaño estándar'],
                  ['24h', 'Despacho desde Bogotá'],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="display" style={{ fontSize: 48, fontWeight: 300, lineHeight: 1, color: 'var(--olive)' }}>{n}</div>
                    <div className="eyebrow" style={{ marginTop: 10, color: 'var(--char-soft)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS — 1 per category */}
      <section style={{ padding: '120px 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56 }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Selección de la semana</div>
              <h2 className="display italic" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '20px 0 0', fontWeight: 300 }}>
                Los más buscados.
              </h2>
            </div>
            <button className="btn link" onClick={() => setRoute({ name: 'catalog' })}>Ver los 57 →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
            {[
              products.find(p => p.name === 'BLEU DE CHANEL'),
              products.find(p => p.name === 'GOOD GIRL'),
              products.find(p => p.name === 'KHAMRAH'),
              products.find(p => p.name === 'SAUVAGE'),
            ].filter(Boolean).map((p, i) => (
              <Reveal key={p.id} delay={i * 100}>
                <ProductCard product={p} onOpen={(prod) => setRoute({ name: 'product', id: prod.id })}
                  onAdd={addToCart}/>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ CTA — large statement */}
      <section style={{ padding: '160px 0', background: 'var(--olive)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'center' }}>
            <Reveal>
              <div>
                <div className="eyebrow" style={{ opacity: 0.7 }}>— Cinco preguntas, tres minutos</div>
                <h2 className="display italic" style={{
                  fontSize: 'clamp(56px, 7.5vw, 120px)',
                  margin: '32px 0',
                  lineHeight: 0.94,
                  fontWeight: 300,
                  letterSpacing: '-0.02em'
                }}>
                  ¿Cuál es tu fragancia ideal?
                </h2>
                <p style={{ maxWidth: 480, opacity: 0.85, fontSize: 16, lineHeight: 1.6, fontWeight: 300, marginBottom: 36 }}>
                  Responde cinco preguntas rápidas y te recomendamos dos
                  perfumes del catálogo según tu estilo, ocasión y personalidad.
                </p>
                <button className="btn ghost" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
                  onClick={() => setRoute({ name: 'quiz' })}>
                  Empezar quiz →
                </button>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="display" style={{ fontSize: 'clamp(120px, 22vw, 380px)', lineHeight: 0.85, fontStyle: 'italic', opacity: 0.18, textAlign: 'right', fontWeight: 300 }}>?</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BRANDS BAR */}
      <section style={{ padding: '80px 0', background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--char-soft)', textAlign: 'center', marginBottom: 48 }}>
            — Inspiradas en las casas más reconocidas
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px 56px', maxWidth: 1100, margin: '0 auto' }}>
            {['CHANEL', 'DIOR', 'HUGO BOSS', 'PACO RABANNE', 'CAROLINA HERRERA', 'GIORGIO ARMANI', 'RALPH LAUREN', 'BVLGARI', 'DOLCE & GABBANA', 'LATTAFA', 'ARMAF', 'LANCÔME'].map(b => (
              <div key={b} className="display" style={{ fontSize: 20, color: 'var(--char-soft)', fontWeight: 300, letterSpacing: '0.04em' }}>{b}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CategoryCard({ category, count, sample, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}>
      <div style={{
        aspectRatio: '4 / 5', position: 'relative', overflow: 'hidden',
        background: category.id === 'arabes' ? 'var(--olive-deep)' : category.id === 'caballero' ? 'var(--char)' : 'oklch(89% 0.022 65)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(45deg, oklch(0% 0 0 / 0.05) 0 1px, transparent 1px 16px)'
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 36, color: category.id === 'dama' ? 'var(--char)' : 'var(--paper)'
        }}>
          <div className="mono" style={{ opacity: 0.75 }}>{String(count).padStart(2, '0')} fragancias</div>
          <div>
            <div className="display italic" style={{
              fontSize: 'clamp(40px, 5vw, 88px)',
              fontWeight: 300, lineHeight: 0.92,
              transform: hover ? 'translateX(8px)' : 'translateX(0)',
              transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)'
            }}>{category.name}</div>
            <p style={{ fontSize: 13, opacity: 0.8, marginTop: 16, maxWidth: 320, fontWeight: 300 }}>{category.desc}</p>
            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="eyebrow">Explorar</span>
              <span style={{
                fontSize: 18,
                transform: hover ? 'translateX(8px)' : 'translateX(0)',
                transition: 'transform 0.5s'
              }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HomePage = HomePage;
