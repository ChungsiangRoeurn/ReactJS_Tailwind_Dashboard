import React from "react";

function Products() {
  const products = [
    {
      id: 1,
      name: "Coca Cola",
      price: 1.5,
      stock: 50,
    },
    {
      id: 2,
      name: "Pepsi",
      price: 1.4,
      stock: 40,
    },
    {
      id: 3,
      name: "Water Bottle",
      price: 0.8,
      stock: 100,
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>

        <button className="bg-cyan-500 text-white px-5 py-2 rounded-lg shadow hover:bg-cyan-600 transition">
          + Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product..."
          className="w-full md:w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Price ($)</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 20
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-3">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
