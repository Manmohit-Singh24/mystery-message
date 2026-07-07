import React from "react";

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex justify-center items-center min-h-screen ">
			<div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md">
				{children}
			</div>
		</div>
	);
}

export default layout;
