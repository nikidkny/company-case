import { EnsembleType } from "./EnsembleType";
import { PostType } from "./PostType";

export type PostWithEnsembleType = {
  post: PostType;
  ensemble: EnsembleType;
};
