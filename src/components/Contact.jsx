import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-space">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-8"
                >
                    READY TO LAUNCH?
                </motion.h2>
                <p className="text-gray-400 text-lg mb-12">
                    Open for opportunities and collaborations. Let's build something extraordinary.
                </p>

                <div className="flex justify-center gap-8 mb-16">
                    <a href="mailto:manasdutt2003@gmail.com" className="p-4 bg-starship rounded-full hover:bg-white hover:text-black transition-all">
                        <Mail size={24} />
                    </a>
                    <a href="https://linkedin.com/in/manas-dutt" target="_blank" className="p-4 bg-starship rounded-full hover:bg-[#0077b5] hover:text-white transition-all">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://github.com/manas-dutt" target="_blank" className="p-4 bg-starship rounded-full hover:bg-gray-800 hover:text-white transition-all">
                        <Github size={24} />
                    </a>
                </div>

                <footer className="text-gray-600 text-sm font-mono">
                    <p>© 2026 MANAS DUTT. SYSTEMS ONLINE.</p>
                </footer>
            </div>
        </section>
    );
};

export default Contact;
