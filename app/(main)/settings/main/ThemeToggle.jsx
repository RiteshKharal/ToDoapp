// Temporary button, add color choosings later on

"use client";

import { useSettings } from "@/app/hooks/useSettings";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const { settings, setSettings } = useSettings();

	useEffect(() => {
		if (!mounted) return;

		setSettings({
			appearance: {
				theme: resolvedTheme,
			},
		});
	}, [resolvedTheme]);

	// eslint-disable-next-line react-hooks/set-state-in-effect
	useEffect(() => setMounted(true), []);
	if (!mounted) return;

	return (
		<div className="flex gap-5">
			{[
				{ name: "light", color: "hsla(0, 0%, 98%, 1)" },
				{ name: "dark", color: "hsla(0, 0%, 10%, 1)" },
				{ name: "blue", color: "hsla(225, 75%, 50%, 1)" },
				{ name: "red", color: "hsla(0, 75%, 60%, 1)" },
			].map((theme, i) => (
				<button
					key={i}
					className={`w-10 h-10 rounded-full border border-border cursor-pointer transition-transform transform hover:scale-110`}
					style={{ backgroundColor: theme.color }}
					onClick={() => {
						setTheme(theme.name);
					}}
				></button>
			))}

			{/* <button
				className="ColorThemeCard bg-black"
				onClick={() => {
					setTheme("dark");
				}}
			></button>

			<button
				className="ColorThemeCard bg-blue-900"
				onClick={() => {
					setTheme("blue");
				}}
			>
				{" "}
			</button>

			<button
				className="ColorThemeCard bg-red-900"
				onClick={() => {
					setTheme("red");
				}}
			>
				{" "}
			</button> */}
		</div>
	);
}
