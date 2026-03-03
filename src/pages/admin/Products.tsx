import { useState, useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/products";
import ProductModal from "../../components/ProductModal";
import { FaSearch } from "react-icons/fa";

function Products() {
  const { products, loading, error, removeProduct, editProduct, addProduct } =
    useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete.id);
      setIsConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setProductToDelete(null);
  };

  const handleSubmit = async (data: Partial<Product>) => {
    if (selectedProduct) {
      await editProduct(selectedProduct.id, data);
    } else {
      await addProduct(data);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-wide">
            Loading products...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-5 text-red-600 text-sm">
          {error}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Products
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {filteredProducts.length} item
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all duration-150 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent shadow-sm transition"
        />
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              <th className="px-5 py-3.5 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs w-12">
                ID
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Product
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Description
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Details
              </th>
              <th className="px-5 py-3.5 text-right font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Price
              </th>
              <th className="px-5 py-3.5 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Stock
              </th>
              <th className="px-5 py-3.5 text-left font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Updated
              </th>
              <th className="px-5 py-3.5 text-center font-semibold text-gray-500 uppercase tracking-wider text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProducts.map((product, index) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50/60 transition-colors duration-100"
              >
                <td className="px-5 py-4 text-gray-400 font-mono text-xs">
                  {index + 1}
                </td>

                {/* Product w/ image */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 shadow-sm flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-gray-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                          />
                        </svg>
                      </div>
                    )}
                    <span className="font-semibold text-gray-800 whitespace-nowrap">
                      {product.name}
                    </span>
                  </div>
                </td>

                {/* Description */}
                <td className="px-5 py-4 max-w-[180px]">
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    {product.description || (
                      <span className="text-gray-300 italic">—</span>
                    )}
                  </p>
                </td>

                {/* Product Details */}
                <td className="px-5 py-4 max-w-[180px]">
                  <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                    {product.product_details || (
                      <span className="text-gray-300 italic">—</span>
                    )}
                  </p>
                </td>

                {/* Price */}
                <td className="px-5 py-4 text-right">
                  <span className="font-bold text-gray-800">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </td>

                {/* Stock */}
                <td className="px-5 py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center min-w-[2.5rem] px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      product.stock === 0
                        ? "bg-red-100 text-red-600"
                        : product.stock <= 5
                          ? "bg-amber-100 text-amber-600"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                {/* Updated */}
                <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                  {product.updated_at ? formatDate(product.updated_at) : "—"}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-16 text-gray-400 text-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-10 h-10 text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    No products found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── MOBILE / TABLET CARDS ── */}
      <div className="lg:hidden space-y-3">
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
            <svg
              className="w-10 h-10 text-gray-200 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            No products found
          </div>
        )}

        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 p-4">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                    />
                  </svg>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">
                      #{index + 1}
                    </p>
                    <h3 className="font-bold text-gray-800 text-base leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <span className="font-bold text-gray-900 text-lg">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Details expandable */}
            {(product.description || product.product_details) && (
              <div className="px-4 pb-3">
                <button
                  onClick={() =>
                    setExpandedRow(
                      expandedRow === product.id ? null : product.id,
                    )
                  }
                  className="text-xs text-cyan-500 font-medium flex items-center gap-1"
                >
                  {expandedRow === product.id ? "Hide details" : "Show details"}
                  <svg
                    className={`w-3 h-3 transition-transform ${expandedRow === product.id ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedRow === product.id && (
                  <div className="mt-2 space-y-2">
                    {product.description && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                          Description
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    )}
                    {product.product_details && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                          Product Details
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {product.product_details}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Footer row */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    product.stock === 0
                      ? "bg-red-100 text-red-600"
                      : product.stock <= 5
                        ? "bg-amber-100 text-amber-600"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" />
                  </svg>
                  {product.stock} in stock
                </span>
                {product.updated_at && (
                  <span className="text-xs text-gray-400">
                    {formatDate(product.updated_at)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="bg-red-50 hover:bg-red-100 text-red-500 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedProduct}
        onSubmit={handleSubmit}
      />

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">
                Delete Product
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-700">
                  "{productToDelete?.name}"
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleCancelDelete}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
