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
} from 'lucide-react';

const Sidebar = () => {
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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-brown-900 text-white shadow-xl z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-brown-800">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brown-600 to-brown-800 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold">B</span>
          </div>
          <div>
            <h1 className="text-xl font-display font-bold">BATERMAL</h1>
            <p className="text-xs text-brown-400">Smart Thermal Battery</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-brown-700 text-white shadow-lg'
                      : 'text-brown-300 hover:bg-brown-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-brown-800">
        <Link
          to="/login"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-brown-300 hover:bg-brown-800 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">{t('nav.logout')}</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
