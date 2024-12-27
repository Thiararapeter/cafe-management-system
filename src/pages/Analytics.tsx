import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesOverview from "@/components/analytics/SalesOverview";
import SalesChart from "@/components/analytics/SalesChart";
import TopProducts from "@/components/analytics/TopProducts";

const Analytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SalesOverview />
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <SalesChart />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <TopProducts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;