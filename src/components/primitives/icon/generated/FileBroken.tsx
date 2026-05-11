import type { SVGProps } from "react";
export interface SVGRProps {
  title?: string;
}
const FileBroken = ({
  title,
  style: styleProp = {},
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props} style={{ color: '#1A1A1A', ...styleProp }}><path fillRule="evenodd" clipRule="evenodd" d="M3.24321 2.94702C3.54854 2.66717 4.02314 2.68786 4.30302 2.99316L19.5 19.5715V19.5503L20.7166 20.873C20.7132 20.8778 20.7091 20.8822 20.7056 20.887L20.803 20.9932C21.0829 21.2985 21.0622 21.7731 20.7569 22.053C20.4515 22.3328 19.9769 22.3122 19.6971 22.0068L19.2327 21.5H6.00005C5.60225 21.5 5.22079 21.3418 4.9395 21.0605C4.65822 20.7792 4.50005 20.3978 4.50005 20V5.42773L3.19707 4.00684C2.91723 3.7015 2.93791 3.2269 3.24321 2.94702ZM6.00005 20H17.8572L6.00005 7.06397V20Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M15 2C15.0985 1.99992 15.1961 2.0195 15.2872 2.05713C15.3782 2.09476 15.4606 2.15013 15.5303 2.21973L20.7803 7.46973C20.8499 7.53941 20.9053 7.62188 20.9429 7.71289C20.9806 7.80394 21.0001 7.90148 21 8V18.6882L19.5 17.0579V8.75H15C14.8012 8.74998 14.6104 8.67091 14.4698 8.53027C14.3291 8.38962 14.25 8.1989 14.25 8V3.5H7.0269L5.67925 2.03589C5.78388 2.01296 5.89126 2.00001 6.00005 2H15ZM15.75 7.25H18.4395L15.75 4.56055V7.25Z" fill="currentColor" /></svg>;
export default FileBroken;