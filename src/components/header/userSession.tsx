"use client";

import {
  Avatar,
  Button,
  Description,
  Dropdown,
  Header,
  Kbd,
  Label,
  Separator,
} from "@heroui/react";

import { LogoutIcon } from "@/components";

interface Props {
  username: string;
  name: string;
  onLogout: () => void;
  urlLogin: string;
}
export const UserSession = ({
  username,
  name = "Usuario",
  onLogout,
  urlLogin,
}: Props) => {
  const handleOnPress = async () => {
    await onLogout();
    window.location.href = urlLogin;
  };

  return (
    <Dropdown>
      <Button aria-label="Menu" className="border-0" variant="ghost">
        <Avatar size="sm">
          <Avatar.Fallback>{name.charAt(0)}</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col">
          <Label>{name}</Label>
          <Description>{username}</Description>
        </div>
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Section>
            <Header>Perfil</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px" />
              <div className="flex flex-col">
                <Label>{name}</Label>
                <Description>{username}</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Cuenta</Header>
            <Dropdown.Item
              id="logout"
              textValue="Cerrar sesión"
              variant="danger"
              onAction={handleOnPress}
            >
              <div className="flex h-8 items-start justify-center pt-px">
                <LogoutIcon />
              </div>
              <div className="flex flex-col">
                <Label>Cerrar sesión</Label>
                <Description>Salir de la aplicación</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="shift" />
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
