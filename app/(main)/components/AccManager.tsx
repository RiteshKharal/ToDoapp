"use client";
import React, { useState, useEffect, ReactElement } from "react";
import * as fonts from "@/app/font/fonts";
import { MdAccountCircle } from "react-icons/md";
import { redirect, useRouter } from "next/navigation";
import { signIn, signUp, useSession } from "../../../lib/auth-client";
import { Loader, X, Check, Form } from "lucide-react";
import { EmailVerefCard } from "./EmailVerefCard";
import { ValidateFormData } from "@/logics/validator";

type AccManagerProps = {
	cardtype: string;
};

type AuthError = {
	code?: string;
	message?: string;
	status: number;
	statusText: string;
};

export default function Accmanager({ cardtype }: AccManagerProps) {
	const router = useRouter();
	const { data: user, isPending } = useSession();
	const [AuthMode, setAuthMode] = useState<"signup" | "login" | null>(null);
	const [FormError, setFormError] = useState<null | string>();
	const [loading, setLoading] = useState<boolean>(false);
	const [EmailVeref, setEmailVeref] = useState<string | null>(null);

	async function HandleSignSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(false);
		setFormError(null);
		const formdata = new FormData(event.currentTarget);
		const ValidatedData = ValidateFormData(formdata, (msg) => {
			setFormError(msg);
		});
		setLoading(true);

		if (
			!ValidatedData?.get("name") ||
			!ValidatedData?.get("password") ||
			!ValidatedData?.get("email")
		) {
			FormError ?? setFormError("Missing valid Info");
			setLoading(false);
			return;
		}

		const name = ValidatedData.get("name")?.toString() ?? "";
		const email = ValidatedData.get("email")?.toString() ?? "";
		const password = ValidatedData.get("password")?.toString() ?? "";

		const { data, error } = await signUp.email({
			name: name,
			email: email,
			password: password,
		});

		if (error) {
			setFormError(error.message || "Something went wrong!");
			setLoading(false);
			return;
		}

		if (data) {
			setAuthMode(null);
			setFormError(null);
			setLoading(false);
			setEmailVeref(email);
			router.push("/");
		}
	}

	async function HandleLogSubmit(event: React.FormEvent<HTMLFormElement>) {
		setLoading(true);
		setFormError(null);
		event.preventDefault();
		const formdata = new FormData(event.currentTarget);
		const ValidatedData = ValidateFormData(
			formdata,
			(msg) => {
				setFormError(msg);
			},
			true,
		);

		if (!ValidatedData?.get("password") || !ValidatedData?.get("email")) {
			setFormError("Missing valid Info");
			setLoading(false);
			return;
		}

		const email = ValidatedData.get("email")?.toString() ?? "";
		const password = ValidatedData.get("password")?.toString() ?? "";

		const { data, error } = await signIn.email({
			email: email,
			password: password,
		});

		if (error) setFormError(error.message || "Something went wrong!");
		setLoading(false);

		if (data) {
			setAuthMode(null);
			setLoading(false);
			setFormError(null);
			router.push("/");
		}
	}

	function Login({ close }: { close: () => void }) {
		return (
			<div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-10 text-primary shadow-sm transition-all duration-100 ease-out">
				<button
					onClick={close}
					className="absolute left-6 top-6 rounded-full p-2 text-foreground/70 transition hover:bg-secondary hover:text-foreground cursor-pointer"
				>
					<X size={20} />
				</button>

				<div className="mb-8 text-center">
					<h2 className="text-3xl font-semibold text-foreground">
						Welcome back
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Log in to continue to your account
					</p>
				</div>

				<form onSubmit={HandleLogSubmit} className="space-y-5">
					<div className="space-y-2 flex flex-col">
						<label className="text-sm font-medium text-foreground flex flex-col text-left">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							required
							className={`h-13 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-2 ${
								FormError ? "focus:ring-primary/20" : "focus:ring-primary/10"
							}`}
						/>
					</div>

					<div className="space-y-2 flex flex-col">
						<label className="text-sm font-medium text-foreground text-left">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Enter your password"
							required
							className="h-13 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
						/>

						{FormError && (
							<span
								className={`block text-sm text-red-500 ${fonts.workSans.className} animate-[FlowIn_0.3s_ease_forwards]`}
							>
								{FormError}
							</span>
						)}
					</div>

					<button
						type="submit"
						className="mt-4 flex h-13 w-full items-center justify-center rounded-xl bg-primary text-base font-medium text-primary-foreground transition hover:bg-primary/90 cursor-pointer"
					>
						{loading ? <Loader className="h-5 w-5 animate-spin" /> : "Log in"}
					</button>
				</form>

				<div className="mt-8 border-t border-border pt-6 text-center">
					<p className="text-sm text-muted-foreground">
						Don't have an account?{" "}
						<button
							onClick={() => {
								setAuthMode("signup");
								setFormError(null);
							}}
							className="font-medium text-primary hover:underline cursor-pointer"
						>
							Create one
						</button>
					</p>
				</div>
			</div>
		);
	}

	function Signup({ close }: { close: () => void }) {
		return (
			<div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-10 text-primary shadow-sm">
				<button
					onClick={close}
					className="absolute left-6 top-6 rounded-full p-2 text-foreground/70 transition hover:bg-secondary hover:text-foreground cursor-pointer"
				>
					<X size={20} />
				</button>

				<div className="mb-8 text-center">
					<h2 className="text-3xl font-semibold text-foreground">
						Create account
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						Create an account to continue
					</p>
				</div>

				<form onSubmit={HandleSignSubmit} className="space-y-5">
					<div className="space-y-2 flex flex-col">
						<label className="text-sm font-medium text-foreground text-left ">
							Username
						</label>
						<input
							type="text"
							name="name"
							placeholder="Enter your username"
							className="h-13 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
						/>
					</div>

					<div className="space-y-2 flex flex-col">
						<label className="text-sm font-medium text-foreground text-left">
							Email
						</label>
						<input
							type="email"
							name="email"
							placeholder="Enter your email"
							className="h-13 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
						/>
					</div>

					<div className="space-y-2 flex flex-col">
						<label className="text-sm font-medium text-foreground text-left">
							Password
						</label>
						<input
							type="password"
							name="password"
							placeholder="Create a password"
							className="h-13 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
						/>

						{FormError && (
							<span
								className={`block text-sm text-red-500 ${fonts.workSans.className} animate-[FlowIn_0.3s_ease_forwards]`}
							>
								{FormError}
							</span>
						)}
					</div>

					<button
						type="submit"
						className="mt-4 flex h-13 w-full items-center justify-center rounded-xl bg-primary text-base font-medium text-primary-foreground transition hover:bg-primary/90 cursor-pointer"
					>
						{loading ? (
							<Loader className="h-5 w-5 animate-spin" />
						) : (
							"Create account"
						)}
					</button>
				</form>

				<div className="mt-8 border-t border-border pt-6 text-center">
					<p className="text-sm text-muted-foreground">
						Already have an account?{" "}
						<button
							onClick={() => {
								setAuthMode("login");
								setFormError(null);
							}}
							className="font-medium text-primary hover:underline cursor-pointer"
						>
							Log in
						</button>
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{!isPending && user ? (
				<div
					className={` flex items-center gap-2 rounded-2xl backdrop-blur-md transition-all duration-200 cursor-pointer ${fonts.comfortaa.className} `}
				>
					<MdAccountCircle className="text-2xl text-primary" />
					<span className="text-[1rem] font-medium">{user.user.name}</span>
				</div>
			) : (
				<div
					onClick={() => setAuthMode("signup")}
					className={` rounded-2xl text-primary text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer ${fonts.cabin.className} `}
				>
					Sign Up
				</div>
			)}

			{AuthMode && (
				<div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm">
					{AuthMode && AuthMode === "login" && (
						<Login close={() => setAuthMode(null)} />
					)}

					{AuthMode && AuthMode === "signup" && (
						<Signup close={() => setAuthMode(null)} />
					)}
				</div>
			)}

			{EmailVeref && (
				<div className="fixed inset-0 z-53 flex justify-center items-center backdrop-blur-sm">
					<EmailVerefCard
						email={EmailVeref}
						onClose={() => {
							setEmailVeref(null);
						}}
					/>
				</div>
			)}
		</>
	);
}
