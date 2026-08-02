"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Pause, Play, RotateCcw } from "lucide-react";
import { useSettings } from "@/app/hooks/useSettings";

const InitialMODES = [
	{ key: "pomodoro", label: "Pomodoro", length: 30 * 60 },
	{ key: "short", label: "Short Break", length: 5 * 60 },
	{ key: "long", label: "Long Break", length: 15 * 60 },
] as const;

type ModeType = (typeof InitialMODES)[number];

function formatTime(seconds: number) {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function Pomodoro() {
	const [MODES] = useState(InitialMODES);
	const [CurrentMode, setCurrrentMode] = useState(0);
	const mode: ModeType = MODES[CurrentMode];

	const [ModeLength, setModeLength] = useState(mode.length);
	const [time, setTime] = useState(mode.length);
	const [running, setRunning] = useState(false);

	const { settings } = useSettings();
	const AudioRef = useRef<HTMLAudioElement>(null);
	const interval = useRef<number | null>(null);

	useEffect(() => {
		setModeLength(mode.length);
		setTime(mode.length);
		setRunning(false);
	}, [mode]);

	useEffect(() => {
		if (!AudioRef.current) return;

		AudioRef.current.volume = 1;

		if (running) {
			AudioRef.current.play().catch(() => {});
		} else {
			AudioRef.current.pause();
		}
	}, [running]);

	useEffect(() => {
		if (!running) return;

		interval.current = window.setInterval(() => {
			setTime((t) => {
				if (t <= 1) {
					setRunning(false);
					return ModeLength;
				}
				return t - 1;
			});
		}, 1000);

		return () => {
			if (interval.current) clearInterval(interval.current);
		};
	}, [running, ModeLength]);

	return (
		<div
			className={`flex justify-center transition-all duration-200 ease-out ${
				settings.appearance.PomodoroSize === "max" ? "scale-130" : "scale-115"
			} p-5 mt-10`}
		>
			{settings.appearance.PomodoroAudio && (
				<audio src="/BrownNoise.mp3" loop ref={AudioRef} />
			)}

			<div className="bg-card w-full max-w-md rounded-xl p-5 flex flex-col gap-5">
				<div className="mb-5 flex justify-center gap-2">
					{MODES.map((m, i) => (
						<button
							key={m.key}
							onClick={() => setCurrrentMode(i)}
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

				<div className="mb-6 text-center text-6xl font-semibold relative flex flex-col transition-all duration-1000 ease-in-out">
					<section
						className={`h-max text-center justify-between absolute space-y-4 flex flex-col ${
							running || time !== ModeLength ? "hidden" : ""
						}`}
					>
						<button
							className="text-primary/75 hover:text-primary cursor-pointer"
							onClick={() => {
								setModeLength((p) => p + 60);
								setTime((p) => p + 60);
							}}
						>
							<ChevronUp />
						</button>

						<button
							className={`${
								time - 60 <= 0
									? "text-muted-foreground/20"
									: "text-primary/80 hover:text-primary cursor-pointer"
							}`}
							onClick={() => {
								if (time - 60 <= 0) return;
								setModeLength((p) => p - 60);
								setTime((p) => p - 60);
							}}
						>
							<ChevronDown />
						</button>
					</section>

					{formatTime(time)}

					<section
						className={`h-max text-center justify-between absolute space-y-4 right-3 flex flex-col transition-all duration-1000 ease-out ${
							running || time !== ModeLength ? "hidden" : ""
						}`}
					>
						<button
							className={`${
								(time % 60) + 5 >= 60
									? "text-muted-foreground/20"
									: "text-primary/80 hover:text-primary cursor-pointer"
							}`}
							onClick={() => {
								if ((time % 60) + 5 >= 60) return;
								setModeLength((p) => p + 5);
								setTime((p) => p + 5);
							}}
						>
							<ChevronUp />
						</button>

						<button
							className={`${
								(time % 60) - 5 < 0
									? "text-muted-foreground/20"
									: "text-primary/80 hover:text-primary cursor-pointer"
							}`}
							onClick={() => {
								if ((time % 60) - 5 < 0) return;
								setModeLength((p) => p - 5);
								setTime((p) => p - 5);
							}}
						>
							<ChevronDown />
						</button>
					</section>
				</div>

				<div className="relative h-10">
					<div className="absolute left-1/2 -translate-x-1/2">
						<button
							onClick={() => setRunning((v) => !v)}
							className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-5 py-2 cursor-pointer"
						>
							{running ? <Pause size={18} /> : <Play size={18} />}
							{running ? "Pause" : "Start"}
						</button>
					</div>

					<div
						className={`absolute left-1/2 ml-20 transition-all duration-100 ${
							time !== ModeLength
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-5 pointer-events-none"
						}`}
					>
						<button
							onClick={() => {
								setRunning(false);
								setTime(ModeLength);
							}}
							className="hover:bg-muted rounded-lg transition-colors duration-700 ease-in-out cursor-pointer p-2"
						>
							<RotateCcw size={18} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
