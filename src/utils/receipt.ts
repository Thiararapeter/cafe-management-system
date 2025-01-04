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
  tableNumber?: string;
  waiterName?: string;
  status: "pending" | "completed";
}

const centerText = (text: string, width: number): string => {
  const padding = Math.max(0, Math.floor((width - text.length) / 2));
  return ' '.repeat(padding) + text;
};

const formatPrice = (price: number): string => {
  return price.toFixed(2).padStart(6);
};

export const formatReceiptFor88mm = (
  order: Order,
  paymentMethod: string,
  mpesaCode?: string
): string => {
  const width = 32; // Standard width for 80mm thermal printer
  const separator = '-'.repeat(width);
  const currentDate = new Date().toLocaleString();

  const header = [
    '\x1B\x40', // Initialize printer
    '\x1B\x61\x01', // Center alignment
    centerText('CAFE POS', width),
    centerText('123 Coffee Street', width),
    centerText('City, Country', width),
    centerText('Tel: +254 123 456 789', width),
    '\n',
    '\x1B\x61\x00', // Left alignment
    separator,
    `Order #: ${order.id}`,
    order.tableNumber ? `Table: ${order.tableNumber}` : '',
    order.waiterName ? `Server: ${order.waiterName}` : '',
    `Date: ${currentDate}`,
    separator,
    'Items:',
  ].filter(Boolean).join('\n');

  const items = order.items.map(item => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    const itemLine = `${item.quantity}x ${item.name}`;
    const padding = width - itemLine.length - itemTotal.length;
    return `${itemLine}${' '.repeat(padding)}${itemTotal}`;
  }).join('\n');

  const footer = [
    separator,
    `Subtotal:${' '.repeat(width - 13)}${formatPrice(order.total)}`,
    `VAT (16%):${' '.repeat(width - 13)}${formatPrice(order.total * 0.16)}`,
    `Total:${' '.repeat(width - 10)}${formatPrice(order.total * 1.16)}`,
    separator,
    `Payment Method: ${paymentMethod}`,
    mpesaCode ? `M-Pesa Code: ${mpesaCode}` : '',
    '\n',
    '\x1B\x61\x01', // Center alignment
    'Thank you for visiting!',
    'Please come again',
    '\n',
    '\x1B\x61\x00', // Left alignment
    currentDate,
    '\n\n\n\n\n', // Extra lines for paper cutting
    '\x1B\x69', // Cut paper
  ].filter(Boolean).join('\n');

  return `${header}\n${items}\n${footer}`;
};

export const printReceipt = async (content: string) => {
  try {
    // In production, this would connect to a real thermal printer
    // For now, we'll log to console for testing
    console.log('Printing receipt:', content);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate printing delay
  } catch (error) {
    console.error('Error printing receipt:', error);
    throw new Error('Failed to print receipt');
  }
};