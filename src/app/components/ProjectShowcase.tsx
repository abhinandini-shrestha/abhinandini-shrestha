import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { Github, ExternalLink, Search, Calendar, Users, Star, GitBranch } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  liveDemo: string;
  github: string;
  status: 'completed' | 'in-progress' | 'maintained';
  features: string[];
  challenges: string[];
  learnings: string[];
  stats: {
    stars: number;
    forks: number;
    commits: number;
    contributors: number;
  };
  timeline: string;
}

export function ProjectShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with advanced features',
      longDescription: 'A comprehensive e-commerce platform built with modern technologies, featuring user authentication, product management, shopping cart functionality, payment processing, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'JWT', 'Redux'],
      category: 'fullstack',
      liveDemo: '#',
      github: '#',
      status: 'completed',
      features: [
        'User authentication & authorization',
        'Product catalog with search & filters',
        'Shopping cart & wishlist',
        'Payment integration with Stripe',
        'Order management system',
        'Admin dashboard',
        'Responsive design'
      ],
      challenges: [
        'Implementing secure payment processing',
        'Optimizing database queries for large product catalogs',
        'Managing complex state with Redux'
      ],
      learnings: [
        'Advanced React patterns and hooks',
        'Payment gateway integration',
        'Database optimization techniques',
        'Security best practices'
      ],
      stats: { stars: 42, forks: 18, commits: 156, contributors: 1 },
      timeline: '3 months'
    },
    {
      id: '2',
      title: 'Task Management System',
      description: 'Real-time collaborative task management with advanced features',
      longDescription: 'A sophisticated task management application with real-time collaboration, drag-and-drop functionality, team management, and comprehensive reporting features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop',
      techStack: ['Next.js', 'PostgreSQL', 'Socket.io', 'Prisma', 'TypeScript'],
      category: 'fullstack',
      liveDemo: '#',
      github: '#',
      status: 'maintained',
      features: [
        'Real-time collaboration',
        'Drag & drop task management',
        'Team management & permissions',
        'File attachments',
        'Advanced reporting',
        'Custom workflows',
        'Mobile responsive'
      ],
      challenges: [
        'Implementing real-time sync across multiple clients',
        'Designing efficient database schema',
        'Handling complex permission system'
      ],
      learnings: [
        'WebSocket implementation',
        'Advanced TypeScript patterns',
        'Database design principles',
        'Performance optimization'
      ],
      stats: { stars: 38, forks: 12, commits: 203, contributors: 2 },
      timeline: '4 months'
    },
    {
      id: '3',
      title: 'Weather Analytics Dashboard',
      description: 'Advanced weather dashboard with data visualization',
      longDescription: 'A comprehensive weather analytics platform featuring interactive maps, detailed forecasts, historical data analysis, and customizable alerts.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop',
      techStack: ['Vue.js', 'D3.js', 'Express.js', 'OpenWeather API', 'Chart.js'],
      category: 'frontend',
      liveDemo: '#',
      github: '#',
      status: 'completed',
      features: [
        'Interactive weather maps',
        'Detailed forecasts & alerts',
        'Historical data analysis',
        'Custom location tracking',
        'Data export functionality',
        'Mobile-first design'
      ],
      challenges: [
        'Handling large datasets efficiently',
        'Creating responsive data visualizations',
        'API rate limiting management'
      ],
      learnings: [
        'Data visualization with D3.js',
        'Vue.js composition API',
        'API optimization strategies',
        'Performance monitoring'
      ],
      stats: { stars: 25, forks: 8, commits: 98, contributors: 1 },
      timeline: '2 months'
    },
    {
      id: '4',
      title: 'DevOps Automation Suite',
      description: 'CI/CD pipeline automation and monitoring tools',
      longDescription: 'A comprehensive DevOps automation suite featuring CI/CD pipeline management, monitoring dashboards, and deployment automation tools.',
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop',
      techStack: ['Docker', 'Kubernetes', 'Jenkins', 'Grafana', 'Terraform'],
      category: 'devops',
      liveDemo: '#',
      github: '#',
      status: 'in-progress',
      features: [
        'Automated CI/CD pipelines',
        'Infrastructure as Code',
        'Monitoring & alerting',
        'Container orchestration',
        'Auto-scaling capabilities'
      ],
      challenges: [
        'Complex infrastructure management',
        'Service mesh implementation',
        'Multi-environment deployments'
      ],
      learnings: [
        'Kubernetes orchestration',
        'Infrastructure automation',
        'Monitoring best practices',
        'Cloud architecture patterns'
      ],
      stats: { stars: 15, forks: 5, commits: 67, contributors: 1 },
      timeline: '2 months (ongoing)'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'devops', label: 'DevOps' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'maintained': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects, technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex-1">{project.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.github} aria-label="GitHub">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={project.liveDemo} aria-label="Live Demo">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {project.stats.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      {project.stats.forks}
                    </span>
                  </div>
                  <span className="capitalize">{project.status.replace('-', ' ')}</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {project.title}
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                      </DialogTitle>
                      <DialogDescription>{project.longDescription}</DialogDescription>
                    </DialogHeader>
                    
                    <Tabs defaultValue="overview" className="mt-4">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="features">Features</TabsTrigger>
                        <TabsTrigger value="challenges">Challenges</TabsTrigger>
                        <TabsTrigger value="stats">Stats</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="mb-2">Tech Stack</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.techStack.map(tech => (
                                <Badge key={tech} variant="secondary">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="mb-2">Timeline</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {project.timeline}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="features" className="space-y-2">
                        <h4 className="mb-2">Key Features</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="text-sm flex items-center gap-2">
                              <span className="w-2 h-2 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      
                      <TabsContent value="challenges" className="space-y-4">
                        <div>
                          <h4 className="mb-2">Technical Challenges</h4>
                          <ul className="space-y-1 mb-4">
                            {project.challenges.map((challenge, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2">Key Learnings</h4>
                          <ul className="space-y-1">
                            {project.learnings.map((learning, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                {learning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="stats" className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                              <div className="text-2xl">{project.stats.stars}</div>
                              <div className="text-xs text-muted-foreground">Stars</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <GitBranch className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                              <div className="text-2xl">{project.stats.forks}</div>
                              <div className="text-xs text-muted-foreground">Forks</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded text-white flex items-center justify-center text-xs">
                                C
                              </div>
                              <div className="text-2xl">{project.stats.commits}</div>
                              <div className="text-xs text-muted-foreground">Commits</div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <Users className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                              <div className="text-2xl">{project.stats.contributors}</div>
                              <div className="text-xs text-muted-foreground">Contributors</div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}