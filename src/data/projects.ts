import { Code, Brain, Layout, Calculator, Server, Terminal, Smartphone } from "lucide-react";

export const projects = [
    {
        title: "LeetMetric",
        description: "A premium LeetCode stats visualizer with dark mode, animations, and glassmorphism. Built with Next.js 14 and Tailwind.",
        tags: ["Next.js", "Tailwind CSS", "Framer Motion", "GraphQL"],
        link: "https://leetmetric.vercel.app/",
        featured: true,
        icon: Code,
        clue: "NEXT"
    },
    {
        title: "Learning Style Identifier",
        description: "ML pipeline using SOTA models (KAN, TabNet, SS-VAE) to identify student learning styles from behavioral data.",
        tags: ["Python", "Machine Learning", "Streamlit", "PyTorch"],
        link: "https://learning-style-identifier.vercel.app/",
        featured: true,
        icon: Brain,
        clue: "AI"
    },
    {
        title: "MSME Investment Platform",
        description: "Full-stack MERN marketplace connecting manufacturing MSMEs with investors for working capital.",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        link: "https://msme-investment-platform.vercel.app/",
        featured: false,
        icon: Layout
    },
    {
        title: "Bus Fleet Management",
        description: "System for managing bus schedules and fleets, featuring a Gemini AI chatbot integration.",
        tags: ["Python", "Flask", "Gemini AI", "Render"],
        link: "https://bus-fleet-management.vercel.app/",
        featured: false,
        icon: Calculator
    }
];

export const skills = [
    { name: "Frameworks", items: ["Next.js", "React", "Tailwind CSS", "Streamlit"] },
    { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
    { name: "Tools & AI", items: ["Git", "Docker", "Figma", "Gemini API"] },
];
