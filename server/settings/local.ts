"use client";

import { SettingsType } from "@/types/settings";
import merge from "deepmerge";
import { DefaultSettings } from "./default";
import { DeepDiff } from "@/logics/DeepDiff";
import { DeepPartial } from "@/logics/DeepPartial";

export async function GetLocalSettings(): Promise<SettingsType> {
	const local = localStorage.getItem("settings");

	if (local) {
		const s = JSON.parse(local);
		const m = merge(DefaultSettings, local);

		if (typeof m === typeof DefaultSettings) {
			return m;
		}
	}

	return DefaultSettings;
}

export async function UpdateLocalSettings({
	settings,
}: {
	settings: DeepPartial<SettingsType>;
}) {
	const local = localStorage.getItem("settings");
	const LocalSaved = merge(
		DefaultSettings,
		local ? JSON.parse(local) : DefaultSettings,
	);

	console.log(LocalSaved);

	const updated = merge(DefaultSettings, settings) as SettingsType;

	const NewLocal = merge(LocalSaved, updated);
	const changes = DeepDiff(DefaultSettings, NewLocal);

	localStorage.setItem("settings", JSON.stringify(changes));

	return;
}
