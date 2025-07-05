import { Skeleton } from "@/components/ui/skeleton";
export default function ForecastSkelton() {
    return (
      <div className="Forecast_Skelton space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-8 w-8 rounded-full mx-auto" />
              <Skeleton className="h-4 w-8 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
} 