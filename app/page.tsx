const projects = [
  { title: '朝の天気', description: '一日のはじまりに見る、小さな天気ダッシュボード。', category: '実験', year: '2024', url: 'https://example.vercel.app', tone: 'ink' },
  { title: 'ことばの標本箱', description: '気になった言葉を集めて、静かに眺めるための場所。', category: 'ツール', year: '2024', url: 'https://example.com', tone: 'sand' },
  { title: '音のない読書室', description: '本のメモと、そのとき考えていたことの記録。', category: '記録', year: '2023', url: 'https://example.vercel.app', tone: 'clay' },
  { title: '週末の地図', description: '知らない街を歩くための、個人的なガイド。', category: '実験', year: '2023', url: 'https://example.com', tone: 'blue' },
]

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>
}

export default function Page() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="madoromi home"><span className="brand-mark">m</span><span>madoromi</span></a>
        <nav aria-label="メインナビゲーション">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="eyebrow">個人的なインターネットの記録 <span>—</span> 2023–2024</p>
        <h1>思いついたものを、<br /><em>かたちにする。</em></h1>
        <div className="hero-bottom">
          <p>AIと一緒につくった、関連性のない<br className="mobile-break" />小さなウェブサイトたち。</p>
          <a className="text-link" href="#projects">すべて見る <ArrowIcon /></a>
        </div>
      </section>

      <section className="projects-section" id="projects" aria-labelledby="projects-heading">
        <div className="section-heading"><p className="eyebrow">Selected works</p><h2 id="projects-heading">つくったもの</h2><span className="project-count">{projects.length} projects</span></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <a className={`project-card ${project.tone}`} href={project.url} target="_blank" rel="noreferrer" key={project.title}>
              <div className="project-number">0{index + 1}</div>
              <div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p></div>
              <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
              <ArrowIcon />
            </a>
          ))}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-heading">
        <p className="eyebrow">A little about this place</p>
        <div><h2 id="about-heading">ジャンルも目的も<br /><em>ばらばらでいい。</em></h2><p className="about-copy">役に立つものも、そうでないものも。<br />気になったことを、気になったままに。<br />ここはそんな制作物の置き場所です。</p></div>
      </section>

      <footer><span>madoromi / 2024</span><span>made with curiosity &amp; AI</span><a href="#top">back to top ↑</a></footer>
    </main>
  )
}

