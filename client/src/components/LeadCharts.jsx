import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const COLORS = ["#2563eb", "#0891b2", "#16a34a", "#7c3aed", "#dc2626"];

export default function LeadCharts({ stats }) {
  const data = [
    { name: "New", value: stats?.new || 0 },
    { name: "Contacted", value: stats?.contacted || 0 },
    { name: "Qualified", value: stats?.qualified || 0 },
    { name: "Converted", value: stats?.converted || 0 },
    { name: "Lost", value: stats?.lost || 0 }
  ];

  return (
    <section className="charts-grid">
      <div className="chart-panel">
        <h2>Status Bar Chart</h2>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-panel">
        <h2>Status Pie Chart</h2>
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
