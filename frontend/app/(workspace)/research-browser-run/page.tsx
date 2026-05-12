"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CircleCheck, PartyPopper, Bot, ClipboardCheck, Clock } from "lucide-react";

// Video-aligned timestamps (seconds)
const STEP_1_END = 17;   // Updating Alta Home features: 0–17s
const STEP_2_START = 18;
const STEP_2_END = 44;   // Updating Alta Primary home characteristics: 18–44s
const STEP_3_START = 47;
const STEP_3_END = 68;   // Updating 360 Value: 47s–1:08
const SAVED_AT = 73;     // Saved progress: 1:13

const DOTS = (
	<span className="inline-flex gap-1 shrink-0">
		<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:0ms]" />
		<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:150ms]" />
		<span className="w-1.5 h-1.5 rounded-full bg-[#6C70BA] animate-bounce [animation-delay:300ms]" />
	</span>
);

function ProgressSection({
	complete,
	label,
	details,
	sectionStart,
	sectionEnd,
	elapsedSec,
}: {
	complete: boolean;
	label: string;
	details: string[];
	sectionStart: number;
	sectionEnd: number;
	elapsedSec: number;
}) {
	const duration = sectionEnd - sectionStart;
	const n = details.length;

	return (
		<div className="space-y-1.5">
			{/* Section header */}
			<div className="flex items-center gap-2 text-sm">
				{complete ? (
					<>
						<CircleCheck className="w-5 h-5 shrink-0 text-green-600" />
						<span className="text-[#37322F] font-medium">{label}</span>
					</>
				) : (
					<>
						{DOTS}
						<span className="text-[#605A57]">{label}....</span>
					</>
				)}
			</div>
			{/* Bullets: each shown and completed at distributed times within section window */}
			<div className="pl-6 space-y-1">
				{details.map((line, i) => {
					const showAt = sectionStart + Math.floor((duration * i) / n);
					const completeAt = sectionStart + Math.floor((duration * (i + 1)) / n);
					const visible = elapsedSec >= showAt;
					const bulletComplete = elapsedSec >= completeAt;
					if (!visible) return null;
					return (
						<div key={line} className="flex items-center gap-2 text-xs">
							{bulletComplete ? (
								<>
									<CircleCheck className="w-4 h-4 shrink-0 text-green-600" />
									<span className="text-[#37322F]">{line}</span>
								</>
							) : (
								<>
									{DOTS}
									<span className="text-[#605A57]">{line}....</span>
								</>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function ResearchBrowserRunPage() {
	const router = useRouter();
	const [elapsedSec, setElapsedSec] = useState(0);
	const [videoEnded, setVideoEnded] = useState(false);

	// Timer aligned to video: one tick per second
	useEffect(() => {
		const interval = setInterval(() => {
			setElapsedSec((s) => s + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const step1Complete = elapsedSec >= STEP_1_END;
	const step2Complete = elapsedSec >= STEP_2_END;
	const step3Complete = elapsedSec >= STEP_3_END;
	const showSaved = elapsedSec >= SAVED_AT;

	return (
		<div className="p-8">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* How this works */}
				<div className="bg-[#F9FAFB] border border-[rgba(55,50,47,0.10)] rounded-xl p-5 space-y-3">
					<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">How this works</p>
					<div className="grid grid-cols-3 gap-4">
						<div className="flex flex-col gap-2">
							<div className="w-8 h-8 rounded-lg bg-[#6c70ba]/10 flex items-center justify-center">
								<Bot className="w-4 h-4 text-[#6c70ba]" />
							</div>
							<p className="text-sm font-medium text-[#37322F]">A browser agent takes over</p>
							<p className="text-sm text-[#605A57]">Think of it like a digital assistant that opens the insurance forms and fills them in automatically, just like a person would, but without the manual effort.</p>
						</div>
						<div className="flex flex-col gap-2">
							<div className="w-8 h-8 rounded-lg bg-[#6c70ba]/10 flex items-center justify-center">
								<ClipboardCheck className="w-4 h-4 text-[#6c70ba]" />
							</div>
							<p className="text-sm font-medium text-[#37322F]">No copy-pasting required</p>
							<p className="text-sm text-[#605A57]">All the property details like roof type, square footage, and floor finishes are pulled from our research and entered directly into Alta and 360Value on your behalf.</p>
						</div>
						<div className="flex flex-col gap-2">
							<div className="w-8 h-8 rounded-lg bg-[#6c70ba]/10 flex items-center justify-center">
								<Clock className="w-4 h-4 text-[#6c70ba]" />
							</div>
							<p className="text-sm font-medium text-[#37322F]">Saves up to 3 hours a day</p>
							<p className="text-sm text-[#605A57]">Agents spend hours every day manually entering the same information across multiple forms. This handles it all in minutes, so you can focus on your clients.</p>
						</div>
					</div>
				</div>
				{/* Browser-style window: red, yellow, green dots + rounded frame */}
				<div className="flex justify-center">
					<div className="w-full max-w-3xl rounded-xl border-2 border-[rgba(55,50,47,0.15)] overflow-hidden bg-[#e8e8e8] shadow-lg">
						{/* Title bar with traffic light buttons (top left) */}
						<div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-[rgba(55,50,47,0.12)] bg-[#e5e5e5]">
							<div className="flex items-center gap-2">
								<span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden />
								<span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden />
								<span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden />
							</div>
							{!videoEnded && (
								<div className="flex items-center gap-1.5">
									<span className="w-2 h-2 rounded-full bg-[#6c70ba] animate-ping absolute" />
									<span className="w-2 h-2 rounded-full bg-[#6c70ba] relative" />
									<span className="text-xs font-medium text-[#6c70ba]">Proposal in progress</span>
								</div>
							)}
						</div>
						{/* Video area */}
						<div className="aspect-video bg-black">
							<video
								className="w-full h-full object-contain"
								src="/browserautosimulation.mov"
								autoPlay
								muted
								playsInline
								onEnded={(e) => {
									e.currentTarget.pause();
									setVideoEnded(true);
								}}
							/>
						</div>
					</div>
				</div>

				{/* Note below browser */}
				<div className="flex justify-center">
					<p className="text-sm text-[#6C70BA] flex items-center gap-2">
						<span aria-hidden="true">🥁</span>
						<span>
							You don&apos;t have to watch the whole time. You can close this tab&mdash;we&apos;ll keep working in the
							background.
						</span>
					</p>
				</div>

				{/* Progress list – aligned to video timestamps */}
				<div className="space-y-4">
					<ProgressSection
						complete={step1Complete}
						label="Updating Alta Home features section"
						details={[
							"Updating use to \"Single\"",
							"Fixing roof cover to \"Architectural Shingle\" as seen on Google Maps",
							"Making sure roofing style is \"Hip\" as seen on Google Maps",
						]}
						sectionStart={0}
						sectionEnd={STEP_1_END}
						elapsedSec={elapsedSec}
					/>
					{elapsedSec >= STEP_2_START && (
						<ProgressSection
							complete={step2Complete}
							label="Updating Alta Primary home characteristics"
							details={[
								"Correcting Style to \"Traditional\"",
								"Number of ½ bathrooms should be \"0\"… updating now",
							]}
							sectionStart={STEP_2_START}
							sectionEnd={STEP_2_END}
							elapsedSec={elapsedSec}
						/>
					)}
					{elapsedSec >= STEP_3_START && (
						<ProgressSection
							complete={step3Complete}
							label="Updating 360 Value"
							details={[
								"Style should also be \"Traditional\"",
								"All bathrooms are \"Full\"",
								"Change Floor Coverings %: 40% carpet, 30% Tile Ceramic",
							]}
							sectionStart={STEP_3_START}
							sectionEnd={STEP_3_END}
							elapsedSec={elapsedSec}
						/>
					)}
					{showSaved && (
						<div className="pt-2 border-t border-[rgba(55,50,47,0.08)] space-y-1">
							<p className="flex items-center gap-2 text-sm font-medium text-[#37322F]">
								<CircleCheck className="w-5 h-5 text-green-600" />
								<span>Saved progress</span>
							</p>
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

				{/* Action buttons */}
				<div className="pt-4 flex flex-wrap items-center gap-3">
					<Button
						type="button"
						onClick={() => router.push("/research-agent")}
					>
						Research a new address
					</Button>
					{videoEnded && (
						<Button
							type="button"
							variant="outline"
							className="border-[rgba(55,50,47,0.2)] text-[#37322F] hover:bg-[#F9FAFB]"
							onClick={() => window.location.reload()}
						>
							Playback Form Filling
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
