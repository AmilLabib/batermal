import { useTranslation } from 'react-i18next';
import { Bell, Globe, User } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-30 flex items-center justify-between px-8">
      {/* Page Title - will be dynamic based on route */}
      <div>
        <h2 className="text-xl font-semibold text-brown-900">
          {t('dashboard.overview')}
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-5 h-5 text-brown-600" />
            <span className="text-sm font-medium text-brown-900 uppercase">
              {i18n.language}
            </span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={() => toggleLanguage('id')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
              >
                🇬🇧 English
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-brown-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 bg-brown-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium text-brown-900">PT Industri ABC</p>
            <p className="text-xs text-gray-500">Industry Client</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
