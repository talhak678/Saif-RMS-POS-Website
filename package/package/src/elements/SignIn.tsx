import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const SignIn = () => {
  const { showSignInForm, setShowSignInForm, setUser, cmsConfig, cmsLoading } = useContext(Context);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
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
  const baseUrl = "https://saif-rms-pos-backend-tau.vercel.app/api/customers/auth";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/verify`, {
        email: formData.email,
        otp,
        restaurantId
      }, { withCredentials: true });

      if (res.data?.success) {
        setUser(res.data.data);
        setShowSignInForm(false);
        setIsVerifying(false);
        setOtp("");
        toast.success("Account verified! Welcome 🎉");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

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
      if (isForgotPassword) {
        const payload = { email: formData.email, restaurantId, resetUrl: window.location.origin };
        const res = await axios.post(`${baseUrl}/forgot-password`, payload, { withCredentials: true });
        if (res.data?.success) {
          toast.success(res.data.message || "Password reset link sent!");
          setIsForgotPassword(false);
        } else {
          toast.error(res.data?.message || "Something went wrong.");
        }
        return;
      }

      const endpoint = isRegistering ? "/register" : "/login";
      const payload = isRegistering
        ? { ...formData, restaurantId }
        : { email: formData.email, password: formData.password, restaurantId };

      const res = await axios.post(`${baseUrl}${endpoint}`, payload, { withCredentials: true });

      if (res.data?.success) {
        if (res.data.data?.requiresVerification) {
          setIsVerifying(true);
          toast.success(res.data.message || "Please verify your email");
          return;
        }

        const userData = res.data.data;
        setUser(userData);
        setShowSignInForm(false);
        setIsRegistering(false);
        setFormData({ name: "", email: "", password: "", phone: "" });
        setIsForgotPassword(false);
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
      const data = error.response?.data;
      if (data?.data?.requiresVerification) {
        setIsVerifying(true);
        setFormData(prev => ({ ...prev, email: data.data.email }));
        toast.error(data.message);
        return;
      }
      const msg = data?.message || error.message || "Authentication failed. Please try again.";
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
          setIsForgotPassword(false);
          setIsVerifying(false);
        }}
        style={{
          display: showSignInForm ? "block" : "none",
          zIndex: 1045,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      ></div>

      {/* Offcanvas Panel */}
      <div
        className={`offcanvas offcanvas-end ${showSignInForm ? "show" : ""}`}
        tabIndex={1}
        id="offcanvasLogin"
        style={{
          visibility: showSignInForm ? "visible" : "hidden",
          zIndex: 1050,
          display: "block",
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          transform: showSignInForm ? "none" : "translateX(100%)",
          transition: "transform .3s ease-in-out"
        }}
      >
        <div className="offcanvas-body">
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              setShowSignInForm(false);
              setIsRegistering(false);
              setIsForgotPassword(false);
              setIsVerifying(false);
            }}
          ></button>

          <div className="offcanvas-form">
            {/* Header */}
            <div className="login-head" style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>
                {isVerifying ? "🛡️" : isForgotPassword ? "🔑" : isRegistering ? "🍽️" : "👋"}
              </div>
              <h4 className="title" style={{ marginBottom: 8 }}>
                {isVerifying ? "Verify Email" : isForgotPassword ? "Reset Password" : isRegistering ? "Create Account" : "Welcome Back"}
              </h4>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>
                {isVerifying
                  ? `Please enter the 6-digit code sent to ${formData.email}`
                  : isForgotPassword
                    ? "Enter your email and we'll send you a link to reset your password."
                    : isRegistering
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

            {isVerifying ? (
              <form onSubmit={handleVerify}>
                <div className="form-group m-b30">
                  <label className="form-label" style={{ fontWeight: 600 }}>
                    Verification Code <strong className="text-danger">*</strong>
                  </label>
                  <input
                    name="otp"
                    required
                    type="text"
                    maxLength={6}
                    className="form-control text-center"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    style={{
                      borderRadius: 12,
                      height: 56,
                      fontSize: 24,
                      letterSpacing: 8,
                      fontWeight: 800,
                      border: `2px solid ${primaryColor}40`
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 d-block"
                  disabled={loading}
                  style={{
                    background: primaryColor, color: "#fff",
                    borderRadius: 12, height: 50, fontWeight: 700,
                    fontSize: 15, border: "none", transition: "opacity 0.2s",
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? "Verifying..." : "Verify Account"}
                </button>
                <button
                  type="button"
                  className="btn btn-link w-100 m-t15"
                  onClick={() => setIsVerifying(false)}
                  style={{ color: "#888", fontSize: 13, textDecoration: "none" }}
                >
                  Back to {isRegistering ? "Registration" : "Login"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name - Register only */}
                {!isForgotPassword && isRegistering && (
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
                {!isForgotPassword && isRegistering && (
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
                {!isForgotPassword && (
                  <div className="form-group m-b30">
                    <label className="form-label" style={{ fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                      <span>Password <strong className="text-danger">*</strong></span>
                      {!isRegistering && (
                        <span
                          style={{ color: primaryColor, cursor: "pointer", fontWeight: 500, fontSize: 13 }}
                          onClick={() => setIsForgotPassword(true)}
                        >
                          Forgot Password?
                        </span>
                      )}
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
                )}

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
                    ? (isForgotPassword ? "Sending Link..." : isRegistering ? "Creating Account..." : "Signing In...")
                    : (isForgotPassword ? "Send Reset Link" : isRegistering ? "Create Account" : "Sign In")}
                </button>
              </form>
            )}

            {/* Toggle Register/Login */}
            {!isVerifying && (
              <p className="text-center m-t30" style={{ fontSize: 14, color: "#888", display: 'flex', flexDirection: 'column', gap: 10 }}>
                {isForgotPassword ? (
                  <span>
                    Remember your password?
                    <button
                      className="btn btn-link register p-0 ms-2"
                      style={{ textDecoration: "none", color: primaryColor, fontWeight: 600, fontSize: 14 }}
                      onClick={() => {
                        setIsForgotPassword(false);
                        setFormData({ name: "", email: "", password: "", phone: "" });
                      }}
                    >
                      Sign In
                    </button>
                  </span>
                ) : (
                  <span>
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
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

