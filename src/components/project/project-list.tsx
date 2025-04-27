import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  Link2,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Tags,
  Users,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectDialog } from "./project-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const projects = [
  {
    id: 1,
    title: "Competence Based Learning Training Program",
    description:
      "Enhancing teaching methodologies through competency-based approaches",
    status: "Ongoing",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    progress: 45,
    budget: 150000,
    spent: 67500,
    team: 12,
    category: "Training",
    priority: "High",
    tags: ["Education", "Training", "Innovation"],
    institution: "University of Nairobi",
    location: "Kenya",
    isPremium: true,
  },
  {
    id: 2,
    title: "Agricultural Innovation Research Initiative",
    description:
      "Developing sustainable farming practices for small-scale farmers",
    status: "Planning",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    progress: 15,
    budget: 280000,
    spent: 42000,
    team: 18,
    category: "Research",
    priority: "Medium",
    tags: ["Agriculture", "Research", "Sustainability"],
    institution: "Makerere University",
    location: "Uganda",
    isPremium: true,
  },
  {
    id: 3,
    title: "Climate Change Adaptation Study",
    description: "Researching climate resilience in East African agriculture",
    status: "Completed",
    startDate: "2023-06-01",
    endDate: "2024-01-31",
    progress: 100,
    budget: 200000,
    spent: 195000,
    team: 15,
    category: "Research",
    priority: "High",
    tags: ["Climate", "Research", "Agriculture"],
    institution: "University of Dar es Salaam",
    location: "Tanzania",
    isPremium: true,
  },
];

const categories = ["All", "Research", "Training", "Innovation", "Policy"];
const priorities = ["All", "High", "Medium", "Low"];
const institutions = [
  "All",
  "University of Nairobi",
  "Makerere University",
  "University of Dar es Salaam",
];

function ProjectCard({ project }: { project: any }) {
  const [showDialog, setShowDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "completed":
        return "bg-green-50 text-green-600 border-green-200";
      case "planning":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-600 border-red-200";
      case "medium":
        return "bg-orange-50 text-orange-600 border-orange-200";
      case "low":
        return "bg-green-50 text-green-600 border-green-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <>
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="space-y-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-ruforum-brown">
                    {project.title}
                  </h3>
                  {project.isPremium && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.description}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowDialog(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Project
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={getStatusColor(project.status)}
                >
                  {project.status}
                </Badge>
                <Badge
                  variant="outline"
                  className={getPriorityColor(project.priority)}
                >
                  {project.priority}
                </Badge>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="font-medium">
                  ${project.budget.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Spent</p>
                <p className="font-medium">${project.spent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Team</p>
                <p className="font-medium">{project.team} Members</p>
              </div>
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{project.category}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {project.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <ProjectDialog
        project={project}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [filters, setFilters] = useState({
    category: "All",
    priority: "All",
    institution: "All",
  });

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      selectedTab === "all" || project.status.toLowerCase() === selectedTab;
    const matchesCategory =
      filters.category === "All" || project.category === filters.category;
    const matchesPriority =
      filters.priority === "All" || project.priority === filters.priority;
    const matchesInstitution =
      filters.institution === "All" ||
      project.institution === filters.institution;

    return (
      matchesSearch &&
      matchesTab &&
      matchesCategory &&
      matchesPriority &&
      matchesInstitution
    );
  });

  const handleCreateProject = () => {
    toast.success("Project created successfully!");
    setShowNewProject(false);
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Projects</h2>
        <p className="text-muted-foreground">
          Manage and track all your research projects
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                onClick={() => setShowNewProject(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {showFilters && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilters({
                    category: "All",
                    priority: "All",
                    institution: "All",
                  });
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    setFilters({ ...filters, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={filters.priority}
                  onValueChange={(value) =>
                    setFilters({ ...filters, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Institution</label>
                <Select
                  value={filters.institution}
                  onValueChange={(value) =>
                    setFilters({ ...filters, institution: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    {institutions.map((institution) => (
                      <SelectItem key={institution} value={institution}>
                        {institution}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all" className="flex-1 md:flex-none">
              All
            </TabsTrigger>
            <TabsTrigger value="ongoing" className="flex-1 md:flex-none">
              Ongoing
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex-1 md:flex-none">
              Planning
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1 md:flex-none">
              Completed
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <Dialog open={showNewProject} onOpenChange={setShowNewProject}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new research or training project to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title</label>
              <Input placeholder="Enter project title" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Enter project description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProject(false)}>
              Cancel
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
