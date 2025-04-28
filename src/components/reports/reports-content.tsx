import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Calendar,
  Download,
  FileSpreadsheet,
  File as FilePdf,
  Filter,
  Mail,
  RefreshCcw,
  Clock,
  Printer,
  Share2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Mock data for reports
const projectMetrics = {
  total: 45,
  active: 32,
  completed: 8,
  planned: 5,
  byStatus: [
    { name: "Active", value: 32, color: "#059669" },
    { name: "Completed", value: 8, color: "#0284c7" },
    { name: "Planned", value: 5, color: "#d97706" },
  ],
  byType: [
    { name: "Research", value: 20, color: "#8b4513" },
    { name: "Training", value: 15, color: "#d97706" },
    { name: "Innovation", value: 10, color: "#059669" },
  ],
  timeline: [
    { month: "Jan", projects: 38, completion: 82 },
    { month: "Feb", projects: 40, completion: 85 },
    { month: "Mar", projects: 42, completion: 87 },
    { month: "Apr", projects: 43, completion: 88 },
    { month: "May", projects: 44, completion: 90 },
    { month: "Jun", projects: 45, completion: 92 },
  ],
};

const partnerMetrics = {
  total: 28,
  active: 25,
  new: 3,
  byType: [
    { name: "Academic", value: 12, color: "#8b4513" },
    { name: "Research", value: 8, color: "#d97706" },
    { name: "Government", value: 5, color: "#059669" },
    { name: "NGO", value: 3, color: "#0284c7" },
  ],
  byCountry: [
    { name: "Uganda", value: 8, color: "#8b4513" },
    { name: "Kenya", value: 6, color: "#d97706" },
    { name: "Tanzania", value: 5, color: "#059669" },
    { name: "Rwanda", value: 4, color: "#0284c7" },
    { name: "Ethiopia", value: 3, color: "#6366f1" },
    { name: "Others", value: 2, color: "#a855f7" },
  ],
};

const impactMetrics = {
  beneficiaries: {
    total: 2500,
    categories: [
      { name: "Students", count: 1200, trend: "+15%" },
      { name: "Researchers", count: 600, trend: "+8%" },
      { name: "Farmers", count: 450, trend: "+12%" },
      { name: "Policy Makers", count: 250, trend: "+5%" },
    ],
  },
  publications: {
    total: 156,
    byType: [
      { name: "Research Papers", count: 85, status: "Published" },
      { name: "Policy Briefs", count: 35, status: "Published" },
      { name: "Case Studies", count: 25, status: "In Review" },
      { name: "Reports", count: 11, status: "Draft" },
    ],
  },
  funding: {
    total: 12500000,
    allocated: 9500000,
    remaining: 3000000,
    byCategory: [
      { name: "Research Grants", value: 5000000 },
      { name: "Capacity Building", value: 3000000 },
      { name: "Infrastructure", value: 2500000 },
      { name: "Administration", value: 2000000 },
    ],
  },
};

const reportTypes = [
  { value: "executive", label: "Executive Summary" },
  { value: "detailed", label: "Detailed Report" },
  { value: "impact", label: "Impact Assessment" },
  { value: "financial", label: "Financial Report" },
];

const periods = [
  { value: "2024-q1", label: "Q1 2024" },
  { value: "2024-q2", label: "Q2 2024" },
  { value: "2024-q3", label: "Q3 2024" },
  { value: "2024-q4", label: "Q4 2024" },
];

export function ReportsContent() {
  const [selectedReport, setSelectedReport] = useState("executive");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-q2");
  const [activeTab, setActiveTab] = useState("overview");

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(20);
    doc.text("RUFORUM Progress Report", 20, 20);

    // Add metadata
    doc.setFontSize(12);
    doc.text(`Report Type: ${selectedReport}`, 20, 35);
    doc.text(`Period: ${selectedPeriod}`, 20, 45);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);

    // Add project metrics
    doc.text("Project Metrics", 20, 70);
    autoTable(doc, {
      head: [["Metric", "Value"]],
      body: [
        ["Total Projects", projectMetrics.total],
        ["Active Projects", projectMetrics.active],
        ["Completed Projects", projectMetrics.completed],
        ["Planned Projects", projectMetrics.planned],
      ],
      startY: 75,
    });

    // Add impact metrics
    doc.text("Impact Metrics", 20, doc.lastAutoTable.finalY + 20);
    autoTable(doc, {
      head: [["Category", "Count", "Trend"]],
      body: impactMetrics.beneficiaries.categories.map((cat) => [
        cat.name,
        cat.count,
        cat.trend,
      ]),
      startY: doc.lastAutoTable.finalY + 25,
    });

    doc.save(`RUFORUM_Report_${selectedPeriod}.pdf`);
    toast.success("PDF report generated successfully!");
  };

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();

    // Projects worksheet
    const projectsWS = XLSX.utils.json_to_sheet([
      {
        total: projectMetrics.total,
        active: projectMetrics.active,
        completed: projectMetrics.completed,
        planned: projectMetrics.planned,
      },
    ]);
    XLSX.utils.book_append_sheet(wb, projectsWS, "Projects Overview");

    // Partners worksheet
    const partnersWS = XLSX.utils.json_to_sheet(partnerMetrics.byType);
    XLSX.utils.book_append_sheet(wb, partnersWS, "Partners");

    // Impact worksheet
    const impactWS = XLSX.utils.json_to_sheet(
      impactMetrics.beneficiaries.categories
    );
    XLSX.utils.book_append_sheet(wb, impactWS, "Impact Metrics");

    XLSX.writeFile(wb, `RUFORUM_Report_${selectedPeriod}.xlsx`);
    toast.success("Excel report generated successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ruforum-brown">Reports</h2>
          <p className="text-muted-foreground">
            Generate comprehensive reports and analytics across the RUFORUM
            network
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={generateExcel}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={generatePDF}
            >
              <FilePdf className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Report Summary</h3>
            <p className="text-sm text-muted-foreground">
              Generated on {new Date().toLocaleDateString()} at{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Auto-refresh every 30 minutes</span>
            </div>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print Preview
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 border-l-4 border-l-green-500">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {projectMetrics.total}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600"
                    >
                      +8%
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-l-4 border-l-blue-500">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Partners</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {partnerMetrics.total}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-600"
                    >
                      +12%
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-l-4 border-l-amber-500">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Beneficiaries</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {impactMetrics.beneficiaries.total}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-600"
                    >
                      +15%
                    </Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-l-4 border-l-purple-500">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Publications</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">
                      {impactMetrics.publications.total}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-600"
                    >
                      +10%
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">Project Timeline</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectMetrics.timeline}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="projects"
                        name="Total Projects"
                        stroke="#8b4513"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="completion"
                        name="Completion Rate"
                        stroke="#d97706"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Partner Distribution
                </h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={partnerMetrics.byType}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {partnerMetrics.byType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-6">Impact Overview</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h5 className="font-medium text-muted-foreground">
                    Beneficiary Categories
                  </h5>
                  {impactMetrics.beneficiaries.categories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.name}</span>
                        <span className="font-medium">{category.count}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Progress
                          value={
                            (category.count /
                              impactMetrics.beneficiaries.total) *
                            100
                          }
                          className="h-2 flex-1 mr-4"
                        />
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-600"
                        >
                          {category.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h5 className="font-medium text-muted-foreground">
                    Publication Status
                  </h5>
                  {impactMetrics.publications.byType.map((type) => (
                    <div key={type.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{type.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            type.status === "Published"
                              ? "bg-green-50 text-green-600"
                              : type.status === "In Review"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-blue-50 text-blue-600"
                          }
                        >
                          {type.status}
                        </Badge>
                      </div>
                      <Progress
                        value={
                          (type.count / impactMetrics.publications.total) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            {/* Projects specific content */}
          </TabsContent>

          <TabsContent value="partners">
            {/* Partners specific content */}
          </TabsContent>

          <TabsContent value="impact">
            {/* Impact specific content */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
