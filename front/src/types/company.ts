/* =========================
   COMPANY (UNIFIED MODEL)
========================= */
export interface Company {
  id: string;
  name: string;

  /* Fortune only */
  fortuneRank?: number;
  location?: string; // ✅ Fortune only (FIXES TS ERROR)

  /* Shared */
  area: string;              // Fortune: Area | gcc_main: Primary Area
  category: string;

  /* gcc_main specific */
  marketCap?: number;        // Market Cap (USD B)
  hyderabadPresence?: boolean;

  /* Country */
  country: string;

  /* Metrics */
  revenue2024: number;
  employees: string | number;

  /* India / GCC */
  indiaPresence: boolean;
  gccInIndia: boolean;
  gccCity: string[];

  /* Optional */
  website: string;

  /* 🔥 DB order (gcc_main only) */
  __order?: number;
}

/* =========================
   FILTER OPTIONS
========================= */
export interface FilterOptions {
  countries: string[];
  areas: string[];
  categories: string[]; // NON-Pharma categories only
  gccCities: string[];
}
