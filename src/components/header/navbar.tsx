"use client";

import { Link, Tooltip } from "@heroui/react";

import { UserSession } from "./userSession";

import { ThemeSwitch, Logo } from "@/components";
import { urlLogin } from "@/services";
import { User } from "@/utils/interfaces";
import { logout } from "@/api";

interface Props {
  user: User;
  environment: string;
  computerToolName: string;
}

export const Navbar = ({ user, environment, computerToolName }: Props) => {
  const onLogout = async () => {
    await logout();
    window.location.href = `${urlLogin}/login`;
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-4">
          <Tooltip delay={0}>
            <Link
              className="flex justify-start items-center gap-1"
              href={`${urlLogin}/apphub`}
            >
              <Logo height={30} width={80} />
            </Link>
            <Tooltip.Content showArrow placement="right">
              <Tooltip.Arrow />
              <p>Ir a inicio</p>
            </Tooltip.Content>
          </Tooltip>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center text-center leading-tight">
            <span className="font-bold text-md uppercase">
              {computerToolName}
            </span>
            {(environment === "dev" || environment === "test") && (
              <span className="mt-1 text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-sm shadow-xs shadow-red-300 border border-white/20">
                {environment === "test"
                  ? "VERSIÓN DE PRUEBAS"
                  : "VERSIÓN DE DESARROLLO"}
              </span>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <ThemeSwitch />
          <div className="hidden md:flex">
            <UserSession
              name={user?.name}
              urlLogin={`${urlLogin}/login`}
              username={user?.username}
              onLogout={onLogout}
            />
          </div>
        </div>
      </header>
    </nav>
  );
};
