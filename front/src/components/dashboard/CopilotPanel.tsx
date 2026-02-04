import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

/* =========================
   TYPES
========================= */
interface CopilotPanelProps {
  activeMode: "fortune" | "pharma" | "other";
  otherCategories: string[];
  onSelect: (mode: "fortune" | "pharma" | "other", category?: string) => void;
}

/* =========================
   COMPONENT
========================= */
export function CopilotPanel({
  activeMode,
  otherCategories,
  onSelect,
}: CopilotPanelProps) {
  const activeClass = "bg-[#9C49A7] text-white hover:bg-[#8a3f94]";
  const inactiveClass = "bg-muted text-foreground hover:bg-muted/80";

  return (
    <Card className="border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Select Company List</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-3">
          {/* Fortune */}
          <Button
            variant="outline"
            className={activeMode === "fortune" ? activeClass : inactiveClass}
            onClick={() => onSelect("fortune")}
          >
            Fortune List
          </Button>

          {/* Pharma */}
          <Button
            variant="outline"
            className={activeMode === "pharma" ? activeClass : inactiveClass}
            onClick={() => onSelect("pharma")}
          >
            Top 300 Pharma
          </Button>

          {/* Others */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={
                  activeMode === "other" ? activeClass : inactiveClass
                }
              >
                Others <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {otherCategories.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => onSelect("other", cat)}
                >
                  {cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
