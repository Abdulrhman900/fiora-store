const faqs = [
  {
    question: 'كم يستغرق التوصيل؟',
    answer: 'عادةً بين 2 إلى 5 أيام عمل داخل المملكة حسب المدينة.',
  },
  {
    question: 'هل يمكن إرجاع الطلب؟',
    answer: 'نعم، خلال 7 أيام وفق سياسة الاسترجاع وحالة المنتج.',
  },
  {
    question: 'هل أستطيع الدفع عند الاستلام؟',
    answer: 'نعم، تتوفر طريقة الدفع عند الاستلام بالإضافة إلى خيارات أخرى حسب التوفر.',
  },
];

export default function FaqPage() {
  return (
    <section className="stack">
      <p className="eyebrow">الأسئلة الشائعة</p>
      <h1 className="page-title">الأسئلة الشائعة</h1>
      <div className="dashboard-panel">
        {faqs.map((faq) => (
          <article key={faq.question} className="feature-card">
            <strong>{faq.question}</strong>
            <span className="muted">{faq.answer}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
