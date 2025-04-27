import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Filter, FileText, TrendingUp, TrendingDown, Target, Award, Users, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const kpiData = [
  { month: 'Jan', completion: 65, publications: 12, grants: 8, impact: 75, engagement: 80 },
  { month: 'Feb', completion: 72, publications: 15, grants: 10, impact: 78, engagement: 85 },
  { month: 'Mar', completion: 68, publications: 18, grants: 12, impact: 72, engagement: 82 },
  { month: 'Apr', completion: 85, publications: 22, grants: 15, impact: 85, engagement: 88 },
  { month: 'May', completion: 78, publications: 25, grants: 18, impact: 80, engagement: 85 },
  { month: 'Jun', completion: 90, publications: 30, grants: 22, impact: 88, engagement: 92 },
];

const researchImpact = [
  { subject: 'Citations', A: 85, fullMark: 100 },
  { subject: 'Publications', A: 75, fullMark: 100 },
  { subject: 'Grants', A: 90, fullMark: 100 },
  { subject: 'Collaborations', A: 82, fullMark: 100 },
  { subject: 'Innovation', A: 88, fullMark: 100 },
];

const projectDistribution = [
  { name: 'Research', value: 45, color: '#8b4513' },
  { name: 'Training', value: 25, color: '#d97706' },
  { name: 'Innovation', value: 20, color: '#92400e' },
  { name: 'Policy', value: 10, color: '#b45309' },
];

const summaryStats = [
  { 
    title: 'Project Success Rate',
    value: '85%',
    trend: '+5%',
    icon: Target,
    progress: 85,
    status: 'increase',
    description: '15 projects completed this quarter'
  },
  {
    title: 'Research Impact Score',
    value: '4.8',
    trend: '+0.3',
    icon: Award,
    progress: 92,
    status: 'increase',
    description: 'Based on 150+ citations'
  },
  {
    title: 'Beneficiary Engagement',
    value: '92%',
    trend: '+8%',
    icon: Users,
    progress: 92,
    status: 'increase',
    description: '2,500+ active participants'
  },
  {
    title: 'Publication Output',
    value: '145',
    trend: '+12',
    icon: BookOpen,
    progress: 78,
    status: 'increase',
    description: 'Across 25 institutions'
  },
];

export function KPIContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-ruforum-brown">Performance Analytics</h2>
          <p className="text-sm text-muted-foreground">Comprehensive overview of research and impact metrics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="p-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold text-ruforum-brown">{stat.value}</p>
                  <div className={`flex items-center text-xs ${stat.status === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.status === 'increase' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {stat.trend}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
              <stat.icon className="h-5 w-5 text-ruforum-amber opacity-80" />
            </div>
            <Progress value={stat.progress} className="mt-3 h-1" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-ruforum-brown">Performance Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="completion" 
                  name="Project Completion"
                  stroke="#8b4513" 
                  strokeWidth={2}
                  dot={{ fill: '#8b4513' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="impact" 
                  name="Research Impact"
                  stroke="#d97706" 
                  strokeWidth={2}
                  dot={{ fill: '#d97706' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  name="Engagement"
                  stroke="#92400e" 
                  strokeWidth={2}
                  dot={{ fill: '#92400e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-rows-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-ruforum-brown">Research Impact Analysis</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={researchImpact}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" stroke="#6b7280" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#8b4513"
                    fill="#8b4513"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-ruforum-brown">Project Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}