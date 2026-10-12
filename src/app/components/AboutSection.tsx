import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { MapPin, Briefcase, Heart, GraduationCap } from 'lucide-react';

/* ✏️ Edit content here */
const PHOTO_SRC = 'public/images/about-image.jpg'; // file in your /public folder (or import it from src/assets)

const TRAITS = ['Problem Solver', 'Team Player', 'Empathetic', 'Organized'];

const SKILL_GROUPS = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'PHP', 'SQL', 'Bash', 'React', 'Node.js'] },
  { group: 'DB', items: ['PostgreSQL', 'MySQL', 'NoSQL'] },
  { group: 'AI / ML', items: ['LLMs', 'RAG', 'AI Agents', 'LangChain', 'PyTorch', 'Scikit-learn', 'Claude Code'] },
  { group: 'DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux', 'Git', 'Grafana', 'JIRA'] },
];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
      {children}
    </h3>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
            About Me
          </h2>

        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-10 items-start">
          {/* Photo — pinned to the top, stays in view while the card scrolls */}
          <motion.div
            className="lg:sticky lg:top-24 w-full max-w-md mx-auto lg:max-w-none"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl p-[3px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 shadow-xl">
              <img
                src={PHOTO_SRC}
                alt="Abhinandini Shrestha smiling"
                className="block w-full aspect-[4/5] object-cover rounded-[14px]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Details card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-sm">
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* Intro */}
                <div className="space-y-4">
                  <p className="text-[15px] md:text-base leading-relaxed text-foreground/80">
                    Hi! I'm Abhinandini, a full-stack software engineer with 6+ years of experience
                    building SaaS platforms, APIs and data pipelines, now focused on AI. I love working
                    with stakeholders to understand their pain points and turning them into solutions
                    people actually enjoy using.
                  </p>

                  {/*<div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">*/}
                  {/*  <span className="inline-flex items-center gap-1.5">*/}
                  {/*    <MapPin className="h-4 w-4" aria-hidden="true" /> Seattle, WA*/}
                  {/*  </span>*/}
                  {/*  <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">*/}
                  {/*    <Briefcase className="h-4 w-4" aria-hidden="true" /> Open to full-time roles*/}
                  {/*  </span>*/}
                  {/*</div>*/}

                  <ul className="flex flex-wrap gap-2">
                    {TRAITS.map((trait) => (
                      <li
                        key={trait}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/80"
                      >
                        {trait}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-muted-foreground">
                    <Heart className="inline h-4 w-4 mr-1.5 -mt-0.5 text-pink-500" aria-hidden="true" />
                    Off the clock: hiking, traveling, hunting for good food, and any dog or cat that will let me pet them.
                  </p>
                </div>

                <div className="h-px bg-border" />

                {/* Skills */}
                <div>
                  <SectionLabel>Technical Skills</SectionLabel>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
                    {SKILL_GROUPS.map(({ group, items }) => (
                      <div key={group} className="contents">
                        <dt className="font-semibold text-foreground leading-snug"
                            style={{ width: '5rem', minWidth: '5rem', flexShrink: 0, overflowWrap: 'break-word' }}>{group}</dt>
                        <dd className="text-foreground/80">{items.join(' · ')}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="h-px bg-border" />

                {/* Education */}
                <div>
                  <SectionLabel>Education</SectionLabel>
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-medium text-foreground">Master of Science in Information Management</p>
                      <p className="text-sm text-foreground/80">University of Washington, Seattle</p>
                      <p className="text-sm text-muted-foreground">2024 – 2025 · GPA 3.71 / 4.0</p>
                      <p className="text-sm text-muted-foreground">Focus: Data Science &amp; Machine Learning</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}