
function Orders() {
  const orders = [
    { id: 1001, customer: "Alice", total: 25.5, status: "Completed" },
    { id: 1002, customer: "Bob", total: 15.0, status: "Pending" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Orders</h2>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total ($)</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">#{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">${order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
