import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetail from "./pages/PetDetail";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import OrderSuccess from "./pages/OrderSuccess";

function AppContent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //check if user is on local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("petnestUser");
    const storedToken = localStorage.getItem("petnestToken");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData.user);
    //store token and userdata in local storage
    localStorage.setItem("petnestUser", JSON.stringify(userData.user));
    localStorage.setItem("petnestToken", userData.token);
    navigate("/pets"); // go to pets after log in
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("petnestUser");
    localStorage.removeItem("petnestToken");
    navigate("/");
  };

  return (
    <>
      <Navbar user={user} onSignOut={handleSignOut} />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:petID" element={<PetDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage user={user}/>} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
