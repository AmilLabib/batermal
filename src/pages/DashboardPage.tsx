import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  Battery,
  Zap,
  TrendingDown,
  Leaf,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import {
  generateSystemStatus,
  generateAlerts,
  type SystemStatus,
  type Alert
} from '../utils/mockData';

const DashboardPage = () => {
  const { t } = useTranslation();
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Initial load
    setSystemStatus(generateSystemStatus());
    setAlerts(generateAlerts().slice(0, 3));

    // Update every 5 seconds
    const interval = setInterval(() => {
      setSystemStatus(generateSystemStatus());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!systemStatus) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'charging':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'discharging':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Activity className="w-5 h-5 text-blue-600" />;
    }
  };

  const energyPercentage = (systemStatus.energyStored / systemStatus.maxCapacity) * 100;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-brown-700 to-brown-900 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 text-white shadow-xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-2">
          {t('dashboard.welcome')}, PT Industri ABC
        </h1>
        <p className="text-sm sm:text-base text-brown-200">
          {new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <div className="mt-3 md:mt-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-brown-200">System Online - Last update: {systemStatus.lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Energy Stored */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Battery className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(systemStatus.status)}`}>
              {t(`dashboard.${systemStatus.status}`)}
            </span>
          </div>
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
            {t('dashboard.energyStored')}
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-brown-900 mb-2">
            {systemStatus.energyStored.toFixed(0)} <span className="text-base sm:text-lg text-gray-500">kWh</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${energyPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {energyPercentage.toFixed(1)}% of {systemStatus.maxCapacity} kWh capacity
          </p>
        </div>

        {/* Efficiency */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
            {t('dashboard.efficiency')}
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-brown-900">
            {systemStatus.efficiency.toFixed(1)}<span className="text-base sm:text-lg text-gray-500">%</span>
          </p>
          <p className="text-xs text-green-600 mt-2 font-medium">
            ↑ 2.3% from last month
          </p>
        </div>

        {/* Cost Savings */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <span className="text-xs text-orange-600 font-medium">This month</span>
          </div>
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
            {t('dashboard.costSavings')}
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-brown-900">
            Rp 12.4<span className="text-base sm:text-lg text-gray-500">M</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            vs traditional fuel costs
          </p>
        </div>

        {/* CO2 Reduced */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
            </div>
            <span className="text-xs text-teal-600 font-medium">Total</span>
          </div>
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
            {t('dashboard.co2Reduced')}
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-brown-900">
            145.8<span className="text-base sm:text-lg text-gray-500"> tons</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            ≈ 2,340 trees planted
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* System Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 md:mb-6">
            {t('dashboard.systemStatus')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="p-3 sm:p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Temperature</p>
              <p className="text-xl sm:text-2xl font-bold text-brown-900">
                {systemStatus.temperature.toFixed(0)}°C
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Activity className="w-3 h-3 mr-1" />
                Normal range
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Pressure</p>
              <p className="text-xl sm:text-2xl font-bold text-brown-900">
                {systemStatus.pressure.toFixed(1)} bar
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Activity className="w-3 h-3 mr-1" />
                Stable
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Flow Rate</p>
              <p className="text-xl sm:text-2xl font-bold text-brown-900">
                {systemStatus.flowRate.toFixed(0)} L/h
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Activity className="w-3 h-3 mr-1" />
                Optimal
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Power</p>
              <p className="text-xl sm:text-2xl font-bold text-brown-900">
                {Math.abs(systemStatus.power).toFixed(0)} kW
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                {systemStatus.power < 0 ? '⬇ Charging' : '⬆ Discharging'}
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Efficiency</p>
              <p className="text-xl sm:text-2xl font-bold text-brown-900">
                {systemStatus.efficiency.toFixed(1)}%
              </p>
              <div className="mt-2 flex items-center text-xs text-green-600 font-medium">
                ↑ Excellent
              </div>
            </div>

            <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Status</p>
              <p className={`text-base sm:text-lg font-bold capitalize ${
                systemStatus.status === 'operational' ? 'text-green-600' :
                systemStatus.status === 'charging' ? 'text-blue-600' :
                systemStatus.status === 'discharging' ? 'text-orange-600' :
                'text-yellow-600'
              }`}>
                {t(`dashboard.${systemStatus.status}`)}
              </p>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                Real-time
              </div>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-brown-900">
              {t('dashboard.recentAlerts')}
            </h2>
            <a href="/alerts" className="text-xs sm:text-sm text-brown-600 hover:text-brown-700 font-medium">
              {t('dashboard.viewAll')}
            </a>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${
                  alert.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brown-900 mb-1">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-400">
                      {alert.timestamp.toLocaleTimeString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
