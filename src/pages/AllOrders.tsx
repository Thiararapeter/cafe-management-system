import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type OrderStatus = "all" | "pending" | "completed";

// Mock data - replace with actual API call
const mockOrders = [
  {
    id: "1",
    items: [{ name: "Espresso", quantity: 2, price: 3.50 }],
    total: 7.00,
    status: "completed",
    cashier: "John Doe",
    date: "2024-03-20",
    paymentMethod: "cash"
  },
  {
    id: "2",
    items: [{ name: "Cappuccino", quantity: 1, price: 4.50 }],
    total: 4.50,
    status: "pending",
    cashier: "Jane Smith",
    date: "2024-03-20",
    paymentMethod: "mpesa"
  }
];

const AllOrders = () => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus>("all");
  const { toast } = useToast();

  const filteredOrders = mockOrders.filter(order => {
    if (filterStatus === "all") return true;
    return order.status === filterStatus;
  });

  return (
    <div className="container mx-auto p-8 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Orders</h1>
        <Select
          value={filterStatus}
          onValueChange={(value: OrderStatus) => setFilterStatus(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-muted-foreground">
                  Cashier: {order.cashier}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {order.date}
                </p>
                <p className="text-sm text-muted-foreground">
                  Payment: {order.paymentMethod}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  order.status === "completed" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Items:</h4>
              <ul className="space-y-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.quantity}x {item.name} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;