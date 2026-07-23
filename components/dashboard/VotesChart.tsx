"use client";

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface VotesChartProps {
  data: {
    name: string;
    votes: number;
  }[];
}

export default function VotesChart({
  data,
}: VotesChartProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Votes by Category
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid stroke="#334155" />

            <XAxis
              dataKey="name"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Bar
              dataKey="votes"
              fill="#06B6D4"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}