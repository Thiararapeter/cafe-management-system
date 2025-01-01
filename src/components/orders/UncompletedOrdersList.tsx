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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [mpesaCode, setMpesaCode] = useState<string>("");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const handlePrintReceipt = async (order: Order) => {
    try {
      const receiptContent = formatReceiptFor88mm(order);
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
      `Payment Method: ${paymentMethod}`,
      paymentMethod === "mpesa" ? `M-Pesa Code: ${mpesaCode}` : "",
      "\n",
      "Thank you for visiting!",
      "\n\n\n"
    ].join("\n");

    return receipt;
  };

  const printReceipt = async (content: string) => {
    // Mock implementation - replace with actual printer API
    console.log("Printing receipt:", content);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleCompleteOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = async () => {
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
      // Here you would typically send the payment details to your backend
      await handlePrintReceipt(selectedOrder);
      
      toast({
        title: "Order completed",
        description: `Order #${selectedOrder.id} has been marked as completed`,
      });

      setIsPaymentDialogOpen(false);
      setSelectedOrder(null);
      setPaymentMethod("");
      setMpesaCode("");
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
                      onClick={() => handlePrintReceipt(order)}
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

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Order #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {paymentMethod === "mpesa" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">M-Pesa Code</label>
                <Input
                  placeholder="Enter M-Pesa code"
                  value={mpesaCode}
                  onChange={(e) => setMpesaCode(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>
              Complete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UncompletedOrdersList;