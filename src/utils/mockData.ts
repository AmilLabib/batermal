// Mock Data Generator for BATERMAL Dashboard

export interface SystemStatus {
  id: string;
  name: string;
  status: 'operational' | 'charging' | 'discharging' | 'maintenance';
  temperature: number;
  pressure: number;
  flowRate: number;
  power: number;
  efficiency: number;
  energyStored: number;
  maxCapacity: number;
  lastUpdate: Date;
}

export interface EnergyData {
  timestamp: Date;
  consumption: number;
  stored: number;
  efficiency: number;
}

export interface BillingData {
  id: string;
  period: string;
  usage: number;
  rate: number;
  amount: number;
  status: 'paid' | 'pending';
  dueDate: Date;
  invoiceUrl: string;
}

export interface ESGMetrics {
  co2Reduced: number;
  fossilFuelSaved: number;
  waterSaved: number;
  treesEquivalent: number;
  monthlyTrend: { month: string; reduction: number }[];
}

export interface AIRecommendation {
  id: string;
  type: 'charging' | 'maintenance' | 'cost' | 'efficiency';
  title: string;
  description: string;
  potentialSavings: number;
  priority: 'high' | 'medium' | 'low';
  implemented: boolean;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

// Generate mock system status
export const generateSystemStatus = (): SystemStatus => {
  const statuses: SystemStatus['status'][] = ['operational', 'charging', 'discharging', 'maintenance'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: 'TB-001',
    name: 'Thermal Battery Unit 1',
    status: randomStatus,
    temperature: 650 + Math.random() * 100,
    pressure: 8 + Math.random() * 2,
    flowRate: 1200 + Math.random() * 300,
    power: randomStatus === 'charging' ? -(500 + Math.random() * 200) : (400 + Math.random() * 200),
    efficiency: 88 + Math.random() * 8,
    energyStored: 3500 + Math.random() * 1000,
    maxCapacity: 5000,
    lastUpdate: new Date()
  };
};

// Generate historical energy data
export const generateEnergyHistory = (days: number = 30): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      timestamp: date,
      consumption: 800 + Math.random() * 400,
      stored: 3000 + Math.random() * 1500,
      efficiency: 85 + Math.random() * 10
    });
  }
  
  return data;
};

// Generate hourly data for today
export const generateHourlyData = (): EnergyData[] => {
  const data: EnergyData[] = [];
  const now = new Date();
  
  for (let i = 0; i < 24; i++) {
    const date = new Date(now);
    date.setHours(i, 0, 0, 0);
    
    // Simulate peak hours (8-18)
    const isPeakHour = i >= 8 && i <= 18;
    const baseConsumption = isPeakHour ? 1200 : 600;
    
    data.push({
      timestamp: date,
      consumption: baseConsumption + Math.random() * 200,
      stored: 3000 + Math.random() * 1500,
      efficiency: 86 + Math.random() * 8
    });
  }
  
  return data;
};

// Generate billing history
export const generateBillingHistory = (): BillingData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const billingData: BillingData[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const usage = 18000 + Math.random() * 6000;
    const rate = 850 + Math.random() * 100;
    
    billingData.push({
      id: `INV-2026${String(monthIndex + 1).padStart(2, '0')}`,
      period: `${months[monthIndex]} 2026`,
      usage: Math.round(usage),
      rate: Math.round(rate),
      amount: Math.round(usage * rate),
      status: i > 0 ? 'paid' : 'pending',
      dueDate: new Date(2026, monthIndex, 25),
      invoiceUrl: '#'
    });
  }
  
  return billingData;
};

// Generate ESG metrics
export const generateESGMetrics = (): ESGMetrics => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return {
    co2Reduced: 145.8,
    fossilFuelSaved: 68.2,
    waterSaved: 892,
    treesEquivalent: 2340,
    monthlyTrend: months.map((month, index) => ({
      month,
      reduction: 18 + index * 3 + Math.random() * 5
    }))
  };
};

// Generate AI recommendations
export const generateAIRecommendations = (): AIRecommendation[] => {
  return [
    {
      id: 'ai-001',
      type: 'charging',
      title: 'Optimal Charging Time Detected',
      description: 'Charge between 22:00-06:00 when electricity rates are 30% lower. Estimated monthly savings: Rp 12,450,000',
      potentialSavings: 12450000,
      priority: 'high',
      implemented: false
    },
    {
      id: 'ai-002',
      type: 'efficiency',
      title: 'Temperature Optimization Available',
      description: 'Adjust operating temperature to 680°C for 4% efficiency improvement without affecting output quality',
      potentialSavings: 3200000,
      priority: 'medium',
      implemented: false
    },
    {
      id: 'ai-003',
      type: 'maintenance',
      title: 'Preventive Maintenance Due',
      description: 'Schedule maintenance in 7 days to prevent 12% efficiency drop. Recommended downtime: 4 hours during low-demand period',
      potentialSavings: 0,
      priority: 'high',
      implemented: false
    },
    {
      id: 'ai-004',
      type: 'cost',
      title: 'Peak Demand Reduction Strategy',
      description: 'Reduce peak demand by 15% using stored thermal energy during 14:00-16:00. Save on demand charges',
      potentialSavings: 8750000,
      priority: 'medium',
      implemented: true
    }
  ];
};

// Generate alerts
export const generateAlerts = (): Alert[] => {
  return [
    {
      id: 'alert-001',
      type: 'success',
      title: 'System Optimization Complete',
      message: 'AI optimization applied successfully. Efficiency improved by 3.2%',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: 'alert-002',
      type: 'info',
      title: 'Monthly Report Available',
      message: 'Your ESG report for June 2026 is ready for download',
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: 'alert-003',
      type: 'warning',
      title: 'Maintenance Schedule Reminder',
      message: 'Preventive maintenance scheduled for July 10, 2026 at 02:00',
      timestamp: new Date(Date.now() - 86400000),
      read: true
    },
    {
      id: 'alert-004',
      type: 'critical',
      title: 'Temperature Spike Detected',
      message: 'Temperature exceeded 750°C for 5 minutes. System auto-regulated to normal',
      timestamp: new Date(Date.now() - 172800000),
      read: true
    },
    {
      id: 'alert-005',
      type: 'success',
      title: 'Cost Savings Milestone',
      message: 'Congratulations! You have saved Rp 50,000,000 in energy costs this quarter',
      timestamp: new Date(Date.now() - 259200000),
      read: true
    }
  ];
};

// Cost comparison data (BATERMAL vs Traditional)
export const getCostComparison = () => {
  return {
    traditional: {
      energyCost: 45000000,
      maintenanceCost: 8500000,
      emissionPenalty: 12000000,
      total: 65500000
    },
    batermal: {
      energyCost: 28000000,
      maintenanceCost: 3200000,
      emissionPenalty: 0,
      total: 31200000
    },
    savings: 34300000,
    savingsPercentage: 52.4
  };
};
