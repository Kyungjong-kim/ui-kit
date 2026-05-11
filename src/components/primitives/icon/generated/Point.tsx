import type { SVGProps } from "react";
export interface SVGRProps {
  title?: string;
}
const Point = ({
  title,
  style: styleProp = {},
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props} style={{ color: '#1A1A1A', ...styleProp }}><circle cx={12} cy={12} r={4} fill="currentColor" /></svg>;
export default Point;