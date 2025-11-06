'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartData {
  name: string;
  sent: number;
  replies: number;
}

interface CampaignChartProps {
  data: ChartData[];
}

export function CampaignChart({ data }: CampaignChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-400">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 12 }}
          stroke="#cbd5e1"
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 12 }}
          stroke="#cbd5e1"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Bar dataKey="sent" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Sent" />
        <Bar dataKey="replies" fill="#10b981" radius={[8, 8, 0, 0]} name="Replies" />
      </BarChart>
    </ResponsiveContainer>
  );
}

