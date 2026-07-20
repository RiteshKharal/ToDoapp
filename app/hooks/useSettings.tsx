"use client";

import {
	createContext,
	useContext,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";
import { SettingsType } from "@/types/settings";
import merge from "deepmerge";
import { DefaultSettings } from "@/server/settings/default";
import { UpdateSettings } from "@/server/settings/actions";
import { DeepDiff } from "@/logics/DeepDiff";

type SettingsContextType = {
	settings: SettingsType;
	// setSettings: Dispatch<SetStateAction<SettingsType>>;
	updateSettings: (NewSettings: Partial<SettingsType>) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({
	initial,
	children,
}: {
	initial: SettingsType;
	children: React.ReactNode;
}) {
	const [settings, setSettings] = useState(initial);

	async function updateSettings(NewSettings: Partial<SettingsType>) {
		const merged = merge(settings, NewSettings);

		setSettings(merged);
		console.log(merged);

		const diffed = DeepDiff(DefaultSettings, merged);

		try {
			console.log("calling");
			await UpdateSettings({ settings: NewSettings });
			console.log("ended call");
		} catch (er) {
			console.log("Could not update settings. ", er);
		}
	}

	return (
		<SettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettings() {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error("useSettings must be used within a SettingsProvider");
	}

	return context;
}
