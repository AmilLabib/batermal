import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dashboard',
        monitoring: 'Real-time Monitoring',
        analytics: 'Energy Analytics',
        esg: 'ESG Report',
        billing: 'Billing',
        ai: 'AI Optimization',
        alerts: 'Alerts',
        systems: 'Systems',
        profile: 'Profile',
        logout: 'Logout'
      },
      // Landing Page
      landing: {
        hero: {
          title: 'Smart Thermal Battery for Industrial Decarbonization',
          subtitle: 'Sustainable heat storage solution using circular materials. Save costs, reduce emissions, achieve Net Zero.',
          cta: 'Request Demo',
          login: 'Login'
        },
        features: {
          title: 'Why BATERMAL?',
          circular: {
            title: 'Circular Economy',
            desc: 'Utilizing fly ash, bottom ash, and nickel slag as refractory materials'
          },
          haas: {
            title: 'Heat-as-a-Service',
            desc: 'Pay only for the heat energy you use, no upfront investment'
          },
          iot: {
            title: 'IoT & AI Powered',
            desc: 'Real-time monitoring and intelligent energy optimization'
          },
          esg: {
            title: 'ESG Compliance',
            desc: 'Automated carbon emission reports for your ESG goals'
          }
        }
      },
      // Dashboard
      dashboard: {
        welcome: 'Welcome back',
        overview: 'System Overview',
        quickStats: 'Quick Statistics',
        energyStored: 'Energy Stored',
        efficiency: 'System Efficiency',
        costSavings: 'Cost Savings This Month',
        co2Reduced: 'CO₂ Reduced',
        systemStatus: 'System Status',
        operational: 'Operational',
        charging: 'Charging',
        discharging: 'Discharging',
        maintenance: 'Maintenance',
        recentAlerts: 'Recent Alerts',
        viewAll: 'View All'
      },
      // Monitoring
      monitoring: {
        title: 'Real-time Monitoring',
        temperature: 'Temperature',
        pressure: 'Pressure',
        flowRate: 'Flow Rate',
        power: 'Power',
        status: 'Status',
        lastUpdate: 'Last Update',
        historical: 'Historical Data'
      },
      // Analytics
      analytics: {
        title: 'Energy Analytics',
        consumption: 'Energy Consumption',
        comparison: 'Cost Comparison',
        efficiency: 'Efficiency Trends',
        peak: 'Peak Usage Hours',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly'
      },
      // ESG
      esg: {
        title: 'ESG & Carbon Report',
        totalReduction: 'Total CO₂ Reduction',
        equivalent: 'Equivalent to',
        trees: 'trees planted',
        fossilSaved: 'Fossil Fuel Saved',
        waterSaved: 'Water Saved',
        exportReport: 'Export Report',
        trends: 'Emission Trends'
      },
      // Billing
      billing: {
        title: 'Billing & Usage',
        currentBill: 'Current Period',
        usage: 'Usage',
        rate: 'Rate per kWh',
        total: 'Total Amount',
        payNow: 'Pay Now',
        history: 'Billing History',
        invoice: 'Invoice',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',
        paid: 'Paid',
        pending: 'Pending',
        download: 'Download'
      },
      // AI
      ai: {
        title: 'AI Optimization',
        recommendations: 'AI Recommendations',
        predictions: 'Energy Predictions',
        optimalCharging: 'Optimal Charging Schedule',
        costOptimization: 'Cost Optimization',
        implement: 'Implement',
        savings: 'Potential Savings'
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        search: 'Search...',
        filter: 'Filter',
        export: 'Export',
        refresh: 'Refresh'
      }
    }
  },
  id: {
    translation: {
      // Navigation
      nav: {
        dashboard: 'Dasbor',
        monitoring: 'Monitor Real-time',
        analytics: 'Analitik Energi',
        esg: 'Laporan ESG',
        billing: 'Tagihan',
        ai: 'Optimasi AI',
        alerts: 'Notifikasi',
        systems: 'Sistem',
        profile: 'Profil',
        logout: 'Keluar'
      },
      // Landing Page
      landing: {
        hero: {
          title: 'Baterai Termal Cerdas untuk Dekarbonisasi Industri',
          subtitle: 'Solusi penyimpanan panas berkelanjutan dengan material sirkular. Hemat biaya, kurangi emisi, capai Net Zero.',
          cta: 'Minta Demo',
          login: 'Masuk'
        },
        features: {
          title: 'Mengapa BATERMAL?',
          circular: {
            title: 'Ekonomi Sirkular',
            desc: 'Memanfaatkan fly ash, bottom ash, dan nickel slag sebagai material refraktori'
          },
          haas: {
            title: 'Heat-as-a-Service',
            desc: 'Bayar hanya untuk energi panas yang Anda gunakan, tanpa investasi awal'
          },
          iot: {
            title: 'Bertenaga IoT & AI',
            desc: 'Monitor real-time dan optimasi energi cerdas'
          },
          esg: {
            title: 'Kepatuhan ESG',
            desc: 'Laporan emisi karbon otomatis untuk target ESG Anda'
          }
        }
      },
      // Dashboard
      dashboard: {
        welcome: 'Selamat datang kembali',
        overview: 'Ringkasan Sistem',
        quickStats: 'Statistik Cepat',
        energyStored: 'Energi Tersimpan',
        efficiency: 'Efisiensi Sistem',
        costSavings: 'Penghematan Biaya Bulan Ini',
        co2Reduced: 'CO₂ Berkurang',
        systemStatus: 'Status Sistem',
        operational: 'Operasional',
        charging: 'Pengisian',
        discharging: 'Pengeluaran',
        maintenance: 'Pemeliharaan',
        recentAlerts: 'Notifikasi Terkini',
        viewAll: 'Lihat Semua'
      },
      // Monitoring
      monitoring: {
        title: 'Monitor Real-time',
        temperature: 'Suhu',
        pressure: 'Tekanan',
        flowRate: 'Laju Alir',
        power: 'Daya',
        status: 'Status',
        lastUpdate: 'Update Terakhir',
        historical: 'Data Historis'
      },
      // Analytics
      analytics: {
        title: 'Analitik Energi',
        consumption: 'Konsumsi Energi',
        comparison: 'Perbandingan Biaya',
        efficiency: 'Tren Efisiensi',
        peak: 'Jam Penggunaan Puncak',
        daily: 'Harian',
        weekly: 'Mingguan',
        monthly: 'Bulanan',
        yearly: 'Tahunan'
      },
      // ESG
      esg: {
        title: 'Laporan ESG & Karbon',
        totalReduction: 'Total Pengurangan CO₂',
        equivalent: 'Setara dengan',
        trees: 'pohon ditanam',
        fossilSaved: 'Bahan Bakar Fosil Terhemat',
        waterSaved: 'Air Terhemat',
        exportReport: 'Ekspor Laporan',
        trends: 'Tren Emisi'
      },
      // Billing
      billing: {
        title: 'Tagihan & Penggunaan',
        currentBill: 'Periode Saat Ini',
        usage: 'Penggunaan',
        rate: 'Tarif per kWh',
        total: 'Total Tagihan',
        payNow: 'Bayar Sekarang',
        history: 'Riwayat Tagihan',
        invoice: 'Invoice',
        date: 'Tanggal',
        amount: 'Jumlah',
        status: 'Status',
        paid: 'Lunas',
        pending: 'Menunggu',
        download: 'Unduh'
      },
      // AI
      ai: {
        title: 'Optimasi AI',
        recommendations: 'Rekomendasi AI',
        predictions: 'Prediksi Energi',
        optimalCharging: 'Jadwal Pengisian Optimal',
        costOptimization: 'Optimasi Biaya',
        implement: 'Terapkan',
        savings: 'Potensi Penghematan'
      },
      // Common
      common: {
        loading: 'Memuat...',
        error: 'Kesalahan',
        success: 'Berhasil',
        save: 'Simpan',
        cancel: 'Batal',
        edit: 'Ubah',
        delete: 'Hapus',
        search: 'Cari...',
        filter: 'Filter',
        export: 'Ekspor',
        refresh: 'Muat Ulang'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
