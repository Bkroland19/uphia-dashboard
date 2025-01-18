import { cardData } from '@/lib/constants'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { InfoTooltip } from '@/app/dashboard/page'
import { Table } from 'lucide-react'
import { TableBody, TableHead, TableHeader, TableRow } from './ui/table'

const Survey = () => {
  return (
    <>
    <div className='h-full flex-col'>
    <div className='w-full flex px-2 space-x-3'>
      {cardData?.map((data)=>  <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {data.title}
                <InfoTooltip content={`${data.tooltip}`} />
              </CardTitle>
              {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.value}</div>
              <p className="text-xs text-muted-foreground">{data.description}</p>
            </CardContent>
          </Card>
        )
        }
    </div>
  
    <Card>
       <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Name
                      <InfoTooltip content="Customer's full name" />
                    </TableHead>
                    <TableHead>
                      Email
                      <InfoTooltip content="Customer's email address" />
                    </TableHead>
                    <TableHead className="text-right">
                      Amount
                      <InfoTooltip content="Total sale amount" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {householdData?.map((houses) => (
                    <TableRow key={houses.email}>
                      <TableCell>{houses.name}</TableCell>
                      <TableCell>{houses.email}</TableCell>
                      <TableCell className="text-right">{houses.amount}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
       </CardContent>
    </Card>
    </div>
     
    </>
  )
}

export default Survey