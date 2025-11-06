import { Campaign, CampaignFormData } from '../views/campaign';

const STORAGE_KEY = 'campaigns';

export const storage = {
  getCampaigns(): Campaign[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCampaign(formData: CampaignFormData): Campaign {
    const campaigns = this.getCampaigns();
    const newCampaign: Campaign = {
      id: crypto.randomUUID(),
      ...formData,
      status: 'Draft',
      sent: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
    };
    campaigns.push(newCampaign);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    return newCampaign;
  },

  initializeDemoData() {
    const existing = this.getCampaigns();
    if (existing.length > 0) return;

    const demoData: Campaign[] = [
      {
        id: '1',
        name: 'Q4 Product Launch',
        type: 'Email',
        description: 'Launch campaign for new product features',
        status: 'Active',
        sent: 1250,
        replies: 342,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        name: 'Customer Feedback Survey',
        type: 'WhatsApp',
        description: 'Collecting feedback from active customers',
        status: 'Active',
        sent: 850,
        replies: 215,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        name: 'Holiday Promotion',
        type: 'Email',
        description: 'Special holiday discount announcement',
        status: 'Completed',
        sent: 2100,
        replies: 523,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        name: 'New Feature Announcement',
        type: 'Email',
        description: 'Announcing new dashboard features',
        status: 'Draft',
        sent: 0,
        replies: 0,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoData));
  },
};

