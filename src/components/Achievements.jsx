import { motion } from 'framer-motion';

const Achievements = () => {
    return (
        <section id="achievements" className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

                {/* Education Column */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold mb-10 border-l-4 border-accent pl-6 uppercase tracking-widest"
                    >
                        Education
                    </motion.h2>

                    <div className="bg-starship p-8 border-l border-gray-800 hover:border-accent transition-colors">
                        <h3 className="text-2xl font-bold text-white mb-2">Vellore Institute of Technology</h3>
                        <p className="text-accent text-sm uppercase tracking-wider mb-4">Chennai</p>
                        <p className="text-gray-400 mb-1">B.Tech in Computer Science and Engineering</p>
                        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                            <span>Expected May 2026</span>
                            <span className="font-mono text-white">CGPA: 8.77 / 10</span>
                        </div>
                    </div>
                </div>

                {/* Achievements Column */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold mb-10 border-l-4 border-accent pl-6 uppercase tracking-widest"
                    >
                        Achievements
                    </motion.h2>

                    <ul className="space-y-6">
                        {[
                            { title: "International Olympiads (SOF)", value: "Top 4 Rank (IEO), Top 10 Rank (IMO)" },
                            { title: "NSO and NCO", value: "Top 20 International Rank" },
                            { title: "TALLENTEX Competitive Exam", value: "AIR 16" },
                            { title: "FIITJEE Big Bang Test", value: "AIR 10" }
                        ].map((item, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-baseline justify-between border-b border-gray-800 pb-4"
                            >
                                <span className="text-gray-400">{item.title}</span>
                                <span className="text-white font-bold text-right ml-4">{item.value}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default Achievements;
