import { Alert, Button, Link } from "@heroui/react";

interface Props {
  color: "default" | "accent" | "danger" | "success" | "warning";
  title?: string;
  description?: string;
  href?: string;
}

export const AlertServer = ({ color, title, description, href }: Props) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col w-full">
        <div key={color} className="w-full flex items-center my-3">
          <Alert {...(color !== "default" ? { status: color } : {})}>
            <Alert.Indicator />
            <Alert.Content>
              {title && <Alert.Title>{title}</Alert.Title>}
              {description && (
                <Alert.Description>{description}</Alert.Description>
              )}
            </Alert.Content>
            {href && (
              <Button size="sm" variant="secondary">
                <Link href={href}>
                  Volver
                  <Link.Icon />
                </Link>
              </Button>
            )}
          </Alert>
        </div>
      </div>
    </div>
  );
};
