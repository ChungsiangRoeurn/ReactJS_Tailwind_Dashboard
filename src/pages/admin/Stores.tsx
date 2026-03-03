import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/products";

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition duration-300 p-5 flex flex-col">
      {/* Product Image */}
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>

      {/* Stock */}
      <p
        className={`mt-2 px-2 py-1 inline-block rounded-full text-sm font-medium ${
          product.stock > 20
            ? "bg-green-100 text-green-600"
            : product.stock > 0
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
        }`}
      >
        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
      </p>

      {/* Price */}
      <p className="text-cyan-600 font-bold mt-3 text-xl">
        ${parseFloat(product.price).toFixed(2)}
      </p>

      <button className="mt-auto py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition font-medium">
        Add to Cart
      </button>
    </div>
  );
}

function Stores() {
  const { products, error, loading } = useProducts<Product>();

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Our Store
        </h1>
        <p className="text-gray-500 mt-2">Browse our available products</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Stores;
