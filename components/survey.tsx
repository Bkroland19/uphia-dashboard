import { cardData } from "@/lib/constants";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { InfoTooltip } from "@/app/dashboard/page";
import { Table } from "lucide-react";
import { TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import CustomTable from "./custom-components/CustomTable";

const Survey = () => {
	return (
		<>
			<div className="h-full flex-col">
				<div className="w-full flex px-2 space-x-3">
					{cardData?.map((data) => (
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									{data.title}
									<InfoTooltip
										content={`${data.tooltip}`}
									/>
								</CardTitle>
								{/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{data.value}
								</div>
								<p className="text-xs text-muted-foreground">
									{data.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				
						<CustomTable />
					
			</div>
		</>
	);
};

export default Survey;
