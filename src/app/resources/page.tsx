import { BookOpen, FileCode, PlayCircle, Users } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "Documentation",
      desc: "Learn how to integrate AgentHub into your stack with our comprehensive guides.",
      link: "https://github.com/shivam-prajapat/AgentHub-BharatTech#readme"
    },
    {
      icon: <FileCode className="w-8 h-8 text-purple-500" />,
      title: "API Reference",
      desc: "Detailed API endpoints for programmatic access to agents and sandboxes.",
      link: "https://github.com/shivam-prajapat/AgentHub-BharatTech/blob/main/.env.example"
    },
    {
      icon: <PlayCircle className="w-8 h-8 text-rose-500" />,
      title: "Video Tutorials",
      desc: "Step-by-step video guides on creating, publishing, and calling AI agents.",
      link: "https://youtube.com"
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-500" />,
      title: "Community Forum",
      desc: "Join thousands of developers sharing tips, patterns, and agent architectures.",
      link: "https://github.com/shivam-prajapat/AgentHub-BharatTech/discussions"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-neutral-900">Developer Resources</h1>
        <p className="text-lg text-neutral-600">
          Everything you need to build, scale, and monetize your AI agents.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {resources.map((res, i) => (
          <Link href={res.link} key={i} className="glass-surface p-8 rounded-[2rem] border border-neutral-200 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-neutral-50 flex items-center justify-center mb-6 border border-neutral-100">
              {res.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-neutral-900">{res.title}</h3>
            <p className="text-neutral-600 leading-relaxed">
              {res.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
