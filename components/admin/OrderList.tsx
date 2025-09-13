import React, { useState, useEffect } from 'react';

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryLocation: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: OrderItem[];
  total: number;
}

export const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching orders
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: 1,
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          customerPhone: '+1234567890',
          deliveryLocation: '123 Main St, City, Country',
          orderDate: '2023-05-15',
          status: 'processing',
          items: [
            { id: 1, productName: 'Ethereal Diamond Ring', quantity: 1, price: 1250.00 },
          ],
          total: 1250.00
        },
        {
          id: 2,
          customerName: 'Jane Smith',
          customerEmail: 'jane@example.com',
          customerPhone: '+0987654321',
          deliveryLocation: '456 Oak Ave, Town, Country',
          orderDate: '2023-05-16',
          status: 'pending',
          items: [
            { id: 2, productName: 'Golden Loop Earrings', quantity: 2, price: 450.00 },
            { id: 3, productName: 'Azure Pendant Necklace', quantity: 1, price: 680.00 },
          ],
          total: 1580.00
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-brand-charcoal">
            Orders
          </h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-brand-charcoal">
          Orders
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and manage customer orders
        </p>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-brand-charcoal">
                      Order #{order.id}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {order.customerName} • {order.orderDate}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-tan focus:border-brand-tan sm:text-sm rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customer</p>
                    <p className="mt-1 text-sm text-brand-charcoal">{order.customerName}</p>
                    <p className="mt-1 text-sm text-brand-charcoal">{order.customerEmail}</p>
                    <p className="mt-1 text-sm text-brand-charcoal">{order.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery</p>
                    <p className="mt-1 text-sm text-brand-charcoal">{order.deliveryLocation}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Items</p>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-2 flex justify-between">
                        <span className="text-sm text-brand-charcoal">{item.productName} × {item.quantity}</span>
                        <span className="text-sm text-brand-charcoal">${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex justify-end">
                  <p className="text-lg font-medium text-brand-charcoal">
                    Total: ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};