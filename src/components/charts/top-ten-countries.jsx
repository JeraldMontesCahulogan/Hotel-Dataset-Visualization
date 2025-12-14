import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

export const description = "A bar chart with a label";

export function TopTenCountries({ hotelData }) {
  const chartData = useMemo(() => {
    const countries = {};

    hotelData.forEach((record) => {
      const country = record.country || "Unknown";
      countries[country] = (countries[country] || 0) + 1;
    });

    return Object.entries(countries)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, bookings]) => ({ country, bookings }));
  }, [hotelData]);
  const chartConfig = {
    bookings: { label: "Bookings", color: "var(--chart-1)" },
  };

  const highestCountry = chartData[0]?.country || "Unknown";
  const highestBookings = chartData[0]?.bookings || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Guest Countries</CardTitle>
        <CardDescription>
          Primary markets - helps identify key geographic opportunities
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="country"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="bookings" fill="var(--color-bookings)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Major Source of Guests : Country of {highestCountry}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing {highestBookings} bookings
        </div>
      </CardFooter>
    </Card>
  );
}
