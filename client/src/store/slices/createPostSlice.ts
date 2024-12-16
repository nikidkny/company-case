import { StateCreator } from "zustand";
import { DropdownOptionType } from "../../components/molecules/Dropdown";
import { PostType } from "../../types/PostType";

// export interface selectedEnsembleOption {
//   value: string;
//   label: string;
// }

export interface CreatePostState {
  selectedEnsembleOption: DropdownOptionType;
  postTitle: string;
  postDescription: string;
  postInstrument: DropdownOptionType;
  experienceRequired: number;
  postGenres: string[];
  posts: PostType[];
  setPosts: (posts: PostType | PostType[]) => void;

  // Actions
  setSelectedEnsembleOption: (selectedEnsembleOption: DropdownOptionType) => void;
  setPostTitle: (postTitle: string) => void;
  setPostDescription: (postDescription: string) => void;
  setPostInstrument: (postInstrument: DropdownOptionType) => void;
  setExperienceRequired: (experienceRequired: number) => void;
  setPostGenres: (postGenre: string) => void;
  removePostGenre: (postGenre: string) => void;
  resetPostData: () => void;
}

export const createPostSlice: StateCreator<CreatePostState, [], [], CreatePostState> = (set) => ({
  // Initial state
  posts: [],
  selectedEnsembleOption: { value: "", label: "" },
  postTitle: "",
  postDescription: "",
  postInstrument: { value: "", label: "" },
  experienceRequired: 1,
  postGenres: [],

  // Actions
  setSelectedEnsembleOption: (selectedEnsembleOption) => set(() => ({ selectedEnsembleOption })),
  setPostTitle: (postTitle) => set(() => ({ postTitle })),
  setPostDescription: (postDescription) => set(() => ({ postDescription })),
  setPostInstrument: (postInstrument) => set(() => ({ postInstrument })),
  setExperienceRequired: (experienceRequired) => set(() => ({ experienceRequired })),
  setPostGenres: (postGenre) =>
    set((state) => ({
      postGenres: [...state.postGenres, postGenre],
    })),
  removePostGenre: (postGenre) =>
    set((state) => ({
      postGenres: state.postGenres.filter((g) => g !== postGenre),
    })),

  // Append the post to the array of posts
  setPosts: (posts: PostType | PostType[]) =>
    set((state) => {
      if (Array.isArray(posts)) {
        // If it's an array, append it to the current posts list
        return { posts: [...state.posts, ...posts] };
      } else {
        // If it's a single post, append it to the list
        return { posts: [...state.posts, posts] };
      }
    }),

  // Reset data
  resetPostData: () =>
    set(() => ({
      selectedEnsembleOption: { value: "", label: "" },
      postTitle: "",
      postDescription: "",
      postInstrument: { value: "", label: "" },
      experienceRequired: 1,
      postGenres: [],
    })),
});
