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
			className={`
				inline-flex items-center justify-center gap-2
				min-h-10 min-w-20
				rounded-xl
				border border-border/60
				bg-card
				px-4 py-2.5
				text-sm font-medium text-foreground
				shadow-sm
				transition-all duration-200
				hover:-translate-y-0.5
				hover:border-border
				hover:bg-card/90
				hover:shadow-md
				active:translate-y-0
				active:scale-[0.98]
				disabled:pointer-events-none
				disabled:opacity-50
				focus-visible:outline-none
				focus-visible:ring-2
				focus-visible:ring-primary/40
				cursor-pointer
				${AddedClasses}
			`}
			{...props}
		>
			{children}
		</button>
	);
}
