import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, Globe } from 'lucide-react';

const LoginPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in production, validate credentials
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-900 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')}
            className="flex items-center space-x-2 px-4 py-2 bg-brown-800/50 text-white rounded-lg hover:bg-brown-700/50 transition-colors backdrop-blur-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium uppercase">
              {i18n.language === 'en' ? 'ID' : 'EN'}
            </span>
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brown-600 to-brown-800 rounded-2xl mb-4">
              <span className="text-3xl font-bold text-white">B</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-brown-900">BATERMAL</h1>
            <p className="text-stone-600 mt-2">Smart Thermal Battery System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-brown-600 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-brown-600 border-stone-300 rounded focus:ring-brown-600"
                />
                <span className="ml-2 text-sm text-stone-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-brown-600 hover:text-brown-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
            >
              {t('landing.hero.login')}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-brown-50 rounded-lg border border-brown-200">
            <p className="text-xs text-brown-700 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-stone-600">Email: demo@industry.com</p>
            <p className="text-xs text-stone-600">Password: demo123</p>
          </div>

          {/* Back to Landing */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-brown-600 hover:text-brown-700 font-medium">
              ← Back to Homepage
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-brown-300 text-sm mt-8">
          © 2026 BATERMAL. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
