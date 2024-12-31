import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

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
  onRemoveItem?: (productId: string) => void;
}

const OrderSummary = ({
  orderItems,
  products,
  waiters,
  selectedWaiter,
  onWaiterChange,
  onPlaceOrder,
  onRemoveItem,
}: OrderSummaryProps) => {
  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <Card className="shadow-lg bg-white/50 backdrop-blur-sm border-green-100 w-full">
      <CardHeader className="py-2 border-b">
        <CardTitle className="text-base font-medium text-green-800">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3">
        <div className="max-h-[400px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-green-200">
          {orderItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return (
              <div
                key={item.productId}
                className="flex justify-between items-center py-1.5 px-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-medium text-xs text-gray-800">
                    {product?.name} × {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-700 font-semibold">
                    ${((product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                  {onRemoveItem && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => onRemoveItem(item.productId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <Select value={selectedWaiter} onValueChange={onWaiterChange}>
            <SelectTrigger className="w-full text-xs border-green-100 bg-white">
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

        <div className="pt-2 border-t border-green-100">
          <div className="flex justify-between items-center text-sm font-semibold text-green-800">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>

        <Button
          onClick={onPlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-xs py-2 shadow-lg hover:shadow-xl transition-all"
          disabled={orderItems.length === 0 || !selectedWaiter}
        >
          Place Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
