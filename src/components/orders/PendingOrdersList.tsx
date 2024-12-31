import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface PendingOrder {
  id: string;
  items: Array<{ name: string; quantity: number }>;
  total: number;
  timestamp: string;
}

// Mock data - replace with actual API data in production
const mockPendingOrders: PendingOrder[] = [
  {
    id: "1",
    items: [{ name: "Espresso", quantity: 2 }],
    total: 7.00,
    timestamp: "2 min ago"
  },
  {
    id: "2",
    items: [{ name: "Cappuccino", quantity: 1 }],
    total: 4.50,
    timestamp: "5 min ago"
  }
];

const PendingOrdersList = () => {
  return (
    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-4 w-4 text-orange-500" />
        <h3 className="font-semibold text-sm">Pending Orders</h3>
        <Badge variant="secondary" className="ml-auto">
          {mockPendingOrders.length}
        </Badge>
      </div>
      <div className="space-y-4">
        {mockPendingOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border p-3 hover:bg-accent transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Order #{order.id}</span>
              <span className="text-xs text-muted-foreground">{order.timestamp}</span>
            </div>
            <div className="space-y-1">
              {order.items.map((item, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm font-medium">
              Total: ${order.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default PendingOrdersList;