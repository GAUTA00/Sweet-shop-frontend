import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllSweets, searchSweets } from "../api/sweets";
import SweetCard from "../components/SweetCards";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchCommand";
import toast from "react-hot-toast";

export default function Home() {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const queryParams = Object.fromEntries([...searchParams]);

        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                if (Object.keys(queryParams).length > 0) {
                    const res = await searchSweets(queryParams);
                    setSweets(res.data.sweets);
                } else {
                    const res = await fetchAllSweets();
                    setSweets(res.data);
                }
            } catch (err) {
                const backendMsg = err?.response?.data?.message || "Error fetching sweets";
                setError(backendMsg);
                toast.error(backendMsg, {
                    style: {
                        borderRadius: '12px',
                        background: '#fff1f2',
                        color: '#b91c1c',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                    },
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams]);

    return (
        <>
            <Navbar />
            <main className="max-w-6xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">🍬 All Sweets</h1>
                </div>

                <SearchBar />

                {loading ? (
                    <p className="text-gray-500">Loading sweets...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : sweets.length === 0 ? (
                    <p className="text-gray-500">No sweets found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                        {sweets.map((sweet) => (
                            <SweetCard key={sweet._id} sweet={sweet} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}