import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { InfoTooltip } from '@/app/dashboard/page';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cardData, householdData } from '@/lib/constants';

const Household = () => {
  return (
    <div className="h-full flex-col m">
      <div className="w-full flex px-2 space-x-3">
        {cardData?.map((data) => (
          <Card key={data.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {data.title}
                <InfoTooltip content={`${data.tooltip}`} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">{data.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent>
          <table className="min-w-full">
            <thead>
              <TableRow>
                <TableHead>
                  Household#
                </TableHead>
                <TableHead>
                  HH Head
                </TableHead>
                <TableHead className="text-right">
                  HH Location
                </TableHead>
                <TableHead className="text-right">
                  Country
                </TableHead>
                <TableHead className="text-right">
                  Region
                </TableHead>
                <TableHead className="text-right">
                  Sub Region
                </TableHead>
                <TableHead className="text-right">
                  Health Region
                </TableHead>
                <TableHead className="text-right">
                  Tribe
                </TableHead>
                <TableHead className="text-right">
                  team Number
                </TableHead>
                <TableHead className="text-right">
                  team Lead
                </TableHead>
                <TableHead className="text-right">
                  Subcounty
                </TableHead>
                <TableHead className="text-right">
                  Parish
                </TableHead>
                <TableHead className="text-right">
                  Village
                </TableHead>
                
              </TableRow>
            </thead>
            <tbody>
              {householdData.map((houses) => (
                <TableRow key={houses.number}>
                  <TableCell>{houses.number}</TableCell>
                  <TableCell>{houses.head}</TableCell>
                  <TableCell>{houses.country}</TableCell>
                  <TableCell>{houses.region}</TableCell>
                  <TableCell>{houses.subregion}</TableCell>
                  <TableCell>{houses.healthregion}</TableCell>
                  <TableCell>{houses.tribe}</TableCell>
                  <TableCell>{houses.teamnumber}</TableCell>
                  <TableCell>{houses.teamlead}</TableCell>
                  <TableCell>{houses.subcounty}</TableCell>
                  <TableCell>{houses.parish}</TableCell>
                  <TableCell>{houses.village}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Household;
