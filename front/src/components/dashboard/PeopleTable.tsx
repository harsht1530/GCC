import { Person } from "@/data/people";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { roles, departments } from "@/data/people";
import { countries } from "@/data/companies";

interface PeopleTableProps {
  people: Person[];
}

export function PeopleTable({ people }: PeopleTableProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || p.role === roleFilter;
      const matchesCountry = countryFilter === "all" || p.countryLocation === countryFilter;
      return matchesSearch && matchesRole && matchesCountry;
    });
  }, [people, searchTerm, roleFilter, countryFilter]);

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const paginatedPeople = filteredPeople.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="data-table-container animate-fade-in">
      {/* Filters */}
      <div className="p-4 border-b flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[160px] bg-background">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-[140px] bg-background">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-14 font-semibold">S.No</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Leader Name</TableHead>
              <TableHead className="font-semibold">Role / Title</TableHead>
              <TableHead className="font-semibold">Department</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">LinkedIn</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Education</TableHead>
              <TableHead className="font-semibold">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPeople.map((person, idx) => (
              <TableRow key={person.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="text-muted-foreground">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </TableCell>
                <TableCell>
                  <span
                    className="clickable-cell cursor-pointer"
                    onClick={() => navigate(`/company/${person.companyId}`)}
                  >
                    {person.companyName}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{person.name}</TableCell>
                <TableCell>
                  <span className="chip">{person.role}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{person.department}</TableCell>
                <TableCell>{person.countryLocation}</TableCell>
                <TableCell>
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm"
                  >
                    <ExternalLink className="h-3 w-3" />
                    LinkedIn
                  </a>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{person.email}</TableCell>
                <TableCell className="text-sm max-w-32 truncate" title={person.education}>
                  {person.education}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-48 truncate" title={person.notes}>
                  {person.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredPeople.length)} of{" "}
          {filteredPeople.length} people
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-2">
            {currentPage} / {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
