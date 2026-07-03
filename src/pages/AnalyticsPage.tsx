import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingDown, DollarSign, Zap, Clock } from 'lucide-react';
import { generateEnergyHistory, getCostComparison } from '../utils/mockData';

const AnalyticsPage = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  
  const energyData = generateEnergyHistory(30);
  const costComparison = getCostComparison();

  const consumptionData = energyData.map(d => ({
    date: d.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    consumption: d.consumption,
    stored: d.stored
  }));

  const efficiencyData = energyData.map(d => ({
    date: d.timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    efficiency: d.efficiency
  }));

  const costData = [
    { name: 'Energy Cost', traditional: costComparison.traditional.energyCost / 1000000, batermal: costComparison.batermal.energyCost / 1000000 },
    { name: 'Maintenance', traditional: costComparison.traditional.maintenanceCost / 1000000, batermal: costComparison.batermal.maintenanceCost / 1000000 },
    { name: 'Emissions Penalty', traditional: costComparison.traditional.emissionPenalty / 1000000, batermal: costComparison.batermal.emissionPenalty / 1000000 },
  ];

  const peakHoursData = [
    { hour: '00-06', usage: 450, cost: 'Low' },
    { hour: '06-12', usage: 950, cost: 'Medium' },
    { hour: '12-18', usage: 1350, cost: 'High' },
    { hour: '18-24', usage: 720, cost: 'Medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-brown-900">
            {t('analytics.title')}
          </h1>
          <p className="text-gray-600 mt-1">Comprehensive energy consumption and cost analysis</p>
        </div>
        <div className="flex space-x-2">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                period === p
                  ? 'bg-brown-700 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {t(`analytics.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Cost Savings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingDown className="w-8 h-8" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              Monthly
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">Total Savings</p>
          <p className="text-4xl font-bold">Rp {(costComparison.savings / 1000000).toFixed(1)}M</p>
          <p className="text-sm opacity-90 mt-2">
            {costComparison.savingsPercentage.toFixed(1)}% cost reduction
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Zap className="w-8 h-8" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              This Month
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">Energy Consumption</p>
          <p className="text-4xl font-bold">18,450 kWh</p>
          <p className="text-sm opacity-90 mt-2">↓ 12% vs traditional</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              Average
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">Cost per kWh</p>
          <p className="text-4xl font-bold">Rp 850</p>
          <p className="text-sm opacity-90 mt-2">vs Rp 1,650 traditional</p>
        </div>
      </div>

      {/* Energy Consumption Chart */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-brown-900 mb-4">
          {t('analytics.consumption')} - Last 30 Days
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={consumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#8a6538"
              strokeWidth={3}
              name="Consumption (kWh)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="stored"
              stroke="#52b788"
              strokeWidth={3}
              name="Stored (kWh)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Comparison & Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-brown-900 mb-4">
            {t('analytics.comparison')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} label={{ value: 'Million Rp', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="traditional" fill="#e63946" name="Traditional Fuel" radius={[8, 8, 0, 0]} />
              <Bar dataKey="batermal" fill="#52b788" name="BATERMAL" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">
              <span className="font-bold">Total Monthly Savings:</span> Rp {(costComparison.savings / 1000000).toFixed(1)}M ({costComparison.savingsPercentage.toFixed(1)}% reduction)
            </p>
          </div>
        </div>

        {/* Efficiency Trends */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-brown-900 mb-4">
            {t('analytics.efficiency')}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} domain={[80, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="efficiency"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Efficiency (%)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <span className="font-bold">Average Efficiency:</span> 91.2% (↑ 2.3% from last period)
            </p>
          </div>
        </div>
      </div>

      {/* Peak Usage Hours */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-brown-700" />
          <h3 className="text-lg font-bold text-brown-900">
            {t('analytics.peak')}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="usage" fill="#b8904f" radius={[8, 8, 0, 0]} name="Usage (kWh)" />
            </BarChart>
          </ResponsiveContainer>

          <div className="space-y-4">
            {peakHoursData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-brown-900">{item.hour}</p>
                  <p className="text-sm text-gray-600">{item.usage} kWh average</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.cost === 'High' ? 'bg-red-100 text-red-800' :
                  item.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.cost} Tariff
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-orange-800">
            <span className="font-bold">Recommendation:</span> Schedule charging during low-tariff hours (00:00-06:00) to maximize cost savings by up to 30%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
