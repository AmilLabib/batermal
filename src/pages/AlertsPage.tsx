import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Filter, Trash2, Check } from 'lucide-react';
import { generateAlerts, type Alert } from '../utils/mockData';

const AlertsPage = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts());
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'success'>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <Info className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-brown-900">
            {t('nav.alerts')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            System notifications and alerts ({unreadCount} unread)
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all text-sm sm:text-base self-start sm:self-auto"
          >
            <Check className="w-4 h-4" />
            <span className="font-medium">Mark all as read</span>
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
            filter === 'all'
              ? 'bg-brown-700 text-white border-brown-700'
              : 'bg-white text-gray-700 border-gray-200 hover:border-brown-300'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold">{alerts.length}</p>
          <p className="text-xs sm:text-sm">All Alerts</p>
        </button>

        <button
          onClick={() => setFilter('critical')}
          className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
            filter === 'critical'
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-white text-gray-700 border-gray-200 hover:border-red-300'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold">{alerts.filter(a => a.type === 'critical').length}</p>
          <p className="text-xs sm:text-sm">Critical</p>
        </button>

        <button
          onClick={() => setFilter('warning')}
          className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
            filter === 'warning'
              ? 'bg-yellow-600 text-white border-yellow-600'
              : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-300'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold">{alerts.filter(a => a.type === 'warning').length}</p>
          <p className="text-xs sm:text-sm">Warnings</p>
        </button>

        <button
          onClick={() => setFilter('success')}
          className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
            filter === 'success'
              ? 'bg-green-600 text-white border-green-600'
              : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold">{alerts.filter(a => a.type === 'success').length}</p>
          <p className="text-xs sm:text-sm">Success</p>
        </button>

        <button
          onClick={() => setFilter('info')}
          className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
            filter === 'info'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
          }`}
        >
          <p className="text-xl sm:text-2xl font-bold">{alerts.filter(a => a.type === 'info').length}</p>
          <p className="text-xs sm:text-sm">Info</p>
        </button>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-brown-900">
            {filter === 'all' ? 'All Alerts' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Alerts`}
          </h2>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Showing {filteredAlerts.length} of {alerts.length}</span>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No alerts to display</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 sm:p-6 transition-all ${
                  alert.read ? 'bg-white' : 'bg-blue-50/50'
                } hover:bg-gray-50`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-brown-900 mb-1">
                          {alert.title}
                        </h3>
                        {!alert.read && (
                          <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                            New
                          </span>
                        )}
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap self-start ${
                        alert.type === 'critical' ? 'bg-red-100 text-red-800 border-red-200' :
                        alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        alert.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-blue-100 text-blue-800 border-blue-200'
                      }`}>
                        {alert.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-700 mb-3">
                      {alert.message}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <p className="text-xs sm:text-sm text-gray-500">
                        {alert.timestamp.toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        {!alert.read && (
                          <button
                            onClick={() => handleMarkAsRead(alert.id)}
                            className="flex items-center space-x-1 px-2 sm:px-3 py-1 text-brown-700 hover:bg-brown-100 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                          >
                            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Mark as read</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="flex items-center space-x-1 px-2 sm:px-3 py-1 text-red-700 hover:bg-red-100 rounded-lg transition-colors text-xs sm:text-sm font-medium"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Alert Settings */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 md:mb-6">Alert Preferences</h2>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Critical Alerts</p>
              <p className="text-sm text-gray-600">System failures, safety issues</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Performance Alerts</p>
              <p className="text-sm text-gray-600">Efficiency drops, optimization opportunities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">Billing Alerts</p>
              <p className="text-sm text-gray-600">Payment reminders, invoice notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-brown-900">AI Recommendations</p>
              <p className="text-sm text-gray-600">New optimization suggestions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brown-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
