function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-2xl transition duration-300 p-5 flex flex-col">
      {/* Product Image Placeholder */}
      <div className="h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
        Image
      </div>

      <h3 className="font-semibold text-lg">{product.name}</h3>

      <p className="text-cyan-600 font-bold mt-2 text-xl">
        ${product.price.toFixed(2)}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
      </p>

      <button
        disabled={product.stock === 0}
        className={`mt-4 py-2 rounded-lg transition font-medium ${
          product.stock > 0
            ? "bg-cyan-500 text-white hover:bg-cyan-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}

function Stores() {
  const products = [
    { id: 1, name: "Coca Cola", price: 1.5, stock: 50 },
    { id: 2, name: "Pepsi", price: 1.4, stock: 40 },
    { id: 3, name: "Water Bottle", price: 0.8, stock: 100 },
    { id: 4, name: "Orange Juice", price: 2.0, stock: 0 },
  ];

  return (
    <div className="min-h-screen">
      {/* <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Our Store
        </h1>
        <p className="text-gray-500 mt-2">Browse our available products</p>
      </div> */}

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
