export const appearance = {
	theme: "system" as "dark" | "light" | "red" | "blue" | "system",
	width: "medium" as "medium" | "max",
	PomodoroSize: "medium" as "medium" | "max",
	HideDescription: false as Boolean,
	PomodoroAudio: "brown" as null | "brown",
};

export type AppearanceType = typeof appearance;
