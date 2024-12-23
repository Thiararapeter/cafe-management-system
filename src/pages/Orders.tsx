import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const Orders = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
      </div>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No active orders at the moment.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;