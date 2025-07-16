import { useState } from "react";
import { addSweet } from "../api/sweets";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddSweet() {
    const [formData, setFormData] = useState({
        name: "",
        category: "Chocolate",
        price: "",
        quantity: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await addSweet(formData);
            toast.success("Sweet added successfully! 🎉", {
                style: {
                    borderRadius: '12px',
                    background: '#18181b',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 24px 0 #22c55e'
                },
                iconTheme: {
                    primary: '#22c55e',
                    secondary: '#18181b',
                },
            });
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError("Failed to add sweet. Please check your inputs.");
            toast.error("Failed to add sweet. Please check your inputs.", {
                style: {
                    borderRadius: '12px',
                    background: '#fff1f2',
                    color: '#16a34a',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                },
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-green-200 bg-white/80 backdrop-blur-md animate-fade-in">
                <h1 className="text-3xl font-extrabold mb-6 text-green-700 flex items-center gap-2">
                    <span className="animate-bounce">➕</span> Add New Sweet
                </h1>

                {error && <p className="text-green-600 mb-4 font-semibold">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="text"
                            name="name"
                            placeholder=" "
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-2 border-green-300 focus:border-green-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                            required
                            id="sweet-name"
                            autoComplete="off"
                        />
                        <label htmlFor="sweet-name" className="absolute left-4 top-3 text-green-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600">
                            Sweet Name
                        </label>
                    </div>

                    <div className="mb-2">
                        <label className="block text-green-600 font-semibold mb-1" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border-2 border-green-300 focus:border-green-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none"
                        >
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
                                className="w-full border-2 border-green-300 focus:border-green-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                                required
                                id="sweet-price"
                                autoComplete="off"
                            />
                            <label htmlFor="sweet-price" className="absolute left-4 top-3 text-green-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600">
                                Price (₹)
                            </label>
                        </div>
                        <div className="relative flex-1 group">
                            <input
                                type="number"
                                name="quantity"
                                placeholder=" "
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border-2 border-green-300 focus:border-green-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                                required
                                id="sweet-quantity"
                                autoComplete="off"
                            />
                            <label htmlFor="sweet-quantity" className="absolute left-4 top-3 text-green-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-green-600">
                                Quantity
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:to-green-800 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 tracking-wide text-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                        Add Sweet
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
        </div>
    );
}