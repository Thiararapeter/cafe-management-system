import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProductSelector from "@/components/orders/ProductSelector";
import OrderSummary from "@/components/orders/OrderSummary";

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
  const [selectedWaiter, setSelectedWaiter] = useState<string>("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddToOrder = (productId: string) => {
    const existingItem = orderItems.find(item => item.productId === productId);
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { productId, quantity: 1 }]);
    }

    toast({
      title: "Product added",
      description: "Product has been added to the order",
    });
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.productId !== productId));
    toast({
      title: "Product removed",
      description: "Product has been removed from the order",
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
    setSelectedWaiter("");
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-800">Point of Sale</h1>
        <ShoppingCart className="h-8 w-8 text-green-600" />
      </div>

      <div className="grid grid-cols-[1fr,380px] gap-6">
        <ProductSelector
          products={mockProducts}
          onAddToOrder={handleAddToOrder}
        />
        <OrderSummary
          orderItems={orderItems}
          products={mockProducts}
          waiters={mockWaiters}
          selectedWaiter={selectedWaiter}
          onWaiterChange={setSelectedWaiter}
          onPlaceOrder={handlePlaceOrder}
          onRemoveItem={handleRemoveItem}
        />
      </div>
    </div>
  );
};

export default Orders;