import { User } from "../../types/UserType";
import Button from "../atoms/Button";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import Image from "../atoms/Image";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";
// import InstrumentCard from "./InstrumentCard";

interface Props {
  key: string | undefined;
  musician: Partial<User>;
}

export default function MusicianCard({ musician }: Props) {
  // make first name start with capital letter others are lowercase and last name only first letter and a "."
  const fullName = `${musician.firstName?.charAt(0).toUpperCase()}${musician.firstName?.slice(1).toLowerCase()} ${musician.lastName?.charAt(0).toUpperCase()}.`;

  return (
    <div>
      <div className="profile-wrapper flex flex-row justify-between items-center bg-gray-200 border-b-1px border-b-solid border-b-gray-400 px-6 py-4.5">
        <div className="flex flex-row gap-4 items-center">
          {musician.image ? (
            <Image src={musician.image} alt="profile image" className="rounded-md w-12 h-12" />
          ) : (
            <Icon
              name={ICON_NAMES.profile_placeholder}
              height={91}
              width={91}
              viewBox="0 0 91 91"
              className="rounded-md w-12 h-12"
            />
          )}
          <div className="flex flex-col">
            <TextHeadline variant="h3" size="sm" className="text-red-500">
              {fullName}
            </TextHeadline>
            <TextBody variant="span" className="text-gray-500">
              {musician.city}
            </TextBody>
          </div>
        </div>
        <div>
          <Button
            buttonVariant="secondary"
            to={`/musicians/${musician._id}`}
            iconPosition="none"
            buttonLabel="View profile"
            size="sm"
            className="no-underline w-fit"
          ></Button>
        </div>
      </div>
      <div>
        {/* {userInstruments.map((userInstrument, index) => (
          <InstrumentCard instrument={userInstrument} key={index} />
        ))} */}
      </div>
    </div>
  );
}
