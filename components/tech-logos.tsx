import React from "react";

export interface TechMeta {
  name: string;
  color: string; // Brand Hex Color
  bgColor: string; // Light background tint
  darkBgColor: string; // Dark background tint
  borderHover: string;
  icon: (props: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;
}

export const TECH_REGISTRY: Record<string, TechMeta> = {
  "next.js": {
    name: "Next.js",
    color: "#000000",
    bgColor: "rgba(0, 0, 0, 0.06)",
    darkBgColor: "rgba(255, 255, 255, 0.12)",
    borderHover: "#71717a",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M18.665 21.978C16.793 23.251 14.498 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.584-1.574 6.797-4.067 8.986l-8.736-11.23v-.002h-2.14v9.646h1.87v-7.234l7.738 9.812zm-3.04-14.224h1.87v9.646h-1.87V7.754z" />
      </svg>
    ),
  },
  react: {
    name: "React",
    color: "#61DAFB",
    bgColor: "rgba(97, 218, 251, 0.12)",
    darkBgColor: "rgba(97, 218, 251, 0.18)",
    borderHover: "#61DAFB",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" className={className} style={style}>
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  typescript: {
    name: "TypeScript",
    color: "#3178C6",
    bgColor: "rgba(49, 120, 198, 0.12)",
    darkBgColor: "rgba(49, 120, 198, 0.2)",
    borderHover: "#3178C6",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zm16.14 12.06c.642 0 1.25.132 1.823.396.574.264 1.05.65 1.428 1.157.378.508.567 1.116.567 1.824 0 .72-.19 1.34-.57 1.86-.38.52-.9.923-1.56 1.21-.66.286-1.424.43-2.293.43-.984 0-1.855-.178-2.613-.535-.758-.356-1.344-.88-1.758-1.572l1.644-1.28c.28.468.65.82 1.112 1.056.46.236.98.354 1.56.354.516 0 .94-.104 1.272-.312.332-.208.498-.516.498-.924 0-.324-.108-.576-.324-.756-.216-.18-.54-.316-.972-.408l-1.044-.216c-.924-.192-1.636-.552-2.136-1.08-.5-.528-.75-1.212-.75-2.052 0-.672.18-1.26.54-1.764.36-.504.86-.896 1.5-1.176.64-.28 1.39-.42 2.25-.42.864 0 1.632.152 2.304.456.672.304 1.188.756 1.548 1.356l-1.584 1.212c-.228-.384-.536-.676-.924-.876-.388-.2-.848-.3-1.38-.3-.492 0-.896.096-1.212.288-.316.192-.474.468-.474.828 0 .288.104.516.312.684.208.168.528.296.96.384l1.08.216zm-7.644-6.84v2.016H6.861V18.72H4.437V7.236H1.677V5.22h7.944z" />
      </svg>
    ),
  },
  javascript: {
    name: "JavaScript",
    color: "#F7DF1E",
    bgColor: "rgba(247, 223, 30, 0.15)",
    darkBgColor: "rgba(247, 223, 30, 0.2)",
    borderHover: "#F7DF1E",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.84l1.89-1.201c-.555-.96-1.395-1.56-2.58-1.74-1.515-.195-3.03.495-3.375 2.1-.375 1.65.615 2.76 2.37 3.495.885.39 1.68.75 1.53 1.5-.165.735-1.005.99-1.89.84-.795-.165-1.275-.645-1.665-1.35l-1.92 1.155c.615 1.26 1.635 2.055 3.39 2.22 1.845.165 3.39-.63 3.6-2.514zM12.38 18.3c-.225-1.365-.795-1.935-1.995-2.055-.66-.06-1.125.195-1.38.585l.03-4.875h-2.31V19.5c0 1.77.945 2.655 2.73 2.655 1.785 0 2.895-.885 2.925-3.855z" />
      </svg>
    ),
  },
  "tailwind css": {
    name: "Tailwind CSS",
    color: "#38BDF8",
    bgColor: "rgba(56, 189, 248, 0.12)",
    darkBgColor: "rgba(56, 189, 248, 0.2)",
    borderHover: "#38BDF8",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    ),
  },
  "node.js": {
    name: "Node.js",
    color: "#5FA04E",
    bgColor: "rgba(95, 160, 78, 0.12)",
    darkBgColor: "rgba(95, 160, 78, 0.2)",
    borderHover: "#5FA04E",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 0L1.75 5.92v11.84L12 23.68l10.25-5.92V5.92L12 0zm-1.12 18.25h-2.1v-6.98h2.1v6.98zm-1.05-7.9c-.68 0-1.22-.55-1.22-1.23 0-.68.54-1.23 1.22-1.23.68 0 1.23.55 1.23 1.23 0 .68-.55 1.23-1.23 1.23zm6.47 7.9h-2.1v-4.04c0-1.11-.4-1.87-1.4-1.87-.76 0-1.22.51-1.42 1.01-.07.18-.09.43-.09.68v4.22h-2.1V11.27h2.1v.97c.29-.45.82-1.1 1.99-1.1 1.45 0 2.54.95 2.54 2.99v4.12z" />
      </svg>
    ),
  },
  postgresql: {
    name: "PostgreSQL",
    color: "#4169E1",
    bgColor: "rgba(65, 105, 225, 0.12)",
    darkBgColor: "rgba(65, 105, 225, 0.2)",
    borderHover: "#4169E1",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M11.95 0C5.35 0 0 5.35 0 11.95c0 5.28 3.44 9.77 8.21 11.36.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22 0 1.61-.02 2.9-.02 3.3 0 .32.22.7.83.58 4.77-1.6 8.2-6.08 8.2-11.36C23.9 5.35 18.55 0 11.95 0z" />
      </svg>
    ),
  },
  neon: {
    name: "Neon PostgreSQL",
    color: "#00E599",
    bgColor: "rgba(0, 229, 153, 0.12)",
    darkBgColor: "rgba(0, 229, 153, 0.2)",
    borderHover: "#00E599",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.36l7.5 3.75v7.78L12 19.64l-7.5-3.75V8.11L12 4.36z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  "drizzle orm": {
    name: "Drizzle ORM",
    color: "#C5F74F",
    bgColor: "rgba(197, 247, 79, 0.15)",
    darkBgColor: "rgba(197, 247, 79, 0.22)",
    borderHover: "#C5F74F",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2L3 21h18L12 2zm0 4.8l5.2 11H6.8L12 6.8z" />
        <circle cx="12" cy="14" r="1.5" />
      </svg>
    ),
  },
  python: {
    name: "Python",
    color: "#3776AB",
    bgColor: "rgba(55, 118, 171, 0.12)",
    darkBgColor: "rgba(55, 118, 171, 0.2)",
    borderHover: "#3776AB",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.804v.826H3.88S0 5.772 0 11.892c0 6.12 3.4 5.923 3.4 5.923h2.033v-2.85c0-3.264 2.8-3.264 2.8-3.264h5.753c2.72 0 2.72-2.656 2.72-2.656V2.656S17.067 0 11.914 0zm-1.637 1.684a1.01 1.01 0 1 1 0 2.02 1.01 1.01 0 0 1 0-2.02zm1.81 20.632c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.804v-.826h8.13s3.88.462 3.88-5.658c0-6.12-3.4-5.923-3.4-5.923h-2.033v2.85c0 3.264-2.8 3.264-2.8 3.264H9.922c-2.72 0-2.72 2.656-2.72 2.656v6.407s-.36 2.656 4.792 2.656zm1.637-1.684a1.01 1.01 0 1 1 0-2.02 1.01 1.01 0 0 1 0 2.02z" />
      </svg>
    ),
  },
  docker: {
    name: "Docker",
    color: "#2496ED",
    bgColor: "rgba(36, 150, 237, 0.12)",
    darkBgColor: "rgba(36, 150, 237, 0.2)",
    borderHover: "#2496ED",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.929 0h2.12a.185.185 0 00.184-.186V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.186V9.006a.185.185 0 00-.186-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.083.185.186.185M23.792 12.3c-.51-.318-1.574-.42-2.455-.38-.135-.85-.56-1.636-1.258-2.202l-.56-.44-.45.548c-.687.838-.85 1.94-.52 2.87-.52.28-1.42.49-2.09.52H.677c-.36 0-.677.317-.677.678 0 2.213.79 4.3 2.227 5.875 1.583 1.733 3.738 2.76 6.073 2.894 5.378.307 9.873-3.13 11.02-8.318 1.488.106 3.427-.27 4.472-2.525z" />
      </svg>
    ),
  },
  git: {
    name: "Git & GitHub",
    color: "#F05032",
    bgColor: "rgba(240, 80, 50, 0.12)",
    darkBgColor: "rgba(240, 80, 50, 0.2)",
    borderHover: "#F05032",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.124 0L8.831 2.564l3.308 3.308a2.123 2.123 0 0 1 2.684 2.684l3.182 3.182a2.122 2.122 0 1 1-1.06 1.06l-2.871-2.871v4.457a2.124 2.124 0 1 1-1.5 0v-4.63a2.124 2.124 0 0 1-1.144-2.775L8.13 3.266.454 10.942a1.5 1.5 0 0 0 0 2.124l10.476 10.477a1.5 1.5 0 0 0 2.125 0l10.49-10.49a1.5 1.5 0 0 0 0-2.123z" />
      </svg>
    ),
  },
  php: {
    name: "PHP",
    color: "#777BB4",
    bgColor: "rgba(119, 123, 180, 0.12)",
    darkBgColor: "rgba(119, 123, 180, 0.2)",
    borderHover: "#777BB4",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-5.5 16.5l.8-4.5h1.8c1.3 0 2.2-.7 2.2-2s-.9-2-2.2-2H4.8L3 16.5h1.5zm10 0l.8-4.5h1.8c1.3 0 2.2-.7 2.2-2s-.9-2-2.2-2h-4.3L12 16.5h1.5zm-5 0l.8-4.5h1.6c.9 0 1.5-.4 1.5-1.2 0-.9-.6-1.3-1.5-1.3H12l-.5 2.5h-1.5l.9-4.5h2.8c1.8 0 3 1 3 2.5 0 1.2-.8 2.2-2 2.6l1.2 4.4h-1.8l-1.1-4H12l-.5 2.5H11.5z" />
      </svg>
    ),
  },
  vercel: {
    name: "Vercel & Cloud",
    color: "#000000",
    bgColor: "rgba(0, 0, 0, 0.08)",
    darkBgColor: "rgba(255, 255, 255, 0.15)",
    borderHover: "#a1a1aa",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
  redis: {
    name: "Redis",
    color: "#DC382D",
    bgColor: "rgba(220, 56, 45, 0.12)",
    darkBgColor: "rgba(220, 56, 45, 0.2)",
    borderHover: "#DC382D",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2L2 7l10 5 10-5-10-5zm-8.8 7.3L12 14l8.8-4.7L22 10.5 12 16 2 10.5l1.2-1.2zm0 4.5L12 18.5l8.8-4.7 1.2 1.2-10 5.5-10-5.5 1.2-1.2z" />
      </svg>
    ),
  },
  graphql: {
    name: "GraphQL",
    color: "#E10098",
    bgColor: "rgba(225, 0, 152, 0.12)",
    darkBgColor: "rgba(225, 0, 152, 0.2)",
    borderHover: "#E10098",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8-3.4 5.9H7l-3.4-5.9L12 2.3zM3.6 8l3.4 5.9-3.4 5.9V8zm16.8 0v11.8l-3.4-5.9 3.4-5.9zM12 21.7l-8.4-4.8 3.4-5.9h10l3.4 5.9-8.4 4.8z" />
      </svg>
    ),
  },
  aws: {
    name: "AWS",
    color: "#FF9900",
    bgColor: "rgba(255, 153, 0, 0.12)",
    darkBgColor: "rgba(255, 153, 0, 0.2)",
    borderHover: "#FF9900",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
      </svg>
    ),
  },
  firebase: {
    name: "Firebase",
    color: "#FFA000",
    bgColor: "rgba(255, 160, 0, 0.12)",
    darkBgColor: "rgba(255, 160, 0, 0.2)",
    borderHover: "#FFA000",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M3.89 15.67L6.87.87a.5.5 0 0 1 .94-.09l3.05 5.73-6.97 9.16zm15.4-2.73L16.48 2.45a.5.5 0 0 0-.91-.07L3.1 19.38l8.47 4.77a1 1 0 0 0 .94 0l6.78-11.21z" />
      </svg>
    ),
  },
  mongodb: {
    name: "MongoDB",
    color: "#47A248",
    bgColor: "rgba(71, 162, 72, 0.12)",
    darkBgColor: "rgba(71, 162, 72, 0.2)",
    borderHover: "#47A248",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 0c-.3 0-.6.1-.8.4C9.5 2.5 5 10.3 5 15.6 5 19.8 8.1 24 12 24s7-4.2 7-8.4c0-5.3-4.5-13.1-6.2-15.2-.2-.3-.5-.4-.8-.4zm.1 1.9c.7.9 4.9 6.5 5.5 12.1H12.1V1.9z" />
      </svg>
    ),
  },
  golang: {
    name: "Go",
    color: "#00ADD8",
    bgColor: "rgba(0, 173, 216, 0.12)",
    darkBgColor: "rgba(0, 173, 216, 0.2)",
    borderHover: "#00ADD8",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M1.8 10.2h3.5v3.6H1.8zm6 0h3.5v3.6H7.8zm6 0h3.5v3.6h-3.5zm6 0h3.5v3.6h-3.5z" />
      </svg>
    ),
  },
  rust: {
    name: "Rust",
    color: "#DEA584",
    bgColor: "rgba(222, 165, 132, 0.12)",
    darkBgColor: "rgba(222, 165, 132, 0.2)",
    borderHover: "#DEA584",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  linux: {
    name: "Linux",
    color: "#FCC624",
    bgColor: "rgba(252, 198, 36, 0.15)",
    darkBgColor: "rgba(252, 198, 36, 0.22)",
    borderHover: "#FCC624",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.93 1.1 3.6 2.7 4.4C7.5 12.6 6 15.1 6 18c0 .6.4 1 1 1h10c.6 0 1-.4 1-1 0-2.9-1.5-5.4-3.7-6.6 1.6-.8 2.7-2.47 2.7-4.4 0-2.76-2.24-5-5-5z" />
      </svg>
    ),
  },
  figma: {
    name: "Figma",
    color: "#F24E1E",
    bgColor: "rgba(242, 78, 30, 0.12)",
    darkBgColor: "rgba(242, 78, 30, 0.2)",
    borderHover: "#F24E1E",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M8 2h4v4H8V2zm4 0h4a4 4 0 0 1 0 8h-4V2zM8 6h4v4H8V6zm0 4h4v4H8v-4zm0 4h4v4a4 4 0 0 1-4-4zm4-4h4a4 4 0 0 1 0 8h-4v-8z" />
      </svg>
    ),
  },
};

export function getTechMeta(name: string, iconName?: string): TechMeta {
  const query = (name || "").toLowerCase().trim();
  const iconQuery = (iconName || "").toLowerCase().trim();

  // Search by exact or partial key match
  if (query.includes("next")) return TECH_REGISTRY["next.js"];
  if (query.includes("react")) return TECH_REGISTRY["react"];
  if (query.includes("type")) return TECH_REGISTRY["typescript"];
  if (query.includes("script") || query.includes("javascript") || query === "js") return TECH_REGISTRY["javascript"];
  if (query.includes("tailwind")) return TECH_REGISTRY["tailwind css"];
  if (query.includes("node")) return TECH_REGISTRY["node.js"];
  if (query.includes("postgres") || query.includes("sql")) return TECH_REGISTRY["postgresql"];
  if (query.includes("neon")) return TECH_REGISTRY["neon"];
  if (query.includes("drizzle")) return TECH_REGISTRY["drizzle orm"];
  if (query.includes("python")) return TECH_REGISTRY["python"];
  if (query.includes("docker")) return TECH_REGISTRY["docker"];
  if (query.includes("git") || query.includes("github")) return TECH_REGISTRY["git"];
  if (query.includes("php")) return TECH_REGISTRY["php"];
  if (query.includes("vercel") || query.includes("cloud")) return TECH_REGISTRY["vercel"];
  if (query.includes("redis")) return TECH_REGISTRY["redis"];
  if (query.includes("graphql")) return TECH_REGISTRY["graphql"];
  if (query.includes("aws")) return TECH_REGISTRY["aws"];
  if (query.includes("firebase")) return TECH_REGISTRY["firebase"];
  if (query.includes("mongo")) return TECH_REGISTRY["mongodb"];
  if (query.includes("go") || query.includes("golang")) return TECH_REGISTRY["golang"];
  if (query.includes("rust")) return TECH_REGISTRY["rust"];
  if (query.includes("linux")) return TECH_REGISTRY["linux"];
  if (query.includes("figma")) return TECH_REGISTRY["figma"];

  // Fallback by iconName matching
  if (iconQuery.includes("flame") || iconQuery.includes("next")) return TECH_REGISTRY["next.js"];
  if (iconQuery.includes("atom") || iconQuery.includes("react")) return TECH_REGISTRY["react"];
  if (iconQuery.includes("palette")) return TECH_REGISTRY["tailwind css"];
  if (iconQuery.includes("database")) return TECH_REGISTRY["postgresql"];
  if (iconQuery.includes("server")) return TECH_REGISTRY["node.js"];
  if (iconQuery.includes("box")) return TECH_REGISTRY["docker"];
  if (iconQuery.includes("git")) return TECH_REGISTRY["git"];
  if (iconQuery.includes("terminal")) return TECH_REGISTRY["python"];

  // Default fallback
  return {
    name: name || "Technology",
    color: "#6366F1",
    bgColor: "rgba(99, 102, 241, 0.12)",
    darkBgColor: "rgba(99, 102, 241, 0.2)",
    borderHover: "#6366F1",
    icon: ({ className = "size-5", style }) => (
      <svg role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  };
}
