"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Header() {
  const { user, isLoaded } = useUser();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">PUROS</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {user && isLoaded ? (
          <NavbarItem>
            <UserButton showName afterSignOutUrl="/" />
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
    </Navbar>
  );
}
