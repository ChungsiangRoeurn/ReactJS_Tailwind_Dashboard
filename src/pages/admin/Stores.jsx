import { useProducts } from "../../hooks/useProducts";
import StarRating from "../../components/StartRating";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition duration-300 p-5 flex flex-col">
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>

      {/* Rating */}
      <div className="mt-2">
        <StarRating rating={product.rating.rate} />
        <p className="text-xs text-gray-500">{product.rating.count} reviews</p>
      </div>

      {/* Price */}
      <p className="text-cyan-600 font-bold mt-3 text-xl">
        ${product.price.toFixed(2)}
      </p>

      <button className="mt-auto py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition font-medium">
        Add to Cart
      </button>
    </div>
  );
}
function Stores() {
  const { products, error, loading } = useProducts();

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen">
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
