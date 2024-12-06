import Button from "../atoms/Button";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import TextHeadline from "../atoms/TextHeadline";
import DividerWithText from "../atoms/DividerWithText";
import { useStore } from "../../store/useStore";
import PopUp from "./PopUp";

export default function Hero() {
  const { popUp, setPopUp, loginStatus, setIsMenuOpen, user } = useStore();
  const displayPopUp = (arg: boolean) => {
    setPopUp(arg);
  };
  console.log("user", user);

  const handleClick = () => {
    setIsMenuOpen();
  };
  // console.log(user);
  return (
    //hero container
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm xs:max-w-xs">
          {(!loginStatus && <Icon name={ICON_NAMES.hero_image} viewBox={"0 0 470 325.475"} className="w-full h-auto" />) || <Icon name={ICON_NAMES.profile_welcome} viewBox={"0 0 150.993 180.24"} className="w-full h-auto" />}
        </div>
        <TextHeadline size="lg" variant="h3" className="pt-6 pb-8">
          {(!loginStatus && "A place where musicians find other musicians and play music together") || `Welcome back ${user?.firstName}!`}
        </TextHeadline>
        <div className="flex flex-row items-center justify-between gap-3 w-full items-stretch text-blue-500">
          <Button
            buttonState="default"
            buttonLabel="Find posts"
            buttonVariant="secondary"
            iconPosition="top"
            icon={ICON_NAMES.author_icon}
            iconHeight={13.887}
            iconWidth={13.887}
            iconViewbox={"0 0 13.887 13.887"}
            onClick={() => !loginStatus && displayPopUp(true)}
            to={loginStatus ? "/posts" : undefined}
            className="no-underline w-full"
          ></Button>
          <Button
            buttonState="default"
            buttonLabel="Find ensembles"
            buttonVariant="secondary"
            iconPosition="top"
            icon={ICON_NAMES.author_icon}
            iconHeight={13.887}
            iconWidth={13.887}
            iconViewbox={"0 0 13.887 13.887"}
            onClick={() => !loginStatus && displayPopUp(true)}
            to={loginStatus ? "/ensembles" : undefined}
            className="no-underline w-full"
          ></Button>
        </div>

        {popUp && (
          <PopUp title={"Log in to find musicians you can play with in all of Denmark"}>
            <a href="https://facebook.com" target="_blank">
              <Button buttonState="default" buttonLabel="Log in with Facebook" buttonVariant="primary" iconPosition="none" size="sm" className="no-underline bg-blue-900 inline w-full"></Button>
            </a>
            <Button
              iconPosition="none"
              buttonState="default"
              buttonLabel="Register by email"
              size="sm"
              buttonVariant="primary"
              className="no-underline w-auto inline"
              to="/accounts"
              onClick={handleClick}
              customData={{
                intent: "register",
              }}
            />
            <DividerWithText text="or" className="" />
            <Button
              buttonState="default"
              buttonLabel="Log in"
              buttonVariant="secondary"
              iconPosition="none"
              size="sm"
              to="/accounts"
              onClick={handleClick}
              customData={{
                intent: "login",
              }}
              className="no-underline w-auto inline"
            />
          </PopUp>
        )}
      </div>
    </>
  );
}
