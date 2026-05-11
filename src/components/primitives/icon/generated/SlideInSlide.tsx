import type { SVGProps } from "react";
export interface SVGRProps {
  title?: string;
}
const SlideInSlide = ({
  title,
  style: styleProp = {},
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props} style={{ color: '#1A1A1A', ...styleProp }}><path d="M20.25 4.5H3.75C3.35218 4.5 2.97064 4.65804 2.68934 4.93934C2.40804 5.22064 2.25 5.60218 2.25 6V18C2.25 18.3978 2.40804 18.7794 2.68934 19.0607C2.97064 19.342 3.35218 19.5 3.75 19.5H20.25C20.6478 19.5 21.0294 19.342 21.3107 19.0607C21.592 18.7794 21.75 18.3978 21.75 18V6C21.75 5.60218 21.592 5.22064 21.3107 4.93934C21.0294 4.65804 20.6478 4.5 20.25 4.5ZM3.75 6H20.25V11.25H12.75C12.5511 11.25 12.3603 11.329 12.2197 11.4697C12.079 11.6103 12 11.8011 12 12V18H3.75V6ZM20.25 18H13.5V12.75H20.25V18Z" fill="currentColor" /></svg>;
export default SlideInSlide;