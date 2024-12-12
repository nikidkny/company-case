import { Icon } from "../atoms/Icon/Icon";
import { ICON_NAMES } from "../atoms/Icon/IconNames";
import Tag from "../atoms/Tag";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";
import { Types } from "mongoose";
import mockEnsembles from "../../../../server/src/seeder/mockEnsembles";

interface PostProps {
  _id: Types.ObjectId | string;
  title: string;
  city: string;
  zip: string;
  description: string;
  type: string;
  createdBy: Types.ObjectId | string;
  isReported: boolean;
  //should be insturment type
  instrument: string;
  experienceRequired: string;
  webPage: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
  genre: string;
}

interface Props {
  post: PostProps;
  key: number;
}

export default function PostCard({ post }: Props) {
  const ensemble = mockEnsembles.find((ensemble) => ensemble.createdBy.toString() === post.createdBy.toString());

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
          <Icon name={ICON_NAMES.instruments} height={32} width={36} viewBox={"0 0 36 32"} className="text-blue-500" />
        </div>
      </div>
      <div className="px-6 py-4">
        <div>
          <TextBody size="md" className="font-bold">
            {post.title}
          </TextBody>
        </div>

        <div className="flex flex-row items-center justify-between">
          <TextHeadline variant="h3" size="sm">
            {post.instrument}
          </TextHeadline>
          <div className="flex flex-row items-center gap-2">
            <TextBody size="sm">Experience</TextBody>
            <Tag number={post.experienceRequired} />
          </div>
        </div>
      </div>
    </div>
  );
}
