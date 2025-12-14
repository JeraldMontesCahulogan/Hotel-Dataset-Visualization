import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive area chart";

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

export function HotelBook({ hotelData = [], selectedHotel }) {
  // ✅ Memoized aggregation (O(n), fast for large datasets)
  const chartData = useMemo(() => {
    const counts = Object.create(null);

    for (const r of hotelData) {
      const month = r.arrival_date_month;
      if (month) counts[month] = (counts[month] || 0) + 1;
    }

    return MONTHS.map((month) => ({
      month,
      bookings: counts[month] || 0,
    }));
  }, [hotelData]);

  // ✅ Memoized config (prevents unnecessary re-renders)
  const chartConfig = useMemo(
    () => ({
      bookings: {
        label: selectedHotel === "Resort Hotel" ? "Resort Hotel" : "City Hotel",
        color:
          selectedHotel === "Resort Hotel"
            ? "var(--chart-2)"
            : "var(--chart-1)",
      },
    }),
    [selectedHotel]
  );

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>Monthly booking distribution</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-bookings)" />
                <stop
                  offset="95%"
                  stopColor="var(--color-bookings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Area
              dataKey="bookings"
              type="monotone"
              fill="url(#fillBookings)"
              stroke="var(--color-bookings)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
