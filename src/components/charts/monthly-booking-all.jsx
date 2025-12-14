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

export default function MonthlyBookingsAll({ hotelData = [] }) {
  const chartData = useMemo(() => {
    const grouped = {};

    // ✅ Count per month + per hotel type
    hotelData.forEach((r) => {
      const month = r.arrival_date_month;
      const hotel = r.hotel; // "City Hotel" | "Resort Hotel"

      if (!grouped[month]) {
        grouped[month] = {
          City_Hotel: 0,
          Resort_Hotel: 0,
        };
      }

      if (hotel === "City Hotel") {
        grouped[month].City_Hotel += 1;
      }

      if (hotel === "Resort Hotel") {
        grouped[month].Resort_Hotel += 1;
      }
    });

    // ✅ Keep correct month order
    return MONTHS.map((month) => ({
      month,
      City_Hotel: grouped[month]?.City_Hotel || 0,
      Resort_Hotel: grouped[month]?.Resort_Hotel || 0,
    })).filter((d) => d.City_Hotel > 0 || d.Resort_Hotel > 0);
  }, [hotelData]);

  const chartConfig = {
    City_Hotel: {
      label: "City Hotel",
      color: "var(--chart-1)",
    },
    Resort_Hotel: {
      label: "Resort Hotel",
      color: "var(--chart-2)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Hotel Bookings</CardTitle>
        <CardDescription>
          City Hotel vs Resort Hotel bookings per month
        </CardDescription>
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
                  offset="0%" // top of the area
                  stopColor="var(--color-City_Hotel)"
                  stopOpacity={1} // make the peak fully opaque
                />
                <stop
                  offset="80%" // bottom of the area
                  stopColor="var(--color-City_Hotel)"
                  stopOpacity={0.1} // lighter at the bottom
                />
              </linearGradient>

              <linearGradient id="fillResortHotel" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-Resort_Hotel)"
                  stopOpacity={1}
                />
                <stop
                  offset="80%"
                  stopColor="var(--color-Resort_Hotel)"
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
              tickFormatter={(v) => v.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {/* ✅ City Hotel line */}
            {/* City Hotel */}
            <Area
              dataKey="City_Hotel"
              type="natural"
              stroke="var(--color-City_Hotel)"
              fill="url(#fillCityHotel)"
              fillOpacity={0.4}
            />

            {/* Resort Hotel */}
            <Area
              dataKey="Resort_Hotel"
              type="natural"
              stroke="var(--color-Resort_Hotel)"
              fill="url(#fillResortHotel)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
