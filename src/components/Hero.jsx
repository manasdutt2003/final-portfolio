import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-space">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

            <div className="z-10 text-center px-6">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-accent tracking-[0.2em] text-sm uppercase mb-4"
                >
                    Software Engineer
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
                >
                    ENGINEERING<br />THE FUTURE
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
                >
                    Building scalable systems and AI-driven solutions. Focusing on high-performance architecture and intuitive user experiences.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 animate-bounce"
            >
                <ArrowDown className="text-gray-500" />
            </motion.div>
        </section>
    );
};

export default Hero;
