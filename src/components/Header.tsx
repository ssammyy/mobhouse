import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
    user: any;
    onAuthClick: () => void;
    onLogout: () => void;
}

const Header = ({ user, onAuthClick, onLogout }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    const navBackground = useTransform(
        scrollY,
        [0, window.innerHeight * 0.5],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"]
    );

    const backdropBlur = useTransform(
        scrollY,
        [0, window.innerHeight * 0.5],
        ["blur(0px)", "blur(20px)"]
    );

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (
        <motion.header
            className="fixed top-0 w-full z-50 border-b border-purple-400/20 transition-all duration-300"
            style={{
                backgroundColor: navBackground,
                backdropFilter: backdropBlur
            }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <motion.div
                    className="text-2xl font-bold font-orbitron"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <span className="text-white">MOB HOUSE</span>
                    <span className="text-purple-400"> DJS</span>
                    <div className="text-xs text-blue-400 font-light tracking-wide">NAIROBI, KENYA</div>
                </motion.div>

                <nav className="hidden md:flex items-center space-x-8">
                    {['home', 'djs', 'mixes', 'events', 'gallery'].map((item, index) => (
                        <motion.button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className="text-white hover:text-purple-400 transition-colors font-medium"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {item.toUpperCase()}
                        </motion.button>
                    ))}
                </nav>

                <motion.div
                    className="hidden md:flex items-center space-x-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-300">Welcome, {user.name}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onLogout}
                                className="border-purple-400/30 text-purple-400 hover:bg-purple-500 hover:text-black"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={onAuthClick}
                                className="bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-purple-600 hover:to-blue-600 font-semibold"
                            >
                                Sign In
                            </Button>
                        </motion.div>
                    )}
                </motion.div>

                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="md:hidden text-white">
                            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                                <motion.div
                                    className="w-full h-0.5 bg-white"
                                    animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="w-full h-0.5 bg-white"
                                    animate={{ opacity: isMenuOpen ? 0 : 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="w-full h-0.5 bg-white"
                                    animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-black border-purple-400/20">
                        <div className="flex flex-col space-y-6 mt-8">
                            {['home', 'djs', 'mixes', 'events', 'gallery'].map((item, index) => (
                                <motion.button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className="text-white hover:text-purple-400 transition-colors text-left font-medium"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    {item.toUpperCase()}
                                </motion.button>
                            ))}

                            <div className="pt-4 border-t border-purple-400/20">
                                {user ? (
                                    <div className="space-y-4">
                                        <span className="text-sm text-gray-300">Welcome, {user.name}</span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={onLogout}
                                            className="border-purple-400/30 text-purple-400 hover:bg-purple-500 hover:text-black w-full"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={onAuthClick}
                                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-purple-600 hover:to-blue-600 w-full font-semibold"
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </motion.header>
    );
};

export default Header;