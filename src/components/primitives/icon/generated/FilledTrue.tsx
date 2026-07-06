import type { SVGProps } from "react";
import { useId } from 'react'
export interface SVGRProps {
  title?: string;
}
const FilledTrue = ({
  title,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const uniqueId = useId().replace(/:/g, '')
  const FilledTrue___path_1_inside_1_22133_44696Id = `FilledTrue-__path-1-inside-1_22133_44696-${uniqueId}`
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props}><mask id={FilledTrue___path_1_inside_1_22133_44696Id} fill="white"><path d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z" /></mask><path d="M0 6C0 2.68629 2.68629 0 6 0H18C21.3137 0 24 2.68629 24 6V18C24 21.3137 21.3137 24 18 24H6C2.68629 24 0 21.3137 0 18V6Z" fill="#1A1A1A" /><path d="M6 0V1H18V0V-1H6V0ZM24 6H23V18H24H25V6H24ZM18 24V23H6V24V25H18V24ZM0 18H1V6H0H-1V18H0ZM6 24V23C3.23858 23 1 20.7614 1 18H0H-1C-1 21.866 2.13401 25 6 25V24ZM24 18H23C23 20.7614 20.7614 23 18 23V24V25C21.866 25 25 21.866 25 18H24ZM18 0V1C20.7614 1 23 3.23858 23 6H24H25C25 2.13401 21.866 -1 18 -1V0ZM6 0V-1C2.13401 -1 -1 2.13401 -1 6H0H1C1 3.23858 3.23858 1 6 1V0Z" fill="#F2F2F2" mask={`url(#${FilledTrue___path_1_inside_1_22133_44696Id})`} /></svg>
  )
}

export default FilledTrue
