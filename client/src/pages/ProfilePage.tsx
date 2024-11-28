import { jwtDecode } from "jwt-decode";
import Button from "../components/atoms/Button";
import ProfileBadge from "../components/atoms/ProfileBadge";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import { useStore } from "../store/useStore";
import { User } from "../types/UserType";
import { useEffect } from "react";
import { useFetch } from "../hooks/use-fetch";
import Image from "../components/atoms/Image";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import { Icon } from "../components/atoms/Icon/Icon";

export default function ProfilePage() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const cookies = document.cookie.split("; ");
  const authCodeCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));
  const decodedToken: Record<string, any> | null = authCodeCookie
    ? jwtDecode(authCodeCookie.split("=")[1])
    : null;

  const userId = decodedToken?.sub || null;
  const { data: fetchedUser, triggerFetch } = useFetch<Partial<User> | null>(
    null,
    userId ? `/users/${userId}` : null,
    "GET"
  );

  useEffect(() => {
    if (userId) {
      triggerFetch();
    }
  }, [userId, triggerFetch]);

  useEffect(() => {
    if (fetchedUser) {
      setUser({
        id: userId,
        firstName: fetchedUser.firstName || "",
        lastName: fetchedUser.lastName || "",
        email: fetchedUser.email || "",
        description: fetchedUser.description || "Add a description",
        birthdate: fetchedUser.birthdate ? new Date(fetchedUser.birthdate) : undefined,
        isAvailable: fetchedUser.isAvailable || false,
        city: fetchedUser.city || "",
        zip: fetchedUser.zip || "",
        phoneNumber: fetchedUser.phoneNumber || "",
        image: fetchedUser.image || "",
        // show the last logged in date if it is available, otherwise show the created at date
        lastLoggedIn: fetchedUser.lastLoggedIn ? new Date(fetchedUser.lastLoggedIn) : new Date(),
        createdAt: fetchedUser.createdAt ? new Date(fetchedUser.createdAt) : undefined,
        isNewsletter: fetchedUser.isNewsletter || false,
        isDeleted: fetchedUser.isDeleted || false,
      });
    }
  }, [userId, fetchedUser, setUser]);
  console.log(user);
  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;
  // const instruments = {
  //   [0]: {
  //     name: "Guitar",
  //     level: "3",
  //     genres: [
  //       "Rock",
  //       "Pop",
  //       "Jazz",
  //       "Blues",
  //       "Metal",
  //       "Funk",
  //       "Country",
  //       "Reggae",
  //       "R&B",
  //       "Soul",
  //       "Classical",
  //       "Punk",
  //       "Indie",
  //       "Alternative",
  //       "Hip-Hop",
  //       "Electronic",
  //       "Dance",
  //       "Folk",
  //       "Latin",
  //       "World",
  //       "Experimental",
  //       "Grunge",
  //     ],
  //   },
  //   [1]: {
  //     name: "Drums",
  //     level: "2",
  //     genres: ["Rock", "Pop"],
  //   },
  //   [2]: {
  //     name: "Piano",
  //     level: "1",
  //     genres: ["Rock", "Pop"],
  //   },
  // };
  // const ensembles = mockEnsembles.filter(
  //   (ensemble) =>
  //     ensemble.memberList.includes(user?.id) || ensemble.createdBy.equals(mockUser._id)
  // );
  // const fullName = `${mockUser.firstName} ${mockUser.lastName}`;

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
            <TextBody>{user?.createdAt?.toDateString()}</TextBody>
            <TextBody>{user?.lastLoggedIn?.toDateString()}</TextBody>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            buttonVariant="secondary"
            onClick={() => (window.location.href = "/profile/edit")}
            iconPosition="none"
          >
            Edit profile
          </Button>
          <Button
            buttonVariant="secondary"
            onClick={() => console.log("Settings")}
            iconPosition="none"
          >
            Settings
          </Button>
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
            >
              Edit
            </Button>
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
              onClick={() => (window.location.href = "/profile/$profileId/instruments/edit")}
              iconPosition="none"
            >
              Add
            </Button>
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
              onClick={() => (window.location.href = "/ensembles/create")}
              iconPosition="none"
            >
              Create
            </Button>
          </div>
        </div>
        {/* {ensembles.map((ensemble, index) => (
          <EnsembleCard key={index} ensemble={ensemble} />
        ))} */}
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
            >
              Edit
            </Button>
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
