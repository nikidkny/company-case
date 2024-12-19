import Button from "../components/atoms/Button";
import ProfileBadge from "../components/atoms/ProfileBadge";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import Image from "../components/atoms/Image";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import { Icon } from "../components/atoms/Icon/Icon";
import EnsembleCard from "../components/molecules/EnsembleCard";
import { EnsembleType } from "../types/EnsembleType";
import { getUserIdFromCookie } from "../hooks/getCookies";
import InstrumentCard from "../components/molecules/InstrumentCard"; // Import InstrumentCard component
import { UserInstrumentType } from "../types/userInstrumentType";
// import { PostType } from "../types/PostType";
import PostCard from "../components/molecules/PostCard";
import { PostWithEnsembleType } from "../types/PostWithEnsembleType";

export default function ProfilePage() {
  const { user } = useStore();
  const { userId } = getUserIdFromCookie();
  const [userPosts, setUserPosts] = useState<PostWithEnsembleType[] | null>([]);
  const [UserPostsWithEnsemble, setUserPostsWithEnsemble] = useState<PostWithEnsembleType[] | null>(
    []
  );
  //utility to format dates
  const formatDate = (date?: Date | string): string => {
    if (!date) return "N/A"; // Handle undefined or null
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toDateString();
  };
  // get posts created by the logged in user
  const { data: posts, triggerFetch: fetchUserPosts } = useFetch(
    null,
    `/posts/createdBy/${userId}`,
    "GET"
  );
  // get all posts with ensembles
  const { data: PostWithEnsembleData, triggerFetch: fetchPostWithEnsemble } = useFetch<
    PostWithEnsembleType[]
  >([], "/posts", "GET");

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
      setUserPosts(posts);
    }
    if (PostWithEnsembleData.length === 0) {
      fetchPostWithEnsemble();
    }
  }, [userId, fetchUserPosts, posts, fetchPostWithEnsemble, PostWithEnsembleData]);

  // find in the fetched posts that belong to the user and set the userPosts and UserPostsWithEnsemble states
  useEffect(() => {
    if (PostWithEnsembleData.length > 0) {
      const UserPostsWithEnsemble = PostWithEnsembleData.filter(
        (post) => post.post.createdBy === userId
      );
      setUserPostsWithEnsemble(UserPostsWithEnsemble);
      const userPosts = PostWithEnsembleData.filter((post) => post.post.createdBy === userId);
      setUserPosts(userPosts);
    }
  }, [PostWithEnsembleData, userId]);

  console.log("posts", posts);
  console.log("UserPostsWithEnsemble", UserPostsWithEnsemble);
  // console.log("user from profile", user);
  //the user.lastLoggedIn has to be added to the createUserDTO in the backend when the user is created, that's why is appears as undefined.

  //console.log(user.lastLoggedIn);
  // useEffect(() => {
  //   if (userId) {
  //     userFetchTrigger();
  //   }
  // }, [userId, userFetchTrigger]);
  // useEffect(() => {
  //   if (fetchedUser) {
  //     setUser({
  //       id: userId,
  //       firstName: fetchedUser.firstName ? fetchedUser.firstName.charAt(0).toUpperCase() + fetchedUser.firstName.slice(1).toLowerCase() : "",
  //       lastName: fetchedUser.lastName ? fetchedUser.lastName.charAt(0).toUpperCase() + fetchedUser.lastName.slice(1).toLowerCase() : "",
  //       email: fetchedUser.email || "",
  //       description: fetchedUser.description ? fetchedUser.description.charAt(0).toUpperCase() + fetchedUser.description.slice(1).toLowerCase() : "",
  //       birthdate: fetchedUser.birthdate ? new Date(fetchedUser.birthdate) : undefined,
  //       isAvailable: fetchedUser.isAvailable || false,
  //       city: fetchedUser.city ? fetchedUser.city.charAt(0).toUpperCase() + fetchedUser.city.slice(1).toLowerCase() : "",
  //       zip: fetchedUser.zip || "",
  //       phoneNumber: fetchedUser.phoneNumber || "",
  //       image: fetchedUser.image || "",
  //       // show the last logged in date if it is available, otherwise show the created at date
  //       lastLoggedIn: fetchedUser.lastLoggedIn ? new Date(fetchedUser.lastLoggedIn) : new Date(),
  //       createdAt: fetchedUser.createdAt ? new Date(fetchedUser.createdAt) : undefined,
  //       isNewsletter: fetchedUser.isNewsletter || false,
  //       isDeleted: fetchedUser.isDeleted || false,
  //     });
  //   }
  // }, [userId, fetchedUser, setUser]);
  // console.log(user);
  // const { data: userInstrument, triggerFetch: userInstrumentsTrigger } =
  //   useFetch<Partial<Instrument> | null>(null, userId ? `/instruments/${userId}` : null, "GET");

  // useEffect(() => {
  //   if (userInstrument) {
  //     userInstrumentsTrigger();
  //   }
  // }, [userInstrument, userInstrumentsTrigger]);

  // console.log("userInstruments", userInstrument);

  const { data: userEnsembles, triggerFetch: fetchUserEnsembles } = useFetch<EnsembleType[] | null>(
    null,
    userId ? `/ensembles/user/${userId}` : null,
    "GET"
  );
  const { data: userInstruments, triggerFetch: fetchUserInstruments } = useFetch<
    UserInstrumentType[] | null
  >(null, userId ? `/userInstruments/user/${userId}` : null, "GET");

  useEffect(() => {
    if (userId) {
      fetchUserEnsembles();
      fetchUserInstruments();
    }
  }, [userId, fetchUserEnsembles, fetchUserInstruments]);

  // console.log("userEnsembles", userEnsembles);
  // console.log("userInstruments", userInstruments);
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="profile-base-wrapper p-4 border-y-solid border-y-gray-400 border-y-1px">
        <div className="flex flex-row gap-4 pb-4">
          {/*TODO: have to add that the user image is the src if there is */}
          {user?.image ? (
            <Image src={user?.image} alt="Profile Image" className="rounded-full h-24 w-24" />
          ) : (
            <Icon
              name={ICON_NAMES.profile_placeholder}
              height={91}
              width={91}
              viewBox="0 0 91 91"
              className="rounded-full"
            />
          )}

          <div className="flex flex-col">
            <div className="flex flex-row gap-4 items-center">
              <TextHeadline variant="h1" size="sm">
                {fullName}
              </TextHeadline>
              {user?.isAvailable && (
                <ProfileBadge ProfileBadgeLabel="Seeking" ProfileBadgeSize="sm" />
              )}
            </div>
            <TextBody>{formatDate(user.createdAt)}</TextBody>
            <TextBody>{formatDate(user.lastLoggedIn)}</TextBody>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            buttonVariant="secondary"
            to="/profile/$profileId/edit"
            params={{ profileId: userId }}
            iconPosition="none"
            buttonLabel="Edit Profile"
            className="no-underline"
          ></Button>
          <Button
            buttonVariant="secondary"
            to="/profile/$profileId/settings"
            params={{ profileId: userId }}
            iconPosition="none"
            buttonLabel="Settings"
            className="no-underline"
          ></Button>
        </div>
      </div>
      <div className="profile-description-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            Description
          </TextHeadline>
          <div className="flex-0">
            <Button
              buttonVariant="secondary"
              to="/profile/$profileId/edit"
              params={{ profileId: userId }}
              iconPosition="none"
              buttonLabel="Edit"
              className="no-underline"
            ></Button>
          </div>
        </div>
        <TextBody size="lg">{user?.description}</TextBody>
      </div>
      <div className="profile-instruments-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            My Instruments
          </TextHeadline>
          <div>
            <Button
              buttonVariant="secondary"
              to="/profile/$profileId/instruments/add"
              params={{ profileId: userId }}
              iconPosition="none"
              buttonLabel="Add"
              className="no-underline"
            ></Button>
          </div>
        </div>
        {/* TO DO: map through logged in user's instruments for now it is static insturment */}
        {/* {Object.values(instruments).length > 0 ? (
          Object.values(instruments).map((instrument, index) => (
            <InstrumentCard key={index} instrument={instrument} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Icon
              name={ICON_NAMES.posts_empty}
              height={120.989}
              width={110.122}
              viewBox="0 0 110.122 120.989"
            />
            <TextHeadline variant="h3" size="sm">
              No instruments
            </TextHeadline>
            <TextBody className="text-center">
              Add an instrument you can play so ensembles and musicians can find you.{" "}
            </TextBody>
          </div>
        )}
      </div>
      <div className="profile-ensembles-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            My Ensembles
          </TextHeadline>
          <div>
            <Button
              buttonVariant="secondary"
              to="/ensembles/create"
              iconPosition="none"
              buttonLabel="Create"
              className="no-underline"
            ></Button>
          </div>
        </div>
        {userEnsembles && userEnsembles.length > 0 ? (
          userEnsembles.map((ensemble, index) => <EnsembleCard key={index} ensemble={ensemble} />)
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Icon
              name={ICON_NAMES.posts_empty}
              height={120.989}
              width={110.122}
              viewBox="0 0 110.122 120.989"
            />
            <TextHeadline variant="h3" size="sm">
              No ensembles
            </TextHeadline>
            <TextBody className="text-center">
              If you represent an ensemble, you can create it here so you can make a post on behalf
              of the ensemble.
            </TextBody>
          </div>
        )}
      </div>
      <div className="profile-posts-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            My Posts
          </TextHeadline>
          <div>
            <Button
              buttonVariant="secondary"
              to="/posts/create/"
              iconPosition="none"
              buttonLabel="Create"
              className="no-underline"
            ></Button>
          </div>
        </div>
        {/* TO DO: map through logged in user's posts for now it is static posts */}
        {UserPostsWithEnsemble ? (
          UserPostsWithEnsemble.map((item, index) => (
            <PostCard key={index} post={item.post} ensemble={item.ensemble} />
          ))
        ) : (
          <div className="flex flex-col items-center gap-4">
            <Icon
              name={ICON_NAMES.posts_empty}
              height={120.989}
              width={110.122}
              viewBox="0 0 110.122 120.989"
            />
            <TextHeadline variant="h3" size="sm">
              No posts
            </TextHeadline>
            <TextBody className="text-center">
              Create a post to let other musicians or ensembles ensbmbles know what you are looking
              for.
            </TextBody>
          </div>
        )}
      </div>
    </div>
  );
}
