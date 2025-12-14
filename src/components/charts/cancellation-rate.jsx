"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

export const description = "A bar chart with a custom label";

export function CancellationRate({ hotelData }) {
  const chartData = useMemo(() => {
    const segments = {};

    hotelData.forEach((record) => {
      const segment = record.market_segment || "Unknown";
      if (!segments[segment]) segments[segment] = { total: 0, canceled: 0 };
      segments[segment].total += 1;
      if (record.is_canceled === 1) segments[segment].canceled += 1;
    });

    return Object.entries(segments)
      .map(([segment, data]) => ({
        segment,
        rate: Math.round((data.canceled / data.total) * 100),
      }))
      .sort((a, b) => b.rate - a.rate);
  }, [hotelData]);

  const chartConfig = {
    rate: { label: "Cancellation Rate (%)", color: "var(--chart-2)" },
    label: { color: "var(--background)" },
  };

  const highestCancellationRisk = chartData[0]?.segment || "Unknown";
  const highestCancellationRate = chartData[0]?.rate || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cancellation Rate by Market Segment</CardTitle>
        <CardDescription>
          Identifies segments with higher cancellation risk
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="segment"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="rate" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="rate"
              layout="vertical"
              fill="var(--color-rate)"
              radius={4}
            >
              <LabelList
                dataKey="segment"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="rate"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Segments with Highest Cancellation Risk {highestCancellationRisk}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing {highestCancellationRate}% of cancellations
        </div>
      </CardFooter>
    </Card>
  );
}
