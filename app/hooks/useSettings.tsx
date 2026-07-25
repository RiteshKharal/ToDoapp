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
import { DeepPartial } from "@/logics/DeepPartial";

type SettingsContextType = {
	settings: SettingsType;
	// setSettings: Dispatch<SetStateAction<SettingsType>>;
	setSettings: (NewSettings: DeepPartial<SettingsType>) => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({
	initial,
	children,
}: {
	initial: SettingsType;
	children: React.ReactNode;
}) {
	const [settings, setSettingsState] = useState(initial);

	async function setSettings(NewSettings: DeepPartial<SettingsType>) {
		const merged = merge(settings, NewSettings) as SettingsType;

		setSettingsState(merged);

		const diffed = DeepDiff(DefaultSettings, merged);

		try {
			await UpdateSettings({ settings: diffed });
		} catch (er) {
			console.log("Could not update settings. ", er);
		}
	}

	return (
		<SettingsContext.Provider value={{ settings, setSettings }}>
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
