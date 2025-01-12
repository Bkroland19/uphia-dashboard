//import Household from '@/components/household'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Table } from 'lucide-react'
import React from 'react'
import { InfoTooltip } from '../page'
import { cardData, householdData } from '@/lib/constants'
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Household = () => {
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

export default Household