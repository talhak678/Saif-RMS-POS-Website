import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";
import Loader from "../components/Loader";

interface LoyaltyTransaction {
    id: string;
    points: number;
    type: string;
    createdAt: string;
    order?: {
        orderNo: number;
        status: string;
    };
}

interface LoyaltyData {
    loyaltyPoints: number;
    loyaltyTrxs: LoyaltyTransaction[];
}

const LoyaltyPoints = () => {
    const { cmsConfig, cmsLoading, user, setShowSignInForm } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<LoyaltyData | null>(null);

    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff0000";

    useEffect(() => {
        const fetchLoyaltyData = async () => {
            if (!user?.token) return;

            setLoading(true);
            try {
                const response = await axios.get('https://saif-rms-pos-backend.vercel.app/api/customers/loyalty', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });

                if (response.data.success) {
                    setData(response.data.data);
                }
            } catch (error: any) {
                console.error("Failed to fetch loyalty data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!cmsLoading) {
            if (!user) {
                setShowSignInForm(true);
                setLoading(false);
                return;
            }
            fetchLoyaltyData();
        }
    }, [cmsLoading, user]);

    if (loading || cmsLoading) return <Loader />;

    return (
        <div className="page-content bg-white">
            <section className="section-inner" style={{ padding: "80px 0" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            {/* Points Card */}
                            <div style={{
                                background: `linear-gradient(135deg, ${primaryColor} 0%, #222 100%)`,
                                borderRadius: "24px",
                                padding: "40px",
                                color: "#fff",
                                textAlign: "center",
                                marginBottom: "50px",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                                position: "relative",
                                overflow: "hidden"
                            }}>
                                <div style={{ position: "relative", zIndex: 1 }}>
                                    <h5 style={{ opacity: 0.9, fontWeight: 500, marginBottom: "10px", fontSize: "18px" }}>Available Balance</h5>
                                    <h1 style={{ fontSize: "64px", fontWeight: 800, margin: 0, textShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
                                        {data?.loyaltyPoints?.toFixed(2) || "0.00"}
                                    </h1>
                                    <p style={{ margin: 0, fontSize: "16px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600 }}>Points</p>
                                </div>
                                <div style={{
                                    position: "absolute", bottom: "-30px", right: "-30px",
                                    fontSize: "150px", opacity: 0.1, pointerEvents: "none"
                                }}>
                                    💎
                                </div>
                            </div>

                            {/* History Header */}
                            <div className="d-flex align-items-center justify-content-between m-b30">
                                <h3 className="title m-b0">Transaction History</h3>
                                <div style={{ color: "#777", fontSize: "14px" }}>
                                    {data?.loyaltyTrxs.length || 0} Transactions
                                </div>
                            </div>

                            {/* History List */}
                            <div className="loyalty-history">
                                {data?.loyaltyTrxs && data.loyaltyTrxs.length > 0 ? (
                                    data.loyaltyTrxs.map((trx) => (
                                        <div key={trx.id} style={{
                                            background: "#fff",
                                            borderRadius: "16px",
                                            padding: "20px 25px",
                                            marginBottom: "15px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                                            border: "1px solid #f0f0f0",
                                            transition: "all 0.3s ease",
                                        }} className="trx-card">
                                            <div className="d-flex align-items-center">
                                                <div style={{
                                                    width: "50px", height: "50px", borderRadius: "12px",
                                                    background: trx.type === 'EARNED' ? "#e8f5e9" : "#ffebee",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: "20px", marginRight: "20px"
                                                }}>
                                                    {trx.type === 'EARNED' ? "📥" : "📤"}
                                                </div>
                                                <div>
                                                    <h6 style={{ margin: 0, fontWeight: 700, color: "#222", fontSize: "16px" }}>
                                                        {trx.type === 'EARNED' ? "Order Reward" : (trx.type === 'REDEEMED' ? "Order Payment" : trx.type)}
                                                        {trx.order && <span style={{ color: "#999", fontWeight: 400, marginLeft: "8px" }}>#{trx.order.orderNo}</span>}
                                                    </h6>
                                                    <p style={{ margin: 0, fontSize: "13px", color: "#888" }}>
                                                        {new Date(trx.createdAt).toLocaleDateString('en-US', {
                                                            day: 'numeric', month: 'short', year: 'numeric',
                                                            hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <h5 style={{
                                                    margin: 0,
                                                    fontWeight: 800,
                                                    color: trx.type === 'EARNED' ? "#2e7d32" : "#c62828",
                                                    fontSize: "18px"
                                                }}>
                                                    {trx.type === 'EARNED' ? `+${trx.points.toFixed(2)}` : `-${trx.points.toFixed(2)}`}
                                                </h5>
                                                <span style={{ fontSize: "12px", color: "#aaa", fontWeight: 500 }}>Points</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-5" style={{ background: "#f9f9f9", borderRadius: "16px", border: "2px dashed #eee" }}>
                                        <div style={{ fontSize: "48px", marginBottom: "20px" }}>📭</div>
                                        <h5 style={{ color: "#777" }}>No loyalty transactions yet.</h5>
                                        <p style={{ color: "#999" }}>Place your first order to start earning rewards!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoyaltyPoints;
