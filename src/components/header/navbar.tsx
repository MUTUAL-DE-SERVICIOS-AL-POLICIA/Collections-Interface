"use client";

import { Link, Tooltip } from "@heroui/react";

import { UserSession } from "./userSession";
import { ThemeSwitch, Logo } from "@/components";
import { User } from "@/utils/interfaces";

interface Props {
  user: User;
  environment: string;
  computerToolName: string;
  hubUrl: string;
  logoutUrl: string;
}

export const Navbar = ({
  user,
  environment,
  computerToolName,
  hubUrl,
  logoutUrl,
}: Props) => (
  <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
    <header className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-6">
      <Tooltip delay={0}>
        <Link className="flex items-center gap-1" href={hubUrl}>
          <Logo height={30} width={80} />
        </Link>
        <Tooltip.Content showArrow placement="right">
          <Tooltip.Arrow />
          <p>Ir a inicio</p>
        </Tooltip.Content>
      </Tooltip>
      <div className="flex flex-col items-center text-center leading-tight">
        <span className="font-bold text-md uppercase">{computerToolName}</span>
        {(environment === "dev" || environment === "test") && (
          <span className="mt-1 rounded-sm border border-white/20 bg-red-500 px-2 py-0.5 text-xs font-medium text-white shadow-xs shadow-red-300">
            {environment === "test"
              ? "VERSIÓN DE PRUEBAS"
              : "VERSIÓN DE DESARROLLO"}
          </span>
        )}
      </div>
      <div className="hidden items-center gap-2 sm:flex">
        <ThemeSwitch />
        <div className="hidden md:flex">
          <UserSession
            name={user.name}
            username={user.username}
            email={user.email}
            groups={user.groups}
            clientRoles={user.clientRoles}
            logoutUrl={logoutUrl}
          />
        </div>
      </div>
    </header>
  </nav>
);
