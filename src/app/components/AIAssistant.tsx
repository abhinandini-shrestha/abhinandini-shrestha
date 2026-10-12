import { useState, useRef, useEffect, type ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { motion } from 'motion/react';
import { Bot, User, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Suggestion {
  text: string;
  category: 'skills' | 'projects' | 'experience' | 'personal';
}

const GREETING =
  "Hi! I'm Abhinandini's AI assistant. Ask me about her experience, AI projects, skills, education, or the roles she's looking for!";

const suggestions: Suggestion[] = [
  { text: 'Tell me about the LLM document classifier', category: 'projects' },
  { text: 'What AI and ML experience does she have?', category: 'skills' },
  { text: 'What roles is Abhinandini looking for?', category: 'personal' },
  { text: 'How many years of experience?', category: 'experience' },
  { text: 'What did she build at Intend Software?', category: 'experience' },
  { text: "What's her education background?", category: 'experience' },
];

/* Each rule: if any keyword appears in the question (as a whole word), reply with `answer`.
   Rules are checked top to bottom, so specific topics sit above general ones. */
const rules: { keywords: string[]; answer: string }[] = [
  // Contact & hiring
  {
    keywords: ['contact', 'email', 'reach', 'linkedin', 'connect'],
    answer:
      "You can reach Abhinandini at abhinandinishrestha@gmail.com or on LinkedIn (linkedin.com/in/abhinandini-shrestha). She's actively looking for full-time roles and would love to hear from you!",
  },
  {
    keywords: ['looking', 'roles', 'role', 'job', 'hire', 'hiring', 'goal', 'goals', 'career', 'future', 'open', 'available'],
    answer:
      'Abhinandini is seeking full-time roles in Software Engineering, AI Development and Data Engineering. She wants to combine her backend and data foundation, industry experience and graduate training to build impactful, scalable AI-driven systems.',
  },

  // Projects & experience
  {
    keywords: ['classifier', 'classification', 'document', 'documents', 'licensing', 'dol', 'llm project', 'ai project'],
    answer:
      'At the Washington State Department of Licensing, Abhinandini built an LLM-powered document classification system to solve their document retention problem. It now processes 15K+ documents a day and has cut review time by 30%.',
  },
  {
    keywords: ['intend', 'erp', 'transactions'],
    answer:
      'At Intend Software, Abhinandini worked across API development, third-party integrations, data pipelines and database management for an ERP platform supporting 10K+ daily transactions. She also wrote the CRM queries and built the dashboards that gave stakeholders practical insight into their business.',
  },
  {
    keywords: ['dashboard', 'dashboards', 'crm', 'analytics', 'insights', 'reporting'],
    answer:
      "Abhinandini built CRM queries and stakeholder dashboards at Intend Software, and deepened her analytics and data science skills during her master's at UW. She enjoys uncovering the 'why' behind trends and turning it into clear, actionable stories.",
  },
  {
    keywords: ['project', 'projects', 'portfolio', 'built', 'build'],
    answer:
      'Highlights: (1) an LLM document classifier processing 15K+ docs/day for Washington State, (2) backend APIs, integrations and pipelines for an ERP platform with 10K+ daily transactions, (3) CRM dashboards for stakeholders, and (4) this portfolio, including the interactive terminal!',
  },
  {
    keywords: ['years', 'experience', 'background', 'saas'],
    answer:
      "Abhinandini has 6+ years of full-stack software engineering experience in agile teams, mostly on SaaS applications: APIs, third-party integrations, data pipelines, databases and dashboards. Most recently she's focused on AI development.",
  },
  {
    keywords: ['education', 'degree', 'university', 'uw', 'master', 'masters', 'school', 'gpa', 'study', 'studied'],
    answer:
      'Abhinandini earned a Master of Science in Information Management from the University of Washington, Seattle (2024–2025, GPA 3.71), focusing on data science and machine learning.',
  },

  // Skills
  {
    keywords: ['ai', 'ml', 'llm', 'llms', 'rag', 'langchain', 'agent', 'agents', 'machine learning', 'pytorch', 'prompt'],
    answer:
      'Abhinandini works with LLMs, RAG, AI agents, LangChain, PyTorch, Scikit-learn and prompt engineering, and uses AI dev tools like Claude Code, Cursor and Ollama. Her LLM classifier at Washington State processes 15K+ documents a day.',
  },
  {
    keywords: ['data engineering', 'pipeline', 'pipelines', 'etl', 'database', 'databases', 'sql', 'postgres', 'postgresql', 'mysql', 'nosql'],
    answer:
      'Abhinandini has built data pipelines and managed databases for a high-volume ERP platform, and works with SQL, PostgreSQL, MySQL and NoSQL databases.',
  },
  {
    keywords: ['cloud', 'aws', 'devops', 'docker', 'kubernetes', 'jenkins', 'ci', 'cd', 'grafana', 'linux'],
    answer:
      'On the DevOps & cloud side, Abhinandini uses AWS, Docker, Kubernetes, Jenkins, Linux, Git/GitHub, Grafana and JIRA.',
  },
  {
    keywords: ['react', 'frontend', 'front-end', 'ui', 'javascript', 'js', 'node', 'backend', 'back-end', 'api', 'apis', 'full-stack', 'fullstack'],
    answer:
      'Abhinandini is a full-stack engineer: React on the frontend; Node.js, PHP and Python on the backend; plus REST API design and third-party integrations for SaaS products.',
  },
  {
    keywords: ['python'],
    answer:
      "Python is one of Abhinandini's core languages, used for backend work, data pipelines, and AI/ML with PyTorch, Scikit-learn and LangChain.",
  },
  {
    keywords: ['skills', 'skill', 'languages', 'language', 'stack', 'tech', 'technologies', 'tools'],
    answer:
      'Languages: Python, JavaScript, PHP, SQL, Bash. Frameworks & DBs: React, Node.js, PostgreSQL, MySQL, NoSQL. AI/ML: LLMs, RAG, AI Agents, LangChain, PyTorch, Scikit-learn. DevOps & Cloud: AWS, Docker, Kubernetes, Jenkins, Grafana.',
  },

  // Personal
  {
    keywords: ['location', 'where', 'based', 'live', 'seattle'],
    answer: 'Abhinandini is based in Seattle, WA and open to full-time opportunities.',
  },
  {
    keywords: ['hobby', 'hobbies', 'interest', 'interests', 'fun', 'free time', 'outside'],
    answer:
      'Off the clock, Abhinandini loves hiking, traveling and hunting for good food, and any dog or cat that will let her pet them.',
  },
  {
    keywords: ['approach', 'philosophy', 'work style', 'stakeholder', 'stakeholders', 'team', 'strengths'],
    answer:
      "Abhinandini enjoys working closely with stakeholders to understand their pain points and improve the user experience. She's a problem solver, team player, empathetic and organized.",
  },

  // Greetings (last, so "hi" inside other questions doesn't trigger it)
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    answer:
      "Hello! I can tell you about Abhinandini's experience, AI projects, skills, education or the roles she's looking for. What would you like to know?",
  },
];

const fallbacks = [
  'Good question! Abhinandini is a full-stack engineer with 6+ years of SaaS experience, now focused on AI. Try asking about her LLM project, skills or experience.',
  "I'm not sure about that one. You could ask about her experience at Intend Software, her AI work, her education, or the roles she's looking for.",
  "I don't have that detail, but Abhinandini would be happy to answer directly at abhinandinishrestha@gmail.com!",
];

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function getAIResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  const match = rules.find(({ keywords }) =>
    keywords.some((k) => new RegExp(`\\b${escapeRegExp(k)}\\b`).test(message))
  );
  if (match) return match.answer;
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'greeting', text: GREETING, sender: 'ai', timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = (raw: string) => {
    const text = raw.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() },
    ]);
    setInputValue('');
    setIsTyping(true);

    // Simulated "thinking" time
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: getAIResponse(text), sender: 'ai', timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 700 + Math.random() * 700);
  };

  if (isMinimized) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          aria-label="Open AI assistant"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-[calc(1rem+40px)] right-4 z-50 w-96 max-w-[calc(100vw-2rem)]"
    >
      <Card className="shadow-2xl border-2 border-purple-200 dark:border-purple-800 gap-0 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              Ask about Abhinandini
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize assistant"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              _
            </Button>
          </div>
          <p className="text-sm text-purple-100">Her experience, AI projects, skills and more</p>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea ref={scrollAreaRef} className="h-80 p-4">
            <div className="space-y-4" aria-live="polite">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <Avatar className="w-8 h-8 shrink-0 bg-gradient-to-r from-purple-600 to-blue-600">
                      <AvatarFallback className="text-white bg-transparent">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.sender === 'user' && (
                    <Avatar className="w-8 h-8 shrink-0 bg-blue-600">
                      <AvatarFallback className="text-white bg-transparent">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 shrink-0 bg-gradient-to-r from-purple-600 to-blue-600">
                    <AvatarFallback className="text-white bg-transparent">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3" aria-label="Assistant is typing">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Suggestions — clicking one asks it right away */}
          {messages.length <= 1 && (
            <div className="p-4 border-t bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-1">
                {suggestions.slice(0, 3).map((suggestion) => (
                  <Button
                    key={suggestion.text}
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage(suggestion.text)}
                    className="text-xs h-auto py-1.5 whitespace-normal text-left"
                  >
                    {suggestion.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            className="p-4 border-t"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputValue);
            }}
          >
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                placeholder="Ask about experience, skills, projects..."
                aria-label="Ask a question"
                className="flex-1"
              />
              <Button type="submit" disabled={!inputValue.trim() || isTyping} size="icon" aria-label="Send">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}