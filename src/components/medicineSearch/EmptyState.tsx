import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

const EmptyState = ({ isError }: { isError: boolean }) => {
  if (isError) {
    toast.error("No medicine found.");
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircleIcon className="h-12 w-12 text-muted-foreground mb-4 animate-bounce" />
        <h3 className="text-lg font-semibold mb-2">NO MEDICINE FOUND</h3>
        <p className="text-muted-foreground max-w-sm">
          Try searching for a different medicine.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <img src="/search.gif" className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Search for a Medicine</h3>
      <p className="text-muted-foreground max-w-sm">
        Enter a medicine name to get detailed information.
      </p>
    </div>
  );
};

export default EmptyState;
