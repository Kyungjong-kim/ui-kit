import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";

export interface LogoOnlyHeaderProps {
  logoIcon?: IconName;
  onClick?: () => void;
}

export function LogoOnlyHeader({ logoIcon, onClick }: LogoOnlyHeaderProps) {
  return (
    <header className="bg-[var(--color-bg-primary)] flex items-start w-full h-[48px] px-6 pt-2">
      <div className="flex w-full h-[32px] items-center">
        {logoIcon && <Icon name={logoIcon} className="!h-[22px] !w-[48px]" onClick={onClick} />}
      </div>
    </header>
  );
}

LogoOnlyHeader.displayName = "LogoOnlyHeader";
