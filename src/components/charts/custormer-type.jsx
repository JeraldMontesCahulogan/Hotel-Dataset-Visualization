/* eslint-disable react-hooks/globals */
import React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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

export const description = "A donut chart with text";

let data = {};

export function CustomerType({ hotelData }) {
  data = hotelData.reduce((acc, item) => {
    const key = item.customer_type;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const chartData = [
    {
      browser: "Transient",
      visitors: data["Transient"],
      fill: "var(--color-Transient)",
    },
    {
      browser: "Contract",
      visitors: data["Contract"],
      fill: "var(--color-Contract)",
    },
    {
      browser: "Transient_Party",
      visitors: data["Transient-Party"],
      fill: "var(--color-Transient_Party)",
    },
    { browser: "Group", visitors: data["Group"], fill: "var(--color-Group)" },
  ];

  const chartConfig = {
    visitors: { label: "Visitors" },
    Transient: { label: "Transient", color: "var(--chart-1)" },
    Contract: { label: "Contract", color: "var(--chart-2)" },
    Transient_Party: { label: "Transient Party", color: "var(--chart-3)" },
    Group: { label: "Group", color: "var(--chart-4)" },
  };

  const totalVisitors = chartData.reduce((acc, item) => acc + item.visitors, 0);

  const highestVisitors = Math.max(...chartData.map((item) => item.visitors));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Customer Type Distribution</CardTitle>
        <CardDescription>
          Breakdown of customer profiles - individuals, groups, and corporate
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-70.5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Customers
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <span className="text-primary">
            Dominant Customer Type:{" "}
            {Object.keys(data).find((key) => data[key] === highestVisitors)}
          </span>
          <TrendingUp size={16} />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing {totalVisitors.toLocaleString()} visitors
        </div>
      </CardFooter>
    </Card>
  );
}
