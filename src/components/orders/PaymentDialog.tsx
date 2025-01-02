import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  timestamp: string;
  tableNumber?: string;  // Made optional to match other interfaces
  status: "pending" | "completed";
}

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: Order | null;
  onPaymentSubmit: (paymentMethod: string, mpesaCode: string) => void;
}

export const PaymentDialog = ({
  isOpen,
  onClose,
  selectedOrder,
  onPaymentSubmit,
}: PaymentDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [mpesaCode, setMpesaCode] = useState<string>("");

  const handleSubmit = () => {
    onPaymentSubmit(paymentMethod, mpesaCode);
    setPaymentMethod("");
    setMpesaCode("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Order #{selectedOrder?.id}</DialogTitle>
          <DialogDescription>
            Select a payment method to complete the order.
          </DialogDescription>
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Complete Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};