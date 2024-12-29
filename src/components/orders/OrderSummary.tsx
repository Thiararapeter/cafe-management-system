import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  productId: string;
  quantity: number;
}

interface Waiter {
  id: string;
  name: string;
}

interface OrderSummaryProps {
  orderItems: OrderItem[];
  products: Product[];
  waiters: Waiter[];
  selectedWaiter: string;
  onWaiterChange: (waiterId: string) => void;
  onPlaceOrder: () => void;
}

const OrderSummary = ({
  orderItems,
  products,
  waiters,
  selectedWaiter,
  onWaiterChange,
  onPlaceOrder,
}: OrderSummaryProps) => {
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="py-3">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[300px] overflow-y-auto space-y-2">
          {orderItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div
                key={item.productId}
                className="flex justify-between items-center py-1.5 border-b last:border-b-0"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">
                    {product?.name} x {item.quantity}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ${((product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <Select value={selectedWaiter} onValueChange={onWaiterChange}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Assign Waiter" />
            </SelectTrigger>
            <SelectContent>
              {waiters.map((waiter) => (
                <SelectItem key={waiter.id} value={waiter.id}>
                  {waiter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-base font-semibold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={onPlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-sm py-2"
          disabled={orderItems.length === 0 || !selectedWaiter}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;