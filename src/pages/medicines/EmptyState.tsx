import { Pill } from "lucide-react";

const EmptyState = ({ hasSearched }: { hasSearched: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {hasSearched ? (
        <>
          <Pill className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Medicine Found</h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn't find the medicine you're looking for. Please check the
            spelling or try searching for another medicine.
          </p>
        </>
      ) : (
        <>
          <img
            src="/search.gif"
            className="h-12 w-12 text-muted-foreground mb-4"
          />
          <h3 className="text-lg font-semibold mb-2">Search for a Medicine</h3>
          <p className="text-muted-foreground max-w-sm">
            Enter a medicine name to get detailed information about its usage,
            alternatives, and safety guidelines.
          </p>
        </>
      )}
    </div>
  );
};

export default EmptyState;
