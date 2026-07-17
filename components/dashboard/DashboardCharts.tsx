"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { day: "Mon", votes: 12 },
  { day: "Tue", votes: 21 },
  { day: "Wed", votes: 35 },
  { day: "Thu", votes: 48 },
  { day: "Fri", votes: 61 },
  { day: "Sat", votes: 80 },
  { day: "Sun", votes: 95 },
];

const pieData = [
  { name: "Organizations", value: 12 },
  { name: "Elections", value: 18 },
  { name: "Nominees", value: 45 },
  { name: "Votes", value: 150 },
];

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#22c55e",
  "#f59e0b",
];

export default function DashboardCharts() {
  return (
    <div className="grid gap-8 xl:grid-cols-2">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Voting Trend
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid stroke="#1e293b" />

              <XAxis dataKey="day" stroke="#94a3b8" />

              <YAxis stroke="#94a3b8" />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="votes"
                stroke="#06b6d4"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Platform Distribution
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}