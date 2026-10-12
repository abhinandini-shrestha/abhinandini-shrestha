import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Github, GitBranch, Star, Users, Calendar, TrendingUp } from 'lucide-react';

interface GitHubData {
  profile: {
    repos: number;
    followers: number;
    following: number;
    stars: number;
    commits: number;
  };
  languages: { name: string; percentage: number; color: string }[];
  activity: { day: string; contributions: number }[];
  topRepos: { name: string; stars: number; forks: number; language: string }[];
}

export function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in a real app, this would come from GitHub API
  useEffect(() => {
    const mockData: GitHubData = {
      profile: {
        repos: 28,
        followers: 156,
        following: 89,
        stars: 342,
        commits: 1247
      },
      languages: [
        { name: 'JavaScript', percentage: 35, color: '#f1e05a' },
        { name: 'TypeScript', percentage: 28, color: '#3178c6' },
        { name: 'Python', percentage: 18, color: '#3572A5' },
        { name: 'CSS', percentage: 12, color: '#563d7c' },
        { name: 'HTML', percentage: 7, color: '#e34c26' }
      ],
      activity: Array.from({ length: 365 }, (_, i) => ({
        day: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        contributions: Math.floor(Math.random() * 5)
      })),
      topRepos: [
        { name: 'e-commerce-platform', stars: 42, forks: 18, language: 'JavaScript' },
        { name: 'task-manager', stars: 38, forks: 12, language: 'TypeScript' },
        { name: 'weather-dashboard', stars: 25, forks: 8, language: 'Vue' },
        { name: 'devops-suite', stars: 15, forks: 5, language: 'Python' }
      ]
    };

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const totalContributions = data.activity.reduce((sum, day) => sum + day.contributions, 0);
  const averageContributions = Math.round(totalContributions / 365 * 10) / 10;

  const getContributionColor = (contributions: number) => {
    if (contributions === 0) return 'bg-muted';
    if (contributions <= 1) return 'bg-green-200';
    if (contributions <= 2) return 'bg-green-400';
    if (contributions <= 3) return 'bg-green-600';
    return 'bg-green-800';
  };

  return (
    <div className="space-y-6">
      {/* Profile Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Repositories', value: data.profile.repos, icon: Github },
          { label: 'Total Stars', value: data.profile.stars, icon: Star },
          { label: 'Followers', value: data.profile.followers, icon: Users },
          { label: 'Total Commits', value: data.profile.commits, icon: GitBranch },
          { label: 'Avg/Day', value: averageContributions, icon: TrendingUp }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-2xl">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Language Stats */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
                Most Used Languages
              </CardTitle>
              <CardDescription>Based on repository analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.languages.map((lang, index) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-sm">{lang.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <Progress value={lang.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Repositories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Top Repositories
              </CardTitle>
              <CardDescription>Most starred projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.topRepos.map((repo, index) => (
                <div key={repo.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">{repo.name}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {repo.forks}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {repo.language}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Contribution Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600" />
              Contribution Activity
            </CardTitle>
            <CardDescription>
              {totalContributions} contributions in the last year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-53 gap-1 overflow-x-auto">
                {data.activity.map((day, index) => (
                  <div
                    key={day.day}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(day.contributions)}`}
                    title={`${day.contributions} contributions on ${day.day}`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-muted rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}