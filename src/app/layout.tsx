import "@/utils/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";

import { getUserContext } from "@/api/auth/context";
import { AlertServer } from "@/components/alertServer";
import { Navbar, SidebarRoot } from "@/components/header";
import { getDeployEnvironment, fontSans } from "@/utils";
import { hubPublicUrl, invalidSessionUrl } from "@/utils/helpers/urls";
import type { ResourcePermission } from "@/utils/interfaces";
import {
  GatewayRequestError,
  isAccessDeniedCode,
} from "@/utils/services/GatewayRequestError";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { default: "Recaudaciones", template: "%s - Recaudaciones" },
  description: "Herramienta Tecnológica de Recaudaciones",
  icons: { icon: "/icono_muserpol.svg" },
  other: { google: "notranslate" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let snapshot;
  let permissions: readonly ResourcePermission[] = [];
  let sessionError: GatewayRequestError | undefined;

  try {
    snapshot = await getUserContext();
    permissions = snapshot.permissions;
  } catch (error) {
    if (error instanceof GatewayRequestError) {
      if (error.code === "SESSION_INVALID")
        redirect(invalidSessionUrl().toString());
      sessionError = error;
    } else sessionError = new GatewayRequestError(502, "AUTH_UPSTREAM_ERROR");
  }

  const identity = snapshot?.identity;
  const user = {
    name: identity?.name ?? identity?.preferredUsername ?? "Usuario",
    username: identity?.preferredUsername ?? identity?.sub ?? "Usuario",
    email: identity?.email,
    groups: snapshot?.groups ?? [],
    clientRoles: snapshot?.clientRoles ?? [],
  };
  const hubUrl = hubPublicUrl("/apphub").toString();
  const logoutUrl = hubPublicUrl("/api/auth/logout").toString();

  return (
    <html
      suppressHydrationWarning
      className="notranslate"
      lang="es"
      translate="no"
    >
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers
          permissions={permissions}
          themeProps={{ attribute: "class", defaultTheme: "light" }}
        >
          <div className="flex flex-col h-screen">
            <Navbar
              computerToolName="HERRAMIENTA TECNOLÓGICA DE RECAUDACIONES"
              environment={getDeployEnvironment()}
              hubUrl={hubUrl}
              logoutUrl={logoutUrl}
              user={user}
            />
            <div className="flex flex-1 overflow-x-hidden">
              <SidebarRoot />
              <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-neutral-950">
                {sessionError ? (
                  <AlertServer
                    color={
                      isAccessDeniedCode(sessionError.code)
                        ? "warning"
                        : "danger"
                    }
                    description={sessionError.message}
                    href={hubUrl}
                  />
                ) : (
                  children
                )}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
