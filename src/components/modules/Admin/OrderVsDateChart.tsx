"use client";

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
  type ChartConfig,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { get_Last_FiveDays_Orders_For_Admin } from "@/actions/order.action";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const OrderVsDateChart = () => {
  const [chartData, setChartData] = useState<
    { date: Date; no_of_orders_per_date: number }[] | []
  >([]);

  useEffect(() => {
    (async () => {
      const { data } = await get_Last_FiveDays_Orders_For_Admin();
      const chartData = data?.data;
      setChartData(chartData);
    })();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Trends</CardTitle>
        <CardDescription>
          Showing Total Number Of Orders Of The Last 5 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-30}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="no_of_orders_per_date"
              type="natural"
              fill="#008080"
              fillOpacity={0.4}
              stroke="#008080"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OrderVsDateChart;
