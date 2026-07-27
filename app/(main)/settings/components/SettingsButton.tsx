import React, { ReactNode } from "react";

type SettingsButtonType = {
	children: ReactNode;
	AddedClasses?: string;
} & React.ComponentProps<"button">;

export default function SettingsButton({
	children,
	AddedClasses,
	...props
}: SettingsButtonType) {
	return (
		<button
			className={`min-w-20 rounded-lg bg-card/75 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card/96 active:bg-card/90 ho cursor-pointer shadow-[0_0_12px] hover:shadow-[0_0_15px] border hover:border-border ${AddedClasses}`}
			{...props}
		>
			{children}
		</button>
	);
}
