import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Leaf, Droplets, Flame, Trees, Download, FileText } from 'lucide-react';
import { generateESGMetrics } from '../utils/mockData';

const ESGPage = () => {
  const { t } = useTranslation();
  const esgMetrics = generateESGMetrics();

  const handleExport = (format: 'pdf' | 'excel') => {
    alert(`Exporting ESG report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-brown-900">
            {t('esg.title')}
          </h1>
          <p className="text-gray-600 mt-1">Environmental impact and sustainability metrics</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Export PDF</span>
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-brown-700 border-2 border-brown-700 rounded-lg hover:bg-brown-50 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span className="font-medium">Export Excel</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Leaf className="w-10 h-10" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              Total
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">{t('esg.totalReduction')}</p>
          <p className="text-4xl font-bold">{esgMetrics.co2Reduced}</p>
          <p className="text-sm opacity-90">tons CO₂</p>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Trees className="w-10 h-10" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              Equivalent
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">{t('esg.equivalent')}</p>
          <p className="text-4xl font-bold">{esgMetrics.treesEquivalent.toLocaleString()}</p>
          <p className="text-sm opacity-90">{t('esg.trees')}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Flame className="w-10 h-10" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              Saved
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">{t('esg.fossilSaved')}</p>
          <p className="text-4xl font-bold">{esgMetrics.fossilFuelSaved}</p>
          <p className="text-sm opacity-90">tons</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Droplets className="w-10 h-10" />
            <span className="text-xs font-medium px-3 py-1 bg-white/20 rounded-full">
              Conserved
            </span>
          </div>
          <p className="text-sm opacity-90 mb-1">{t('esg.waterSaved')}</p>
          <p className="text-4xl font-bold">{esgMetrics.waterSaved.toLocaleString()}</p>
          <p className="text-sm opacity-90">m³</p>
        </div>
      </div>

      {/* CO2 Reduction Trend */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-brown-900 mb-6">
          {t('esg.trends')} (2026)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={esgMetrics.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#888" fontSize={12} />
            <YAxis stroke="#888" fontSize={12} label={{ value: 'Tons CO₂', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Line
              type="monotone"
              dataKey="reduction"
              stroke="#52b788"
              strokeWidth={4}
              name="CO₂ Reduction (tons)"
              dot={{ fill: '#52b788', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium mb-1">Monthly Average</p>
            <p className="text-2xl font-bold text-green-900">24.3 tons</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-1">YTD Total</p>
            <p className="text-2xl font-bold text-blue-900">145.8 tons</p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
            <p className="text-sm text-teal-800 font-medium mb-1">Growth Rate</p>
            <p className="text-2xl font-bold text-teal-900">↑ 18.5%</p>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environmental Impact */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-brown-900 mb-6">Environmental Impact Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { category: 'Direct Emissions', reduction: 82.4 },
                { category: 'Indirect Emissions', reduction: 35.2 },
                { category: 'Process Optimization', reduction: 28.2 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="category" stroke="#888" fontSize={11} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="reduction" fill="#52b788" radius={[8, 8, 0, 0]} name="CO₂ Reduction (tons)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Comparison with Traditional */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-brown-900 mb-6">vs Traditional Fuel System</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">CO₂ Emissions</span>
                <span className="text-sm font-bold text-green-600">↓ 85.2%</span>
              </div>
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="bg-red-500 h-full" style={{ width: '85.2%' }}></div>
                  <div className="bg-green-500 h-full" style={{ width: '14.8%' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-xs font-bold text-white">Traditional: 985 tons</span>
                  <span className="text-xs font-bold text-white">BATERMAL: 145.8 tons</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Fossil Fuel Consumption</span>
                <span className="text-sm font-bold text-green-600">↓ 76.4%</span>
              </div>
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="bg-orange-500 h-full" style={{ width: '76.4%' }}></div>
                  <div className="bg-green-500 h-full" style={{ width: '23.6%' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-xs font-bold text-white">Traditional: 289 tons</span>
                  <span className="text-xs font-bold text-white">BATERMAL: 68.2 tons</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Water Usage</span>
                <span className="text-sm font-bold text-green-600">↓ 52.8%</span>
              </div>
              <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="bg-blue-500 h-full" style={{ width: '52.8%' }}></div>
                  <div className="bg-green-500 h-full" style={{ width: '47.2%' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-xs font-bold text-white">Traditional: 1,890 m³</span>
                  <span className="text-xs font-bold text-white">BATERMAL: 892 m³</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-medium mb-2">
                🎯 Net Zero Progress
              </p>
              <div className="w-full bg-green-200 rounded-full h-4 mb-2">
                <div className="bg-green-600 h-4 rounded-full" style={{ width: '73%' }}></div>
              </div>
              <p className="text-xs text-green-700">
                73% towards Net Zero target by 2060
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SDG Alignment */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-brown-900 mb-6">UN Sustainable Development Goals Alignment</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm font-semibold text-brown-900">SDG 7</p>
            <p className="text-xs text-gray-600">Affordable & Clean Energy</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 text-center">
            <div className="text-3xl mb-2">🏭</div>
            <p className="text-sm font-semibold text-brown-900">SDG 9</p>
            <p className="text-xs text-gray-600">Industry Innovation</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200 text-center">
            <div className="text-3xl mb-2">♻️</div>
            <p className="text-sm font-semibold text-brown-900">SDG 12</p>
            <p className="text-xs text-gray-600">Responsible Consumption</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 text-center">
            <div className="text-3xl mb-2">🌍</div>
            <p className="text-sm font-semibold text-brown-900">SDG 13</p>
            <p className="text-xs text-gray-600">Climate Action</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGPage;
