// FELKAT — main app
const { useState: useStateA, useEffect: useEffectA } = React;

const FELKAT_TWEAKS = /*EDITMODE-BEGIN*/{
  "paletteIdx": 0,
  "displayFont": "Fraunces",
  "uiFont": "Inter"
}/*EDITMODE-END*/;

const PALETTES = [
  { name: 'Oliva (default)',  olive: 'oklch(38% 0.045 115)', ink: 'oklch(34% 0.085 248)', beige: 'oklch(91% 0.022 85)' },
  { name: 'Profunda',         olive: 'oklch(30% 0.045 120)', ink: 'oklch(26% 0.10 250)',  beige: 'oklch(90% 0.025 82)' },
  { name: 'Salvia clara',     olive: 'oklch(52% 0.04 115)',  ink: 'oklch(48% 0.06 245)',  beige: 'oklch(93% 0.018 86)' },
  { name: 'Azul cobalto',     olive: 'oklch(42% 0.05 110)',  ink: 'oklch(34% 0.13 252)',  beige: 'oklch(91% 0.022 85)' },
];

function App() {
  const [route, setRoute]   = useStateA({ name: 'home' });
  const [cart, setCart]     = useStateA([]);
  const [cartOpen, setCartOpen] = useStateA(false);
  const [scrollY, setScrollY] = useStateA(0);
  const [t, setTweak] = useTweaks(FELKAT_TWEAKS);

  useEffectA(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [route]);
  useEffectA(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  function addToCart(product) {
    setCart(prev => {
      const i = prev.findIndex(it => it.product.id === product.id);
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + 1 }; return next;
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  }
  function removeItem(id) { setCart(prev => prev.filter(it => it.product.id !== id)); }
  function updateQty(id, delta) {
    setCart(prev => prev.map(it => it.product.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it));
  }
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  // Apply tweaks
  useEffectA(() => {
    const root = document.documentElement;
    const pal = PALETTES[t.paletteIdx] || PALETTES[0];
    root.style.setProperty('--olive', pal.olive);
    root.style.setProperty('--ink', pal.ink);
    root.style.setProperty('--beige', pal.beige);
    root.style.setProperty('--display', `"${t.displayFont}", Georgia, serif`);
    root.style.setProperty('--sans', `"${t.uiFont}", -apple-system, "Helvetica Neue", system-ui, sans-serif`);
  }, [t.paletteIdx, t.displayFont, t.uiFont]);

  const products = window.FELKAT_PRODUCTS;
  const categories = window.FELKAT_CATEGORIES;
  const brands = window.FELKAT_BRANDS;

  let page;
  if (route.name === 'home')          page = <HomePage     setRoute={setRoute} addToCart={addToCart} products={products} categories={categories} />;
  else if (route.name === 'catalog')  page = <CatalogPage  setRoute={setRoute} addToCart={addToCart} products={products} categories={categories} brands={brands} initialFilter={route.filter} />;
  else if (route.name === 'product')  page = <ProductPage  id={route.id} setRoute={setRoute} addToCart={addToCart} products={products} categories={categories} />;
  else if (route.name === 'quiz')     page = <QuizPage     setRoute={setRoute} addToCart={addToCart} products={products} categories={categories} quiz={window.FELKAT_QUIZ} />;
  else if (route.name === 'about')    page = <AboutPage    setRoute={setRoute} />;
  else if (route.name === 'checkout') page = <CheckoutPage setRoute={setRoute} cart={cart} clearCart={() => setCart([])} />;

  return (
    <React.Fragment>
      <Nav route={route} setRoute={setRoute} cartCount={cartCount}
        openCart={() => setCartOpen(true)} scrollY={scrollY} />
      {page}
      <Footer setRoute={setRoute} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}
        items={cart} removeItem={removeItem} updateQty={updateQty} setRoute={setRoute} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Paleta">
          <PaletteTweak value={t.paletteIdx} onChange={(v) => setTweak('paletteIdx', v)} />
        </TweakSection>

        <TweakSection label="Tipografía">
          <TweakSelect label="Display" value={t.displayFont}
            options={['Fraunces', 'Cormorant Garamond', 'DM Serif Display', 'Instrument Serif']}
            onChange={(v) => setTweak('displayFont', v)} />
          <TweakSelect label="UI" value={t.uiFont}
            options={['Inter', 'Manrope', 'DM Sans']}
            onChange={(v) => setTweak('uiFont', v)} />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

function PaletteTweak({ value, onChange }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, padding: '0 12px 12px' }}>
      {PALETTES.map((p, i) => (
        <button key={i} onClick={() => onChange(i)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: 8,
            border: '1px solid ' + (value === i ? '#222' : '#e5e5e5'),
            background: '#fff', cursor: 'pointer', textAlign: 'left',
            borderRadius: 4
          }}>
          <div style={{ display: 'flex', gap: 2 }}>
            <div style={{ width: 14, height: 14, background: p.olive, borderRadius: 2 }}/>
            <div style={{ width: 14, height: 14, background: p.beige, borderRadius: 2, border: '1px solid #eee' }}/>
            <div style={{ width: 14, height: 14, background: p.ink, borderRadius: 2 }}/>
          </div>
          <span style={{ fontSize: 10, color: '#444' }}>{p.name}</span>
        </button>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
