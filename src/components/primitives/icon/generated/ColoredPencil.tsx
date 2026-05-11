import type { SVGProps } from "react";
import { useId } from 'react'
export interface SVGRProps {
  title?: string;
}
const ColoredPencil = ({
  title,
  style: styleProp = {},
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const uniqueId = useId().replace(/:/g, '')
  const ColoredPencil___filter0_n_22394_31673Id = `ColoredPencil-__filter0_n_22394_31673-${uniqueId}`
  const ColoredPencil___paint0_linear_22394_31673Id = `ColoredPencil-__paint0_linear_22394_31673-${uniqueId}`
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props} style={{ color: '#FFF9ED', ...styleProp }}><g filter={`url(#${ColoredPencil___filter0_n_22394_31673Id})`}><rect width={24} height={24} rx={8} fill="currentColor" /><path d="M19.1484 8.20318L15.7974 4.85156C15.686 4.7401 15.5537 4.65169 15.408 4.59137C15.2624 4.53105 15.1064 4.5 14.9488 4.5C14.7911 4.5 14.6351 4.53105 14.4895 4.59137C14.3439 4.65169 14.2116 4.7401 14.1001 4.85156L4.85176 14.1002C4.73984 14.2112 4.65111 14.3434 4.59073 14.489C4.53034 14.6346 4.4995 14.7908 4.50001 14.9484V18.3C4.50001 18.6183 4.62644 18.9235 4.85148 19.1485C5.07653 19.3736 5.38176 19.5 5.70002 19.5H9.05181C9.20946 19.5005 9.36563 19.4697 9.51125 19.4093C9.65687 19.3489 9.78904 19.2602 9.90007 19.1483L19.1484 9.90036C19.2599 9.78893 19.3483 9.65664 19.4086 9.51103C19.469 9.36543 19.5 9.20937 19.5 9.05177C19.5 8.89417 19.469 8.73811 19.4086 8.5925C19.3483 8.4469 19.2599 8.31461 19.1484 8.20318ZM16.5001 10.8513L13.1484 7.50045L14.9484 5.70052L18.3002 9.05139L16.5001 10.8513Z" fill={`url(#${ColoredPencil___paint0_linear_22394_31673Id})`} /></g><defs><filter id={ColoredPencil___filter0_n_22394_31673Id} x={0} y={0} width={24} height={24} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves={3} result="noise" seed={3053} /><feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" /><feComponentTransfer in="alphaNoise" result="coloredNoise1"><feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " /></feComponentTransfer><feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" /><feFlood floodColor="rgba(255, 255, 255, 0.25)" result="color1Flood" /><feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" /><feMerge result="effect1_noise_22394_31673"><feMergeNode in="shape" /><feMergeNode in="color1" /></feMerge></filter><linearGradient id={ColoredPencil___paint0_linear_22394_31673Id} x1={12} y1={4.5} x2={12} y2={19.5} gradientUnits="userSpaceOnUse"><stop stopColor="#FFA442" /><stop offset={1} stopColor="#FF8442" /></linearGradient></defs></svg>
  )
}

export default ColoredPencil
