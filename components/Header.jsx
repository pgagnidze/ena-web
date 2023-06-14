import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Container } from "@/components/Container";

function ExternalLinkIcon(props) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MobileNavItem({ href, target, children }) {
  const isExternalLink = target === "_blank";

  return (
    <li>
      <Popover.Button
        as={Link}
        href={href}
        target={target}
        className="block py-2 relative"
      >
        {children}
        {isExternalLink && (
          <span className="absolute top-1 right-0 mt-1">
            <ExternalLinkIcon className="h-4 w-4 text-zinc-500" />
          </span>
        )}
      </Popover.Button>
    </li>
  );
}

function MobileNavigation(props) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur">
        ნავიგაცია
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-gray-800/40 backdrop-blur-sm" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600">ნავიგაცია</h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800">
                <MobileNavItem href="/">მთავარი</MobileNavItem>
                <MobileNavItem href="/enabot">AI დამხმარე</MobileNavItem>
                <MobileNavItem href="/code">კოდის გამშვები</MobileNavItem>
                {/* <MobileNavItem href="/about">დეტალები</MobileNavItem> */}
                <MobileNavItem
                  href="https://github.com/pgagnidze/ena/wiki"
                  target={"_blank"}
                >
                  დოკუმენტაცია
                </MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function NavItem({ href, target, children }) {
  const isActive = useRouter().pathname === href;
  const isExternalLink = target === "_blank";

  return (
    <li>
      <Link
        href={href}
        target={target}
        className={clsx(
          "relative block px-3 py-2 transition whitespace-nowrap",
          isActive ? "text-zinc-800" : "hover:text-gray-800"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-gray-400/0 via-gray-500/40 to-gray-500/0" />
        )}
        {isExternalLink && (
          <span className="absolute top-1 right-0 mt-0.5">
            <ExternalLinkIcon className="h-3 w-3 text-zinc-500" />
          </span>
        )}
      </Link>
    </li>
  );
}

function DesktopNavigation(props) {
  return (
    <nav {...props}>
      <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium text-zinc-500/90 shadow-lg shadow-zinc-700/5 ring-1 ring-zinc-800/5 backdrop-blur">
        <NavItem href="/">მთავარი</NavItem>
        <NavItem href="/enabot">AI დამხმარე</NavItem>
        <NavItem href="/code">კოდის გამშვები</NavItem>
        <NavItem href="https://github.com/pgagnidze/ena/wiki" target="_blank">
          დოკუმენტაცია
        </NavItem>
      </ul>
    </nav>
  );
}

export function Header() {
  return (
    <>
      <Container>
        <header className="pointer-events-none relative z-50 flex flex-col">
          <div className="top-0 py-6">
            <div className="relative flex gap-4 justify-center">
              <div className="flex flex-1 justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
            </div>
          </div>
        </header>
      </Container>
    </>
  );
}
