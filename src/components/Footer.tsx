import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Footer = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 relative overflow-hidden">
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
                            x: (mousePosition.x - 0.5) * (40 + i * 10),
                            y: (mousePosition.y - 0.5) * (40 + i * 10),
                            scale: 1 + Math.sin(Date.now() / 600 + i) * 0.2,
                            opacity: 0.5 + Math.cos(Date.now() / 800 + i) * 0.3,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-3xl font-bold mb-4">
                            MOB HOUSE <span className="text-purple-400">DJS</span>
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Kenya's premier DJ collective specializing in Afro House, Amapiano, and Tribal House.
                            Creating unforgettable experiences through music and energy.
                        </p>
                        <div className="flex space-x-4">
                            {['f', '@', 'in', 'yt'].map((icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-purple-500/50 text-white rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-purple-300">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            {['home', 'djs', 'mixes', 'events', 'gallery'].map((link, index) => (
                                <li key={index}>
                                    <a href={`#${link}`} className="hover:text-purple-400 transition-colors">{link.charAt(0).toUpperCase() + link.slice(1)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-purple-300">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>📧 info@mobhousedjs.com</li>
                            <li>📱 +254 700 000 000</li>
                            <li>📍 Nairobi, Kenya</li>
                            <li>🎧 Bookings Available</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-purple-400/20 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Mob House DJs. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, index) => (
                            <a key={index} href="#" className="text-gray-400 text-sm hover:text-purple-400 transition-colors">{policy}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;