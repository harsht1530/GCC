export interface Person {
  id: string;
  companyId: string;
  companyName: string;
  name: string;
  role: string;
  department: string;
  countryLocation: string;
  linkedinUrl: string;
  email: string;
  education: string;
  facebookUrl?: string;
  notes: string;
}

export const people: Person[] = [
  {
    id: "1",
    companyId: "1",
    companyName: "UnitedHealth Group",
    name: "Andrew Witty",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/andrew-witty",
    email: "andrew.witty@uhg.com",
    education: "University of Nottingham",
    notes: "Former GSK CEO, strong interest in India expansion"
  },
  {
    id: "2",
    companyId: "1",
    companyName: "UnitedHealth Group",
    name: "Sandeep Dadlani",
    role: "Chief Digital Officer",
    department: "Technology",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/sandeep-dadlani",
    email: "sandeep.dadlani@uhg.com",
    education: "IIT Delhi, Stanford MBA",
    notes: "Telugu Champion - Strong Hyderabad connections"
  },
  {
    id: "3",
    companyId: "4",
    companyName: "Johnson & Johnson",
    name: "Joaquin Duato",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/joaquin-duato",
    email: "jduato@jnj.com",
    education: "ESADE Business School",
    notes: "Expanded J&J India operations significantly"
  },
  {
    id: "4",
    companyId: "6",
    companyName: "Pfizer",
    name: "Albert Bourla",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/albert-bourla",
    email: "albert.bourla@pfizer.com",
    education: "Aristotle University, MBA",
    notes: "Open to India GCC expansion discussions"
  },
  {
    id: "5",
    companyId: "5",
    companyName: "HCA Healthcare",
    name: "Sam Hazen",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/sam-hazen",
    email: "sam.hazen@hcahealthcare.com",
    education: "Baylor University",
    notes: "Led Hyderabad GCC establishment"
  },
  {
    id: "6",
    companyId: "8",
    companyName: "Eli Lilly and Company",
    name: "David Ricks",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/david-ricks",
    email: "david.ricks@lilly.com",
    education: "Purdue University, MBA Indiana",
    notes: "Strong advocate for India R&D capabilities"
  },
  {
    id: "7",
    companyId: "14",
    companyName: "Merck & Co.",
    name: "Robert Davis",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "USA",
    linkedinUrl: "https://linkedin.com/in/robert-davis-merck",
    email: "robert.davis@merck.com",
    education: "Villanova, Columbia MBA",
    notes: "Key target - No India presence currently"
  },
  {
    id: "8",
    companyId: "9",
    companyName: "Roche Holding AG",
    name: "Thomas Schinecker",
    role: "CEO",
    department: "Executive Leadership",
    countryLocation: "Switzerland",
    linkedinUrl: "https://linkedin.com/in/thomas-schinecker",
    email: "thomas.schinecker@roche.com",
    education: "University of Basel",
    notes: "GCC opportunity - Has India presence but no GCC"
  },
];

export const roles = [
  "CEO",
  "CFO",
  "CTO",
  "Chief Digital Officer",
  "Chief Medical Officer",
  "VP Engineering",
  "VP Operations",
  "Country Head",
  "Regional Director"
];

export const departments = [
  "Executive Leadership",
  "Technology",
  "Finance",
  "Operations",
  "R&D",
  "Commercial",
  "Medical Affairs"
];
