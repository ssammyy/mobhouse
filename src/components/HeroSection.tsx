import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    onGetTicketsClick: () => void;
}

const HeroSection = ({ onGetTicketsClick }: HeroSectionProps) => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll();

    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const subtitleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    const [isMob, setIsMob] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsMob(prev => !prev);
        }, 4000); // Switch every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const letterVariants = {
        initial: { textShadow: "0 0 0 rgba(0, 0, 0, 0)" },
        hover: {
            textShadow: [
                "0 0 0 rgba(0, 0, 0, 0)",
                "0 0 10px rgba(147, 112, 219, 0.8), 0 0 20px rgba(0, 191, 255, 0.6)",
                "0 0 10px rgba(147, 112, 219, 0.8), 0 0 20px rgba(0, 191, 255, 0.6)",
                "0 0 0 rgba(0, 0, 0, 0)",
            ],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        },
    };

    const flipVariants = {
        hidden: { rotateX: 90, opacity: 0, y: 20 },
        visible: { rotateX: 0, opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { rotateX: -90, opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } },
    };

    const staticText = "#WeAreThe";
    const dynamicText = isMob ? "Mob" : "Vibe";

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
            <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,43,226,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,191,255,0.08),transparent_50%)]"></div>

                {/* Mouse-reactive nightclub elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Glowing orbs */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`orb-${i}`}
                            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/50 to-blue-500/50 backdrop-blur-md"
                            style={{
                                left: `${10 + (i % 3) * 30}%`,
                                top: `${20 + Math.floor(i / 3) * 30}%`,
                            }}
                            animate={{
                                x: (mousePosition.x - 0.5) * (50 + i * 10),
                                y: (mousePosition.y - 0.5) * (50 + i * 10),
                                scale: 1 + Math.sin(Date.now() / 500 + i) * 0.2,
                                opacity: 0.6 + Math.cos(Date.now() / 700 + i) * 0.3,
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    ))}
                    {/* Pulsing lights */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={`light-${i}`}
                            className="absolute w-4 h-4 rounded-full bg-red-400/60"
                            style={{
                                left: `${15 + (i % 2) * 70}%`,
                                top: `${30 + Math.floor(i / 2) * 30}%`,
                            }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.5 + i * 0.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div className="relative z-10 text-center max-w-6xl mx-auto px-4" style={{ opacity: contentOpacity, scale: contentScale }}>
                <motion.div className="mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                    <motion.div className="flex items-center justify-center space-x-1" style={{ y: titleY, opacity: titleOpacity }}>
                        {[...staticText].map((char, index) => (
                            <motion.span
                                key={`static-${index}`}
                                className="text-6xl md:text-8xl font-bold tracking-widest mix-blend-difference font-cinzel"
                                style={{
                                    color: 'white',
                                    backgroundImage: `url(/path/to/image${index}.jpg)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'inline-block',
                                    padding: '0 5px',
                                }}
                                variants={letterVariants}
                                initial="initial"
                                whileHover="hover"
                            >
                                {char}
                            </motion.span>
                        ))}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={dynamicText}
                                className="flex space-x-1"
                                style={{ perspective: 1000 }}
                            >
                                {[...dynamicText].map((char, index) => (
                                    <motion.span
                                        key={`dynamic-${index}-${char}`}
                                        className="text-6xl md:text-8xl font-bold tracking-widest mix-blend-difference font-cinzel inline-block relative"
                                        style={{
                                            color: 'white',
                                            backgroundImage: `url(/path/to/image${index + staticText.length}.jpg)`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            padding: '0 5px',
                                        }}
                                        variants={flipVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        custom={index}
                                        whileHover="hover"
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {char}
                                        <motion.div
                                            className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-blue-500 blur-md"
                                            animate={{ width: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                                        />
                                    </motion.span>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                    <motion.h2 className="text-4xl md:text-6xl font-thin text-blue-300 mb-8 tracking-[0.2em]" style={{ y: subtitleY, opacity: subtitleOpacity }}>
                        DJS
                    </motion.h2>
                </motion.div>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    Experience the ultimate
                    <span className="text-purple-400 font-semibold mx-2">Afro House, Amapiano & Tribal House</span>
                    vibes at our exclusive rooftop and outdoor live music DJ sets
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                >
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            size="lg"
                            onClick={onGetTicketsClick}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-purple-600 hover:to-blue-600 px-10 py-6 text-xl font-bold transition-all duration-300 border-2 border-purple-400/50 shadow-lg shadow-purple-500/25"
                        >
                            GET TICKETS
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => document.getElementById('mixes')?.scrollIntoView({ behavior: 'smooth' })}
                            className="border-2 border-purple-400/50 text-purple-400 hover:bg-purple-500 hover:text-black px-10 py-6 text-xl font-semibold transition-all duration-300 backdrop-blur-sm"
                        >
                            Book Us Now
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                >
                    {['AFRO HOUSE', 'AMAPIANO', 'TRIBAL HOUSE'].map((genre, index) => (
                        <motion.span
                            key={genre}
                            className="px-6 py-3 border-2 border-purple-400/30 rounded-full text-sm font-bold text-purple-300 backdrop-blur-sm bg-black/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                            whileHover={{ scale: 1.1, borderColor: "rgba(147,112,219,0.8)" }}
                        >
                            {genre}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ opacity: contentOpacity }}
            >
                <div className="w-8 h-12 border-2 border-purple-400/50 rounded-full flex justify-center backdrop-blur-sm">
                    <motion.div
                        className="w-2 h-4 bg-purple-400 rounded-full mt-2"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;