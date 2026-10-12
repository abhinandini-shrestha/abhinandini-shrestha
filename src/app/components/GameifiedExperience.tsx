import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Star, Zap, Code, Target, Brain, 
  Award, Users, Coffee, GitBranch, Sparkles, Lock 
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  category: 'exploration' | 'interaction' | 'skills' | 'projects' | 'hidden';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'code' | 'quiz' | 'exploration' | 'interaction';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

interface UserStats {
  level: number;
  experience: number;
  nextLevelXP: number;
  totalPoints: number;
  achievementsUnlocked: number;
  challengesCompleted: number;
  timeSpent: number;
  sectionsVisited: Set<string>;
}

export function GameifiedExperience() {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    experience: 0,
    nextLevelXP: 100,
    totalPoints: 0,
    achievementsUnlocked: 0,
    challengesCompleted: 0,
    timeSpent: 0,
    sectionsVisited: new Set()
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-visit',
      title: 'Welcome Explorer',
      description: 'Visited the portfolio for the first time',
      icon: Trophy,
      unlocked: true,
      unlockedAt: new Date(),
      rarity: 'common',
      points: 10,
      category: 'exploration'
    },
    {
      id: 'terminal-user',
      title: 'Command Line Hero',
      description: 'Used the interactive terminal',
      icon: Code,
      unlocked: false,
      rarity: 'rare',
      points: 25,
      category: 'interaction'
    },
    {
      id: 'code-runner',
      title: 'Code Executor',
      description: 'Ran code in the live playground',
      icon: Zap,
      unlocked: false,
      rarity: 'rare',
      points: 30,
      category: 'interaction'
    },
    {
      id: 'ai-chat',
      title: 'AI Conversationalist',
      description: 'Had a conversation with the AI assistant',
      icon: Brain,
      unlocked: false,
      rarity: 'common',
      points: 15,
      category: 'interaction'
    },
    {
      id: 'section-explorer',
      title: 'Portfolio Navigator',
      description: 'Visited all main sections',
      icon: Target,
      unlocked: false,
      rarity: 'epic',
      points: 50,
      category: 'exploration'
    },
    {
      id: 'night-owl',
      title: 'Night Owl',
      description: 'Used dark mode',
      icon: Coffee,
      unlocked: false,
      rarity: 'common',
      points: 5,
      category: 'interaction'
    },
    {
      id: 'speed-demon',
      title: 'Speed Demon',
      description: 'Spent less than 5 seconds on each section',
      icon: Sparkles,
      unlocked: false,
      rarity: 'legendary',
      points: 100,
      category: 'hidden'
    },
    {
      id: 'github-stalker',
      title: 'GitHub Stalker',
      description: 'Explored GitHub stats thoroughly',
      icon: GitBranch,
      unlocked: false,
      rarity: 'rare',
      points: 25,
      category: 'exploration'
    }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'find-easter-eggs',
      title: 'Easter Egg Hunter',
      description: 'Find 3 hidden easter eggs in the portfolio',
      type: 'exploration',
      difficulty: 'medium',
      points: 40,
      completed: false,
      progress: 0,
      maxProgress: 3
    },
    {
      id: 'terminal-commands',
      title: 'Terminal Master',
      description: 'Execute 5 different terminal commands',
      type: 'interaction',
      difficulty: 'easy',
      points: 20,
      completed: false,
      progress: 0,
      maxProgress: 5
    },
    {
      id: 'code-modification',
      title: 'Code Hacker',
      description: 'Modify and run code in the playground',
      type: 'code',
      difficulty: 'hard',
      points: 60,
      completed: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: 'skill-quiz',
      title: 'Tech Trivia',
      description: 'Answer tech questions correctly',
      type: 'quiz',
      difficulty: 'medium',
      points: 35,
      completed: false,
      progress: 0,
      maxProgress: 3
    }
  ]);

  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Calculate level from experience
  useEffect(() => {
    const newLevel = Math.floor(userStats.experience / 100) + 1;
    const nextLevelXP = newLevel * 100;
    
    if (newLevel > userStats.level) {
      setUserStats(prev => ({ ...prev, level: newLevel, nextLevelXP }));
    }
  }, [userStats.experience]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setUserStats(prev => ({ ...prev, timeSpent: prev.timeSpent + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === achievementId && !achievement.unlocked) {
        const updated = {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date()
        };
        
        setUserStats(prevStats => ({
          ...prevStats,
          experience: prevStats.experience + achievement.points,
          totalPoints: prevStats.totalPoints + achievement.points,
          achievementsUnlocked: prevStats.achievementsUnlocked + 1
        }));

        setShowAchievement(updated);
        setTimeout(() => setShowAchievement(null), 3000);

        return updated;
      }
      return achievement;
    }));
  };

  const updateChallenge = (challengeId: string, progressIncrement: number = 1) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId && !challenge.completed) {
        const newProgress = Math.min(challenge.progress + progressIncrement, challenge.maxProgress);
        const completed = newProgress >= challenge.maxProgress;
        
        if (completed && !challenge.completed) {
          setUserStats(prevStats => ({
            ...prevStats,
            experience: prevStats.experience + challenge.points,
            totalPoints: prevStats.totalPoints + challenge.points,
            challengesCompleted: prevStats.challengesCompleted + 1
          }));
        }

        return {
          ...challenge,
          progress: newProgress,
          completed
        };
      }
      return challenge;
    }));
  };

  // Simulate interactions for demo
  const simulateTerminalUse = () => {
    unlockAchievement('terminal-user');
    updateChallenge('terminal-commands');
  };

  const simulateCodeRun = () => {
    unlockAchievement('code-runner');
    updateChallenge('code-modification');
  };

  const simulateAIChat = () => {
    unlockAchievement('ai-chat');
  };

  const simulateThemeToggle = () => {
    unlockAchievement('night-owl');
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-300';
      case 'rare': return 'text-blue-600 border-blue-300';
      case 'epic': return 'text-purple-600 border-purple-300';
      case 'legendary': return 'text-yellow-600 border-yellow-300';
    }
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Portfolio Game Center
              </CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="text-orange-800">
                  Level {userStats.level}
                </Badge>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>XP: {userStats.experience}</span>
                    <span>Next: {userStats.nextLevelXP}</span>
                  </div>
                  <Progress 
                    value={(userStats.experience % 100)} 
                    className="h-2 bg-orange-200"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="demo">Demo Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <div className="text-2xl font-bold">{userStats.level}</div>
                        <div className="text-sm text-muted-foreground">Level</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Star className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                        <div className="text-sm text-muted-foreground">Points</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                        <div className="text-2xl font-bold">{userStats.achievementsUnlocked}</div>
                        <div className="text-sm text-muted-foreground">Achievements</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
                        <div className="text-2xl font-bold">{userStats.challengesCompleted}</div>
                        <div className="text-sm text-muted-foreground">Challenges</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {achievements
                          .filter(a => a.unlocked)
                          .sort((a, b) => (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0))
                          .slice(0, 3)
                          .map(achievement => (
                            <div key={achievement.id} className="flex items-center gap-3 p-2 border rounded">
                              <achievement.icon className="h-5 w-5 text-yellow-500" />
                              <div className="flex-1">
                                <div className="font-medium">{achievement.title}</div>
                                <div className="text-sm text-muted-foreground">{achievement.description}</div>
                              </div>
                              <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                                {achievement.rarity}
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-4">
                  <div className="grid gap-3">
                    {achievements.map(achievement => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0.6 }}
                        animate={{ opacity: achievement.unlocked ? 1 : 0.6 }}
                        className={`p-4 border rounded-lg ${
                          achievement.unlocked ? 'bg-background' : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {achievement.unlocked ? (
                            <achievement.icon className="h-6 w-6 text-yellow-500" />
                          ) : (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{achievement.title}</span>
                              <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                                {achievement.rarity}
                              </Badge>
                              <Badge variant="secondary">
                                {achievement.points} pts
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            {achievement.unlocked && achievement.unlockedAt && (
                              <p className="text-xs text-green-600 mt-1">
                                Unlocked {achievement.unlockedAt.toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="challenges" className="space-y-4">
                  <div className="grid gap-4">
                    {challenges.map(challenge => (
                      <Card key={challenge.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{challenge.title}</h3>
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                              <Badge variant="outline">{challenge.difficulty}</Badge>
                              <Badge variant="secondary">{challenge.points} pts</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {challenge.description}
                          </p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{challenge.progress}/{challenge.maxProgress}</span>
                            </div>
                            <Progress 
                              value={(challenge.progress / challenge.maxProgress) * 100}
                              className="h-2"
                            />
                          </div>
                          {challenge.completed && (
                            <Badge className="mt-2 bg-green-500">Completed!</Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="demo" className="space-y-4">
                  <div className="text-center space-y-4">
                    <h3>Demo Achievement Unlocks</h3>
                    <p className="text-muted-foreground">
                      Click these buttons to simulate portfolio interactions and unlock achievements!
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Button onClick={simulateTerminalUse} variant="outline">
                        Use Terminal
                      </Button>
                      <Button onClick={simulateCodeRun} variant="outline">
                        Run Code
                      </Button>
                      <Button onClick={simulateAIChat} variant="outline">
                        Chat with AI
                      </Button>
                      <Button onClick={simulateThemeToggle} variant="outline">
                        Toggle Theme
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-20 right-4 z-50"
          >
            <Card className="w-80 border-yellow-300 bg-yellow-50 dark:bg-yellow-950">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <showAchievement.icon className="h-8 w-8 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-800 dark:text-yellow-200">
                      Achievement Unlocked!
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">
                      {showAchievement.title}
                    </div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">
                      +{showAchievement.points} points
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}