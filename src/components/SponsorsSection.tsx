import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Marquee from "react-fast-marquee";

const SponsorsSection = () => {
    const sponsors = [
        { name: "Safaricom", logo: "🟢", description: "Telecommunications Partner" },
        { name: "KCB Bank", logo: "🏦", description: "Banking Partner" },
        { name: "Heineken", logo: "🍺", description: "Official Beer Partner" },
        { name: "Capital FM", logo: "📻", description: "Media Partner" },
        { name: "Nation Media Group", logo: "📰", description: "Media Partner" },
        { name: "RedBull", logo: "✈️", description: "Travel Partner" },
    ];

    const collaborators = [
        { name: "Bey T", role: "Featured Artists", image: "🎵" },
        { name: "Big Nyags", role: "Producer", image: "🎧" },
        { name: "Minor League DJz", role: "Vocalist", image: "🎤" },
        { name: "Ty", role: "Guest Artist", image: "🎶" },
        { name: "Jones", role: "Hip Hop Collaborator", image: "🎯" },
        { name: "Nviiri", role: "R&B Artist", image: "🎼" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`orb-${i}`}
                        className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 backdrop-blur-md"
                        style={{
                            left: `${15 + (i % 2) * 30}%`,
                            top: `${20 + Math.floor(i / 2) * 30}%`,
                        }}
                        animate={{
                            scale: 1 + Math.sin(Date.now() / 600 + i) * 0.2,
                            opacity: 0.5 + Math.cos(Date.now() / 800 + i) * 0.3,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
                        OUR PARTNERS
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Proudly supported by Kenya's leading brands and collaborating with top artists from Nairobi and beyond
                    </p>
                </motion.div>

                <motion.div
                    className="mb-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="text-3xl font-bold text-purple-400 text-center mb-12"
                        variants={itemVariants}
                    >
                        Official Sponsors
                    </motion.h3>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
                        <Marquee
                            gradient={false}
                            speed={40}
                            pauseOnHover={true}
                            className="py-4"
                        >
                            {sponsors.map((sponsor, index) => (
                                <motion.div
                                    key={sponsor.name}
                                    className="mx-4"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Card className="bg-gray-900/50 border-purple-400/20 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm w-[280px]">
                                        <CardContent className="p-6 text-center">
                                            <div className="text-4xl mb-4">{sponsor.logo}</div>
                                            <h4 className="font-bold text-white mb-2">{sponsor.name}</h4>
                                            <p className="text-sm text-gray-400">{sponsor.description}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </Marquee>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="text-3xl font-bold text-purple-400 text-center mb-12"
                        variants={itemVariants}
                    >
                        Artists We've Worked With
                    </motion.h3>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
                        <Marquee
                            gradient={false}
                            speed={40}
                            pauseOnHover={true}
                            direction="right"
                            className="py-4"
                        >
                            {collaborators.map((collaborator, index) => (
                                <motion.div
                                    key={collaborator.name}
                                    className="mx-4"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Card className="bg-gray-900/50 border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm w-[280px]">
                                        <CardContent className="p-6 text-center">
                                            <div className="text-4xl mb-4">{collaborator.image}</div>
                                            <h4 className="font-bold text-white mb-2">{collaborator.name}</h4>
                                            <p className="text-sm text-gray-400">{collaborator.role}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </Marquee>
                    </div>
                </motion.div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <p className="text-lg text-gray-300 mb-6">
                        Interested in partnering with Mob House DJs?
                    </p>
                    <motion.button
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-black font-bold px-8 py-3 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get In Touch
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default SponsorsSection;