"use client";

import { useSettings } from "@/app/hooks/useSettings";
import React, { useEffect } from "react";
import SettingsButton from "../components/SettingsButton";

export function AudioSetting() {
	const { settings, setSettings } = useSettings();

	const options: {
		title: string;
		onClick: () => void;
		value: null | string;
	}[] = [
		// { title: "Small", onClick: () => {} },
		{
			title: "None",
			value: null,
			onClick: () => {
				setSettings({
					appearance: {
						PomodoroAudio: null,
					},
				});
			},
		},
		{
			title: "Brown Noise",
			value: "brown",
			onClick: () => {
				setSettings({
					appearance: {
						PomodoroAudio: "brown",
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
					AddedClasses={`${settings.appearance.PomodoroAudio === option.value ? "border-2 border-border/86 shadow-primary/25" : "border border-border/70 shadow-card"}`}
				>
					{option.title}
				</SettingsButton>
			))}
		</div>
	);
}
