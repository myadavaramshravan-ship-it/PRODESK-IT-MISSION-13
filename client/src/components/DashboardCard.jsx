function DashboardCard({ title, value }) {
  return (
    <article className="card stat-card">
      <p className="card-title">{title}</p>
      <p className="card-value">{value}</p>
    </article>
  );
}

export default DashboardCard;
