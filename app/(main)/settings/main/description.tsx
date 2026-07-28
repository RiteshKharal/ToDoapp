"use client";

import { useSettings } from "@/app/hooks/useSettings";
import React, { useEffect } from "react";
import SettingsButton from "../components/SettingsButton";

export function Description() {
	const { settings, setSettings } = useSettings();

	const options: { title: string; onClick: () => void }[] = [
		// { title: "Small", onClick: () => {} },
		{
			title: "on",
			onClick: () => {
				setSettings({
					appearance: {
						HideDescription: true,
					},
				});
			},
		},
		{
			title: "off",
			onClick: () => {
				setSettings({
					appearance: {
						HideDescription: false,
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
					AddedClasses={`${settings.appearance.HideDescription === (option.title.toLowerCase() === "on" ? true : false) ? "border-2 border-border/86 shadow-primary/25" : "border border-border/70 shadow-card"}`}
				>
					{option.title}
				</SettingsButton>
			))}
		</div>
	);
}
