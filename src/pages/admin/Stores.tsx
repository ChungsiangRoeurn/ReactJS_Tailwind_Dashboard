import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/products";
import { FaSearch } from "react-icons/fa";
import { FiBox, FiImage, FiX } from "react-icons/fi";

// ─── Product Detail Modal ────────────────────────────────────────────────────
function ProductDetailModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative bg-gray-50 h-56 sm:h-64 overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
              <FiImage className="w-14 h-14" />
              <span className="text-sm">No image</span>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition"
          >
            <FiX className="w-4 h-4 text-gray-600" />
          </button>

          {/* Stock badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                product.stock === 0
                  ? "bg-red-500 text-white"
                  : product.stock <= 5
                    ? "bg-amber-400 text-white"
                    : "bg-emerald-500 text-white"
              }`}
            >
              {product.stock === 0
                ? "Out of Stock"
                : product.stock <= 5
                  ? `Only ${product.stock} left`
                  : "In Stock"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h2>
            <span className="text-2xl font-black text-cyan-600 whitespace-nowrap">
              ${parseFloat(product.price).toFixed(2)}
            </span>
          </div>

          {product.description && (
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          {product.product_details && (
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Product Details
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.product_details}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
            <FiBox className="w-4 h-4 text-gray-400" />
            <span>{product.stock} units available</span>
          </div>

          <button
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] text-white shadow-sm"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Product Card ────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-44">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-200">
            <FiImage className="size-12" />
          </div>
        )}

        {/* Stock badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              product.stock === 0
                ? "bg-red-100 text-red-600"
                : product.stock <= 5
                  ? "bg-amber-100 text-amber-600"
                  : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : product.stock <= 5
                ? `${product.stock} left`
                : "In Stock"}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-2 mb-1 group-hover:text-cyan-600 transition-colors">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xl font-black text-cyan-600">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            disabled={product.stock === 0}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-white shadow-sm"
            }`}
          >
            {product.stock === 0 ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stores Page ─────────────────────────────────────────────────────────────
function Stores() {
  const { products, error, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading products...</p>
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Our Menu
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Fresh picks, brewed with care — tap any item to see more.
          </p>
        </div>

        {/* Search + count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-7">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent shadow-sm transition"
            />
          </div>
          <p className="text-sm text-gray-400 whitespace-nowrap">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300">
            <FiImage className="size-12" />
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default Stores;
