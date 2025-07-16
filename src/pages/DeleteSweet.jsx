import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteSweet } from '../api/sweets';

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
            await deleteSweet(id);
            setMessage('Sweet deleted successfully!');
            setTimeout(() => navigate('/'), 1000); // Redirect after 1s
        } catch (error) {
            setMessage('Failed to delete sweet.');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Delete Sweet</h2>
            <p className="mb-2 text-red-600">Type <b>delete</b> below to confirm deletion.</p>
            <form onSubmit={handleDelete} className="space-y-4">
                <input
                    type="text"
                    placeholder='Type "delete" to confirm'
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default DeleteSweet;