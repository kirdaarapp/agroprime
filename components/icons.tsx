type IconProps = {
  className?: string;
};

const base = "h-7 w-7";

export function IconSnowflake({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" d="M12 2v20M4.9 5.5l14.2 13M4.9 18.5l14.2-13" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 4 3-2 3 2M9 20l3 2 3-2M5.5 8.6 3 8l-.6-3M5.5 15.4 3 16l-.6 3M18.5 8.6 21 8l.6-3M18.5 15.4 21 16l.6 3" />
    </svg>
  );
}

export function IconScale({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M7 21h10M5 7h4l-2 5a2 2 0 1 1-4 0l2-5ZM15 7h4l-2 5a2 2 0 1 1-4 0l2-5ZM5 7h14" />
    </svg>
  );
}

export function IconTruck({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 7h11v9H2zM13 10h4l4 3v3h-8v-6ZM5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

export function IconEggWhite({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path d="M12 21c4 0 6.5-3.4 6.5-7.6C18.5 8.8 15.5 3 12 3S5.5 8.8 5.5 13.4C5.5 17.6 8 21 12 21Z" />
    </svg>
  );
}

export function IconEggBrown({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21c4 0 6.5-3.4 6.5-7.6C18.5 8.8 15.5 3 12 3S5.5 8.8 5.5 13.4C5.5 17.6 8 21 12 21Z" />
    </svg>
  );
}

export function IconChicken({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10a4 4 0 1 1 6.8 2.9c1.6.5 2.7 2 2.7 3.7V20H7v-3.4c0-1.5.9-2.8 2.2-3.4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 8.5 16.5 6M6 20l-1.5 1.5M18 20l1.5 1.5" />
      <circle cx="12.3" cy="8" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconRuler({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 16 8-8 5 5-8 8-5-5ZM8.5 10.5l1.5 1.5M11 8l1.5 1.5M13.5 5.5 15 7" />
    </svg>
  );
}

export function IconCarton({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path strokeLinecap="round" d="M3 7 6 3h12l3 4M9 11.5h.01M13 11.5h.01M17 11.5h.01M7 11.5h.01M9 15.5h.01M13 15.5h.01M17 15.5h.01M7 15.5h.01" />
    </svg>
  );
}

export function IconPallet({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v3H3zM3 15h18v3H3zM5 11v4M9 11v4M15 11v4M19 11v4" />
    </svg>
  );
}

export function IconWhatsApp({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.05c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.4-.71-2.87-1.14-4.71-4.03-4.85-4.22-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.27-.29.58-.36.77-.36h.55c.18 0 .42-.03.64.5.24.57.8 1.96.87 2.1.07.15.11.32.02.51-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.28-.12.55.16.27.71 1.18 1.53 1.91 1.05.94 1.94 1.24 2.21 1.38.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.07.11.07.63-.17 1.31z" />
    </svg>
  );
}

export function IconPhone({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5c0 8.28 6.72 15 15 15l2-3.5-5-2-1.5 1.5A11.4 11.4 0 0 1 8 10l1.5-1.5-2-5L4 5Z" />
    </svg>
  );
}

export function IconMail({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function IconPin({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  );
}

export function IconMessage({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v12H8l-4 4V4Z" />
    </svg>
  );
}

export function IconCheckBadge({ className = base }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 9.5 4.7 6.5 4.3 5.8 7.2 3.5 9l1.3 2.6L3.5 14l2.3 1.8.7 2.9 3-.4L12 20l2.5-2.7 3 .4.7-2.9L20.5 14l-1.3-2.4L20.5 9l-2.3-1.8-.7-2.9-3 .4L12 3Z" />
    </svg>
  );
}
