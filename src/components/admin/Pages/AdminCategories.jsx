import React, { useState } from 'react';
import { Plus, Search, MoreHorizontal, Layers, Trash2, Edit } from 'lucide-react';

const AdminCategories = () => {
    // Dummy Data
    const [categories, setCategories] = useState([
        { id: 1, title: 'All In One Printers', items: 124, status: 'Active' },
        { id: 2, title: 'Laser Printers', items: 85, status: 'Active' },
        { id: 3, title: 'Inkjet Printers', items: 62, status: 'Active' },
        { id: 4, title: 'Large Format', items: 12, status: 'Inactive' },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', items: '' });

    const handleAddCategory = (e) => {
        e.preventDefault();
        const newCategory = {
            id: categories.length + 1,
            title: newItem.title,
            items: Number(newItem.items),
            status: 'Active'
        };
        setCategories([newCategory, ...categories]);
        setNewItem({ title: '', items: '' });
        setIsFormOpen(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
                    <p className="text-slate-500">Manage your product categories and items.</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    Create New
                </button>
            </div>

            {/* Creation Form (Simple Inline/Modal Toggle) */}
            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-lg animate-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800">Add New Category</h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">Cancel</button>
                    </div>
                    <form onSubmit={handleAddCategory} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Category Title</label>
                            <input
                                type="text"
                                placeholder="e.g. 3D Printers"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="w-full md:w-48 space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Total Items</label>
                            <input
                                type="number"
                                placeholder="0"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={newItem.items}
                                onChange={(e) => setNewItem({ ...newItem, items: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full md:w-auto px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">
                            Save Category
                        </button>
                    </form>
                </div>
            )}

            {/* Categories List */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {/* Table Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Layers size={18} />
                        <span className="font-semibold text-sm">All Categories</span>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            {categories.length}
                        </span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 w-48"
                        />
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 w-16">
                                    <input type="checkbox" className="rounded border-slate-300" />
                                </th>
                                <th className="px-6 py-4">Category Name</th>
                                <th className="px-6 py-4">Total Items</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <input type="checkbox" className="rounded border-slate-300" />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{cat.title}</td>
                                    <td className="px-6 py-4 text-slate-500">{cat.items} items</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cat.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                            }`}>
                                            {cat.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500 hover:text-red-600">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State if needed */}
                {categories.length === 0 && (
                    <div className="p-12 text-center text-slate-400">
                        <Layers size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No categories found. Create one to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
