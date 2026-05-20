// FELKAT — Quiz interactivo (recomienda 2 perfumes del catálogo real)
const { useState: useStateQ, useMemo: useMemoQ } = React;

function QuizPage({ setRoute, addToCart, products, categories, quiz }) {
  const [step, setStep] = useStateQ(0); // 0=intro, 1..N=Q, N+1=result
  const [answers, setAnswers] = useStateQ([]);

  const total = quiz.length;
  const isIntro = step === 0;
  const isResult = step === total + 1;
  const qIndex = step - 1;

  const result = useMemoQ(() => {
    if (!isResult) return null;
    const tally = {};
    answers.forEach(a => {
      Object.entries(a.weights).forEach(([f, w]) => { tally[f] = (tally[f] || 0) + w; });
    });
    // Determine top category
    const catScores = {
      cat_caballero: tally.cat_caballero || 0,
      cat_dama: tally.cat_dama || 0,
      cat_arabes: tally.cat_arabes || 0,
    };
    const topCatKey = Object.entries(catScores).sort((a, b) => b[1] - a[1])[0][0];
    const topCat = topCatKey.replace('cat_', '');

    // Score every product in that category by mood matches
    const moodKeys = Object.keys(tally).filter(k => !k.startsWith('cat_'));
    const scored = products
      .filter(p => p.category === topCat)
      .map(p => {
        const score = (tally[p.mood] || 0) + Math.random() * 0.3;
        return { p, score };
      })
      .sort((a, b) => b.score - a.score);

    const match = scored[0]?.p || products[0];
    const second = scored[1]?.p || products.find(p => p.id !== match.id);
    return { category: topCat, match, second, tally };
  }, [isResult, answers, products]);

  function pick(opt) {
    const next = [...answers]; next[qIndex] = opt; setAnswers(next);
    setTimeout(() => setStep(step + 1), 320);
  }

  return (
    <main style={{ background: 'var(--paper)', minHeight: '90vh' }}>
      {/* progress */}
      <div style={{
        position: 'sticky', top: 84, background: 'var(--paper)',
        borderBottom: '1px solid var(--line-soft)', zIndex: 10
      }}>
        <div className="wrap" style={{ padding: '18px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--char-soft)' }}>
            Encuentra tu aroma · {isIntro ? 'Inicio' : isResult ? 'Resultado' : `${qIndex + 1} de ${total}`}
          </div>
          <div style={{ width: 280, height: 2, background: 'var(--line)', position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${isIntro ? 0 : isResult ? 100 : ((qIndex + 1) / total) * 100}%`,
              background: 'var(--olive)',
              transition: 'width 0.7s cubic-bezier(.2,.7,.2,1)'
            }}/>
          </div>
          {!isIntro && !isResult ? (
            <button onClick={() => setStep(step - 1)} className="eyebrow"
              style={{ background: 'none', border: 0, cursor: 'pointer', color: 'var(--char-soft)' }}>← Anterior</button>
          ) : <div style={{ width: 80 }}/>}
        </div>
      </div>

      <section style={{ padding: '88px 0 140px', minHeight: '70vh' }}>
        <div className="wrap" style={{ maxWidth: 1180, margin: '0 auto' }}>
          {/* INTRO */}
          {isIntro && (
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '40px auto 0' }}>
              <div className="eyebrow" style={{ color: 'var(--ink)' }}>— Cinco preguntas · tres minutos</div>
              <h1 className="display italic" style={{
                fontSize: 'clamp(64px, 9vw, 140px)',
                margin: '32px 0', lineHeight: 0.94,
                fontWeight: 300,
                letterSpacing: '-0.025em'
              }}>
                Vamos a encontrar<br/>tu fragancia.
              </h1>
              <p style={{ color: 'var(--char-soft)', fontSize: 17, lineHeight: 1.65, maxWidth: 560, margin: '0 auto 44px', fontWeight: 300 }}>
                Cinco preguntas rápidas sobre tu estilo, ocasiones favoritas
                y personalidad. Al final te recomendamos dos perfumes
                del catálogo Felkat — uno principal y una alternativa.
              </p>
              <button className="btn olive" onClick={() => setStep(1)}>Empezar quiz →</button>
            </div>
          )}

          {/* QUESTION */}
          {!isIntro && !isResult && (
            <div key={qIndex} style={{ animation: 'fadeIn 0.6s' }}>
              <div className="mono" style={{ color: 'var(--olive)', marginBottom: 20 }}>
                Pregunta {String(qIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
              <h2 className="display italic" style={{
                fontSize: 'clamp(42px, 6vw, 96px)',
                margin: '0 0 64px', lineHeight: 1.0, maxWidth: 940,
                fontWeight: 300, letterSpacing: '-0.02em'
              }}>
                {quiz[qIndex].q}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 920 }}>
                {quiz[qIndex].options.map((opt, i) => {
                  const selected = answers[qIndex]?.label === opt.label;
                  return (
                    <button key={i} onClick={() => pick(opt)}
                      style={{
                        textAlign: 'left',
                        padding: '36px 36px',
                        border: '1px solid ' + (selected ? 'var(--olive)' : 'var(--line)'),
                        background: selected ? 'var(--paper-warm)' : 'var(--paper)',
                        color: 'var(--char)',
                        cursor: 'pointer',
                        transition: 'all 0.35s cubic-bezier(.2,.7,.2,1)',
                        display: 'flex', alignItems: 'center', gap: 28
                      }}
                      onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = 'var(--olive-soft)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                      onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = 'none'; } }}>
                      <div className="mono" style={{ color: 'var(--olive)', minWidth: 28 }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="display italic" style={{ fontSize: 28, lineHeight: 1.15, fontWeight: 300 }}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* RESULT */}
          {isResult && result && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <div className="eyebrow" style={{ color: 'var(--ink)' }}>— Tu resultado</div>
                <h2 className="display italic" style={{
                  fontSize: 'clamp(52px, 7vw, 104px)',
                  margin: '24px 0', lineHeight: 0.96,
                  fontWeight: 300,
                  letterSpacing: '-0.025em'
                }}>
                  Tu fragancia ideal está<br/>
                  en <span style={{ color: 'var(--olive)' }}>{categories.find(c => c.id === result.category).name.toLowerCase()}</span>.
                </h2>
                <p style={{ color: 'var(--char-soft)', maxWidth: 540, margin: '0 auto', fontSize: 16, lineHeight: 1.6, fontWeight: 300 }}>
                  {categories.find(c => c.id === result.category).desc}.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'start' }}>
                {/* primary */}
                <div style={{ background: 'var(--paper-warm)', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 28, left: 28, zIndex: 2 }}>
                    <div className="mono" style={{ color: 'var(--olive)' }}>— Recomendación principal</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }}>
                    <ProductPlaceholder product={result.match} style={{ minHeight: 500 }}/>
                    <div style={{ padding: '76px 44px 44px' }}>
                      <div className="mono" style={{ color: 'var(--olive)' }}>{result.match.brand}</div>
                      <h3 className="display italic" style={{ fontSize: 52, margin: '14px 0 18px', lineHeight: 0.95, fontWeight: 300, letterSpacing: '-0.02em' }}>
                        {result.match.name}
                      </h3>
                      <p style={{ fontSize: 15, color: 'var(--char-soft)', margin: '0 0 28px', lineHeight: 1.65, fontWeight: 300 }}>
                        {result.match.desc}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
                        <span className="display" style={{ fontSize: 40, fontWeight: 300 }}>{window.fmtCOP(result.match.price)}</span>
                        <span style={{ fontSize: 11, color: 'var(--char-soft)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>COP · 100ml</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <button className="btn olive" onClick={() => addToCart(result.match)}>Añadir a la bolsa</button>
                        <button className="btn link" onClick={() => setRoute({ name: 'product', id: result.match.id })}>Ver detalle</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* secondary */}
                <div>
                  <div className="mono" style={{ color: 'var(--ink)', marginBottom: 16 }}>— Alternativa para ti</div>
                  <ProductCard product={result.second} onOpen={(prod) => setRoute({ name: 'product', id: prod.id })}
                    onAdd={addToCart}/>

                  <div style={{ marginTop: 40, padding: 28, background: 'var(--paper-warm)' }}>
                    <div className="eyebrow" style={{ color: 'var(--olive)', marginBottom: 14 }}>— ¿Quieres más opciones?</div>
                    <p className="display italic" style={{ fontSize: 22, margin: '0 0 20px', lineHeight: 1.2, fontWeight: 300 }}>
                      Explora todas las {result.match.category === 'caballero' ? '26' : result.match.category === 'dama' ? '21' : '10'} fragancias de {categories.find(c => c.id === result.category).name}.
                    </p>
                    <button className="btn ghost" style={{ width: '100%' }}
                      onClick={() => setRoute({ name: 'catalog', filter: result.category })}>
                      Ver la categoría →
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 72 }}>
                <button className="btn link" onClick={() => { setAnswers([]); setStep(0); }}>↺ Repetir el quiz</button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }`}</style>
    </main>
  );
}

window.QuizPage = QuizPage;
