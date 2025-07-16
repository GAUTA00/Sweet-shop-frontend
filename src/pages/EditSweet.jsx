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
            await updateSweet(id, {
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            });
            toast.success("Sweet updated successfully! 🎉", {
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
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError("Failed to update sweet");
            toast.error("Failed to update sweet 😢", {
                style: {
                    borderRadius: '12px',
                    background: '#fff1f2',
                    color: '#b91c1c',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                },
            });
            console.error("Error updating sweet:", err);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            <div className="max-w-xl mx-auto mt-10 p-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-3xl shadow-2xl border border-yellow-200 animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-6 text-yellow-600 flex items-center gap-2">
                    <span className="animate-bounce">✏️</span> Edit Sweet
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="text"
                            name="name"
                            placeholder=" "
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                            required
                        />
                        <label className="absolute left-4 top-3 text-yellow-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-yellow-600">
                            Sweet Name
                        </label>
                    </div>

                    <div className="mb-2">
                        <label className="block text-yellow-600 font-semibold mb-1" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none"
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
                        <div className="relative flex-1 group">
                            <input
                                type="number"
                                name="price"
                                placeholder=" "
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                                required
                            />
                            <label className="absolute left-4 top-3 text-yellow-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-yellow-600">
                                Price
                            </label>
                        </div>
                        <div className="relative flex-1 group">
                            <input
                                type="number"
                                name="quantity"
                                placeholder=" "
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border-2 border-yellow-300 focus:border-yellow-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                                required
                            />
                            <label className="absolute left-4 top-3 text-yellow-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-yellow-600">
                                Quantity
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 tracking-wide text-lg"
                    >
                        <span className="inline-flex items-center gap-2">
                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v4m0 8v4m8-8h-4M4 12H0m16.24-7.76l-2.83 2.83M7.76 16.24l-2.83 2.83m12.02 0l-2.83-2.83M7.76 7.76L4.93 4.93" /></svg>
                            Update Sweet
                        </span>
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
                `}
            </style>
        </>
    );
}