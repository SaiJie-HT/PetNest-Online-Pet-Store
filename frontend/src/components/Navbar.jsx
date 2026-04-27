import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";

export default function Navbar() {
  const { count } = useCart();

  const linkStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "92%",
        maxWidth: "1100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        borderRadius: "999px",
        background: "rgba(10, 10, 10, 0.82)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "20px",
          fontWeight: 800,
        }}
      >
        Pet<span style={{ color: "#E8C547" }}>Nest</span> 🐾
      </Link>

      <div style={{ display: "flex", gap: "22px", alignItems: "center" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/pets" style={linkStyle}>Pets</Link>
        <Link to="/search" style={linkStyle}>Search</Link>
        <Link to="/login" style={linkStyle}>Sign In</Link>
        <Link to="/signup" style={linkStyle}>Register</Link>

        <Link
          to="/cart"
          style={{
            color: "#000",
            background: "#E8C547",
            padding: "8px 16px",
            borderRadius: "999px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Cart ({count})
        </Link>
      </div>
    </nav>
  );
}