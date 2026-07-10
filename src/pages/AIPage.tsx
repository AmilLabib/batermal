import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Clock, DollarSign, Zap, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { generateAIRecommendations, generateHourlyData } from '../utils/mockData';

const AIPage = () => {
  const { t } = useTranslation();
  const [recommendations] = useState(generateAIRecommendations());
  
  const predictionData = generateHourlyData().map(d => ({
    hour: d.timestamp.getHours() + ':00',
    predicted: d.consumption * (0.9 + Math.random() * 0.2),
    actual: d.consumption
  }));

  const chargingSchedule = [
    { time: '22:00-02:00', priority: 'High', rate: 'Low', savings: 'Rp 4.5M' },
    { time: '02:00-06:00', priority: 'High', rate: 'Low', savings: 'Rp 3.8M' },
    { time: '06:00-10:00', priority: 'Medium', rate: 'Medium', savings: 'Rp 1.2M' },
    { time: '10:00-14:00', priority: 'Low', rate: 'High', savings: '-' },
    { time: '14:00-18:00', priority: 'Low', rate: 'Peak', savings: '-' },
    { time: '18:00-22:00', priority: 'Medium', rate: 'Medium', savings: 'Rp 0.9M' },
  ];

  const handleImplement = (id: string) => {
    alert(`Implementing recommendation ${id}...`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-amber-600" />;
      default:
        return <XCircle className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-brown-900 flex items-center space-x-2 sm:space-x-3">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-brown-700" />
            <span>{t('ai.title')}</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-1">AI-powered insights and optimization recommendations</p>
        </div>
        <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-orange-100 rounded-lg border border-orange-200">
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-orange-800">AI Active</span>
        </div>
      </div>

      {/* Potential Savings */}
      <div className="bg-gradient-to-br from-orange-700 to-brown-900 rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{t('ai.savings')}</h2>
            <p className="text-sm sm:text-base text-orange-200">Based on current AI recommendations</p>
          </div>
          <TrendingUp className="w-10 h-10 sm:w-12 sm:h-12 text-orange-300" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
            <p className="text-xs sm:text-sm text-orange-200 mb-1">Monthly Potential</p>
            <p className="text-3xl sm:text-4xl font-bold">Rp 24.4M</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
            <p className="text-xs sm:text-sm text-orange-200 mb-1">Efficiency Gain</p>
            <p className="text-3xl sm:text-4xl font-bold">+6.2%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
            <p className="text-xs sm:text-sm text-orange-200 mb-1">CO₂ Reduction</p>
            <p className="text-3xl sm:text-4xl font-bold">+4.8 tons</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-stone-100">
        <h2 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 md:mb-6">{t('ai.recommendations')}</h2>
        <div className="space-y-3 md:space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 sm:p-6 rounded-xl border-2 transition-all ${
                rec.implemented
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-white border-stone-200 hover:border-brown-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {getPriorityIcon(rec.priority)}
                    <h3 className="text-base sm:text-lg font-bold text-brown-900">{rec.title}</h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    {rec.implemented && (
                      <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Implemented</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-stone-700 mb-4">{rec.description}</p>
                  {rec.potentialSavings > 0 && (
                    <div className="flex items-center space-x-2 text-amber-600">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-semibold">
                        Potential Savings: Rp {(rec.potentialSavings / 1000000).toFixed(1)}M/month
                      </span>
                    </div>
                  )}
                </div>
                {!rec.implemented && (
                  <button
                    onClick={() => handleImplement(rec.id)}
                    className="px-4 sm:px-6 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all font-medium text-sm sm:text-base whitespace-nowrap"
                  >
                    {t('ai.implement')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Predictions */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-stone-100">
        <h2 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 md:mb-6">{t('ai.predictions')}</h2>
        <ResponsiveContainer width="100%" height={300} className="md:h-[350px]">
          <LineChart data={predictionData}>
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
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="AI Predicted (kWh)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#52b788"
              strokeWidth={2}
              name="Actual (kWh)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 md:p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-xs sm:text-sm text-orange-800">
            <span className="font-bold">AI Accuracy:</span> 94.2% prediction accuracy over the last 30 days
          </p>
        </div>
      </div>

      {/* Optimal Charging Schedule */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-stone-100">
        <h2 className="text-lg sm:text-xl font-bold text-brown-900 mb-4 md:mb-6 flex items-center space-x-2">
          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-brown-700" />
          <span>{t('ai.optimalCharging')}</span>
        </h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-stone-700">Time Window</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-stone-700">Priority</th>
                  <th className="text-center py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-stone-700">Rate</th>
                  <th className="text-right py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-stone-700">Savings</th>
                </tr>
              </thead>
              <tbody>
                {chargingSchedule.map((schedule, index) => (
                  <tr key={index} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-brown-900">{schedule.time}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        schedule.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                        schedule.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-stone-100 text-stone-800'
                      }`}>
                        {schedule.priority}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                        schedule.rate === 'Low' ? 'bg-brown-100 text-brown-800' :
                        schedule.rate === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        schedule.rate === 'Peak' ? 'bg-red-100 text-red-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {schedule.rate}
                      </span>
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-xs sm:text-sm font-semibold text-amber-600">
                      {schedule.savings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gradient-to-r from-brown-50 to-amber-50 rounded-lg border border-brown-200">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-brown-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs sm:text-sm text-brown-900 font-semibold mb-2">
                {t('ai.costOptimization')} Recommendation
              </p>
              <p className="text-xs sm:text-sm text-brown-800">
                By following this AI-optimized charging schedule, you can save an estimated <span className="font-bold">Rp 12.4M per month</span> by leveraging off-peak electricity rates and reducing peak demand charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPage;
