import React from "react";
import svgs from "./svgs";
import { ICON_NAMES } from "./IconNames";

const FILL_DEFAULT = "currentColor";
const FILL_RULE_DEFAULT = "evenodd";
const VIEW_BOX_DEFAULT = "0 0 24 24";

export type IconProps = {
  name: ICON_NAMES;
  height?: number | string;
  width?: number | string;
  fill?: string;
  fillRule?: string;
  stroke?: string;
  strokeWidth?: number | string;
  className?: string;
  viewBox?: string;
};

export const Icon: React.FC<IconProps> = ({
  name,
  viewBox,
  height,
  width,
  fill,
  strokeWidth,
  fillRule,
  stroke,
  className,
}) => {
  const fillSetup = fill ?? FILL_DEFAULT;
  const fillRuleSetup = fillRule ?? FILL_RULE_DEFAULT;
  const viewBoxSetup = viewBox ?? VIEW_BOX_DEFAULT;

  if (!name) {
    return null;
  }

  const iconEl = svgs[name];

  if (!iconEl) {
    return null;
  }

  const classes = className ? `icon ${className}` : "icon";
  const heightStr = height?.toString() ?? "24";
  const widthStr = width?.toString() ?? "24";
  const strokeWidthStr = strokeWidth?.toString();
  const isSimple = React.isValidElement(iconEl);
  const svgEl = isSimple ? iconEl : iconEl.svg;

  return (
    <svg height={heightStr} width={widthStr} viewBox={viewBoxSetup} className={classes} id={name}>
      {React.cloneElement(svgEl, {
        fill: fillSetup,
        fillRule: fillRuleSetup,
        stroke: stroke ?? (strokeWidthStr && FILL_DEFAULT),
        strokeWidth: strokeWidthStr,
      })}
    </svg>
  );
};
