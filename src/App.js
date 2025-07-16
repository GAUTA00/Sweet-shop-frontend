import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddSweet from "./pages/AddSweet";
import EditSweet from "./pages/EditSweet";
import PurchaseSweet from "./pages/PurchaseSweet";
import RestockSweet from "./pages/RestockSweet";
import DeleteSweet from "./pages/DeleteSweet";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddSweet />} />
        <Route path="/updateSweet/:id" element={<EditSweet />} />
        <Route path="/purchaseSweet/:id" element={<PurchaseSweet />} />
        <Route path="/restockSweet/:id" element={<RestockSweet />} />
        <Route path="/deleteSweet/:id" element={<DeleteSweet />} />
      </Routes>
    </BrowserRouter>
  );
}
