import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/inventory";
import ProductForm from "@/components/inventory/ProductForm";
import ProductList from "@/components/inventory/ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuManagement from "@/components/settings/MenuManagement";

// Mock data - replace with actual API calls in production
const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  description: `Description for Product ${i + 1}`,
  price: Math.random() * 100,
  quantity: Math.floor(Math.random() * 100),
  category: `Category ${Math.floor(i / 10) + 1}`,
  sku: `SKU-${i + 1}`,
  createdAt: new Date().toISOString(),
}));

const ITEMS_PER_PAGE = 30;

const Inventory = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleAddProduct = (data: Partial<Product>) => {
    const newProduct: Product = {
      ...data,
      id: `product-${products.length + 1}`,
      createdAt: new Date().toISOString(),
    } as Product;

    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (data: Partial<Product>) => {
    if (!selectedProduct) return;

    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id
        ? { ...selectedProduct, ...data }
        : product
    );

    setProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.filter(
      (product) => product.id !== selectedProduct.id
    );
    setProducts(updatedProducts);
    setSelectedProduct(null);
    setIsDeleteDialogOpen(false);

    toast({
      title: "Product deleted",
      description: `Successfully deleted ${selectedProduct.name}`,
    });
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
  };

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <Tabs defaultValue="inventory" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
            </TabsList>
            <TabsContent value="inventory">
              <ProductList
                products={currentProducts}
                onEdit={openEditDialog}
                onDelete={openDeleteDialog}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </TabsContent>
            <TabsContent value="menu">
              <MenuManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog
        open={isAddDialogOpen || selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setSelectedProduct(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            onSubmit={selectedProduct ? handleEditProduct : handleAddProduct}
            initialData={selectedProduct || undefined}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedProduct?.name} from the inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Inventory;
