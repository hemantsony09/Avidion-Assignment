'use client';

import { LayoutDashboard, Mail, Settings, Menu, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeView: 'dashboard' | 'campaigns' | 'settings' | 'landing';
  onViewChange: (view: 'dashboard' | 'campaigns' | 'settings' | 'landing') => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'campaigns' as const, label: 'Campaigns', icon: Mail },
    { id: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const handleViewChange = (view: 'dashboard' | 'campaigns' | 'settings' | 'landing') => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {!isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      )}

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:fixed inset-y-0 left-0 z-40
          w-64 bg-slate-900 text-white h-screen p-6 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="mb-8 relative">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute -top-2 -right-2 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
          <h1 className="text-2xl font-bold text-blue-400 pr-8 lg:pr-0">Avidion</h1>
          <p className="text-sm text-slate-400 mt-1">Campaign Manager</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => handleViewChange('landing')}
          className="mt-auto flex items-center gap-2 px-4 py-3 text-sm text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ExternalLink size={16} />
          <span>View Landing Page</span>
        </button>
      </aside>
    </>
  );
}
