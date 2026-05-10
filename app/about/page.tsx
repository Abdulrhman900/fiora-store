export default function AboutPage() {
  return (
    <section className="hero-shell">
      <div className="hero-copy">
        <p className="eyebrow">من نحن</p>
        <h1 className="page-title">عن فلورا</h1>
        <p className="page-copy">
          نحن في فلورا متجر إلكتروني متخصص في توفير الأدوات الرياضية للنساء. نسعى لتقديم منتجات تجمع بين الجودة والراحة والأناقة، لتكون جزء من رحلتك الرياضية اليومية. نهتم باختيار كل قطعة بعناية لتساعدك على الالتزام بأسلوب حياة صحي ونشط بسهولة.
        </p>
      </div>
      <div className="dashboard-panel">
        <div className="feature-card">
          <strong>رؤية واضحة</strong>
          <span className="muted">منتجات مختارة بعناية للرياضة اليومية.</span>
        </div>
        <div className="feature-card">
          <strong>تجربة عربية</strong>
          <span className="muted">RTL كامل ونصوص عربية في كل الواجهات.</span>
        </div>
      </div>
    </section>
  );
}
