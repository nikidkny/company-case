import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";
import Button from "../atoms/Button";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import { Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "../../store/useStore";


export default function NavigationBar() {
  const setLoginStatus = useStore((state) => state.setLoginStatus);
  
  //need to lift this state
  const { isMenuOpen, setIsMenuOpen, setPopUp, loginStatus } = useStore();

  const handleLogout = async () => {
    const cookies = document.cookie.split(';');

    cookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();
      // Set each cookie to expire in the past
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });

    setLoginStatus(false);
    setIsMenuOpen();
  };

  const isAuthenticated = document.cookie.includes("authCode");;

  const displayPopUp = (arg: boolean) => {
    setPopUp(arg);
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen();
  };

  return (
    <div className="border-0 border-b border-solid border-gray-300 relative">
      <div className="flex flex-row items-center justify-between  relative z-20 bg-white h-auto w-auto p-6">
        <div className="flex flex-col">
          <TextHeadline size="sm" variant="h1" className="py-1">
            Musik Samspil
          </TextHeadline>
          <TextBody variant="p" size="md" className="pt-2">
            Created by DAOS - Danish Amateur Orchestra
          </TextBody>
        </div>
        {/*this button is to change to burgerbutton */}
        <Button
          iconPosition="trailing"
          buttonState="default"
          buttonVariant="secondary"
          icon={(!isMenuOpen && ICON_NAMES.burger_lines) || ICON_NAMES.burger_crossed}
          iconHeight={14}
          iconWidth={20}
          iconViewbox={"0 0 20 14"}
          onClick={toggleMenu}
          className="border-none shadow-none"
        />
        {/* burgermenu when open */}
      </div>
      {isMenuOpen && (
        <div className="absolute top-29 z-20 b-white w-full">
          <ul className="space-y-2 bg-white list-none flex flex-col text-center m-0 px-6 pt-6 items-stretch">
            <li>
              <Link to="/" onClick={toggleMenu} className="link text-base">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => (!loginStatus && displayPopUp(true)) || toggleMenu()} to={(loginStatus && "/posts") || "/"} className="link text-base">
                See posts
              </Link>
            </li>
            <li>
              <Link onClick={() => (!loginStatus && displayPopUp(true)) || toggleMenu()} to={(loginStatus && "/ensembles") || "/"} className="link text-base">
                Find ensemble
              </Link>
            </li>
            <li className="p-b">
              <Link
                onClick={() => (!loginStatus && displayPopUp(true)) || toggleMenu()}
                to={(loginStatus && "/profile/$profileId") || "/"}
                className="link text-base"
                params={{
                  profileId: "profileNameOrId",
                }}
              >
                Profile
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li className="">
                  <Button
                    size="mobile"
                    iconPosition="top"
                    buttonState="default"
                    buttonVariant="primary"
                    buttonLabel="Create profile"
                    to="/accounts"
                    customData={{
                      intent: "register",
                    }}
                    onClick={toggleMenu}
                    className="no-underline w-auto"
                  ></Button>
                </li>
                <li className="p-be-8">
                  <Button
                    size="mobile"
                    iconPosition="top"
                    buttonState="default"
                    buttonVariant="secondary"
                    buttonLabel="Log in"
                    customData={{
                      intent: "login",
                    }}
                    to="/accounts"
                    onClick={toggleMenu}
                    className="no-underline w-auto"
                  ></Button>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className="p-be-8">
                <Button
                  size="mobile"
                  iconPosition="top"
                  buttonState="default"
                  buttonVariant="secondary"
                  buttonLabel="Logout"
                  onClick={handleLogout}
                  to="/"
                  className="no-underline w-auto"
                ></Button>
              </li>
            )}
          </ul>
        </div>
      )}

      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleMenu}></div>}
    </div>
  );
}
