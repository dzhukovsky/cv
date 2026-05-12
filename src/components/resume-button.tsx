import { Download } from "lucide-react";
import { useState } from "react";
import { SubtleButton } from "@/components/ui/fluent";

type Props = {
	size?: "sm" | "md" | "lg";
	className?: string;
};

export function ResumeButton({ size, className }: Props) {
	const [busy, setBusy] = useState(false);

	const handle = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (busy) return;
		setBusy(true);
		try {
			const { downloadResume } = await import("@/lib/cv-docx");
			await downloadResume();
		} finally {
			setBusy(false);
		}
	};

	return (
		<SubtleButton
			icon={Download}
			size={size}
			className={className}
			href="#"
			onClick={handle}
			aria-busy={busy || undefined}
		>
			Resume
		</SubtleButton>
	);
}
