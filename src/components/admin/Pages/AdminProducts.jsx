import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
    Plus, Search, Trash2, Edit, X, Save, 
    Image as ImageIcon, Tag, Hash, DollarSign, 
    AlignLeft, Microscope, Layers, AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { 
    listProducts, 
    deleteProduct, 
    createProduct, 
    updateProduct 
} from '../../../redux/actions/productActions';
import { listCategories } from '../../../redux/actions/categoryActions';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '../../../redux/constants/productConstants';
import ConfirmModal from '../../common/ConfirmModal';

const AdminProducts = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [previewImages, setPreviewImages] = useState([]); // Both existing URLs and local blobs
    const [existingImagesList, setExistingImagesList] = useState([]); // Just the paths for backend
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const initialFormState = {
        brand: '',
        title: '',
        category: '',
        price: '',
        oldPrice: '',
        countInStock: '',
        description: '',
        shortDetails: '',
        overview: '',
        shortSpecification: '',
        technicalSpecification: '',
        color: '',
        width: '',
        height: '',
        depth: '',
        screenSize: '',
        images: [], // New files only
        reviews: [] // Array of { name, avatar, rating, comment }
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        dispatch(listProducts());
        dispatch(listCategories());

        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            closeForm();
        }

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            closeForm();
        }
        
        if (successDelete) {
            dispatch(listProducts());
        }
    }, [dispatch, successCreate, successUpdate, successDelete]);

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData(initialFormState);
        setPreviewImages([]);
        setExistingImagesList([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleQuillChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));

        const newPreviews = files.map(file => ({
            url: URL.createObjectURL(file),
            isNew: true,
            file
        }));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        const removed = previewImages[index];
        setPreviewImages(prev => prev.filter((_, i) => i !== index));

        if (removed.isNew) {
            setFormData(prev => ({ 
                ...prev, 
                images: prev.images.filter(f => f !== removed.file) 
            }));
        } else {
            setExistingImagesList(prev => prev.filter(path => !removed.url.endsWith(path)));
        }
    };

    const handleReviewChange = (index, field, value) => {
        const newReviews = [...formData.reviews];
        newReviews[index] = { ...newReviews[index], [field]: value };
        setFormData(prev => ({ ...prev, reviews: newReviews }));
    };

    const addReview = () => {
        setFormData(prev => ({
            ...prev,
            reviews: [...prev.reviews, { name: '', avatar: '', rating: 5, comment: '' }]
        }));
    };

    const removeReview = (index) => {
        setFormData(prev => ({
            ...prev,
            reviews: prev.reviews.filter((_, i) => i !== index)
        }));
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setFormData({
            brand: product.brand || '',
            title: product.title || '',
            category: product.category?._id || product.category || '',
            price: product.price || '',
            oldPrice: product.oldPrice || '',
            countInStock: product.countInStock || '',
            description: product.description || '',
            shortDetails: product.shortDetails || '',
            overview: product.overview || '',
            shortSpecification: product.shortSpecification || '',
            technicalSpecification: product.technicalSpecification || '',
            color: product.color || '',
            width: product.width || '',
            height: product.height || '',
            depth: product.depth || '',
            screenSize: product.screenSize || '',
            images: [],
            reviews: product.reviews || []
        });
        
        if (product.images) {
            setExistingImagesList(product.images);
            setPreviewImages(product.images.map(img => ({
                url: `http://localhost:5000${img}`,
                isNew: false
            })));
        }
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteProduct(itemToDelete));
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                formData.images.forEach(image => {
                    data.append('images', image);
                });
            } else if (key === 'reviews') {
                data.append('reviews', JSON.stringify(formData.reviews));
            } else {
                data.append(key, formData[key]);
            }
        });

        if (editingId) {
            // Include existing images to keep in a separate field
            data.append('existingImages', JSON.stringify(existingImagesList));
            dispatch(updateProduct(editingId, data));
        } else {
            dispatch(createProduct(data));
        }
    };

    const filteredProducts = products?.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <ConfirmModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="Delete Product?"
                message="Are you sure you want to remove this product from inventory? This will permanently delete its data and images."
                loading={loadingDelete}
            />
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Product Inventory</h1>
                    <p className="text-slate-500 text-sm font-medium">Manage and refine your store offerings.</p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-blue-100"
                    >
                        <Plus size={20} />
                        CREATE PRODUCT
                    </button>
                )}
            </div>

            {/* Error States */}
            {(error || errorDelete || errorCreate || errorUpdate) && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-bold animate-shake">
                    <AlertCircle size={20} />
                    {error || errorDelete || errorCreate || errorUpdate}
                </div>
            )}

            {/* Comprehensive Single Form */}
            {isFormOpen && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
                    <div className="bg-slate-900 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
                            <Tag className="text-blue-400" size={18} />
                            {editingId ? 'Updating Product' : 'Register New Product'}
                        </h3>
                        <button onClick={closeForm} className="text-slate-400 hover:text-white transition-colors">
                            <X size={28} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-12">
                        {/* Section 1: Basics */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><AlignLeft size={18}/></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Basic Information</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Laserjet Pro M404n"
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        placeholder="e.g. HP, Canon"
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {categories?.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Pricing & Stock */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><DollarSign size={18}/></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Pricing & Availability</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price ($)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-emerald-50/30 border border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none font-black text-emerald-700 text-lg"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sale Price ($)</label>
                                    <input
                                        type="number"
                                        name="oldPrice"
                                        value={formData.oldPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-500"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Level</label>
                                    <input
                                        type="number"
                                        name="countInStock"
                                        value={formData.countInStock}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Visuals */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><ImageIcon size={18}/></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Product Media</h4>
                            </div>
                            <div className="p-8 border-4 border-dashed border-slate-100 rounded-3xl text-center space-y-4 hover:border-blue-100 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer inline-flex flex-col items-center">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2 shadow-inner">
                                        <Plus size={32} />
                                    </div>
                                    <span className="font-black text-slate-800 uppercase tracking-widest text-xs">UPLOAD PRODUCT PHOTOS</span>
                                    <span className="text-slate-400 text-[10px] font-bold mt-1">PNG, JPG up to 5 files</span>
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {previewImages.map((img, i) => (
                                    <div key={i} className={`relative w-32 h-32 rounded-2xl overflow-hidden border-2 group shadow-lg ${img.isNew ? 'border-blue-400' : 'border-slate-100'}`}>
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                        <div className={`absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="p-2 bg-red-600 text-white rounded-xl shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                        {!img.isNew && (
                                            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-900/80 text-white text-[8px] font-black uppercase rounded">Existing</div>
                                        )}
                                        {img.isNew && (
                                            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-blue-600/80 text-white text-[8px] font-black uppercase rounded">New</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section 4: Rich Content */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><AlignLeft size={18}/></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Detailed Descriptions</h4>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Short Summary (Plain Text)</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="1"
                                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold text-slate-800 resize-none"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highlights (Rich Text)</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill 
                                            theme="snow" 
                                            value={formData.shortDetails} 
                                            onChange={(val) => handleQuillChange('shortDetails', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Narrative Overview</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill 
                                            theme="snow" 
                                            value={formData.overview} 
                                            onChange={(val) => handleQuillChange('overview', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Technical Data */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                                <div className="p-2 bg-slate-100 text-slate-800 rounded-lg"><Microscope size={18}/></div>
                                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Technical Specifications</h4>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Color</label>
                                    <input type="text" name="color" value={formData.color} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display</label>
                                    <input type="text" name="screenSize" value={formData.screenSize} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dim. (WxH)</label>
                                    <div className="flex gap-2">
                                        <input type="text" name="width" value={formData.width} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" placeholder="W" />
                                        <input type="text" name="height" value={formData.height} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" placeholder="H" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Specs Table</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill 
                                            theme="snow" 
                                            value={formData.shortSpecification} 
                                            onChange={(val) => handleQuillChange('shortSpecification', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Technical Data</label>
                                    <div className="quill-container bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <ReactQuill 
                                            theme="snow" 
                                            value={formData.technicalSpecification} 
                                            onChange={(val) => handleQuillChange('technicalSpecification', val)}
                                            modules={quillModules}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 6: Reviews & Testimonials */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Tag size={18}/></div>
                                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Reviews & Testimonials</h4>
                                </div>
                                <button
                                    type="button"
                                    onClick={addReview}
                                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-pink-100"
                                >
                                    <Plus size={14} />
                                    ADD REVIEW
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.reviews.map((review, index) => (
                                    <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 relative group animate-in slide-in-from-right-4 duration-300">
                                        <button
                                            type="button"
                                            onClick={() => removeReview(index)}
                                            className="absolute -top-2 -right-2 p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all border border-slate-100"
                                        >
                                            <X size={16} />
                                        </button>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reviewer Name</label>
                                                <input
                                                    type="text"
                                                    value={review.name}
                                                    onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avatar URL (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={review.avatar}
                                                    onChange={(e) => handleReviewChange(index, 'avatar', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating (1-5)</label>
                                                <select
                                                    value={review.rating}
                                                    onChange={(e) => handleReviewChange(index, 'rating', Number(e.target.value))}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20"
                                                >
                                                    {[5, 4, 3, 2, 1].map(num => (
                                                        <option key={num} value={num}>{num} Stars</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-1 md:col-span-2 lg:col-span-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                                                <textarea
                                                    value={review.comment}
                                                    onChange={(e) => handleReviewChange(index, 'comment', e.target.value)}
                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20 resize-none"
                                                    rows="1"
                                                    placeholder="Excellent product!"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {formData.reviews.length === 0 && (
                                    <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center">
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No reviews added for this product.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-10 border-t border-slate-200 flex justify-end sticky bottom-0 bg-white/95 backdrop-blur-sm px-4 py-6 rounded-b-3xl z-10 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
                            <button
                                type="submit"
                                disabled={loadingCreate || loadingUpdate}
                                className="w-full px-16 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-2xl shadow-slate-300 disabled:opacity-50 flex items-center justify-center gap-4 text-xl tracking-widest"
                            >
                                <Save size={28} />
                                {loadingCreate || loadingUpdate ? 'SAVING DATA...' : (editingId ? 'UPDATE PRODUCT' : 'REGISTER PRODUCT')}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Product List */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
                            <Layers size={20} />
                        </div>
                        <span className="font-black text-slate-800 uppercase tracking-widest">Active Stock</span>
                        <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-black">
                            {products?.length || 0}
                        </span>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search Inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-80 font-bold transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-slate-50/30 text-slate-400 font-black uppercase text-[10px] tracking-widest border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-5">Product Info</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Pricing</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="5" className="p-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest">SYNCHRONIZING INVENTORY...</td></tr>
                            ) : filteredProducts?.map((p) => (
                                <tr key={p._id} className="hover:bg-blue-50/30 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform rotate-1 group-hover:rotate-0">
                                                <img 
                                                    src={p.images?.[0] ? `http://localhost:5000${p.images[0]}` : '/printer.png'} 
                                                    alt="" 
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => e.target.src = '/printer.png'}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">{p.title}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">{p.brand || 'No Brand'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                            {p.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-black text-slate-900 text-xl tracking-tighter">${p.price.toFixed(2)}</div>
                                        {p.oldPrice > 0 && <div className="text-xs text-slate-300 line-through font-bold">${p.oldPrice.toFixed(2)}</div>}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${p.countInStock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                            <div className={`w-3 h-3 rounded-full border-2 border-white ${p.countInStock > 0 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                                            {p.countInStock > 0 ? `${p.countInStock} In Stock` : 'Depleted'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => handleEdit(p)} className="p-4 bg-white hover:bg-slate-900 text-slate-400 hover:text-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 transition-all active:scale-95">
                                                <Edit size={22} />
                                            </button>
                                            <button onClick={() => handleDelete(p._id)} className="p-4 bg-white hover:bg-red-600 text-slate-400 hover:text-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 transition-all active:scale-95">
                                                <Trash2 size={22} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!loading && filteredProducts?.length === 0 && (
                    <div className="p-32 text-center space-y-4">
                        <Tag size={80} className="mx-auto text-slate-100 animate-bounce duration-[3s]" />
                        <p className="font-black text-slate-300 uppercase tracking-widest text-sm">No Products Found In Inventory</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
