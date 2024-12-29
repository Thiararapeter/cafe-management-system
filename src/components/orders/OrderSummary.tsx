import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {orderItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div
                key={item.productId}
                className="flex justify-between items-center py-2 border-b"
              >
                <span className="font-medium">
                  {product?.name} x {item.quantity}
                </span>
                <span className="text-muted-foreground">
                  ${((product?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Assign Waiter</label>
          <Select value={selectedWaiter} onValueChange={onWaiterChange}>
            <SelectTrigger className="w-full border-green-600">
              <SelectValue placeholder="Choose a waiter" />
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

        <div className="pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={onPlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={orderItems.length === 0 || !selectedWaiter}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;