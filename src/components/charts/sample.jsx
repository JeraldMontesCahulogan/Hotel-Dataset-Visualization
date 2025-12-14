"use client";

import * as React from "react";
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

export function ChartAreaInteractive({ hotelData = [] }) {
  const counts = hotelData.reduce((acc, item) => {
    const key = `${item.arrival_date_month}_${item.hotel}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const getCount = (month, hotel) => counts[`${month}_${hotel}`] || 0;

  const chartData = [
    {
      month: "January",
      City_Hotel: getCount("January", "City Hotel"),
      Resort_Hotel: getCount("January", "Resort Hotel"),
    },
    {
      month: "February",
      City_Hotel: getCount("February", "City Hotel"),
      Resort_Hotel: getCount("February", "Resort Hotel"),
    },
    {
      month: "March",
      City_Hotel: getCount("March", "City Hotel"),
      Resort_Hotel: getCount("March", "Resort Hotel"),
    },
    {
      month: "April",
      City_Hotel: getCount("April", "City Hotel"),
      Resort_Hotel: getCount("April", "Resort Hotel"),
    },
    {
      month: "May",
      City_Hotel: getCount("May", "City Hotel"),
      Resort_Hotel: getCount("May", "Resort Hotel"),
    },
    {
      month: "June",
      City_Hotel: getCount("June", "City Hotel"),
      Resort_Hotel: getCount("June", "Resort Hotel"),
    },
    {
      month: "July",
      City_Hotel: getCount("July", "City Hotel"),
      Resort_Hotel: getCount("July", "Resort Hotel"),
    },
    {
      month: "August",
      City_Hotel: getCount("August", "City Hotel"),
      Resort_Hotel: getCount("August", "Resort Hotel"),
    },
    {
      month: "September",
      City_Hotel: getCount("September", "City Hotel"),
      Resort_Hotel: getCount("September", "Resort Hotel"),
    },
    {
      month: "October",
      City_Hotel: getCount("October", "City Hotel"),
      Resort_Hotel: getCount("October", "Resort Hotel"),
    },
    {
      month: "November",
      City_Hotel: getCount("November", "City Hotel"),
      Resort_Hotel: getCount("November", "Resort Hotel"),
    },
    {
      month: "December",
      City_Hotel: getCount("December", "City Hotel"),
      Resort_Hotel: getCount("December", "Resort Hotel"),
    },
  ];

  const chartConfig = {
    City_Hotel: { label: "City Hotel", color: "var(--chart-1)" },
    Resort_Hotel: { label: "Resort Hotel", color: "var(--chart-2)" },
  };

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors per month</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillCity_Hotel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-City_Hotel)" />
                <stop
                  offset="95%"
                  stopColor="var(--color-City_Hotel)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillResort_Hotel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-Resort_Hotel)" />
                <stop
                  offset="95%"
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
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Area
              dataKey="Resort_Hotel"
              type="natural"
              fill="url(#fillResort_Hotel)"
              stroke="var(--color-Resort_Hotel)"
              stackId="a"
            />

            <Area
              dataKey="City_Hotel"
              type="natural"
              fill="url(#fillCity_Hotel)"
              stroke="var(--color-City_Hotel)"
              stackId="a"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
