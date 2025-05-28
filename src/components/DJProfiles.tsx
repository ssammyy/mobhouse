import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const djData = [
    {
        id: 1,
        name: "SVMIK",
        bio: "Master of Afro House with over 8 years of experience spinning the decks across Nairobi's hottest venues. Known for his electrifying rooftop sets that blend traditional African rhythms with modern house beats.",
        specialties: ["Afro House", "Deep House"],
        image: "/images/djs/samik.jpeg"
    },
    {
        id: 2,
        name: "WAY$",
        bio: "Amapiano pioneer bringing the authentic South African sound to Kenya's vibrant music scene. Her sets create an irresistible groove that keeps the dance floor moving all night long.",
        specialties: ["Amapiano", "Afro Tech"],
        image: "/images/djs/ways.jpeg"
    },
    {
        id: 3,
        name: "DERIQ",
        bio: "Tribal House specialist with a deep understanding of percussion and rhythm. Creates hypnotic journeys through sound that connect listeners to their African roots.",
        specialties: ["Tribal House", "Afro Beats"],
        image: "/images/djs/deriq.jpeg"
    },
    {
        id: 4,
        name: "ZHåI",
        bio: "The versatile mixer who seamlessly blends all genres with a distinctly Kenyan flavor. Known for reading the crowd and creating unforgettable musical experiences at Nairobi's outdoor events.",
        specialties: ["All Genres", "Live Mixing"],
        image: "/images/djs/Kayik Radio Episode 011 w_ DJ Joune.jpeg"
    }
];

const DJProfiles = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 100,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

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

    return (
        <section id="djs" className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden" ref={containerRef}>
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(138,43,226,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,191,255,0.08),transparent_50%)]"></div>

                <div className="absolute inset-0 pointer-events-none">
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

            <div className="relative z-10 container mx-auto px-4 py-32">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-6xl md:text-8xl font-black mb-6 tracking-wider font-orbitron"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-purple-500">
                            MEET THE
                        </span>{" "}
                        <span className="text-white">ARTISTS</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        The masterminds behind Nairobi's most electrifying Afro House experience
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {djData.map((dj, index) => (
                        <motion.div
                            key={dj.id}
                            variants={cardVariants}
                            custom={index}
                            whileHover={{
                                y: -20,
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Card className="bg-gradient-to-b from-gray-900 to-black text-white border-0 overflow-hidden group cursor-pointer">
                                <motion.div
                                    className="relative h-80 bg-gradient-to-b from-purple-900/50 to-black"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={dj.image}
                                        alt={`${dj.name} - DJ Profile`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-purple-900/30"></div>

                                    <motion.div
                                        className="absolute top-4 right-4 w-16 h-16 border-2 border-purple-400/50 rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    />

                                    <div className="absolute bottom-4 left-4 right-4">
                                        <motion.h3
                                            className="text-2xl font-bold mb-2 font-orbitron"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                        >
                                            {dj.name}
                                        </motion.h3>
                                        <div className="flex flex-wrap gap-2">
                                            {dj.specialties.map((specialty, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-full text-xs font-medium backdrop-blur-sm"
                                                    initial={{ scale: 0 }}
                                                    whileInView={{ scale: 1 }}
                                                    transition={{ duration: 0.4, delay: (index * 0.1) + (i * 0.1) }}
                                                >
                                                    {specialty}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                <CardContent className="p-6">
                                    <motion.p
                                        className="text-gray-300 text-sm leading-relaxed mb-6"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        {dj.bio}
                                    </motion.p>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-purple-400/30 text-purple-400 hover:bg-purple-500 hover:text-black w-full font-semibold transition-all duration-300"
                                        >
                                            View Mixes
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="absolute top-1/4 left-8 w-32 h-32 border-2 border-purple-400/20 rounded-full"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity }
                    }}
                />

                <motion.div
                    className="absolute bottom-1/4 right-8 w-24 h-24 border-2 border-blue-400/20 rounded-full"
                    animate={{
                        rotate: -360,
                        y: [0, -30, 0]
                    }}
                    transition={{
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                        y: { duration: 4, repeat: Infinity }
                    }}
                />
            </div>
        </section>
    );
};

export default DJProfiles;