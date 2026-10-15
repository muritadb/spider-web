import { useEffect, useRef, useState } from 'react';
import { assets, characters, type Character } from './characters';

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '↘'}</span>;
}

function SpiderMark() {
  return <svg viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M20 8v28m-4-18-5-7V3m13 15 5-7V3M15 22l-9-5-3-9m22 14 9-5 3-9M15 27l-9 4-3 10m22-14 9 4 3 10M17 30l-5 7v7m11-14 5 7v7" stroke="currentColor" strokeWidth="2.4"/><ellipse cx="20" cy="24" rx="5" ry="10" fill="currentColor"/><circle cx="20" cy="12" r="4" fill="currentColor"/></svg>;
}

function OfficialImage({ asset, alt, className = '', eager = false }: {
  asset: keyof typeof assets; alt: string; className?: string; eager?: boolean;
}) {
  const entry = assets[asset];
  const [failed, setFailed] = useState(false);
  // Vite resolves local assets at build time; missing downloads use credited official URLs.
  const localFiles = import.meta.glob('/public/assets/*.jpg', { eager: true, query: '?url', import: 'default' });
  const source = localFiles[`/public/assets/${entry.file}`] as string | undefined;
  return <div className={`official-image ${className} ${failed ? 'image-unavailable' : ''}`}>
    {!failed ? <img src={source?.replace('/public/', '/') ?? entry.url} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" onError={() => setFailed(true)} /> : <div className="image-fallback"><SpiderMark /><span>Arte oficial indisponível</span><a href={entry.url} target="_blank" rel="noreferrer">Ver material original <Arrow diagonal /></a></div>}
  </div>;
}

function CharacterSection({ character: c, index }: { character: Character; index: number }) {
  const next = characters[index + 1];
  return <section id={c.id} className={`universe universe-${c.id}`} aria-labelledby={`${c.id}-title`}>
    <div className="universe-top"><span>ARQUIVO DO MULTIVERSO / 0{index + 1}</span><span>TERRA–{c.earth} <span className="status-dot" /></span></div>
    <div className="universe-grid">
      <div className="character-copy reveal">
        <div className="eyebrow"><span className="short-line" /> {c.alias}</div>
        <h2 id={`${c.id}-title`}><span>{c.name}</span><strong>{c.surname}</strong></h2>
        <p className="location"><span aria-hidden="true">⌖</span> {c.location}</p>
        <h3>{c.headline}</h3>
        <p className="description">{c.description}</p>
        <div className="style-note"><span className="tiny-label">O TRAÇO DESTE UNIVERSO</span><h4>{c.style}</h4><p>{c.note}</p><div className="swatches" aria-label="Paleta de cores">{c.palette.map(color => <span key={color} style={{ backgroundColor: color }} title={color} />)}</div></div>
      </div>
      <div className="character-art reveal">
        <div className="art-orbit" aria-hidden="true" />
        <div className="art-background-word" aria-hidden="true">{c.id === 'hobie' ? 'NO RULES' : c.earth}</div>
        <figure><OfficialImage asset={c.id} alt={c.imageAlt} /><figcaption><span>ESTUDO DE PERSONAGEM</span><span>0{index + 1} / 06</span></figcaption></figure>
        <span className="art-sticker" aria-hidden="true">{c.id === 'gwen' ? 'Sinta as cores.' : c.id === 'hobie' ? 'FAÇA BARULHO!' : c.id === 'pavitr' ? 'NAMASTÊ!' : c.id === 'peter' ? 'Um novo capítulo.' : c.id === 'miguel' ? 'SYSTEM: 2099' : 'BE YOURSELF.'}</span>
      </div>
    </div>
    <div className="universe-bottom"><span>UM MESMO SÍMBOLO. OUTRO PONTO DE VISTA.</span><a href={next ? `#${next.id}` : '#universos'}>{next ? `Próximo universo: ${next.name}` : 'Revisitar os universos'} <Arrow /></a></div>
    {next && <div className="portal-divider" aria-hidden="true"><span /><span /><span /></div>}
  </section>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-20% 0px -35% 0px', threshold: [0, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));
    return () => { observer.disconnect(); revealObserver.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Aranhaverso, início"><SpiderMark /><span>ARANHA<span className="brand-outline">VERSO</span><small>UM ATLAS DO MULTIVERSO</small></span></a>
      <button className="menu-toggle" ref={menuButton} aria-controls="main-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar −' : 'Explorar +'}</button>
      <nav id="main-nav" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Universos">
        {characters.map(c => <a key={c.id} href={`#${c.id}`} aria-current={active === c.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{c.name === 'Peter B.' ? 'Peter B.' : c.name}</a>)}
      </nav>
      <a href="#universos" className="header-explore">Explore o multiverso <Arrow diagonal /></a>
    </header>

    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-texture" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-meta"><span><span className="status-dot" /> SEIS HERÓIS. INFINITAS POSSIBILIDADES.</span><span>EST. 2023 / EDIÇÃO 001</span></div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">ATRAVÉS DO ARANHAVERSO</p>
            <h1 id="hero-title">CADA UNIVERSO<br />TEM SEU<br /><em>PRÓPRIO</em><br /><span className="hero-traco">TRAÇO<span className="title-dot">.</span></span></h1>
            <p className="hero-description">Não existe um único jeito de ser o Homem-Aranha.<br className="desktop-break" /> Nem um único jeito de enxergar seu mundo.</p>
            <a className="primary-link" href="#miles">Explorar universos <span><Arrow diagonal /></span></a>
          </div>
          <div className="hero-art">
            <div className="hero-art-label"><span>TRANSMISSÃO INTERDIMENSIONAL</span><span>● AO VIVO</span></div>
            <OfficialImage asset="hero" alt="Arte promocional oficial de Através do Aranhaverso com Miles Morales e outros heróis do multiverso." eager />
            <span className="hero-frame-corner corner-tl" aria-hidden="true" /><span className="hero-frame-corner corner-br" aria-hidden="true" />
            <span className="hero-art-sticker">A MÁSCARA É SÓ<br />O COMEÇO.</span>
            <div className="hero-art-bottom"><span>VOCÊ ESTÁ AQUI ↗</span><span>TERRA–1610</span></div>
          </div>
        </div>
        <div className="hero-bottom"><a href="#universos"><span className="scroll-icon" aria-hidden="true">↓</span> ROLE PARA ATRAVESSAR</a><span>06 UNIVERSOS <span className="meta-slash">/</span> 01 MESMA TEIA</span><span className="hero-coordinates">40°39′ N &nbsp; 73°57′ W</span></div>
      </section>

      <div className="marquee" aria-hidden="true"><div>UMA MÁSCARA <span>✳</span> INFINITAS HISTÓRIAS <span>✳</span> ENCONTRE SEU UNIVERSO <span>✳</span> UMA MÁSCARA <span>✳</span> INFINITAS HISTÓRIAS <span>✳</span></div></div>

      <section className="universe-index" id="universos" aria-labelledby="index-title">
        <div className="index-heading"><div><p className="eyebrow">ESCOLHA SEU DESTINO</p><h2 id="index-title">A teia conecta.<br /><span>O traço diferencia.</span></h2></div><p>Cada herói carrega um mundo inteiro.<br />Atravesse os portais e descubra o seu.</p></div>
        <div className="index-grid">{characters.map((c, i) => <a href={`#${c.id}`} className={`index-card index-${c.id}`} key={c.id}><span className="index-card-top">0{i + 1} <Arrow diagonal /></span><SpiderMark /><span className="index-card-name">{c.name}<br /><strong>{c.surname}</strong></span><span className="index-card-earth">TERRA–{c.earth}</span></a>)}</div>
      </section>

      {characters.map((c, i) => <CharacterSection character={c} index={i} key={c.id} />)}

      <section className="closing" id="fim" aria-labelledby="closing-title"><span className="eyebrow">TODOS OS CAMINHOS SE CONECTAM</span><h2 id="closing-title">A mesma teia.<br /><em>Infinitas histórias.</em></h2><p>O próximo salto é seu.</p><a className="primary-link" href="#universos">Escolher outro universo <span>↗</span></a><div className="closing-web" aria-hidden="true"><SpiderMark /></div></section>
    </main>

    <footer><div className="footer-top"><a className="footer-wordmark" href="#inicio">ARANHAVERSO <span>↗</span></a><p>Um projeto de fã para quem vê<br />o mundo de um jeito diferente.</p><a href="#inicio">Voltar ao início ↑</a></div><details className="credits"><summary>Créditos & referências visuais <span>+</span></summary><p>Projeto não oficial, sem vínculo com Marvel ou Sony Pictures. Personagens © & ™ MARVEL. Filme e materiais promocionais © 2023 Sony Pictures Animation Inc. Todos os direitos pertencem aos respectivos titulares.</p><p>Arte de abertura: <a href="https://www.sonypicturesanimation.com/projects/films/spider-man-spider-verse-sequel/" target="_blank" rel="noreferrer">Sony Pictures Animation</a>. Pôsteres oficiais dos seis personagens: <a href="https://www.superherohype.com/movies/534944-spider-man-across-the-spider-verse-character-posters-show-lots-of-spider-people" target="_blank" rel="noreferrer">Sony Pictures Animation, via SuperHeroHype</a>. Referência de direção de arte: <a href="https://www.sony.com/en/brand/beyondthescreen/acrossthespiderverse/" target="_blank" rel="noreferrer">Sony — Beyond the Screen</a>. A composição da seção de Peter B. é uma interpretação editorial.</p></details><div className="footer-bottom"><span>FEITO DE TRAÇOS, CORES E POSSIBILIDADES.</span><span>FAN PROJECT / 2026</span></div></footer>
    <aside className="section-progress" aria-label="Progresso pelos universos">{characters.map((c, i) => <a key={c.id} className={active === c.id ? 'active' : ''} aria-current={active === c.id ? 'location' : undefined} href={`#${c.id}`} aria-label={`Universo ${i + 1}: ${c.name} ${c.surname}`}><span>{c.name}</span><i /></a>)}</aside>
  </>;
}
