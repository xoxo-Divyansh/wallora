import type { ProjectImage } from "@/types/project";

interface ProjectImageBlockProps {
  image: ProjectImage;
  label?: string;
  className?: string;
}

const toneClass: Record<ProjectImage["tone"], string> = {
  warm: "from-[#d9b98f] via-[#f4f1ea] to-[#8b6f47]",
  sage: "from-[#74856b] via-[#f4f1ea] to-[#d9b98f]",
  clay: "from-[#b86f52] via-[#efe4d4] to-[#6f6a60]",
  ink: "from-[#151515] via-[#6f6a60] to-[#d9b98f]",
  mist: "from-[#ded7cc] via-[#ffffff] to-[#74856b]",
};

export function ProjectImageBlock({ image, label, className = "" }: ProjectImageBlockProps) {
  return (
    <div
      aria-label={image.alt}
      className={`relative flex min-h-48 overflow-hidden rounded-lg bg-gradient-to-br ${toneClass[image.tone]} ${className}`}
      role="img"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.32)_0,rgba(255,255,255,0)_45%)]" />
      <div className="mt-auto w-full p-4 text-sm font-semibold text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.38)]">
        {label ?? image.alt}
      </div>
    </div>
  );
}
