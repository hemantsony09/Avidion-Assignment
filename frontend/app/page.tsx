'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';
import { Toast } from './components/Toast';
import { CampaignForm } from './components/CampaignForm';
import { Dashboard } from './views/Dashboard';
import { CampaignList } from './views/CampaignList';
import { Settings } from './views/Settings';
import { Campaign, CampaignFormData } from './views/campaign';
import { storage } from './lib/storage';
import { api } from './lib/api';

type View = 'dashboard' | 'campaigns' | 'settings' | 'landing';

export default function Home() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const isApiAvailable = await api.healthCheck();
        
        if (isApiAvailable) {
          console.log('Backend API is connected');
          const apiCampaigns = await api.getCampaigns();
          setCampaigns(apiCampaigns || []);
          return;
        }
        
        console.log('API unavailable, using localStorage fallback');
        if (typeof window !== 'undefined') {
          storage.initializeDemoData();
          setCampaigns(storage.getCampaigns());
        }
      } catch (error) {
        console.error('Error loading campaigns:', error);
        if (typeof window !== 'undefined') {
          storage.initializeDemoData();
          setCampaigns(storage.getCampaigns());
        }
      }
    };
    loadCampaigns();
  }, []);

  const handleCreateCampaign = async (formData: CampaignFormData) => {
    try {
      const newCampaign = await api.createCampaign(formData);
      console.log('Campaign created:', newCampaign);
      
      const isApiAvailable = await api.healthCheck();
      if (isApiAvailable) {
        const updatedCampaigns = await api.getCampaigns();
        setCampaigns(updatedCampaigns);
      } else {
        setCampaigns(storage.getCampaigns());
      }
      
      setIsModalOpen(false);
      setToastMessage('Campaign created successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error creating campaign:', error);
      storage.saveCampaign(formData);
      setCampaigns(storage.getCampaigns());
      setIsModalOpen(false);
      setToastMessage('Campaign created successfully! (saved locally)');
      setShowToast(true);
    }
  };

  const handleViewChange = (view: View) => {
    if (view === 'landing') {
      router.push('/landing');
      return;
    }
    setActiveView(view);
  };

  return (
    
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />

      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0 lg:ml-64 h-full">
        {activeView === 'dashboard' && <Dashboard campaigns={campaigns} />}
        {activeView === 'campaigns' && (
          <CampaignList
            campaigns={campaigns}
            onCreateClick={() => setIsModalOpen(true)}
          />
        )}
        {activeView === 'settings' && <Settings />}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Campaign"
      >
        <CampaignForm
          onSubmit={handleCreateCampaign}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

