import { useParams } from "@tanstack/react-router";
import { useStore } from "../store/useStore";
import TextHeadline from "../components/atoms/TextHeadline";
import TextBody from "../components/atoms/TextBody";
// import EnsembleCard from "../components/molecules/EnsembleCard";
import Button from "../components/atoms/Button";
import { levelDescriptions } from "../utilities/levelDescriptions";
import Badge from "../components/atoms/Badge";
import { useEffect, useState } from "react";
import { Icon } from "../components/atoms/Icon/Icon";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import { useFetch } from "../hooks/use-fetch";
import { User } from "../types/UserType";
import { getUserIdFromCookie } from "../hooks/getCookies";
import EnsembleCard from "../components/molecules/EnsembleCard";
import { PostWithEnsembleType } from "../types/PostWithEnsembleType";

export default function PostDetailsPage() {
  // TO DO: add ensemble card
  const { userId } = getUserIdFromCookie();
  const { postId } = useParams({ from: "/ensembles/posts/$postId" });
  const { posts } = useStore();
  const [post, setPost] = useState(posts.find((post) => post._id === postId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  // get the post by the post id
  // const post = posts.find((post) => post._id === postId);
  // get contact person id by the post createdBy property
  const contactPersonId = post?.createdBy;

  // check if the contact person id is the same as the logged in user id
  const isContactPerson = userId === contactPersonId;

  const formatDate = (date?: Date | string): string => {
    if (!date) return "N/A"; // Handle undefined or null
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toDateString();
  };
  // fetch the contact person by the contact person id
  const { data: contactPerson, triggerFetch: fetchContactPerson } = useFetch<User | null>(
    null,
    `/users/${contactPersonId}`,
    "GET"
  );
  // feth the ensemblePost
  const { data: PostWithEnsembleData, triggerFetch: fetchPostWithEnsemble } =
    useFetch<PostWithEnsembleType | null>(null, `/posts/${postId}`, "GET");
  console.log("post", post);

  useEffect(() => {
    if (!PostWithEnsembleData && !post) {
      setPost(post);
      fetchPostWithEnsemble();
    }
  }, [fetchPostWithEnsemble, PostWithEnsembleData, post]);

  console.log("postsWithEnsemble", PostWithEnsembleData);
  // get the ensemble from the postWithEnsembleData
  const ensemble = PostWithEnsembleData?.ensemble;

  // fetch the contact person when the contact person id changes
  useEffect(() => {
    if (contactPersonId) {
      fetchContactPerson();
    }
  }, [contactPersonId, fetchContactPerson]);

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getDescription = (level: number) => levelDescriptions[level];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-white border-b-solid border-b-1px border-b-gray-400 p-6">
        <Button
          to="/ensembles"
          buttonState="default"
          buttonVariant="secondary"
          iconPosition="none"
          buttonLabel="Back"
          className="w-fit no-underline"
        />
        <div className="flex flex-col items-center gap-4">
          <TextHeadline variant="h3" size="sm" className="text-center">
            {post?.title}
          </TextHeadline>
          <TextBody variant="span" size="sm">
            Post created at {formatDate(post?.createdAt)}
          </TextBody>
          <div className="w-full">
            {ensemble && <EnsembleCard key={1} ensemble={ensemble} variant="post" />}
          </div>
          {isContactPerson && (
            <Button buttonVariant="secondary" size="sm" iconPosition="none" className="w-fit">
              Edit Post
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white border-y-solid border-y-1px border-y-gray-400 p-6">
        <TextHeadline variant="h3" size="sm">
          Description
        </TextHeadline>
        <TextBody variant="p" size="md">
          {post?.description}
        </TextBody>
        <TextHeadline variant="h3" size="sm">
          Minimum experience required
        </TextHeadline>
        <div className="flex flex-col gap-4 border-solid border-1px border-gray-400 p-4 rounded-md shadow-base bg-gray-200 px-4 pb-4 pt-2">
          <TextHeadline variant="h3" size="sm">
            Level {post?.experienceRequired}
          </TextHeadline>
          <TextBody variant="span" size="md">
            {getDescription(post?.experienceRequired || 1)}
          </TextBody>
        </div>
        <TextHeadline variant="h3" size="sm">
          Genre
        </TextHeadline>
        <div className="flex flex-row gap-4">
          {post?.genres.map((genre, index) => (
            <Badge BadgeLabel={genre} BadgeSize="sm" key={index} />
          ))}
        </div>
        <Button
          buttonVariant="primary"
          size="lg"
          iconPosition="none"
          className="w-full"
          onClick={handleContactClick}
        >
          Contact
        </Button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col gap-6 items-center bg-white p-6 rounded-lg shadow-lg w-80">
              <Icon
                name={ICON_NAMES.contact_info}
                height={24}
                width={24}
                viewBox="0 0 24 24"
                className="text-blue-500"
              />
              <TextHeadline variant="h3" size="sm">
                Contact {contactPerson?.firstName}
              </TextHeadline>
              <div className="flex flex-col gap-4 w-full">
                {contactPerson?.email && (
                  <Button
                    onClick={() => (window.location.href = `mailto:${contactPerson.email}`)}
                    buttonLabel={`${contactPerson.email}`}
                    buttonState="default"
                    buttonVariant="primary"
                    iconPosition="none"
                    size="lg"
                    className="text-body-sm w-full"
                  />
                )}
                {contactPerson?.phoneNumber && (
                  <Button
                    onClick={() => (window.location.href = `tel:${contactPerson.phoneNumber}`)}
                    buttonLabel={` ${contactPerson.phoneNumber}`}
                    buttonState="default"
                    buttonVariant="primary"
                    iconPosition="none"
                    size="lg"
                    className="text-body-sm w-full"
                  />
                )}
              </div>
              <Button
                onClick={closeModal}
                buttonLabel="Close"
                buttonState="default"
                buttonVariant="secondary"
                iconPosition="none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
