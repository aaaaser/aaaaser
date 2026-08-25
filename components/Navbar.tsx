"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    // Pembungkus ini yang membuatnya berada di atas Hero Section & melayang saat scroll
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* Logo / Name */}
        <Link href="/" className="font-bold text-xl">
          MyPortfolio
        </Link>

        {/* Navigation Menu Shadcn */}
        <NavigationMenu>
          <NavigationMenuList>
            
            {/* Menu Dropdown Contoh */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[200px] flex flex-col gap-2">
                  <NavigationMenuLink>
                    <Link href="/projects" className="text-sm hover:underline">
                      Semua Projek
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink>
                    <Link href="/projects/web" className="text-sm hover:underline">
                      Web Apps
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Menu Biasa (Tanpa Dropdown) */}
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </header>
  );
}