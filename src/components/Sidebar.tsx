import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Leaf,
  CreditCard,
  Brain,
  Bell,
  Settings,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/monitoring', icon: Activity, label: t('nav.monitoring') },
    { path: '/analytics', icon: BarChart3, label: t('nav.analytics') },
    { path: '/esg', icon: Leaf, label: t('nav.esg') },
    { path: '/billing', icon: CreditCard, label: t('nav.billing') },
    { path: '/ai', icon: Brain, label: t('nav.ai') },
    { path: '/alerts', icon: Bell, label: t('nav.alerts') },
    { path: '/settings', icon: Settings, label: t('nav.profile') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-brown-900 text-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-brown-800 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3" onClick={onClose}>
            <img src="/logo.png" alt="BATERMAL Logo" className="h-8 sm:h-10" />
            <div className="hidden sm:block">
              <p className="text-xs text-brown-400">Smart Thermal Battery</p>
            </div>
          </Link>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-brown-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 ${
                      active
                        ? 'bg-brown-700 text-white shadow-lg'
                        : 'text-brown-300 hover:bg-brown-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 sm:p-4 border-t border-brown-800">
          <Link
            to="/login"
            onClick={onClose}
            className="flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-brown-300 hover:bg-brown-800 hover:text-white transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">{t('nav.logout')}</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
