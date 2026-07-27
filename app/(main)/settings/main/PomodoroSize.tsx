"use client";

import { useSettings } from "@/app/hooks/useSettings";
import React, { useEffect } from "react";
import SettingsButton from "../components/SettingsButton";

export function PomodoroSize() {
	const { settings, setSettings } = useSettings();

	const options: { title: string; onClick: () => void }[] = [
		// { title: "Small", onClick: () => {} },
		{
			title: "Medium",
			onClick: () => {
				setSettings({
					appearance: {
						PomodoroSize: "medium",
					},
				});
			},
		},
		{
			title: "Max",
			onClick: () => {
				setSettings({
					appearance: {
						PomodoroSize: "max",
					},
				});
			},
		},
	];

	return (
		<div className="flex flex-wrap gap-5">
			{options.map((option, i) => (
				<SettingsButton
					key={i}
					onClick={() => {
						option.onClick();
					}}
					AddedClasses={`${settings.appearance.PomodoroSize === option.title.toLowerCase() ? "border-2 border-border/86 shadow-primary/25" : "border border-border/70 shadow-card"}`}
				>
					{option.title}
				</SettingsButton>
			))}
		</div>
	);
}
