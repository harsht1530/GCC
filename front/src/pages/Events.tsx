import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Bell, Mail, CheckCircle2 } from "lucide-react";

const upcomingEvents = [
  {
    id: "1",
    name: "Telangana GCC Summit 2025",
    location: "HICC, Hyderabad",
    date: "March 15-16, 2025",
    focusArea: "Global Capability Centers",
    status: "Upcoming",
  },
  {
    id: "2",
    name: "BioAsia 2025",
    location: "HICC, Hyderabad",
    date: "February 24-26, 2025",
    focusArea: "Life Sciences & Pharma",
    status: "Upcoming",
  },
  {
    id: "3",
    name: "Global Pharma Leadership Forum",
    location: "Delhi NCR",
    date: "April 10-11, 2025",
    focusArea: "Pharmaceutical Industry",
    status: "Upcoming",
  },
  {
    id: "4",
    name: "Healthcare Innovation Summit",
    location: "Bengaluru",
    date: "May 20, 2025",
    focusArea: "Digital Health & MedTech",
    status: "Upcoming",
  },
];

const signalOptions = [
  { id: "new-company", label: "New company added to database" },
  { id: "gcc-opportunity", label: "New GCC opportunity identified" },
  { id: "leader-added", label: "New leader or champion identified" },
  { id: "events", label: "Upcoming industry events" },
];

const Events = () => {
  const [email, setEmail] = useState("");
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSignalToggle = (signalId: string) => {
    setSelectedSignals((prev) =>
      prev.includes(signalId)
        ? prev.filter((id) => id !== signalId)
        : [...prev, signalId]
    );
  };

  const handleSubscribe = () => {
    if (email && selectedSignals.length > 0) {
      console.log("Subscribing:", { email, signals: selectedSignals });
      setIsSubscribed(true);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            GCC Events & Opportunity Signals
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with industry events and receive alerts on new GCC opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{event.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {event.focusArea}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Email Signals Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Email Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSubscribed ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Successfully Subscribed!
                  </h3>
                  <p className="text-muted-foreground">
                    You will receive email alerts for your selected signals at {email}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsSubscribed(false)}
                  >
                    Modify Preferences
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Select the signals you want to receive:
                    </p>
                    {signalOptions.map((signal) => (
                      <div
                        key={signal.id}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => handleSignalToggle(signal.id)}
                      >
                        <Checkbox
                          id={signal.id}
                          checked={selectedSignals.includes(signal.id)}
                          onCheckedChange={() => handleSignalToggle(signal.id)}
                        />
                        <label
                          htmlFor={signal.id}
                          className="text-sm font-medium cursor-pointer flex-1"
                        >
                          {signal.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Your Email Address
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSubscribe}
                    disabled={!email || selectedSignals.length === 0}
                    className="w-full gap-2"
                    size="lg"
                  >
                    <Mail className="h-4 w-4" />
                    Subscribe to GCC Opportunity Alerts
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    You can unsubscribe at any time. We respect your privacy.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Mail className="h-8 w-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Why Subscribe to Email Signals?
                </h3>
                <p className="text-muted-foreground text-sm">
                  Stay ahead of the competition by receiving instant notifications when new GCC 
                  opportunities are identified, new decision makers are added to our database, 
                  or when relevant industry events are announced. Our curated alerts help you 
                  focus on high-priority leads for Telangana's GCC ecosystem.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Events;
