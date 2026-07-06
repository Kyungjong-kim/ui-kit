import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// DS 커스텀 사이즈 토큰(w-size-field-md·h-size-control-sm 등)을 width/height 그룹으로
// 등록한다. 미등록 시 tailwind-merge가 충돌로 인식하지 못해 `w-full` 등 소비자 측
// override가 CSS 순서에 따라 무시된다(예: TagInput 내부 Input의 w-full).
const isSizeToken = (value: string) => value.startsWith("size-");

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      w: [{ w: [isSizeToken] }],
      h: [{ h: [isSizeToken] }],
      "min-w": [{ "min-w": [isSizeToken] }],
      "min-h": [{ "min-h": [isSizeToken] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
