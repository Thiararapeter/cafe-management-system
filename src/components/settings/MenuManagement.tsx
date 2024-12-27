import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

const MenuManagement = () => {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Cappuccino",
      category: "Coffee",
      price: 4.99,
    },
    {
      id: "2",
      name: "Croissant",
      category: "Pastries",
      price: 3.99,
    },
    {
      id: "3",
      name: "Greek Salad",
      category: "Food",
      price: 8.99,
    },
  ]);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    category: "",
    price: "",
  });

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setEditedItem({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;

    const updatedItems = menuItems.map((item) =>
      item.id === selectedItem.id
        ? {
            ...item,
            name: editedItem.name,
            category: editedItem.category,
            price: parseFloat(editedItem.price),
          }
        : item
    );

    setMenuItems(updatedItems);
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    toast({
      title: "Menu item updated",
      description: `${editedItem.name} has been updated`,
    });
  };

  const handleAddItem = () => {
    const id = (menuItems.length + 1).toString();
    setMenuItems([
      ...menuItems,
      { ...editedItem, id, price: parseFloat(editedItem.price) },
    ]);
    toast({
      title: "Menu item added",
      description: `${editedItem.name} has been added to the menu`,
    });
    setEditedItem({ name: "", category: "Coffee", price: "" });
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast({
      title: "Menu item deleted",
      description: "The item has been removed from the menu",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-4">
              <Input
                placeholder="Item name"
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
              />
              <Select
                value={editedItem.category}
                onValueChange={(value) =>
                  setEditedItem({ ...editedItem, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                  <SelectItem value="Pastries">Pastries</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Beverages">Beverages</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Price"
                value={editedItem.price}
                onChange={(e) =>
                  setEditedItem({ ...editedItem, price: e.target.value })
                }
              />
              <Button onClick={handleAddItem} className="w-full">
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  onClick={() => handleEditItem(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Item name"
              value={editedItem.name}
              onChange={(e) =>
                setEditedItem({ ...editedItem, name: e.target.value })
              }
            />
            <Select
              value={editedItem.category}
              onValueChange={(value) =>
                setEditedItem({ ...editedItem, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Coffee">Coffee</SelectItem>
                <SelectItem value="Pastries">Pastries</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Beverages">Beverages</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Price"
              value={editedItem.price}
              onChange={(e) =>
                setEditedItem({ ...editedItem, price: e.target.value })
              }
            />
            <Button onClick={handleUpdateItem} className="w-full">
              Update Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuManagement;
