'use client';

import { useEffect, useState } from 'react';
import { Activity, Calendar, Mail, MessageSquare } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Campaign } from './campaign';
import { api } from '../lib/api';
import dynamic from 'next/dynamic';

const CampaignChart = dynamic(
  () => import('../components/CampaignChart').then((mod) => ({ default: mod.CampaignChart })),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-slate-400">
        Loading chart...
      </div>
    ),
  }
);

interface DashboardProps {
  campaigns: Campaign[];
}

interface DashboardStats {
  activeCampaigns: number;
  totalSent: number;
  totalReplies: number;
  meetingsBooked: number;
}

export function Dashboard({ campaigns }: DashboardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    activeCampaigns: 0,
    totalSent: 0,
    totalReplies: 0,
    meetingsBooked: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const isApiAvailable = await api.healthCheck();
        if (isApiAvailable) {
          const dashboardStats = await api.getDashboardStats();
          setStats(dashboardStats);
        } else {
          const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
          const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
          const totalReplies = campaigns.reduce((sum, c) => sum + c.replies, 0);
          const meetingsBooked = Math.floor(totalReplies * 0.28);
          setStats({
            activeCampaigns,
            totalSent,
            totalReplies,
            meetingsBooked,
          });
        }
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
        const totalSent = campaigns.reduce((sum, c) => sum + c.sent, 0);
        const totalReplies = campaigns.reduce((sum, c) => sum + c.replies, 0);
        const meetingsBooked = Math.floor(totalReplies * 0.28);
        setStats({
          activeCampaigns,
          totalSent,
          totalReplies,
          meetingsBooked,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardStats();
  }, [campaigns]);

  const chartData = campaigns
    .filter(c => c.status !== 'Draft')
    .slice(0, 6)
    .map(c => ({
      name: c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name,
      sent: c.sent,
      replies: c.replies,
    }));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-600">Campaign overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Active Campaigns"
          value={isLoading ? '...' : stats.activeCampaigns}
          icon={Activity}
        />
        <StatCard
          title="Emails Sent"
          value={isLoading ? '...' : stats.totalSent.toLocaleString()}
          icon={Mail}
        />
        <StatCard
          title="Replies"
          value={isLoading ? '...' : stats.totalReplies.toLocaleString()}
          icon={MessageSquare}
        />
        <StatCard
          title="Meetings Booked"
          value={isLoading ? '...' : stats.meetingsBooked}
          icon={Calendar}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Campaign Performance</h2>
        <div className="w-full h-[250px] sm:h-[300px]">
          {isMounted && chartData.length > 0 ? (
            <CampaignChart data={chartData} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              Loading chart...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
