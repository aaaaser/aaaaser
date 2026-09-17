import React from "react";
import * as LucideIcons from "lucide-react";
import { getTechMeta } from "./tech-logos";

export function DynamicIcon({
  name,
  techName,
  className = "size-5",
  style,
}: {
  name?: string;
  techName?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (techName) {
    const meta = getTechMeta(techName, name);
    const IconComp = meta.icon;
    return <IconComp className={className} style={style} />;
  }

  if (name) {
    // Check if name itself is a known tech
    const meta = getTechMeta(name, name);
    if (meta.name !== "Technology") {
      const IconComp = meta.icon;
      return <IconComp className={className} style={style} />;
    }

    const IconComponent =
      (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[name] ||
      (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[
        name.charAt(0).toUpperCase() + name.slice(1)
      ] ||
      LucideIcons.Code2;

    return <IconComponent className={className} style={style} />;
  }

  return <LucideIcons.Code2 className={className} style={style} />;
}

