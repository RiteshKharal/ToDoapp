import { Pomodoro } from "./MainComponents/pomodoro";
import { Task } from "./MainComponents/Task";
// export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<div className="flex items-center justify-center  font-sans w-full">
			<main className="flex flex-col items-center justify-between p-10 sm:items-start w-full gap-4">
				<section className="w-full">
					<Pomodoro />
				</section>

				<section className="w-full">
					<Task />
				</section>
			</main>
		</div>
	);
}
