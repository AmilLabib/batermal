import { useTranslation } from 'react-i18next';
import { Bell, Globe, User, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-14 sm:h-16 bg-white border-b border-stone-200 shadow-sm z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left Section - Hamburger + Title */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-brown-900" />
        </button>

        {/* Page Title */}
        <div>
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-brown-900">
            {t('dashboard.overview')}
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-brown-600" />
            <span className="text-xs sm:text-sm font-medium text-brown-900 uppercase hidden sm:inline">
              {i18n.language}
            </span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 sm:w-36 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50">
              <button
                onClick={() => toggleLanguage('id')}
                className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm hover:bg-stone-100 transition-colors"
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className="w-full px-3 sm:px-4 py-2 text-left text-xs sm:text-sm hover:bg-stone-100 transition-colors"
              >
                🇬🇧 English
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-brown-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-brown-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="text-left hidden md:block">
            <p className="text-xs sm:text-sm font-medium text-brown-900">PT Industri ABC</p>
            <p className="text-xs text-stone-500">Industry Client</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
