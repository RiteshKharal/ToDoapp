"use client";

import React, { useState, useEffect } from "react";
import * as fonts from "../../font/fonts";
import TaskManager, {
	DeleteTask,
	ToggleTaskRead,
	UserTasks,
} from "../../../server/TaskManager";

import { useSession } from "@/lib/auth-client";
import { NavigationDropDown } from "../components/DropDown";
import {
	LocalDeleteTask,
	LocalTaskManager,
	LocalToggleTaskRead,
	LocalUserTasks,
} from "../../../server/LocalTaskManager";
import { useSettings } from "@/app/hooks/useSettings";
import { TaskCard } from "../components/TaskCard";

type TasksType = {
	id: number;
	title: string;
	description: string | null;
	date: string;
	read: boolean;
};

export function Task() {
	const session = useSession();
	const user = session?.data?.user;
	const [tasks, setTasks] = useState<TasksType[] | null>(null);
	const [FormHidden, setFormHidden] = useState(false);
	const { settings, setSettings } = useSettings();

	useEffect(() => {
		UpdateTasks();

		if (!user) return;

		const run = async () => {
			UpdateTasks();

			const stored = localStorage.getItem("tasks");
			if (!stored) return;

			const LocalTasks = JSON.parse(stored);

			for (let i = 0; i < LocalTasks.length; i++) {
				const val = LocalTasks[i];
				if (!val.draft) continue;

				const formData = new FormData();

				Object.entries({
					TaskTitle: val.title,
					TaskDesc: val.description ?? "",
					TaskDueTime: val.date,
				}).forEach(([k, v]) => formData.append(k, String(v)));

				const result = await TaskManager(formData);

				if (result?.toLowerCase() === "success") {
					LocalTasks[i].draft = false;
				}
			}

			localStorage.setItem("tasks", JSON.stringify(LocalTasks));

			UpdateTasks();
		};

		run();
	}, [user]);

	async function UpdateTasks() {
		if (!user) {
			const t = LocalUserTasks;
			if (t) setTasks(t);
			return;
		}

		const t = await UserTasks();
		if (t) setTasks(t ?? null);
	}

	async function handleReadToggle(taskId: number) {
		if (!user) {
			LocalToggleTaskRead(taskId);

			UpdateTasks();

			return;
		}

		await ToggleTaskRead(taskId);
		UpdateTasks();
	}

	async function HandleDelete(TaskId: number) {
		if (!user) {
			LocalDeleteTask(TaskId);
			UpdateTasks();
			return;
		}
		await DeleteTask(TaskId);
		UpdateTasks();
	}

	return (
		<>
			<section
				className={`w-full mt-15 transition-[grid-template-rows] duration-400 ease-in-out min-h-0 grid ${FormHidden ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
			>
				<div className="min-h-0 overflow-hidden">
					<form
						className={`flex flex-col gap-5 transition-all duration-1000 `}
						action={async (formdata: FormData) => {
							if (!user) {
								const result = LocalTaskManager(formdata);
								if (result && result.toLowerCase().includes("success")) {
									UpdateTasks();
								}

								return;
							}

							const result = await TaskManager(formdata);
							if (result && result.toLowerCase().includes("success")) {
								UpdateTasks();
							}
						}}
						noValidate
					>
						<input
							type="text"
							name="TaskTitle"
							placeholder="Task"
							className="p-2 border border-border rounded-sm"
							required
						/>

						{!settings.appearance.HideDescription && (
							<textarea
								name="TaskDesc"
								placeholder="Task Description"
								className="p-2 resize-none border border-border rounded-sm"
								rows={4}
							/>
						)}

						<div className="w-full flex justify-between items-center">
							<input
								type="date"
								name="TaskDueTime"
								placeholder="Task Due time"
								className="p-2 rounded-xl cursor-pointer accent-foreground"
								min={new Date().toISOString().split("T")[0]}
								defaultValue={new Date().toISOString().split("T")[0]}
							/>

							<section className="flex flex-row gap-4">
								<button
									className={`font-medium cursor-pointer hover:underline underline-offset-0 transition-all duration-600 ease-out hover:underline-offset-2 decoration-`}
									onClick={() => {
										setFormHidden(true);
									}}
								>
									Hide
								</button>

								<input
									type="submit"
									className={`p-3 bg-primary rounded-xl ${fonts.geistMono.className} text-background cursor-pointer hover:bg-primary/90`}
								/>
							</section>
						</div>
					</form>
				</div>
			</section>

			<section className="mt-[10%] w-full mb-[10%]">
				<h1 className={`text-2xl  mb-[2%] flex gap-4 text-center items-center`}>
					<span className={`${fonts.lilitaOne.className}`}>Tasks</span>

					<button
						className={`${FormHidden ? "visible" : "hidden"} flex text-center items-center`}
						onClick={() => {
							setFormHidden(false);
						}}
					>
						<span className="text-[13px] font-medium hover:underline hover:underline-offset-3">
							Add
						</span>
					</button>
				</h1>

				<section className="flex flex-col gap-5">
					{tasks &&
						tasks.map((task, i) => (
							<TaskCard
								key={i}
								id={task.id}
								title={task.title}
								desc={task.description}
								date={task.date}
								read={task.read}
								readToggle={() => handleReadToggle(task.id)}
								HandleDelete={() => {
									HandleDelete(task.id);
								}}
							/>
						))}
				</section>
			</section>
		</>
	);
}
