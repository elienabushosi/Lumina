"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/research-agent");
	}, [router]);

	return (
		<div className="p-8">
			<div className="max-w-4xl mx-auto">
				<div className="text-[#605A57] text-sm">Redirecting...</div>
			</div>
		</div>
	);
}

