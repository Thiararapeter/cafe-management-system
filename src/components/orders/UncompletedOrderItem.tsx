import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Printer, CheckCircle } from "lucide-react";

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
  status: "pending" | "completed";
}

interface UncompletedOrderItemProps {
  order: Order;
  onPrintReceipt: (order: Order) => void;
  onCompleteOrder: (order: Order) => void;
}

const UncompletedOrderItem = ({
  order,
  onPrintReceipt,
  onCompleteOrder,
}: UncompletedOrderItemProps) => {
  return (
    <TableRow>
      <TableCell>{order.id}</TableCell>
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
            onClick={() => onPrintReceipt(order)}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={() => onCompleteOrder(order)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Complete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UncompletedOrderItem;