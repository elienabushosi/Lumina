"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const schema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		email: z.string().email("Enter a valid email"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
		organizationType: z.enum(["new", "existing"], {
			required_error: "Please select an option",
		}),
		organizationName: z.string().optional(),
		joinCode: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
	.refine(
		(data) => {
			if (data.organizationType === "new") {
				return data.organizationName && data.organizationName.trim().length > 0;
			}
			if (data.organizationType === "existing") {
				return data.joinCode && data.joinCode.trim().length > 0;
			}
			return true;
		},
		{ message: "This field is required", path: ["organizationName"] }
	)
	.refine(
		(data) => {
			if (data.organizationType === "existing") {
				return data.joinCode && data.joinCode.trim().length > 0;
			}
			return true;
		},
		{ message: "Join code is required", path: ["joinCode"] }
	);

type FormValues = z.infer<typeof schema>;

export default function SignupByTryingPage(): React.JSX.Element {
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			firstName: "",
			email: "",
			password: "",
			confirmPassword: "",
			organizationType: "new",
			organizationName: "",
			joinCode: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const organizationType = form.watch("organizationType");

	const onSubmit = (values: FormValues) => {
		// Placeholder; wire to your backend when ready.
		console.log("Sign up by trying:", values);
		router.push("/research-agent");
	};

	return (
		<div className="w-full min-h-screen bg-[#F7F5F3] flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<button
					onClick={() => router.push("/")}
					className="mb-4 flex items-center gap-2 text-[#37322F] hover:text-[#4090C2] transition-colors text-sm font-medium"
				>
					<ArrowLeft className="w-4 h-4" />
					Back
				</button>
				<div className="bg-white rounded-lg shadow-sm border border-[rgba(55,50,47,0.12)] p-8 space-y-6">
					{/* Logo placeholder – replace with your logo image */}
					<div className="flex justify-center">
						<div
							className="h-8 w-32 sm:h-9 sm:w-36 bg-[rgba(55,50,47,0.08)] rounded border border-[rgba(55,50,47,0.12)] flex items-center justify-center"
							aria-hidden
						>
							<span className="text-[10px] text-[#6b7280] text-center">144×36</span>
						</div>
					</div>
				<h1 className="text-lg font-semibold text-[#37322F] text-center">
					Create an Account to Securely Try It
				</h1>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#37322F]">
										First Name
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Enter your first name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#37322F]">
										Email
									</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Enter your email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#37322F]">
										Password
									</FormLabel>
									<div className="relative">
										<FormControl>
											<Input
												type={showPassword ? "text" : "password"}
												placeholder="Enter your password"
												{...field}
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowPassword((v) => !v)}
											className="absolute inset-y-0 right-3 flex items-center text-[#605A57]"
											aria-label={showPassword ? "Hide password" : "Show password"}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#37322F]">
										Confirm password
									</FormLabel>
									<div className="relative">
										<FormControl>
											<Input
												type={showConfirmPassword ? "text" : "password"}
												placeholder="Re-enter your password"
												{...field}
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowConfirmPassword((v) => !v)}
											className="absolute inset-y-0 right-3 flex items-center text-[#605A57]"
											aria-label={showConfirmPassword ? "Hide password" : "Show password"}
										>
											{showConfirmPassword ? (
												<EyeOff className="h-4 w-4" />
											) : (
												<Eye className="h-4 w-4" />
											)}
										</button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="organizationType"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-[#37322F]">
										Join existing organization or new
									</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											if (value === "new") {
												form.setValue("joinCode", "");
											} else {
												form.setValue("organizationName", "");
											}
										}}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select an option" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="new">New</SelectItem>
											<SelectItem value="existing">Existing</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						{organizationType === "new" && (
							<FormField
								control={form.control}
								name="organizationName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-[#37322F]">
											Organization Name
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Enter your organization name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{organizationType === "existing" && (
							<FormField
								control={form.control}
								name="joinCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-[#37322F]">
											Organization Code
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Enter organization code"
												{...field}
												className="uppercase"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<Button type="submit" className="w-full bg-[#37322F] hover:bg-[#37322F]/90 text-white">
							Create account
						</Button>
					</form>
				</Form>
				</div>
			</div>
		</div>
	);
}
