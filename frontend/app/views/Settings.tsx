import { Bell, User, Lock, Database } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-slate-600">Manage your account and preferences</p>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-blue-600" size={24} />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="john@avidion.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-blue-600" size={24} />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Notifications</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-700">Email notifications for new replies</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-700">Campaign completion alerts</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-slate-700">Weekly performance reports</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-blue-600" size={24} />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="text-blue-600" size={24} />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">Data Management</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Export Campaign Data
            </button>
            <button className="w-full text-left px-4 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              Delete All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
