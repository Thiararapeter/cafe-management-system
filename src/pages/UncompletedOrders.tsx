import UncompletedOrdersList from "@/components/orders/UncompletedOrdersList";

const UncompletedOrders = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Uncompleted Orders</h1>
      <UncompletedOrdersList />
    </div>
  );
};

export default UncompletedOrders;