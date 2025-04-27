import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Filter,
  Search,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Tag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const upcomingActivities = [
  {
    id: 1,
    title: "Annual Research Symposium",
    date: "Dec 15, 2024",
    time: "09:00 AM - 05:00 PM",
    location: "Kampala, Uganda",
    type: "Conference",
    status: "Upcoming",
    participants: 150,
    completion: 75,
    description:
      "Annual gathering of researchers to present findings and network",
    tags: ["Research", "Networking", "Presentation"],
  },
  {
    id: 2,
    title: "Grant Writing Workshop",
    date: "Dec 20, 2024",
    time: "10:00 AM - 03:00 PM",
    location: "Nairobi, Kenya",
    type: "Workshop",
    status: "Upcoming",
    participants: 50,
    completion: 60,
    description: "Intensive workshop on writing successful grant proposals",
    tags: ["Training", "Grants", "Writing"],
  },
  {
    id: 3,
    title: "Agricultural Innovation Forum",
    date: "Jan 5, 2025",
    time: "08:30 AM - 04:30 PM",
    location: "Dar es Salaam, Tanzania",
    type: "Forum",
    status: "Planning",
    participants: 200,
    completion: 40,
    description: "Forum focusing on innovative agricultural practices",
    tags: ["Agriculture", "Innovation", "Technology"],
  },
];

const recentActivities = [
  {
    id: 4,
    title: "Research Methodology Training",
    date: "Nov 30, 2024",
    time: "09:00 AM - 04:00 PM",
    location: "Addis Ababa, Ethiopia",
    type: "Training",
    status: "Completed",
    participants: 75,
    completion: 100,
    description: "Training session on advanced research methodologies",
    tags: ["Research", "Training", "Methodology"],
  },
  {
    id: 5,
    title: "Policy Dialogue Meeting",
    date: "Nov 25, 2024",
    time: "02:00 PM - 05:00 PM",
    location: "Kigali, Rwanda",
    type: "Meeting",
    status: "Completed",
    participants: 30,
    completion: 100,
    description:
      "Strategic meeting with policy makers on agricultural policies",
    tags: ["Policy", "Dialogue", "Strategy"],
  },
];

function ActivityCard({ activity }: { activity: any }) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-ruforum-brown">
              {activity.title}
            </h4>
            <Badge
              variant="outline"
              className={
                activity.status === "Completed"
                  ? "bg-green-50 text-green-600 border-green-200"
                  : activity.status === "Upcoming"
                  ? "bg-amber-50 text-amber-600 border-amber-200"
                  : "bg-blue-50 text-blue-600 border-blue-200"
              }
            >
              {activity.status}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            {activity.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{activity.time}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{activity.participants} Participants</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {activity.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {activity.status !== "Completed" && (
        <div className="mt-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{activity.completion}%</span>
          </div>
          <Progress value={activity.completion} className="h-1" />
        </div>
      )}
    </Card>
  );
}

export function ActivityContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-ruforum-brown">
            Activity Management
          </h2>
          <p className="text-sm text-muted-foreground">
            Track and manage program activities
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search activities..." />
            </div>

            <Calendar mode="single" className="rounded-md border mt-4" />

            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-sm">Activity Types</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  All
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Conference
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Workshop
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Training
                </Badge>
                <Badge variant="outline" className="cursor-pointer">
                  Meeting
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ruforum-brown">
              Upcoming Activities
            </h3>
            <div className="space-y-4">
              {upcomingActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-ruforum-brown">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
