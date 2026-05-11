import type { SVGProps } from "react";
import { useId } from 'react'
export interface SVGRProps {
  title?: string;
}
const Chat = ({
  title,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const uniqueId = useId().replace(/:/g, '')
  const Chat___filter0_n_19993_147266Id = `Chat-__filter0_n_19993_147266-${uniqueId}`
  const Chat___paint0_radial_19993_147266Id = `Chat-__paint0_radial_19993_147266-${uniqueId}`
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role={title ? 'img' : undefined} aria-label={title ?? undefined} aria-hidden={title ? undefined : true} {...props}><g filter={`url(#${Chat___filter0_n_19993_147266Id})`}><path d="M12.0028 2.99915C10.4489 2.99881 8.92126 3.4008 7.56874 4.16599C6.21621 4.93119 5.08484 6.03352 4.28474 7.36569C3.48463 8.69786 3.04306 10.2145 3.00299 11.7679C2.96293 13.3214 3.32574 14.8588 4.0561 16.2304L3.0738 19.1773C2.99243 19.4213 2.98062 19.6831 3.0397 19.9335C3.09877 20.1838 3.22639 20.4127 3.40826 20.5946C3.59013 20.7764 3.81905 20.9041 4.06937 20.9631C4.31969 21.0222 4.58152 21.0104 4.8255 20.929L7.77242 19.9467C8.97955 20.5888 10.3171 20.9474 11.6835 20.9953C13.0499 21.0433 14.4093 20.7793 15.6584 20.2234C16.9076 19.6676 18.0137 18.8345 18.8928 17.7873C19.7719 16.7401 20.4009 15.5064 20.732 14.1799C21.0632 12.8533 21.0877 11.4688 20.8039 10.1313C20.52 8.79386 19.9352 7.53864 19.0938 6.46094C18.2524 5.38325 17.1765 4.51139 15.9479 3.91157C14.7192 3.31174 13.3701 2.99971 12.0028 2.99915Z" fill={`url(#${Chat___paint0_radial_19993_147266Id})`} /></g><defs><filter id={Chat___filter0_n_19993_147266Id} x={3} y={2.99915} width={18} height={18.0017} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves={3} result="noise" seed={262} /><feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" /><feComponentTransfer in="alphaNoise" result="coloredNoise1"><feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " /></feComponentTransfer><feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" /><feFlood floodColor="rgba(255, 255, 255, 0.12)" result="color1Flood" /><feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" /><feMerge result="effect1_noise_19993_147266"><feMergeNode in="shape" /><feMergeNode in="color1" /></feMerge></filter><radialGradient id={Chat___paint0_radial_19993_147266Id} cx={0} cy={0} r={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(11.55 2.99915) rotate(90) scale(19.8019 19.8)"><stop stopColor="#E0DEFE" /><stop offset={1} stopColor="#847BFB" /></radialGradient></defs></svg>
  )
}

export default Chat
