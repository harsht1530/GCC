import { useState, useMemo } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { people, Person } from "@/data/people";
import { companies, sectors, states, designations } from "@/data/companies";
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
import { useNavigate } from "react-router-dom";

const People = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [designationFilter, setDesignationFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique company names
  const companyNames = [...new Set(people.map(p => p.companyName))];

  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = companyFilter === "all" || p.companyName === companyFilter;
      
      // Map country to state filter
      const matchesState = stateFilter === "all" || 
        (stateFilter === "All India") ||
        (stateFilter === "Telangana" && p.countryLocation === "USA"); // Simplified mapping
      
      // Map role to designation
      const matchesDesignation = designationFilter === "all" || 
        p.role.includes(designationFilter) ||
        (designationFilter === "CXO" && (p.role === "CEO" || p.role === "CFO" || p.role === "CTO" || p.role.includes("Chief")));
      
      // Get company sector
      const company = companies.find(c => c.id === p.companyId);
      const matchesSector = sectorFilter === "all" || company?.area === sectorFilter;
      
      return matchesSearch && matchesCompany && matchesState && matchesDesignation && matchesSector;
    });
  }, [people, searchTerm, companyFilter, stateFilter, designationFilter, sectorFilter]);

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const paginatedPeople = filteredPeople.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            People & Leaders – GCC Champions
          </h1>
          <p className="text-muted-foreground mt-1">
            Key executives and decision makers for GCC opportunities
          </p>
        </div>

        {/* Filters */}
        <div className="data-table-container p-4 space-y-4">
          <div className="relative max-w-sm">
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

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Filters:</span>
            
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Companies</SelectItem>
                {companyNames.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All States</SelectItem>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={designationFilter} onValueChange={setDesignationFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Designations</SelectItem>
                {designations.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="data-table-container">
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
                        className="clickable-cell cursor-pointer text-primary hover:underline"
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
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
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
      </div>
    </MainLayout>
  );
};

export default People;
