import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";
import {
  Download,
  FileSpreadsheet,
  File as FilePdf,
  Calendar,
  Filter,
  RefreshCcw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Mock data for KPIs and metrics
const performanceData = [
  {
    category: "Research Impact",
    score: 85,
    target: 90,
    trend: "+5%",
    status: "On Track",
  },
  {
    category: "Innovation",
    score: 78,
    target: 85,
    trend: "+3%",
    status: "Needs Attention",
  },
  {
    category: "Capacity Building",
    score: 92,
    target: 88,
    trend: "+8%",
    status: "Exceeding",
  },
  {
    category: "Partnership Engagement",
    score: 88,
    target: 85,
    trend: "+6%",
    status: "On Track",
  },
  {
    category: "Knowledge Dissemination",
    score: 75,
    target: 80,
    trend: "+2%",
    status: "At Risk",
  },
];

const monthlyProgress = [
  { month: "Jan", actual: 65, target: 70 },
  { month: "Feb", actual: 68, target: 72 },
  { month: "Mar", actual: 75, target: 75 },
  { month: "Apr", actual: 82, target: 77 },
  { month: "May", actual: 85, target: 80 },
  { month: "Jun", actual: 88, target: 82 },
];

const radarData = [
  { subject: "Research Quality", A: 85, fullMark: 100 },
  { subject: "Innovation", A: 78, fullMark: 100 },
  { subject: "Collaboration", A: 92, fullMark: 100 },
  { subject: "Impact", A: 88, fullMark: 100 },
  { subject: "Sustainability", A: 75, fullMark: 100 },
];

const beneficiaryStats = {
  total: 2500,
  categories: [
    { name: "Students", count: 1200, percentage: 48 },
    { name: "Researchers", count: 600, percentage: 24 },
    { name: "Farmers", count: 450, percentage: 18 },
    { name: "Policy Makers", count: 250, percentage: 10 },
  ],
};

export function ScorecardContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedView, setSelectedView] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Exceeding":
        return "bg-green-50 text-green-600 border-green-200";
      case "On Track":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "Needs Attention":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "At Risk":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text("RUFORUM Performance Scorecard", 20, 20);

    // Add period
    doc.setFontSize(12);
    doc.text(`Reporting Period: ${selectedPeriod}`, 20, 30);

    // Add performance data table
    autoTable(doc, {
      head: [["Category", "Score", "Target", "Trend", "Status"]],
      body: performanceData.map((item) => [
        item.category,
        item.score.toString(),
        item.target.toString(),
        item.trend,
        item.status,
      ]),
      startY: 40,
    });

    // Add beneficiary stats
    doc.text("Beneficiary Statistics", 20, doc.lastAutoTable.finalY + 20);
    autoTable(doc, {
      head: [["Category", "Count", "Percentage"]],
      body: beneficiaryStats.categories.map((item) => [
        item.name,
        item.count.toString(),
        `${item.percentage}%`,
      ]),
      startY: doc.lastAutoTable.finalY + 30,
    });

    doc.save(`RUFORUM_Scorecard_${selectedPeriod}.pdf`);
    toast.success("PDF report generated successfully!");
  };

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();

    // Performance data worksheet
    const performanceWS = XLSX.utils.json_to_sheet(performanceData);
    XLSX.utils.book_append_sheet(wb, performanceWS, "Performance Metrics");

    // Monthly progress worksheet
    const progressWS = XLSX.utils.json_to_sheet(monthlyProgress);
    XLSX.utils.book_append_sheet(wb, progressWS, "Monthly Progress");

    // Beneficiary stats worksheet
    const beneficiaryWS = XLSX.utils.json_to_sheet(beneficiaryStats.categories);
    XLSX.utils.book_append_sheet(wb, beneficiaryWS, "Beneficiary Stats");

    XLSX.writeFile(wb, `RUFORUM_Data_${selectedPeriod}.xlsx`);
    toast.success("Excel data exported successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ruforum-brown">
            Performance Scorecard
          </h2>
          <p className="text-muted-foreground">
            Comprehensive view of RUFORUM's performance metrics and impact
            indicators
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          <Button variant="outline" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={generateExcel}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={generatePDF}
            >
              <FilePdf className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceData.map((metric) => (
          <Card key={metric.category} className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{metric.category}</h3>
                <Badge
                  variant="outline"
                  className={getStatusColor(metric.status)}
                >
                  {metric.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{metric.score}%</span>
                </div>
                <Progress
                  value={metric.score}
                  className="h-2"
                  indicatorClassName={
                    metric.score >= metric.target
                      ? "bg-green-500"
                      : "bg-amber-500"
                  }
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Target: {metric.target}%</span>
                  <span className="text-green-600">{metric.trend}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">
            Monthly Progress Tracking
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke="#8b4513"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  name="Target"
                  stroke="#d97706"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Performance Radar</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
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
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">Beneficiary Distribution</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Total Beneficiaries:
            </span>
            <span className="font-semibold text-lg">
              {beneficiaryStats.total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {beneficiaryStats.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{category.name}</span>
                  <span className="font-medium">
                    {category.count.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={category.percentage}
                  className="h-2"
                  indicatorClassName="bg-amber-600"
                />
                <div className="text-xs text-muted-foreground text-right">
                  {category.percentage}% of total
                </div>
              </div>
            ))}
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={beneficiaryStats.categories} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#8b4513" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
