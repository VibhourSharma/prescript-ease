import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader } from "lucide-react";
import MedicineDetails from "./MedicineDetails";
import EmptyState from "./EmptyState";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "sonner";

const MedicineSearch: React.FC = () => {
  const [query, setQuery] = useState("");

  // Set up the TanStack Query hook
  const {
    data: medicine,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["medicineSearch", query],
    queryFn: async () => {
      if (!query.trim()) return null;

      const input = query.trim();

      const genericSearch = fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(
          input
        )}"&limit=1`
      );

      const substanceSearch = fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.substance_name:"${encodeURIComponent(
          input
        )}"&limit=1`
      );

      const brandSearch = fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(
          input
        )}"&limit=1`
      );

      try {
        const results = await Promise.race([
          genericSearch,
          substanceSearch,
          brandSearch,
        ]);

        if (!results.ok) throw new Error("Medicine not found");

        const data = await results.json();
        const item = data.results[0];

        return {
          name: item.openfda?.brand_name?.[0] || input,
          dontUse:
            item.do_not_use?.[0] ||
            item.warnings_and_cautions?.[0] ||
            item.warnings?.[0] ||
            "_",
          dosage: item?.dosage_and_administration?.[0] || "_",
          usage: item.indications_and_usage?.[0] || "_",
          sideEffects: item.adverse_reactions?.[0] || item.stop_use?.[0] || "_",
          pregnancyInfo:
            item.pregnancy_or_breast_feeding?.[0] || item.pregnancy?.[0] || "_",
        };
      } catch (err) {
        console.error("API call failed:", err);
        throw new Error("Medicine not found");
      }
    },
    enabled: false,
  });

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error("Please enter a medicine name.");
      return;
    }
    refetch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <Header />
      <section className="py-24 pt-32 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Medicine Information
            </h2>
            <p className="text-lg text-muted-foreground">
              Search for detailed information about medicines, including usage &
              safety guidelines.
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
              disabled={isLoading}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Search
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-lg font-medium animate-pulse text-gray-500">
                Searching for medicine information...
              </p>
            </div>
          ) : medicine ? (
            <MedicineDetails medicine={medicine} />
          ) : (
            <EmptyState isError={isError} />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MedicineSearch;
