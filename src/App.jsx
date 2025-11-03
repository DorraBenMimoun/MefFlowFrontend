import { Routes, Route, Navigate } from "react-router-dom";
import { tenant } from "./tenant";
import Landing from "./pages/Landing";
import SuperAdminLogin from "./pages/SuperAdmin/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

export default function App() {
  const onRoot = !tenant; // root domain or localhost
  return (
    <>
      <Navbar />
      <Routes>
      {onRoot ? (
        <>
          <Route path="/" element={<Landing />} />
          <Route path="/__superadmin/login" element={<SuperAdminLogin />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        // Ici plus tard: routes pour la clinique (login/inscription/espaces).
        <>
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* placeholder clinic landing (à remplacer par la vraie app clinique) */}
          <Route path="/" element={<Landing clinicMode />} />
        </>
      )}
      </Routes>
      <Footer />
    </>
  );
}
