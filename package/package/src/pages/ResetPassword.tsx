import React, { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const { cmsConfig } = useContext(Context);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [hideTemp, setHideTemp] = useState(false);

    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || cmsConfig?.config?.primaryColor || "#ff6b35";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("Invalid or missing reset token.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("https://saif-rms-pos-backend.vercel.app/api/customers/auth/reset-password", {
                token,
                newPassword,
            });

            if (res.data?.success) {
                toast.success(res.data.message || "Password successfully reset!");
                navigate("/");
            } else {
                toast.error(res.data?.message || "Failed to reset password.");
            }
        } catch (error: any) {
            console.error("Reset Password Error:", error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-content bg-white" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: '100px', backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
            <div className="container" style={{ maxWidth: "500px" }}>
                <div style={{ padding: "40px", borderRadius: "16px", boxShadow: "0px 10px 40px rgba(0,0,0,0.08)", background: "#fff" }}>
                    <div className="text-center m-b30">
                        <div style={{ fontSize: 40, marginBottom: 15 }}>🔐</div>
                        <h2 className="title">Reset Password</h2>
                        <p className="text-muted">Enter your new password below.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group m-b20">
                            <label className="form-label" style={{ fontWeight: 600 }}>New Password <strong className="text-danger">*</strong></label>
                            <div className="input-group search-input">
                                <input
                                    name="newPassword"
                                    required
                                    type={hideTemp ? "text" : "password"}
                                    className="form-control dz-password"
                                    placeholder="Enter New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    style={{ borderRadius: 10, height: 48 }}
                                />
                                <div
                                    className={`show-pass ${hideTemp ? "active" : ""}`}
                                    onClick={() => setHideTemp(!hideTemp)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {hideTemp ? (
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

                        <div className="form-group m-b30">
                            <label className="form-label" style={{ fontWeight: 600 }}>Confirm Password <strong className="text-danger">*</strong></label>
                            <div className="input-group search-input">
                                <input
                                    name="confirmPassword"
                                    required
                                    type={hideTemp ? "text" : "password"}
                                    className="form-control dz-password"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    style={{ borderRadius: 10, height: 48 }}
                                />
                                <div
                                    className={`show-pass ${hideTemp ? "active" : ""}`}
                                    onClick={() => setHideTemp(!hideTemp)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {hideTemp ? (
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

                        <button
                            type="submit"
                            className="btn w-100 d-block"
                            disabled={loading || !token}
                            style={{
                                background: primaryColor, color: "#fff",
                                borderRadius: 12, height: 50, fontWeight: 700,
                                fontSize: 15, border: "none", transition: "opacity 0.2s",
                                opacity: (loading || !token) ? 0.7 : 1
                            }}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                        {!token && (
                            <p className="text-center text-danger mt-3" style={{ fontSize: 13 }}>
                                Invalid reset link. Token is missing.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
