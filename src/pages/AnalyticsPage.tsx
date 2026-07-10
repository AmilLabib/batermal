import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingDown, DollarSign, Zap, Clock, Calculator, Percent } from 'lucide-react';
import { generateEnergyHistory, getCostComparison } from '../utils/mockData';

const AnalyticsPage = () => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  
  // ROI Calculator States
  const [roiCapacity, setRoiCapacity] = useState(10); // MWh
  const [roiDailySavings, setRoiDailySavings] = useState(5000); // kWh
  const [roiRate, setRoiRate] = useState(1500); // Rp/kWh

  const COST_PER_MWH = 2500000000; // 2.5 Billion Rp
  const totalInvestment = roiCapacity * COST_PER_MWH;
  const monthlySavings = roiDailySavings * 30 * roiRate;
  const paybackMonths = totalInvestment / (monthlySavings || 1);
  const paybackYears = Math.floor(paybackMonths / 12);
  const paybackRemainingMonths = Math.ceil(paybackMonths % 12);
  
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
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-brown-900">
            {t('analytics.title')}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-1">Comprehensive energy consumption and cost analysis</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                period === p
                  ? 'bg-brown-700 text-white shadow-lg'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {t(`analytics.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Cost Savings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-emerald-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-xs font-medium px-2 sm:px-3 py-1 bg-white/20 rounded-full">
              Monthly
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">Total Savings</p>
          <p className="text-3xl sm:text-4xl font-bold">Rp {(costComparison.savings / 1000000).toFixed(1)}M</p>
          <p className="text-xs sm:text-sm opacity-90 mt-2">
            {costComparison.savingsPercentage.toFixed(1)}% cost reduction
          </p>
        </div>

        <div className="bg-gradient-to-br from-brown-500 to-amber-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-xs font-medium px-2 sm:px-3 py-1 bg-white/20 rounded-full">
              This Month
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">Energy Consumption</p>
          <p className="text-3xl sm:text-4xl font-bold">18,450 kWh</p>
          <p className="text-xs sm:text-sm opacity-90 mt-2">↓ 12% vs traditional</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="text-xs font-medium px-2 sm:px-3 py-1 bg-white/20 rounded-full">
              Average
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-90 mb-1">Cost per kWh</p>
          <p className="text-3xl sm:text-4xl font-bold">Rp 850</p>
          <p className="text-xs sm:text-sm opacity-90 mt-2">vs Rp 1,650 traditional</p>
        </div>
      </div>

      {/* Energy Consumption Chart */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
        <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">
          {t('analytics.consumption')} - Last 30 Days
        </h3>
        <ResponsiveContainer width="100%" height={300} className="md:h-[350px]">
          <LineChart data={consumptionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#888" fontSize={10} className="sm:text-xs" />
            <YAxis stroke="#888" fontSize={10} className="sm:text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Line
              type="monotone"
              dataKey="consumption"
              stroke="#8a6538"
              strokeWidth={2}
              name="Consumption (kWh)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="stored"
              stroke="#52b788"
              strokeWidth={2}
              name="Stored (kWh)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Cost Comparison & Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Cost Comparison */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
          <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">
            {t('analytics.comparison')}
          </h3>
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <BarChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" label={{ value: 'Million Rp', angle: -90, position: 'insideLeft', style: { fontSize: '10px' } }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="traditional" fill="#e63946" name="Traditional Fuel" radius={[8, 8, 0, 0]} />
              <Bar dataKey="batermal" fill="#52b788" name="BATERMAL" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-xs sm:text-sm text-amber-800">
              <span className="font-bold">Total Monthly Savings:</span> Rp {(costComparison.savings / 1000000).toFixed(1)}M ({costComparison.savingsPercentage.toFixed(1)}% reduction)
            </p>
          </div>
        </div>

        {/* Efficiency Trends */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
          <h3 className="text-base md:text-lg font-bold text-brown-900 mb-3 md:mb-4">
            {t('analytics.efficiency')}
          </h3>
          <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" domain={[80, 100]} />
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
                dataKey="efficiency"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Efficiency (%)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 md:p-4 bg-brown-50 rounded-lg border border-brown-200">
            <p className="text-xs sm:text-sm text-brown-800">
              <span className="font-bold">Average Efficiency:</span> 91.2% (↑ 2.3% from last period)
            </p>
          </div>
        </div>
      </div>

      {/* Peak Usage Hours */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
        <div className="flex items-center space-x-3 mb-3 md:mb-4">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-brown-700" />
          <h3 className="text-base md:text-lg font-bold text-brown-900">
            {t('analytics.peak')}
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <ResponsiveContainer width="100%" height={200} className="md:h-[250px]">
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#888" fontSize={10} className="sm:text-xs" />
              <YAxis stroke="#888" fontSize={10} className="sm:text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="usage" fill="#b8904f" radius={[8, 8, 0, 0]} name="Usage (kWh)" />
            </BarChart>
          </ResponsiveContainer>

          <div className="space-y-3 md:space-y-4">
            {peakHoursData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-stone-50 rounded-lg">
                <div>
                  <p className="text-sm sm:text-base font-semibold text-brown-900">{item.hour}</p>
                  <p className="text-xs sm:text-sm text-stone-600">{item.usage} kWh average</p>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  item.cost === 'High' ? 'bg-red-100 text-red-800' :
                  item.cost === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {item.cost} Tariff
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 md:p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-xs sm:text-sm text-orange-800">
            <span className="font-bold">Recommendation:</span> Schedule charging during low-tariff hours (00:00-06:00) to maximize cost savings by up to 30%
          </p>
        </div>
      </div>

      {/* ROI Predictive Calculator */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-stone-100">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-brown-700" />
          <div>
            <h3 className="text-base md:text-lg font-bold text-brown-900">Predictive ROI Calculator</h3>
            <p className="text-xs sm:text-sm text-stone-500">Estimate your investment return based on energy savings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">Installation Capacity</label>
                <span className="text-sm font-bold text-brown-700">{roiCapacity} MWh</span>
              </div>
              <input 
                type="range" 
                min="1" max="100" 
                value={roiCapacity} 
                onChange={(e) => setRoiCapacity(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-brown-600"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">Expected Daily Savings</label>
                <span className="text-sm font-bold text-brown-700">{roiDailySavings.toLocaleString('id-ID')} kWh</span>
              </div>
              <input 
                type="range" 
                min="1000" max="50000" step="500"
                value={roiDailySavings} 
                onChange={(e) => setRoiDailySavings(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-stone-700">Electricity Rate</label>
                <span className="text-sm font-bold text-brown-700">Rp {roiRate.toLocaleString('id-ID')} / kWh</span>
              </div>
              <input 
                type="range" 
                min="500" max="3000" step="100"
                value={roiRate} 
                onChange={(e) => setRoiRate(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-center space-x-2 mb-2 text-stone-500">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Estimated Investment</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-brown-900">
                Rp {(totalInvestment / 1000000000).toFixed(1)}B
              </p>
            </div>
            
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex items-center space-x-2 mb-2 text-stone-500">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Monthly Savings</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-amber-600">
                Rp {(monthlySavings / 1000000).toFixed(1)}M
              </p>
            </div>

            <div className="sm:col-span-2 bg-gradient-to-br from-brown-800 to-brown-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center space-x-2 mb-2 opacity-90">
                <Percent className="w-5 h-5" />
                <span className="text-sm font-medium">Estimated Payback Period</span>
              </div>
              <div className="flex items-end space-x-2">
                <p className="text-3xl sm:text-5xl font-bold">
                  {paybackYears} <span className="text-xl sm:text-2xl font-normal opacity-80">yrs</span> {paybackRemainingMonths} <span className="text-xl sm:text-2xl font-normal opacity-80">mos</span>
                </p>
              </div>
              <p className="text-xs sm:text-sm mt-3 opacity-80">
                Based on continuous operation and current tariff assumptions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
