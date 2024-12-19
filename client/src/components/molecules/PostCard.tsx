import { EnsembleType } from "../../types/EnsembleType";
import { PostType } from "../../types/PostType";
import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import Tag from "../atoms/Tag";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";

interface Props {
  post: PostType;
  ensemble: EnsembleType;
  key: number;
  variant?: "profile" | "post";
}

export default function PostCard({ post, ensemble }: Props) {
  const minumumExperience = post.experienceRequired + "+";
  return (
    <div className="postcard-wrapper flex flex-col gap-4 border-solid border border-gray-400  rounded-lg shadow-md">
      <div className="flex flex-row justify-between items-center border-b-1px border-b-solid border-b-gray-400 px-6 pt-4.5">
        {/* needs to ensemble.image */}
        <div className="flex flex-col gap-1 pb-3">
          <TextHeadline variant="h3" size="sm">
            {ensemble?.name}
          </TextHeadline>
          <TextBody size="sm" className="text-gray-600">
            {ensemble?.city} •
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

      <div className="flex flex-col p-6">
        <div>
          <TextBody size="md" className="font-bold">
            {post.title}
          </TextBody>
        </div>

        <div className="flex flex-row items-center justify-between">
          <TextHeadline variant="h3" size="sm">
            {post.instrument}
          </TextHeadline>
          {post.experienceRequired && (
            <div className="flex flex-row items-center gap-2">
              <TextBody size="sm">Experience</TextBody>
              <Tag number={minumumExperience} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
