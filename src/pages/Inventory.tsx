import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

const Inventory = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Package className="h-8 w-8 text-muted-foreground" />
      </div>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Stock Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No inventory items found.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;