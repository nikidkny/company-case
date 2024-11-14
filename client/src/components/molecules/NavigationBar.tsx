import { useState } from "react";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";
import Button from "../atoms/Button";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import Link from "../atoms/Link";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="border-0 border-b border-solid border-gray-300">
      <div className="flex flex-row items-center justify-between px-6 ">
        <div className="flex flex-col">
          <TextHeadline size="sm" variant="h1">
            Musik Samspil
          </TextHeadline>
          <TextBody variant="p" size="lg">
            Part of DAOS - Danish{" "}
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
        <div className="bg-white">
          <ul className="space-y-2 list-none flex flex-col items-center text-center">
            {/* links font size should be changed to match the buttons */}
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">See posts</Link>
            </li>
            <li>
              <Link href="#">Find ensemble</Link>
            </li>
            <li className="p-b">
              <Link href="#">Profile</Link>
            </li>
            <li className="w-full">
              <Button size="mobile" iconPosition="none" buttonState="default" buttonVariant="primary" buttonLabel="Create profile" className="w-full inline"></Button>
            </li>
            <li className="w-full p-be-6">
              <Button size="mobile" iconPosition="none" buttonState="default" buttonVariant="secondary" buttonLabel="Log in" className="w-full inline"></Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
