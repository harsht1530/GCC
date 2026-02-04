import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import { Filters } from "@/types/filters";
import { FilterOptions } from "@/types/company";

/* =========================
   TYPES
========================= */
interface FilterBarProps {
  filters: Filters;
  filterOptions: FilterOptions;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
  onCompanyListChange: (type: "fortune" | "main") => void;
  activeCompanyList: "fortune" | "main";
}

/* =========================
   COMPONENT
========================= */
export function FilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  onCompanyListChange,
  activeCompanyList,
}: FilterBarProps) {
  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "search" && value !== "all"
  );

  const {
    countries = [],
    areas = [],
    categories = [],
    gccCities = [],
  } = filterOptions || {};

  const PHARMA = "Pharma";
  const otherCategories = categories.filter(
    (c) => c && c !== PHARMA
  );

  const activeBtn = (active: boolean) =>
    active
      ? "bg-[#9C49A7] text-white hover:bg-[#8a3f94]"
      : "hover:bg-muted";

  return (
    <div className="animate-fade-in space-y-4 border rounded-lg p-4">
      {/* =========================
         COMPANY LIST TABS
      ========================= */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Select Company List:
        </span>

        {/* Fortune */}
        <Button
          size="sm"
          variant="outline"
          className={activeBtn(activeCompanyList === "fortune")}
          onClick={() => {
            onCompanyListChange("fortune");
            onFilterChange("category", "all");
          }}
        >
          Fortune List
        </Button>

        {/* Top 300 Pharma */}
        <Button
          size="sm"
          variant="outline"
          className={activeBtn(
            activeCompanyList === "main" &&
              filters.category === PHARMA
          )}
          onClick={() => {
            onCompanyListChange("main");
            onFilterChange("category", PHARMA);
          }}
        >
          Top 300 Pharma
        </Button>

        {/* Others Dropdown */}
        <Select
          value={
            activeCompanyList === "main" &&
            filters.category !== "all" &&
            filters.category !== PHARMA
              ? filters.category
              : ""
          }
          onValueChange={(v) => {
            onCompanyListChange("main");
            onFilterChange("category", v);
          }}
        >
          <SelectTrigger
            className={`w-[150px] ${activeBtn(
              activeCompanyList === "main" &&
                filters.category !== "all" &&
                filters.category !== PHARMA
            )}`}
          >
            <SelectValue placeholder="Others" />
          </SelectTrigger>
          <SelectContent>
            {otherCategories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* =========================
         FILTERS
      ========================= */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select
          value={filters.country}
          onValueChange={(v) => onFilterChange("country", v)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sector}
          onValueChange={(v) => onFilterChange("sector", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {areas.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.indiaPresence}
          onValueChange={(v) => onFilterChange("indiaPresence", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="India Presence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.gccInIndia}
          onValueChange={(v) => onFilterChange("gccInIndia", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="GCC in India" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.gccCity}
          onValueChange={(v) => onFilterChange("gccCity", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="GCC City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All GCC Cities</SelectItem>
            {gccCities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
