import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { StatsCard } from '@/components/dashboard/stats-card';
import { BeneficiaryChart } from '@/components/dashboard/beneficiary-chart';
import { BeneficiaryTable } from '@/components/dashboard/beneficiary-table';
import { TabsNav } from '@/components/dashboard/tabs-nav';
import { BENEFICIARY_TABS, BENEFICIARY_TYPES } from '@/lib/constants';
import { KPIContent } from '@/components/dashboard/kpi-content';
import { ActivityContent } from '@/components/dashboard/activity-content';
import { BudgetContent } from '@/components/dashboard/budget-content';

interface DashboardPageProps {
  onLogout: () => void;
}

export function DashboardPage({ onLogout }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('beneficiary');

  const renderContent = () => {
    switch (activeTab) {
      case 'kpi':
        return <KPIContent />;
      case 'activity':
        return <ActivityContent />;
      case 'budget':
        return <BudgetContent />;
      default:
        return (
          <>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENEFICIARY_TYPES.map((type) => (
                <StatsCard
                  key={type.label}
                  title={type.label}
                  count={type.count}
                  percentage={type.percentage}
                  growth={type.growth}
                  color={type.color}
                />
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-4">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">Beneficiary Distribution</h2>
                  <BeneficiaryChart />
                </div>
              </div>
              
              <div className="col-span-12 lg:col-span-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Beneficiary List</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <FileText className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" className="h-8 bg-amber-600 hover:bg-amber-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Beneficiary
                      </Button>
                    </div>
                  </div>
                  <BeneficiaryTable />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />
      
      <div className="main-content">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            RUFORUM Monitoring, Evaluation, and Learning Database
          </p>
        </div>
        
        <TabsNav
          tabs={BENEFICIARY_TABS}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        {renderContent()}
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Filter, FileText, Plus } from 'lucide-react';