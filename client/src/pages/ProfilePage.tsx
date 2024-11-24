import Button from "../components/atoms/Button";
import ImageInput from "../components/atoms/ImageInput";
import ProfileBadge from "../components/atoms/ProfileBadge";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import EnsembleCard from "../components/molecules/EnsembleCard";
import InstrumentCard from "../components/molecules/InstrumentCard";
import PostCard from "../components/molecules/PostCard";
import mockUsers from "../../../server/src/seeder/mockUsers";
import mockPosts from "../../../server/src/seeder/mockPosts";
import mockEnsembles from "../../../server/src/seeder/mockEnsembles";

export default function ProfilePage() {
  const user = mockUsers[0]; // Assuming the first user is the logged-in user
  const instruments = {
    [0]: {
      name: "Guitar",
      level: "3",
      genres: [
        "Rock",
        "Pop",
        "Jazz",
        "Blues",
        "Metal",
        "Funk",
        "Country",
        "Reggae",
        "R&B",
        "Soul",
        "Classical",
        "Punk",
        "Indie",
        "Alternative",
        "Hip-Hop",
        "Electronic",
        "Dance",
        "Folk",
        "Latin",
        "World",
        "Experimental",
        "Grunge",
      ],
    },
    [1]: {
      name: "Drums",
      level: "2",
      genres: ["Rock", "Pop"],
    },
    [2]: {
      name: "Piano",
      level: "1",
      genres: ["Rock", "Pop"],
    },
  };
  const ensembles = mockEnsembles.filter(
    (ensemble) => ensemble.memberList.includes(user._id) || ensemble.createdBy.equals(user._id)
  );
  const posts = mockPosts.filter((post) => post.createdBy.equals(user._id));
  console.log(user);
  return (
    <div className="flex flex-col gap-6">
      <div className="profile-base-wrapper p-4 border-y-solid border-y-gray-400 border-y-1px">
        <div className="flex flex-row">
          {/*TO DO: have to add that the user image is the src if there is */}
          <ImageInput onImageChange={(file) => console.log(file)} className="w-33%" />
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 items-center">
              <TextHeadline variant="h1" size="sm">
                {user.firstName} {user.lastName}
              </TextHeadline>
              {user.isAvailable && (
                <ProfileBadge ProfileBageLabel="Seeking" ProfileBadgeSize="sm" />
              )}
            </div>
            <TextBody>{user.createdAt.toDateString()}</TextBody>
            <TextBody>{user.lastLoggedIn.toDateString()}</TextBody>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <Button
            buttonVariant="secondary"
            onClick={() => console.log("Edit profile")}
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
        <TextBody size="lg">{user.description}</TextBody>
      </div>
      <div className="profile-instruments-wrapper flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <div className="flex flex-row gap-6 justify-between">
          <TextHeadline variant="h3" size="sm">
            My Instruments
          </TextHeadline>
          <div>
            <Button
              buttonVariant="secondary"
              onClick={() => console.log("Edit instruments")}
              iconPosition="none"
            >
              Add
            </Button>
          </div>
        </div>
        {/* TO DO: map through logged in user's instruments for now it is static insturment */}
        {Object.values(instruments).length > 0 ? (
          Object.values(instruments).map((instrument, index) => (
            <InstrumentCard key={index} instrument={instrument} />
          ))
        ) : (
          <div>No instruments available</div>
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
              onClick={() => console.log("Create ensembles")}
              iconPosition="none"
            >
              Create
            </Button>
          </div>
        </div>
        {ensembles.map((ensemble, index) => (
          <EnsembleCard key={index} ensemble={ensemble} />
        ))}
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
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
}
