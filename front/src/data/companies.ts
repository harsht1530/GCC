export interface Company {
  id: string;
  name: string;
  fortuneRank: number;
  area: string;
  location: string;
  country: string;
  revenue2024: number;
  employees: number;
  indiaPresence: boolean;
  gccInIndia: boolean;
  gccCity: string[];
  keyFocusAreas: string[];
  website: string;
}

export const companies: Company[] = [
  {
    id: "1",
    name: "UnitedHealth Group",
    fortuneRank: 5,
    area: "Payers",
    location: "Minnetonka, MN",
    country: "USA",
    revenue2024: 400.28,
    employees: 440000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Hyderabad"],
    keyFocusAreas: ["Health Insurance", "Healthcare Services", "Digital Health"],
    website: "https://www.unitedhealthgroup.com"
  },
  {
    id: "2",
    name: "CVS Health",
    fortuneRank: 6,
    area: "Payers",
    location: "Woonsocket, RI",
    country: "USA",
    revenue2024: 372.81,
    employees: 300000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Bengaluru"],
    keyFocusAreas: ["Pharmacy", "Health Insurance", "Retail Healthcare"],
    website: "https://www.cvshealth.com"
  },
  {
    id: "3",
    name: "McKesson Corporation",
    fortuneRank: 9,
    area: "Pharmacy/Distribution",
    location: "Irving, TX",
    country: "USA",
    revenue2024: 308.95,
    employees: 51000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Bengaluru"],
    keyFocusAreas: ["Pharmaceutical Distribution", "Medical Supplies", "Healthcare IT"],
    website: "https://www.mckesson.com"
  },
  {
    id: "4",
    name: "Johnson & Johnson",
    fortuneRank: 42,
    area: "Pharma",
    location: "New Brunswick, NJ",
    country: "USA",
    revenue2024: 88.82,
    employees: 152000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Bengaluru", "Hyderabad"],
    keyFocusAreas: ["Pharmaceuticals", "Medical Devices", "Consumer Health"],
    website: "https://www.jnj.com"
  },
  {
    id: "5",
    name: "HCA Healthcare",
    fortuneRank: 68,
    area: "Providers",
    location: "Nashville, TN",
    country: "USA",
    revenue2024: 70.6,
    employees: 309000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Hyderabad"],
    keyFocusAreas: ["Hospitals", "Ambulatory Surgery", "Emergency Care"],
    website: "https://www.hcahealthcare.com"
  },
  {
    id: "6",
    name: "Pfizer",
    fortuneRank: 85,
    area: "Pharma",
    location: "New York, NY",
    country: "USA",
    revenue2024: 63.63,
    employees: 88000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Chennai"],
    keyFocusAreas: ["Vaccines", "Oncology", "Immunology"],
    website: "https://www.pfizer.com"
  },
  {
    id: "7",
    name: "AbbVie",
    fortuneRank: 94,
    area: "Pharma",
    location: "North Chicago, IL",
    country: "USA",
    revenue2024: 56.33,
    employees: 50000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Bengaluru"],
    keyFocusAreas: ["Immunology", "Oncology", "Neuroscience"],
    website: "https://www.abbvie.com"
  },
  {
    id: "8",
    name: "Eli Lilly and Company",
    fortuneRank: 108,
    area: "Pharma",
    location: "Indianapolis, IN",
    country: "USA",
    revenue2024: 45.04,
    employees: 43000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Bengaluru", "Hyderabad"],
    keyFocusAreas: ["Diabetes", "Oncology", "Neuroscience"],
    website: "https://www.lilly.com"
  },
  {
    id: "9",
    name: "Roche Holding AG",
    fortuneRank: 112,
    area: "Pharma",
    location: "Basel",
    country: "Switzerland",
    revenue2024: 62.8,
    employees: 101000,
    indiaPresence: true,
    gccInIndia: false,
    gccCity: [],
    keyFocusAreas: ["Oncology", "Diagnostics", "Immunology"],
    website: "https://www.roche.com"
  },
  {
    id: "10",
    name: "Novartis AG",
    fortuneRank: 125,
    area: "Pharma",
    location: "Basel",
    country: "Switzerland",
    revenue2024: 52.4,
    employees: 108000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Mumbai"],
    keyFocusAreas: ["Ophthalmology", "Immunology", "Oncology"],
    website: "https://www.novartis.com"
  },
  {
    id: "11",
    name: "AstraZeneca PLC",
    fortuneRank: 135,
    area: "Pharma",
    location: "Cambridge",
    country: "UK",
    revenue2024: 45.8,
    employees: 89000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Chennai"],
    keyFocusAreas: ["Oncology", "Respiratory", "Cardiovascular"],
    website: "https://www.astrazeneca.com"
  },
  {
    id: "12",
    name: "Novo Nordisk",
    fortuneRank: 142,
    area: "Pharma",
    location: "Bagsværd",
    country: "Denmark",
    revenue2024: 33.7,
    employees: 64000,
    indiaPresence: true,
    gccInIndia: true,
    gccCity: ["Bengaluru"],
    keyFocusAreas: ["Diabetes", "Obesity", "Hemophilia"],
    website: "https://www.novonordisk.com"
  },
  {
    id: "13",
    name: "Sanofi",
    fortuneRank: 148,
    area: "Pharma",
    location: "Paris",
    country: "France",
    revenue2024: 47.3,
    employees: 91000,
    indiaPresence: true,
    gccInIndia: false,
    gccCity: [],
    keyFocusAreas: ["Vaccines", "Rare Diseases", "Immunology"],
    website: "https://www.sanofi.com"
  },
  {
    id: "14",
    name: "Merck & Co.",
    fortuneRank: 72,
    area: "Pharma",
    location: "Rahway, NJ",
    country: "USA",
    revenue2024: 60.1,
    employees: 69000,
    indiaPresence: false,
    gccInIndia: false,
    gccCity: [],
    keyFocusAreas: ["Oncology", "Vaccines", "Infectious Diseases"],
    website: "https://www.merck.com"
  },
  {
    id: "15",
    name: "Bristol-Myers Squibb",
    fortuneRank: 95,
    area: "Pharma",
    location: "Princeton, NJ",
    country: "USA",
    revenue2024: 48.2,
    employees: 34000,
    indiaPresence: false,
    gccInIndia: false,
    gccCity: [],
    keyFocusAreas: ["Oncology", "Hematology", "Immunology"],
    website: "https://www.bms.com"
  },
];

export const sectors = [
  "Pharma",
  "Payers",
  "Providers",
  "Pharmacy/Distribution",
  "MedTech",
  "Diagnostics",
  "Biotech"
];

// Keep areas for backward compatibility
export const areas = sectors;

export const countries = ["USA", "UK", "Switzerland", "Germany", "France", "Denmark", "Japan", "China"];

export const gccCities = ["Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Pune", "Gurugram", "Noida"];

export const states = ["All India", "Telangana", "Karnataka", "Maharashtra", "Tamil Nadu", "Other"];

export const designations = ["CXO", "EVP", "SVP", "VP", "Director", "Manager"];

export const domainExperts = ["Healthcare IT", "Clinical Research", "Supply Chain", "Digital Health", "Data Analytics"];

export const revenueBands = [
  { label: "$500M+", min: 0.5, max: 1 },
  { label: "$1B+", min: 1, max: 5 },
  { label: "$5B+", min: 5, max: 10 },
  { label: "$10B+", min: 10, max: 50 },
  { label: "$50B+", min: 50, max: Infinity },
];
