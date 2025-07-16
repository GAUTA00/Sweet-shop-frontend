import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllSweets, updateSweet } from "../api/sweets";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

export default function EditSweet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        fetchAllSweets()
            .then(res => {
                const sweet = res.data.find(item => item._id === id);
                if (sweet) {
                    setFormData({
                        name: sweet.name,
                        category: sweet.category,
                        price: sweet.price,
                        quantity: sweet.quantity
                    });
                } else {
                    setError("Sweet not found");
                }
            })
            .catch(() => setError("Failed to load sweet data"));
    }, [id]);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await updateSweet(id, {
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            });
            const backendMsg = res?.data?.message;
            if (backendMsg) {
                toast.success(backendMsg, {
                    style: {
                        borderRadius: '12px',
                        background: '#18181b',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 24px 0 #facc15'
                    },
                    iconTheme: {
                        primary: '#facc15',
                        secondary: '#18181b',
                    },
                });
            }
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            const backendMsg = err?.response?.data?.message;
            setError(backendMsg || "");
            if (backendMsg) {
                toast.error(backendMsg, {
                    style: {
                        borderRadius: '12px',
                        background: '#fff1f2',
                        color: '#b91c1c',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                    },
                });
            }
            console.error("Error updating sweet:", err);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
                <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-yellow-200 bg-white/80 backdrop-blur-md animate-fade-in mt-10">
                    <h2 className="text-3xl font-extrabold mb-6 text-yellow-600 flex items-center gap-2">
                        <span className="animate-bounce">✏️</span> Edit Sweet
                    </h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="edit-sweet-name" className="block text-yellow-600 font-semibold mb-1">
                                Sweet Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-white transition-all duration-300 outline-none"
                                required
                                id="edit-sweet-name"
                                autoComplete="off"
                            />
                        </div>

                        <div>
                            <label className="block text-yellow-600 font-semibold mb-1" htmlFor="edit-category">
                                Category
                            </label>
                            <select
                                id="edit-category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-white transition-all duration-300 outline-none"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Chocolate">Chocolate</option>
                                <option value="Candy">Candy</option>
                                <option value="Pastry">Pastry</option>
                                <option value="Milk-Based">Milk-Based</option>
                                <option value="Nut-Based">Nut-Based</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label htmlFor="edit-sweet-price" className="block text-yellow-600 font-semibold mb-1">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-white transition-all duration-300 outline-none"
                                    required
                                    id="edit-sweet-price"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="edit-sweet-quantity" className="block text-yellow-600 font-semibold mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-white transition-all duration-300 outline-none"
                                    required
                                    id="edit-sweet-quantity"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 tracking-wide text-lg flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v4m0 8v4m8-8h-4M4 12H0m16.24-7.76l-2.83 2.83M7.76 16.24l-2.83 2.83m12.02 0l-2.83-2.83M7.76 7.76L4.93 4.93" /></svg>
                            Update Sweet
                        </button>
                    </form>
                </div>
                <style>
                    {`
                    .animate-fade-in {
                        animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
                    }
                    @keyframes fadeIn {
                        0% { opacity: 0; transform: translateY(40px) scale(0.98);}
                        100% { opacity: 1; transform: translateY(0) scale(1);}
                    }
                    .animate-bounce {
                        animation: bounce 1s infinite;
                    }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    `}
                </style>
            </div>
        </>
    );
}