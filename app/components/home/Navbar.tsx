import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const lerp = (start: any, end: any, t: any) => {
    return start * (1 - t) + end * t;
};

const generatePoint = () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    targetX: Math.random() * 100,
    targetY: Math.random() * 100
});

interface NavbarProps {
    setCursorVariant: any,
    scrolled: any
}

export const Navbar: React.FC<NavbarProps> = ({ setCursorVariant, scrolled }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [points, setPoints] = useState(() => Array.from({ length: 15 }, generatePoint));
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = ['overview', 'timeline', 'lab'];

    const updatePoints = useCallback(() => {
        setPoints(prevPoints =>
            prevPoints.map(point => {
                const newX = lerp(point.x, point.targetX, 0.005);
                const newY = lerp(point.y, point.targetY, 0.005);

                const isNearTarget =
                    Math.abs(newX - point.targetX) < 0.1 &&
                    Math.abs(newY - point.targetY) < 0.1;

                return {
                    ...point,
                    x: newX,
                    y: newY,
                    targetX: isNearTarget ? Math.random() * 100 : point.targetX,
                    targetY: isNearTarget ? Math.random() * 100 : point.targetY
                };
            })
        );
    }, []);


    useEffect(() => {
        const animationFrame = requestAnimationFrame(function animate() {
            updatePoints();
            requestAnimationFrame(animate);
        });

        return () => cancelAnimationFrame(animationFrame);
    }, [updatePoints]);

    const handleMobileNavClick = (item: string) => {
        const element = document.getElementById(item);
        if (element) {
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth',
            });
        }
        setIsMobileMenuOpen(false);
    };


    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'
                }`}
        >
            <div className="relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 -z-10 backdrop-blur-sm"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BE95FF]/10 to-[#FF7C00]/10" />

                    <svg className="absolute inset-0 w-full h-full">
                        {points.map((point, i) => (
                            points.slice(i + 1, i + 4).map((target, j) => (
                                <motion.line
                                    key={`${i}-${j}`}
                                    x1={`${point.x}%`}
                                    y1={`${point.y}%`}
                                    x2={`${target.x}%`}
                                    y2={`${target.y}%`}
                                    stroke={`url(#gradient-${i}-${j})`}
                                    strokeWidth="0.3"
                                    strokeOpacity="0.1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id={`gradient-${i}-${j}`}>
                                            <stop offset="0%" stopColor="#BE95FF" />
                                            <stop offset="100%" stopColor="#FF7C00" />
                                        </linearGradient>
                                    </defs>
                                </motion.line>
                            ))
                        ))}
                    </svg>


                    {points.map((point, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-[#BE95FF] to-[#FF7C00]"
                            style={{
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                                scale: point.size,
                            }}
                            animate={{
                                opacity: [0.2, 0.4, 0.2],
                                scale: [point.size, point.size * 1.1, point.size],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2,
                            }}
                        />
                    ))}

                </motion.div>

                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="relative group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className="text-2xl font-light tracking-[0.4em] bg-gradient-to-r from-[#BE95FF] to-[#FF7C00] text-transparent bg-clip-text">
                                CYRIL
                            </span>
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        exit={{ scaleX: 0 }}
                                        className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#BE95FF] to-[#FF7C00]"
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item}
                                    className="relative"
                                    onHoverStart={() => {
                                        setCursorVariant("hover");
                                        setActiveSection(item);
                                    }}
                                    onHoverEnd={() => {
                                        setCursorVariant("default");
                                        setActiveSection('');
                                    }}
                                >
                                    <motion.a
                                        href={`#${item}`}
                                        onClick={() => handleMobileNavClick(item)}
                                        className="block uppercase text-sm tracking-[0.3em] py-2 relative z-10"
                                        whileHover={{ color: '#BE95FF' }}
                                    >
                                        {item}
                                    </motion.a>

                                    <AnimatePresence>
                                        {activeSection === item && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="absolute -inset-4 -z-10 rounded-lg bg-gradient-to-r from-[#BE95FF]/5 to-[#FF7C00]/5"
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-600" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-600" />
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden overflow-hidden"
                            >
                                <div className="py-4 space-y-4">
                                    {navItems.map((item) => (
                                        <motion.div
                                            key={item}
                                            className="relative"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -20, opacity: 0 }}
                                        >
                                            <motion.a
                                                href={`#${item}`}
                                                onClick={() => handleMobileNavClick(item)}
                                                className="block uppercase text-sm tracking-[0.3em] py-2 relative z-10"
                                                whileHover={{ color: '#BE95FF' }}
                                            >
                                                {item}
                                            </motion.a>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;