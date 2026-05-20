// FELKAT — Catálogo (filtros por categoría + marca, grid/list, sort)
const { useState: useStateC, useMemo: useMemoC, useEffect: useEffectC } = React;

function CatalogPage({ setRoute, addToCart, products, categories, brands, initialFilter }) {
  const [view, setView] = useStateC('grid');
  const [activeCat, setActiveCat] = useStateC(initialFilter || 'all');
  const [activeBrand, setActiveBrand] = useStateC('all');
  const [sort, setSort] = useStateC('default');
  const [query, setQuery] = useStateC('');

  // Apply initial filter from nav
  useEffectC(() => {
    if (initialFilter) setActiveCat(initialFilter);
  }, [initialFilter]);

  const visibleBrands = useMemoC(() => {
    const subset = activeCat === 'all' ? products : products.filter(p => p.category === activeCat);
    return [...new Set(subset.map(p => p.brand))].sort();
  }, [activeCat, products]);

  const filtered = useMemoC(() => {
    let list = activeCat === 'all' ? products : products.filter(p => p.category === activeCat);
    if (activeBrand !== 'all') list = list.filter(p => p.brand === activeBrand);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'brand')      list = [...list].sort((a, b) => a.brand.localeCompare(b.brand));
    if (sort === 'name')       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCat, activeBrand, sort, query, products]);

  // Reset brand when category changes
  useEffectC(() => { setActiveBrand('all'); }, [activeCat]);

  return (
    <main>
      {/* header */}
      <section style={{ padding: '80px 0 48px', background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="eyebrow" style={{ color: 'var(--olive)' }}>— Catálogo Felkat</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 20, flexWrap: 'wrap', gap: 24 }}>
            <h1 className="display italic" style={{ fontSize: 'clamp(64px, 10vw, 160px)', margin: 0, lineHeight: 0.92, fontWeight: 300, letterSpacing: '-0.025em' }}>
              {activeCat === 'all' ? 'Todas las fragancias' : categories.find(c => c.id === activeCat).name}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <div className="mono" style={{ color: 'var(--char-soft)' }}>{String(filtered.length).padStart(2, '0')} de {products.length}</div>
              <div style={{
                width: 240, padding: '10px 0',
                borderBottom: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span style={{ color: 'var(--char-soft)', fontSize: 13 }}>⌕</span>
                <input value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar perfume o marca…"
                  style={{
                    flex: 1, background: 'transparent', border: 0, outline: 'none',
                    fontSize: 13, color: 'var(--char)', fontFamily: 'var(--sans)', fontWeight: 300
                  }}/>
                {query && (
                  <button onClick={() => setQuery('')} style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--char-soft)', fontSize: 14 }}>×</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sticky filter bar */}
      <section style={{ position: 'sticky', top: 84, zIndex: 20, background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 64px', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={() => setActiveCat('all')} className="eyebrow"
              style={pillStyle(activeCat === 'all')}>Todas</button>
            {categories.map(c => (
              <button key={c.id} onClick={() => setActiveCat(c.id)} className="eyebrow"
                style={pillStyle(activeCat === c.id)}>{c.name}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="eyebrow"
              style={{
                background: 'transparent', border: 0, padding: '6px 0',
                color: 'var(--char)', cursor: 'pointer', fontFamily: 'var(--sans)'
              }}>
              <option value="default">Predeterminado</option>
              <option value="price-asc">Precio · menor</option>
              <option value="price-desc">Precio · mayor</option>
              <option value="brand">Marca · A-Z</option>
              <option value="name">Nombre · A-Z</option>
            </select>
            <div style={{ display: 'flex', border: '1px solid var(--line)' }}>
              <button onClick={() => setView('grid')} style={viewBtn(view === 'grid')} title="Cuadrícula">
                <ViewIcon kind="grid" />
              </button>
              <button onClick={() => setView('list')} style={viewBtn(view === 'list')} title="Lista">
                <ViewIcon kind="list" />
              </button>
            </div>
          </div>
        </div>

        {/* brand subfilter */}
        <div className="wrap" style={{ padding: '0 64px 16px' }}>
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
            paddingTop: 8, borderTop: '1px dashed var(--line-soft)'
          }}>
            <span className="eyebrow" style={{ color: 'var(--char-soft)', marginRight: 6, paddingTop: 8 }}>Marca:</span>
            <button onClick={() => setActiveBrand('all')} style={chipStyle(activeBrand === 'all')}>Todas</button>
            {visibleBrands.map(b => (
              <button key={b} onClick={() => setActiveBrand(b)} style={chipStyle(activeBrand === b)}>{b}</button>
            ))}
          </div>
        </div>
      </section>

      {/* products */}
      <section style={{ padding: '56px 0 120px', background: 'var(--paper)' }}>
        <div className="wrap">
          {view === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 44
            }}>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 8) * 50}>
                  <ProductCard product={p} onOpen={(prod) => setRoute({ name: 'product', id: prod.id })}
                    onAdd={addToCart} view="grid"/>
                </Reveal>
              ))}
            </div>
          ) : (
            <div>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 30}>
                  <ProductCard product={p} onOpen={(prod) => setRoute({ name: 'product', id: prod.id })}
                    onAdd={addToCart} view="list"/>
                </Reveal>
              ))}
            </div>
          )}
          {filtered.length === 0 && (
            <div style={{ padding: '120px 0', textAlign: 'center', color: 'var(--char-soft)' }}>
              <p className="display italic" style={{ fontSize: 28, fontWeight: 300 }}>No hay coincidencias.</p>
              <button className="btn link" style={{ marginTop: 20 }}
                onClick={() => { setActiveCat('all'); setActiveBrand('all'); setQuery(''); }}>
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function pillStyle(active) {
  return {
    background: 'none', border: 0, padding: '6px 0',
    borderBottom: active ? '1px solid var(--olive)' : '1px solid transparent',
    color: active ? 'var(--olive)' : 'var(--char)',
    cursor: 'pointer',
    transition: 'all 0.3s'
  };
}
function chipStyle(active) {
  return {
    padding: '6px 14px',
    background: active ? 'var(--char)' : 'transparent',
    color: active ? 'var(--paper)' : 'var(--char-soft)',
    border: '1px solid ' + (active ? 'var(--char)' : 'var(--line)'),
    fontSize: 10.5,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    fontFamily: 'var(--sans)',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.25s',
    borderRadius: 999
  };
}
function viewBtn(active) {
  return {
    background: active ? 'var(--char)' : 'transparent',
    color: active ? 'var(--paper)' : 'var(--char)',
    border: 0, width: 38, height: 32,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
  };
}
function ViewIcon({ kind }) {
  if (kind === 'grid') return (
    <svg width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="0" width="6" height="6" fill="currentColor"/><rect x="8" y="0" width="6" height="6" fill="currentColor"/><rect x="0" y="8" width="6" height="6" fill="currentColor"/><rect x="8" y="8" width="6" height="6" fill="currentColor"/></svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 14 14"><rect x="0" y="1" width="14" height="2" fill="currentColor"/><rect x="0" y="6" width="14" height="2" fill="currentColor"/><rect x="0" y="11" width="14" height="2" fill="currentColor"/></svg>
  );
}

window.CatalogPage = CatalogPage;
