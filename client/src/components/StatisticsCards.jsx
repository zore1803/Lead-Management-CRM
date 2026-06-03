export default function StatisticsCards({ stats }) {
  const cards = [
    ["Total Leads", stats?.total || 0],
    ["New Leads", stats?.new || 0],
    ["Qualified", stats?.qualified || 0],
    ["Converted", stats?.converted || 0],
    ["Lost", stats?.lost || 0]
  ];

  return (
    <section className="stats-grid">
      {cards.map(([label, value]) => (
        <article className="stat-card" key={label}>
          <p>{label}</p>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  );
}
