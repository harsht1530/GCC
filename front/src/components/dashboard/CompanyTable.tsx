import { Company } from "@/types/company";
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
  ArrowUpDown,
  ExternalLink,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ================================
   Helpers
================================ */

const formatNumber = (value?: number) =>
  typeof value === "number" ? value.toFixed(2) : "—";

const normalizeArray = (value?: string[] | string) =>
  Array.isArray(value) ? value : [];

/* ================================
   Props
================================ */

interface CompanyTableProps {
  companies: Company[];
  onDownload?: () => void;
  disableSorting?: boolean; // true = gcc_main
}

type SortKey = keyof Company;
type SortOrder = "asc" | "desc";

/* ================================
   Component
================================ */

export function CompanyTable({
  companies,
  onDownload,
  disableSorting = false,
}: CompanyTableProps) {
  const navigate = useNavigate();

  const showRank = companies.some((c) => c.fortuneRank !== null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("fortuneRank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    if (disableSorting) {
      setSortKey("fortuneRank");
      setSortOrder("asc");
    }
  }, [disableSorting]);

  const handleSort = (key: SortKey) => {
    if (disableSorting) return;

    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  /* ================================
     FILTER + SORT
  ================================ */
  const processedCompanies = useMemo(() => {
    let result = companies;

    if (searchTerm) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (disableSorting) return result;

    return [...result].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [companies, searchTerm, sortKey, sortOrder, disableSorting]);

  const totalPages = Math.ceil(processedCompanies.length / itemsPerPage);

  const paginatedCompanies = processedCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortableHeader = ({
    label,
    sortKeyName,
  }: {
    label: string;
    sortKeyName: SortKey;
  }) =>
    disableSorting ? (
      <span className="font-semibold">{label}</span>
    ) : (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 font-semibold hover:bg-transparent"
        onClick={() => handleSort(sortKeyName)}
      >
        {label}
        <ArrowUpDown className="ml-1 h-3 w-3" />
      </Button>
    );

  /* ================================
     Render
  ================================ */
  return (
    <div className="data-table-container">
      {/* Search */}
      <div className="p-4 border-b flex justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
          <Input
            placeholder="Search company name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        {onDownload && (
          <Button onClick={onDownload} variant="outline">
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {disableSorting ? (
              /* ===== gcc_main HEADER (EXACT DB ORDER) ===== */
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Revenue 2024 (USD B)</TableHead>
                <TableHead>Market Cap (USD B)</TableHead>
                <TableHead>Primary Area</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>India Presence</TableHead>
                <TableHead>GCC in India</TableHead>
                <TableHead>GCC Cities</TableHead>
                <TableHead>Hyderabad Presence</TableHead>
              </TableRow>
            ) : (
              /* ===== Fortune HEADER (UNCHANGED) ===== */
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>
                  <SortableHeader label="Company Name" sortKeyName="name" />
                </TableHead>
                {showRank && (
                  <TableHead>
                    <SortableHeader label="Rank" sortKeyName="fortuneRank" />
                  </TableHead>
                )}
                <TableHead>Area</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Revenue ($B)</TableHead>
                <TableHead className="text-right">Employees</TableHead>
                <TableHead>India</TableHead>
                <TableHead>GCC India</TableHead>
                <TableHead>GCC City</TableHead>
                <TableHead>Web</TableHead>
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {paginatedCompanies.map((company, idx) =>
              disableSorting ? (
                /* ===== gcc_main ROW ===== */
                <TableRow key={company.id}>
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.country}</TableCell>
                  <TableCell>{formatNumber(company.revenue2024)}</TableCell>
                  <TableCell>{formatNumber(company.marketCap)}</TableCell>
                  <TableCell>{company.area}</TableCell>
                  <TableCell>{company.category}</TableCell>
                  <TableCell>{company.employees}</TableCell>
                  <TableCell>{company.indiaPresence ? "Yes" : "No"}</TableCell>
                  <TableCell>{company.gccInIndia ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {normalizeArray(company.gccCity).join(", ") || "—"}
                  </TableCell>
                  <TableCell>
                    {company.gccCity.includes("Hyderabad") ? "Yes" : "No"}
                  </TableCell>
                </TableRow>
              ) : (
                /* ===== Fortune ROW ===== */
                <TableRow
                  key={company.id}
                  onClick={() => navigate(`/company/${company.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    {(currentPage - 1) * itemsPerPage + idx + 1}
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  {showRank && (
                    <TableCell>{company.fortuneRank ?? "—"}</TableCell>
                  )}
                  <TableCell>{company.area}</TableCell>
                  <TableCell>{company.category}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>{company.country}</TableCell>
                  <TableCell className="text-right">
                    ${formatNumber(company.revenue2024)}
                  </TableCell>
                  <TableCell className="text-right">
                    {company.employees}
                  </TableCell>
                  <TableCell>{company.indiaPresence ? "Yes" : "No"}</TableCell>
                  <TableCell>{company.gccInIndia ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {normalizeArray(company.gccCity).join(", ") || "—"}
                  </TableCell>
                  <TableCell>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between p-4">
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </Button>
          <Button
            size="sm"
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
