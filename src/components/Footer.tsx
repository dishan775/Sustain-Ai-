import { motion } from 'framer-motion';
import { ExternalLink, AtSign, BookOpen, Mail } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/motionVariants';

const linkGroups = [
  {
    title: 'Platform',
    links: ['Digital Twin', 'AI Intelligence', 'Decision Engine', 'Scenario Simulator', 'Carbon Analytics'],
  },
  {
    title: 'Research',
    links: ['Methodology', 'Publications', 'Open Data', 'Benchmarks', 'API Documentation'],
  },
  {
    title: 'Company',
    links: ['About', 'Team', 'Careers', 'Contact', 'Press'],
  },
];

const socialLinks = [
  { icon: ExternalLink, label: 'GitHub', href: '#' },
  { icon: AtSign, label: 'Twitter', href: '#' },
  { icon: BookOpen, label: 'LinkedIn', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-sustain-ink text-white/70">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-20">
        <motion.div
          className="grid md:grid-cols-4 gap-12 mb-16"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Wordmark + tagline */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <span className="font-sans text-[26px] font-semibold text-white tracking-[-0.02em]">
              Sustain<span className="text-sustain-emerald">AI</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              The living digital twin for sustainable cities. Built with research rigor, designed for
              real-world impact.
            </p>
          </motion.div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <motion.div key={group.title} variants={fadeInUp}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/50 hover:text-sustain-emerald transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing statement */}
        <motion.div
          className="text-center py-12 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-data text-white text-2xl md:text-3xl font-medium tracking-[-0.02em]">
            Built for cities that want to see clearly.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} SustainAI. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:text-sustain-emerald hover:border-sustain-emerald/30 transition-all"
                  aria-label={social.label}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
