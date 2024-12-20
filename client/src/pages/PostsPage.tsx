import TextHeadline from "../components/atoms/TextHeadline";
import { useFetch } from "../hooks/use-fetch";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import TextBody from "../components/atoms/TextBody";
import { Dropdown } from "../components/molecules/Dropdown";
import { InstrumentType } from "../types/InstrumentType";
import Button from "../components/atoms/Button";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import PostCard from "../components/molecules/PostCard";
// import { EnsemblePostsType } from "../types/EnsemblePostsType";
// import { EnsembleType } from "../types/EnsembleType";
import { PostWithEnsembleType } from "../types/PostWithEnsembleType";

//TODO: this page will be ensembles posts page and will need to be reworked.
export default function PostsPage() {
  const { posts, setPosts, filterOption, setFilterOption } = useStore();
  const { data: PostWithEnsembleData, triggerFetch: fetchPostWithEnsemble } = useFetch<
    PostWithEnsembleType[]
  >([], "/posts", "GET");
  // const { data: ensemblePostsData, triggerFetch: fetchEnsemblePosts } = useFetch<
  //   EnsemblePostsType[]
  // >([], "/ensemblePosts", "GET");
  // const ensemblesData = useFetch<EnsembleType[]>([], "/ensembles", "GET");
  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");
  const [filteredPosts, setFilteredPosts] = useState<PostWithEnsembleType[]>([]);

  // Trigger fetch only when ensembles are empty
  useEffect(() => {
    if (posts.length === 0 && !PostWithEnsembleData.length) fetchPostWithEnsemble();
    // Only fetch if ensembles or instruments are not yet loaded
    if (instrumentsFetch.data.length === 0) instrumentsFetch.triggerFetch();
    // if (ensemblePostsData.length === 0) fetchEnsemblePosts();
    // if (ensemblesData.data.length === 0) ensemblesData.triggerFetch();
  }, [
    posts,
    fetchPostWithEnsemble,
    PostWithEnsembleData,
    instrumentsFetch,
    // ensemblePostsData,
    // fetchEnsemblePosts,
    // ensemblesData,
  ]);

  // Ensure filteredPosts is set correctly on initial load
  useEffect(() => {
    if (PostWithEnsembleData.length === 0) {
      fetchPostWithEnsemble();
    }
  }, [PostWithEnsembleData, fetchPostWithEnsemble]);

  // Set fetched data into the store
  // useEffect(() => {
  //   if (postsData.length > 0 && JSON.stringify(posts) !== JSON.stringify(postsData)) {
  //     console.log("posts", posts);
  //     console.log("postsData", postsData);
  //     setPosts(postsData); // Set the fetched posts with ensemble data
  //   }
  // }, [postsData, setPosts, posts]);
  // get from fetched data the posts and set them in the store
  useEffect(() => {
    if (PostWithEnsembleData.length > 0) {
      const transformedPosts = PostWithEnsembleData.map((item) => ({
        ...item.post,
      }));

      setPosts(transformedPosts);
    }
  }, [PostWithEnsembleData, setPosts]);
  // console.log("posts", posts);
  // console.log("PostWithEnsembleData", PostWithEnsembleData);

  // Filter posts based on selected instrument
  useEffect(() => {
    if (filterOption) {
      const filtered = PostWithEnsembleData.filter((item) =>
        item.post.instrument.includes(filterOption)
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(PostWithEnsembleData);
    }
  }, [filterOption, PostWithEnsembleData]);

  return (
    <div>
      <div className="p-6 flex flex-col justify-around gap-4">
        <TextHeadline variant="h3" size="lg">
          Find ensemble
        </TextHeadline>
        <TextBody variant="span">{filteredPosts.length} results found</TextBody>
        <Dropdown
          initialSelectedLabel="Choose an instrument"
          options={instrumentsFetch.data.map((instrument) => instrument.name)}
          selectedOption={filterOption}
          onSelect={(value) => setFilterOption(value as string)}
          className="w-auto"
        />
        <div className="flex flex-row items-center justify-between gap-3 w-full items-stretch text-blue-500">
          {/* //TODO: finish adding filter options as needed */}
          <Button
            buttonState="default"
            buttonLabel="Filters"
            buttonVariant="secondary"
            iconPosition="leading"
            icon={ICON_NAMES.filter_icon}
            iconHeight={22.887}
            iconWidth={24.887}
            iconViewbox={"0 0 23.887 17.887"}
            className="no-underline w-full py-2"
          />
          <Button
            buttonState="default"
            buttonLabel="Clear filter options"
            buttonVariant="secondary"
            iconPosition="none"
            className="no-underline w-full py-2"
            onClick={() => setFilterOption(null)}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col justify-around gap-4 bg-gray-300">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item, index) => (
            <PostCard key={index} post={item.post} ensemble={item.ensemble} />
          ))
        ) : (
          <TextBody variant="p" size="md">
            No ensembles available
          </TextBody>
        )}
      </div>
    </div>
  );
}
