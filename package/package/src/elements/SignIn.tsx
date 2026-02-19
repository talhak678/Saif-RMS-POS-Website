import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const { showSignInForm, setShowSignInForm, setUser, cmsConfig, cmsLoading } = useContext(Context);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // restaurantId comes from the CMS public API response
  const restaurantId = cmsConfig?.restaurantId;
  const baseUrl = "https://saif-rms-pos-backend.vercel.app/api/customers/auth";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cmsLoading) {
      toast.error("Please wait, restaurant data is loading...");
      return;
    }

    if (!restaurantId) {
      toast.error("Could not identify restaurant. Please refresh the page.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = isRegistering ? "/register" : "/login";
      const payload = isRegistering
        ? { ...formData, restaurantId }
        : { email: formData.email, password: formData.password, restaurantId };

      const res = await axios.post(`${baseUrl}${endpoint}`, payload);

      if (res.data?.success) {
        const userData = res.data.data;
        setUser(userData);
        setShowSignInForm(false);
        setIsRegistering(false);
        setFormData({ name: "", email: "", password: "", phone: "" });
        toast.success(
          isRegistering
            ? `Welcome, ${userData.name || ""}! Account created successfully.`
            : `Welcome back, ${userData.name || ""}!`
        );
      } else {
        toast.error(res.data?.message || "Something went wrong. Please try again.");
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      const msg = error.response?.data?.message || error.message || "Authentication failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor
    || cmsConfig?.config?.primaryColor
    || "#ff6b35";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fade ${showSignInForm ? "show offcanvas-backdrop" : ""}`}
        onClick={() => {
          setShowSignInForm(false);
          setIsRegistering(false);
        }}
      ></div>

      {/* Offcanvas Panel */}
      <div
        className={`offcanvas offcanvas-end ${showSignInForm ? "show" : ""}`}
        tabIndex={1}
        id="offcanvasLogin"
        style={{ visibility: showSignInForm ? "visible" : "hidden" }}
      >
        <div className="offcanvas-body">
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShowSignInForm(false);
              setIsRegistering(false);
            }}
          ></button>

          <div className="offcanvas-form">
            {/* Header */}
            <div className="login-head" style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>
                {isRegistering ? "🍽️" : "👋"}
              </div>
              <h4 className="title" style={{ marginBottom: 8 }}>
                {isRegistering ? "Create Account" : "Welcome Back"}
              </h4>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>
                {isRegistering
                  ? "Join us to save your favorite dishes and track your orders."
                  : "Sign in to access your orders and exclusive deals."}
              </p>
            </div>

            {/* CMS loading warning */}
            {cmsLoading && (
              <div style={{
                background: "#fff8e1", border: "1px solid #ffe082",
                borderRadius: 10, padding: "10px 14px", marginBottom: 16,
                fontSize: 13, color: "#f57c00", display: "flex", alignItems: "center", gap: 8
              }}>
                <span>⏳</span> Loading restaurant data, please wait...
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name - Register only */}
              {isRegistering && (
                <div className="form-group m-b15">
                  <label className="form-label" style={{ fontWeight: 600 }}>
                    Full Name <strong className="text-danger">*</strong>
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ borderRadius: 10, height: 48 }}
                  />
                </div>
              )}

              {/* Email */}
              <div className="form-group m-b15">
                <label className="form-label" style={{ fontWeight: 600 }}>
                  Email <strong className="text-danger">*</strong>
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ borderRadius: 10, height: 48 }}
                />
              </div>

              {/* Phone - Register only */}
              {isRegistering && (
                <div className="form-group m-b15">
                  <label className="form-label" style={{ fontWeight: 600 }}>Phone</label>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="e.g. 03001234567"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ borderRadius: 10, height: 48 }}
                  />
                </div>
              )}

              {/* Password */}
              <div className="form-group m-b30">
                <label className="form-label" style={{ fontWeight: 600 }}>
                  Password <strong className="text-danger">*</strong>
                </label>
                <div className="input-group search-input">
                  <input
                    name="password"
                    required
                    type={hide ? "text" : "password"}
                    className="form-control dz-password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ borderRadius: 10, height: 48 }}
                  />
                  <div
                    className={`show-pass ${hide ? "active" : ""}`}
                    onClick={() => setHide(!hide)}
                    style={{ cursor: "pointer" }}
                  >
                    {hide ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8ea5c8" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#8ea5c8" viewBox="0 0 24 24">
                        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92C21.03 15.36 22.25 13.78 23 12c-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn w-100 d-block"
                disabled={loading || cmsLoading}
                style={{
                  background: primaryColor, color: "#fff",
                  borderRadius: 12, height: 50, fontWeight: 700,
                  fontSize: 15, border: "none", transition: "opacity 0.2s",
                  opacity: (loading || cmsLoading) ? 0.7 : 1
                }}
              >
                {loading
                  ? (isRegistering ? "Creating Account..." : "Signing In...")
                  : (isRegistering ? "Create Account" : "Sign In")}
              </button>
            </form>

            {/* Toggle Register/Login */}
            <p className="text-center m-t30" style={{ fontSize: 14, color: "#888" }}>
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <button
                className="btn btn-link register p-0 ms-2"
                style={{ textDecoration: "none", color: primaryColor, fontWeight: 600, fontSize: 14 }}
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setFormData({ name: "", email: "", password: "", phone: "" });
                }}
              >
                {isRegistering ? "Sign In" : "Register Free"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
