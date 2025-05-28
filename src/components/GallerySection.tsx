import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const generateGalleryImages = () => {
    const baseImages = [
        { alt: "Rooftop sunset session crowd dancing", color: "from-purple-600 to-blue-600" },
        { alt: "DJ performing at outdoor venue", color: "from-blue-600 to-purple-600" },
        { alt: "Crowd enjoying amapiano set", color: "from-purple-600 to-blue-600" },
        { alt: "Tribal house performance under lights", color: "from-blue-600 to-purple-600" },
        { alt: "Festival atmosphere at Uhuru Gardens", color: "from-purple-500 to-blue-500" },
        { alt: "VIP area at exclusive venue", color: "from-blue-500 to-purple-500" },
        { alt: "DJ booth setup at rooftop venue", color: "from-purple-500 to-blue-500" },
        { alt: "Dancing crowd at night event", color: "from-blue-500 to-purple-500" },
        { alt: "Outdoor stage with Nairobi skyline", color: "from-purple-600 to-blue-600" },
        { alt: "Karen Country Club event vibes", color: "from-blue-400 to-purple-400" }
    ];

    return Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        src: "/placeholder.svg",
        ...baseImages[i % baseImages.length],
        size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)]
    }));
};

const galleryImages = generateGalleryImages();

const row1Images = galleryImages.slice(0, 17);
const row2Images = galleryImages.slice(17, 34);
const row3Images = galleryImages.slice(34, 50);

const GallerySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const row1X = useTransform(scrollYProgress, [0, 1], [0, -800]);
    const row2X = useTransform(scrollYProgress, [0, 1], [0, 800]);
    const row3X = useTransform(scrollYProgress, [0, 1], [0, -800]);

    // Use spring animations for orbs with optimized config
    const springConfig = { stiffness: 50, damping: 30 };
    const orbPositions = [...Array(6)].map(() => ({
        x: useSpring(0, springConfig),
        y: useSpring(0, springConfig),
    }));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newMousePosition = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };

            // Update spring values for each orb's position with throttled updates
            orbPositions.forEach((orb, i) => {
                orb.x.set((newMousePosition.x - 0.5) * (50 + i * 10));
                orb.y.set((newMousePosition.y - 0.5) * (50 + i * 10));
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [orbPositions]);

    const getSizeClasses = (size: string) => {
        switch (size) {
            case 'small':
                return 'w-48 h-32';
            case 'medium':
                return 'w-64 h-48';
            case 'large':
                return 'w-80 h-64';
            default:
                return 'w-64 h-48';
        }
    };

    const ImageCard = ({ image, index, rowIndex }: { image: any, index: number, rowIndex: number }) => (
        <motion.div
            className={`relative flex-shrink-0 ${getSizeClasses(image.size)} group cursor-pointer overflow-hidden rounded-xl`}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: (index * 0.05) + (rowIndex * 0.1),
                ease: "easeOut"
            }}
            whileHover={{
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.3 }
            }}
            layout
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${image.color} rounded-xl`}></div>
            <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                <svg className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500" viewBox="0 0 100 100">
                    <defs>
                        <pattern id={`african-pattern-${image.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="10" cy="10" r="3" fill="white" opacity="0.4"/>
                            <path d="M5,5 L15,15 M15,5 L5,15" stroke="white" strokeWidth="1" opacity="0.3"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#african-pattern-${image.id})`}/>
                </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
                <div className="text-white text-center">
                    <motion.div
                        className="w-16 h-16 border-3 border-white rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <span className="text-2xl font-bold">+</span>
                    </motion.div>
                    <p className="text-lg font-bold font-orbitron">VIEW PHOTO</p>
                </div>
            </div>
            {index % 5 === 0 && (
                <div className="absolute bottom-4 right-4 bg-purple-500/80 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs font-bold">NAIROBI</span>
                </div>
            )}
        </motion.div>
    );

    return (
        <section id="gallery" className="h-[150vh] relative">
            <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`orb-${i}`}
                            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/50 to-blue-500/50 backdrop-blur-md"
                            style={{
                                left: `${10 + (i % 3) * 30}%`,
                                top: `${20 + Math.floor(i / 3) * 30}%`,
                                x: orbPositions[i].x,
                                y: orbPositions[i].y,
                            }}
                            animate={{
                                scale: [1, 1 + Math.sin(i) * 0.2, 1],
                                opacity: [0.6, 0.6 + Math.cos(i) * 0.3, 0.6],
                            }}
                            transition={{
                                scale: { duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" },
                                opacity: { duration: 3, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" },
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 mb-16 pt-16">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2
                            className="text-6xl md:text-8xl font-black mb-6 tracking-wider font-orbitron"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-purple-500">
                                GALLERY
                            </span>{" "}
                            <span className="text-white">VIBES</span>
                        </motion.h2>
                        <motion.p
                            className="text-xl text-gray-400 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            Relive the energy and atmosphere of our unforgettable Afro House sessions across Nairobi
                        </motion.p>
                    </motion.div>
                </div>

                <div className="relative h-[calc(100vh-400px)] flex flex-col justify-center gap-6 py-8 pb-32" ref={containerRef}>
                    <motion.div
                        className="flex gap-6 absolute top-[5%] left-0 h-1/3 w-max"
                        style={{ x: row1X }}
                    >
                        {row1Images.map((image, index) => (
                            <ImageCard key={image.id} image={image} index={index} rowIndex={0} />
                        ))}
                    </motion.div>

                    <motion.div
                        className="flex gap-6 absolute top-[40%] left-0 h-1/3 w-max"
                        style={{ x: row2X }}
                    >
                        {row2Images.map((image, index) => (
                            <ImageCard key={image.id} image={image} index={index} rowIndex={1} />
                        ))}
                    </motion.div>

                    <motion.div
                        className="flex gap-6 absolute top-[75%] left-0 h-1/3 w-max"
                        style={{ x: row3X }}
                    >
                        {row3Images.map((image, index) => (
                            <ImageCard key={image.id} image={image} index={index} rowIndex={2} />
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="absolute top-1/4 right-16 w-32 h-32 border-2 border-purple-400/30 rounded-full"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity }
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 left-16 w-24 h-24 border-2 border-blue-400/30 rounded-full"
                    animate={{
                        rotate: -360,
                        y: [0, -20, 0]
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        y: { duration: 3, repeat: Infinity }
                    }}
                />

                <motion.div
                    className="text-center mt-20 relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="text-gray-400 mb-8 text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Want to be featured in our gallery? Share your Nairobi moments with us!
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <motion.button
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-purple-500/25"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Tag us
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GallerySection;