"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

const MODES = [
	{ key: "pomodoro", label: "Pomodoro", length: 30 * 60 },
	{ key: "short", label: "Short Break", length: 5 * 60 },
	{ key: "long", label: "Long Break", length: 15 * 60 },
];

type Mode = (typeof MODES)[number];

function formatTime(seconds: number) {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Pomodoro() {
	const [mode, setMode] = useState<Mode>(MODES[0]);
	const [time, setTime] = useState(mode.length);
	const [running, setRunning] = useState(false);

	const interval = useRef<number | null>(null);

	useEffect(() => {
		setTime(mode.length);
		setRunning(false);
	}, [mode]);

	useEffect(() => {
		if (!running) return;

		interval.current = window.setInterval(() => {
			setTime((t) => {
				if (t <= 1) {
					setRunning(false);
					// setMode(MODES)

					return mode.length;
				}
				return t - 1;
			});
		}, 1000);

		return () => {
			if (interval.current) clearInterval(interval.current);
		};
	}, [running, mode]);

	return (
		<div className="flex justify-center transition-all duration-200 ease-out">
			<div className="bg-card w-full max-w-md rounded-xl p-5 flex flex-col gap-5">
				<div className="mb-5 flex justify-center gap-2">
					{MODES.map((m) => (
						<button
							key={m.key}
							onClick={() => setMode(m)}
							className={`rounded-md px-3 py-1.5 text-sm transition ${
								mode.key === m.key
									? "bg-primary text-primary-foreground"
									: "hover:bg-muted"
							}`}
						>
							{m.label}
						</button>
					))}
				</div>

				<div className="mb-6 text-center text-6xl font-semibold">
					{formatTime(time)}
				</div>

				<div className="flex justify-center gap-3 transition-all duration-200 ease-out">
					<button
						onClick={() => setRunning((v) => !v)}
						className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-5 py-2"
					>
						{running ? <Pause size={18} /> : <Play size={18} />}
						{running ? "Pause" : "Start"}
					</button>

					<button
						onClick={() => {
							setRunning(false);
							setTime(mode.length);
						}}
						className={`bg-muted hover:bg-muted/80 rounded-lg p-2 transition duration-200 ease-in-out ${time < mode.length ? "visible" : "opacity-1 -translate-x-5"}`}
					>
						<RotateCcw size={18} />
					</button>
				</div>
			</div>
		</div>
	);
}
