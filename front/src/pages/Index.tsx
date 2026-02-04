import { useMemo, useState, useEffect } from "react";
import { Building2, MapPin, MapPinOff, Target } from "lucide-react";

import { MainLayout } from "@/components/layout/MainLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { CompanyTable } from "@/components/dashboard/CompanyTable";
import { OnboardingPanel } from "@/components/dashboard/OnboardingPanel";
import {ChatbotPanel} from "@/components/dashboard/ChatbotPanel";


import { api } from "@/lib/api";
import { Filters } from "@/types/filters";
import { Company, FilterOptions } from "@/types/company";
  import { revenueBands }  from "@/data/companies"; 

/* =========================
   TYPES
========================= */
type DataSource = "fortune" | "main";

/* =========================
   INITIAL FILTER STATE
========================= */
const initialFilters: Filters = {
  search: "",
  country: "all",
  sector: "all",
  category: "all",
  revenueBand: "all",
  indiaPresence: "all",
  gccInIndia: "all",
  gccCity: "all",
};

const Index = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [dataSource, setDataSource] = useState<DataSource>("fortune");

  const [companies, setCompanies] = useState<Company[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const companiesRes =
          dataSource === "fortune"
            ? await api.get("/companies/fortune")
            : await api.get("/companies");

        const filtersRes = await api.get("/companies/filters");

   const mapped: Company[] = companiesRes.data.map((c: any, index: number) =>
  dataSource === "fortune"
    ? {
        id: c._id,
        name: c.company_name ?? "—",
        fortuneRank: c.fortune_rank ?? null,
        area: c.area ?? "—",
        category: c.category ?? "Others",
        country: c.country ?? "—",
        revenue2024: Number(c.revenue_2024 ?? 0),
        employees: c.employees ?? "—",
        indiaPresence: Boolean(c.india_presence),
        gccInIndia: Boolean(c.gcc_in_india),
        gccCity: Array.isArray(c.gcc_city) ? c.gcc_city : [],
        website: c.website ?? "#",
      }
    : {
        id: c._id,
        name: c["Company Name"] ?? "—",
        fortuneRank: null,

        // 🔥 EXACT gcc_main FIELD MAPPING
        country: c["Country"] ?? "—",
        revenue2024: Number(c["Revenue 2024 (USD B)"] ?? 0),
        marketCap: Number(c["Market Cap (USD B)"] ?? 0), // ✅ FIX
        area: c["Primary Area"] ?? "—",
        category: c["Category"] ?? "Others",
        employees: c["Employee"] ?? "—",
        indiaPresence: c["India Presence"] === "Yes",
        gccInIndia: c["GCC in India"] === "Yes",
        gccCity: c["GCC Cities"]
          ? String(c["GCC Cities"]).split(",").map((x: string) => x.trim())
          : [],
        hyderabadPresence: c["Hyderabad Presence"] === "Yes",

        website: "#",

        // 🔥 Preserve DB order
        __order: index,
      }
);
;


        setCompanies(mapped);
        setFilterOptions(filtersRes.data);
      } catch (err) {
        console.error("API Error:", err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dataSource]);

  /* =========================
     FILTERED COMPANIES
  ========================= */
  const filteredCompanies = useMemo(() => {
    let result =
  dataSource === "main"
    ? [...companies].sort(
        (a, b) => (a.__order ?? 0) - (b.__order ?? 0)
      )
    : [...companies];


    if (filters.country !== "all") {
      result = result.filter((c) => c.country === filters.country);
    }

    if (filters.sector !== "all") {
      result = result.filter((c) => c.area === filters.sector);
    }

    if (filters.category !== "all") {
      result = result.filter((c) => c.category === filters.category);
    }

    if (filters.revenueBand !== "all") {
      const band = revenueBands.find((b) => b.label === filters.revenueBand);
      if (band) {
        result = result.filter(
          (c) => c.revenue2024 >= band.min && c.revenue2024 < band.max
        );
      }
    }

    if (filters.indiaPresence !== "all") {
      result = result.filter(
        (c) => c.indiaPresence === (filters.indiaPresence === "yes")
      );
    }

    if (filters.gccInIndia !== "all") {
      result = result.filter(
        (c) => c.gccInIndia === (filters.gccInIndia === "yes")
      );
    }

    if (filters.gccCity !== "all") {
      result = result.filter((c) => c.gccCity.includes(filters.gccCity));
    }

    return result;
  }, [companies, filters]);

  /* =========================
     KPI COUNTS
  ========================= */
  const totalCompanies = filteredCompanies.length;
  const noIndiaPresence = filteredCompanies.filter((c) => !c.indiaPresence).length;
  const indiaNoHyd = filteredCompanies.filter(
    (c) => c.indiaPresence && !c.gccCity.includes("Hyderabad")
  ).length;
  const gccHyd = filteredCompanies.filter((c) =>
    c.gccCity.includes("Hyderabad")
  ).length;

  if (!filterOptions) {
  return <div className="p-6">Initializing filters...</div>;
}


  /* =========================
     RENDER
  ========================= */
  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-6">
        <OnboardingPanel />

        {/* KPI BAR */}
        {/* KPI BAR */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <KPICard
    title="Total Companies Shortlisted"
    value={totalCompanies}
    icon={Building2}
    variant="blue"
  />
  <KPICard
    title="Companies Without India Presence"
    value={noIndiaPresence}
    icon={MapPinOff}
    variant="orange"
  />
  <KPICard
    title="India Presence, No Hyderabad GCC"
    value={indiaNoHyd}
    icon={Target}
    variant="teal"
  />
  <KPICard
    title="Companies With GCC in Hyderabad"
    value={gccHyd}
    icon={MapPin}
    variant="green"
  />
</div>


        {/* FILTER BAR */}
        {/* FILTERS */}
<FilterBar
  filters={filters}
  filterOptions={filterOptions}
  activeCompanyList={dataSource}
  onFilterChange={(k, v) =>
    setFilters((p) => ({ ...p, [k]: v }))
  }
  onClearFilters={() => setFilters(initialFilters)}
  onCompanyListChange={(type) => {
  setDataSource(type);
  setFilters((prev) => ({
    ...prev,
    // only reset search + pagination related filters
    search: "",
    country: "all",
    sector: "all",
    revenueBand: "all",
    indiaPresence: "all",
    gccInIndia: "all",
    gccCity: "all",
    // ❗ category stays as user selected
  }));
}}

/>


{/* AI INSIGHTS – DATA AWARE */}
<ChatbotPanel companies={filteredCompanies} />

{/* TABLE */}
<CompanyTable
  companies={filteredCompanies}
  disableSorting={dataSource === "main"}
/>



        
      </div>
    </MainLayout>
  );
};

export default Index;
