"use client";

import { useSettings } from "@/app/hooks/useSettings";
import React from "react";

export function WidthOptions() {
	const { settings, setSettings } = useSettings();

	const options: { title: string; onClick: () => void }[] = [
		// { title: "Small", onClick: () => {} },
		{
			title: "Medium",
			onClick: () => {
				// setSettings((prev) => ({
				// 	...prev,
				// 	appearance: {
				// 		width: "medium",
				// 	},
				// }));
			},
		},
		{ title: "Max", onClick: () => {} },
	];

	return (
		<div className="flex items-center gap-5">
			{options.map((option, i) => (
				<div
					key={i}
					onClick={() => {
						option.onClick();
					}}
					className="p-3 bg-card rounded-2xl px-6 hover:bg-card/80 cursor-pointer"
				>
					{option.title}
				</div>
			))}
		</div>
	);
}
