import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Jan", sales: 4000 },
  { date: "Feb", sales: 3000 },
  { date: "Mar", sales: 2000 },
  { date: "Apr", sales: 2780 },
  { date: "May", sales: 1890 },
  { date: "Jun", sales: 2390 },
  { date: "Jul", sales: 3490 },
];

const SalesChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sales Over Time</CardTitle>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          className="h-[350px]"
          config={{
            sales: {
              theme: {
                light: "rgba(59, 130, 246, 0.5)",
                dark: "rgba(59, 130, 246, 0.2)",
              },
            },
          }}
        >
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              fill="var(--color-sales)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;