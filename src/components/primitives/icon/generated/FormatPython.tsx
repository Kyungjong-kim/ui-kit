import type { SVGProps } from "react";
export interface SVGRProps {
  title?: string;
}
const FormatPython = ({
  title,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg width="1em" height="1em" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props}><path fillRule="evenodd" clipRule="evenodd" d="M2.60699 24H16.4217C17.8555 24 19.0287 22.7464 19.0287 21.2136V6.42023L9.51418 3.93518L2.60699 5.08392C1.34369 5.76081 0 6.3379 0 7.86994V21.2136C0 22.7464 1.1732 24 2.60699 24Z" fill="white" /><path fillRule="evenodd" clipRule="evenodd" d="M19.0291 7.8699V6.42019L12.0924 0H2.60699C1.1732 0 0 1.25359 0 2.78641V7.8699H19.0291Z" fill="#E8AB27" /><path fillRule="evenodd" clipRule="evenodd" d="M12.0938 0V3.63417C12.0938 5.16699 13.2666 6.42058 14.7007 6.42058H19.0301L12.0938 0Z" fill="#F8D446" /><path fillRule="evenodd" clipRule="evenodd" d="M6.78413 18.2058L3.67578 16.2054V15.5938L6.78413 13.4474V14.3293L4.53947 15.8726V15.899L6.78413 17.306V18.2058ZM11.2808 12.6447L8.6653 18.9258H7.87695L10.4847 12.6447H11.2808ZM15.3519 16.1965L12.2435 18.1988V17.2986L14.4948 15.8967V15.8781L12.2435 14.3254V13.4544L15.3519 15.5821V16.1965Z" fill="#F8D446" /></svg>;
export default FormatPython;