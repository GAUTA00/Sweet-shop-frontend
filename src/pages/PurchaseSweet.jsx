import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllSweets, purchaseSweet } from "../api/sweets";
import toast, { Toaster } from "react-hot-toast";

export default function PurchaseSweet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sweet, setSweet] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAllSweets()
            .then(res => {
                const selected = res.data.find(item => item._id === id);
                if (selected) {
                    setSweet(selected);
                } else {
                    setError("Sweet not found.");
                }
            })
            .catch(() => setError("Failed to load sweet."));
    }, [id]);

    const handlePurchase = async e => {
        e.preventDefault();
        if (quantity > sweet.quantity) {
            setError("Not enough stock available.");
            toast.error("Not enough stock available.", {
                style: {
                    borderRadius: '12px',
                    background: '#fff1f2',
                    color: '#b91c1c',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                },
            });
            return;
        }

        try {
            await purchaseSweet(id, quantity);
            toast.success("Purchase successful! 🎉", {
                style: {
                    borderRadius: '12px',
                    background: '#18181b',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 24px 0 #3b82f6'
                },
                iconTheme: {
                    primary: '#3b82f6',
                    secondary: '#18181b',
                },
            });
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            setError("Purchase failed. Try again.");
            toast.error("Purchase failed. Try again.", {
                style: {
                    borderRadius: '12px',
                    background: '#fff1f2',
                    color: '#b91c1c',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                },
            });
        }
    };

    if (!sweet) return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <div className="text-center text-lg text-blue-700 animate-pulse">Loading sweet details...</div>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-blue-200 bg-white/80 backdrop-blur-md animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
                    <span className="animate-bounce">🛒</span> Purchase: <span className="ml-2 text-blue-900">{sweet.name}</span>
                </h2>

                {error && <p className="text-red-500 mb-4 font-semibold">{error}</p>}

                <div className="mb-4 flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Available Stock:</span>
                    <span className="text-blue-700 font-bold">{sweet.quantity}</span>
                </div>

                <form onSubmit={handlePurchase} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="number"
                            min="1"
                            max={sweet.quantity}
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            className="w-full border-2 border-blue-300 focus:border-blue-500 px-4 py-3 rounded-xl bg-transparent transition-all duration-300 outline-none peer"
                            required
                            id="purchase-quantity"
                            autoComplete="off"
                        />
                        <label htmlFor="purchase-quantity" className="absolute left-4 top-3 text-blue-500 bg-white px-1 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600">
                            Quantity to Purchase
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 tracking-wide text-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.95-.68L21 9M7 13V6h13" /></svg>
                        Confirm Purchase
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