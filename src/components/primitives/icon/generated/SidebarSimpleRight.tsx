import type { SVGProps } from "react";
export interface SVGRProps {
  title?: string;
}
const SidebarSimpleRight = ({
  title,
  style: styleProp = {},
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props} style={{ color: '#1A1A1A', ...styleProp }}><path d="M3.75 20.25L20.25 20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75L21.75 5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75L3.75 3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47065 2.25 4.85218 2.25 5.25L2.25 18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97065 20.092 3.35218 20.25 3.75 20.25ZM20.25 18.75L16.5 18.75L16.5 5.25L20.25 5.25L20.25 18.75ZM3.75 5.25L15 5.25L15 18.75L3.75 18.75L3.75 5.25Z" fill="currentColor" /></svg>;
export default SidebarSimpleRight;