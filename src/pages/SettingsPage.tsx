import { useTranslation } from 'react-i18next';
import { User, Building, Bell, Shield, Globe, Save } from 'lucide-react';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-brown-900">
          {t('nav.profile')} & Settings
        </h1>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      {/* Company Profile */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Building className="w-6 h-6 text-brown-700" />
          <h2 className="text-xl font-bold text-brown-900">Company Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="PT Industri ABC"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent">
              <option>Food & Beverage</option>
              <option>Textile</option>
              <option>Pulp & Paper</option>
              <option>Palm Oil</option>
              <option>Cement</option>
              <option>Steel</option>
              <option>Chemical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              defaultValue="contact@industri-abc.co.id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+62 21 1234 5678"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              rows={3}
              defaultValue="Jl. Industri Raya No. 123, Kawasan Industri, Jakarta 14350"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* User Account */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-6 h-6 text-brown-700" />
          <h2 className="text-xl font-bold text-brown-900">User Account</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Budi Santoso"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>
            <input
              type="text"
              defaultValue="Energy Manager"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="budi.santoso@industri-abc.co.id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue="+62 812 3456 7890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <button className="px-4 py-2 text-brown-700 border border-brown-700 rounded-lg hover:bg-brown-50 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="w-6 h-6 text-brown-700" />
          <h2 className="text-xl font-bold text-brown-900">System Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Language</p>
              <p className="text-sm text-gray-600">Choose your preferred language</p>
            </div>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent"
            >
              <option value="id">🇮🇩 Indonesia</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Time Zone</p>
              <p className="text-sm text-gray-600">Set your local time zone</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent">
              <option>WIB (GMT+7)</option>
              <option>WITA (GMT+8)</option>
              <option>WIT (GMT+9)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Date Format</p>
              <p className="text-sm text-gray-600">Choose date display format</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent">
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Currency</p>
              <p className="text-sm text-gray-600">Default currency display</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent">
              <option>IDR (Rp)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-brown-700" />
          <h2 className="text-xl font-bold text-brown-900">Notification Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">SMS Notifications</p>
              <p className="text-sm text-gray-600">Critical alerts via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Weekly Reports</p>
              <p className="text-sm text-gray-600">Automated weekly summary</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Monthly ESG Reports</p>
              <p className="text-sm text-gray-600">Automated ESG report generation</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-brown-700" />
          <h2 className="text-xl font-bold text-brown-900">Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Extra security for your account</p>
            </div>
            <button className="px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Session Timeout</p>
              <p className="text-sm text-gray-600">Auto logout after inactivity</p>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>Never</option>
            </select>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold text-brown-900 mb-2">Active Sessions</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🖥️ Windows Desktop - Jakarta</span>
                <span className="text-green-600 font-medium">Current</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">📱 Mobile App - Jakarta</span>
                <button className="text-red-600 hover:text-red-700 font-medium">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-8 py-3 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all shadow-lg font-medium"
        >
          <Save className="w-5 h-5" />
          <span>{t('common.save')} Changes</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
