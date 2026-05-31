interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-muted">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-brand-text sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-brand-muted sm:text-base">{description}</p> : null}
    </header>
  );
}
