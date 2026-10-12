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
  },
];

export function ServicesSection() {
  return (
    <section id="skills" className="py-15 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building scalable software, data systems and AI solutions that drive real business impact
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map(({ icon: Icon, title, description, points }, index) => (
            <motion.article
              key={title}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-8 w-8 text-white" strokeWidth={1.75} aria-hidden="true" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {description}
              </p>

              <ul className="space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
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
