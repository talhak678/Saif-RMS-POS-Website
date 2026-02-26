import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { Context } from "../context/AppContext";
import toast from "react-hot-toast";

const OrderTypeModal = () => {
    const { showOrderModal, setShowOrderModal, branches, cmsConfig } = useContext(Context);
    const [orderType, setOrderType] = useState("pickup");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState<any>(null);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        const toastId = toast.loading("Detecting nearest branch...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                let nearest = null;
                let minDistance = Infinity;

                branches.forEach((b: any) => {
                    const bLat = parseFloat(b.lat);
                    const bLng = parseFloat(b.lng);
                    if (!isNaN(bLat) && !isNaN(bLng)) {
                        const dist = calculateDistance(latitude, longitude, bLat, bLng);
                        if (dist < minDistance) {
                            minDistance = dist;
                            nearest = b;
                        }
                    }
                });

                if (nearest) {
                    setLocation({ value: (nearest as any).id, label: (nearest as any).name });
                    toast.success(`Nearest branch: ${(nearest as any).name}`, { id: toastId });
                } else {
                    toast.error("No branches found with location data", { id: toastId });
                }
            },
            (error) => {
                toast.error("Location access denied or unavailable", { id: toastId });
            }
        );
    };

    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

    useEffect(() => {
        const isSelected = localStorage.getItem("orderTypeSelected");
        if (!isSelected) {
            setShowOrderModal(true);
        }
    }, [setShowOrderModal]);

    const handleSelect = () => {
        if (phone && location) {
            localStorage.setItem("orderTypeSelected", "true");
            localStorage.setItem("orderType", orderType);
            localStorage.setItem("userPhone", phone);
            localStorage.setItem("userLocation", JSON.stringify(location));
            setShowOrderModal(false);
        } else {
            toast.error("Please fill all details");
        }
    };

    const options = branches.map((b: any) => ({
        value: b.id,
        label: b.name
    }));

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            borderRadius: "10px",
            padding: "5px",
            borderColor: "#eee",
            boxShadow: "none",
            "&:hover": {
                borderColor: primaryColor
            }
        }),
    };

    return (
        <>
            <style>
                {`
                    .modal-width-350 .modal-dialog {
                        max-width: 350px !important;
                    }
                    @media (max-width: 576px) {
                        .modal-width-350 .modal-dialog {
                            max-width: 90% !important;
                            margin-left: auto;
                            margin-right: auto;
                        }
                    }
                `}
            </style>
            <Modal
                show={showOrderModal}
                onHide={() => setShowOrderModal(false)}
                centered
                backdrop="static"
                keyboard={false}
                className="order-type-modal modal-width-350"
                contentClassName="border-0 shadow-lg"
                style={{ borderRadius: "20px" }}
            >
                <Modal.Body className="p-4 text-center" style={{ borderRadius: "20px" }}>
                    <h3 className="mb-4 fw-bold h5" style={{ color: "#000" }}>Select your location</h3>

                    <div className="d-flex justify-content-center mb-4">
                        <div className="bg-light p-1 rounded-pill d-flex" style={{ width: "fit-content", border: "1px solid #eee" }}>
                            <button
                                onClick={() => setOrderType("delivery")}
                                className="btn rounded-pill px-3 py-2 border-0 fw-bold transition-all"
                                style={{
                                    backgroundColor: orderType === "delivery" ? primaryColor : "transparent",
                                    color: orderType === "delivery" ? "#fff" : "#666",
                                    fontSize: "12px",
                                    transition: "all 0.3s ease",
                                    boxShadow: orderType === "delivery" ? `0 2px 8px ${primaryColor}66` : "none"
                                }}
                            >
                                DELIVERY
                            </button>
                            <button
                                onClick={() => setOrderType("pickup")}
                                className="btn rounded-pill px-3 py-2 border-0 fw-bold transition-all"
                                style={{
                                    backgroundColor: orderType === "pickup" ? primaryColor : "transparent",
                                    color: orderType === "pickup" ? "#fff" : "#666",
                                    fontSize: "12px",
                                    transition: "all 0.3s ease",
                                    boxShadow: orderType === "pickup" ? `0 2px 8px ${primaryColor}66` : "none"
                                }}
                            >
                                PICK-UP
                            </button>
                        </div>
                    </div>

                    <p className="mb-3 text-dark fw-medium" style={{ fontSize: "14px" }}>Please select your location</p>

                    <Button
                        variant="primary"
                        onClick={handleCurrentLocation}
                        className="w-100 mb-4 rounded-pill py-2 border-0 d-flex align-items-center justify-content-center fw-bold shadow-sm text-white"
                        style={{
                            backgroundColor: primaryColor,
                            boxShadow: `0 4px 12px ${primaryColor}4d`,
                            fontSize: "13px"
                        }}
                    >
                        <i className="fa-solid fa-location-crosshairs me-2"></i> Use Current Location
                    </Button>

                    <div className="mb-3 text-start">
                        <Select
                            options={options}
                            value={location}
                            placeholder="Please select your location"
                            styles={customStyles}
                            onChange={(opt: any) => setLocation(opt)}
                        />
                    </div>

                    <div className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="03xx-xxxxxxx"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="rounded-3 py-2 px-3 shadow-none mt-2"
                            style={{ border: "1px solid #eee", fontSize: "14px" }}
                        />
                    </div>

                    <Button
                        onClick={handleSelect}
                        className="w-100 py-2 fw-bold rounded-3 border-0 mt-2 text-white"
                        style={{
                            backgroundColor: primaryColor,
                            fontSize: "16px",
                            boxShadow: `0 4px 15px ${primaryColor}66`
                        }}
                    >
                        Select
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default OrderTypeModal;
