export const SITE_NAME = 'RUFORUM MEL';

export const ROUTES = {
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  PARTNERS: '/partners',
  SCORECARD: '/scorecard',
  REPORTS: '/reports',
};

export const NAVIGATION_ITEMS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Projects Management', path: ROUTES.PROJECTS, icon: 'Briefcase' },
  { label: 'Partners Database', path: ROUTES.PARTNERS, icon: 'Database' },
  { label: 'Scorecard', path: ROUTES.SCORECARD, icon: 'LineChart' },
  { label: 'Reports', path: ROUTES.REPORTS, icon: 'FileText' },
];

export const BENEFICIARY_TABS = [
  { label: 'Beneficiary', value: 'beneficiary', icon: 'Users' },
  { label: 'KPI', value: 'kpi', icon: 'BarChart' },
  { label: 'Activity', value: 'activity', icon: 'Calendar' },
  { label: 'Budget', value: 'budget', icon: 'DollarSign' },
];

export const BENEFICIARY_TYPES = [
  { 
    label: 'Students', 
    count: 150, 
    percentage: 29, 
    growth: 12,
    color: 'border-amber-600'
  },
  { 
    label: 'Researchers', 
    count: 80, 
    percentage: 16, 
    growth: 12,
    color: 'border-amber-800'
  },
  { 
    label: 'Farmers', 
    count: 250, 
    percentage: 49, 
    growth: 12,
    color: 'border-green-600'
  },
  { 
    label: 'Policy Makers', 
    count: 30, 
    percentage: 6, 
    growth: 12,
    color: 'border-amber-900'
  },
];

export const BENEFICIARIES = [
  {
    id: '1',
    name: 'John Doe',
    category: 'Student',
    institution: 'University of Nairobi',
    country: 'Kenya',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    category: 'Researcher',
    institution: 'Agricultural Research Institute',
    country: 'Tanzania',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    category: 'Farmer',
    institution: 'Local Farming Cooperative',
    country: 'Uganda',
    status: 'Inactive'
  },
];