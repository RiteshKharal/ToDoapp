import Image from "next/image";
import { ThemeToggle } from "./settings/components/ThemeToggle";
import * as fonts from "../font/fonts";
import Settings from "./components/Settings";
import Accmanager from "./components/accmanager";
import TaskManager, { UserTasks } from "../../server/TaskManager";
import { Task } from "./components/Task";
import { IoSettings } from "react-icons/io5";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<div className="flex items-center justify-center  font-sans w-full">
			<main className="flex flex-col items-center justify-between p-10 sm:items-start w-full">
				<section className="mt-[5%] w-full">
					<Task />
				</section>
			</main>
		</div>
	);
}
