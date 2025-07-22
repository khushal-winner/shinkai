import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const Header = () => {
  return (
    <div className="fixed top-0 border-b w-full flex items-center justify-between p-3 bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/50">
      <div>
        <Link href={"/"}>
          <Image
            className="cursor-pointer h-12 py-1 w-auto object-contain"
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <SignedOut>
          <SignInButton>
            <Button variant={"outline"}>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Link href="/dashboard">
            <Button variant={"outline"}>
              <LayoutDashboard className="mr-2" />
              <span className="hidden md:block">Industry Insights</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button>
                <StarsIcon className="mr-1" />
                <span className="hidden md:block">Growth Tools</span>
                <ChevronDown className="ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href="/resume-builder"
                  className="flex items-center justify-center"
                >
                  <FileText className="mr-2" />
                  <span className="mt-0.5">Build Resume</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/resume-builder"
                  className="flex items-center justify-center"
                >
                  <PenBox className="mr-2" />
                  <span className="mt-0.5">Cover Letter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/resume-builder"
                  className="flex items-center justify-center"
                >
                  <GraduationCap className="mr-2" />
                  <span className="mt-0.5">Interview Prep</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
            afterSignOutUrl={"/"}
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
