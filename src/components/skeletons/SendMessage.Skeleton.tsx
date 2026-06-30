import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function () {
	return (
		<>
			{/* Page Title */}
			<Skeleton className="h-8 w-64 mb-4" />

			<Card className="w-full gap-1">
				<CardHeader className="pb-3">
					{/* User Info */}
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						</div>
					</div>
					<Separator className="mt-4" />
				</CardHeader>

				<CardContent>
					{/* Textarea */}
					<div className="space-y-4">
						<div className="space-y-2">
							<Skeleton className="h-4 w-40" />
							<Skeleton className="h-[120px] w-full rounded-md" />
							<Skeleton className="h-3 w-16" />
						</div>

						<div className="flex flex-col sm:flex-row gap-5 sm:items-center justify-between mt-4">
							{/*Switches */}
							<div className="w-full space-y-4">
								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-9 rounded-full" />
									<Skeleton className="h-4 w-40" />
									<Skeleton className="h-4 w-4 rounded-full" />
								</div>

								<div className="flex items-center gap-2">
									<Skeleton className="h-5 w-9 rounded-full" />
									<Skeleton className="h-4 w-56" />
									<Skeleton className="h-4 w-4 rounded-full" />
								</div>
							</div>

							{/*Button */}
							<Skeleton className="h-10 w-32 rounded-md" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Separator className="mt-6" />

			{/* AI Generator */}
			<Card className="mt-6 border border-muted/40 gap-1">
				<CardHeader>
					<div className="flex items-center gap-2 text-lg font-semibold">
						<Skeleton className="h-5 w-5 rounded-full" />
						<Skeleton className="h-5 w-40 rounded-full" />
					</div>
				</CardHeader>
				<CardContent className="p-4 space-y-4">
					<Skeleton className="h-15 w-full rounded-md" />
					<div className="flex flex-col sm:flex-row justify-between gap-3">
						<Skeleton className="h-10 w-50 rounded-md" />
						<Skeleton className="h-10 w-50 sm:w-32 rounded-md" />
					</div>
				</CardContent>
			</Card>

			<Separator className="mt-6" />

			<Skeleton className=" mt-10 mx-auto h-10 w-80 text-md border-2 border-indigo-600/50 dark:border-indigo-400/30 text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white hover:bg-indigo-600 dark:hover:bg-indigo-600" />
		</>
	);
}
