// FELKAT — Checkout (Colombia, pesos)
const { useState: useStateCk } = React;

function CheckoutPage({ setRoute, cart, clearCart }) {
  const [step, setStep] = useStateCk('shipping');
  const [form, setForm] = useStateCk({
    email: '', name: '', phone: '',
    address: '', city: '', dept: 'Cundinamarca',
    method: 'pse',
  });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const subtotal = cart.reduce((s, it) => s + it.product.price * it.qty, 0);
  const shipping = subtotal > 200000 ? 0 : 11500;
  const total = subtotal + shipping;

  if (cart.length === 0 && step !== 'done') {
    return (
      <main style={{ padding: '180px 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>— Bolsa vacía</div>
        <h1 className="display italic" style={{ fontSize: 64, margin: '20px 0 36px', fontWeight: 300 }}>
          Aún no hay nada que pagar.
        </h1>
        <button className="btn olive" onClick={() => setRoute({ name: 'catalog' })}>Ver catálogo</button>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--paper)', minHeight: '90vh' }}>
      <section style={{ padding: '56px 0 20px', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Pago seguro</div>
            <h1 className="display italic" style={{ fontSize: 'clamp(44px, 5vw, 72px)', margin: '14px 0 0', fontWeight: 300 }}>
              Finalizar pedido
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 36 }}>
            {[['shipping', 'Envío'], ['payment', 'Pago'], ['done', 'Confirmado']].map(([s, label], i) => (
              <div key={s} className="eyebrow" style={{
                color: step === s ? 'var(--olive)' : 'var(--char-soft)',
                paddingBottom: 6,
                borderBottom: step === s ? '1px solid var(--olive)' : '1px solid transparent'
              }}>
                {String(i + 1).padStart(2, '0')} {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0 140px' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: step === 'done' ? '1fr' : '1.4fr 1fr', gap: 96 }}>
          <div>
            {step === 'shipping' && (
              <div>
                <h2 className="display italic" style={{ fontSize: 36, margin: '0 0 36px', fontWeight: 300 }}>Envío</h2>
                <div style={{ display: 'grid', gap: 20 }}>
                  <Field label="Correo electrónico" value={form.email} onChange={update('email')} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <Field label="Nombre completo" value={form.name} onChange={update('name')} />
                    <Field label="Teléfono / WhatsApp" value={form.phone} onChange={update('phone')} />
                  </div>
                  <Field label="Dirección" value={form.address} onChange={update('address')} placeholder="Calle, número, apto…"/>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <Field label="Ciudad" value={form.city} onChange={update('city')} />
                    <Field label="Departamento" value={form.dept} onChange={update('dept')} />
                  </div>
                </div>
                <button className="btn olive" style={{ marginTop: 36 }}
                  onClick={() => setStep('payment')}>Continuar al pago →</button>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <h2 className="display italic" style={{ fontSize: 36, margin: '0 0 36px', fontWeight: 300 }}>Método de pago</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {[
                    ['pse', 'PSE', 'Débito desde tu banco'],
                    ['card', 'Tarjeta crédito/débito', 'Visa · Mastercard · Amex'],
                    ['nequi', 'Nequi / Daviplata', 'Pago desde la app'],
                    ['cod', 'Pago contra entrega', 'Bogotá y aledaños · Efectivo'],
                  ].map(([id, label, sub]) => (
                    <label key={id} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '20px 24px',
                      border: '1px solid ' + (form.method === id ? 'var(--olive)' : 'var(--line)'),
                      background: form.method === id ? 'var(--paper-warm)' : 'var(--paper)',
                      cursor: 'pointer', transition: 'all 0.25s'
                    }}>
                      <input type="radio" name="method" checked={form.method === id}
                        onChange={() => setForm({ ...form, method: id })}
                        style={{ accentColor: 'var(--olive)' }}/>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, fontSize: 14 }}>{label}</div>
                        <div style={{ fontSize: 12, color: 'var(--char-soft)', marginTop: 4 }}>{sub}</div>
                      </div>
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: 24, padding: 18, background: 'var(--paper-warm)', fontSize: 12, color: 'var(--char-soft)' }}>
                  🔒 Pago procesado con conexión cifrada · Tus datos no se almacenan
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
                  <button className="btn ghost" onClick={() => setStep('shipping')}>← Envío</button>
                  <button className="btn olive" style={{ flex: 1 }}
                    onClick={() => { setStep('done'); clearCart(); }}>Pagar {window.fmtCOP(total)} →</button>
                </div>
              </div>
            )}

            {step === 'done' && (
              <div style={{ textAlign: 'center', padding: '48px 0 0', maxWidth: 640, margin: '0 auto' }}>
                <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Pedido recibido</div>
                <h2 className="display italic" style={{ fontSize: 'clamp(56px, 7vw, 104px)', margin: '28px 0 32px', lineHeight: 1, fontWeight: 300, letterSpacing: '-0.025em' }}>
                  Gracias.
                </h2>
                <p style={{ fontSize: 17, color: 'var(--char-soft)', lineHeight: 1.65, fontWeight: 300 }}>
                  Tu pedido <span className="mono" style={{ color: 'var(--char)' }}>FK-{Math.floor(Math.random() * 90000 + 10000)}</span> está confirmado.
                  Te escribimos por WhatsApp en los próximos minutos para confirmar
                  la dirección y el día de despacho.
                </p>
                <div style={{ marginTop: 56, padding: 28, background: 'var(--paper-warm)' }}>
                  <p className="display italic" style={{ fontSize: 20, margin: 0, fontWeight: 300 }}>
                    Envío gratuito incluido · Llega en 1 a 3 días hábiles.
                  </p>
                </div>
                <button className="btn olive" style={{ marginTop: 48 }}
                  onClick={() => setRoute({ name: 'home' })}>Volver al inicio</button>
              </div>
            )}
          </div>

          {step !== 'done' && (
            <aside style={{ background: 'var(--paper-warm)', padding: 36, height: 'fit-content', position: 'sticky', top: 110 }}>
              <div className="eyebrow" style={{ color: 'var(--olive)', marginBottom: 20 }}>— Tu pedido</div>
              <div style={{ display: 'grid', gap: 18, paddingBottom: 22, borderBottom: '1px solid var(--line)' }}>
                {cart.map(it => (
                  <div key={it.product.id} style={{ display: 'grid', gridTemplateColumns: '70px 1fr auto', gap: 14, alignItems: 'center' }}>
                    <ProductPlaceholder product={it.product} small style={{ height: 88 }}/>
                    <div>
                      <div className="mono" style={{ color: 'var(--olive)', fontSize: 10 }}>{it.product.brand}</div>
                      <div style={{ fontSize: 14, fontWeight: 500, marginTop: 3 }}>{it.product.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--char-soft)', marginTop: 3 }}>100ml · ×{it.qty}</div>
                    </div>
                    <div style={{ fontSize: 14 }}>{window.fmtCOP(it.product.price * it.qty)}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gap: 10, padding: '22px 0', fontSize: 13 }}>
                <Row k="Subtotal" v={window.fmtCOP(subtotal)} />
                <Row k={`Envío${shipping === 0 ? ' (gratis)' : ''}`} v={shipping === 0 ? '—' : window.fmtCOP(shipping)} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--line)', paddingTop: 18 }}>
                <span className="eyebrow">Total</span>
                <span className="display" style={{ fontSize: 34, fontWeight: 300 }}>{window.fmtCOP(total)}</span>
              </div>
            </aside>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: 'block' }}>
      <span className="eyebrow" style={{ color: 'var(--char-soft)', display: 'block', marginBottom: 10 }}>{label}</span>
      <input value={value} onChange={onChange} placeholder={placeholder || ''}
        style={{
          width: '100%', padding: '14px 0', background: 'transparent',
          border: 0, borderBottom: '1px solid var(--line)',
          fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--char)',
          outline: 'none', transition: 'border-color 0.25s', fontWeight: 300
        }}
        onFocus={e => e.target.style.borderColor = 'var(--olive)'}
        onBlur={e => e.target.style.borderColor = 'var(--line)'}/>
    </label>
  );
}
function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: 'var(--char-soft)' }}>{k}</span>
      <span>{v}</span>
    </div>
  );
}

window.CheckoutPage = CheckoutPage;
