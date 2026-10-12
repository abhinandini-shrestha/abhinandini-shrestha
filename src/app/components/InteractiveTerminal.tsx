import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { motion } from 'motion/react';

/* ASCII banner ("slant" figlet font, same style as the Composer CLI banner). */
const NAME_BANNER = [
  "    ___    __    __    _                       ___       _",
  "   /   |  / /_  / /_  (_)___  ____ _____  ____/ (_)___  (_)",
  "  / /| | / __ \\/ __ \\/ / __ \\/ __ `/ __ \\/ __  / / __ \\/ /",
  " / ___ |/ /_/ / / / / / / / / /_/ / / / / /_/ / / / / / /",
  "/_/  |_/_.___/_/ /_/_/_/ /_/\\__,_/_/ /_/\\__,_/_/_/ /_/_/",
  "   _____ __                   __  __",
  "  / ___// /_  ________  _____/ /_/ /_  ____ _",
  "  \\__ \\/ __ \\/ ___/ _ \\/ ___/ __/ __ \\/ __ `/",
  " ___/ / / / / /  /  __(__  ) /_/ / / / /_/ /",
  "/____/_/ /_/_/   \\___/____/\\__/_/ /_/\\__,_/",
].join("\n");

const PROMPT = 'abhinandini-dev@portfolio:~$';
const VERSION = '1.0.0';

type EntryKind = 'banner' | 'help' | 'success' | 'error' | 'info';

interface Entry {
  input: string;
  output: string;
  kind: EntryKind;
}

/* Single source of truth: drives both `help` and command dispatch. */
/* Single source of truth: drives both `help` and command dispatch. */
const COMMANDS: Record<string, { description: string; output: string; kind: EntryKind }> = {
  help: { description: 'List available commands', output: '', kind: 'help' },
  about: {
    description: 'Learn more about me',
    kind: 'success',
    output: `👩‍💻 Abhinandini Shrestha — Software Engineer

Full-stack engineer with 6+ years building SaaS platforms,
APIs and data pipelines, now focused on AI.

I love turning stakeholders' pain points into solutions
people actually enjoy using.

📍 Seattle, WA · 💼 Open to full-time roles`,
  },
  experience: {
    description: 'Where I have worked',
    kind: 'success',
    output: `💼 Experience:
→ KeelWorks Foundation
  📍 Seattle, WA · 📅 [Aug 2026] – [Present]
  [Software Engineer]
  
→ WA State Department of Licensing
  📍 Seattle, WA · 📅 [June 2025] – [Sept 2025]
  [Software Developer]

→ Intend Software
  📍 Kathmandu, Nepal · 📅 [April 2020] – [Dec 2023]
  [Senior Software Development Engineer, Head of Client Technical Support]
 
→ Proshore Nepal
  📍 Kathmandu, Nepal · 📅 [Feb 2019] – [Aug 2019]
  [Software Development Engineer] 
  
  `,
  },
  skills: {
    description: 'View my technical skills',
    kind: 'success',
    output: `🚀 Technical Skills:

Languages:     Python · JavaScript · PHP · SQL · Bash · React · Node.js
Databases:     PostgreSQL · MySQL · NoSQL
AI / ML:       LLMs · RAG · AI Agents · LangChain · PyTorch · Scikit-learn · Claude Code
DevOps:         AWS · Docker · Kubernetes · Jenkins · Linux · Git · Grafana · JIRA`,
  },
//   projects: {
//     description: 'List my projects',
//     kind: 'success',
//     output: `📁 Featured Projects:
//
// 1. LLM Document Classifier — AI pipeline, 15K+ docs/day
// 2. ERP Platform Backend    — APIs, integrations, pipelines
// 3. CRM Insight Dashboards  — queries & stakeholder reporting
// 4. This Portfolio          — you're looking at it! 😉
//
// Type 'github' to see more of my code.`,
//   },
  education: {
    description: 'View my education',
    kind: 'success',
    output: `🎓 Education:

M.S. Information Management
University of Washington, Seattle · 2024 – 2025
GPA 3.71 / 4.0 · Focus: Data Science & ML

B.S. Information Technology
Kantipur City College, Purbanchal University · 2013 – 2017
GPA 3.07 / 4.0
Relevent courses: Computer Science, OOPS with C/C++, Distributed Systems, Data Structure & Algorithm, NLP
`,
  },
  contact: {
    description: 'Get my contact information',
    kind: 'success',
    output: `📧 Contact Information:

Email:    abhinandinishrestha@gmail.com
LinkedIn: linkedin.com/in/abhinandini-shrestha
GitHub:   github.com/abhinandini-shrestha
Location: Seattle, WA

Open to Software Engineering, AI Development
and Data Engineering roles. Let's talk!`,
  },
  github: {
    description: 'View my GitHub profile',
    kind: 'success',
    output: `🔗 github.com/abhinandini-shrestha`,
  },
  linkedin: {
    description: 'View my Linkedin profile',
    kind: 'success',
    output: `🔗 linkedin.com/in/abhinandini-shrestha`,
  },
  whoami: { description: 'Display current user', kind: 'info', output: 'abhinandini · Software Engineer · AI & Data' },
  clear: { description: 'Clear terminal', output: '', kind: 'info' },
};

const COMMAND_PAD = Math.max(...Object.keys(COMMANDS).map((c) => c.length)) + 4;

/* Composer-style "Usage / Options" block. */
function HelpBlock() {
  return (
    <div className="mb-3">
      <div className="text-yellow-400">Usage:</div>
      <div className="pl-4 text-zinc-200">command</div>
      <div className="mt-2 text-yellow-400">Available commands:</div>
      {Object.entries(COMMANDS).map(([name, { description }]) => (
        <div key={name} className="pl-4 flex">
          <span className="text-green-400 shrink-0" style={{ width: `${COMMAND_PAD}ch` }}>
            {name}
          </span>
          <span className="text-zinc-300">{description}</span>
        </div>
      ))}
    </div>
  );
}

function BannerBlock() {
  return (
    <div className="mb-3">
      <pre className="text-zinc-100 text-[9px] sm:text-[11px] xl:text-xs leading-[1.15] overflow-x-auto">
        {NAME_BANNER}
      </pre>
      <div className="mt-2">
        <span className="text-green-400">Portfolio</span>
        <span className="text-zinc-200"> version </span>
        <span className="text-yellow-400">{VERSION}</span>
        <span className="text-zinc-400"> · Software Engineer</span>
      </div>
      <div className="mt-3">
        <HelpBlock />
      </div>
    </div>
  );
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Entry[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pastInputs, setPastInputs] = useState<string[]>([]);
  const [pastIndex, setPastIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome banner appears once the hero text has animated in.
    const t = setTimeout(() => {
      setHistory([{ input: '', output: '', kind: 'banner' }]);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const data = COMMANDS[cmd];
    setHistory((prev) => [
      ...prev,
      data
        ? { input: command, output: data.output, kind: data.kind }
        : {
            input: command,
            output: `zsh: command not found: ${command}. Type 'help' for available commands.`,
            kind: 'error',
          },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = currentInput;
    if (!value.trim()) return;

    setPastInputs((prev) => [...prev, value]);
    setPastIndex(null);
    setIsTyping(true);
    setTimeout(() => {
      executeCommand(value);
      setCurrentInput('');
      setIsTyping(false);
    }, 300);
  };

  // ↑ / ↓ cycle through previously typed commands, like a real shell.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!pastInputs.length) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = pastIndex === null ? pastInputs.length - 1 : Math.max(0, pastIndex - 1);
      setPastIndex(next);
      setCurrentInput(pastInputs[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (pastIndex === null) return;
      const next = pastIndex + 1;
      if (next >= pastInputs.length) {
        setPastIndex(null);
        setCurrentInput('');
      } else {
        setPastIndex(next);
        setCurrentInput(pastInputs[next]);
      }
    }
  };

  // preventScroll stops the page from jumping while the hero is mid-animation.
  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  const renderOutput = (entry: Entry) => {
    if (entry.kind === 'banner') return <BannerBlock />;
    if (entry.kind === 'help') return <HelpBlock />;
    return (
      <pre
        className={`whitespace-pre-wrap mb-2 ${
          entry.kind === 'error'
            ? 'text-red-400'
            : entry.kind === 'info'
              ? 'text-blue-400'
              : 'text-green-400'
        }`}
      >
        {entry.output}
      </pre>
    );
  };

  return (
    <Card className="bg-black text-green-400 font-mono text-left text-xs sm:text-sm h-[26rem] sm:h-[30rem] flex flex-col border-zinc-800 shadow-2xl gap-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-zinc-400 text-xs font-normal flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="flex-1 text-center pr-12">abhinandini-dev — zsh</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1 min-h-0 flex flex-col" onClick={focusInput}>
        <div
          ref={terminalRef}
          className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800"
        >
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {entry.input && (
                <div className="flex items-center gap-2 text-zinc-100">
                  <span className="text-blue-400 shrink-0">{PROMPT}</span>
                  <span className="break-all">{entry.input}</span>
                </div>
              )}
              {renderOutput(entry)}
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2">
              <span className="text-blue-400 shrink-0">{PROMPT}</span>
              <span className="animate-pulse">Executing...</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="flex items-center gap-2">
            <label htmlFor="terminal-input" className="text-blue-400 shrink-0">
              {PROMPT}
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-zinc-100 caret-green-400"
              placeholder="Type a command..."
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
