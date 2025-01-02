"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	BarChart2,
	Settings,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
	{ name: "Overview", href: "/dashboard", icon: LayoutDashboard },
	{ name: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
	{ name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
	const pathname = usePathname();

	return (
		<TooltipProvider>
			<div
				className={cn(
					"flex h-full flex-col border-r bg-white transition-all duration-300 ease-in-out dark:bg-gray-800",
					open ? "w-64" : "w-16"
				)}
			>
				<div className="flex h-14 items-center justify-between border-b px-3 py-4">
					<h1
						className={cn(
							"text-lg font-semibold",
							!open && "hidden"
						)}
					>
						Dashboard
					</h1>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setOpen(!open)}
						className="h-8 w-8"
					>
						{open ? (
							<ChevronLeft className="h-4 w-4" />
						) : (
							<ChevronRight className="h-4 w-4" />
						)}
					</Button>
				</div>
				<ScrollArea className="flex-1 py-2">
					<nav className="space-y-1 px-2">
						{navItems.map((item) => (
							<Tooltip
								key={item.href}
								delayDuration={0}
							>
								<TooltipTrigger asChild>
									<Link href={item.href}>
										<Button
											variant="ghost"
											className={cn(
												"w-full justify-start",
												pathname ===
													item.href
													? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
													: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100",
												!open &&
													"justify-center"
											)}
										>
											<item.icon className="h-5 w-5" />
											{open && (
												<span className="ml-3">
													{item.name}
												</span>
											)}
										</Button>
									</Link>
								</TooltipTrigger>
								<TooltipContent
									side="right"
									sideOffset={10}
								>
									<p>{item.name}</p>
								</TooltipContent>
							</Tooltip>
						))}
					</nav>
				</ScrollArea>
			</div>
		</TooltipProvider>
	);
}
