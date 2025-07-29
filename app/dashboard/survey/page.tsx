"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Search, Filter, Download, BarChart3 } from "lucide-react";

interface SurveyData {
  data: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function SurveyDataPage() {
  const [data, setData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    district: "",
    subcounty: "",
    page: 1,
    limit: 50
  });

  useEffect(() => {
    fetchSurveyData();
  }, [filters]);

  const fetchSurveyData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.district && { district: filters.district }),
        ...(filters.subcounty && { subcounty: filters.subcounty })
      });

      const response = await fetch(`/api/survey-data?${params}`);
      const surveyData = await response.json();
      setData(surveyData);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const exportData = () => {
    // Implementation for data export
    console.log('Exporting survey data...');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading survey data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Survey Data Hub</h1>
          <p className="text-muted-foreground">
            Comprehensive survey data from ug_surv_data_hub database
          </p>
        </div>
        <Button onClick={exportData} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.pagination?.total?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Survey records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Page</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.pagination?.page || 1} / {data?.pagination?.totalPages || 1}
            </div>
            <p className="text-xs text-muted-foreground">
              Showing {data?.data?.length || 0} records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Records per Page</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filters.limit}</div>
            <p className="text-xs text-muted-foreground">
              Page size
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter survey data by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="Enter district name"
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subcounty">Subcounty</Label>
              <Input
                id="subcounty"
                placeholder="Enter subcounty name"
                value={filters.subcounty}
                onChange={(e) => handleFilterChange('subcounty', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="limit">Records per Page</Label>
              <Select
                value={filters.limit.toString()}
                onValueChange={(value: string) => handleFilterChange('limit', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Data</CardTitle>
          <CardDescription>
            Detailed records from the survey data hub
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Subcounty</TableHead>
                  <TableHead>Parish</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Survey Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((record: any, index: number) => (
                  <TableRow key={record['surveydatahub_rec-id'] || index}>
                    <TableCell className="font-medium">
                      {record['surveydatahub_rec-id']}
                    </TableCell>
                    <TableCell>{record.district || record.hhi_district_code || 'N/A'}</TableCell>
                    <TableCell>{record.subcounty || record.hhi_subcounty_code || 'N/A'}</TableCell>
                    <TableCell>{record.parish || record.hhi_parish_code || 'N/A'}</TableCell>
                    <TableCell>{record.village || record.hhi_village_code || 'N/A'}</TableCell>
                    <TableCell>{record.survey_type || 'N/A'}</TableCell>
                    <TableCell>{record.status || 'N/A'}</TableCell>
                    <TableCell>{record.date || 'N/A'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {data?.pagination && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {((data.pagination.page - 1) * data.pagination.limit) + 1} to{' '}
                {Math.min(data.pagination.page * data.pagination.limit, data.pagination.total)} of{' '}
                {data.pagination.total} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(data.pagination.page - 1)}
                  disabled={data.pagination.page <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(data.pagination.page + 1)}
                  disabled={data.pagination.page >= data.pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}