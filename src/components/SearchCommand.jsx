import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("name") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
    const [order, setOrder] = useState(searchParams.get("order") || "asc");

    // Ctrl + K to focus
    useEffect(() => {
        const handler = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    // 🔍 Apply filters to URL
    const applySearch = () => {
        const params = {};
        if (query) params.name = query;
        if (category) params.category = category;
        if (sortBy) params.sortBy = sortBy;
        if (order) params.order = order;
        setSearchParams(params);
    };

    // ⏳ Debounce search
    useEffect(() => {
        const timeout = setTimeout(applySearch, 400);
        return () => clearTimeout(timeout);
    }, [query, category, sortBy, order]);

    return (
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full px-4 mb-4">
            <input
                ref={inputRef}
                type="text"
                placeholder="🔍 Ctrl + K to search by name"
                className="px-3 py-2 border rounded w-full sm:w-64"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <select
                className="px-2 py-1 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Milk-Based">Milk-Based</option>
                <option value="Nut-Based">Nut-Based</option>
                <option value="Sugary-Based">Sugary-Based</option>
                <option value="Chocolate">Chocolate</option>
                <option value="Candy">Candy</option>
            </select>

            <select
                className="px-2 py-1 border rounded"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="">Sort By</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
            </select>

            <select
                className="px-2 py-1 border rounded"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
            >
                <option value="asc">⬆ Asc</option>
                <option value="desc">⬇ Desc</option>
            </select>
        </div>
    );
}
