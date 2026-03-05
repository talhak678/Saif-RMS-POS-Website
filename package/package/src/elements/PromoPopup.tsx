import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../context/AppContext";
import { Link } from "react-router-dom";

const PromoPopup = () => {
    const { showPromoPopup, setShowPromoPopup, cmsConfig } = useContext(Context);
    const promos = cmsConfig?.promos || [];

    // Pick the most relevant promo
    const activePromo = promos.length > 0 ? promos[0] : null;

    if (!activePromo) return null;

    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";
    const secondaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.secondaryColor || "#222121";

    return (
        <>
            <style>{`
                .premium-promo-modal .modal-content {
                    background: transparent;
                    border: none;
                }
                .promo-premium-wrapper {
                    position: relative;
                    background: #fff;
                    border-radius: 40px;
                    overflow: hidden;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.5);
                    max-width: 480px;
                    margin: auto;
                    transform: scale(1);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
                    border: 1px solid rgba(255,255,255,0.2);
                }
                .promo-image-container {
                    position: relative;
                    height: 420px;
                    overflow: hidden;
                    background: #f0f0f0;
                }
                .promo-image-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 1.2s ease;
                }
                .promo-premium-wrapper:hover .promo-image-container img {
                    transform: scale(1.08);
                }
                .promo-badge {
                    position: absolute;
                    top: 25px;
                    left: 25px;
                    background: ${primaryColor};
                    color: white;
                    padding: 10px 22px;
                    border-radius: 50px;
                    font-weight: 800;
                    font-size: 13px;
                    letter-spacing: 1.5px;
                    box-shadow: 0 10px 25px ${primaryColor}66;
                    z-index: 5;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .promo-badge::before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    background: #fff;
                    border-radius: 50%;
                    display: inline-block;
                    animation: pulse 1.5s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(0.95); opacity: 0.7; }
                    70% { transform: scale(1.5); opacity: 0; }
                    100% { transform: scale(0.95); opacity: 0; }
                }
                .promo-close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 44px;
                    height: 44px;
                    background: rgba(255,255,255,0.95);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 20;
                    border: none;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    color: ${secondaryColor};
                    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
                }
                .promo-close-btn:hover {
                    background: ${primaryColor};
                    color: white;
                    transform: rotate(180deg) scale(1.1);
                }
                .promo-content-premium {
                    padding: 40px;
                    text-align: center;
                    background: #fff;
                    position: relative;
                }
                .promo-decoration {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    opacity: 0.05;
                    pointer-events: none;
                }
                .deco-1 { 
                    top: -30px; 
                    right: -30px; 
                    background-image: radial-gradient(${secondaryColor} 2px, transparent 2px); 
                    background-size: 12px 12px; 
                }
                .deco-2 { 
                    bottom: -30px; 
                    left: -30px; 
                    background-image: radial-gradient(${primaryColor} 2px, transparent 2px); 
                    background-size: 12px 12px; 
                }
                .promo-title-premium {
                    font-family: 'Outfit', 'Inter', sans-serif;
                    font-weight: 900;
                    font-size: 32px;
                    color: #111;
                    margin-bottom: 12px;
                    line-height: 1.1;
                    text-transform: capitalize;
                }
                .promo-subtitle {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 30px;
                    line-height: 1.5;
                    font-weight: 500;
                }
                .promo-btn-premium {
                    background: ${primaryColor};
                    color: white !important;
                    padding: 18px 50px;
                    border-radius: 100px;
                    font-weight: 800;
                    font-size: 18px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    box-shadow: 0 15px 35px ${primaryColor}55;
                    border: none;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    width: 100%;
                }
                .promo-btn-premium:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 45px ${primaryColor}77;
                    filter: contrast(1.1);
                }
                .promo-btn-premium i {
                    transition: transform 0.3s ease;
                }
                .promo-btn-premium:hover i {
                    transform: translateX(5px);
                }
            `}</style>

            <Modal
                show={showPromoPopup}
                onHide={() => setShowPromoPopup(false)}
                centered
                className="premium-promo-modal"
                contentClassName="bg-transparent border-0"
            >
                <div className="promo-premium-wrapper">
                    <button className="promo-close-btn" onClick={() => setShowPromoPopup(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <div className="promo-image-container">
                        <div className="promo-badge">FRESH DEAL</div>
                        <Link to={activePromo.linkUrl || "/our-menu-2"} onClick={() => setShowPromoPopup(false)}>
                            <img
                                src={activePromo.imageUrl}
                                alt={activePromo.title || "Promotion"}
                            />
                        </Link>
                    </div>

                    <div className="promo-content-premium">
                        <div className="promo-decoration deco-1"></div>
                        <div className="promo-decoration deco-2"></div>

                        <h2 className="promo-title-premium">{activePromo.title || "Delicious Deal!"}</h2>
                        <p className="promo-subtitle">Indulge in our chef's special creation. Quality ingredients, amazing taste, and a price you'll love.</p>

                        <Link
                            to={activePromo.linkUrl || "/our-menu-2"}
                            onClick={() => setShowPromoPopup(false)}
                            className="promo-btn-premium"
                        >
                            <span>ORDER NOW</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default PromoPopup;
