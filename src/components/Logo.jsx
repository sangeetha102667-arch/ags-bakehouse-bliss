export default function Logo({ size = 50 }) {
  const width = (size * 110) / 56;
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 110 56"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ano logo"
    >
      <defs>
        <linearGradient id="anoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5127d" />
          <stop offset="55%" stopColor="#ff4e6a" />
          <stop offset="100%" stopColor="#ff9a1f" />
        </linearGradient>
        <clipPath id="anoClip">
          <rect width="110" height="56" rx="12" />
        </clipPath>
      </defs>

      <g clipPath="url(#anoClip)">
        <rect width="110" height="56" fill="url(#anoBg)" />

        {/* icing drip */}
        <rect x="0" y="0" width="110" height="10" fill="#fff6e5" />
        <rect x="8" y="6" width="9" height="16" rx="4.5" fill="#fff6e5" />
        <rect x="30" y="6" width="9" height="11" rx="4.5" fill="#fff6e5" />
        <rect x="58" y="6" width="9" height="19" rx="4.5" fill="#fff6e5" />
        <rect x="90" y="6" width="9" height="13" rx="4.5" fill="#fff6e5" />
      </g>

      {/* "an" */}
      <text
        x="14"
        y="46"
        fontSize="28"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="Poppins, sans-serif"
        letterSpacing="1"
      >
        an
      </text>

      {/* "o" as a cake with candle */}
      <circle cx="75" cy="37" r="9.5" fill="none" stroke="#ffffff" strokeWidth="4.5" />
      <path d="M67 37 Q75 41 83 37" fill="none" stroke="#fff6e5" strokeWidth="1.8" />
      <rect x="73.4" y="20" width="3.2" height="8" rx="1" fill="#2ec4f1" />
      <ellipse cx="75" cy="17" rx="2.6" ry="3.6" fill="#ffd60a" />

      {/* sprinkles */}
      <circle cx="94" cy="35" r="2" fill="#ffd60a" />
      <circle cx="101" cy="43" r="1.7" fill="#ffffff" />
      <circle cx="90" cy="45" r="1.5" fill="#2ec4f1" />
    </svg>
  );
}