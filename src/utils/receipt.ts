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

export const formatReceiptFor88mm = (order: Order, paymentMethod: string, mpesaCode?: string) => {
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
    mpesaCode ? `M-Pesa Code: ${mpesaCode}` : "",
    "\n",
    "Thank you for visiting!",
    "\n\n\n"
  ].join("\n");

  return receipt;
};

export const printReceipt = async (content: string) => {
  // Mock implementation - replace with actual printer API
  console.log("Printing receipt:", content);
  await new Promise(resolve => setTimeout(resolve, 1000));
};