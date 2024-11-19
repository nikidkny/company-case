import Button from "../atoms/Button";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";

import TextHeadline from "../atoms/TextHeadline";

interface Props {
  loginStatus: boolean;
}
export default function Hero({ loginStatus }: Props) {
  return (
    //hero container
    <div>
      {/* 
  CTA for profile?
  buttons */}
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm xs:max-w-xs">
          {(!loginStatus && <Icon name={ICON_NAMES.hero_image} viewBox={"0 0 470 325.475"} className="w-full h-auto" />) || <Icon name={ICON_NAMES.profile_welcome} viewBox={"0 0 153.993 159.24"} className="w-full h-auto" />}
        </div>
        <TextHeadline size="sm" variant="h1">
          {(!loginStatus && "A place where musicians find musicians and play music together") || `Welcome back '${"user.name"}'!`}
        </TextHeadline>
        <div className="flex flex-row justify-between gap-4 w-full">
          <Button
            buttonState="default"
            buttonLabel="Find posts"
            buttonVariant="secondary"
            iconPosition="leading"
            icon={ICON_NAMES.author_icon}
            iconHeight={13.887}
            iconWidth={13.887}
            iconViewbox={"0 0 13.887 13.887"}
            to={"/posts"}
            className="no-underline"
          ></Button>
          <Button
            buttonState="default"
            buttonLabel="Find ensembles"
            buttonVariant="secondary"
            iconPosition="leading"
            icon={ICON_NAMES.author_icon}
            iconHeight={13.887}
            iconWidth={13.887}
            iconViewbox={"0 0 13.887 13.887"}
            to={"/ensembles"}
            className="no-underline"
          ></Button>
        </div>
      </div>
    </div>
  );
}
