function Dashboard() {
  const stats = [
    { title: "Total Products", value: 120 },
    { title: "Total Users", value: 25 },
    { title: "Orders Today", value: 18 },
    { title: "Revenue Today", value: "$450" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h4 className="text-gray-500 text-sm">{item.title}</h4>
            <p className="text-2xl font-bold mt-2 text-cyan-600">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
