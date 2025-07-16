import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteSweet } from '../api/sweets';
import toast, { Toaster } from 'react-hot-toast';

const DeleteSweet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [confirmation, setConfirmation] = useState('');
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        if (confirmation !== 'delete') {
            setMessage('Please type "delete" to confirm.');
            return;
        }
        try {
            const res = await deleteSweet(id);
            const backendMsg = res?.data?.message;
            if (backendMsg) {
                toast.success(backendMsg, {
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
                setMessage('');
            }
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            const backendMsg = error?.response?.data?.message;
            if (backendMsg) {
                toast.error(backendMsg, {
                    style: {
                        borderRadius: '12px',
                        background: '#f87171',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 24px 0 #dc2626'
                    },
                    iconTheme: {
                        primary: '#dc2626',
                        secondary: '#f87171',
                    },
                });
                setMessage('');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-green-200 bg-white/80 backdrop-blur-md animate-fade-in">
                <h2 className="text-3xl font-extrabold mb-6 text-red-700 flex items-center gap-2">
                    <span className="animate-bounce">🗑️</span> Delete Sweet
                </h2>
                <p className="mb-4 text-red-600 font-semibold">
                    Type <b>delete</b> below to confirm deletion.
                </p>
                {message && <p className="text-red-600 mb-4 font-semibold">{message}</p>}
                <form onSubmit={handleDelete} className="space-y-6">
                    <div>
                        <label htmlFor="delete-confirm" className="block text-red-600 font-semibold mb-1">
                            Confirmation
                        </label>
                        <input
                            type="text"
                            id="delete-confirm"
                            placeholder='Type "delete" to confirm'
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                            className="w-full border-2 border-red-300 focus:border-red-500 px-4 py-3 rounded-xl bg-white transition-all duration-300 outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-500 hover:to-red-800 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 tracking-wide text-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                        Delete
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
};

export default DeleteSweet;