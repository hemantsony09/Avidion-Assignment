export interface Campaign {
  id: string;
  name: string;
  type: 'Email' | 'WhatsApp';
  description: string;
  status: 'Active' | 'Draft' | 'Completed';
  sent: number;
  replies: number;
  createdAt: string;
}

export interface CampaignFormData {
  name: string;
  type: 'Email' | 'WhatsApp';
  description: string;
}

