import Button from "../components/atoms/Button";
import ProfileBadge from "../components/atoms/ProfileBadge";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import Image from "../components/atoms/Image";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import { Icon } from "../components/atoms/Icon/Icon";
import EnsembleCard from "../components/molecules/EnsembleCard";
import { EnsembleType } from "../types/EnsembleType";
import { getUserIdFromCookie } from "../hooks/getCookies";

export default function ProfilePage() {
  const { user } = useStore();
  const { userId } = getUserIdFromCookie();
  //utility to format dates
  const formatDate = (date?: Date | string): string => {
    if (!date) return "N/A"; // Handle undefined or null
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toDateString();
  };

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
  useEffect(() => {
    if (userId) {
      fetchUserEnsembles();
    }
  }, [userId, fetchUserEnsembles]);

  // console.log("userEnsembles", userEnsembles);

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;
  // const ensembles = mockEnsembles.filter(
  //   (ensemble) =>
  //     ensemble.memberList.includes(user?.id) || ensemble.createdBy.equals(mockUser._id)

  return (
    <div className="flex flex-col gap-6">
      <div className="profile-base-wrapper p-4 border-y-solid border-y-gray-400 border-y-1px">
        <div className="flex flex-row gap-4 pb-4">
          {/*TO DO: have to add that the user image is the src if there is */}
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
            onClick={() => console.log("Settings")}
            iconPosition="none"
            buttonLabel="Settings"
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
              onClick={() => console.log("Edit description")}
              iconPosition="none"
              buttonLabel="Edit"
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
              to="/profile/$profileId/instruments/edit"
              params={{ profileId: userId }}
              iconPosition="none"
              buttonLabel="Edit"
            ></Button>
          </div>
        </div>
        {/* TO DO: map through logged in user's instruments for now it is static insturment */}
        {/* {Object.values(instruments).length > 0 ? (
          Object.values(instruments).map((instrument, index) => (
            <InstrumentCard key={index} instrument={instrument} />
          ))
        ) : (
          <div>No instruments available</div>
        )} */}
      </div>
      <div className="profile-ensembles-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            My Ensembles
          </TextHeadline>
          <div>
            <Button
              buttonVariant="secondary"
              // onClick={() => (window.location.href = "/ensembles/create")}
              to="/ensembles/create"
              iconPosition="none"
              buttonLabel="Create"
              className="no-underline"
            ></Button>
          </div>
        </div>
        {userEnsembles?.map((ensemble, index) => <EnsembleCard key={index} ensemble={ensemble} />)}
      </div>
      <div className="profile-posts-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            My Posts
          </TextHeadline>
          <div>
            <Button
              buttonVariant="secondary"
              onClick={() => console.log("Create Post")}
              iconPosition="none"
              buttonLabel="Create"
            ></Button>
          </div>
        </div>
        {/* TO DO: map through logged in user's posts for now it is static posts */}
        {/* {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))} */}
      </div>
    </div>
  );
}
