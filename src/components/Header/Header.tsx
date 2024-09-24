"use client";

import Image from "next/image";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import colors from "@/theme/colors";
import { usePathname, useRouter } from "next/navigation";
import Puros from "/public/images/puros-white.png";

export const HEADER_HEIGHT = 60;
export const HEADER_NEGATIVE_MARGIN = -60;

export default function Header() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [{ label: "Puros Blog", href: "/blog" }];

  if (["/", "/sign-in", "/sign-up"].includes(pathname)) return null;

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      style={{
        background: colors.background,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: 1000,
      }}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          style={{ color: colors.primaryText }}
        />
      </NavbarContent>
      {!!user && (
        <NavbarContent justify="start" style={{ justifyContent: "center" }}>
          <button onClick={() => router.push("/home")}>
            <Image
              alt="Puros"
              src={Puros}
              style={{
                height: HEADER_HEIGHT - 32,
                aspectRatio: "2.75",
                objectFit: "contain",
                width: "auto",
              }}
            />
          </button>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {!isLoaded ? null : user ? (
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
              className="w-full text-xl my-1"
              href={item.href}
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
