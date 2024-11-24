import { Types } from "mongoose";
import TextHeadline from "../atoms/TextHeadline";
import Image from "../atoms/Image";

interface Ensemble {
  _id: Types.ObjectId | string;
  name: string;
  memberList: (Types.ObjectId | string)[];
  createdBy: Types.ObjectId | string;
  description: string;
  numberOfMembers: number | string;
  location: string;
  sessionFrequency: string;
  genre: string[];
  isPermanent: boolean;
  image: string;
  webpage: string;
  createdAt: Date;
}

interface Props {
  ensemble: Ensemble;
  key: number;
}
export default function EnsembleCard({ ensemble }: Props) {
  return (
    <div className="instrument-wrapper flex flex-col  border-solid border-1px border-gray-400 rounded-base shadow-base">
      <Image src={ensemble.image} alt={ensemble.name} className="w-100%" />
      <TextHeadline
        variant="h3"
        size="sm"
        className="px-4 pt-3 pb-4 border-t-1px border-t-solid border-t-gray-400"
      >
        {ensemble.name}
      </TextHeadline>
    </div>
  );
}
