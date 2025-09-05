export interface propsTheme {
  theme: {
    gradient: string;
    gradientLow: string;
    primary: string;
    colorBg: string;
    colorBgMessage: string;
    accent: string;
    card: string;
    details: string;
    button: string;
    confetti: string;
    sex: "F" | "M";
  };
}

export const babyThemes = {
  menina: {gradient: "bg-[linear-gradient(120deg,_#f9a8d4_0%,_#a5b4fc_100%)]",
    gradientLow: "bg-gradient-to-b from-pink-50 to-white",
    primary: "text-pink-500",
    colorBg: "bg-pink-500",
    colorBgMessage: "bg-[linear-gradient(120deg,_#fda4af_0%,_#c084fc_100%)]",
    accent: "bg-pink-200",
    card: "bg-white",
    details: "text-rose-400",
    button: "bg-pink-400 hover:bg-pink-500 text-white",
    confetti: "bg-pink-400",
    sex: "F",
  },
  menino: {
    gradient: "bg-[linear-gradient(120deg,_#4facfe_0%,_#00f2fe_100%)]",
    gradientLow: "bg-gradient-to-b from-blue-50 to-white",
    primary: "text-blue-500",
    colorBg: "bg-blue-500",
    accent: "bg-blue-200",
    colorBgMessage: "bg-[linear-gradient(135deg,_#38bdf8_0%,_#818cf8_100%)]",
    card: "bg-white",
    details: "text-blue-400",
    button: "bg-blue-500 hover:bg-blue-600 text-white",
    confetti: "bg-blue-400",
    sex: "M",
  },
} as const;
