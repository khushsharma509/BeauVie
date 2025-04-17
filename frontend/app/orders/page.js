"use client";
import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchAPI("/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(setOrders);
  }, []);
  return (
    <div>
      <h1>Your Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} - Total: ${order.total}
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
