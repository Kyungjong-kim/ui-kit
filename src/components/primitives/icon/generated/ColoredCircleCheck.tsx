import type { SVGProps } from "react";
export interface SVGRProps {
  title?: string;
}
const ColoredCircleCheck = ({
  title,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props}><path d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z" fill="#28C76F" /><path d="M7.33337 12.1149L10.3679 15.1494L16.6667 8.8506" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
export default ColoredCircleCheck;