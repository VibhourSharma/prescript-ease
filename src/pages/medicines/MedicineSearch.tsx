import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MedicineDetails from "./MedicineDetails";
import EmptyState from "./EmptyState";
import { searchMedicine } from "./mockData";

const MedicineSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a medicine name",
        description: "Type the name of the medicine you want to search for.",
        variant: "destructive",
      });
      return;
    }

    const result = searchMedicine(query);
    setMedicine(result);
    setHasSearched(true);

    if (!result) {
      toast({
        title: "Medicine not found",
        description:
          "Please check the spelling or try searching for another medicine.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Medicine Information
          </h2>
          <p className="text-lg text-muted-foreground">
            Search for detailed information about medicines, including usage,
            alternatives, and safety guidelines.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="Enter medicine name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {medicine ? (
          <MedicineDetails medicine={medicine} />
        ) : (
          <EmptyState hasSearched={hasSearched} />
        )}
      </div>
    </section>
  );
};

export default MedicineSearch;
