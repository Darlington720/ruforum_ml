import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Settings2,
  Tags,
  Trash2,
  Users2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data for partner types and countries
const partnerTypes = [
  "Academic Institution",
  "Research Center",
  "Government Agency",
  "NGO",
  "Private Sector",
  "International Organization",
];

const countries = [
  "Uganda",
  "Kenya",
  "Tanzania",
  "Rwanda",
  "Ethiopia",
  "Sudan",
  "South Sudan",
  "Burundi",
  "DR Congo",
];

// Mock data for existing partners
const initialPartners = [
  {
    id: 1,
    name: "Makerere University",
    type: "Academic Institution",
    country: "Uganda",
    website: "https://www.mak.ac.ug",
    email: "info@mak.ac.ug",
    phone: "+256-414-531-441",
    address: "University Rd, Kampala",
    description:
      "Leading research institution in East Africa focusing on agricultural innovation and sustainable development.",
    projects: 12,
    researchers: 150,
    publications: 45,
    partnerships: 8,
  },
  {
    id: 2,
    name: "East African Agricultural Research Institute",
    type: "Research Center",
    country: "Tanzania",
    website: "https://www.eaari.org",
    email: "contact@eaari.org",
    phone: "+255-123-456-789",
    address: "Research Avenue, Dar es Salaam",
    description:
      "Regional research center dedicated to improving agricultural practices and food security in East Africa.",
    projects: 8,
    researchers: 75,
    publications: 28,
    partnerships: 5,
  },
  {
    id: 3,
    name: "African Development Solutions",
    type: "NGO",
    country: "Kenya",
    website: "https://www.ads.org",
    email: "info@ads.org",
    phone: "+254-789-012-345",
    address: "Development Plaza, Nairobi",
    description:
      "Non-profit organization working to promote sustainable agricultural practices and rural development.",
    projects: 15,
    researchers: 45,
    publications: 12,
    partnerships: 10,
  },
];

interface Partner {
  id: number;
  name: string;
  type: string;
  country: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  projects: number;
  researchers: number;
  publications: number;
  partnerships: number;
}

interface PartnerCardProps {
  partner: Partner;
  onEdit: (partner: Partner) => void;
  onDelete: (id: number) => void;
}

function PartnerCard({ partner, onEdit, onDelete }: PartnerCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-amber-600">
      <div className="flex justify-between items-start">
        <div className="space-y-4 flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-ruforum-brown">
                {partner.name}
              </h3>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200"
              >
                {partner.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {partner.description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-600"
              >
                Website
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${partner.email}`}
                className="hover:text-amber-600"
              >
                {partner.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{partner.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{partner.country}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 pt-4 border-t">
            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center cursor-help">
                  <div className="text-2xl font-bold text-amber-600">
                    {partner.projects}
                  </div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Active Projects</h4>
                  <p className="text-sm text-muted-foreground">
                    Currently involved in {partner.projects} research and
                    development projects.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center cursor-help">
                  <div className="text-2xl font-bold text-amber-600">
                    {partner.researchers}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Researchers
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Research Team</h4>
                  <p className="text-sm text-muted-foreground">
                    A team of {partner.researchers} dedicated researchers and
                    support staff.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center cursor-help">
                  <div className="text-2xl font-bold text-amber-600">
                    {partner.publications}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Publications
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Research Output</h4>
                  <p className="text-sm text-muted-foreground">
                    Published {partner.publications} research papers and
                    reports.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <div className="text-center cursor-help">
                  <div className="text-2xl font-bold text-amber-600">
                    {partner.partnerships}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Partnerships
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Collaborations</h4>
                  <p className="text-sm text-muted-foreground">
                    Actively collaborating with {partner.partnerships} other
                    institutions.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-amber-600 border-amber-200 hover:bg-amber-50"
            onClick={() => onEdit(partner)}
          >
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => onDelete(partner.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function PartnerList() {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPartner, setShowNewPartner] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    country: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || partner.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreatePartner = () => {
    const newPartner = {
      id: partners.length + 1,
      ...formData,
      projects: Math.floor(Math.random() * 10) + 5,
      researchers: Math.floor(Math.random() * 100) + 20,
      publications: Math.floor(Math.random() * 30) + 10,
      partnerships: Math.floor(Math.random() * 8) + 3,
    };

    setPartners([...partners, newPartner]);
    setShowNewPartner(false);
    setFormData({
      name: "",
      type: "",
      country: "",
      website: "",
      email: "",
      phone: "",
      address: "",
      description: "",
    });
    toast.success("Partner organization added successfully!");
  };

  const handleEditPartner = () => {
    if (!editingPartner) return;

    const updatedPartners = partners.map((partner) =>
      partner.id === editingPartner.id
        ? { ...editingPartner, ...formData }
        : partner
    );

    setPartners(updatedPartners);
    setEditingPartner(null);
    toast.success("Partner information updated successfully!");
  };

  const handleDeletePartner = (id: number) => {
    const updatedPartners = partners.filter((partner) => partner.id !== id);
    setPartners(updatedPartners);
    setDeleteConfirm(null);
    toast.success("Partner organization removed successfully!");
  };

  const openEditDialog = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      type: partner.type,
      country: partner.country,
      website: partner.website,
      email: partner.email,
      phone: partner.phone,
      address: partner.address,
      description: partner.description,
    });
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Partner Organizations</h2>
        <p className="text-muted-foreground">
          Manage and track partnerships across the RUFORUM network
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto flex gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {partnerTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white w-full md:w-auto"
            onClick={() => setShowNewPartner(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Partner Organization
          </Button>
        </div>

        <div className="grid gap-6">
          {filteredPartners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onEdit={openEditDialog}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={showNewPartner || !!editingPartner}
        onOpenChange={(open) => {
          if (!open) {
            setShowNewPartner(false);
            setEditingPartner(null);
            setFormData({
              name: "",
              type: "",
              country: "",
              website: "",
              email: "",
              phone: "",
              address: "",
              description: "",
            });
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingPartner ? "Edit Partner" : "Add Partner Organization"}
            </DialogTitle>
            <DialogDescription>
              {editingPartner
                ? "Update the partner organization's information in the system."
                : "Add a new partner organization to the RUFORUM network."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization Name</label>
                <Input
                  placeholder="Enter organization name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {partnerTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData({ ...formData, country: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website</label>
                <Input
                  placeholder="Enter website URL"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input
                placeholder="Enter physical address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter organization description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowNewPartner(false);
                setEditingPartner(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={editingPartner ? handleEditPartner : handleCreatePartner}
            >
              {editingPartner ? "Update Partner" : "Add Partner"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteConfirm !== null}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              partner organization and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                deleteConfirm && handleDeletePartner(deleteConfirm)
              }
            >
              Delete Partner
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
