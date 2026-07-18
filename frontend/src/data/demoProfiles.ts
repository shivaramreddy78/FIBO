export interface DemoProfile {
  id: string;
  name: string;
  occupation: string;
  age: number;
  city: string;
  familySize: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  averageBankBalance: number;
  upiActivity: string;
  cashFlow: 'Positive' | 'Stable' | 'Volatile' | 'Negative';
  existingLoans: number;
  utilityPaymentRecord: 'Excellent' | 'Good' | 'Average' | 'Poor';
  businessRevenue?: number;
  summary: string;
  avatar: string;
  
  // AI Metrics
  score: number;
  fhi: number; // Financial Health Index
  riskLevel: 'Low' | 'Medium' | 'High';
  repaymentProbability: string;
  loanRecommendation: {
    status: 'Approved' | 'Conditionally Approved' | 'Rejected';
    amount: number;
    interestRate: number;
    tenureMonths: number;
    condition?: string;
  };
  fraudFlags: string[];
  
  // Explainable AI
  explanation: {
    positive: string[];
    negative: string[];
  };
  insights: string[];
  
  // Chart Data
  cashFlowData: Array<{ name: string; income: number; expenses: number }>;
  expenseCategories: Array<{ name: string; value: number }>;
  savingsTrend: Array<{ name: string; balance: number }>;
}

export const demoProfiles: DemoProfile[] = [
  {
    id: "p1_gig_worker",
    name: "Rahul Verma",
    occupation: "Gig Worker (Delivery Partner)",
    age: 26,
    city: "Bengaluru",
    familySize: 3,
    monthlyIncome: 35000,
    monthlyExpenses: 22000,
    monthlySavings: 13000,
    averageBankBalance: 45000,
    upiActivity: "High Volume, Low Ticket",
    cashFlow: "Stable",
    existingLoans: 0,
    utilityPaymentRecord: "Excellent",
    summary: "Consistent daily earnings via delivery apps. Excellent utility payment history.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=b6e3f4",
    
    score: 812,
    fhi: 94,
    riskLevel: "Low",
    repaymentProbability: "97%",
    loanRecommendation: {
      status: "Approved",
      amount: 500000,
      interestRate: 8.2,
      tenureMonths: 36
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Stable monthly income across multiple gig platforms.",
        "Healthy cash flow with consistent daily deposits.",
        "Utility bills always paid on time.",
        "Positive savings trend over the last 6 months."
      ],
      negative: [
        "Income is dependent on daily work, slight seasonal variation."
      ]
    },
    insights: [
      "Your savings increased by 18% this quarter.",
      "Cash flow remained stable despite fuel price hikes.",
      "Repayment capacity is strong enough for premium credit tiers."
    ],
    cashFlowData: [
      { name: 'Jan', income: 32000, expenses: 20000 },
      { name: 'Feb', income: 34000, expenses: 21000 },
      { name: 'Mar', income: 33000, expenses: 22000 },
      { name: 'Apr', income: 35000, expenses: 21500 },
      { name: 'May', income: 36000, expenses: 22000 },
      { name: 'Jun', income: 35000, expenses: 22000 },
    ],
    expenseCategories: [
      { name: 'Housing', value: 8000 },
      { name: 'Fuel', value: 6000 },
      { name: 'Food', value: 5000 },
      { name: 'Utilities', value: 2000 },
      { name: 'Other', value: 1000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 30000 },
      { name: 'Feb', balance: 35000 },
      { name: 'Mar', balance: 38000 },
      { name: 'Apr', balance: 42000 },
      { name: 'May', balance: 45000 },
      { name: 'Jun', balance: 45000 },
    ]
  },
  {
    id: "p2_street_vendor",
    name: "Suresh Kumar",
    occupation: "Street Vendor (Food Stall)",
    age: 42,
    city: "Delhi",
    familySize: 5,
    monthlyIncome: 28000,
    monthlyExpenses: 20000,
    monthlySavings: 8000,
    averageBankBalance: 15000,
    upiActivity: "Very High Volume (Micro-payments)",
    cashFlow: "Volatile",
    existingLoans: 1,
    utilityPaymentRecord: "Good",
    summary: "High volume of UPI micro-payments daily. Cash flow fluctuates based on weather and season.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh&backgroundColor=c0aede",
    
    score: 648,
    fhi: 74,
    riskLevel: "Medium",
    repaymentProbability: "78%",
    loanRecommendation: {
      status: "Conditionally Approved",
      amount: 120000,
      interestRate: 11.5,
      tenureMonths: 12,
      condition: "Weekly Repayment Plan"
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Incredible volume of legitimate UPI micro-transactions indicates strong business activity.",
        "Consistent supplier payments detected.",
        "Low existing debt burden."
      ],
      negative: [
        "Moderate expense fluctuations detected during monsoon season.",
        "Low average bank balance relative to transaction volume."
      ]
    },
    insights: [
      "Consider consolidating business funds to increase average balance.",
      "Switching to a weekly repayment structure reduces default risk.",
      "Increase emergency savings buffer for off-season resilience."
    ],
    cashFlowData: [
      { name: 'Jan', income: 30000, expenses: 18000 },
      { name: 'Feb', income: 28000, expenses: 19000 },
      { name: 'Mar', income: 32000, expenses: 20000 },
      { name: 'Apr', income: 25000, expenses: 21000 },
      { name: 'May', income: 27000, expenses: 19000 },
      { name: 'Jun', income: 28000, expenses: 20000 },
    ],
    expenseCategories: [
      { name: 'Supplies', value: 10000 },
      { name: 'Housing', value: 5000 },
      { name: 'Food', value: 3000 },
      { name: 'Utilities', value: 1000 },
      { name: 'Other', value: 1000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 12000 },
      { name: 'Feb', balance: 14000 },
      { name: 'Mar', balance: 15000 },
      { name: 'Apr', balance: 12000 },
      { name: 'May', balance: 13000 },
      { name: 'Jun', balance: 15000 },
    ]
  },
  {
    id: "p3_farmer",
    name: "Prakash Patel",
    occupation: "Farmer",
    age: 50,
    city: "Nashik",
    familySize: 6,
    monthlyIncome: 65000, // Averaged out
    monthlyExpenses: 30000,
    monthlySavings: 35000,
    averageBankBalance: 120000,
    upiActivity: "Low Volume, High Ticket",
    cashFlow: "Volatile",
    existingLoans: 0,
    utilityPaymentRecord: "Average",
    summary: "Income is highly seasonal, clustered around harvest times. Expenses are steady.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prakash&backgroundColor=ffdfbf",
    
    score: 705,
    fhi: 80,
    riskLevel: "Medium",
    repaymentProbability: "85%",
    loanRecommendation: {
      status: "Conditionally Approved",
      amount: 300000,
      interestRate: 9.5,
      tenureMonths: 24,
      condition: "Seasonal Repayment Plan"
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Strong overall liquidity and high average bank balance.",
        "Large, verifiable deposits from APMC and agricultural buyers.",
        "Zero current debt."
      ],
      negative: [
        "Income is highly seasonal (harvest months only).",
        "Utility payments show occasional delays during non-harvest months."
      ]
    },
    insights: [
      "Your repayment schedule has been aligned with harvest cycles.",
      "Maintain a steady buffer during planting season to improve score."
    ],
    cashFlowData: [
      { name: 'Jan', income: 10000, expenses: 25000 },
      { name: 'Feb', income: 5000, expenses: 25000 },
      { name: 'Mar', income: 250000, expenses: 40000 },
      { name: 'Apr', income: 10000, expenses: 25000 },
      { name: 'May', income: 5000, expenses: 30000 },
      { name: 'Jun', income: 150000, expenses: 35000 },
    ],
    expenseCategories: [
      { name: 'Agri Supplies', value: 15000 },
      { name: 'Housing/Family', value: 10000 },
      { name: 'Transport', value: 3000 },
      { name: 'Utilities', value: 2000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 80000 },
      { name: 'Feb', balance: 60000 },
      { name: 'Mar', balance: 270000 },
      { name: 'Apr', balance: 255000 },
      { name: 'May', balance: 230000 },
      { name: 'Jun', balance: 345000 },
    ]
  },
  {
    id: "p4_kirana_owner",
    name: "Anjali Gupta",
    occupation: "Kirana Store Owner",
    age: 38,
    city: "Mumbai",
    familySize: 4,
    monthlyIncome: 85000,
    monthlyExpenses: 55000,
    monthlySavings: 30000,
    averageBankBalance: 180000,
    upiActivity: "Very High Volume",
    cashFlow: "Positive",
    existingLoans: 0,
    utilityPaymentRecord: "Excellent",
    businessRevenue: 350000,
    summary: "Runs a successful neighborhood grocery. Strong UPI merchant data.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali&backgroundColor=d1d4f9",
    
    score: 865,
    fhi: 96,
    riskLevel: "Low",
    repaymentProbability: "98%",
    loanRecommendation: {
      status: "Approved",
      amount: 1500000,
      interestRate: 7.8,
      tenureMonths: 48
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Highly consistent merchant UPI receipts.",
        "Excellent cash flow management between business revenue and personal drawings.",
        "Flawless utility and vendor payment history."
      ],
      negative: []
    },
    insights: [
      "Business revenue is growing steadily.",
      "Eligible for premium SME credit line expansion."
    ],
    cashFlowData: [
      { name: 'Jan', income: 80000, expenses: 50000 },
      { name: 'Feb', income: 82000, expenses: 52000 },
      { name: 'Mar', income: 85000, expenses: 55000 },
      { name: 'Apr', income: 84000, expenses: 54000 },
      { name: 'May', income: 88000, expenses: 56000 },
      { name: 'Jun', income: 85000, expenses: 55000 },
    ],
    expenseCategories: [
      { name: 'Inventory/Business', value: 30000 },
      { name: 'Housing', value: 15000 },
      { name: 'Education', value: 5000 },
      { name: 'Utilities', value: 5000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 140000 },
      { name: 'Feb', balance: 155000 },
      { name: 'Mar', balance: 165000 },
      { name: 'Apr', balance: 175000 },
      { name: 'May', balance: 190000 },
      { name: 'Jun', balance: 200000 },
    ]
  },
  {
    id: "p5_auto_driver",
    name: "Murugan K.",
    occupation: "Auto Rickshaw Driver",
    age: 45,
    city: "Chennai",
    familySize: 5,
    monthlyIncome: 25000,
    monthlyExpenses: 22000,
    monthlySavings: 3000,
    averageBankBalance: 8000,
    upiActivity: "Moderate (QR Code via riders)",
    cashFlow: "Stable",
    existingLoans: 1,
    utilityPaymentRecord: "Average",
    summary: "Consistent daily deposits but tight margins and high fuel costs.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Murugan&backgroundColor=b6e3f4",
    
    score: 610,
    fhi: 62,
    riskLevel: "High",
    repaymentProbability: "68%",
    loanRecommendation: {
      status: "Rejected",
      amount: 0,
      interestRate: 0,
      tenureMonths: 0,
      condition: "High EMI to Income Ratio"
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Verifiable daily deposits through UPI QR."
      ],
      negative: [
        "Extremely thin margins. Savings buffer is too low.",
        "Existing auto loan consumes 35% of income.",
        "High vulnerability to fuel price shocks."
      ]
    },
    insights: [
      "Reduce existing debt before applying for new credit.",
      "Consider building a 3-month emergency buffer."
    ],
    cashFlowData: [
      { name: 'Jan', income: 24000, expenses: 22000 },
      { name: 'Feb', income: 26000, expenses: 23000 },
      { name: 'Mar', income: 23000, expenses: 22000 },
      { name: 'Apr', income: 25000, expenses: 22000 },
      { name: 'May', income: 26000, expenses: 24000 },
      { name: 'Jun', income: 25000, expenses: 22000 },
    ],
    expenseCategories: [
      { name: 'Fuel/Maintenance', value: 9000 },
      { name: 'EMI', value: 8000 },
      { name: 'Food/Family', value: 4000 },
      { name: 'Utilities', value: 1000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 5000 },
      { name: 'Feb', balance: 6000 },
      { name: 'Mar', balance: 5500 },
      { name: 'Apr', balance: 7000 },
      { name: 'May', balance: 7500 },
      { name: 'Jun', balance: 8000 },
    ]
  },
  {
    id: "p6_freelancer",
    name: "Priya Sharma",
    occupation: "Freelance Designer",
    age: 28,
    city: "Pune",
    familySize: 1,
    monthlyIncome: 75000,
    monthlyExpenses: 40000,
    monthlySavings: 35000,
    averageBankBalance: 250000,
    upiActivity: "Moderate",
    cashFlow: "Positive",
    existingLoans: 0,
    utilityPaymentRecord: "Excellent",
    summary: "No fixed salary slip, but receives regular international and domestic wire transfers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=c0aede",
    
    score: 840,
    fhi: 92,
    riskLevel: "Low",
    repaymentProbability: "95%",
    loanRecommendation: {
      status: "Approved",
      amount: 800000,
      interestRate: 8.5,
      tenureMonths: 36
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Strong and growing international wire transfers.",
        "Very healthy savings-to-income ratio (46%).",
        "Excellent liquidity.",
        "Zero late payments on credit cards or utilities."
      ],
      negative: [
        "Income is project-based, leading to slight month-to-month variation."
      ]
    },
    insights: [
      "Your growing savings buffer offsets freelance income volatility.",
      "Eligible for premium credit products."
    ],
    cashFlowData: [
      { name: 'Jan', income: 60000, expenses: 38000 },
      { name: 'Feb', income: 90000, expenses: 42000 },
      { name: 'Mar', income: 55000, expenses: 39000 },
      { name: 'Apr', income: 85000, expenses: 40000 },
      { name: 'May', income: 110000, expenses: 45000 },
      { name: 'Jun', income: 75000, expenses: 40000 },
    ],
    expenseCategories: [
      { name: 'Housing', value: 18000 },
      { name: 'Software/Gear', value: 8000 },
      { name: 'Food', value: 8000 },
      { name: 'Travel', value: 6000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 180000 },
      { name: 'Feb', balance: 220000 },
      { name: 'Mar', balance: 235000 },
      { name: 'Apr', balance: 270000 },
      { name: 'May', balance: 320000 },
      { name: 'Jun', balance: 345000 },
    ]
  },
  {
    id: "p7_home_baker",
    name: "Fatima Sheikh",
    occupation: "Home Baker",
    age: 34,
    city: "Hyderabad",
    familySize: 4,
    monthlyIncome: 35000,
    monthlyExpenses: 20000,
    monthlySavings: 15000,
    averageBankBalance: 60000,
    upiActivity: "High Volume",
    cashFlow: "Stable",
    existingLoans: 0,
    utilityPaymentRecord: "Good",
    summary: "Runs an Instagram bakery. Daily UPI credits from customers.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima&backgroundColor=ffdfbf",
    
    score: 760,
    fhi: 85,
    riskLevel: "Low",
    repaymentProbability: "89%",
    loanRecommendation: {
      status: "Approved",
      amount: 250000,
      interestRate: 10.0,
      tenureMonths: 24
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Consistent daily UPI credits indicating strong micro-business health.",
        "Good savings habit.",
        "Stable household expenses."
      ],
      negative: [
        "No formal business registration detected."
      ]
    },
    insights: [
      "Registering your business (GST/MSME) can unlock lower commercial interest rates."
    ],
    cashFlowData: [
      { name: 'Jan', income: 30000, expenses: 18000 },
      { name: 'Feb', income: 32000, expenses: 19000 },
      { name: 'Mar', income: 38000, expenses: 22000 }, // Festival
      { name: 'Apr', income: 34000, expenses: 20000 },
      { name: 'May', income: 36000, expenses: 21000 },
      { name: 'Jun', income: 35000, expenses: 20000 },
    ],
    expenseCategories: [
      { name: 'Ingredients', value: 10000 },
      { name: 'Housing', value: 6000 },
      { name: 'Utilities', value: 2000 },
      { name: 'Other', value: 2000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 40000 },
      { name: 'Feb', balance: 48000 },
      { name: 'Mar', balance: 60000 },
      { name: 'Apr', balance: 70000 },
      { name: 'May', balance: 80000 },
      { name: 'Jun', balance: 90000 },
    ]
  },
  {
    id: "p8_tuition_teacher",
    name: "Ramesh Iyer",
    occupation: "Tuition Teacher",
    age: 55,
    city: "Kochi",
    familySize: 3,
    monthlyIncome: 45000,
    monthlyExpenses: 28000,
    monthlySavings: 17000,
    averageBankBalance: 110000,
    upiActivity: "Moderate (First week of month)",
    cashFlow: "Stable",
    existingLoans: 0,
    utilityPaymentRecord: "Excellent",
    summary: "Collects fees mostly via UPI in the first week of every month.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh&backgroundColor=d1d4f9",
    
    score: 825,
    fhi: 88,
    riskLevel: "Low",
    repaymentProbability: "93%",
    loanRecommendation: {
      status: "Approved",
      amount: 400000,
      interestRate: 8.9,
      tenureMonths: 36
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Highly predictable cash inflows at the start of every month.",
        "Excellent utility payment track record.",
        "Comfortable savings buffer."
      ],
      negative: []
    },
    insights: [
      "Income predictability makes you an excellent candidate for standard EMI structures."
    ],
    cashFlowData: [
      { name: 'Jan', income: 45000, expenses: 28000 },
      { name: 'Feb', income: 45000, expenses: 27000 },
      { name: 'Mar', income: 46000, expenses: 29000 },
      { name: 'Apr', income: 44000, expenses: 28000 },
      { name: 'May', income: 45000, expenses: 27000 },
      { name: 'Jun', income: 45000, expenses: 28000 },
    ],
    expenseCategories: [
      { name: 'Housing/Family', value: 15000 },
      { name: 'Medical', value: 5000 },
      { name: 'Food', value: 6000 },
      { name: 'Utilities', value: 2000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 90000 },
      { name: 'Feb', balance: 105000 },
      { name: 'Mar', balance: 115000 },
      { name: 'Apr', balance: 125000 },
      { name: 'May', balance: 138000 },
      { name: 'Jun', balance: 150000 },
    ]
  },
  {
    id: "p9_boutique_owner",
    name: "Neha Desai",
    occupation: "Boutique Owner",
    age: 31,
    city: "Ahmedabad",
    familySize: 2,
    monthlyIncome: 120000,
    monthlyExpenses: 80000,
    monthlySavings: 40000,
    averageBankBalance: 250000,
    upiActivity: "High Volume",
    cashFlow: "Positive",
    existingLoans: 2, // 2 active loans
    utilityPaymentRecord: "Good",
    summary: "Strong business revenue but high debt burden from existing business loans.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha&backgroundColor=b6e3f4",
    
    score: 685,
    fhi: 71,
    riskLevel: "Medium",
    repaymentProbability: "81%",
    loanRecommendation: {
      status: "Conditionally Approved",
      amount: 500000,
      interestRate: 12.0,
      tenureMonths: 24,
      condition: "Debt Consolidation Required"
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Strong and verifiable business revenue.",
        "Good cash flow velocity."
      ],
      negative: [
        "High Credit Utilization Ratio.",
        "Multiple active loans are squeezing net disposable income."
      ]
    },
    insights: [
      "Consolidating your 2 existing loans into this new facility will lower your monthly EMI burden by 15%."
    ],
    cashFlowData: [
      { name: 'Jan', income: 110000, expenses: 75000 },
      { name: 'Feb', income: 115000, expenses: 80000 },
      { name: 'Mar', income: 130000, expenses: 85000 },
      { name: 'Apr', income: 120000, expenses: 80000 },
      { name: 'May', income: 125000, expenses: 82000 },
      { name: 'Jun', income: 120000, expenses: 80000 },
    ],
    expenseCategories: [
      { name: 'EMIs', value: 35000 },
      { name: 'Inventory', value: 20000 },
      { name: 'Rent', value: 15000 },
      { name: 'Utilities/Staff', value: 10000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 200000 },
      { name: 'Feb', balance: 215000 },
      { name: 'Mar', balance: 230000 },
      { name: 'Apr', balance: 250000 },
      { name: 'May', balance: 270000 },
      { name: 'Jun', balance: 290000 },
    ]
  },
  {
    id: "p10_small_mfg",
    name: "Rajesh Singh",
    occupation: "Small Mfg Business",
    age: 48,
    city: "Ludhiana",
    familySize: 5,
    monthlyIncome: 250000,
    monthlyExpenses: 210000,
    monthlySavings: 40000,
    averageBankBalance: 400000,
    upiActivity: "Low Volume, Very High Ticket (NEFT/RTGS)",
    cashFlow: "Volatile",
    existingLoans: 1,
    utilityPaymentRecord: "Excellent",
    summary: "B2B manufacturing. Deals in large RTGS payments with 60-day invoice cycles.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=c0aede",
    
    score: 880,
    fhi: 91,
    riskLevel: "Low",
    repaymentProbability: "99%",
    loanRecommendation: {
      status: "Approved",
      amount: 3000000, // 30 Lakhs
      interestRate: 8.0,
      tenureMonths: 60
    },
    fraudFlags: [],
    explanation: {
      positive: [
        "Large, verified B2B RTGS inflows matching GST filings.",
        "Excellent commercial credit behavior.",
        "High average bank balance."
      ],
      negative: [
        "Cash flow gaps due to 60-day invoice realization."
      ]
    },
    insights: [
      "Invoice discounting facility could smooth out your cash flow gaps.",
      "Excellent financial health qualifies you for the lowest SME interest rates."
    ],
    cashFlowData: [
      { name: 'Jan', income: 100000, expenses: 190000 }, // Cash flow gap
      { name: 'Feb', income: 450000, expenses: 220000 }, // Realization
      { name: 'Mar', income: 200000, expenses: 210000 },
      { name: 'Apr', income: 150000, expenses: 200000 },
      { name: 'May', income: 400000, expenses: 220000 },
      { name: 'Jun', income: 250000, expenses: 210000 },
    ],
    expenseCategories: [
      { name: 'Raw Materials', value: 120000 },
      { name: 'Payroll', value: 50000 },
      { name: 'Rent/Power', value: 25000 },
      { name: 'EMIs', value: 15000 },
    ],
    savingsTrend: [
      { name: 'Jan', balance: 350000 },
      { name: 'Feb', balance: 550000 },
      { name: 'Mar', balance: 540000 },
      { name: 'Apr', balance: 490000 },
      { name: 'May', balance: 650000 },
      { name: 'Jun', balance: 670000 },
    ]
  }
];
