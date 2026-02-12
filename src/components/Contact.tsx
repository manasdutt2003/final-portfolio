"use client";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-12 backdrop-blur-sm"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">Let&apos;s Work Together</h2>
                            <p className="text-zinc-400 mb-8">
                                I&apos;m currently available for freelance projects and open to full-time opportunities.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-zinc-300">
                                    <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                                        <Mail size={20} />
                                    </div>
                                    <a href="mailto:manasdutt2003@gmail.com" className="hover:text-white transition-colors">
                                        manasdutt2003@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-4 text-zinc-300">
                                    <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
                                        <MapPin size={20} />
                                    </div>
                                    <span>India</span>
                                </div>
                            </div>
                        </div>

                        <form
                            action="mailto:manasdutt2003@gmail.com"
                            method="post"
                            encType="text/plain"
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Name</label>
                                <input type="text" name="name" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Message</label>
                                <textarea name="message" rows={4} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-emerald-500/10 blur-[150px] -z-10 rounded-full" />
        </section>
    );
}
