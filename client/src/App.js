import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardChart from "./components/DashboardChart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TempleDetails from "./pages/TempleDetails";
import Bookings from "./pages/Bookings";
import AdminDashboard from "./pages/AdminDashboard";
import ManageTemples from "./pages/ManageTemples";
import AddTemple from "./pages/AddTemple";
import EditTemple from "./pages/EditTemple";
import ManageSlots from "./pages/ManageSlots";
import AddSlot from "./pages/AddSlot";
import ManageBookings from "./pages/ManageBookings";
import ManageUsers from "./pages/ManageUsers";
import EditSlot from "./pages/EditSlot";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/temple/:id" element={<TempleDetails />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/temples" element={<ManageTemples />} />
        <Route path="/admin/add-temple" element={<AddTemple />} />
        <Route path="/admin/edit-temple/:id" element={<EditTemple />} />
        <Route path="/admin/slots" element={<ManageSlots />} />
        <Route path="/admin/add-slot" element={<AddSlot />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/edit-slot/:id" element={<EditSlot />} />
        <Route path="/admin/dashboard-chart" element={<DashboardChart />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
