import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";

const SignIn = () => {
  const { showSignInForm, setShowSignInForm, setUser, cmsConfig } = useContext(Context);
  const [isRegistering, setIsRegistering] = useState(false);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const restaurantId = cmsConfig?.restaurantId;
  const baseUrl = "https://saif-rms-pos-backend.vercel.app/api/customers/auth";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantId) {
      alert("Restaurant configuration not loaded yet.");
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
        setUser(res.data.data);
        setShowSignInForm(false);
        setIsRegistering(false);
        setFormData({ name: "", email: "", password: "", phone: "" });
        alert(isRegistering ? "Registration successful! You are now logged in." : "Welcome back!");
      } else {
        alert(res.data?.message || "Something went wrong");
      }
    } catch (error: any) {
      console.error("Auth Error:", error);
      alert(error.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- Common Backdrop --- */}
      <div
        className={`fade ${showSignInForm ? "show offcanvas-backdrop" : ""}`}
        onClick={() => {
          setShowSignInForm(false);
          setIsRegistering(false);
        }}
      ></div>

      {/* --- Login / Register Offcanvas --- */}
      <div
        className={`offcanvas offcanvas-end ${showSignInForm ? "show" : ""}`}
        tabIndex={1}
        id="offcanvasLogin"
        style={{ visibility: showSignInForm ? 'visible' : 'hidden' }}
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
            <div className="login-head">
              <h4 className="title">{isRegistering ? "Create Account" : "Welcome Back"}</h4>
              <p>
                {isRegistering
                  ? "Join us to save your favorite dishes and track your orders."
                  : "We'd love to have you join our network of food lovers."}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {isRegistering && (
                <div className="form-group m-b15">
                  <label className="form-label">Name <strong className="text-danger">*</strong></label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="form-group m-b15">
                <label className="form-label">Email <strong className="text-danger">*</strong></label>
                <input
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {isRegistering && (
                <div className="form-group m-b15">
                  <label className="form-label">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="form-group m-b30">
                <label className="form-label">Password <strong className="text-danger">*</strong></label>
                <div className="input-group search-input">
                  <input
                    name="password"
                    required
                    type={hide ? "text" : "password"}
                    className="form-control dz-password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div
                    className={`show-pass ${hide ? "active" : ""}`}
                    onClick={() => setHide(!hide)}
                  >
                    {hide ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#8ea5c8" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#8ea5c8" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92C21.03 15.36 22.25 13.78 23 12c-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 d-block"
                disabled={loading}
              >
                {loading ? "Please wait..." : (isRegistering ? "Sign Up" : "Sign In")}
              </button>
            </form>

            <p className="text-center m-t30">
              {isRegistering ? "Already have an account?" : "Not registered?"}
              <button
                className="btn btn-link register text-primary font-weight-500 p-0 ms-2"
                style={{ textDecoration: 'none' }}
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "Login here" : "Register here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
