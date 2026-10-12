import { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, MapPin, Calendar, Download, Menu, X, Terminal, Briefcase, Heart, GraduationCap  } from "lucide-react";

// Import custom components
import { SkillsVisualization } from './components/SkillsVisualization';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { GitHubStats } from './components/GitHubStats';
import { ThemeToggle } from './components/ThemeToggle';
import { FloatingElements } from './components/FloatingElements';
import { AppleStyleHero } from './components/AppleStyleHero';
import { AIAssistant } from './components/AIAssistant';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    // { id: 'projects', label: 'Projects' },
    // { id: 'github', label: 'GitHub' },
    // { id: 'terminal', label: 'Terminal' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      <FloatingElements />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-xl gradient-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Abhinandini Shrestha
            </motion.h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className={`hover:text-primary transition-colors relative ${
                    activeSection === item.id ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <div className="hidden md:flex space-x-1">
                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:abhinandinishrestha@gmail.com" aria-label="Email">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="tel:+1 (206)-335-1168" aria-label="Phone">
                    <Phone className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/abhinandini-shrestha/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/abhinandini-shrestha" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t pt-4"
            >
              <div className="flex flex-col space-y-3">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Apple-Style Hero Section */}
      <section id="home" className="relative">
        <AppleStyleHero onScrollToSection={scrollToSection} />
      </section>

      {/* Interactive Terminal Section */}
      {/*<section id="terminal" className="py-20 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <InteractiveTerminal />
            <p className="text-center text-sm text-muted-foreground mt-4">
              Try commands like: help, about, skills, projects, contact
            </p>
          </motion.div>
        </div>
      </section>*/}

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <ServicesSection />

      {/* Skills Section */}
      {/*<section id="skills" className="py-20 relative z-10">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <motion.div */}
      {/*      className="max-w-6xl mx-auto"*/}
      {/*      initial={{ opacity: 0 }}*/}
      {/*      whileInView={{ opacity: 1 }}*/}
      {/*      transition={{ duration: 0.8 }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*    >*/}
      {/*      <h2 className="text-center mb-12">Skills & Expertise</h2>*/}
      {/*      <SkillsVisualization />*/}
      {/*    </motion.div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* Projects Section */}
      {/*<section id="projects" className="py-20 bg-muted/30 relative z-10">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <motion.div */}
      {/*      className="max-w-6xl mx-auto"*/}
      {/*      initial={{ opacity: 0 }}*/}
      {/*      whileInView={{ opacity: 1 }}*/}
      {/*      transition={{ duration: 0.8 }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*    >*/}
      {/*      <h2 className="text-center mb-12">Featured Projects</h2>*/}
      {/*      <ProjectShowcase />*/}
      {/*    </motion.div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* GitHub Stats Section */}
      {/*<section id="github" className="py-20 relative z-10">*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <motion.div */}
      {/*      className="max-w-6xl mx-auto"*/}
      {/*      initial={{ opacity: 0 }}*/}
      {/*      whileInView={{ opacity: 1 }}*/}
      {/*      transition={{ duration: 0.8 }}*/}
      {/*      viewport={{ once: true }}*/}
      {/*    >*/}
      {/*      <h2 className="text-center mb-12 flex items-center justify-center gap-2">*/}
      {/*        <Github className="h-8 w-8" />*/}
      {/*        GitHub Analytics*/}
      {/*      </h2>*/}
      {/*      <GitHubStats />*/}
      {/*    </motion.div>*/}
      {/*  </div>*/}
      {/*</section>*/}



      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
                Contact
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always excited about new opportunities, challenging projects, and connecting with fellow developers. 
              Whether you have a project in mind or just want to chat about technology, I'd love to hear from you!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <a href="mailto:abhinandinishrestha@gmail.com" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="mb-2">Email</h3>
                    <p className="text-sm text-primary">abhinandinishrestha@gmail.com</p>
                  </CardContent>
                </Card>
              </a>

              <a href="https://www.linkedin.com/in/abhinandini-shrestha/" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <Linkedin className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="mb-2">LinkedIn</h3>
                    <p className="text-sm text-primary">linkedin.com/in/abhinandini-shrestha/</p>
                  </CardContent>
                </Card>
              </a>

              <a href="https://github.com/abhinandini-shrestha" target="_blank" rel="noopener noreferrer" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <Github className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <h3 className="mb-2">GitHub</h3>
                    <p className="text-sm text-primary">github.com/abhinandini-shrestha</p>
                  </CardContent>
                </Card>
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 Abhinandini Shrestha. Built with React, TypeScript & Tailwind CSS.
            </p>
            <div className="flex items-center space-x-4">
              <a href="mailto:abhinandinishrestha@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+1 (206)-335-1168" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/abhinandini-shrestha/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/abhinandini-shrestha" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Assistant - Always Available */}
      <AIAssistant />

    </div>
  );
}