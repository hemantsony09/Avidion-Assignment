import { Campaign, CampaignFormData } from '../views/campaign';
import { storage } from './storage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  async getCampaigns(): Promise<Campaign[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching campaigns from API:', error);
      throw error;
    }
  },

  async getCampaign(id: string): Promise<Campaign> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Campaign not found');
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error;
    }
  },

  async createCampaign(formData: CampaignFormData): Promise<Campaign> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.details?.join(', ') || `Failed to create campaign: ${response.status}`);
      }
      
      const newCampaign = await response.json();
      console.log('Campaign created successfully via API:', newCampaign);
      return newCampaign;
    } catch (error) {
      console.error('Error creating campaign via API:', error);
      if (typeof window !== 'undefined') {
        console.log('Falling back to localStorage for campaign creation');
        return storage.saveCampaign(formData);
      }
      throw error;
    }
  },

  async updateCampaign(id: string, updates: Partial<CampaignFormData & { status?: Campaign['status'] }>): Promise<Campaign> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.details?.join(', ') || `Failed to update campaign: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  },

  async patchCampaign(id: string, updates: Partial<{ status: Campaign['status']; sent: number; replies: number }>): Promise<Campaign> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || errorData.details?.join(', ') || `Failed to update campaign: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error patching campaign:', error);
      throw error;
    }
  },

  async deleteCampaign(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Campaign not found');
        }
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Failed to delete campaign: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      throw error;
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        cache: 'no-store',
      });
      const data = await response.json();
      return response.ok && data.database === 'connected';
    } catch {
      return false;
    }
  },

  async getDashboardStats(): Promise<{
    activeCampaigns: number;
    totalSent: number;
    totalReplies: number;
    meetingsBooked: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        activeCampaigns: data.activeCampaigns || 0,
        totalSent: data.totalSent || 0,
        totalReplies: data.totalReplies || 0,
        meetingsBooked: data.meetingsBooked || 0,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
};
