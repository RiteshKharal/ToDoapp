"use client";

import React, { ReactNode } from "react";
import { useSettings } from "./hooks/useSettings";
import * as fonts from "@/app/font/fonts";
import Accmanager from "@/app/(main)/components/AccManager";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function MainLayoutContainer({
	children,
}: {
	children: ReactNode;
}) {
	const { settings, setSettings } = useSettings();
	const router = useRouter();

	return (
		<main
			className={`w-full transition-all duration-300 ease-out ${settings?.appearance.width === "medium" ? "max-w-3xl" : "max-w-6xl"}`}
		>
			<nav className="top-10 flex justify-between animate-[StretchIn_0.2s_ease-in] py-5">
				<div className={`text-xl ${fonts.lilitaOne.className} `}>Tudor</div>

				<div>
					<div className="flex flex-row gap-5 text-center justify-center ">
						<Accmanager cardtype="signup" />

						<div>
							<button
								onClick={() => {
									router.push("/settings");
								}}
							>
								<IoSettings
									cursor="pointer"
									className=" text-xl hover:animate-[Rotate180_1s_infinite] "
								/>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{children}
		</main>
	);
}
