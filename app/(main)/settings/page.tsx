"use client";

import React, { ReactNode, useEffect } from "react";
import * as fonts from "@/app/font/fonts";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ThemeToggle } from "./main/ThemeToggle";
import Accmanager from "@/app/(main)/components/AccManager";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSettings } from "../../hooks/useSettings";
import { WidthOptions } from "./main/width";
import { PomodoroSize } from "./main/PomodoroSize";
import { Description } from "./main/description";
import { AudioSetting } from "./main/audio";

export default function Settings() {
	const router = useRouter();
	const { settings, setSettings } = useSettings();

	const options: {
		SectionTitle: string;
		SectionSettings: { title: string; component: ReactNode }[];
	}[] = [
		{
			SectionTitle: "Appearance",
			SectionSettings: [
				{
					title: "Theme",
					component: <ThemeToggle />,
				},
				{
					title: "Width",
					component: <WidthOptions />,
				},
			],
		},
		{
			SectionTitle: "Pomodoro",
			SectionSettings: [
				{
					title: "Pomodoro size",
					component: <PomodoroSize />,
				},
				{
					title: "Pomodoro Audio",
					component: <AudioSetting />,
				},
			],
		},
		{
			SectionTitle: "Task",
			SectionSettings: [
				{
					title: "Hide Task description",
					component: <Description />,
				},
			],
		},
	];

	return (
		<div
			className={`min-h-screen flex flex-col ${fonts.inconsolata.className} transition-transform duration-200  overflow-hidden w-full`}
		>
			<div className="flex justify-center items-center ">
				<div className="w-full backdrop-blur-md rounded-2xl mt-8">
					<button
						className="flex items-center gap-2 mb-6 group transition-all mr-auto cursor-pointer "
						onClick={() => router.push("/")}
					>
						<IoIosArrowRoundBack
							size={22}
							className="group-hover:-translate-x-1 transition-all duration-100"
						/>
						Back
					</button>

					{options.map((opt, i) => (
						<div className="mt-10" key={i}>
							<h2 className="text-xl font-semibold tracking-tight mb-4">
								{opt.SectionTitle}
							</h2>

							<div className="flex flex-col gap-3 ml-2">
								{opt.SectionSettings.map((s, j) => (
									<div
										className="flex items-center justify-between py-3"
										key={j}
									>
										<span className="text-base font-medium text-foreground">
											{s.title}
										</span>

										{s.component}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
