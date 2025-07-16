import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllSweets, restockSweet } from "../api/sweets";
import toast, { Toaster } from "react-hot-toast";

export default function RestockSweet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sweet, setSweet] = useState(null);
    const [restockAmount, setRestockAmount] = useState(1);
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

    const handleRestock = async e => {
        e.preventDefault();
        if (restockAmount < 1) {
            setError("Restock quantity must be at least 1.");
            toast.error("Restock quantity must be at least 1.", {
                style: {
                    borderRadius: '12px',
                    background: '#fff1f2',
                    color: '#a21caf',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                },
            });
            return;
        }

        try {
            const res = await restockSweet(id, restockAmount);
            const backendMsg = res?.data?.message;
            if (backendMsg) {
                toast.success(backendMsg, {
                    style: {
                        borderRadius: '12px',
                        background: '#18181b',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 24px 0 #a21caf'
                    },
                    iconTheme: {
                        primary: '#a21caf',
                        secondary: '#18181b',
                    },
                });
            }
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            const backendMsg = err?.response?.data?.message || "Failed to restock. Try again.";
            setError(backendMsg);
            toast.error(backendMsg, {
                style: {
                    borderRadius: '12px',
                    background: '#fff1f2',
                    color: '#a21caf',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                },
            });
        }
    };

    if (!sweet) return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
            <div className="text-center text-lg text-purple-700 animate-pulse">Loading sweet details...</div>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl border border-purple-200 bg-white/80 backdrop-blur-md animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-6 text-purple-700 flex items-center gap-2">
                    <span className="animate-bounce">🔁</span> Restock: <span className="ml-2 text-purple-900">{sweet.name}</span>
                </h2>

                {error && <p className="text-purple-600 mb-4 font-semibold">{error}</p>}

                <div className="mb-4 flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Current Stock:</span>
                    <span className="text-purple-700 font-bold">{sweet.quantity}</span>
                </div>

                <form onSubmit={handleRestock} className="space-y-6">
                    <div>
                        <label htmlFor="restock-amount" className="block text-purple-600 font-semibold mb-1">
                            Quantity to Restock
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={restockAmount}
                            onChange={e => setRestockAmount(Number(e.target.value))}
                            className="w-full border-2 border-purple-300 focus:border-purple-500 px-4 py-3 rounded-xl bg-white transition-all duration-300 outline-none"
                            required
                            id="restock-amount"
                            autoComplete="off"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:to-purple-800 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 tracking-wide text-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm2 2h12v12H6V6zm3 3v6h6V9H9z" /></svg>
                        Confirm Restock
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