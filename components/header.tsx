import { Transition } from "@headlessui/react"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef, useState, Fragment } from "react"
import Image from "next/image"
import LangDrop from "./lang-drop"
import { useLocalStorage } from "react-use"
const Header = () => {
  const { t } = useTranslation(["common", "button"])
  const router = useRouter()
  const [pathName, setPathName] = useState(router.pathname)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const mobileNavRef = useRef(null)
  const [user, setUser, removeUser] = useLocalStorage("user", {
    FirstName: "",
    LastName: "",
  })
  const [token, setToken, removeToken] = useLocalStorage("token", "")
  const [isLogged, setIsLogged] = useState(
    token != null && token != undefined && token != ""
  )
  return (
    <header
      className={`py-2 fixed z-20 w-full bg-white shadow-md text-dark-shade`}
    >
      <nav
        id="mobile-nav"
        className="flex justify-center items-center gap-4 lg:hidden px-6 container md:mx-auto z-10 relative"
      >
        <Transition as={Fragment} show={isMobileNavOpen}>
          <div
            className="fixed h-full w-full top-[76px] start-0 bg-black/60 z-50"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <Transition.Child
              enter="transition ease-in-out transform duration-300"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in-out transform duration-300"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
              as={Fragment}
            >
              <div
                ref={mobileNavRef}
                className={`h-fit w-full bg-white pb-8 pt-3`}
              >
                <div className="flex flex-col items-center gap-3">
                  <Link passHref href={"/rooms"}>
                    <div
                      className={`w-fit cursor-pointer text-center  py-1 border-solid  border-b-2    ${
                        router.pathname === "/rooms"
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      {t("common:rooms")}
                    </div>
                  </Link>

                  <Link passHref href={"/bookings"}>
                    <div
                      className={`w-fit cursor-pointer text-center  py-1 border-solid  border-b-2    ${
                        router.pathname === "/bookings"
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      {t("common:my-bookings")}
                    </div>
                  </Link>
                  <Link passHref href={"/"}>
                    <div
                      className={`w-fit cursor-pointer text-center  py-1 border-solid  border-b-2    ${
                        router.pathname === "/"
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      {t("common:book-now")}
                    </div>
                  </Link>
                  <Link passHref href={"/"}>
                    <div
                      className={`w-fit cursor-pointer text-center  py-1 border-solid  border-b-2    ${
                        router.pathname === "/terms"
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      {t("common:terms-conditions")}
                    </div>
                  </Link>
                  <Link passHref href={"/"}>
                    <div
                      className={`w-fit cursor-pointer text-center  py-1 border-solid  border-b-2    ${
                        router.pathname === "privacy"
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      {t("common:privacy-policy")}
                    </div>
                  </Link>
                  <Link passHref href={"/"}>
                    <div
                      className={`w-fit cursor-pointer text-center  py-1 border-solid  border-b-2    ${
                        router.pathname === "/contact"
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      {t("common:contact-us")}
                    </div>
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Transition>
        <Link passHref href={"/"}>
          <div className={`relative pt-3 `}>
            <Image
              alt={"jawharet-al-rashid-logo"}
              src={"/images/logo.png"}
              width={94}
              height={42}
            ></Image>
          </div>
        </Link>

        <i
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="icon-menu_black_24dp-1 text-black text-4xl cursor-pointer absolute left-6 top-1/2 -translate-y-1/2"
        ></i>
      </nav>

      <nav className="hidden lg:flex justify-between items-center gap-16 px-6 container md:mx-auto">
        <div className="flex justify-center items-center gap-4">
          <Link href="/rooms" passHref>
            <div
              className={` ${
                router.pathname === "/rooms"
                  ? "border-primary"
                  : "border-transparent"
              } h-full cursor-pointer  px-5 py-2 border-solid  border-b-[3px]   `}
            >
              {t("common:rooms")}
            </div>
          </Link>

          <Link href="/bookings" passHref>
            <div
              className={` ${
                router.pathname === "/bookings"
                  ? "border-primary"
                  : "border-transparent"
              } h-full cursor-pointer  px-5 py-2 border-solid  border-b-[3px]   `}
            >
              {t("common:my-bookings")}
            </div>
          </Link>
          <Link href="/" passHref>
            <div
              className={` ${
                router.pathname === "/"
                  ? "border-primary"
                  : "border-transparent"
              } h-full cursor-pointer  px-5 py-2 border-solid  border-b-[3px]   `}
            >
              {t("common:book-now")}
            </div>
          </Link>
        </div>
        <Link passHref href={"/"}>
          <div className={`relative pt-3 cursor-pointer `}>
            <Image
              alt={"mada-logo"}
              src={"/images/logo.png"}
              width={94}
              height={42}
            ></Image>
          </div>
        </Link>

        <div className="flex justify-center items-center gap-4">
          <Link href="/" passHref>
            <div
              className={` ${
                router.pathname === "/terms"
                  ? "border-primary"
                  : "border-transparent"
              } h-full cursor-pointer  px-5 py-2 border-solid  border-b-[3px]   `}
            >
              {t("common:terms-conditions")}
            </div>
          </Link>

          <Link href="/" passHref>
            <div
              className={` ${
                router.pathname === "/privacy"
                  ? "border-primary"
                  : "border-transparent"
              } h-full cursor-pointer  px-5 py-2 border-solid  border-b-[3px]   `}
            >
              {t("common:privacy-policy")}
            </div>
          </Link>
          <Link href="/" passHref>
            <div
              className={` ${
                router.pathname === "/contact"
                  ? "border-primary"
                  : "border-transparent"
              } h-full cursor-pointer  px-5 py-2 border-solid  border-b-[3px]   `}
            >
              {t("common:contact-us")}
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
