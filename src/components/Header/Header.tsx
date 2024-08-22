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
import { usePathname } from "next/navigation";

export const HEADER_HEIGHT = 60;
export const HEADER_NEGATIVE_MARGIN = -60;

export default function Header() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "My Reviews", href: "/home?tab=me" },
    { label: "All Reviews", href: "/home?tab=all" },
  ];

  if (["/", "/sign-in", "/sign-up"].includes(pathname)) return null;

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      style={{
        background: colors.background,
        position: "absolute",
        height: HEADER_HEIGHT,
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          style={{ color: colors.primaryText }}
        />
      </NavbarContent>
      {!!user && (
        <NavbarContent justify="start" style={{ justifyContent: "center" }}>
          <p className="font-bold text-center" style={{ color: colors.primaryText }}>
            PUROS
          </p>
        </NavbarContent>
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
      <NavbarMenu style={{ backgroundColor: colors.secondaryBackground }}>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
              size="lg"
              style={{ color: colors.primaryText }}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
