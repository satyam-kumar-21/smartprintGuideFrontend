import React, { useState } from 'react';
import {
    Plus,
    Package,
    Trash2,
    Edit,
    Image as ImageIcon,
    Star,
    X,
    Save,
    UploadCloud
} from 'lucide-react';

const AdminProducts = () => {
    // Dummy Categories
    const categories = ['All-in-One Printers', 'Laser Printers', 'Inkjet Printers', 'Large Format', 'Scanners', 'Supplies'];

    // Dummy Products Data
    const [products, setProducts] = useState([
        {
            id: 1,
            brand: 'Brother',
            title: 'Brother HL-L3295CDW Wireless Compact Digital Color Printer',
            price: 429.99,
            oldPrice: 499.99,
            rating: 5,
            reviews: 104,
            sales: 98,
            category: 'Laser Printers',
            stock: 'In Stock',
            description: 'Create beautiful prints quickly with help from this Brother printer.',
            color: 'Gray',
            width: '17-9/16 in',
            height: '10-3/4 in',
            depth: '15-5/8 in',
            screenSize: '2.7 in',
            images: []
        },
        {
            id: 2,
            brand: 'HP',
            title: 'HP LaserJet Pro M4001dn Monochrome Printer',
            price: 289.00,
            oldPrice: 329.00,
            rating: 4.8,
            reviews: 86,
            sales: 45,
            category: 'Laser Printers',
            stock: 'Low Stock',
            description: 'Efficient monochrome printing for small offices.',
            color: 'White',
            width: '15 in',
            height: '8.5 in',
            depth: '14 in',
            screenSize: '2.0 in',
            images: []
        }
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Initial Form State
    const initialFormState = {
        brand: '',
        title: '',
        category: '',
        price: '',
        oldPrice: '',
        stock: 'In Stock',
        rating: 5,
        reviews: 0,
        sales: 0,
        description: '',
        color: '',
        width: '',
        height: '',
        depth: '',
        screenSize: '',
        images: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [previewImages, setPreviewImages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle Image Upload
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            // For frontend demo, we just create object URLs
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newPreviews]);
            // In real backend, we would upload these files
            setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
        }
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    // Open Form for New Product
    const handleAddNew = () => {
        setEditingId(null);
        setFormData(initialFormState);
        setPreviewImages([]);
        setIsFormOpen(true);
    };

    // Open Form for Edit
    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            brand: product.brand,
            title: product.title,
            category: product.category,
            price: product.price,
            oldPrice: product.oldPrice || '',
            stock: product.stock,
            rating: product.rating,
            reviews: product.reviews,
            sales: product.sales,
            description: product.description || '',
            color: product.color || '',
            width: product.width || '',
            height: product.height || '',
            depth: product.depth || '',
            screenSize: product.screenSize || '',
            images: product.images || []
        });
        setPreviewImages(product.images || []); // Assuming product.images are URLs in real app
        setIsFormOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submittedData = {
            ...formData,
            price: Number(formData.price),
            oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
            reviews: Number(formData.reviews),
            sales: Number(formData.sales),
            rating: Number(formData.rating),
            images: previewImages // Saving previews as dummy images
        };

        if (editingId) {
            setProducts(products.map(p => p.id === editingId ? { ...submittedData, id: editingId } : p));
        } else {
            const newProduct = {
                id: products.length + 1,
                ...submittedData
            };
            setProducts([newProduct, ...products]);
        }

        setIsFormOpen(false);
        setEditingId(null);
        setFormData(initialFormState);
        setPreviewImages([]);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    <p className="text-slate-500">Manage your product inventory and specifications.</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                        Add Product
                    </button>
                )}
            </div>

            {/* Product Creation/Edit Form */}
            {isFormOpen && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-top-4">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Package size={20} className="text-blue-600" />
                            {editingId ? 'Edit Product' : 'Add New Product'}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Basic Info */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-slate-900 border-b pb-2 mb-4">Basic Information</h4>

                            {/* Images Upload */}
                            <div className="mb-4">
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Product Images</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <UploadCloud size={32} />
                                        <span className="text-sm font-medium">Click to Upload Images</span>
                                        <span className="text-xs">PNG, JPG up to 10MB</span>
                                    </div>
                                </div>
                                {/* Image Previews */}
                                {previewImages.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {previewImages.map((img, index) => (
                                            <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 group">
                                                <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Brother"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Product Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Full product name..."
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Old Price ($)</label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        step="0.01"
                                        value={formData.oldPrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Additional Specs Section */}
                            <h4 className="font-semibold text-slate-900 border-b pb-2 mt-6 mb-4">Specifications</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Color</label>
                                    <input
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Gray"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Screen Size</label>
                                    <input
                                        type="text"
                                        name="screenSize"
                                        value={formData.screenSize}
                                        onChange={handleInputChange}
                                        placeholder="e.g. 2.7 in"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Width</label>
                                    <input
                                        type="text"
                                        name="width"
                                        value={formData.width}
                                        onChange={handleInputChange}
                                        placeholder="17 in"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height</label>
                                    <input
                                        type="text"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleInputChange}
                                        placeholder="10 in"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Depth</label>
                                    <input
                                        type="text"
                                        name="depth"
                                        value={formData.depth}
                                        onChange={handleInputChange}
                                        placeholder="15 in"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Status & Details */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-slate-900 border-b pb-2 mb-4">Status & Details</h4>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stock Status</label>
                                    <select
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sales (7 days)</label>
                                    <input
                                        type="number"
                                        name="sales"
                                        value={formData.sales}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rating (0-5)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        max="5"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Total Reviews</label>
                                    <input
                                        type="number"
                                        name="reviews"
                                        value={formData.reviews}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Short Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="5"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    placeholder="Enter key product features..."
                                ></textarea>
                            </div>
                        </div>

                        {/* Full Width Footer Actions */}
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
                            >
                                <Save size={20} />
                                {editingId ? 'Update Product' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Package size={18} />
                        <span className="font-semibold text-sm">All Products</span>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            {products.length}
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded" /></th>
                                <th className="px-6 py-4">Product Info</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Performance</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4"><input type="checkbox" className="rounded" /></td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden">
                                                {product.images && product.images.length > 0 ? (
                                                    <img src={product.images[0]} alt="Product" className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon size={20} />
                                                )}
                                            </div>
                                            <div className="max-w-xs">
                                                <div className="font-bold text-slate-800 line-clamp-1">{product.title}</div>
                                                <div className="text-xs text-slate-500">{product.brand}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">${product.price.toFixed(2)}</div>
                                        {product.oldPrice && (
                                            <div className="text-xs text-slate-400 line-through">${product.oldPrice.toFixed(2)}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`w-2 h-2 rounded-full ${product.stock === 'In Stock' ? 'bg-green-500' :
                                                    product.stock === 'Low Stock' ? 'bg-orange-500' : 'bg-red-500'
                                                }`} />
                                            <span className="text-slate-600 font-medium text-xs">{product.stock}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                                                <Star size={12} fill="currentColor" />
                                                {product.rating} <span className="text-slate-400 font-normal">({product.reviews})</span>
                                            </div>
                                            <div className="text-xs text-green-600 font-medium">
                                                {product.sales} sold (7d)
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
