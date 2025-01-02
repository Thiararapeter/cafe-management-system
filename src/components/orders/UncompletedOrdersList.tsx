import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";
import { formatReceiptFor88mm, printReceipt } from "@/utils/receipt";
import UncompletedOrderItem from "./UncompletedOrderItem";

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
  tableNumber?: string;  // Made optional to match receipt.ts
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
    status: "pending"
  }
];

const UncompletedOrdersList = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [scrollHeight, setScrollHeight] = useState("600px");

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const newHeight = Math.max(400, viewportHeight - 200);
      setScrollHeight(`${newHeight}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrintReceipt = async (order: Order, paymentMethod: string = "preview", mpesaCode?: string) => {
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
      await handlePrintReceipt(selectedOrder, paymentMethod, mpesaCode);
      
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
      
      <ScrollArea className="rounded-md border" style={{ height: scrollHeight }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUncompletedOrders.map((order) => (
              <UncompletedOrderItem
                key={order.id}
                order={order}
                onPrintReceipt={() => handlePrintReceipt(order)}
                onCompleteOrder={() => handleCompleteOrder(order)}
              />
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