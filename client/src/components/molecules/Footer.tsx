import { Link } from "@tanstack/react-router";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";

import TextHeadline from "../atoms/TextHeadline";

export default function Footer() {
  return (
    <div className="bg-red-6 p-6">
      {/* footer */}
      <TextHeadline variant="h3" size="sm" className="text-white pb-6">
        MUSIC SAMSPIL
      </TextHeadline>
      <ul className="space-y-2 list-none flex flex-col m-0 px-0 items-start ">
        <li>
          <Link to="/" className="link text-white">
            Home
          </Link>
        </li>
        <li>
          {/* ------THIS IS HOW THE LINKS ARE SUPPOSED TO BE AFTER WE LIFT STATE/USESTORE------- <Link onClick={() => !loginStatus && displayPopUp(true)} to={loginStatus ? "/posts" : toggleMenu} className="link text-base">
                See posts
              </Link>  */}
          <Link to="/posts" className="link text-white">
            See posts
          </Link>
        </li>
        <li>
          <Link to="/ensembles" className="link text-white">
            Find ensemble
          </Link>
        </li>
        <li className="p-b">
          <Link
            to="/profile/$profileId"
            className="link text-white"
            params={{
              profileId: "profileNameOrId",
            }}
          >
            Profile
          </Link>
        </li>
        <li className="flex flex-row gap-4 text-white">
          <a href="https://instagram.com" target="_blank" className="text-white">
            <Icon name={ICON_NAMES.footer_instagram} height={18} width={18} viewBox={"0 0 18 18"} />
          </a>
          <a href="https://facebook.com" target="_blank" className="text-white">
            <Icon name={ICON_NAMES.footer_facebook} height={18} width={18} viewBox={"0 0 18 18"} />
          </a>
        </li>
        <li className="w-full max-w-sm xs:max-w-xs ">
          <Icon name={ICON_NAMES.footer_music} viewBox={"0 0 290.251 100.704"} className="w-full h-auto" />
        </li>
      </ul>
    </div>
  );
}