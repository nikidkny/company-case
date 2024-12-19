import classNames from "classnames";
import { UserInstrumentType } from "../../types/userInstrumentType";
import Badge from "../atoms/Badge";
import Tag from "../atoms/Tag";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";

interface Props {
  instrument: UserInstrumentType;
  key: string;
  variant?: "default" | "borderless";
  className?: string;
}

export default function InstrumentCard({ instrument, variant = "default", className }: Props) {
  const classes = classNames([
    {
      "flex flex-col gap-3 border-solid border-1px border-gray-400 p-4 rounded-base shadow-base":
        variant === "default",
    },
    {
      "flex flex-col gap-3 p-4": variant === "borderless",
    },
    className,
  ]);
  return (
    <div className={classes}>
      <div className="flex flex-row gap-6 justify-between items-center">
        <TextHeadline variant="h3" size="sm">
          {instrument.name}
        </TextHeadline>
        <div className="flex flex-row items-center gap-2">
          <TextBody size="sm">level</TextBody>
          <Tag number={instrument.levelOfExperience} />
        </div>
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        {instrument.genres?.map((genre, index) => (
          <Badge key={index} BadgeLabel={genre} BadgeSize="sm" />
        ))}
      </div>
    </div>
  );
}
