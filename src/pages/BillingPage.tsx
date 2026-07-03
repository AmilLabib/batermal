import { useTranslation } from 'react-i18next';
import { CreditCard, Download, CheckCircle, Clock, TrendingDown } from 'lucide-react';
import { generateBillingHistory } from '../utils/mockData';

const BillingPage = () => {
  const { t } = useTranslation();
  const billingHistory = generateBillingHistory();
  const currentBill = billingHistory[billingHistory.length - 1];

  const handlePayment = () => {
    alert('Payment gateway integration would be implemented here');
  };

  const handleDownload = (invoiceId: string) => {
    alert(`Downloading invoice ${invoiceId}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-brown-900">
          {t('billing.title')}
        </h1>
        <p className="text-gray-600 mt-1">Heat-as-a-Service billing and payment management</p>
      </div>

      {/* Current Period Bill */}
      <div className="bg-gradient-to-br from-brown-700 to-brown-900 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('billing.currentBill')}</h2>
            <p className="text-brown-200">{currentBill.period}</p>
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            currentBill.status === 'paid'
              ? 'bg-green-500/20 text-green-300 border border-green-400'
              : 'bg-yellow-500/20 text-yellow-300 border border-yellow-400'
          }`}>
            {currentBill.status === 'paid' ? t('billing.paid') : t('billing.pending')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-brown-200 text-sm mb-1">{t('billing.usage')}</p>
            <p className="text-3xl font-bold">{currentBill.usage.toLocaleString()}</p>
            <p className="text-brown-300 text-sm mt-1">kWh thermal</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-brown-200 text-sm mb-1">{t('billing.rate')}</p>
            <p className="text-3xl font-bold">Rp {currentBill.rate.toLocaleString()}</p>
            <p className="text-brown-300 text-sm mt-1">per kWh</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <p className="text-brown-200 text-sm mb-1">{t('billing.total')}</p>
            <p className="text-3xl font-bold">Rp {currentBill.amount.toLocaleString()}</p>
            <p className="text-brown-300 text-sm mt-1">Due: {currentBill.dueDate.toLocaleDateString('id-ID')}</p>
          </div>
        </div>

        {currentBill.status === 'pending' && (
          <button
            onClick={handlePayment}
            className="w-full md:w-auto px-8 py-3 bg-white text-brown-900 rounded-lg hover:bg-brown-50 transition-all font-medium flex items-center justify-center space-x-2 shadow-lg"
          >
            <CreditCard className="w-5 h-5" />
            <span>{t('billing.payNow')}</span>
          </button>
        )}
      </div>

      {/* Cost Savings Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">vs Traditional</p>
              <p className="text-2xl font-bold text-brown-900">-48.5%</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Savings: <span className="font-bold text-green-600">Rp 18.2M</span> this period
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rate</p>
              <p className="text-2xl font-bold text-brown-900">Rp 870</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Per kWh thermal energy
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid YTD</p>
              <p className="text-2xl font-bold text-brown-900">Rp 156M</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Year 2026
          </p>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-brown-900 mb-6">{t('billing.history')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  {t('billing.invoice')}
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  {t('billing.date')}
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  {t('billing.usage')} (kWh)
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  {t('billing.rate')}
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                  {t('billing.amount')}
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  {t('billing.status')}
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-semibold text-brown-900">{bill.id}</p>
                    <p className="text-sm text-gray-500">{bill.period}</p>
                  </td>
                  <td className="py-4 px-4 text-gray-700">
                    {bill.dueDate.toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">
                    {bill.usage.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right text-gray-700">
                    Rp {bill.rate.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-right font-semibold text-brown-900">
                    Rp {bill.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {bill.status === 'paid' ? (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>{t('billing.paid')}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{t('billing.pending')}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleDownload(bill.id)}
                      className="inline-flex items-center space-x-1 px-3 py-1 text-brown-700 hover:bg-brown-100 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('billing.download')}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-brown-900 mb-6">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border-2 border-brown-700 rounded-lg bg-brown-50">
            <div className="flex items-center justify-between mb-3">
              <CreditCard className="w-8 h-8 text-brown-700" />
              <span className="text-xs font-medium px-2 py-1 bg-brown-700 text-white rounded">Primary</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">Bank Transfer</p>
            <p className="font-semibold text-brown-900">BCA •••• 4892</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-brown-300 transition-colors cursor-pointer">
            <CreditCard className="w-8 h-8 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Virtual Account</p>
            <p className="font-semibold text-gray-900">Not configured</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg hover:border-brown-300 transition-colors cursor-pointer">
            <CreditCard className="w-8 h-8 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-1">Credit Card</p>
            <p className="font-semibold text-gray-900">Add new</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
