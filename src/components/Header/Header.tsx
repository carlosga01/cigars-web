"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import colors from "@/theme/colors";

type Props = {
  height: number;
};

export default function Header({ height }: Props) {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "My Reviews", href: "/home?tab=me" },
    { label: "All Reviews", href: "/home?tab=all" },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      style={{ background: colors.background, position: "absolute", height }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      {!!user && (
        <NavbarBrand>
          <p className="font-bold" style={{ color: colors.primaryText }}>
            PUROS
          </p>
        </NavbarBrand>
      )}
      <NavbarContent justify="end">
        {user && isLoaded ? (
          <NavbarItem>
            <UserButton afterSignOutUrl="/" />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={Link}
                href="/sign-in"
                variant="flat"
                style={{
                  color: colors.primaryText,
                  backgroundColor: colors.secondaryBackground,
                }}
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="/sign-up"
                style={{
                  color: colors.black,
                  backgroundColor: colors.accentColor,
                }}
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link className="w-full" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
