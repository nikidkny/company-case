import IconButton from "../atoms/Button";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import Link from "../atoms/Link";
import TextHeadline from "../atoms/TextHeadline";

export default function Footer() {
  return (
    <div className="bg-red-6 p-6">
      {/* footer */}
      {/* h1
list of links - same as navigation
socials - instagram and facebook
logo */}
      <TextHeadline variant="h3" size="sm">
        MUSIC SAMSPIL
      </TextHeadline>
      <ul className="space-y-2 list-none flex flex-col m-0 px-0 items-start ">
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
        <li className="flex flex-row gap-4 text-white">
          <IconButton buttonVariant="tertiary" buttonState="default" icon={ICON_NAMES.footer_instagram} iconHeight={18} iconWidth={18} iconViewbox={"0 0 18 18"} iconPosition="leading" />
          <Icon name={ICON_NAMES.footer_facebook} height={18} width={18} viewBox={"0 0 18 18"} />
        </li>
        <li className="w-full max-w-sm xs:max-w-xs ">
          <Icon name={ICON_NAMES.footer_music} viewBox={"0 0 290.251 100.704"} className="w-full h-auto" />
        </li>
      </ul>
    </div>
  );
}
