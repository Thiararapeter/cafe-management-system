import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ProductSelectorProps {
  products: Product[];
  onAddToOrder: (productId: string) => void;
}

const ProductSelector = ({ products, onAddToOrder }: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="shadow-lg bg-white/50 backdrop-blur-sm border-green-100">
      <CardHeader className="py-3 border-b">
        <CardTitle className="text-lg font-medium text-green-800">Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-green-100"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full border-green-100">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <Button
              key={product.id}
              onClick={() => onAddToOrder(product.id)}
              variant="outline"
              className="h-auto py-3 px-4 flex flex-col items-start text-left bg-white hover:bg-green-50 border-green-100 hover:border-green-200 transition-all shadow-sm hover:shadow-md"
            >
              <span className="font-medium text-gray-800">{product.name}</span>
              <span className="text-sm text-green-700 font-semibold">
                ${product.price.toFixed(2)}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSelector;