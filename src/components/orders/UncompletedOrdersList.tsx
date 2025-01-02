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
import { Clock, Printer, CheckCircle } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";
import { formatReceiptFor88mm, printReceipt } from "@/utils/receipt";

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
  status: "pending" | "completed";
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
    tableNumber: "A1",
    status: "pending"
  },
  {
    id: "2",
    items: [
      { name: "Cappuccino", quantity: 1, price: 4.50 },
      { name: "Sandwich", quantity: 1, price: 6.50 }
    ],
    total: 11.00,
    timestamp: "2024-02-20 10:35",
    tableNumber: "B2",
    status: "pending"
  }
];

const UncompletedOrdersList = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handlePrintReceipt = async (order: Order, paymentMethod: string, mpesaCode?: string) => {
    try {
      const receiptContent = formatReceiptFor88mm(order, paymentMethod, mpesaCode);
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

  const handleCompleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = async (paymentMethod: string, mpesaCode: string) => {
    if (!selectedOrder) return;

    if (paymentMethod === "mpesa" && !mpesaCode) {
      toast({
        title: "Error",
        description: "Please enter M-Pesa code",
        variant: "destructive",
      });
      return;
    }

    try {
      // First print the receipt
      await handlePrintReceipt(selectedOrder, paymentMethod, mpesaCode);
      
      // Then mark the order as completed
      // Here you would typically update the backend
      toast({
        title: "Order completed",
        description: `Order #${selectedOrder.id} has been marked as completed`,
      });

      setIsPaymentDialogOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete order. Please try again.",
        variant: "destructive",
      });
    }
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
                      onClick={() => handlePrintReceipt(order, "preview")}
                    >
                      <Printer className="h-4 w-4 mr-1" />
                      Print
                    </Button>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleCompleteOrder(order)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Complete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        selectedOrder={selectedOrder}
        onPaymentSubmit={handlePaymentSubmit}
      />
    </div>
  );
};

export default UncompletedOrdersList;
