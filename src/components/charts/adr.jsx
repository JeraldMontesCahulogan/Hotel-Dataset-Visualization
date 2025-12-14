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

export function ADR({ hotelData }) {
  const chartData = useMemo(() => {
    const grouped = {};

    hotelData.forEach((r) => {
      const month = r.arrival_date_month;
      if (!grouped[month]) {
        grouped[month] = { total: 0, count: 0 };
      }
      grouped[month].total += Number(r.adr || 0);
      grouped[month].count += 1;
    });

    return MONTHS.map((month) => {
      const data = grouped[month];
      return {
        month,
        adr: data ? data.total / data.count : 0,
      };
    }).filter((d) => d.adr > 0);
  }, [hotelData]);

  const chartConfig = {
    adr: {
      label: "ADR",
      color: "var(--chart-4)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Daily Rate (ADR) Monthly Trend</CardTitle>
        <CardDescription>
          Pricing trends throughout the year - identifies high and low demand
          periods
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => v.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              <linearGradient id="fillADR" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-adr)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-adr)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="adr"
              type="natural"
              fill="url(#fillADR)"
              fillOpacity={0.4}
              stroke="var(--color-adr)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
