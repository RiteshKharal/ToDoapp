"use server";

import { auth } from "@/lib/auth";
import { SettingsType } from "@/types/settings";
import merge from "deepmerge";
import { DefaultSettings } from "./default";
import { headers } from "next/headers";
import { DeepDiff } from "@/logics/DeepDiff";
import { prisma } from "@/lib/prisma";
import { DeepPartial } from "@/logics/DeepPartial";

export async function GetSettings({
	userId,
}: {
	userId?: string;
}): Promise<SettingsType> {
	let id = userId;

	if (!id) {
		try {
			const se = await auth.api.getSession({ headers: await headers() });
			id = se?.user.id;
		} catch (er) {
			console.error("Error fetching session. ", er);
			return DefaultSettings;
		}
	}

	if (!id) {
		return DefaultSettings;
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: { settings: true },
		});

		// if (!user) return;

		const stings = merge(
			DefaultSettings,
			(user?.settings?.data as Object) ?? {},
		);

		return stings;
	} catch (er) {
		console.error("Error getting the user. ", er);
		return DefaultSettings;
	}
}

export async function UpdateSettings({
	userId,
	settings,
}: {
	userId?: string;
	settings: DeepPartial<SettingsType>;
}) {
	let id = userId;

	if (!userId) {
		const session = await auth.api.getSession({ headers: await headers() });

		id = session?.user.id;
	}

	if (!id) {
		return;
	}

	try {
		const merged = (merge(DefaultSettings, settings) as SettingsType) ?? {};

		const NewSettings = DeepDiff(DefaultSettings, merged) ?? {};

		await prisma.settings.upsert({
			where: {
				userId: id,
			},
			create: {
				userId: id,
				data: NewSettings,
			},
			update: {
				data: NewSettings,
			},
		});
	} catch (er) {
		console.error("Couldnt update settings", er);
		return;
	}
}
