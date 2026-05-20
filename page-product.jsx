// FELKAT — Página de producto (adaptada a catálogo real)
const { useState: useStateP, useMemo: useMemoP } = React;

function ProductPage({ id, setRoute, addToCart, products, categories }) {
  const product = products.find(p => p.id === id) || products[0];
  const category = categories.find(c => c.id === product.category);
  const [tab, setTab] = useStateP('desc');
  const related = useMemoP(() => products
    .filter(p => p.brand === product.brand && p.id !== product.id)
    .concat(products.filter(p => p.category === product.category && p.brand !== product.brand))
    .slice(0, 3), [product, products]);

  return (
    <main style={{ background: 'var(--paper)' }}>
      {/* breadcrumb */}
      <div className="wrap" style={{ padding: '28px 64px 0' }}>
        <div className="mono" style={{ color: 'var(--char-soft)' }}>
          <button onClick={() => setRoute({ name: 'home' })} style={breadcrumbBtn}>Felkat</button>
          {' / '}
          <button onClick={() => setRoute({ name: 'catalog' })} style={breadcrumbBtn}>Catálogo</button>
          {' / '}
          <button onClick={() => setRoute({ name: 'catalog', filter: category.id })} style={breadcrumbBtn}>{category.name}</button>
          {' / '}
          <span style={{ color: 'var(--char)' }}>{product.brand} · {product.name}</span>
        </div>
      </div>

      {/* hero */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 88, alignItems: 'start' }}>
          {/* image stack */}
          <div style={{ position: 'sticky', top: 110 }}>
            <div style={{
              aspectRatio: '4 / 5', background: 'var(--paper-warm)',
              position: 'relative', overflow: 'hidden'
            }}>
              <ProductPlaceholder product={product} style={{ position: 'absolute', inset: 0 }}/>
              <div style={{
                position: 'absolute', top: 24, left: 24,
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em',
                background: product.category === 'arabes' ? 'oklch(20% 0.04 115 / 0.5)' : 'oklch(96% 0.008 85 / 0.7)',
                color: product.category === 'arabes' ? 'var(--paper)' : 'var(--char)',
                padding: '4px 10px',
                textTransform: 'uppercase'
              }}>{category.short}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  aspectRatio: '1', background: 'var(--paper-warm)',
                  position: 'relative', overflow: 'hidden',
                  border: i === 0 ? '1px solid var(--char)' : '1px solid transparent',
                  cursor: 'pointer'
                }}>
                  <ProductPlaceholder product={product} small style={{ position: 'absolute', inset: 0 }}/>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: 11, color: 'var(--char-soft)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
              Foto referencial · inserta tu imagen aquí
            </p>
          </div>

          {/* details */}
          <div>
            <div className="mono" style={{ color: 'var(--olive)' }}>{product.brand} · {category.name}</div>
            <h1 className="display italic" style={{
              fontSize: 'clamp(56px, 7vw, 104px)',
              margin: '14px 0 18px',
              lineHeight: 0.92,
              fontWeight: 300,
              letterSpacing: '-0.02em'
            }}>{product.name}</h1>
            <p style={{ fontSize: 17, color: 'var(--char-soft)', margin: '0 0 36px', maxWidth: 480, lineHeight: 1.55, fontWeight: 300 }}>
              {product.desc}
            </p>

            <div style={{ display: 'flex', gap: 48, marginBottom: 40 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>Presentación</div>
                <div style={{ marginTop: 8, fontSize: 15 }}>Eau de Parfum · 100ml</div>
              </div>
              <div>
                <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>Categoría</div>
                <div style={{ marginTop: 8, fontSize: 15 }}>{category.name}</div>
              </div>
            </div>

            <div className="hr-thin" style={{ margin: '8px 0 32px' }}/>

            {/* price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
              <div className="display" style={{ fontSize: 56, fontWeight: 300, lineHeight: 1 }}>{window.fmtCOP(product.price)}</div>
              <div style={{ fontSize: 13, color: 'var(--char-soft)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>COP · IVA incluido</div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <button className="btn olive" style={{ flex: 1 }} onClick={() => addToCart(product)}>
                Añadir a la bolsa
              </button>
              <button className="btn ghost" title="Guardar">♡</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 40 }}>
              {[
                ['🚚', 'Envío Colombia', '24–72h'],
                ['💳', 'Pago contra entrega', 'Disponible'],
                ['✓', 'Garantía calidad', '30 días'],
              ].map(([icon, t, sub]) => (
                <div key={t} style={{ padding: '14px 16px', background: 'var(--paper-warm)', textAlign: 'left' }}>
                  <div style={{ fontSize: 14 }}>{icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t}</div>
                  <div style={{ fontSize: 11, color: 'var(--char-soft)', marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* tabs */}
            <div>
              <div style={{ display: 'flex', gap: 36, borderBottom: '1px solid var(--line)' }}>
                {[['desc', 'Descripción'], ['carac', 'Características'], ['envio', 'Envío']].map(([t, label]) => (
                  <button key={t} onClick={() => setTab(t)} className="eyebrow"
                    style={{
                      background: 'none', border: 0, padding: '14px 0',
                      marginBottom: -1,
                      borderBottom: tab === t ? '1px solid var(--char)' : '1px solid transparent',
                      color: tab === t ? 'var(--char)' : 'var(--char-soft)',
                      cursor: 'pointer'
                    }}>{label}</button>
                ))}
              </div>
              <div style={{ paddingTop: 28, minHeight: 220 }}>
                {tab === 'desc' && (
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--char-soft)', fontWeight: 300 }}>
                    <p style={{ margin: '0 0 16px' }} className="display italic" >
                      <span style={{ fontSize: 22, color: 'var(--char)', fontWeight: 300 }}>
                        {product.desc}
                      </span>
                    </p>
                    <p style={{ margin: 0 }}>
                      Una interpretación cuidadosa de <strong style={{ color: 'var(--char)', fontWeight: 500 }}>{product.brand} {product.name}</strong>.
                      Composición de alta calidad con duración prolongada en piel —
                      entre 6 y 8 horas según el clima. Frasco de 100ml en presentación elegante.
                    </p>
                  </div>
                )}
                {tab === 'carac' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px', fontSize: 14 }}>
                    {[
                      ['Marca inspiración', product.brand],
                      ['Nombre', product.name],
                      ['Categoría', category.name],
                      ['Volumen', '100 ml'],
                      ['Concentración', 'Eau de Parfum'],
                      ['Duración', '6 a 8 horas'],
                      ['Estela', 'Media-alta'],
                      ['Garantía', '30 días'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>{k}</div>
                        <div style={{ marginTop: 6 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'envio' && (
                  <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--char-soft)', display: 'grid', gap: 16 }}>
                    <div>
                      <div className="eyebrow" style={{ color: 'var(--char)' }}>Envíos Colombia</div>
                      <p style={{ margin: '6px 0 0' }}>Entrega de 1 a 3 días hábiles a ciudades principales. 3 a 5 días a zonas alejadas.
                      Envío gratis en pedidos superiores a {window.fmtCOP(200000)}.</p>
                    </div>
                    <div>
                      <div className="eyebrow" style={{ color: 'var(--char)' }}>Métodos de pago</div>
                      <p style={{ margin: '6px 0 0' }}>PSE · Tarjeta de crédito y débito · Nequi · Daviplata · Contra entrega (Bogotá y aledaños).</p>
                    </div>
                    <div>
                      <div className="eyebrow" style={{ color: 'var(--char)' }}>Cambios</div>
                      <p style={{ margin: '6px 0 0' }}>Tienes 30 días para cambiar por otra fragancia o solicitar reembolso si el producto llega con defecto.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section style={{ padding: '88px 0 120px', background: 'var(--paper-warm)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
              <div>
                <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Te pueden gustar</div>
                <h2 className="display italic" style={{ fontSize: 'clamp(36px, 4.4vw, 64px)', margin: '16px 0 0', fontWeight: 300 }}>
                  Otras de {category.name}.
                </h2>
              </div>
              <button className="btn link" onClick={() => setRoute({ name: 'catalog', filter: category.id })}>Ver toda la categoría →</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <ProductCard product={p} onOpen={(prod) => setRoute({ name: 'product', id: prod.id })}
                    onAdd={addToCart}/>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

const breadcrumbBtn = {
  background: 'none', border: 0, padding: 0,
  color: 'var(--char-soft)', cursor: 'pointer',
  fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit'
};

window.ProductPage = ProductPage;
