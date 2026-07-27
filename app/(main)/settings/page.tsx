"use client";

import React, { useEffect } from "react";
import * as fonts from "@/app/font/fonts";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ThemeToggle } from "./main/ThemeToggle";
import Accmanager from "@/app/(main)/components/AccManager";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSettings } from "../../hooks/useSettings";
import { WidthOptions } from "./main/width";
import { PomodoroSize } from "./main/PomodoroSize";

export default function Settings() {
	const router = useRouter();
	const { settings, setSettings } = useSettings();

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

					<div className="flex flex-col gap-6 mt-10">
						<div className="text-2xl">Appearance</div>

						<div className="flex flex-col gap-6 ml-5">
							<div className="flex items-center justify-between p-4 rounded-xl">
								<span className="text-lg font-medium">Theme</span>

								<ThemeToggle />
							</div>

							<div className="flex items-center justify-between p-4 rounded-xl">
								<span className="text-lg font-medium">Width</span>

								<WidthOptions />
							</div>

							<div className="flex items-center justify-between p-4 rounded-xl">
								<span className="text-lg font-medium">Pomodoro Size</span>

								<PomodoroSize />
							</div>

							{/* {[{ title: "Theme", component: ThemeToggle }].map((opt, i) => (
								<div
									className="flex items-center justify-evenly p-4 rounded-xl "
									key={i}
								>
									<span className="text-lg font-medium">{opt.title}</span>

									<opt.component />
								</div>
							))} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
