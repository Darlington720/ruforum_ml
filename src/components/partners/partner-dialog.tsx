import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Building2,
  CalendarIcon,
  Globe2,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
} from "lucide-react";

interface PartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "view";
  partner?: any;
  onSave?: (partner: any) => void;
}

const partnerTypes = [
  "Academic Institution",
  "Research Organization",
  "Government Agency",
  "NGO",
  "Private Sector",
  "International Organization",
  "Funding Agency",
];

const sectors = [
  "Agriculture",
  "Education",
  "Health",
  "Technology",
  "Environment",
  "Social Development",
  "Economic Development",
];

export function PartnerDialog({
  open,
  onOpenChange,
  mode = "create",
  partner: initialPartner,
  onSave,
}: PartnerDialogProps) {
  const [partner, setPartner] = useState({
    name: "",
    type: "",
    sector: "",
    description: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    startDate: new Date(),
    contactPerson: {
      name: "",
      title: "",
      email: "",
      phone: "",
    },
    staff: {
      total: 0,
      researchers: 0,
      support: 0,
    },
    projects: [],
    agreements: [],
    status: "Active",
    ...(initialPartner || {}),
  });

  const handleSave = () => {
    if (onSave) {
      onSave(partner);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Partner" : partner.name}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new partner organization to the system."
              : "View or edit partner organization details"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Organization Details</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
            <TabsTrigger value="metrics">Metrics & Agreements</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organization Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={partner.name}
                    onChange={(e) =>
                      setPartner({ ...partner, name: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter organization name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={partner.type}
                  onValueChange={(value) =>
                    setPartner({ ...partner, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
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

              <div className="space-y-2">
                <Label>Sector</Label>
                <Select
                  value={partner.sector}
                  onValueChange={(value) =>
                    setPartner({ ...partner, sector: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={partner.website}
                    onChange={(e) =>
                      setPartner({ ...partner, website: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Partnership Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {partner.startDate ? (
                        format(partner.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={partner.startDate}
                      onSelect={(date) =>
                        setPartner({ ...partner, startDate: date })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={partner.status}
                  onValueChange={(value) =>
                    setPartner({ ...partner, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={partner.description}
                  onChange={(e) =>
                    setPartner({ ...partner, description: e.target.value })
                  }
                  placeholder="Enter organization description"
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={partner.email}
                    onChange={(e) =>
                      setPartner({ ...partner, email: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter organization email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={partner.phone}
                    onChange={(e) =>
                      setPartner({ ...partner, phone: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter organization phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Country</Label>
                <div className="relative">
                  <Globe2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={partner.country}
                    onChange={(e) =>
                      setPartner({ ...partner, country: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={partner.city}
                    onChange={(e) =>
                      setPartner({ ...partner, city: e.target.value })
                    }
                    className="pl-10"
                    placeholder="Enter city"
                  />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <Label>Address</Label>
                <Textarea
                  value={partner.address}
                  onChange={(e) =>
                    setPartner({ ...partner, address: e.target.value })
                  }
                  placeholder="Enter full address"
                />
              </div>

              <div className="col-span-2 space-y-4">
                <h3 className="font-medium">Primary Contact Person</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={partner.contactPerson.name}
                        onChange={(e) =>
                          setPartner({
                            ...partner,
                            contactPerson: {
                              ...partner.contactPerson,
                              name: e.target.value,
                            },
                          })
                        }
                        className="pl-10"
                        placeholder="Enter contact name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={partner.contactPerson.title}
                      onChange={(e) =>
                        setPartner({
                          ...partner,
                          contactPerson: {
                            ...partner.contactPerson,
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter job title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={partner.contactPerson.email}
                        onChange={(e) =>
                          setPartner({
                            ...partner,
                            contactPerson: {
                              ...partner.contactPerson,
                              email: e.target.value,
                            },
                          })
                        }
                        className="pl-10"
                        placeholder="Enter contact email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={partner.contactPerson.phone}
                        onChange={(e) =>
                          setPartner({
                            ...partner,
                            contactPerson: {
                              ...partner.contactPerson,
                              phone: e.target.value,
                            },
                          })
                        }
                        className="pl-10"
                        placeholder="Enter contact phone"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Staff Information</h3>
                <div className="space-y-2">
                  <Label>Total Staff</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={partner.staff.total}
                      onChange={(e) =>
                        setPartner({
                          ...partner,
                          staff: {
                            ...partner.staff,
                            total: parseInt(e.target.value),
                          },
                        })
                      }
                      className="pl-10"
                      placeholder="Enter total staff count"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Research Staff</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={partner.staff.researchers}
                      onChange={(e) =>
                        setPartner({
                          ...partner,
                          staff: {
                            ...partner.staff,
                            researchers: parseInt(e.target.value),
                          },
                        })
                      }
                      className="pl-10"
                      placeholder="Enter research staff count"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Support Staff</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={partner.staff.support}
                      onChange={(e) =>
                        setPartner({
                          ...partner,
                          staff: {
                            ...partner.staff,
                            support: parseInt(e.target.value),
                          },
                        })
                      }
                      className="pl-10"
                      placeholder="Enter support staff count"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {mode === "create" ? "Add Partner" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
