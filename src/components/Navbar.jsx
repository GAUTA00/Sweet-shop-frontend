import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-yellow-400/80 backdrop-blur-md shadow-lg py-3 px-6 sticky top-0 z-50 animate-navbar-fade">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-wider flex items-center gap-2 text-yellow-900 hover:scale-105 transition-transform duration-200"
                >
                    <span className="animate-bounce">🍬</span>
                    Sweet Shop
                </Link>
                <div className="flex gap-2 sm:gap-4">
                    <Link
                        to="/"
                        className="relative px-4 py-2 rounded-lg font-semibold text-yellow-900 transition-all duration-200 hover:bg-yellow-500/80 hover:text-white hover:shadow-lg group"
                    >
                        <span className="group-hover:underline">Home</span>
                    </Link>
                    <Link
                        to="/add"
                        className="relative px-4 py-2 rounded-lg font-semibold text-yellow-900 transition-all duration-200 hover:bg-yellow-500/80 hover:text-white hover:shadow-lg group"
                    >
                        <span className="group-hover:underline">Add</span>
                    </Link>
                </div>
            </div>
            <style>
                {`
                .animate-navbar-fade {
                    animation: navbarFadeIn 1s cubic-bezier(0.4,0,0.2,1) both;
                }
                @keyframes navbarFadeIn {
                    0% { opacity: 0; transform: translateY(-24px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                `}
            </style>
        </nav>
    );
}