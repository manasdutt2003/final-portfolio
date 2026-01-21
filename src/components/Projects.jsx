import { motion } from 'framer-motion';
import projectsData from '../data/projects.json';

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-starship text-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold mb-16 border-l-4 border-accent pl-6 uppercase tracking-widest"
                >
                    Mission Log
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-black border border-gray-800 hover:border-accent transition-all duration-300 overflow-hidden"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.slice(0, 4).map((t, i) => ( // Show first 4 tags only
                                        <span key={i} className="px-2 py-1 text-xs font-mono border border-gray-700 rounded text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                    {project.tech.length > 4 && <span className="text-xs text-gray-500 py-1">+{project.tech.length - 4}</span>}
                                </div>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-accent transition-colors"
                                >
                                    View Mission <span className="ml-2">→</span>
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
