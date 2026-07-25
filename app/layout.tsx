import type { Metadata, Viewport } from "next";

import "./globals.css";
import { ThemeProviderWrapper } from "./providers/ThemeProvider";
import { ThemeToggle } from "./(main)/settings/components/ThemeToggle";
import * as fonts from "./font/fonts";
import "@/server/EmailVerefDel";
import { GetSettings } from "@/server/settings/actions";
import { SettingsProvider } from "./hooks/useSettings";
import { IoSettings } from "react-icons/io5";
import Accmanager from "./(main)/components/accmanager";
import MainLayoutContainer from "./MainLayoutContainer";

const description =
	"Customizable minimalist to-do app for focused task management and productivity with Next.js.";

export const metadata: Metadata = {
	metadataBase: new URL("https://tudortodo.vercel.app"),

	title: {
		default: "TudorTodo",
		template: "%s | TudorTodo",
	},

	description,

	keywords: [
		"TudorTodo",
		"to-do app",
		"task manager",
		"productivity",
		"minimalist",
		"customizable",
		"daily planner",
		"task tracking",
		"focus",
		"time management",
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"task organizer",
		"project management",
	],

	authors: [{ name: "RK | Red" }],
	creator: "RK | Red",
	publisher: "TudorTodo",

	applicationName: "TudorTodo",
	category: "productivity",
	classification: "Task Management",
	generator: "Next.js",
	referrer: "origin-when-cross-origin",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},

	alternates: {
		canonical: "/",
	},

	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},

	icons: {
		icon: "/TudorLogo.ico",
		shortcut: "/favicon.ico",
		apple: "/TudorLogo.png",
		other: [
			{
				rel: "icon",
				url: "/TudorLogo.png",
			},
		],
	},

	openGraph: {
		title: "TudorTodo",
		description:
			"Customizable minimalist task management for focused productivity.",
		url: "https://tudortodo.vercel.app",
		siteName: "TudorTodo",
		type: "website",
		locale: "en_US",
		images: [
			{
				url: "https://tudortodo.vercel.app/TudorLogo.png",
				width: 512,
				height: 512,
				alt: "TudorTodo Logo",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "TudorTodo",
		description:
			"Customizable minimalist task management for focused productivity.",
		creator: "@RiteshKharal",
		images: [
			{
				url: "https://tudortodo.vercel.app/TudorLogo.png",
				width: 512,
				height: 512,
				alt: "TudorTodo Logo",
			},
		],
	},
};

export const generateViewport = (): Viewport => ({
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	colorScheme: "light dark",
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const settings = await GetSettings({});
	console.log(settings);

	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`top-10 antialiased ${fonts.geistMono.className} bg-background/50  font-sans text-foreground w-full justify-center items-center flex flex-col`}
			>
				<ThemeProviderWrapper>
					<SettingsProvider initial={settings!}>
						{/* <main
							className={`w-full transition-[width] duration-200 ease-out ${settings?.appearance.width === "medium" ? "max-w-3xl" : "max-w-6xl"}`}
						>
							<nav className="top-10 flex justify-between animate-[StretchIn_0.2s_ease-in] py-5">
								<div className={`text-xl ${fonts.lilitaOne.className} `}>
									Tudor
								</div>

								<div>
									<div className="flex flex-row gap-5 text-center justify-center ">
										<Accmanager cardtype="signup" />

										<div>
											<a href="/settings">
												<IoSettings
													cursor="pointer"
													className=" text-xl hover:animate-[Rotate180_1s_infinite] "
												/>
											</a>
										</div>
									</div>
								</div>
							</nav>

							{children}
						</main> */}
						<MainLayoutContainer>{children}</MainLayoutContainer>
					</SettingsProvider>
				</ThemeProviderWrapper>
			</body>
		</html>
	);
}
