import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Calendar,
  Clock,
  FileText,
  Link2,
  MapPin,
  Star,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProjectDialogProps {
  project: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {project.title}
            {project.isPremium && (
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
                      className={getStatusColor(project.status)}
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(project.startDate).toLocaleDateString()} -{" "}
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {project.institution}, {project.location}
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
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">
                        Budget Utilization
                      </p>
                      <p className="font-medium">
                        {((project.spent / project.budget) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Team Size</p>
                      <p className="font-medium">{project.team} Members</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Recent Activity</h3>
              <div className="space-y-2">
                {/* Mock activity feed */}
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500" />
                  <div>
                    <p>Progress report submitted by John Doe</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500" />
                  <div>
                    <p>New team member added: Sarah Smith</p>
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
              {/* Mock team members list */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">
                          Research Lead
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
                      ${project.budget.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Spent</p>
                    <p className="text-2xl font-bold text-amber-600">
                      ${project.spent.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">Remaining</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(project.budget - project.spent).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Mock budget breakdown */}
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
              {/* Mock documents list */}
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Project Proposal.pdf</p>
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
