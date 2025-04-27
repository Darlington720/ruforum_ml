import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Filter, FileText } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const budgetOverview = {
  total: 500000,
  spent: 300000,
  committed: 100000,
  remaining: 100000,
};

const expenseCategories = [
  { name: "Research Grants", value: 50, color: "#8b4513" },
  { name: "Training Programs", value: 27, color: "#d97706" },
  { name: "Infrastructure", value: 10, color: "#d4d4a7" },
  { name: "Administrative", value: 13, color: "#3e1e0d" },
];

const quarterlyTrends = [
  { quarter: "Q1", allocated: 120000, spent: 95000 },
  { quarter: "Q2", allocated: 125000, spent: 105000 },
  { quarter: "Q3", allocated: 125000, spent: 85000 },
  { quarter: "Q4", allocated: 130000, spent: 115000 },
];

const transactions = [
  {
    description: "Research Equipment Purchase",
    project: "Agricultural Innovation",
    date: "Nov 15, 2024",
    amount: 24500,
  },
  {
    description: "Staff Training Workshop",
    project: "Capacity Building",
    date: "Nov 10, 2024",
    amount: 12300,
  },
  {
    description: "Conference Sponsorship",
    project: "Knowledge Sharing",
    date: "Nov 5, 2024",
    amount: 15000,
  },
  {
    description: "Field Research Expenses",
    project: "Soil Health Initiative",
    date: "Oct 28, 2024",
    amount: 8750,
  },
  {
    description: "Publication Fees",
    project: "Academic Research",
    date: "Oct 20, 2024",
    amount: 3200,
  },
];

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center text-xs mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function BudgetContent() {
  return (
    <div className="space-y-4" style={{ marginTop: "10px" }}>
      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <h3 className="text-xs text-muted-foreground">Total Budget</h3>
          <p className="text-xl font-bold text-[#8b4513] mt-1">
            ${budgetOverview.total.toLocaleString()}
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-xs text-muted-foreground">Spent</h3>
          <p className="text-xl font-bold text-amber-600 mt-1">
            ${budgetOverview.spent.toLocaleString()}
          </p>
          <Progress
            value={60}
            className="h-1 mt-2 bg-amber-100"
            indicatorClassName="bg-amber-600"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            60% of budget
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-xs text-muted-foreground">Committed</h3>
          <p className="text-xl font-bold text-amber-500 mt-1">
            ${budgetOverview.committed.toLocaleString()}
          </p>
          <Progress
            value={20}
            className="h-1 mt-2 bg-amber-50"
            indicatorClassName="bg-amber-500"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            20% of budget
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="text-xs text-muted-foreground">Remaining</h3>
          <p className="text-xl font-bold text-green-600 mt-1">
            ${budgetOverview.remaining.toLocaleString()}
          </p>
          <Progress
            value={20}
            className="h-1 mt-2 bg-green-50"
            indicatorClassName="bg-green-600"
          />
          <p className="text-[11px] text-muted-foreground mt-1">
            20% of budget
          </p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-4">Expenses by Category</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="45%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                  labelLine={false}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  content={<CustomLegend />}
                  payload={expenseCategories.map((item) => ({
                    value: item.name,
                    color: item.color,
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-semibold mb-4">
            Quarterly Budget Trends
          </h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={quarterlyTrends}
                margin={{ top: 10, right: 10, left: -15, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="quarter" tickSize={0} />
                <YAxis tickSize={0} axisLine={false} />
                <Tooltip
                  formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{ fontSize: "12px" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs text-muted-foreground">
                      {value}
                    </span>
                  )}
                />
                <Bar name="Allocated" dataKey="allocated" fill="#8b4513" />
                <Bar name="Spent" dataKey="spent" fill="#d97706" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">Budget Transactions</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              <FileText className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">
                  Description
                </th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">
                  Project
                </th>
                <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-50">
                  <td className="py-2 px-3">{transaction.description}</td>
                  <td className="py-2 px-3">{transaction.project}</td>
                  <td className="py-2 px-3">{transaction.date}</td>
                  <td className="py-2 px-3 text-right">
                    ${transaction.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
