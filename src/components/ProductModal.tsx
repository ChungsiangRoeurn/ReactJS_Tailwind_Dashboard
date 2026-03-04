import { useState, useEffect, useRef } from "react";
import { Product } from "../types/products";
import { FiTrash2, FiUpload, FiX } from "react-icons/fi";

// ── Configure your Cloudinary credentials here ──────────────────────────────
const CLOUDINARY_CLOUD_NAME = (import.meta as any).env
  .VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = (import.meta as any).env
  .VITE_CLOUDINARY_UPLOAD_PRESET;
// ────────────────────────────────────────────────────────────────────────────

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Product>) => Promise<boolean> | boolean;
  initialData?: Product | null;
}

const emptyForm: Partial<Product> = {
  name: "",
  price: "",
  stock: 0,
  image_url: "",
  description: "",
  product_details: "",
};

function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProductModalProps) {
  const [form, setForm] = useState<Partial<Product>>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setImagePreview(initialData.image_url || "");
    } else {
      setForm(emptyForm);
      setImagePreview("");
    }
    setImageFile(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setForm({ ...form, image_url: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadToCloudinary = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("folder", "products");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: data },
    );

    if (!res.ok) {
      const error = await res.json();
      console.error("Cloudinary error:", error);
      throw new Error("Image upload failed");
    }

    const json = await res.json();
    return json.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let finalImageUrl = form.image_url || "";

      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const result = await onSubmit({ ...form, image_url: finalImageUrl });

      if (result) onClose();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Image upload or update failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-0 sm:px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {initialData ? "Edit Product" : "Add Product"}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {initialData
                ? "Update product information"
                : "Fill in the product details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5 space-y-5">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Product Image
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 h-48">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group">
                  <button
                    onClick={removeImage}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                  dragOver
                    ? "border-cyan-400 bg-cyan-50"
                    : "border-gray-200 bg-gray-50 hover:border-cyan-300 hover:bg-cyan-50/40"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    dragOver ? "bg-cyan-100" : "bg-gray-100"
                  }`}
                >
                  <FiUpload
                    className={`w-5 h-5 ${
                      dragOver ? "text-cyan-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {dragOver ? "Drop to upload" : "Click or drag image here"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="e.g. Ice Latte"
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
            />
          </div>

          {/* Price + Stock row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Price <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  $
                </span>
                <input
                  name="price"
                  value={form.price || ""}
                  onChange={handleChange}
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full pl-7 pr-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Stock <span className="text-red-400">*</span>
              </label>
              <input
                name="stock"
                value={form.stock ?? ""}
                onChange={handleChange}
                placeholder="0"
                type="number"
                min="0"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Short description shown to customers..."
              rows={2}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Product Details */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Product Details
            </label>
            <textarea
              name="product_details"
              value={form.product_details || ""}
              onChange={handleChange}
              placeholder="Ingredients, allergens, preparation notes..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl bg-white placeholder-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading || !form.name}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : initialData ? (
              "Save Changes"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
