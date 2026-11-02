import type { SVGProps } from 'react';

// אייקוני קו פשוטים, בלי ספרייה חיצונית
const paths = {
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  kitchen: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M4 10h16" /><path d="M8 6h2M8 13v4" /></>,
  bath: <><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z" /><path d="M6 12V5a2 2 0 0 1 4 0" /><path d="M7 20l-1 2M17 20l1 2" /></>,
  tiles: <><rect x="3" y="3" width="8" height="8" /><rect x="13" y="3" width="8" height="8" /><rect x="3" y="13" width="8" height="8" /><rect x="13" y="13" width="8" height="8" /></>,
  paint: <><rect x="4" y="3" width="14" height="6" rx="1" /><path d="M18 6h2v5h-8v3" /><rect x="10" y="14" width="4" height="7" rx="1" /></>,
  store: <><path d="M3 9l2-5h14l2 5" /><path d="M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" /><path d="M5 13v8h14v-8" /><path d="M10 21v-5h4v5" /></>,
  pergola: <><path d="M3 6h18" /><path d="M5 6v15M19 6v15" /><path d="M8 3v3M12 3v3M16 3v3" /><path d="M5 10h14" /></>,
  gate: <><rect x="4" y="4" width="16" height="17" rx="1" /><path d="M4 4l16 17M20 4L4 21" /></>,
  wall:<><path d="M3 4h18v16H3z" /><path d="M3 9h18M3 14h18M9 4v5M15 9v5M9 14v6" /></>,
  molding: <><rect x="3" y="3" width="18" height="18" rx="1" /><rect x="7" y="7" width="10" height="10" /><path d="M3 3l4 4M21 3l-4 4M3 21l4-4M21 21l-4-4" /></>,
  zip:<><rect x="3" y="3" width="18" height="4" rx="1" /><path d="M5 7v13M19 7v13" /><path d="M7 7v11h10V7" /><path d="M7 11h10M7 15h10" /></>,
  cabin:<><path d="M4 12l8-7 8 7" /><path d="M6.5 10v10h11V10" /><path d="M15.5 7.2V4.5h2v4.4" /><path d="M10.5 20v-4h3v4" /></>,
  parquet:<><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 10l4.5-4 4.5 4 4.5-4L21 10" /><path d="M3 17l4.5-4 4.5 4 4.5-4L21 17" /></>,
  decor:<><path d="M8.5 13h7l-1.2 8H9.7z" /><path d="M12 13V7.5" /><path d="M12 10c-2.4 0-4-1.6-4-4 2.4 0 4 1.6 4 4z" /><path d="M12 8.5c2.4 0 4-1.6 4-4-2.4 0-4 1.6-4 4z" /></>,
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  hammer: <><path d="M14 4l6 6-3 3-6-6z" /><path d="M11 7l-8 8a2 2 0 0 0 3 3l8-8" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  wallet: <><rect x="3" y="6" width="18" height="14" rx="1" /><path d="M3 10h18" /><path d="M16 15h2" /></>,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  arrowLeft: <path d="M15 5l-7 7 7 7" />,
  arrowRight: <path d="M9 5l7 7-7 7" />,
  volume: <><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" /><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" /></>,
  pause: <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />,
  play:<path d="M8 5v14l11-7z" fill="currentColor" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
};

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 24, strokeWidth = 1.6, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
