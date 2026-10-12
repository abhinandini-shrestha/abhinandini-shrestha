import { motion } from 'motion/react';
import {
  BrainCircuit,
  Layers,
  Server,
  Workflow,
  BarChart3,
  Plug,
  Check,
  type LucideIcon,
} from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
  category?: 'ai' | 'platform' | 'data';
}

/* ✏️ Edit cards here — the grid renders whatever is in this list. */
const SERVICES: Service[] = [
  {
    icon: BrainCircuit,
    title: 'AI & LLM Development',
    description: 'Production AI systems that automate real workflows at scale',
    points: [
      'LLM-powered document classification',
      'Prompt design & evaluation',
      'AI pipelines processing 15K+ docs/day',
      'Human-in-the-loop review flows',
    ],
    category: 'ai',
  },
  {
    icon: Layers,
    title: 'Full-Stack Development',
    description: 'End-to-end SaaS applications, from database to interface',
    points: [
      'Custom web applications',
      'React & TypeScript front-ends',
      'Responsive, accessible UI',
      'Agile delivery with stakeholders',
    ],
    category: 'platform',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    description: 'Robust server-side systems built for high-volume platforms',
    points: [
      'RESTful API design',
      'ERP platform handling 10K+ daily transactions',
      'Authentication & access control',
      'Performance & query optimization',
    ],
    category: 'platform',
  },
  {
    icon: Workflow,
    title: 'Data Engineering',
    description: 'Reliable pipelines that move and shape data where it is needed',
    points: [
      'ETL / data pipelines',
      'Database design & management',
      'Data quality & validation',
      'Scalable storage strategies',
    ],
    category: 'data',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Dashboards',
    description: 'Turning raw data into insights stakeholders can act on',
    points: [
      'CRM queries & reporting',
      'Stakeholder dashboards',
      'Data science & machine learning',
      'Clear, actionable data stories',
    ],
    category: 'data',
  },
  {
    icon: Plug,
    title: 'Third-Party Integrations',
    description: 'Connecting platforms so data and workflows flow seamlessly',
    points: [
      'External API integrations',
      'Webhooks & sync jobs',
      'ERP & CRM connectivity',
      'Error handling & monitoring',
    ],
    category: 'platform',
  },
];

const categoryColors = {
  ai: 'before:bg-gradient-to-b before:from-orange-500 before:to-amber-500',
  platform: 'before:bg-gradient-to-b before:from-cyan-500 before:to-blue-500',
  data: 'before:bg-gradient-to-b before:from-emerald-500 before:to-teal-500',
};

const categoryIconColors = {
  ai: 'text-orange-600 dark:text-orange-400',
  platform: 'text-cyan-600 dark:text-cyan-400',
  data: 'text-emerald-600 dark:text-emerald-400',
};

export function ServicesSection() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >

          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Building scalable software, data systems and AI solutions that drive real business impact
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, title, description, points, category = 'platform' }, index) => (
            <motion.article
              key={title}
              className={`relative bg-card dark:bg-card rounded-lg p-6 border border-border before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-l-lg ${categoryColors[category]}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <div className="flex items-start gap-3 mb-4">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${categoryIconColors[category]}`} strokeWidth={1.75} aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {description}
              </p>

              <ul className="space-y-2.5">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-gray-600 dark:text-gray-600" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
