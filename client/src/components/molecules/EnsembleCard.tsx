import TextHeadline from "../atoms/TextHeadline";
import Button from "../atoms/Button";
import { EnsembleType } from "../../types/EnsembleType";
import TextBody from "../atoms/TextBody";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import Image from "../atoms/Image";

interface Props {
  ensemble: EnsembleType;
  key: number;
  variant?: "default" | "post";
}

export default function EnsembleCard({ ensemble, variant = "default" }: Props) {
  return variant === "default" ? (
    <div className="flex flex-col border-solid border-1px border-gray-400 rounded-base shadow-base">
      <Button
        to="/ensembles/$ensemblesId"
        params={{ ensemblesId: ensemble._id }}
        buttonVariant="borderless"
        iconPosition="none"
        buttonLabel=""
        size="sm"
        className="no-underline"
      >
        {/* <Image src={ensemble.image} alt={ensemble.name} className="w-100%" /> */}
        <TextHeadline
          variant="h3"
          size="sm"
          className="px-4 pt-3 pb-4 border-t-1px border-t-solid border-t-gray-400"
        >
          {ensemble.name}
        </TextHeadline>
      </Button>
    </div>
  ) : (
    <Button
      to="/ensembles/$ensemblesId"
      params={{ ensemblesId: ensemble._id }}
      buttonVariant="borderless"
      iconPosition="none"
      className="no-underline hover:bg-gray-200"
    >
      <div className="flex flex-col gap-4 border-solid border border-gray-400  rounded-lg shadow-md">
        <div className="flex flex-row gap-2 items-center border-b-1px border-b-solid border-b-gray-400 px-6 py-2">
          {ensemble.image ? (
            <Image src={ensemble.image} alt={ensemble.name} className="w-20 h-20 rounded-md" />
          ) : (
            <div className="h-fit ">
              <Icon
                name={ICON_NAMES.profile_placeholder}
                height={91}
                width={91}
                viewBox="0 0 91 91"
                className="h-12 w-12 rounded-md "
              />
            </div>
          )}
          <div className="flex flex-col gap-1 w-full">
            <TextHeadline variant="h3" size="sm" className="text-red-500">
              {ensemble?.name}
            </TextHeadline>
            <TextBody size="sm" className="text-gray-600">
              {ensemble?.city} • {ensemble?.activeMusicians}
            </TextBody>
          </div>
          <div className="h-full flex">
            <Icon
              name={ICON_NAMES.instruments}
              height={32}
              width={36}
              viewBox={"0 0 36 32"}
              className="text-blue-500"
            />
          </div>
        </div>
      </div>
    </Button>
  );
}
