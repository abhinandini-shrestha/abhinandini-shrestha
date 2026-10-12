import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Play, RotateCcw, Copy, Download, Sparkles, Code2, Palette, Zap } from 'lucide-react';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: 'javascript' | 'css' | 'html';
  code: string;
  category: 'animation' | 'interaction' | 'visualization' | 'algorithm';
}

export function LiveCodePlayground() {
  const [selectedExample, setSelectedExample] = useState<string>('particle-system');
  const [currentCode, setCurrentCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLIFrameElement>(null);

  const codeExamples: CodeExample[] = [
    {
      id: 'particle-system',
      title: 'Particle System',
      description: 'Interactive particle system with mouse interaction',
      language: 'javascript',
      category: 'visualization',
      code: `// Interactive Particle System
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 1.0;
    this.decay = Math.random() * 0.02 + 0.005;
    this.size = Math.random() * 3 + 1;
    this.color = \`hsl(\${Math.random() * 60 + 200}, 70%, 60%)\`;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.life -= this.decay;
    return this.life > 0;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

let particles = [];
let mouseX = 0, mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
  
  // Spawn particles at mouse position
  for(let i = 0; i < 3; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
});

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  particles = particles.filter(particle => {
    particle.update();
    particle.draw(ctx);
    return particle.life > 0;
  });
  
  // Add some background particles
  if (Math.random() < 0.02) {
    particles.push(new Particle(
      Math.random() * canvas.width,
      Math.random() * canvas.height
    ));
  }
  
  requestAnimationFrame(animate);
}

animate();`
    },
    {
      id: 'morphing-shapes',
      title: 'Morphing Shapes',
      description: 'CSS animations with complex transformations',
      language: 'css',
      category: 'animation',
      code: `/* Morphing Shapes Animation */
.shape-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

.morphing-shape {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  background-size: 300% 300%;
  border-radius: 50%;
  animation: 
    morph 4s ease-in-out infinite,
    colorShift 6s ease-in-out infinite,
    float 3s ease-in-out infinite;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

@keyframes morph {
  0%, 100% {
    border-radius: 50%;
    transform: scale(1) rotate(0deg);
  }
  25% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: scale(1.1) rotate(90deg);
  }
  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
    transform: scale(0.9) rotate(180deg);
  }
  75% {
    border-radius: 40% 60% 60% 40% / 70% 30% 50% 60%;
    transform: scale(1.15) rotate(270deg);
  }
}

@keyframes colorShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.shape-container:hover .morphing-shape {
  animation-duration: 1s, 2s, 1s;
  transform: scale(1.3);
}`
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      description: 'Interactive chart with D3.js-style animations',
      language: 'javascript',
      category: 'visualization',
      code: `// Dynamic Bar Chart Visualization
const data = [
  { label: 'React', value: 85, color: '#61dafb' },
  { label: 'JavaScript', value: 90, color: '#f7df1e' },
  { label: 'TypeScript', value: 80, color: '#3178c6' },
  { label: 'Node.js', value: 75, color: '#339933' },
  { label: 'Python', value: 70, color: '#3776ab' }
];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

let animationProgress = 0;
const animationSpeed = 0.02;

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  const barWidth = canvas.width / data.length * 0.8;
  const maxValue = Math.max(...data.map(d => d.value));
  const chartHeight = canvas.height - 60;
  
  data.forEach((item, index) => {
    const x = (canvas.width / data.length) * index + 20;
    const barHeight = (item.value / maxValue) * chartHeight * animationProgress;
    const y = canvas.height - barHeight - 40;
    
    // Draw bar with gradient
    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, item.color);
    gradient.addColorStop(1, item.color + '80');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Draw value text
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      Math.round(item.value * animationProgress),
      x + barWidth / 2,
      y - 5
    );
    
    // Draw label
    ctx.fillText(
      item.label,
      x + barWidth / 2,
      canvas.height - 20
    );
    
    // Hover effect simulation
    if (index === Math.floor(Date.now() / 2000) % data.length) {
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 2, y - 2, barWidth + 4, barHeight + 4);
    }
  });
  
  // Title
  ctx.fillStyle = '#333';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Skills Proficiency', canvas.width / 2, 20);
}

function animate() {
  if (animationProgress < 1) {
    animationProgress += animationSpeed;
  }
  
  drawChart();
  requestAnimationFrame(animate);
}

// Reset animation on click
canvas.addEventListener('click', () => {
  animationProgress = 0;
});

animate();`
    },
    {
      id: 'neural-network',
      title: 'Neural Network Viz',
      description: 'Animated neural network visualization',
      language: 'javascript',
      category: 'visualization',
      code: `// Neural Network Visualization
class Neuron {
  constructor(x, y, layer) {
    this.x = x;
    this.y = y;
    this.layer = layer;
    this.activation = Math.random();
    this.connections = [];
    this.pulse = 0;
  }
  
  update() {
    this.pulse = Math.sin(Date.now() * 0.005 + this.layer) * 0.5 + 0.5;
    this.activation = Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.5 + 0.5;
  }
  
  draw(ctx) {
    const radius = 8 + this.pulse * 4;
    const alpha = 0.3 + this.activation * 0.7;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    
    // Outer glow
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius * 2);
    gradient.addColorStop(0, \`rgba(74, 144, 226, \${alpha})\`);
    gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Core
    ctx.fillStyle = \`rgba(74, 144, 226, \${alpha})\`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }
}

class Connection {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.weight = Math.random() * 2 - 1;
    this.signal = 0;
  }
  
  update() {
    this.signal = Math.sin(Date.now() * 0.01 + this.from.x * 0.01) * 0.5 + 0.5;
  }
  
  draw(ctx) {
    const alpha = Math.abs(this.weight) * this.signal * 0.5;
    const color = this.weight > 0 ? '74, 144, 226' : '226, 74, 144';
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = \`rgba(\${color}, \${alpha})\`;
    ctx.lineWidth = Math.abs(this.weight) * 2;
    ctx.beginPath();
    ctx.moveTo(this.from.x, this.from.y);
    ctx.lineTo(this.to.x, this.to.y);
    ctx.stroke();
    ctx.restore();
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

// Create network structure
const layers = [4, 6, 6, 3];
const neurons = [];
const connections = [];

layers.forEach((neuronCount, layerIndex) => {
  const layerNeurons = [];
  const x = (canvas.width / (layers.length - 1)) * layerIndex;
  
  for (let i = 0; i < neuronCount; i++) {
    const y = (canvas.height / (neuronCount + 1)) * (i + 1);
    const neuron = new Neuron(x, y, layerIndex);
    layerNeurons.push(neuron);
    neurons.push(neuron);
  }
  
  // Connect to next layer
  if (layerIndex < layers.length - 1) {
    const nextLayerStart = neurons.length;
    layerNeurons.forEach(neuron => {
      for (let i = 0; i < layers[layerIndex + 1]; i++) {
        // We'll create connections after all neurons are created
        neuron.connections.push(nextLayerStart + i);
      }
    });
  }
});

// Create connections
neurons.forEach(neuron => {
  neuron.connections.forEach(targetIndex => {
    if (neurons[targetIndex]) {
      connections.push(new Connection(neuron, neurons[targetIndex]));
    }
  });
});

function animate() {
  ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Update and draw connections
  connections.forEach(connection => {
    connection.update();
    connection.draw(ctx);
  });
  
  // Update and draw neurons
  neurons.forEach(neuron => {
    neuron.update();
    neuron.draw(ctx);
  });
  
  // Labels
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.font = '12px Arial';
  ctx.fillText('Input', 10, 20);
  ctx.fillText('Hidden', canvas.width/2 - 20, 20);
  ctx.fillText('Output', canvas.width - 40, 20);
  
  requestAnimationFrame(animate);
}

animate();`
    }
  ];

  useEffect(() => {
    const example = codeExamples.find(ex => ex.id === selectedExample);
    if (example) {
      setCurrentCode(example.code);
    }
  }, [selectedExample]);

  const runCode = () => {
    setIsRunning(true);
    
    try {
      const example = codeExamples.find(ex => ex.id === selectedExample);
      if (!example) return;

      if (example.language === 'javascript') {
        // Clear canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          
          // Create a safe execution environment
          const safeCode = currentCode.replace(/document\.getElementById\('canvas'\)/g, 'canvas');
          const func = new Function('canvas', safeCode);
          func(canvas);
        }
      } else if (example.language === 'css') {
        // Create HTML with CSS
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              ${currentCode}
            </style>
          </head>
          <body>
            <div class="shape-container">
              <div class="morphing-shape"></div>
            </div>
          </body>
          </html>
        `;
        
        if (outputRef.current) {
          const blob = new Blob([htmlContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          outputRef.current.src = url;
        }
      }
      
      setOutput('Code executed successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`Error: ${errorMessage}`);
    }
    
    setTimeout(() => setIsRunning(false), 1000);
  };

  const resetCode = () => {
    const example = codeExamples.find(ex => ex.id === selectedExample);
    if (example) {
      setCurrentCode(example.code);
      setOutput('');
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setOutput('Code copied to clipboard!');
  };

  const currentExample = codeExamples.find(ex => ex.id === selectedExample);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-6 w-6" />
                Live Code Playground
              </CardTitle>
              <Badge variant="secondary" className="text-purple-800">
                Interactive
              </Badge>
            </div>
            <p className="text-purple-100">
              Experiment with real code examples showcasing advanced web development techniques
            </p>
          </CardHeader>

          <CardContent className="p-0">
            <div className="border-b p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <Select value={selectedExample} onValueChange={setSelectedExample}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select an example" />
                  </SelectTrigger>
                  <SelectContent>
                    {codeExamples.map(example => (
                      <SelectItem key={example.id} value={example.id}>
                        <div className="flex items-center gap-2">
                          {example.category === 'visualization' && <Palette className="h-4 w-4" />}
                          {example.category === 'animation' && <Zap className="h-4 w-4" />}
                          {example.category === 'interaction' && <Sparkles className="h-4 w-4" />}
                          {example.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Button onClick={runCode} disabled={isRunning} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    {isRunning ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button variant="outline" onClick={resetCode}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={copyCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {currentExample && (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">{currentExample.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{currentExample.language}</Badge>
                    <Badge variant="outline">{currentExample.category}</Badge>
                  </div>
                </div>
              )}
            </div>

            <div className="grid lg:grid-cols-2 gap-0 min-h-[400px]">
              {/* Code Editor */}
              <div className="border-r">
                <div className="bg-muted p-2 border-b">
                  <h3 className="text-sm font-medium">Code Editor</h3>
                </div>
                <div className="p-4">
                  <textarea
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    className="w-full h-80 font-mono text-sm bg-black text-green-400 p-4 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Output */}
              <div>
                <div className="bg-muted p-2 border-b">
                  <h3 className="text-sm font-medium">Live Output</h3>
                </div>
                <div className="p-4 bg-black">
                  {currentExample?.language === 'javascript' ? (
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={300}
                      className="border border-gray-700 w-full max-w-[400px]"
                      style={{ background: '#000' }}
                    />
                  ) : (
                    <iframe
                      ref={outputRef}
                      className="w-full h-80 border border-gray-700"
                      title="CSS Output"
                    />
                  )}
                  {output && (
                    <div className="mt-4 p-2 bg-gray-900 text-green-400 font-mono text-sm rounded">
                      {output}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}