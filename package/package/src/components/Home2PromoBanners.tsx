import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Link } from "react-router-dom";

const Home2PromoBanners = () => {
    const { cmsConfig } = useContext(Context);
    const promos = cmsConfig?.promos || [];

    if (promos.length === 0) return null;

    return (
        <section className="content-inner-1 overflow-hidden" style={{ paddingTop: '50px', paddingBottom: '20px' }}>
            <div className="container">
                <div className="section-head text-center">
                    <h2 className="title wow flipInX">Special Offers & Promotions</h2>
                </div>
                <Swiper
                    className="promo-slider"
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        el: ".promo-pagination",
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1200: {
                            slidesPerView: 2,
                        }
                    }}
                    modules={[Autoplay, Pagination]}
                >
                    {promos.map((promo: any, index: number) => (
                        <SwiperSlide key={promo.id || index}>
                            <div className="dz-img-box style-1 wow fadeInUp" style={{ borderRadius: '20px', overflow: 'hidden', height: '250px' }}>
                                <Link to={promo.linkUrl || "/our-menu-1"} style={{ display: 'block', height: '100%', width: '100%' }}>
                                    <div className="dz-media" style={{ height: '100%', width: '100%' }}>
                                        <img
                                            src={promo.imageUrl}
                                            alt={promo.title || "Promotion"}
                                            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                                        />
                                        {promo.title && (
                                            <div className="promo-overlay" style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                padding: '20px',
                                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                                width: '100%',
                                                color: 'white'
                                            }}>
                                                <h4 className="title text-white mb-0">{promo.title}</h4>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="promo-pagination text-center mt-4"></div>
            </div>
        </section>
    );
};

export default Home2PromoBanners;
