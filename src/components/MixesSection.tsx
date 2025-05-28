import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, Pause, Download, Clock, Music } from "lucide-react";

interface MixesSectionProps {
    user: any;
    onAuthRequired: () => void;
}

const mixesData = [
    {
        id: 1,
        title: "Sunset Vibes",
        artist: "SVMIK",
        genre: "Afro House",
        duration: "45:30",
        plays: 1247,
        description: "A journey through the golden hour with deep Afro House beats and Nairobi skyline vibes",
        coverColor: "from-purple-600 to-blue-600"
    },
    {
        id: 2,
        title: "Amapiano Nights",
        artist: "WAY$",
        genre: "Amapiano",
        duration: "52:15",
        plays: 2103,
        description: "South African groove meets Kenyan soul in this infectious Amapiano journey",
        coverColor: "from-blue-600 to-purple-600"
    },
    {
        id: 3,
        title: "Tribal Rhythms",
        artist: "DERIQ",
        genre: "Tribal House",
        duration: "38:45",
        plays: 856,
        description: "Deep percussive elements and ancestral beats for the modern dancefloor",
        coverColor: "from-purple-600 to-blue-600"
    },
    {
        id: 4,
        title: "Rooftop Sessions",
        artist: "ZHåI",
        genre: "Afro House",
        duration: "41:20",
        plays: 1432,
        description: "Live from Westlands - the energy of Nairobi's rooftop scene captured",
        coverColor: "from-blue-500 to-purple-500"
    },
    {
        id: 5,
        title: "Uhuru Groove",
        artist: "SVMIK",
        genre: "Afro House",
        duration: "48:10",
        plays: 967,
        description: "Named after Nairobi's iconic gardens - freedom through music",
        coverColor: "from-purple-500 to-blue-500"
    },
    {
        id: 6,
        title: "Karen Sessions",
        artist: "WAY$",
        genre: "Amapiano",
        duration: "44:55",
        plays: 1189,
        description: "Exclusive vibes from Karen Country Club's intimate setting",
        coverColor: "from-blue-400 to-purple-500"
    }
];

const MixesSection = ({ user, onAuthRequired }: MixesSectionProps) => {
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
    const [playTime, setPlayTime] = useState<{ [key: number]: number }>({});

    const genres = ["All", "Afro House", "Amapiano", "Tribal House"];

    const filteredMixes = selectedGenre === "All"
        ? mixesData
        : mixesData.filter(mix => mix.genre === selectedGenre);

    const handlePlay = (mixId: number) => {
        if (!user) {
            setCurrentlyPlaying(mixId);
            setPlayTime(prev => ({ ...prev, [mixId]: 0 }));
            setTimeout(() => {
                if (!user) {
                    setCurrentlyPlaying(null);
                    onAuthRequired();
                }
            }, 5 * 60 * 1000);
        } else {
            setCurrentlyPlaying(mixId);
        }
    };

    const handlePause = () => {
        setCurrentlyPlaying(null);
    };

    const handleDownload = (mixId: number) => {
        if (!user) {
            onAuthRequired();
            return;
        }
        console.log(`Downloading mix ${mixId}`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="mixes" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
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
                            scale: 1 + Math.sin(Date.now() / 500 + i) * 0.2,
                            opacity: 0.6 + Math.cos(Date.now() / 700 + i) * 0.3,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
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
                            EXCLUSIVE
                        </span>{" "}
                        <span className="text-white">MIXES</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Stream the latest Afro House, Amapiano & Tribal House mixes from Nairobi's finest DJs
                    </motion.p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {genres.map((genre, index) => (
                        <motion.button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-6 py-3 rounded-full border-2 font-semibold transition-all duration-300 ${
                                selectedGenre === genre
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-black border-transparent'
                                    : 'border-purple-400/30 text-purple-400 hover:border-purple-400/60'
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {genre}
                        </motion.button>
                    ))}
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    key={selectedGenre}
                >
                    {filteredMixes.length > 0 ? (
                        filteredMixes.map((mix, index) => (
                            <motion.div
                                key={mix.id}
                                variants={cardVariants}
                                whileHover={{
                                    y: -10,
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Card className="bg-gradient-to-b from-gray-900 to-black text-white border-0 overflow-hidden group">
                                    <motion.div
                                        className={`relative h-64 bg-gradient-to-br ${mix.coverColor}`}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                            <svg className="w-full h-20" viewBox="0 0 200 40">
                                                {Array.from({ length: 40 }, (_, i) => (
                                                    <motion.rect
                                                        key={i}
                                                        x={i * 5}
                                                        y={20 - Math.random() * 15}
                                                        width="3"
                                                        height={Math.random() * 30 + 5}
                                                        fill="white"
                                                        animate={currentlyPlaying === mix.id ? {
                                                            scaleY: [1, 1.5, 1],
                                                            opacity: [0.5, 1, 0.5]
                                                        } : { scaleY: 1, opacity: 0.5 }}
                                                        transition={{
                                                            duration: 0.5,
                                                            repeat: currentlyPlaying === mix.id ? Infinity : 0,
                                                            delay: i * 0.05
                                                        }}
                                                    />
                                                ))}
                                            </svg>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <motion.button
                                                onClick={() => currentlyPlaying === mix.id ? handlePause() : handlePlay(mix.id)}
                                                className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                {currentlyPlaying === mix.id ? (
                                                    <Pause className="w-6 h-6" />
                                                ) : (
                                                    <Play className="w-6 h-6 ml-1" />
                                                )}
                                            </motion.button>
                                        </div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <motion.h3
                                                className="text-xl font-bold mb-1 font-orbitron"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                            >
                                                {mix.title}
                                            </motion.h3>
                                            <motion.p
                                                className="text-sm text-gray-200"
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: (index * 0.1) + 0.1 }}
                                            >
                                                {mix.artist}
                                            </motion.p>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-black/50 text-white backdrop-blur-sm">
                                                {mix.genre}
                                            </Badge>
                                        </div>
                                        <div className="absolute top-4 right-4 flex items-center gap-1 text-white/80 text-sm">
                                            <Music className="w-4 h-4" />
                                            <span>{mix.plays.toLocaleString()}</span>
                                        </div>
                                    </motion.div>

                                    <CardContent className="p-6">
                                        <motion.p
                                            className="text-gray-400 text-sm mb-4 leading-relaxed"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                        >
                                            {mix.description}
                                        </motion.p>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <Clock className="w-4 h-4" />
                                                {mix.duration}
                                            </div>
                                            {!user && (
                                                <span className="text-purple-400 text-xs font-semibold">
                                                    5 min preview
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex gap-3">
                                            <motion.div
                                                className="flex-1"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    onClick={() => currentlyPlaying === mix.id ? handlePause() : handlePlay(mix.id)}
                                                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-purple-600 hover:to-blue-600 font-semibold"
                                                >
                                                    {currentlyPlaying === mix.id ? 'Pause' : 'Play'}
                                                </Button>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleDownload(mix.id)}
                                                    className="border-purple-400/30 text-purple-400 hover:bg-purple-500 hover:text-black"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                            </motion.div>
                                        </div>
                                        {!user && (
                                            <motion.p
                                                className="text-xs text-gray-500 text-center mt-3"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                            >
                                                Sign up for unlimited streaming and downloads
                                            </motion.p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-400 text-lg">No mixes found for {selectedGenre}</p>
                        </div>
                    )}
                </motion.div>

                {!user && (
                    <motion.div
                        className="text-center mt-16 p-8 border-2 border-purple-400/20 rounded-2xl backdrop-blur-sm"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.h3
                            className="text-2xl font-bold mb-4 font-orbitron"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Want to experience the vibe live?
                        </motion.h3>
                        <motion.p
                            className="text-gray-400 mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Book us for your next event
                        </motion.p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Button
                                onClick={onAuthRequired}
                                size="lg"
                                className="bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-purple-600 hover:to-blue-600 px-8 py-4 text-lg font-bold"
                            >
                               Book Us Now
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MixesSection;