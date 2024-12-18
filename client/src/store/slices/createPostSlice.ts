import { StateCreator } from "zustand";
import { PostType } from "../../types/PostType";
import { InstrumentType } from "../../types/InstrumentType";

export interface selectedEnsembleOption {
  value: string;
  label: string;
}

export interface CreatePostState {
  selectedEnsembleOption: selectedEnsembleOption;
  postTitle: string;
  postDescription: string;
  postInstrument: InstrumentType;
  experienceRequired: number;
  postGenres: string[];
  posts: PostType[];
  setPosts: (posts: PostType) => void;

  // Actions
  setSelectedEnsembleOption: (selectedEnsembleOption: selectedEnsembleOption) => void;
  setPostTitle: (postTitle: string) => void;
  setPostDescription: (postDescription: string) => void;
  setPostInstrument: (postInstrument: InstrumentType) => void;
  setExperienceRequired: (experienceRequired: number) => void;
  setPostGenres: (postGenre: string[]) => void;
  removePostGenre: (postGenre: string) => void;
  resetPostData: () => void;
}

export const createPostSlice: StateCreator<CreatePostState, [], [], CreatePostState> = (set) => ({
  // Initial state
  posts: [],
  selectedEnsembleOption: { value: "", label: "" },
  postTitle: "",
  postDescription: "",
  postInstrument: { _id: "", name: "" },
  experienceRequired: 1,
  postGenres: [],

  // Actions
  setSelectedEnsembleOption: (selectedEnsembleOption) => set(() => ({ selectedEnsembleOption })),
  setPostTitle: (postTitle) => set(() => ({ postTitle })),
  setPostDescription: (postDescription) => set(() => ({ postDescription })),
  setPostInstrument: (postInstrument) => set(() => ({ postInstrument })),
  setExperienceRequired: (experienceRequired) => set(() => ({ experienceRequired })),
  setPostGenres: (postGenres) =>
    set((state) => ({
      postGenres: [...state.postGenres, ...postGenres],
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
      postInstrument: { _id: "", name: "" },
      experienceRequired: 1,
      postGenres: [],
    })),
});
