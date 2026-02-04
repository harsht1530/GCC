import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, User } from "lucide-react";
import { states, sectors } from "@/data/companies";

export function OnboardingPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    sector: "",
    linkedinUrl: "",
    notifyMe: false,
  });

  const handleSubmit = () => {
    console.log("Onboarding data:", formData);
    setIsExpanded(false);
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Tell us about you</span>
            <span className="text-sm text-muted-foreground">(optional, for personalized updates)</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input
              placeholder="Your Name (optional)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-background"
            />

            <Select
              value={formData.state}
              onValueChange={(v) => setFormData({ ...formData, state: v })}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {states.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.sector}
              onValueChange={(v) => setFormData({ ...formData, sector: v })}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Sector" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {sectors.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="LinkedIn Profile URL"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="bg-background"
            />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="notify"
                  checked={formData.notifyMe}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, notifyMe: checked as boolean })
                  }
                />
                <label htmlFor="notify" className="text-sm text-muted-foreground cursor-pointer">
                  Notify me about new opportunities
                </label>
              </div>
              <Button size="sm" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
