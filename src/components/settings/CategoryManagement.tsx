import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

interface Category {
  id: string;
  name: string;
}

const CategoryManagement = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Coffee" },
    { id: "2", name: "Pastries" },
    { id: "3", name: "Food" },
    { id: "4", name: "Beverages" },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleAddCategory = (data: Partial<Category>) => {
    const newCategory = {
      id: (categories.length + 1).toString(),
      name: data.name || "",
    };
    setCategories([...categories, newCategory]);
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = (data: Partial<Category>) => {
    if (!selectedCategory) return;
    const updatedCategories = categories.map((category) =>
      category.id === selectedCategory.id
        ? { ...category, name: data.name || category.name }
        : category
    );
    setCategories(updatedCategories);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    const updatedCategories = categories.filter(
      (category) => category.id !== selectedCategory.id
    );
    setCategories(updatedCategories);
    setSelectedCategory(null);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Category deleted",
      description: `Successfully deleted ${selectedCategory.name}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <CategoryList
        categories={categories}
        onEdit={setSelectedCategory}
        onDelete={(category) => {
          setSelectedCategory(category);
          setIsDeleteDialogOpen(true);
        }}
      />

      <Dialog
        open={isAddDialogOpen || selectedCategory !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setSelectedCategory(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            onSubmit={selectedCategory ? handleEditCategory : handleAddCategory}
            initialData={selectedCategory || undefined}
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
              {selectedCategory?.name} and all associated menu items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagement;