"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
			<Sidebar
				open={sidebarOpen}
				setOpen={setSidebarOpen}
			/>
			<div className="flex flex-1 flex-col overflow-hidden">
				<Header
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				/>
				<main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
					{children}
				</main>
			</div>
		</div>
	);
}
