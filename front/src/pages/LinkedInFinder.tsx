import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companies } from "@/data/companies";
import { ExternalLink, Linkedin, User, Building2, MapPin, Briefcase } from "lucide-react";

const roles = ["CXO", "GCC Head", "Digital Leader", "VP Engineering", "Country Head"];
const locations = ["USA", "India", "UK", "Switzerland", "Germany"];

// Sample LinkedIn profile data for demonstration
const sampleProfiles = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Chief Digital Officer",
    company: "UnitedHealth Group",
    location: "Minneapolis, USA",
    linkedinUrl: "https://linkedin.com/in/sarah-johnson",
    avatar: "SJ",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "GCC Head - India",
    company: "Johnson & Johnson",
    location: "Hyderabad, India",
    linkedinUrl: "https://linkedin.com/in/rajesh-kumar",
    avatar: "RK",
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "VP Global Technology",
    company: "Pfizer",
    location: "New York, USA",
    linkedinUrl: "https://linkedin.com/in/michael-chen",
    avatar: "MC",
  },
];

const LinkedInFinder = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            LinkedIn Contact Finder
          </h1>
          <p className="text-muted-foreground mt-1">
            Discover and reach key decision makers and GCC champions
          </p>
        </div>

        {/* Search Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-[#0077B5]" />
              Find LinkedIn Profiles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Select Company
                </label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {companies.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Select Role
                </label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {roles.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Select Location
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Choose a location" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {locations.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSearch} className="gap-2">
              <Linkedin className="h-4 w-4" />
              Search LinkedIn Profiles
            </Button>
          </CardContent>
        </Card>

        {/* Sample Results */}
        {showResults && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Sample Profile Results</h2>
              <span className="text-sm text-muted-foreground">
                Sample profiles shown for demonstration
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleProfiles.map((profile) => (
                <Card key={profile.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {profile.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {profile.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Briefcase className="h-3 w-3" />
                          {profile.role}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          {profile.company}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {profile.location}
                        </div>
                      </div>
                    </div>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md bg-[#0077B5] text-white hover:bg-[#006396] transition-colors text-sm font-medium"
                    >
                      <Linkedin className="h-4 w-4" />
                      View on LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50 border-dashed">
              <CardContent className="p-4 text-center text-muted-foreground">
                <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  This is a demonstration of the LinkedIn contact discovery workflow.
                  <br />
                  No automated scraping or data collection is performed.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Workflow Guide */}
        {!showResults && (
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">1. Select Company</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a target company from our shortlisted GCC opportunities
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">2. Select Role</h3>
                  <p className="text-sm text-muted-foreground">
                    Filter by decision-maker roles like CXO, GCC Head, or Digital Leader
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">3. Discover Profiles</h3>
                  <p className="text-sm text-muted-foreground">
                    View sample LinkedIn profiles to identify engagement targets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default LinkedInFinder;
