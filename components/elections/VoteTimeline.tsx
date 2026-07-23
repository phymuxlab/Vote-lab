"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    time: string;
    votes: number;
  }[];
}

export default function VoteTimeline({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold text-white">
        Vote Timeline
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="votes"
              stroke="#06B6D4"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}