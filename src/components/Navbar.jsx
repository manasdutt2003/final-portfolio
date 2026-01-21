import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold tracking-tighter"
                >
                    MANAS DUTT<span className="text-accent">.</span>
                </motion.h1>

                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                    {['Experience', 'Projects', 'Achievements', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors uppercase tracking-widest">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
