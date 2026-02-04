import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Building2, MapPin, Users, Globe, DollarSign } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeopleTable } from "@/components/dashboard/PeopleTable";
import { companies } from "@/data/companies";
import { people } from "@/data/people";

const CompanyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const company = companies.find((c) => c.id === id);
  const companyPeople = people.filter((p) => p.companyId === id);

  if (!company) {
    return (
      <MainLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Company not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Companies
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Companies
        </Button>

        {/* Company Header */}
        <div className="bg-card rounded-lg border shadow-sm p-6 animate-fade-in">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {company.name}
                  </h1>
                  <span className="chip text-sm font-medium">
                    Fortune #{company.fortuneRank}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <span className="chip">{company.area}</span>
                  <span>•</span>
                  <span>{company.location}, {company.country}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue 2024</p>
                    <p className="font-semibold">${company.revenue2024.toFixed(2)}B</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Employees</p>
                    <p className="font-semibold">{company.employees.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Headquarters</p>
                    <p className="font-semibold">{company.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* India Presence Section */}
        <div className="bg-card rounded-lg border shadow-sm p-6 animate-fade-in">
          <h2 className="text-lg font-semibold mb-4">India Presence Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">India Presence</p>
              <span className={company.indiaPresence ? "pill-yes" : "pill-no"}>
                {company.indiaPresence ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">GCC in India</p>
              <span className={company.gccInIndia ? "pill-yes" : "pill-no"}>
                {company.gccInIndia ? "Yes" : "No"}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">GCC City (India)</p>
              {company.gccCity.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {company.gccCity.map((city) => (
                    <span key={city} className="chip">{city}</span>
                  ))}
                </div>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-2">Key Focus Areas</p>
            <div className="flex flex-wrap gap-2">
              {company.keyFocusAreas.map((area) => (
                <span key={area} className="chip">{area}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs for People / Notes */}
        <Tabs defaultValue="people" className="animate-fade-in">
          <TabsList className="bg-muted">
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              People / Leaders
            </TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="people" className="mt-4">
            {companyPeople.length > 0 ? (
              <PeopleTable people={companyPeople} />
            ) : (
              <div className="bg-card rounded-lg border p-8 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No leaders identified for this company yet</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <div className="bg-card rounded-lg border p-6">
              <p className="text-muted-foreground text-sm">
                No notes available for this company.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CompanyDetail;
