import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types/company";

interface ChatbotPanelProps {
  companies: Company[];
}

export function ChatbotPanel({ companies }: ChatbotPanelProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = () => {
    if (!query.trim()) return;

    const q = query.toLowerCase();

    const total = companies.length;
    const indiaCount = companies.filter(c => c.indiaPresence).length;
    const noIndiaCount = companies.filter(c => !c.indiaPresence).length;
    const gccCount = companies.filter(c => c.gccInIndia).length;
    const hydGccCount = companies.filter(c =>
      c.gccCity?.includes("Hyderabad")
    ).length;

    // 🔍 INTENT MATCHING
    if (q.includes("how many") && q.includes("india")) {
      setResponse(
        `${indiaCount} companies in the current selection have presence in India.`
      );
      return;
    }

    if (q.includes("gcc") && q.includes("hyderabad")) {
      setResponse(
        `${hydGccCount} companies have GCCs in Hyderabad.`
      );
      return;
    }

    if (q.includes("gcc")) {
      setResponse(
        `${gccCount} companies have GCC presence in India.`
      );
      return;
    }

    if (q.includes("without india")) {
      setResponse(
        `${noIndiaCount} companies do not have presence in India.`
      );
      return;
    }

    if (q.includes("total") || q.includes("how many companies")) {
      setResponse(
        `There are ${total} companies in the current filtered list.`
      );
      return;
    }

    // ❓ FALLBACK
    setResponse(
      "Try asking about India presence, GCCs, Hyderabad, or total company counts."
    );
  };

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Ask AI about selected companies
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* INPUT */}
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="e.g. How many companies in India?"
            className="pr-12 h-11 rounded-full"
          />

          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
            onClick={handleAsk}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* RESPONSE */}
        {response && (
          <div className="text-sm bg-muted rounded-lg p-3">
            {response}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
