import ProfileBadge from "../atoms/ProfileBadge";
import Tag from "../atoms/Tag";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";
import { InstrumentType } from "../../types/InstrumentType";

interface Props {
  instrument: InstrumentType;
  key: number;
}

export default function InstrumentCard({ instrument }: Props) {
  return (
    <div className="instrument-wrapper flex flex-col gap-3 border-solid border-1px border-gray-400 p-4 rounded-base shadow-base">
      <div className="flex flex-row gap-6 justify-between items-center">
        <TextHeadline variant="h3" size="sm">
          {instrument.name}
        </TextHeadline>
        <div className="flex flex-row items-center gap-2">
          <TextBody size="sm">level</TextBody>
          <Tag number={instrument.levelOfExperience ?? ""} />
        </div>
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        {instrument.genres?.map((genre, index) => (
          <ProfileBadge key={index} ProfileBadgeLabel={genre} ProfileBadgeSize="sm" />
        ))}
      </div>
    </div>
  );
}
