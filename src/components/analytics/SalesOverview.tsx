import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import DashboardCard from "../dashboard/DashboardCard";

const SalesOverview = () => {
  // Mock data - replace with actual API data
  const metrics = {
    totalSales: "KSH 45,231",
    growth: "+12.5%",
    averageOrder: "KSH 325",
    ordersCount: "139",
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total Sales"
        value={metrics.totalSales}
        icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
        description={`${metrics.growth} from last month`}
      />
      <DashboardCard
        title="Average Order Value"
        value={metrics.averageOrder}
        icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
        description="Per transaction"
      />
      <DashboardCard
        title="Orders"
        value={metrics.ordersCount}
        icon={<ArrowDownIcon className="h-4 w-4 text-red-500" />}
        description="-2.5% from last month"
      />
      <DashboardCard
        title="Active Menu Items"
        value="24"
        icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
        description="+3 new items"
      />
    </div>
  );
};

export default SalesOverview;