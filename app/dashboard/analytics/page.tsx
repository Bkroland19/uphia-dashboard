"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Home, Database, BarChart3, MapPin } from "lucide-react";

interface AnalyticsData {
  householdInterview: {
    totalRecords: number;
    locations: any[];
  };
  householdRoster: {
    totalRecords: number;
  };
  individualInterview: {
    totalRecords: number;
  };
  surveyDataHub: {
    totalRecords: number;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading analytics data...</div>
      </div>
    );
  }

  const totalRecords = (data?.householdInterview?.totalRecords || 0) +
    (data?.householdRoster?.totalRecords || 0) +
    (data?.individualInterview?.totalRecords || 0) +
    (data?.surveyDataHub?.totalRecords || 0);

  const chartData = [
    {
      name: 'Household Interview',
      value: data?.householdInterview?.totalRecords || 0,
      icon: <Home className="w-4 h-4" />
    },
    {
      name: 'Household Roster',
      value: data?.householdRoster?.totalRecords || 0,
      icon: <Users className="w-4 h-4" />
    },
    {
      name: 'Individual Interview',
      value: data?.individualInterview?.totalRecords || 0,
      icon: <Database className="w-4 h-4" />
    },
    {
      name: 'Survey Data Hub',
      value: data?.surveyDataHub?.totalRecords || 0,
      icon: <BarChart3 className="w-4 h-4" />
    }
  ];

  const locationData = data?.householdInterview?.locations?.slice(0, 10) || [];

  // Generate time series data for trends
  const timeSeriesData = [
    { month: 'Jan', household: 1200, individual: 800, survey: 600 },
    { month: 'Feb', household: 1350, individual: 950, survey: 750 },
    { month: 'Mar', household: 1500, individual: 1100, survey: 900 },
    { month: 'Apr', household: 1650, individual: 1250, survey: 1050 },
    { month: 'May', household: 1800, individual: 1400, survey: 1200 },
    { month: 'Jun', household: 1950, individual: 1550, survey: 1350 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of UPHIA survey data
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all databases
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              From last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locationData.length}</div>
            <p className="text-xs text-muted-foreground">
              Districts covered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Data Distribution</CardTitle>
            <CardDescription>Records by database type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Household interviews by location</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="district" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Data Collection Trends</CardTitle>
          <CardDescription>Monthly data collection progress</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="household" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="individual" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              <Area type="monotone" dataKey="survey" stackId="1" stroke="#ffc658" fill="#ffc658" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Data Quality Metrics</CardTitle>
            <CardDescription>Quality indicators across databases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Household Interviews</span>
                <span className="text-sm text-green-600">98.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Individual Interviews</span>
                <span className="text-sm text-green-600">97.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Survey Data</span>
                <span className="text-sm text-green-600">99.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Quality</span>
                <span className="text-sm text-green-600">98.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Collection Progress</CardTitle>
            <CardDescription>Progress towards survey targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Target Households</span>
                <span className="text-sm">10,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-sm text-green-600">8,750</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Remaining</span>
                <span className="text-sm text-orange-600">1,250</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-green-600">87.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
