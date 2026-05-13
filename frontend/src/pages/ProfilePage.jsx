import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ user }) {
  const navigate = useNavigate();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("petnestToken");

    // Redirect to login if user object or token is missing
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const getProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:9090/profile/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await response.json();

        if (!response.ok) {
          throw new Error(profileData.message || "Failed to fetch profile.");
        }

        // Set state from the fetched profile data
        setFirstName(profileData.FirstName || "");
        setLastName(profileData.LastName || "");
        setShippingAddress(profileData.ShippingAddress || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user, navigate]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateMessage("");
    setError("");
    setIsUpdating(true);

    const token = localStorage.getItem("petnestToken");
    if (!token) {
      setError("Authentication error. Please sign in again.");
      setIsUpdating(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/profile/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          ShippingAddress: shippingAddress,
        }),
      });

      const updatedProfile = await response.json();

      if (!response.ok) {
        throw new Error(updatedProfile.message || "Failed to update profile.");
      }

      setUpdateMessage("Profile updated successfully!");
      setShowUpdateForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#0A0A0A] min-h-screen text-white flex items-center justify-center">
        <p className="text-neutral-500 text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white pt-28 pb-16 px-6">
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(10,10,10,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "32px" }}>
        <h1 className="text-3xl font-bold text-center mb-8" style={{ color: "#E8C547" }}>Your Profile</h1>

        {updateMessage && (
          <div style={{ background: "rgba(157,216,106,0.1)", border: "1px solid rgba(157,216,106,0.5)", color: "#9DD86A", padding: "10px", borderRadius: "8px", fontSize: "14px", textAlign: "center", marginBottom: "20px" }}>
            {updateMessage}
          </div>
        )}

        {error && (
          <div style={{ background: "rgba(224,82,82,0.1)", border: "1px solid rgba(224,82,82,0.5)", color: "#E05252", padding: "10px", borderRadius: "8px", fontSize: "14px", textAlign: "center", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        {/* Display Current Information */}
        <div style={{ marginBottom: "24px", padding: "16px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", minHeight: "150px" }}>
          <h2 className="text-xl font-semibold mb-4">Current Information</h2>
          {loading ? (
            <p style={{ color: "#aaa" }}>Loading profile...</p>
          ) : (
            <>
              <p style={{ marginBottom: "8px" }}>
                <span style={{ color: "#aaa", marginRight: "8px" }}>Email:</span>
                <span style={{ color: "white" }}>{user.email}</span>
              </p>
              <p style={{ marginBottom: "8px" }}>
                <span style={{ color: "#aaa", marginRight: "8px" }}>First Name:</span>
                <span style={{ color: "white" }}>{firstName || "N/A"}</span>
              </p>
              <p style={{ marginBottom: "8px" }}>
                <span style={{ color: "#aaa", marginRight: "8px" }}>Last Name:</span>
                <span style={{ color: "white" }}>{lastName || "N/A"}</span>
              </p>
              <p>
                <span style={{ color: "#aaa", marginRight: "8px" }}>Shipping Address:</span>
                <span style={{ color: "white" }}>{shippingAddress || "N/A"}</span>
              </p>
            </>
          )}
        </div>

        {/* Toggle Update Form Button */}
        <button
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          style={{
            width: "100%",
            padding: "12px 20px",
            borderRadius: "999px",
            background: "linear-gradient(to right, #f0d060, #E8C547)",
            color: "#000",
            fontWeight: 700,
            fontSize: "16px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            marginBottom: "24px",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          {showUpdateForm ? "Cancel Update" : "Update Profile Information"}
        </button>

        {/* Update Form */}
        {showUpdateForm && (
          <form onSubmit={handleUpdateSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}>
            <h2 className="text-xl font-semibold mb-2">Update Details</h2>
            <div>
              <label htmlFor="firstName" style={{ display: "block", marginBottom: "8px", color: "#aaa", fontSize: "14px" }}>First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                  padding: "10px 16px", color: "white", fontSize: "14px",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label htmlFor="lastName" style={{ display: "block", marginBottom: "8px", color: "#aaa", fontSize: "14px" }}>Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                  padding: "10px 16px", color: "white", fontSize: "14px",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label htmlFor="shippingAddress" style={{ display: "block", marginBottom: "8px", color: "#aaa", fontSize: "14px" }}>Shipping Address</label>
              <input
                type="text"
                id="shippingAddress"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                  padding: "10px 16px", color: "white", fontSize: "14px",
                  outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              style={{
                padding: "12px 20px",
                borderRadius: "999px",
                background: "linear-gradient(to right, #f0d060, #E8C547)",
                color: "#000",
                fontWeight: 700,
                fontSize: "16px",
                border: "none",
                cursor: isUpdating ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                marginTop: "12px",
                opacity: isUpdating ? 0.7 : 1,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}