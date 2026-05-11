import type { IconName } from "../../primitives/icon";
import { Icon } from "../../primitives/icon";

export interface LogoOnlyHeaderProps {
  logoIcon?: IconName;
  onClick?: () => void;
}

export function LogoOnlyHeader({ logoIcon = "logoGenA", onClick }: LogoOnlyHeaderProps) {
  return (
    <header className="bg-surface-default flex items-top w-full h-[48px] px-layout-container-margin-lg pt-stack-sm">
      <div className="flex w-full h-[32px] items-center">
        <Icon name={logoIcon} className="!h-[22px] !w-[48px]" onClick={onClick} />
      </div>
    </header>
  );
}

LogoOnlyHeader.displayName = "LogoOnlyHeader";
