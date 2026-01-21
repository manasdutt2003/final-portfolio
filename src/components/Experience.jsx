import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <section id="experience" className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold mb-16 border-l-4 border-accent pl-6 uppercase tracking-widest"
                >
                    Experience
                </motion.h2>

                <div className="relative border-l border-gray-800 ml-6 md:ml-12 space-y-12">
                    {/* Hetu Labs */}
                    <div className="relative pl-8 md:pl-16">
                        <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-black" />
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                            <h3 className="text-2xl font-bold text-white">Hetu Labs</h3>
                            <span className="text-gray-500 font-mono">May 2025 – July 2025</span>
                        </div>
                        <p className="text-lg text-gray-400 mb-4">Software Engineering Intern (Remote)</p>
                        <ul className="list-disc list-inside text-gray-500 space-y-2 marker:text-gray-600">
                            <li>Designed and optimized backend utilities, reducing API response latency by <strong className="text-white">25%</strong>.</li>
                            <li>Collaborated with senior engineers on scalable system architecture and design decisions.</li>
                            <li>Automated CI/CD workflows and improved code maintainability through documentation.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
