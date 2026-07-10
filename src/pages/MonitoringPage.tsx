import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ThermometerSun, Gauge, Droplets, Zap } from 'lucide-react';
import { generateSystemStatus, generateHourlyData } from '../utils/mockData';

const MonitoringPage = () => {
  const { t } = useTranslation();
  const [systemStatus, setSystemStatus] = useState(generateSystemStatus());
  const historicalData = generateHourlyData();

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(generateSystemStatus());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const chartData = historicalData.map(d => ({
    time: d.timestamp.getHours() + ':00',
    temperature: 650 + Math.random() * 100,
    pressure: 8 + Math.random() * 2,
    flowRate: 1200 + Math.random() * 300,
    power: Math.abs(400 + Math.random() * 200)
  }));

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-brown-900">
            {t('monitoring.title')}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-1">Live data from Thermal Battery Unit 1</p>
        </div>
        <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-amber-100 rounded-lg border border-amber-200 self-start sm:self-auto">
          <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-amber-800">Live</span>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <ThermometerSun className="w-6 h-6 sm:w-8 sm:h-8" />
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">{t('monitoring.temperature')}</p>
          <p className="text-3xl sm:text-4xl font-bold">{systemStatus.temperature.toFixed(0)}°C</p>
          <p className="text-xs opacity-75 mt-2">Normal: 600-750°C</p>
        </div>

        <div className="bg-gradient-to-br from-brown-500 to-amber-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Gauge className="w-6 h-6 sm:w-8 sm:h-8" />
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">{t('monitoring.pressure')}</p>
          <p className="text-3xl sm:text-4xl font-bold">{systemStatus.pressure.toFixed(1)} bar</p>
          <p className="text-xs opacity-75 mt-2">Normal: 7-10 bar</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Droplets className="w-6 h-6 sm:w-8 sm:h-8" />
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">{t('monitoring.flowRate')}</p>
          <p className="text-3xl sm:text-4xl font-bold">{systemStatus.flowRate.toFixed(0)}</p>
          <p className="text-xs opacity-75 mt-2">L/h</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">{t('monitoring.power')}</p>
          <p className="text-3xl sm:text-4xl font-bold">{Math.abs(systemStatus.power).toFixed(0)}</p>
          <p className="text-xs opacity-75 mt-2">kW {systemStatus.power < 0 ? '(Charging)' : '(Discharging)'}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-emerald-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Activity className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-xs font-medium px-2 py-1 bg-white/20 rounded">LIVE</span>
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">{t('monitoring.status')}</p>
          <p className="text-xl sm:text-2xl font-bold capitalize">{systemStatus.status}</p>
          <p className="text-xs opacity-75 mt-2">{t('monitoring.lastUpdate')}: {systemStatus.lastUpdate.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Temperature Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
          <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">Temperature Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                strokeWidth={2}
                dot={false}
                name="Temperature (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pressure Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
          <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">Pressure Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                name="Pressure (bar)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Flow Rate Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
          <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">Flow Rate Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="flowRate"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                name="Flow Rate (L/h)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Power Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
          <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">Power Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="power"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
                name="Power (kW)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
        <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">System Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <p className="text-xs sm:text-sm text-stone-600 mb-1">System ID</p>
            <p className="text-base md:text-lg font-semibold text-brown-900 break-all">{systemStatus.id}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-stone-600 mb-1">System Name</p>
            <p className="text-base md:text-lg font-semibold text-brown-900">{systemStatus.name}</p>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <p className="text-xs sm:text-sm text-stone-600 mb-1">Capacity</p>
            <p className="text-base md:text-lg font-semibold text-brown-900">
              {systemStatus.energyStored.toFixed(0)} / {systemStatus.maxCapacity} kWh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;
