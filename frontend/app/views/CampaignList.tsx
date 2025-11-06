'use client';

import { useState } from 'react';
import { Plus, Mail, MessageSquare, Calendar, CheckCircle } from 'lucide-react';
import { Campaign } from './campaign';
import { Modal } from '../components/Modal';

interface CampaignListProps {
  campaigns: Campaign[];
  onCreateClick: () => void;
}

export function CampaignList({ campaigns, onCreateClick }: CampaignListProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const truncateText = (text: string, wordLimit: number = 5): string => {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Draft':
        return 'bg-slate-100 text-slate-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Campaigns</h1>
          <p className="text-sm sm:text-base text-slate-600">Your campaigns</p>
        </div>
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm w-full sm:w-auto"
        >
          <Plus size={20} />
          <span className="text-sm sm:text-base">Create New Campaign</span>
        </button>
      </div>

      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-semibold text-slate-700">
                  Campaign Name
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-semibold text-slate-700">
                  Type
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-semibold text-slate-700">
                  Sent
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-semibold text-slate-700">
                  Replies
                </th>
                <th className="text-left px-4 lg:px-6 py-4 text-sm font-semibold text-slate-700">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No campaigns yet. Create your first campaign to get started!
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => handleCampaignClick(campaign)}
                  >
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900 hover:text-blue-600 transition-colors">
                          {truncateText(campaign.name, 5)}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {truncateText(campaign.description, 5)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-slate-700">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-slate-900 font-medium">
                      {campaign.sent.toLocaleString()}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-slate-900 font-medium">
                      {campaign.replies.toLocaleString()}
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-slate-600 text-sm">
                      {formatDate(campaign.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
            No campaigns yet. Create your first campaign to get started!
          </div>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCampaignClick(campaign)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-1 hover:text-blue-600 transition-colors">
                    {truncateText(campaign.name, 5)}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {truncateText(campaign.description, 5)}
                  </p>
                </div>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    campaign.status
                  )}`}
                >
                  {campaign.status}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2 border-t border-slate-100">
                <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-slate-500 mb-1">Type</p>
                  <p className="text-sm font-medium text-slate-900">{campaign.type}</p>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-slate-500 mb-1">Sent</p>
                  <p className="text-sm font-medium text-slate-900">
                    {campaign.sent.toLocaleString()}
                  </p>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-slate-500 mb-1">Replies</p>
                  <p className="text-sm font-medium text-slate-900">
                    {campaign.replies.toLocaleString()}
                  </p>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <p className="text-xs text-slate-500 mb-1">Created</p>
                  <p className="text-sm font-medium text-slate-600">{formatDate(campaign.createdAt)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        title={selectedCampaign?.name || 'Campaign Details'}
      >
        {selectedCampaign && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-500 mb-1 block">Description</label>
                <p className="text-slate-900">{selectedCampaign.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-500 mb-1 block">Type</label>
                  <div className="flex items-center gap-2">
                    {selectedCampaign.type === 'Email' ? (
                      <Mail className="text-blue-600" size={18} />
                    ) : (
                      <MessageSquare className="text-green-600" size={18} />
                    )}
                    <span className="text-slate-900 font-medium">{selectedCampaign.type}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-500 mb-1 block">Status</label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedCampaign.status
                    )}`}
                  >
                    {selectedCampaign.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="text-blue-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Emails Sent</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedCampaign.sent.toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="text-green-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Replies</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedCampaign.replies.toLocaleString()}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="text-purple-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Response Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {selectedCampaign.sent > 0
                      ? ((selectedCampaign.replies / selectedCampaign.sent) * 100).toFixed(1)
                      : '0.0'}
                    %
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-orange-600" size={20} />
                    <span className="text-sm font-medium text-slate-600">Meetings Booked</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {Math.floor(selectedCampaign.replies * 0.28)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar size={18} />
                <span className="text-sm">
                  <span className="font-medium">Created:</span> {formatDateTime(selectedCampaign.createdAt)}
                </span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
