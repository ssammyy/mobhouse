import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventsSectionProps {
    user: any;
    onAuthRequired: () => void;
}

const eventsData = [
    {
        id: 1,
        title: "Rooftop Sunset Sessions",
        date: "2025-06-15",
        time: "18:00",
        venue: "Sky Lounge, Westlands, Nairobi",
        price: 2500,
        status: "On Sale",
        image: "/placeholder.svg",
        description: "Experience the magic of Afro House as the sun sets over Nairobi's skyline. An unforgettable evening of music and vibes.",
        capacity: 200,
        sold: 145
    },
    {
        id: 2,
        title: "Amapiano Night Live",
        date: "2025-06-22",
        time: "20:00",
        venue: "Garden City Mall Amphitheater, Nairobi",
        price: 3000,
        status: "Early Bird",
        image: "/placeholder.svg",
        description: "Dance the night away to the hottest Amapiano beats in an outdoor setting with Kenya's finest DJs.",
        capacity: 500,
        sold: 287
    },
    {
        id: 3,
        title: "Tribal House Experience",
        date: "2025-07-05",
        time: "19:00",
        venue: "Karen Country Club, Nairobi",
        price: 4000,
        status: "VIP Available",
        image: "/placeholder.svg",
        description: "Immerse yourself in deep tribal rhythms in an exclusive venue. A premium experience for true house music lovers.",
        capacity: 150,
        sold: 89
    },
    {
        id: 4,
        title: "Monthly Mix Marathon",
        date: "2025-07-18",
        time: "15:00",
        venue: "Uhuru Gardens, Nairobi",
        price: 1500,
        status: "On Sale",
        image: "/placeholder.svg",
        description: "6-hour outdoor festival featuring all Mob House DJs back-to-back. The ultimate celebration of Kenyan house music.",
        capacity: 1000,
        sold: 456
    }
];

const EventsSection = ({ user, onAuthRequired }: EventsSectionProps) => {
    const handleBuyTicket = (eventId: number) => {
        if (!user) {
            onAuthRequired();
            return;
        }
        console.log(`Purchasing ticket for event ${eventId}`);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 80,
            scale: 0.9
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

    return (
        <section id="events" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`orb-${i}`}
                        className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/50 to-blue-500/50 backdrop-blur-md"
                        style={{
                            left: `${10 + (i % 3) * 30}%`,
                            top: `${15 + Math.floor(i / 3) * 30}%`,
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
                    className="text-center mb-20"
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
                        <span className="text-white">UPCOMING</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">EVENTS</span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Join us for unforgettable live music experiences across Nairobi's most iconic venues
                    </motion.p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {eventsData.map((event, index) => (
                        <motion.div
                            key={event.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.02,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                transition: { duration: 0.3 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-gray-900 to-black group cursor-pointer">
                                <motion.div
                                    className="relative h-64 bg-gradient-to-br from-purple-900 via-gray-800 to-black"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    <div className="absolute inset-0 opacity-20">
                                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                                            <defs>
                                                <pattern id={`pattern-${event.id}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                                                    <circle cx="7.5" cy="7.5" r="2" fill="purple" opacity="0.6"/>
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill={`url(#pattern-${event.id})`}/>
                                        </svg>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className={`${
                                                    event.status === 'Early Bird'
                                                        ? 'bg-green-500 text-white'
                                                        : event.status === 'VIP Available'
                                                            ? 'bg-blue-500 text-black'
                                                            : 'bg-purple-500 text-white'
                                                } font-semibold`}
                                            >
                                                {event.status}
                                            </Badge>
                                        </motion.div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <motion.h3
                                            className="text-2xl font-bold text-white mb-2 font-orbitron"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                        >
                                            {event.title}
                                        </motion.h3>
                                        <motion.div
                                            className="flex items-center text-gray-300 text-sm gap-2"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: (index * 0.1) + 0.2 }}
                                        >
                                            <MapPin className="w-4 h-4" />
                                            {event.venue}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <motion.p
                                                className="font-semibold text-lg flex items-center gap-2 text-gray-300"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                            >
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(event.date)}
                                            </motion.p>
                                            <p className="text-gray-400">{event.time} EAT</p>
                                        </div>
                                        <div className="text-right">
                                            <motion.p
                                                className="text-3xl font-bold text-purple-400"
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                KES {event.price.toLocaleString()}
                                            </motion.p>
                                            <p className="text-gray-400 text-sm">per ticket</p>
                                        </div>
                                    </div>

                                    <motion.p
                                        className="text-gray-400 mb-4 leading-relaxed"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                    >
                                        {event.description}
                                    </motion.p>

                                    <motion.div
                                        className="flex items-center gap-2 mb-4 text-sm text-gray-400"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        <Users className="w-4 h-4" />
                                        <span>{event.sold}/{event.capacity} tickets sold</span>
                                        <div className="flex-1 bg-gray-700 rounded-full h-2 ml-2">
                                            <motion.div
                                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${(event.sold / event.capacity) * 100}%` }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex gap-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                    >
                                        <motion.div
                                            className="flex-1"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                onClick={() => handleBuyTicket(event.id)}
                                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-black hover:from-purple-600 hover:to-blue-600 font-bold"
                                            >
                                                {user ? 'Buy Tickets' : 'Sign In to Buy'}
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button
                                                variant="outline"
                                                className="px-6 border-purple-400/30 text-purple-400 hover:bg-purple-500 hover:text-black"
                                            >
                                                Details
                                            </Button>
                                        </motion.div>
                                    </motion.div>

                                    {!user && (
                                        <motion.p
                                            className="text-xs text-gray-500 text-center mt-3"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.8 }}
                                        >
                                            Create an account to purchase tickets
                                        </motion.p>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-purple-400/30 text-purple-400 hover:bg-purple-500 hover:text-black px-12 py-4 text-lg font-semibold"
                        >
                            View All Events
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default EventsSection;