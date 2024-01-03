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

export default function Header() {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "My Reviews", href: "/home?tab=me" },
    { label: "All Reviews", href: "/home?tab=all" },
  ];

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarBrand>
        <p className="font-bold">PUROS</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {user && isLoaded ? (
          <NavbarItem>
            <UserButton afterSignOutUrl="/" />
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} color="primary" href="/sign-in" variant="flat">
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/sign-up">
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
