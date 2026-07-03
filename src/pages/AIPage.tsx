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
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-brown-900 flex items-center space-x-3">
            <Brain className="w-10 h-10 text-brown-700" />
            <span>{t('ai.title')}</span>
          </h1>
          <p className="text-gray-600 mt-1">AI-powered insights and optimization recommendations</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-purple-100 rounded-lg border border-purple-200">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-purple-800">AI Active</span>
        </div>
      </div>

      {/* Potential Savings */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('ai.savings')}</h2>
            <p className="text-purple-200">Based on current AI recommendations</p>
          </div>
          <TrendingUp className="w-12 h-12 text-purple-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-purple-200 text-sm mb-1">Monthly Potential</p>
            <p className="text-4xl font-bold">Rp 24.4M</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-purple-200 text-sm mb-1">Efficiency Gain</p>
            <p className="text-4xl font-bold">+6.2%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-purple-200 text-sm mb-1">CO₂ Reduction</p>
            <p className="text-4xl font-bold">+4.8 tons</p>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-brown-900 mb-6">{t('ai.recommendations')}</h2>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-6 rounded-xl border-2 transition-all ${
                rec.implemented
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200 hover:border-brown-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getPriorityIcon(rec.priority)}
                    <h3 className="text-lg font-bold text-brown-900">{rec.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    {rec.implemented && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Implemented</span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{rec.description}</p>
                  {rec.potentialSavings > 0 && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-semibold">
                        Potential Savings: Rp {(rec.potentialSavings / 1000000).toFixed(1)}M/month
                      </span>
                    </div>
                  )}
                </div>
                {!rec.implemented && (
                  <button
                    onClick={() => handleImplement(rec.id)}
                    className="ml-4 px-6 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all font-medium"
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
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-brown-900 mb-6">{t('ai.predictions')}</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={predictionData}>
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
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="AI Predicted (kWh)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#52b788"
              strokeWidth={3}
              name="Actual (kWh)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">
            <span className="font-bold">AI Accuracy:</span> 94.2% prediction accuracy over the last 30 days
          </p>
        </div>
      </div>

      {/* Optimal Charging Schedule */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-brown-900 mb-6 flex items-center space-x-2">
          <Clock className="w-6 h-6 text-brown-700" />
          <span>{t('ai.optimalCharging')}</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time Window</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Electricity Rate</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Est. Savings</th>
              </tr>
            </thead>
            <tbody>
              {chargingSchedule.map((schedule, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-brown-900">{schedule.time}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      schedule.priority === 'High' ? 'bg-green-100 text-green-800' :
                      schedule.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {schedule.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      schedule.rate === 'Low' ? 'bg-blue-100 text-blue-800' :
                      schedule.rate === 'Medium' ? 'bg-orange-100 text-orange-800' :
                      schedule.rate === 'Peak' ? 'bg-red-100 text-red-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {schedule.rate}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-green-600">
                    {schedule.savings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-blue-900 font-semibold mb-2">
                {t('ai.costOptimization')} Recommendation
              </p>
              <p className="text-sm text-blue-800">
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
