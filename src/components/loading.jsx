import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    // <div className="flex flex-col space-y-3">
    //   <Skeleton className="h-31.25 w-62.5 rounded-xl" />
    // </div>
    <div className="container mx-auto px-6 py-8">
      <Skeleton className="h-40 w-full rounded-xl" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
        <Skeleton className="h-50 w-full rounded-xl" />
        <Skeleton className="h-50 w-full rounded-xl" />
        <Skeleton className="h-50 w-full rounded-xl" />
      </div>

      <div className="container mx-auto mb-8">
        <Skeleton className="h-100 w-full rounded-xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-100 w-full rounded-xl" />
        <Skeleton className="h-100 w-full rounded-xl" />
        <Skeleton className="h-100 w-full rounded-xl" />
        <Skeleton className="h-100 w-full rounded-xl" />
      </div>
    </div>
  );
}
