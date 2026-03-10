"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleCheck, PartyPopper } from "lucide-react";

export default function ResearchBrowserRunPage() {
	const router = useRouter();
	const [altaFilled, setAltaFilled] = useState(false);
	const [threeSixtyFilled, setThreeSixtyFilled] = useState(false);

	// Simulate progress: Alta filling → Alta filled → 360 filling → 360 filled
	useEffect(() => {
		const t1 = setTimeout(() => setAltaFilled(true), 3000);
		const t2 = setTimeout(() => setThreeSixtyFilled(true), 6000);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);

	return (
		<div className="p-8">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Note above placeholder */}
				<div className="flex justify-center">
					<p className="text-sm text-[#6C70BA] flex items-center gap-2">
						<span aria-hidden="true">🥁</span>
						<span>
							You don&apos;t have to watch the whole time. You can close this tab&mdash;we&apos;ll keep working in the
							background.
						</span>
					</p>
				</div>
				{/* Headless browser placeholder */}
				<div className="flex justify-center">
					<div className="w-full max-w-3xl aspect-video rounded-lg border-2 border-[rgba(55,50,47,0.15)] bg-[#e8e8e8] flex items-center justify-center overflow-hidden">
						<div className="text-center text-[#605A57]">
							<div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-[#d0d0d0] flex items-center justify-center">
								<svg
									className="w-8 h-8 text-[#9ca3af]"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9a9 9 0 009 9m-9-9a9 9 0 009-9m-9 9a9 9 0 019 9"
									/>
								</svg>
							</div>
							<p className="text-sm font-medium">Headless browser</p>
							<p className="text-xs mt-1 opacity-75">Visiting Alta &amp; 360</p>
						</div>
					</div>
				</div>

				{/* Progress list – status changes in real time */}
				<div className="space-y-3">
					{/* Alta */}
					<div className="flex items-center gap-2 text-sm">
						{altaFilled ? (
							<>
								<CircleCheck className="w-5 h-5 shrink-0 text-green-600" />
								<span className="text-[#37322F] font-medium">Filled details on Alta</span>
							</>
						) : (
							<>
								<span className="inline-flex gap-1 shrink-0">
									<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:0ms]" />
									<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:150ms]" />
									<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:300ms]" />
								</span>
								<span className="text-[#605A57]">Filling details on Alta....</span>
							</>
						)}
					</div>

					{/* 360 – shown once Alta is filled */}
					{altaFilled && (
						<div className="flex items-center gap-2 text-sm">
							{threeSixtyFilled ? (
								<>
									<CircleCheck className="w-5 h-5 shrink-0 text-green-600" />
									<span className="text-[#37322F] font-medium">Filled details on 360</span>
								</>
							) : (
								<>
									<span className="inline-flex gap-1 shrink-0">
										<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:0ms]" />
										<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:150ms]" />
										<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:300ms]" />
									</span>
									<span className="text-[#605A57]">Filling out details on 360....</span>
								</>
							)}
						</div>
					)}

					{/* Complete note – shown when both are done */}
					{altaFilled && threeSixtyFilled && (
						<div className="pt-2 border-t border-[rgba(55,50,47,0.08)] space-y-1">
							<p className="flex items-center gap-2 text-sm font-medium text-[#37322F]">
								<PartyPopper className="w-5 h-5 text-[#6C70BA]" />
								<span>All done! We saved your progress.</span>
							</p>
							<p className="text-sm text-[#605A57]">
								Login, review, &amp; send out a proposal.
							</p>
						</div>
					)}
				</div>

				{/* Research a new address button */}
				<div className="pt-4">
					<Button
						type="button"
						variant="outline"
						className="border-[rgba(55,50,47,0.2)] text-[#37322F] hover:bg-[#F9FAFB]"
						onClick={() => router.push("/research-agent")}
					>
						Research a new address
					</Button>
				</div>
			</div>
		</div>
	);
}
