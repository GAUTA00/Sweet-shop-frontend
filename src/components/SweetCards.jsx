import { Link } from "react-router-dom";

export default function SweetCard({ sweet }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold">{sweet.name}</h3>
            <p className="text-sm text-gray-500">Category: {sweet.category}</p>
            <p className="mt-1">₹{sweet.price} • Stock: {sweet.quantity}</p>

            <div className="mt-4 flex flex-wrap gap-2">
                <Link to={`/updateSweet/${sweet._id}`} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Edit
                </Link>
                <Link to={`/purchaseSweet/${sweet._id}`} className="px-3 py-1 bg-green-600 text-white rounded text-sm">
                    Purchase
                </Link>
                <Link to={`/restockSweet/${sweet._id}`} className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                    Restock
                </Link>
            </div>
        </div>
    );
}
