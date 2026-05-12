import { ChevronDown, Download } from "lucide-react";
import { useState } from "react";
import { DropdownMenu } from "radix-ui";

type Size = "sm" | "md" | "lg";

type Props = {
	size?: Size;
	className?: string;
};

// Outer height mirrors SubtleButton's sizeCls — the total button height
// (including border) lands on 28 / 32 / 40 px so it sits flush next to siblings.
const outerSizeCls: Record<Size, string> = {
	sm: "h-7",
	md: "h-8",
	lg: "h-10",
};
const mainSizeCls: Record<Size, string> = {
	sm: "px-2.5 text-[12px]",
	md: "px-3 text-[13px]",
	lg: "px-4 text-[14px]",
};
const caretSizeCls: Record<Size, string> = {
	sm: "w-6",
	md: "w-7",
	lg: "w-8",
};
const iconSize: Record<Size, number> = { sm: 13, md: 14, lg: 16 };

export function ResumeButton({ size = "md", className = "" }: Props) {
	const [busy, setBusy] = useState(false);
	const Sz = iconSize[size];

	const download = async (format: "pdf" | "docx") => {
		if (busy) return;
		setBusy(true);
		try {
			if (format === "pdf") {
				const { downloadResumePdf } = await import("@/lib/cv-pdf");
				await downloadResumePdf();
			} else {
				const { downloadResume } = await import("@/lib/cv-docx");
				await downloadResume();
			}
		} finally {
			setBusy(false);
		}
	};

	const onEnter = (e: React.MouseEvent<HTMLElement>) => {
		e.currentTarget.style.background = "var(--fl-canvas-2)";
	};
	const onLeave = (e: React.MouseEvent<HTMLElement>) => {
		e.currentTarget.style.background = "transparent";
	};

	return (
		<div
			className={`inline-flex items-stretch rounded-md border ${outerSizeCls[size]} ${className}`}
			style={{
				background: "var(--fl-card)",
				borderColor: "var(--fl-stroke)",
			}}
		>
			<button
				type="button"
				onClick={() => download("pdf")}
				disabled={busy}
				aria-busy={busy || undefined}
				className={`inline-flex items-center gap-1.5 rounded-l-md font-medium outline-none focus:outline-none focus-visible:outline-none transition-colors ${mainSizeCls[size]}`}
				style={{ background: "transparent", color: "var(--fl-fg)" }}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
			>
				<Download size={Sz} className="text-[color:var(--fl-fg-muted)]" />
				Resume
			</button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<button
						type="button"
						aria-label="Choose format"
						disabled={busy}
						className={`inline-flex items-center justify-center rounded-r-md border-l outline-none focus:outline-none focus-visible:outline-none transition-colors ${caretSizeCls[size]}`}
						style={{
							background: "transparent",
							color: "var(--fl-fg)",
							borderColor: "var(--fl-stroke)",
						}}
						onMouseEnter={onEnter}
						onMouseLeave={onLeave}
					>
						<ChevronDown
							size={Sz}
							className="text-[color:var(--fl-fg-muted)]"
						/>
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content
						align="end"
						sideOffset={4}
						className="min-w-[8rem] rounded-md border p-1 shadow-md outline-none"
						style={{
							background: "var(--fl-card)",
							borderColor: "var(--fl-stroke)",
							color: "var(--fl-fg)",
							zIndex: 100,
						}}
					>
						<DropdownMenu.Item
							className="rounded px-2.5 py-1.5 text-[13px] outline-none focus:outline-none focus-visible:outline-none cursor-pointer hover:bg-[color:var(--fl-canvas-2)]"
							onSelect={() => download("pdf")}
						>
							PDF
						</DropdownMenu.Item>
						<DropdownMenu.Item
							className="rounded px-2.5 py-1.5 text-[13px] outline-none focus:outline-none focus-visible:outline-none cursor-pointer hover:bg-[color:var(--fl-canvas-2)]"
							onSelect={() => download("docx")}
						>
							DOCX
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	);
}
