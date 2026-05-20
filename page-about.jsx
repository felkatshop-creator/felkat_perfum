// FELKAT — Sobre la marca (Bogotá, Colombia)
function AboutPage({ setRoute }) {
  return (
    <main style={{ background: 'var(--paper)' }}>
      <section style={{ padding: '96px 0 48px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--olive)' }}>— La casa Felkat</div>
          <h1 className="display italic" style={{
            fontSize: 'clamp(80px, 13vw, 220px)',
            margin: '32px 0 0', lineHeight: 0.88, maxWidth: 1300,
            fontWeight: 300, letterSpacing: '-0.035em'
          }}>
            Fragancias auténticas,<br/>
            <span style={{ color: 'var(--olive)' }}>al precio</span> que<br/>
            <span style={{ color: 'var(--ink)' }}>merecen</span>.
          </h1>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, alignItems: 'start' }}>
          <Reveal>
            <div style={{ aspectRatio: '4 / 5', background: 'var(--olive)', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'repeating-linear-gradient(135deg, oklch(45% 0.05 110) 0 1px, transparent 1px 16px)'
              }}/>
              <div style={{ position: 'absolute', left: 28, bottom: 28, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--paper)', opacity: 0.7, letterSpacing: '0.16em' }}>
                ATELIER · BOGOTÁ · 2024
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="display italic" style={{
                fontSize: 'clamp(26px, 2.8vw, 38px)',
                lineHeight: 1.25, color: 'var(--char)',
                margin: 0, fontWeight: 300,
                letterSpacing: '-0.015em'
              }}>
                Felkat nace en Bogotá con una pregunta sencilla: ¿por qué
                los buenos perfumes tienen que costar tanto?
              </p>
              <p style={{ marginTop: 36, fontSize: 15, lineHeight: 1.8, color: 'var(--char-soft)', fontWeight: 300 }}>
                Trabajamos directamente con casas de alta calidad para traer
                fragancias inspiradas en los grandes diseñadores —
                Chanel, Dior, Carolina Herrera, Paco Rabanne, Lattafa, Armaf —
                con la misma duración, el mismo carácter y a una fracción del precio.
              </p>
              <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8, color: 'var(--char-soft)', fontWeight: 300 }}>
                Cada frasco pasa por control de calidad antes de salir de Bogotá.
                Cada cliente recibe atención personal por WhatsApp. Cada pedido
                lleva nuestro nombre.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* numbers */}
      <section style={{ padding: '96px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', margin: '96px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 64 }}>
          {[
            ['57', 'Fragancias'],
            ['12', 'Casas inspiración'],
            ['100', 'ml por frasco'],
            ['24h', 'Despacho'],
          ].map(([n, label]) => (
            <Reveal key={label}>
              <div>
                <div className="display" style={{ fontSize: 'clamp(64px, 8vw, 124px)', lineHeight: 0.9, color: 'var(--olive)', fontWeight: 300, letterSpacing: '-0.025em' }}>{n}</div>
                <div className="eyebrow" style={{ marginTop: 18, color: 'var(--char-soft)' }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* values */}
      <section style={{ padding: '48px 0 120px' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--olive)', marginBottom: 28 }}>— Cómo trabajamos</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 48 }}>
            {[
              ['Calidad', 'Solo trabajamos con proveedores certificados. Cada lote se prueba antes de salir a venta.'],
              ['Honestidad', 'No usamos publicidad engañosa. Nuestros perfumes son inspirados, no falsificaciones.'],
              ['Precio justo', 'Sin tiendas físicas con sobrecostos. Lo que ahorramos, lo trasladamos a ti.'],
              ['Cercanía', 'Atención humana por WhatsApp. Respondemos en menos de una hora en horario hábil.'],
              ['Garantía', 'Si el producto llega con defecto, lo cambiamos o devolvemos tu dinero en 30 días.'],
              ['Comunidad', 'Reseñas reales de clientes colombianos. Sin influencers pagados.'],
            ].map(([t, d]) => (
              <Reveal key={t}>
                <div style={{ borderTop: '1px solid var(--char)', paddingTop: 24 }}>
                  <h3 className="display italic" style={{ fontSize: 36, margin: '0 0 14px', fontWeight: 300 }}>{t}</h3>
                  <p style={{ color: 'var(--char-soft)', fontSize: 14, lineHeight: 1.65, margin: 0, fontWeight: 300 }}>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--olive)', color: 'var(--paper)', padding: '140px 0' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="display italic" style={{ fontSize: 'clamp(48px, 6vw, 96px)', margin: 0, fontWeight: 300, letterSpacing: '-0.025em' }}>
            Encuentra tu próxima firma.
          </h2>
          <p style={{ marginTop: 28, opacity: 0.85, maxWidth: 540, margin: '28px auto 40px', fontWeight: 300 }}>
            Explora las 57 fragancias del catálogo o deja que el quiz te recomiende dos opciones a tu medida.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button className="btn ghost" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
              onClick={() => setRoute({ name: 'catalog' })}>Ver el catálogo</button>
            <button className="btn ghost" style={{ borderColor: 'var(--paper)', color: 'var(--paper)' }}
              onClick={() => setRoute({ name: 'quiz' })}>Empezar quiz</button>
          </div>
        </div>
      </section>
    </main>
  );
}

window.AboutPage = AboutPage;
