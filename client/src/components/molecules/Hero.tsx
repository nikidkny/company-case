import Button from "../atoms/Button";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import TextHeadline from "../atoms/TextHeadline";
import TextBody from "../atoms/TextBody";
import DividerWithText from "../atoms/DividerWithText";
import { useStore } from "../../store/useStore";

export default function Hero() {
  const { popUp, setPopUp, loginStatus, setIsMenuOpen } = useStore();
  const displayPopUp = (arg: boolean) => {
    setPopUp(arg);
  };

  const handleClick = () => {
    setIsMenuOpen();
  };
  // console.log(user);
  return (
    //hero container
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm xs:max-w-xs">
          {(!loginStatus && <Icon name={ICON_NAMES.hero_image} viewBox={"0 0 470 325.475"} className="w-full h-auto" />) || <Icon name={ICON_NAMES.profile_welcome} viewBox={"0 0 153.993 159.24"} className="w-full h-auto" />}
        </div>
        <TextHeadline size="sm" variant="h1" className="pt-6 pb-8">
          {(!loginStatus && "A place where musicians find other musicians and play music together") || `Welcome back '${"user.name"}'!`}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => displayPopUp(false)}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative mx-2 flex flex-col items-center gap-6">
              {/* Modal content */}
              <div className="border-0 border-b border-solid border-gray-300 pb-3">
                <TextBody size="lg" variant="strong" className="text-blue-500">
                  {" "}
                  Log in to find musicians you can play with in all of Denmark
                </TextBody>
              </div>
              <div className="flex flex-col items-center gap-3 w-full items-stretch">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
