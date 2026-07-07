"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MailCheck } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordEmailSentPage({
	email = "user@example.com",
}: {
	email?: string;
}) {
	const handleOpenGmail = () => {
		window.open("https://mail.google.com", "_blank");
	};

	return (
		<div className="flex flex-col items-center p-8 text-center">
			{/* Icon / Graphic */}
			<div className="relative mb-6">
				<div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
					<MailCheck className="w-10 h-10 text-primary" />
				</div>
			</div>

			{/* Heading */}
			<h1 className="text-2xl font-bold mb-2">Check your inbox</h1>

			{/* Message */}
			<p className="text-sm text-muted-foreground mb-6">
				If an account exists for{" "}
				<span className="font-medium text-foreground">{email}</span>, you’ll
				shortly receive an email with steps to reset your password.
			</p>

			{/* Button */}
			<Button onClick={handleOpenGmail} className="w-full">
				Open Gmail
			</Button>
		</div>
	);
}
