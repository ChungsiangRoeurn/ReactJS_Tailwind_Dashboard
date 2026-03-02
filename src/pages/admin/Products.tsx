import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";

function Products() {
  const { products, error, loading } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <button className="bg-cyan-500 text-white px-5 py-2 rounded-lg shadow hover:bg-cyan-600 transition">
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
      </div>

      {/* Table for md+ screens */}
      <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price ($)</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}

              {filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium max-w-xs truncate">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 font-semibold text-cyan-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 20
                          ? "bg-green-100 text-green-600"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards for small screens */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col"
          >
            <h3 className="font-semibold truncate">{product.title}</h3>
            <p className="text-cyan-600 font-bold mt-2">
              ${product.price.toFixed(2)}
            </p>
            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-medium inline-block ${
                product.stock > 20
                  ? "bg-green-100 text-green-600"
                  : product.stock > 0
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </span>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Edit
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
