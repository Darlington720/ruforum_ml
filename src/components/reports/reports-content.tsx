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
  AreaChart,
  Area,
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
  ChevronDown,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  BookOpen,
  GraduationCap,
  Building,
  Target,
  Award,
  Briefcase,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Table as TableIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Comprehensive mock data for reports
const reportData = {
  overview: {
    totalProjects: 45,
    activeProjects: 32,
    completedProjects: 8,
    plannedProjects: 5,
    totalBeneficiaries: 2500,
    totalPartners: 28,
    totalPublications: 156,
    totalFunding: 12500000,
    metrics: [
      {
        title: "Project Success Rate",
        value: "85%",
        change: "+5%",
        status: "increase",
      },
      {
        title: "Research Impact",
        value: "4.8/5",
        change: "+0.3",
        status: "increase",
      },
      {
        title: "Beneficiary Growth",
        value: "2,500",
        change: "+12%",
        status: "increase",
      },
      {
        title: "Publication Output",
        value: "156",
        change: "-3%",
        status: "decrease",
      },
    ],
  },
  projects: {
    byStatus: [
      { name: "Active", value: 32, color: "#10b981" },
      { name: "Completed", value: 8, color: "#6366f1" },
      { name: "Planned", value: 5, color: "#f59e0b" },
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
    recentProjects: [
      {
        name: "Agricultural Innovation Research",
        status: "Active",
        progress: 75,
        budget: 250000,
        start: "2024-01-15",
        end: "2024-12-31",
      },
      {
        name: "Climate Change Adaptation Study",
        status: "Completed",
        progress: 100,
        budget: 180000,
        start: "2023-06-01",
        end: "2024-01-31",
      },
      {
        name: "Sustainable Farming Practices",
        status: "Active",
        progress: 60,
        budget: 300000,
        start: "2024-02-01",
        end: "2025-01-31",
      },
    ],
  },
  beneficiaries: {
    categories: [
      { name: "Students", count: 1200, trend: "+15%", color: "#8b4513" },
      { name: "Researchers", count: 600, trend: "+8%", color: "#d97706" },
      { name: "Farmers", count: 450, trend: "+12%", color: "#059669" },
      { name: "Policy Makers", count: 250, trend: "+5%", color: "#6366f1" },
    ],
    demographics: [
      { age: "18-24", count: 800 },
      { age: "25-34", count: 1000 },
      { age: "35-44", count: 400 },
      { age: "45-54", count: 200 },
      { age: "55+", count: 100 },
    ],
    genderDistribution: [
      { name: "Male", value: 55, color: "#8b4513" },
      { name: "Female", value: 45, color: "#d97706" },
    ],
    countryDistribution: [
      { name: "Uganda", value: 800 },
      { name: "Kenya", value: 600 },
      { name: "Tanzania", value: 500 },
      { name: "Rwanda", value: 400 },
      { name: "Ethiopia", value: 200 },
    ],
  },
  publications: {
    types: [
      { name: "Research Papers", count: 85, status: "Published" },
      { name: "Policy Briefs", count: 35, status: "Published" },
      { name: "Case Studies", count: 25, status: "In Review" },
      { name: "Reports", count: 11, status: "Draft" },
    ],
    timeline: [
      { month: "Jan", papers: 12, citations: 45 },
      { month: "Feb", papers: 15, citations: 52 },
      { month: "Mar", papers: 18, citations: 60 },
      { month: "Apr", papers: 22, citations: 75 },
      { month: "May", papers: 25, citations: 85 },
      { month: "Jun", papers: 30, citations: 95 },
    ],
    impactMetrics: [
      { metric: "Citations", value: 1250, change: "+15%" },
      { metric: "Downloads", value: 3500, change: "+22%" },
      { metric: "Media Mentions", value: 85, change: "+8%" },
    ],
  },
  financial: {
    overview: {
      totalBudget: 12500000,
      allocated: 9500000,
      spent: 7500000,
      remaining: 5000000,
    },
    categories: [
      { name: "Research Grants", value: 5000000 },
      { name: "Capacity Building", value: 3000000 },
      { name: "Infrastructure", value: 2500000 },
      { name: "Administration", value: 2000000 },
    ],
    monthlySpending: [
      { month: "Jan", planned: 800000, actual: 750000 },
      { month: "Feb", planned: 900000, actual: 880000 },
      { month: "Mar", planned: 1000000, actual: 950000 },
      { month: "Apr", planned: 950000, actual: 900000 },
      { month: "May", planned: 1100000, actual: 1050000 },
      { month: "Jun", planned: 1200000, actual: 1150000 },
    ],
  },
};

const reportTypes = [
  { value: "executive", label: "Executive Summary" },
  { value: "detailed", label: "Detailed Report" },
  { value: "impact", label: "Impact Assessment" },
  { value: "financial", label: "Financial Report" },
  { value: "project", label: "Project Status" },
  { value: "beneficiary", label: "Beneficiary Analysis" },
  { value: "publication", label: "Publication Metrics" },
];

const periods = [
  { value: "2024-q1", label: "Q1 2024" },
  { value: "2024-q2", label: "Q2 2024" },
  { value: "2024-q3", label: "Q3 2024" },
  { value: "2024-q4", label: "Q4 2024" },
  { value: "2024-full", label: "Full Year 2024" },
  { value: "custom", label: "Custom Range" },
];

const visualizations = [
  { value: "chart", label: "Charts", icon: BarChart3 },
  { value: "table", label: "Tables", icon: TableIcon },
];

export function ReportsContent() {
  const [selectedReport, setSelectedReport] = useState("executive");
  const [selectedPeriod, setSelectedPeriod] = useState("2024-q2");
  const [activeTab, setActiveTab] = useState("overview");
  const [visualization, setVisualization] = useState("chart");
  const [searchTerm, setSearchTerm] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const generatePDF = () => {
    setIsExporting(true);
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(20);
    doc.text("RUFORUM Progress Report", 20, 20);

    // Add metadata
    doc.setFontSize(12);
    doc.text(`Report Type: ${selectedReport}`, 20, 35);
    doc.text(`Period: ${selectedPeriod}`, 20, 45);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);

    // Add overview metrics
    doc.text("Overview Metrics", 20, 70);
    autoTable(doc, {
      head: [["Metric", "Value", "Change"]],
      body: reportData.overview.metrics.map((metric) => [
        metric.title,
        metric.value,
        metric.change,
      ]),
      startY: 75,
    });

    // Add project statistics
    doc.text("Project Statistics", 20, doc.lastAutoTable.finalY + 20);
    autoTable(doc, {
      head: [["Category", "Count"]],
      body: [
        ["Total Projects", reportData.overview.totalProjects],
        ["Active Projects", reportData.overview.activeProjects],
        ["Completed Projects", reportData.overview.completedProjects],
        ["Planned Projects", reportData.overview.plannedProjects],
      ],
      startY: doc.lastAutoTable.finalY + 25,
    });

    // Add beneficiary statistics
    doc.text("Beneficiary Statistics", 20, doc.lastAutoTable.finalY + 20);
    autoTable(doc, {
      head: [["Category", "Count", "Trend"]],
      body: reportData.beneficiaries.categories.map((cat) => [
        cat.name,
        cat.count,
        cat.trend,
      ]),
      startY: doc.lastAutoTable.finalY + 25,
    });

    // Add financial summary
    doc.text("Financial Summary", 20, doc.lastAutoTable.finalY + 20);
    autoTable(doc, {
      head: [["Category", "Amount ($)"]],
      body: [
        [
          "Total Budget",
          reportData.financial.overview.totalBudget.toLocaleString(),
        ],
        ["Allocated", reportData.financial.overview.allocated.toLocaleString()],
        ["Spent", reportData.financial.overview.spent.toLocaleString()],
        ["Remaining", reportData.financial.overview.remaining.toLocaleString()],
      ],
      startY: doc.lastAutoTable.finalY + 25,
    });

    doc.save(`RUFORUM_Report_${selectedPeriod}.pdf`);
    setIsExporting(false);
    toast.success("PDF report generated successfully!");
  };

  const generateExcel = () => {
    setIsExporting(true);
    const wb = XLSX.utils.book_new();

    // Overview sheet
    const overviewData = [
      ["Metric", "Value", "Change"],
      ...reportData.overview.metrics.map((metric) => [
        metric.title,
        metric.value,
        metric.change,
      ]),
    ];
    const overviewWS = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, overviewWS, "Overview");

    // Projects sheet
    const projectsData = [
      [
        "Project Name",
        "Status",
        "Progress",
        "Budget",
        "Start Date",
        "End Date",
      ],
      ...reportData.projects.recentProjects.map((project) => [
        project.name,
        project.status,
        `${project.progress}%`,
        project.budget,
        project.start,
        project.end,
      ]),
    ];
    const projectsWS = XLSX.utils.aoa_to_sheet(projectsData);
    XLSX.utils.book_append_sheet(wb, projectsWS, "Projects");

    // Beneficiaries sheet
    const beneficiariesData = [
      ["Category", "Count", "Trend"],
      ...reportData.beneficiaries.categories.map((cat) => [
        cat.name,
        cat.count,
        cat.trend,
      ]),
    ];
    const beneficiariesWS = XLSX.utils.aoa_to_sheet(beneficiariesData);
    XLSX.utils.book_append_sheet(wb, beneficiariesWS, "Beneficiaries");

    // Financial sheet
    const financialData = [
      ["Category", "Amount"],
      ...reportData.financial.categories.map((cat) => [cat.name, cat.value]),
    ];
    const financialWS = XLSX.utils.aoa_to_sheet(financialData);
    XLSX.utils.book_append_sheet(wb, financialWS, "Financial");

    XLSX.writeFile(wb, `RUFORUM_Report_${selectedPeriod}.xlsx`);
    setIsExporting(false);
    toast.success("Excel report generated successfully!");
  };

  const sendReportByEmail = () => {
    toast.success("Report sent successfully to registered email addresses!");
  };

  const shareReport = () => {
    toast.success("Report link copied to clipboard!");
  };

  const printReport = () => {
    window.print();
    toast.success("Report sent to printer!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-9 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
              disabled={isExporting}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={generatePDF}
              disabled={isExporting}
            >
              <FilePdf className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={sendReportByEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
              onClick={shareReport}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-200 hover:bg-gray-50"
              onClick={printReport}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
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
            <Select value={visualization} onValueChange={setVisualization}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="View as" />
              </SelectTrigger>
              <SelectContent>
                {visualizations.map((vis) => (
                  <SelectItem key={vis.value} value={vis.value}>
                    <div className="flex items-center gap-2">
                      <vis.icon className="h-4 w-4" />
                      <span>{vis.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-4 gap-4">
                {reportData.overview.metrics.map((metric, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {metric.title}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">
                          {metric.value}
                        </span>
                        <Badge
                          variant="outline"
                          className={
                            metric.status === "increase"
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-600"
                          }
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Project Status Distribution
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportData.projects.byStatus}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {reportData.projects.byStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Beneficiary Growth Trend
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={reportData.projects.timeline}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="projects"
                          name="Total Projects"
                          stroke="#8b4513"
                          fill="#8b4513"
                          fillOpacity={0.1}
                        />
                        <Area
                          type="monotone"
                          dataKey="completion"
                          name="Completion Rate"
                          stroke="#d97706"
                          fill="#d97706"
                          fillOpacity={0.1}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              {/* Recent Activities Table */}
              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Recent Project Activities
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Timeline</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.projects.recentProjects.map(
                      (project, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {project.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                project.status === "Active"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-blue-50 text-blue-600"
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress
                                value={project.progress}
                                className="h-2"
                              />
                              <span className="text-sm text-muted-foreground">
                                {project.progress}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            ${project.budget.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                {new Date(project.start).toLocaleDateString()}
                              </div>
                              <div className="text-muted-foreground">
                                to {new Date(project.end).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Projects
                      </p>
                      <p className="text-2xl font-bold">
                        {reportData.overview.totalProjects}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Active Projects
                      </p>
                      <p className="text-2xl font-bold">
                        {reportData.overview.activeProjects}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Award className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">
                        {reportData.overview.completedProjects}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Planned</p>
                      <p className="text-2xl font-bold">
                        {reportData.overview.plannedProjects}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Project Distribution by Type
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.projects.byType}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill="#8b4513"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Project Completion Trends
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reportData.projects.timeline}>
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
              </div>

              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Project Details</h4>
                  <Input
                    placeholder="Search projects..."
                    className="w-[300px]"
                  />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Timeline</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.projects.recentProjects.map(
                      (project, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {project.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                project.status === "Active"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-blue-50 text-blue-600"
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress
                                value={project.progress}
                                className="h-2"
                              />
                              <span className="text-sm text-muted-foreground">
                                {project.progress}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            ${project.budget.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                {new Date(project.start).toLocaleDateString()}
                              </div>
                              <div className="text-muted-foreground">
                                to {new Date(project.end).toLocaleDateString()}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="beneficiaries">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportData.beneficiaries.categories.map((category, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-full"
                        style={{ backgroundColor: `${category.color}15` }}
                      >
                        <Users
                          className="h-6 w-6"
                          style={{ color: category.color }}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {category.name}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">
                            {category.count.toLocaleString()}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600"
                          >
                            {category.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Beneficiary Demographics
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.beneficiaries.demographics}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                          dataKey="count"
                          fill="#8b4513"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Gender Distribution
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportData.beneficiaries.genderDistribution}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {reportData.beneficiaries.genderDistribution.map(
                            (entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            )
                          )}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Geographical Distribution
                </h4>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={reportData.beneficiaries.countryDistribution}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#8b4513"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="publications">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportData.publications.impactMetrics.map((metric, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-100 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {metric.metric}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">
                            {metric.value.toLocaleString()}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600"
                          >
                            {metric.change}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Publication Trends
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reportData.publications.timeline}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="papers"
                          name="Publications"
                          stroke="#8b4513"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="citations"
                          name="Citations"
                          stroke="#d97706"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Publication Types
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportData.publications.types}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {reportData.publications.types.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                ["#8b4513", "#d97706", "#059669", "#6366f1"][
                                  index
                                ]
                              }
                            />
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
                <h4 className="text-lg font-semibold mb-4">
                  Publication Status
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.publications.types.map((type, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {type.name}
                        </TableCell>
                        <TableCell>{type.count}</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Total Budget
                    </p>
                    <p className="text-2xl font-bold">
                      $
                      {reportData.financial.overview.totalBudget.toLocaleString()}
                    </p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Allocated</p>
                    <p className="text-2xl font-bold">
                      $
                      {reportData.financial.overview.allocated.toLocaleString()}
                    </p>
                    <Progress
                      value={
                        (reportData.financial.overview.allocated /
                          reportData.financial.overview.totalBudget) *
                        100
                      }
                      className="h-1"
                    />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="text-2xl font-bold">
                      ${reportData.financial.overview.spent.toLocaleString()}
                    </p>
                    <Progress
                      value={
                        (reportData.financial.overview.spent /
                          reportData.financial.overview.totalBudget) *
                        100
                      }
                      className="h-1"
                    />
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold">
                      $
                      {reportData.financial.overview.remaining.toLocaleString()}
                    </p>
                    <Progress
                      value={
                        (reportData.financial.overview.remaining /
                          reportData.financial.overview.totalBudget) *
                        100
                      }
                      className="h-1"
                    />
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Budget Allocation
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={reportData.financial.categories}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {reportData.financial.categories.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  ["#8b4513", "#d97706", "#059669", "#6366f1"][
                                    index
                                  ]
                                }
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">
                    Monthly Spending
                  </h4>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.financial.monthlySpending}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="planned"
                          name="Planned"
                          fill="#8b4513"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="actual"
                          name="Actual"
                          fill="#d97706"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="text-lg font-semibold mb-4">
                  Budget Categories
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Allocation</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.financial.categories.map((category, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell>
                          ${category.value.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={
                                (category.value /
                                  reportData.financial.overview.totalBudget) *
                                100
                              }
                              className="h-2 w-[100px]"
                            />
                            <span>
                              {(
                                (category.value /
                                  reportData.financial.overview.totalBudget) *
                                100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
