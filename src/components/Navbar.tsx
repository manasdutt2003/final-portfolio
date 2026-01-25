"use client";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", to: "hero" },
        { name: "Tech", to: "tech" },
        { name: "Work", to: "work" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b",
                scrolled ? "bg-zinc-950/80 border-zinc-800 py-4" : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="font-bold text-xl tracking-tighter text-white">
                    MD<span className="text-emerald-500">.</span>
                </div>

                <div className="flex gap-8">
                    {navLinks.map((link) => (
                        <ScrollLink
                            key={link.name}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            className="text-sm font-medium text-zinc-400 hover:text-white cursor-pointer transition-colors"
                        >
                            {link.name}
                        </ScrollLink>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
