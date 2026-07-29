"use client";

import React, { useEffect, useState } from "react";
import { NavigationDropDown } from "./DropDown";
import * as fonts from "@/app/font/fonts";
import { CheckCheck, Trash2, Trash2Icon } from "lucide-react";

export function TaskCard({
	id,
	title,
	desc,
	date,
	read,
	readToggle,
	HandleDelete,
}: {
	id: number;
	title: string;
	desc: string | null;
	date: string;
	read: boolean;
	readToggle: () => void;
	HandleDelete: () => void;
}) {
	const [checked, setChecked] = useState(read ?? false);
	const completed = checked;
	const hasDesc = Boolean(desc);

	useEffect(() => {
		setChecked(read ?? false);
	}, [read]);

	return (
		<button
			type="button"
			aria-pressed={checked}
			// title="Mark as Done"
			className={`
                    w-full rounded-2xl
                    min-h-20
                    transition-all duration-300 ease-out
                    border
                    active:scale-102
                    focus:outline-none cursor-pointer overflow-hidden
                    grid grid-cols-[1fr_56px]   
                    ${
											completed
												? "bg-primary/15 border-primary/10 hover:bg-primary/17"
												: "bg-foreground/5 border-foreground/7 hover:bg-foreground/10"
										}
                    `}
		>
			<div
				className={`relative flex flex-col  px-5 py-5 ${hasDesc ? "gap-3" : "items-center gap-2"}`}
				onClick={() => {
					readToggle();
				}}
			>
				<h3
					className={`
                        font-semibold tracking-tight
                        transition-all duration-300
                        ${completed ? "line-through text-foreground/40" : "text-foreground"}
                        ${hasDesc ? "text-lg" : "text-2xl"}
                        ${fonts.quicksand.className}
                    `}
				>
					{title}
				</h3>

				{hasDesc && (
					<p
						className={`
                            text-sm leading-relaxed
                            ${completed ? "line-through text-foreground/30" : "text-foreground/70"}
                            `}
					>
						{desc}
					</p>
				)}

				{/* <div
					className={`
                        absolute bottom-10 right-4
                        bg-primary/10 text-primary
                        px-3 py-1
                        rounded-full
                        text-xs font-semibold
                        ${completed ? "text-primary/50 bg-primary/20" : ""}
                    `}
					title={date}
				>
					{date}
				</div> */}

				{/* <div className="absolute top-6 left-4 cursor-pointer">
					<div
						className=""
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<NavigationDropDown
							TaskId={id}
							OnRead={() => {
								readToggle();
							}}
							OnDelete={() => {
								HandleDelete();
							}}
						/>
					</div>
				</div> */}
			</div>

			<section className="flex h-full flex-col border-l border-border/70 bg-background/30">
				<div
					onClick={(e) => {
						e.stopPropagation();
						HandleDelete();
					}}
					className="flex h-full items-center justify-center text-foreground/45 transition-colors hover:bg-red-500/8 hover:text-red-500"
					aria-label="Delete task"
				>
					<Trash2 size={18} />
				</div>

				{/* <div
					className={`
			flex h-1/2 items-center justify-center transition-colors
			${completed ? "text-primary" : "text-foreground/35"}
		`}
				>
					<CheckCheck size={18} />
				</div> */}
			</section>
		</button>
	);
}
