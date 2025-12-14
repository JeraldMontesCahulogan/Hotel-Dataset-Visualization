import { Building2 } from "lucide-react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  return (
    <div className="mx-auto max-w-385 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Logo */}
        <div className="flex justify-between">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-6 w-6" />
          </div>

          <div className="sm:hidden">
            <ThemeToggleButton />
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance truncate">
            Hotel Booking Analytics
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Interactive analysis of booking patterns, pricing trends, and
            customer behavior
          </p>
        </div>

        {/* Theme toggle */}
        <div className="mt-2 sm:mt-0 sm:ml-auto shrink-0 hidden sm:inline-flex">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}
