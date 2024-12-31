import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Printer } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
  tableNumber: string;
}

// Mock data - replace with actual API data
const mockUncompletedOrders: Order[] = [
  {
    id: "1",
    items: [
      { name: "Espresso", quantity: 2, price: 3.50 },
      { name: "Croissant", quantity: 1, price: 2.50 }
    ],
    total: 9.50,
    timestamp: "2024-02-20 10:30",
    tableNumber: "A1"
  },
  {
    id: "2",
    items: [
      { name: "Cappuccino", quantity: 1, price: 4.50 },
      { name: "Sandwich", quantity: 1, price: 6.50 }
    ],
    total: 11.00,
    timestamp: "2024-02-20 10:35",
    tableNumber: "B2"
  }
];

const UncompletedOrdersList = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handlePrintReceipt = async (order: Order) => {
    try {
      // Format receipt content for 88mm thermal printer
      const receiptContent = formatReceiptFor88mm(order);
      
      // Mock print function - replace with actual printer integration
      await printReceipt(receiptContent);
      
      toast({
        title: "Receipt printed successfully",
        description: `Order #${order.id} receipt has been printed.`,
      });
    } catch (error) {
      toast({
        title: "Failed to print receipt",
        description: "Please check printer connection and try again.",
        variant: "destructive",
      });
    }
  };

  const formatReceiptFor88mm = (order: Order) => {
    // 88mm thermal printer typically supports 32-48 characters per line
    const maxWidth = 32;
    const separator = "-".repeat(maxWidth);
    
    let receipt = [
      "Cafe POS".padStart((maxWidth + 8) / 2),
      "\n",
      separator,
      `Order #: ${order.id}`,
      `Table: ${order.tableNumber}`,
      `Date: ${order.timestamp}`,
      separator,
      "Items:",
      ...order.items.map(item => 
        `${item.quantity}x ${item.name.padEnd(20)} $${item.price.toFixed(2)}`
      ),
      separator,
      `Total: $${order.total.toFixed(2)}`,
      "\n",
      "Thank you for visiting!",
      "\n\n\n" // Paper feed
    ].join("\n");

    return receipt;
  };

  const printReceipt = async (content: string) => {
    // Mock implementation - replace with actual printer API
    console.log("Printing receipt:", content);
    // Simulate printing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold">Uncompleted Orders</h2>
      </div>
      
      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUncompletedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.tableNumber}</TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{order.timestamp}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePrintReceipt(order)}
                    >
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default UncompletedOrdersList;