import React from "react";

function layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="mx-auto p-6 bg-background rounded w-full max-w-6xl">
			{children}
		</div>
	);
}

export default layout;
