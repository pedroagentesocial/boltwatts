import { useEffect, useMemo, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
};

export default function ImageCard({ src, alt, className = "", fallbackLabel }: Props) {
  const normalizedSrc = useMemo(() => src.trim(), [src]);
  const [isBroken, setIsBroken] = useState(normalizedSrc.length === 0);

  useEffect(() => {
    setIsBroken(normalizedSrc.length === 0);
  }, [normalizedSrc]);

  if (isBroken) {
    return (
      <div
        className={`relative overflow-hidden bg-bw-lightblue ${className}`}
        aria-label={alt}
        role="img"
      >
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,transparent_25%,rgba(0,51,112,0.07)_25%,rgba(0,51,112,0.07)_50%,transparent_50%,transparent_75%,rgba(0,51,112,0.07)_75%,rgba(0,51,112,0.07)_100%)] [background-size:26px_26px]" />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-bw-navy/60">
          {fallbackLabel}
        </div>
      </div>
    );
  }

  return (
    <picture className={`block overflow-hidden ${className}`}>
      <source srcSet={normalizedSrc} type="image/svg+xml" />
      <img
        src={normalizedSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        onError={() => setIsBroken(true)}
      />
    </picture>
  );
}
