import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Zap, Brain, Leaf, Globe } from 'lucide-react';

const LandingPage = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: Recycle,
      title: t('landing.features.circular.title'),
      desc: t('landing.features.circular.desc'),
      color: 'from-amber-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: t('landing.features.haas.title'),
      desc: t('landing.features.haas.desc'),
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Brain,
      title: t('landing.features.iot.title'),
      desc: t('landing.features.iot.desc'),
      color: 'from-brown-500 to-brown-600'
    },
    {
      icon: Leaf,
      title: t('landing.features.esg.title'),
      desc: t('landing.features.esg.desc'),
      color: 'from-orange-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-50 via-white to-brown-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-brown-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brown-600 to-brown-800 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-brown-900">BATERMAL</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-brown-100 transition-colors"
            >
              <Globe className="w-4 h-4 text-brown-600" />
              <span className="text-sm font-medium text-brown-900 uppercase">
                {i18n.language === 'en' ? 'ID' : 'EN'}
              </span>
            </button>
            <Link
              to="/login"
              className="px-6 py-2 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all duration-200 font-medium"
            >
              {t('landing.hero.login')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brown-100 rounded-full mb-6">
            <Leaf className="w-4 h-4 text-brown-700" />
            <span className="text-sm font-medium text-brown-700">Net Zero 2060</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-display font-bold text-brown-900 mb-6 leading-tight">
            {t('landing.hero.title')}
          </h1>

          <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('landing.hero.subtitle')}
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button className="px-8 py-4 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-all duration-200 font-medium text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl">
              <span>{t('landing.hero.cta')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-brown-700 border-2 border-brown-700 rounded-lg hover:bg-brown-50 transition-all duration-200 font-medium text-lg"
            >
              {t('landing.hero.login')}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-3xl font-bold text-brown-700">145+</p>
              <p className="text-sm text-stone-600 mt-1">Tons CO₂ Reduced</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-3xl font-bold text-brown-700">50+</p>
              <p className="text-sm text-stone-600 mt-1">Industry Partners</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-3xl font-bold text-brown-700">92%</p>
              <p className="text-sm text-stone-600 mt-1">Efficiency Rate</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <p className="text-3xl font-bold text-brown-700">24/7</p>
              <p className="text-sm text-stone-600 mt-1">Monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-brown-900 mb-4">
              {t('landing.features.title')}
            </h2>
            <div className="w-24 h-1 bg-brown-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-brown-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-brown-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brown-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-brown-800 to-brown-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Decarbonize Your Industry?
          </h2>
          <p className="text-xl text-brown-200 mb-8">
            Join 50+ industry leaders reducing emissions and costs with BATERMAL
          </p>
          <button className="px-10 py-4 bg-white text-brown-900 rounded-lg hover:bg-brown-50 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-brown-950 text-brown-300">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-brown-600 to-brown-800 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white">BATERMAL</h3>
          </div>
          <p className="text-sm">© 2026 BATERMAL. Smart Thermal Battery for Industrial Decarbonization.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
