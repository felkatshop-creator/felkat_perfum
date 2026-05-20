// FELKAT — shared components (refined minimalist)
const { useState, useEffect, useRef, useMemo } = React;

// Format COP price
window.fmtCOP = (n) => `$${n.toLocaleString('es-CO')}`;

// ─── Elegant product placeholder ───
function ProductPlaceholder({ product, small, style }) {
  return (
    <div className={`placeholder-product ${product.category} ${small ? 'small' : ''}`} style={style}>
      <div className="pp-brand">{product.brand}</div>
      <div className="pp-name">{product.name}</div>
    </div>
  );
}

// ─── Logo ───
function Logo({ size = 22, color }) {
  return (
    <span style={{
      fontFamily: 'var(--display)',
      fontSize: size,
      letterSpacing: '0.32em',
      fontWeight: 400,
      color: color || 'inherit',
      lineHeight: 1,
    }}>FELKAT</span>
  );
}

// ─── Top navigation ───
function Nav({ route, setRoute, cartCount, openCart, scrollY }) {
  const compact = scrollY > 32;
  const items = [
    { id: 'catalog',  label: 'Catálogo' },
    { id: 'quiz',     label: 'Tu aroma' },
    { id: 'about',    label: 'La casa' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'oklch(96.8% 0.008 85 / 0.94)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--line-soft)',
    }}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: compact ? 58 : 84,
        transition: 'height 0.4s cubic-bezier(.2,.8,.2,1)'
      }}>
        <button onClick={() => setRoute({ name: 'home' })}
          style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer' }}>
          <Logo size={compact ? 16 : 20} />
        </button>
        <nav style={{ display: 'flex', gap: 40 }}>
          {items.map(it => (
            <button key={it.id} onClick={() => setRoute({ name: it.id })}
              className="eyebrow"
              style={{
                background: 'none', border: 0, padding: '6px 0', cursor: 'pointer',
                color: route.name === it.id ? 'var(--olive)' : 'var(--char)',
                position: 'relative',
                transition: 'color 0.3s'
              }}>
              {it.label}
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: -2, height: 1,
                background: 'var(--olive)',
                transform: route.name === it.id ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s cubic-bezier(.2,.8,.2,1)'
              }}/>
            </button>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button className="eyebrow" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', color: 'var(--char-soft)' }}>
            COP
          </button>
          <button onClick={openCart}
            className="eyebrow"
            style={{
              background: 'none', border: 0, padding: '6px 0', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10
            }}>
            Bolsa
            <span style={{
              minWidth: 20, height: 20, padding: '0 6px',
              background: cartCount ? 'var(--olive)' : 'transparent',
              border: cartCount ? 'none' : '1px solid var(--line)',
              color: cartCount ? 'var(--paper)' : 'var(--char-soft)',
              borderRadius: 10, fontSize: 10, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              letterSpacing: 0,
              transition: 'background 0.3s'
            }}>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Footer ───
function Footer({ setRoute }) {
  const cols = [
    { title: 'Catálogo',  items: ['Caballero', 'Dama', 'Árabes', 'Novedades'] },
    { title: 'Casa',      items: ['Sobre Felkat', 'Calidad 1.1', 'Garantía', 'Reseñas'] },
    { title: 'Ayuda',     items: ['Envíos Colombia', 'Cambios y devoluciones', 'WhatsApp', 'Mayoristas'] },
  ];
  return (
    <footer style={{ background: 'var(--char)', color: 'var(--paper)', marginTop: 140 }}>
      <div className="wrap" style={{ padding: '96px 64px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 64 }}>
          <div>
            <Logo size={32} />
            <p className="display italic" style={{ fontSize: 26, marginTop: 28, opacity: 0.85, maxWidth: 340, fontWeight: 300 }}>
              Fragancias de alta calidad. Esencias inspiradas, precios honestos.
            </p>
            <div style={{ marginTop: 40 }}>
              <label className="eyebrow" style={{ opacity: 0.6 }}>Recibe lanzamientos</label>
              <div style={{ display: 'flex', marginTop: 12, borderBottom: '1px solid oklch(60% 0.015 95)' }}>
                <input placeholder="tu correo" style={{
                  flex: 1, background: 'transparent', border: 0, padding: '12px 0',
                  color: 'var(--paper)', fontFamily: 'var(--sans)', fontSize: 14, outline: 'none'
                }}/>
                <button style={{ background: 'none', border: 0, color: 'var(--paper)', cursor: 'pointer', fontSize: 18 }}>→</button>
              </div>
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div className="eyebrow" style={{ opacity: 0.55, marginBottom: 22 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
                {col.items.map(i => (
                  <li key={i} style={{ fontSize: 13, opacity: 0.85, cursor: 'pointer', fontWeight: 300 }}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 80, paddingTop: 28,
          borderTop: '1px solid oklch(40% 0.015 95)',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 11, opacity: 0.55, letterSpacing: '0.12em', textTransform: 'uppercase'
        }}>
          <span>© 2026 Felkat — Bogotá, Colombia</span>
          <span>Pagos seguros · Envío nacional · Garantía de autenticidad</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Product card ───
function ProductCard({ product, onOpen, onAdd, view = 'grid' }) {
  const [hover, setHover] = useState(false);

  if (view === 'list') {
    return (
      <article
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '140px 1fr auto auto',
          gap: 36, alignItems: 'center',
          padding: '28px 0',
          borderBottom: '1px solid var(--line-soft)',
          cursor: 'pointer'
        }}
        onClick={() => onOpen(product)}>
        <ProductPlaceholder product={product} small style={{ height: 160, transition: 'transform 0.7s', transform: hover ? 'scale(1.03)' : 'scale(1)' }}/>
        <div>
          <div className="mono" style={{ color: 'var(--olive)' }}>{product.brand}</div>
          <h3 className="display" style={{ fontSize: 28, margin: '8px 0 10px', fontWeight: 300 }}>{product.name}</h3>
          <p style={{ color: 'var(--char-soft)', fontSize: 13, margin: 0, maxWidth: 380, fontWeight: 300 }}>
            {product.desc}
          </p>
        </div>
        <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>
          {window.FELKAT_CATEGORIES.find(c => c.id === product.category).name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span className="display" style={{ fontSize: 22, fontWeight: 300 }}>{window.fmtCOP(product.price)}</span>
          <button className="btn ghost" onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            style={{ padding: '12px 18px' }}>Añadir</button>
        </div>
      </article>
    );
  }

  return (
    <article
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(product)}
      style={{ cursor: 'pointer', position: 'relative' }}>
      <div style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        background: 'var(--paper-warm)',
        overflow: 'hidden',
      }}>
        <ProductPlaceholder product={product} style={{
          position: 'absolute', inset: 0,
          transform: hover ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 1.1s cubic-bezier(.2,.7,.2,1)'
        }}/>
        <div style={{
          position: 'absolute', top: 18, left: 18,
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em',
          color: product.category === 'arabes' ? 'var(--paper)' : 'var(--char)',
          padding: '4px 10px',
          background: product.category === 'arabes' ? 'oklch(20% 0.04 115 / 0.5)' : 'oklch(96% 0.008 85 / 0.7)',
          textTransform: 'uppercase'
        }}>{window.FELKAT_CATEGORIES.find(c => c.id === product.category).short}</div>
        <button onClick={(e) => { e.stopPropagation(); onAdd(product); }}
          className="btn"
          style={{
            position: 'absolute', left: 18, right: 18, bottom: 18,
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.4s, transform 0.4s'
          }}>Añadir a la bolsa</button>
      </div>
      <div style={{ paddingTop: 20 }}>
        <div className="mono" style={{ color: 'var(--olive)' }}>{product.brand}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8, gap: 12 }}>
          <h3 className="display" style={{ fontSize: 21, margin: 0, fontWeight: 300, flex: 1 }}>{product.name}</h3>
          <span className="display" style={{ fontSize: 16, color: 'var(--char-soft)', fontWeight: 300 }}>{window.fmtCOP(product.price)}</span>
        </div>
      </div>
    </article>
  );
}

// ─── Cart drawer ───
function CartDrawer({ open, onClose, items, removeItem, updateQty, setRoute }) {
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);
  const shipping = subtotal > 200000 ? 0 : 11500;
  return (
    <React.Fragment>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'oklch(20% 0.015 95 / 0.45)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.45s', zIndex: 40
      }}/>
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(500px, 100vw)',
        background: 'var(--paper)',
        zIndex: 41,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.6s cubic-bezier(.2,.8,.2,1)',
        display: 'flex', flexDirection: 'column'
      }}>
        <div style={{ padding: '36px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line-soft)' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>Tu bolsa</div>
            <div className="display" style={{ fontSize: 30, marginTop: 6, fontWeight: 300 }}>
              {items.length === 0 ? 'Vacía' : `${items.reduce((s, it) => s + it.qty, 0)} fragancia${items.reduce((s, it) => s + it.qty, 0) > 1 ? 's' : ''}`}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 0, fontSize: 22, cursor: 'pointer',
            width: 40, height: 40, color: 'var(--char)'
          }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 40px' }}>
          {items.length === 0 && (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <p className="display italic" style={{ fontSize: 22, color: 'var(--char-soft)', fontWeight: 300 }}>
                Aún no has elegido una fragancia.
              </p>
              <button className="btn ghost" onClick={() => { onClose(); setRoute({ name: 'catalog' }); }}
                style={{ marginTop: 24 }}>Ver catálogo</button>
            </div>
          )}
          {items.map(it => (
            <div key={it.product.id} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr auto',
              gap: 20, padding: '22px 0',
              borderBottom: '1px solid var(--line-soft)'
            }}>
              <ProductPlaceholder product={it.product} small style={{ height: 112 }}/>
              <div>
                <div className="mono" style={{ color: 'var(--olive)' }}>{it.product.brand}</div>
                <div className="display" style={{ fontSize: 19, marginTop: 5, fontWeight: 300 }}>{it.product.name}</div>
                <div style={{ color: 'var(--char-soft)', fontSize: 12, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>100ml · {window.FELKAT_CATEGORIES.find(c=>c.id===it.product.category).name}</div>
                <div style={{ marginTop: 14, display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ display: 'flex', border: '1px solid var(--line)' }}>
                    <button onClick={() => updateQty(it.product.id, -1)} style={qtyBtn}>−</button>
                    <span style={{ width: 30, lineHeight: '28px', textAlign: 'center', fontSize: 12 }}>{it.qty}</span>
                    <button onClick={() => updateQty(it.product.id, 1)} style={qtyBtn}>+</button>
                  </div>
                  <button onClick={() => removeItem(it.product.id)} style={{ background: 'none', border: 0, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--char-soft)', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>Quitar</button>
                </div>
              </div>
              <div className="display" style={{ fontSize: 17, fontWeight: 300 }}>{window.fmtCOP(it.product.price * it.qty)}</div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '28px 40px 36px', borderTop: '1px solid var(--line-soft)', background: 'var(--paper-warm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
              <span style={{ color: 'var(--char-soft)' }}>Subtotal</span>
              <span>{window.fmtCOP(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 18 }}>
              <span style={{ color: 'var(--char-soft)' }}>Envío {shipping === 0 && '(incluido)'}</span>
              <span>{shipping === 0 ? '—' : window.fmtCOP(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
              <span className="eyebrow">Total</span>
              <span className="display" style={{ fontSize: 30, fontWeight: 300 }}>{window.fmtCOP(subtotal + shipping)}</span>
            </div>
            <button className="btn olive" style={{ width: '100%' }}
              onClick={() => { onClose(); setRoute({ name: 'checkout' }); }}>
              Continuar al pago
            </button>
            <p style={{ fontSize: 11, textAlign: 'center', color: 'var(--char-soft)', marginTop: 16 }}>
              Envíos gratis desde {window.fmtCOP(200000)} · Pago contra entrega disponible
            </p>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

const qtyBtn = { background: 'none', border: 0, width: 30, height: 28, cursor: 'pointer', fontSize: 14, color: 'var(--char)' };

// ─── Reveal helper ───
function Reveal({ children, delay = 0, style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setSeen(true); });
    }, { threshold: 0.1 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${seen ? 'is-in' : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

Object.assign(window, { Logo, Nav, Footer, ProductCard, CartDrawer, Reveal, ProductPlaceholder });
