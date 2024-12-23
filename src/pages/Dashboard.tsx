import { Banknote, Package, ShoppingCart, Users } from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Sales"
          value="$12,345"
          icon={<Banknote className="h-4 w-4 text-muted-foreground" />}
          description="Last 24 hours"
        />
        <DashboardCard
          title="Active Orders"
          value="8"
          icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          description="Current orders in progress"
        />
        <DashboardCard
          title="Low Stock Items"
          value="3"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          description="Items need restocking"
        />
        <DashboardCard
          title="Staff On Duty"
          value="5"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="Currently working"
        />
      </div>
    </div>
  );
};

export default Dashboard;