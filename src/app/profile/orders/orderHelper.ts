import { useState } from "react";

export const useOrderHelper = () => {
  const [orders, setOrders] = useState<any[]>([]);
  return { orders };
};
