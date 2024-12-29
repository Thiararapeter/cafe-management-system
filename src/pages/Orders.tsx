import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

// Mock data - replace with actual API calls in production
const mockProducts = [
  { id: "1", name: "Espresso", price: 3.50, category: "Coffee" },
  { id: "2", name: "Cappuccino", price: 4.50, category: "Coffee" },
  { id: "3", name: "Croissant", price: 3.00, category: "Pastries" },
];

const mockWaiters = [
  { id: "1", name: "Sam Waiter" },
];

interface OrderItem {
  productId: string;
  quantity: number;
}

const Orders = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedWaiter, setSelectedWaiter] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddToOrder = () => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Please select a product",
        variant: "destructive",
      });
      return;
    }

    const existingItem = orderItems.find(item => item.productId === selectedProduct);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.productId === selectedProduct
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { productId: selectedProduct, quantity: 1 }]);
    }

    toast({
      title: "Product added",
      description: "Product has been added to the order",
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedWaiter) {
      toast({
        title: "Error",
        description: "Please select a waiter",
        variant: "destructive",
      });
      return;
    }

    if (orderItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add items to the order",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the order to your backend
    console.log("Order placed:", { items: orderItems, waiterId: selectedWaiter });
    
    toast({
      title: "Order placed",
      description: "Order has been successfully placed",
    });

    // Reset the form
    setOrderItems([]);
    setSelectedProduct("");
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => {
      const product = mockProducts.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Product</label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product" />
                </SelectTrigger>
                <SelectContent>
                  {mockProducts.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - ${product.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleAddToOrder} className="w-full">
              Add to Order
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Waiter</label>
              <Select
                value={selectedWaiter}
                onValueChange={setSelectedWaiter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a waiter" />
                </SelectTrigger>
                <SelectContent>
                  {mockWaiters.map((waiter) => (
                    <SelectItem key={waiter.id} value={waiter.id}>
                      {waiter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderItems.map((item) => {
              const product = mockProducts.find(p => p.id === item.productId);
              return (
                <div key={item.productId} className="flex justify-between">
                  <span>{product?.name} x {item.quantity}</span>
                  <span>${((product?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            <Button 
              onClick={handlePlaceOrder} 
              className="w-full"
              disabled={orderItems.length === 0 || !selectedWaiter}
            >
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Orders;