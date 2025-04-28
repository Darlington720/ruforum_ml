import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  BarChart,
  Calendar,
  Clock,
  FileText,
  Link2,
  MapPin,
  Star,
  Users,
  Save,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface ProjectDialogProps {
  project?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "view";
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
  mode = "view",
}: ProjectDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ongoing",
    category: "training",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    progress: 45,
    budget: "150000",
    spent: "67500",
    team: "12",
    institution: "University of Nairobi",
    location: "Kenya",
    isPremium: true,
    tags: ["Education", "Training", "Innovation"],
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(formData.tags);

  const handleAddTag = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

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

  if (mode === "create") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new research or training project to the system
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
              <TabsTrigger value="budget">Budget & Team</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Project Title</label>
                  <Input
                    placeholder="e.g. Competence Based Learning Training Program"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Enter a detailed project description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="innovation">Innovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                    <Input
                      placeholder="Add tag and press Enter"
                      className="border-0 outline-none focus-visible:ring-0 w-[150px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="premium"
                    checked={formData.isPremium}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isPremium: checked })
                    }
                  />
                  <label
                    htmlFor="premium"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Premium Project
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Institution</label>
                    <Input
                      placeholder="e.g. University of Nairobi"
                      value={formData.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institution: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      placeholder="e.g. Kenya"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Progress (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        progress: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <Progress value={formData.progress} className="h-2" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="budget" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      Total Budget ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g. 150000"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">
                      Amount Spent ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g. 67500"
                      value={formData.spent}
                      onChange={(e) =>
                        setFormData({ ...formData, spent: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Team Size</label>
                  <Input
                    type="number"
                    placeholder="e.g. 12"
                    value={formData.team}
                    onChange={(e) =>
                      setFormData({ ...formData, team: e.target.value })
                    }
                  />
                </div>

                <Card className="p-4">
                  <h3 className="text-sm font-medium mb-2">Budget Overview</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        Budget Utilization
                      </span>
                      <span className="font-medium">
                        {(
                          (parseInt(formData.spent) /
                            parseInt(formData.budget)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (parseInt(formData.spent) / parseInt(formData.budget)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Save className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {project?.title}
            {project?.isPremium && (
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            )}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Project Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(project?.status)}
                    >
                      {project?.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getPriorityColor(project?.priority)}
                    >
                      {project?.priority}
                    </Badge>
                    <Badge variant="outline">{project?.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project?.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(project?.startDate).toLocaleDateString()} -{" "}
                      {new Date(project?.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {project?.institution}, {project?.location}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-2">Progress & Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Overall Progress
                      </span>
                      <span className="font-medium">{project?.progress}%</span>
                    </div>
                    <Progress value={project?.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        Budget Utilization
                      </p>
                      <p className="font-medium">
                        {((project?.spent / project?.budget) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Team Size</p>
                      <p className="font-medium">{project?.team} Members</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project?.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500" />
                  <div>
                    <p>Progress report submitted</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500" />
                  <div>
                    <p>New team member added</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500" />
                  <div>
                    <p>Budget allocation updated</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Team Members</h3>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-medium">Team Member {i + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          Research Team
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Budget Overview</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">
                      Total Budget
                    </p>
                    <p className="text-2xl font-bold text-ruforum-brown">
                      ${project?.budget.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="text-2xl font-bold text-amber-600">
                      ${project?.spent.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(project?.budget - project?.spent).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-ruforum-brown" />
                      <span>Research Equipment</span>
                    </div>
                    <span className="font-medium">$45,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-600" />
                      <span>Personnel</span>
                    </div>
                    <span className="font-medium">$80,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                      <span>Travel & Logistics</span>
                    </div>
                    <span className="font-medium">$25,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Project Documents</h3>
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Project Document {i + 1}</p>
                        <p className="text-xs text-muted-foreground">
                          Added 2 days ago • 2.5 MB
                        </p>
                      </div>
                    </div>
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
