// import { useMemo } from "react";
// import { Calendar } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Label } from "./ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";

// const MONTHS = Object.freeze([
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ]);

// export default function Filter({
//   selectedHotel,
//   setSelectedHotel,
//   selectedYear,
//   setSelectedYear,
//   startMonth,
//   setStartMonth,
//   endMonth,
//   setEndMonth,
//   rawData = [],
// }) {
//   // ✅ Memoized years extraction (fast for large datasets)
//   const years = useMemo(() => {
//     return [...new Set(rawData.map((d) => d.arrival_date_year))]
//       .filter(Boolean)
//       .sort((a, b) => b - a); // newest first
//   }, [rawData]);

//   return (
//     <Card className="mb-8">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Calendar className="h-5 w-5" />
//           Filters
//         </CardTitle>
//         <CardDescription>
//           Filter by hotel type, year, and month range
//         </CardDescription>
//       </CardHeader>

//       <CardContent>
//         <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//           {/* Hotel Type */}
//           <div className="space-y-2 w-full">
//             <Label htmlFor="hotel">Hotel Type</Label>
//             <Select
//               value={selectedHotel}
//               onValueChange={setSelectedHotel}
//               className="w-full"
//             >
//               <SelectTrigger id="hotel" className="w-full">
//                 <SelectValue placeholder="Select hotel" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Hotels</SelectItem>
//                 <SelectItem value="City Hotel">City Hotel</SelectItem>
//                 <SelectItem value="Resort Hotel">Resort Hotel</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Year */}
//           <div className="space-y-2 w-full">
//             <Label htmlFor="year">Year</Label>
//             <Select
//               value={selectedYear}
//               onValueChange={setSelectedYear}
//               className="w-full"
//             >
//               <SelectTrigger id="year" className="w-full">
//                 <SelectValue placeholder="Select year" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Years</SelectItem>
//                 {years.map((year) => (
//                   <SelectItem key={year} value={String(year)}>
//                     {year}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Start Month */}
//           <div className="space-y-2 w-full">
//             <Label htmlFor="start-month">Start Month</Label>
//             <Select
//               value={String(startMonth)}
//               onValueChange={(v) => setStartMonth(Number(v))}
//               className="w-full"
//             >
//               <SelectTrigger id="start-month" className="w-full">
//                 <SelectValue placeholder="Start month" />
//               </SelectTrigger>
//               <SelectContent>
//                 {MONTHS.map((month, index) => (
//                   <SelectItem key={month} value={String(index + 1)}>
//                     {month}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {/* End Month */}
//           <div className="space-y-2 w-full">
//             <Label htmlFor="end-month">End Month</Label>
//             <Select
//               value={String(endMonth)}
//               onValueChange={(v) => setEndMonth(Number(v))}
//               className="w-full"
//             >
//               <SelectTrigger id="end-month" className="w-full">
//                 <SelectValue placeholder="End month" />
//               </SelectTrigger>
//               <SelectContent>
//                 {MONTHS.map((month, index) => (
//                   <SelectItem key={month} value={String(index + 1)}>
//                     {month}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import { useMemo } from "react";
import { Calendar } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const MONTHS = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const HOTEL_TYPES = Object.freeze(["all", "City Hotel", "Resort Hotel"]);

export default function Filter({
  selectedHotel,
  setSelectedHotel,
  selectedYear,
  setSelectedYear,
  startMonth,
  setStartMonth,
  endMonth,
  setEndMonth,
  rawData = [],
}) {
  // ✅ Memoized years extraction
  const years = useMemo(() => {
    const yearSet = new Set();
    rawData.forEach((d) => {
      if (d.arrival_date_year) yearSet.add(d.arrival_date_year);
    });
    return Array.from(yearSet).sort((a, b) => b - a); // newest first
  }, [rawData]);

  const monthOptions = useMemo(
    () => MONTHS.map((month, index) => ({ label: month, value: index + 1 })),
    []
  );

  const hotelOptions = useMemo(
    () =>
      HOTEL_TYPES.map((hotel) => ({
        label: hotel === "all" ? "All Hotels" : hotel,
        value: hotel,
      })),
    []
  );

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Filters
        </CardTitle>
        <CardDescription>
          Filter by hotel type, year, and month range
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Hotel Type */}
          <div className="space-y-2 w-full">
            <Label htmlFor="hotel">Hotel Type</Label>
            <Select
              value={selectedHotel}
              onValueChange={setSelectedHotel}
              className="w-full"
            >
              <SelectTrigger id="hotel" className="w-full">
                <SelectValue placeholder="Select hotel" />
              </SelectTrigger>
              <SelectContent>
                {hotelOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div className="space-y-2 w-full">
            <Label htmlFor="year">Year</Label>
            <Select
              value={selectedYear}
              onValueChange={setSelectedYear}
              className="w-full"
            >
              <SelectTrigger id="year" className="w-full">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Month */}
          <div className="space-y-2 w-full">
            <Label htmlFor="start-month">Start Month</Label>
            <Select
              value={String(startMonth)}
              onValueChange={(v) => setStartMonth(Number(v))}
              className="w-full"
            >
              <SelectTrigger id="start-month" className="w-full">
                <SelectValue placeholder="Start month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={String(month.value)}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* End Month */}
          <div className="space-y-2 w-full">
            <Label htmlFor="end-month">End Month</Label>
            <Select
              value={String(endMonth)}
              onValueChange={(v) => setEndMonth(Number(v))}
              className="w-full"
            >
              <SelectTrigger id="end-month" className="w-full">
                <SelectValue placeholder="End month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={String(month.value)}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
