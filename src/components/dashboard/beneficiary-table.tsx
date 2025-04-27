import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BENEFICIARIES } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function BeneficiaryTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-xs font-semibold text-muted-foreground">NAME</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground">CATEGORY</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground">INSTITUTION</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground">COUNTRY</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground">STATUS</TableHead>
            <TableHead className="text-xs font-semibold text-muted-foreground">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BENEFICIARIES.map((beneficiary) => (
            <TableRow key={beneficiary.id}>
              <TableCell className="font-medium">{beneficiary.name}</TableCell>
              <TableCell>{beneficiary.category}</TableCell>
              <TableCell>{beneficiary.institution}</TableCell>
              <TableCell>{beneficiary.country}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "px-2 py-0.5 text-xs",
                    beneficiary.status === 'Active' 
                      ? "bg-green-50 text-green-600 border-green-200" 
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  )}
                >
                  {beneficiary.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}