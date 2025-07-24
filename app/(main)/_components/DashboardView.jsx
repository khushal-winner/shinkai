"use client";
import {
  Brain,
  ChartColumnStacked,
  ChartPie,
  LineChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Nanum_Myeongjo } from "next/font/google";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const DashboardView = ({ insights }) => {
  console.log("insights", insights);
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getdemandLevelColor = (demandLevel) => {
    switch (demandLevel.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (marketOutlook) => {
    switch (marketOutlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const demandLevelColor = getdemandLevelColor(insights.demandLevel);
  console.log("insights.demandLevel", insights.demandLevel);
  console.log(
    "getdemandLevelColor(insights.demandLevel)",
    getdemandLevelColor(insights.demandLevel)
  );
  console.log(
    "insights.demandLevel.toLowerCase()",
    insights.demandLevel.toLowerCase()
  );
  console.log("demandLevelColor", demandLevelColor);

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdatedAt),
    { addSuffix: true }
  );
  return (
    <div className="space-y-5 mb-72 sm:mb-16 ">
      <div>
        <Badge variant="outline">Last Updated: {lastUpdatedDate}</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 h-full">
        <div className="h-full">
          <Card className="flex flex-col justify-between h-full ">
            <CardHeader className="flex justify-between items-center w-full">
              <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
                Market Outlook
              </CardTitle>
              <OutlookIcon
                className={`h-6 w-6 ${outlookColor} -translate-y-1.5 `}
              />
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="text-3xl font-bold">{insights.marketOutlook}</div>
              <div className="text-muted-foreground text-xs">
                Next Update {nextUpdateDistance}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-full">
          <Card className="flex flex-col justify-between h-full">
            <CardHeader className="flex justify-between items-center w-full">
              <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
                Industry Growth
              </CardTitle>
              <ChartPie className={`h-6 w-6 -translate-y-1.5 `} />
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="text-3xl font-bold">
                {insights.growthRate.toFixed(1)}%
              </div>
              <div className="text-muted-foreground text-xs">
                <Progress value={insights.growthRate} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-full">
          <Card className="flex flex-col justify-between h-full">
            <CardHeader className="flex justify-between items-center w-full">
              <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
                Demand Level
              </CardTitle>
              <ChartColumnStacked className={`h-6 w-6  -translate-y-1.5 `} />
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <div className="text-3xl font-bold">{insights.demandLevel}</div>
              <div className="text-muted-foreground text-xs">
                <Progress className={`${demandLevelColor} w-full`} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-full">
          <Card className="flex flex-col justify-between h-full">
            <CardHeader className="flex justify-between items-center w-full">
              <CardTitle className="flex w-full text-xl font-bold gradient-title gradient">
                Top Skills
              </CardTitle>
              <Brain className={`h-6 w-6 -translate-y-1.5 `} />
            </CardHeader>
            <CardContent className="flex w-full flex-wrap gap-2 ">
              {insights.topSkills.map((skill) => {
                return (
                  <Badge variant="secondary" key={skill}>
                    {skill}
                  </Badge>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="h-[600px]  p-10  border rounded-2xl space-y-4 ">
        <div>
          <h1 className="font-bold text-lg">Salary Ranges by Role</h1>
          <p className="text-muted-foreground">
            Display minimum, average, and maximum salary ranges (in thousands)
          </p>
        </div>

        <div className="h-[90%]">
          <ResponsiveContainer className="pb-10" width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border p-2 rounded-md shadow-md">
                        <p className="text-sm font-bold">{label}</p>
                        {payload.map((item, index) => (
                          <p key={index} className="text-xs">
                            {item.name}: ${item.value}K
                          </p>
                        ))}
                      </div>
                    );
                  }
                }}
              />
              <Legend />

              <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
              <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
              <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-20 h-fit">
          <div className="h-full">
            <Card className="flex flex-col justify-between h-full">
              <CardHeader className="flex justify-between items-center w-full">
                <CardTitle className="flex flex-col w-full">
                  <h2 className="font-bold text-lg">Key Industry Trends</h2>
                  <p className="text-muted-foreground text-sm">
                    Current trends shaping the industry
                  </p>
                </CardTitle>
                <Brain className={`h-6 w-6 -translate-y-1.5 `} />
              </CardHeader>
              <CardContent className="flex flex-col w-full gap-2 ">
                <ul className="space-y-2">
                  {insights.keyTrends.map((trend, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
                      <span>{trend}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="h-full">
            <Card className="flex flex-col h-full">
              <CardHeader className="flex justify-between items-center w-full">
                <CardTitle className="flex flex-col w-full">
                  <h2 className="font-bold text-lg">Recommended SKills</h2>
                  <p className="text-muted-foreground text-sm">
                    Skills to consider developing
                  </p>
                </CardTitle>
                <Brain className={`h-6 w-6 -translate-y-1.5 `} />
              </CardHeader>
              <CardContent className="flex flex-col w-full gap-2 ">
                <div>
                  {insights.recommendedSkills.map((trend, index) => (
                    <Badge variant="outline" className="space-y-2">
                      <span>{trend}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
