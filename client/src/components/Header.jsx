import { Button, TextInput } from 'flowbite-react';
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const path = useLocation().pathname;
  
  return (
    <Navbar className="border-b-2 bg-white">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        BLog
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Sphere
        </span>
      </Link>
      
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button grgradientDuoTone="purpleToBlue" outline>Sign In</Button>
        </Link>
        <NavbarToggle />
      </div>
      
      <NavbarCollapse>
        <NavbarLink href="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={path === "/about"}>
          About
        </NavbarLink>
        <NavbarLink href="/projects" active={path === "/projects"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
