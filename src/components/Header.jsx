/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { loading, fn: fnLogout } = useFetch(logout);

  const { user, fetchUser } = UrlState();

  const buttonStyle = {
    backgroundColor: isHovered ? "rgb(121, 213, 32)" : "rgb(101, 193, 12)", // lighter shade on hover
    color: "white",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img
            src="./shoturl-logo-zip-file/png/logo-no-background.png"
            className="h-5 mt-2 mb-2"
            alt="logo"
          />
        </Link>

        <div>
          {!user ? (
            <Button
              onClick={() => navigate("/auth")}
              style={buttonStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-1 h-4 w-4 " />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 cursor-pointer">
                  <LogOut className="mr-1 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && (
        <BarLoader className="mb-4" width={"100%"} color="rgb(101, 193, 12)" />
      )}
    </>
  );
};

export default Header;
