import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TopProducts = () => {
  // Mock data - replace with actual API data
  const products = [
    {
      name: "Cappuccino",
      sales: 245,
      revenue: "KSH 12,250",
      growth: "+12.5%",
    },
    {
      name: "Latte",
      sales: 189,
      revenue: "KSH 9,450",
      growth: "+8.2%",
    },
    {
      name: "Espresso",
      sales: 156,
      revenue: "KSH 7,800",
      growth: "+5.4%",
    },
    {
      name: "Mocha",
      sales: 124,
      revenue: "KSH 6,200",
      growth: "-2.1%",
    },
    {
      name: "Americano",
      sales: 98,
      revenue: "KSH 4,900",
      growth: "+3.8%",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right">{product.revenue}</TableCell>
                <TableCell
                  className={`text-right ${
                    product.growth.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {product.growth}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopProducts;