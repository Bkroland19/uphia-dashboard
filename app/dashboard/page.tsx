import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users, HelpCircle } from 'lucide-react'
import HouseholdPage from "./household/page"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// import Household from "@/components/household"

const recentSales = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    amount: "$300",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    amount: "$150",
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    amount: "$450",
  },
  {
    name: "Diana Ross",
    email: "diana@example.com",
    amount: "$275",
  },
  {
    name: "Edward Norton",
    email: "edward@example.com",
    amount: "$550",
  },
]

const topProducts = [
  { name: "Product A", sales: 100, revenue: "$5000" },
  { name: "Product B", sales: 85, revenue: "$4250" },
  { name: "Product C", sales: 70, revenue: "$3500" },
  { name: "Product D", sales: 55, revenue: "$2750" },
  { name: "Product E", sales: 40, revenue: "$2000" },
]

export function InfoTooltip({ content }: { content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function OverviewPage() {
  return (
    // <TooltipProvider>
    //   <div className="space-y-6">
    //     <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
    //     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">
    //             Total Revenue
    //             <InfoTooltip content="Total revenue generated this month" />
    //           </CardTitle>
    //           <DollarSign className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">$45,231.89</div>
    //           <p className="text-xs text-muted-foreground">+20.1% from last month</p>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">
    //             Subscriptions
    //             <InfoTooltip content="Total active subscriptions" />
    //           </CardTitle>
    //           <Users className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">+2350</div>
    //           <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">
    //             Sales
    //             <InfoTooltip content="Total number of sales this month" />
    //           </CardTitle>
    //           <CreditCard className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">+12,234</div>
    //           <p className="text-xs text-muted-foreground">+19% from last month</p>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //           <CardTitle className="text-sm font-medium">
    //             Active Now
    //             <InfoTooltip content="Number of users currently active" />
    //           </CardTitle>
    //           <Activity className="h-4 w-4 text-muted-foreground" />
    //         </CardHeader>
    //         <CardContent>
    //           <div className="text-2xl font-bold">+573</div>
    //           <p className="text-xs text-muted-foreground">+201 since last hour</p>
    //         </CardContent>
    //       </Card>
    //     </div>
    //     <div className="grid gap-6 md:grid-cols-2">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Recent Sales</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <Table>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead>
    //                   Name
    //                   <InfoTooltip content="Customer's full name" />
    //                 </TableHead>
    //                 <TableHead>
    //                   Email
    //                   <InfoTooltip content="Customer's email address" />
    //                 </TableHead>
    //                 <TableHead className="text-right">
    //                   Amount
    //                   <InfoTooltip content="Total sale amount" />
    //                 </TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {recentSales.map((sale) => (
    //                 <TableRow key={sale.email}>
    //                   <TableCell>{sale.name}</TableCell>
    //                   <TableCell>{sale.email}</TableCell>
    //                   <TableCell className="text-right">{sale.amount}</TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </CardContent>
    //       </Card>
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Top Products</CardTitle>
    //         </CardHeader>
    //         <CardContent>
    //           <Table>
    //             <TableHeader>
    //               <TableRow>
    //                 <TableHead>
    //                   Product
    //                   <InfoTooltip content="Product name" />
    //                 </TableHead>
    //                 <TableHead>
    //                   Sales
    //                   <InfoTooltip content="Number of units sold" />
    //                 </TableHead>
    //                 <TableHead className="text-right">
    //                   Revenue
    //                   <InfoTooltip content="Total revenue generated" />
    //                 </TableHead>
    //               </TableRow>
    //             </TableHeader>
    //             <TableBody>
    //               {topProducts.map((product) => (
    //                 <TableRow key={product.name}>
    //                   <TableCell>{product.name}</TableCell>
    //                   <TableCell>{product.sales}</TableCell>
    //                   <TableCell className="text-right">{product.revenue}</TableCell>
    //                 </TableRow>
    //               ))}
    //             </TableBody>
    //           </Table>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   </div>
    // </TooltipProvider>
    <div>
      <HouseholdPage />
     
    </div>
  )
}

