"use client";

import { useSettings } from "@/app/hooks/useSettings";
import React, { useEffect } from "react";
import SettingsButton from "../components/SettingsButton";

export function WidthOptions() {
	const { settings, setSettings } = useSettings();

	const options: { title: string; onClick: () => void }[] = [
		// { title: "Small", onClick: () => {} },
		{
			title: "Medium",
			onClick: () => {
				setSettings({
					appearance: {
						width: "medium",
					},
				});
			},
		},
		{
			title: "Max",
			onClick: () => {
				setSettings({
					appearance: {
						width: "max",
					},
				});
			},
		},
	];

	return (
		<div className="flex flex-wrap gap-5">
			{/* {options.map((option, i) => (
				<button
					key={i}
					onClick={option.onClick}
					className={`min-w-20 rounded-lg bg-card/75 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card/96 active:bg-card/90 ho cursor-pointer shadow-[0_0_12px] hover:shadow-[0_0_15px] border hover:border-border ${settings.appearance.width === option.title.toLowerCase() ? "border-2 border-border/86 shadow-primary/25" : "border border-border/70 shadow-card"}`}
				>
					{option.title}
				</button>
			))} */}

			{options.map((option, i) => (
				<SettingsButton
					key={i}
					onClick={() => {
						option.onClick();
					}}
					AddedClasses={`${settings.appearance.width === option.title.toLowerCase() ? "border-2 border-border/86 shadow-primary/25" : "border border-border/70 shadow-card"}`}
				>
					{option.title}
				</SettingsButton>
			))}
		</div>
	);
}
