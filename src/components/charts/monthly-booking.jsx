import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

const MONTHS = [
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
];

export function MonthlyBookings({ hotelData = [], selectedHotel }) {
  const chartData = useMemo(() => {
    const grouped = {};

    // ✅ Count ONLY selected hotel per month
    hotelData.forEach((r) => {
      if (r.hotel !== selectedHotel) return;

      const month = r.arrival_date_month;
      grouped[month] = (grouped[month] || 0) + 1;
    });

    return MONTHS.map((month) => ({
      month,
      count: grouped[month] || 0,
    })).filter((d) => d.count > 0);
  }, [hotelData, selectedHotel]);

  const chartConfig = {
    count: {
      label:
        selectedHotel === "Resort Hotel"
          ? "Resort Hotel Bookings"
          : "City Hotel Bookings",
      color:
        selectedHotel === "Resort Hotel" ? "var(--chart-2)" : "var(--chart-1)",
    },
  };

  const fillId =
    selectedHotel === "Resort Hotel" ? "fillResortHotel" : "fillCityHotel";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Hotel Bookings</CardTitle>
        <CardDescription>{selectedHotel} bookings per month</CardDescription>
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-96 w-full"
        >
          <AreaChart data={chartData} margin={{ top: 20, left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillCityHotel" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillResortHotel" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
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
              tickFormatter={(v) => v.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {/* ✅ Single correct line */}
            <Area
              dataKey="count"
              type="natural"
              stroke={
                selectedHotel === "Resort Hotel"
                  ? "var(--chart-2)"
                  : "var(--chart-1)"
              }
              fill={`url(#${fillId})`}
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
