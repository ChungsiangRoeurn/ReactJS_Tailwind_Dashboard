import React from "react";

function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings</h2>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <div className="mb-4">
          <label className="block text-sm mb-2">Store Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
            placeholder="My Store"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Currency</label>
          <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none">
            <option>USD</option>
            <option>EUR</option>
            <option>KHR</option>
          </select>
        </div>

        <button className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
