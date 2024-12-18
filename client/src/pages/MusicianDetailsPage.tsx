import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch";
import Image from "../components/atoms/Image";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import { Icon } from "../components/atoms/Icon/Icon";
import TextBody from "../components/atoms/TextBody";
import TextHeadline from "../components/atoms/TextHeadline";
import EnsembleCard from "../components/molecules/EnsembleCard";
import { EnsembleType } from "../types/EnsembleType";
import { useParams } from "@tanstack/react-router";
import ProfileBadge from "../components/atoms/ProfileBadge";
import { User } from "../types/UserType";
import Button from "../components/atoms/Button";
import InstrumentCard from "../components/molecules/InstrumentCard";
import { UserInstrumentType } from "../types/userInstrumentType";

export default function UserDetails() {
  const { userId } = useParams({ from: "/musicians/$userId" });
  const { data: user, triggerFetch: fetchUser } = useFetch<User | null>(
    null,
    userId ? `/users/${userId}` : null,
    "GET"
  );
  console.log("user", user);
  const { data: userEnsembles, triggerFetch: fetchUserEnsembles } = useFetch<EnsembleType[] | null>(
    null,
    userId ? `/ensembles/user/${userId}` : null,
    "GET"
  );

  const { data: userInstruments, triggerFetch: fetchUserInstruments } = useFetch<
    UserInstrumentType[] | null
  >(null, userId ? `/userInstruments/user/${userId}` : null, "GET");
  console.log("userInstruments", userInstruments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchUserEnsembles();
      fetchUserInstruments();
    }
  }, [userId, fetchUser, fetchUserEnsembles, fetchUserInstruments]);

  const formatDate = (date?: Date | string): string => {
    if (!date) return "N/A";
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    return isNaN(parsedDate.getTime()) ? "Invalid Date" : parsedDate.toDateString();
  };

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;

  return (
    <div className="flex flex-col gap-6">
      <Button
        to="/musicians"
        buttonVariant="secondary"
        iconPosition="none"
        className="w-fit no-underline"
        buttonLabel="Back"
      ></Button>
      <div className="p-4 border-y-solid border-y-gray-400 border-y-1px">
        <div className="flex flex-row gap-4 pb-4">
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
            <TextBody>{formatDate(user?.createdAt)}</TextBody>
            <TextBody>{formatDate(user?.lastLoggedIn)}</TextBody>
          </div>
        </div>
        <Button
          onClick={handleContactClick}
          buttonLabel="Contact"
          buttonState="default"
          buttonVariant="primary"
          iconPosition="none"
          className="no-underline w-full"
        />
      </div>
      <div className="flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <TextHeadline variant="h3" size="sm">
          Description
        </TextHeadline>
        <TextBody size="lg">{user?.description}</TextBody>
      </div>
      <div className="flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <TextHeadline variant="h3" size="sm">
          My Ensembles
        </TextHeadline>
        {userEnsembles?.map((ensemble, index) => <EnsembleCard key={index} ensemble={ensemble} />)}
      </div>
      <div className="flex flex-col p-4 border-y-solid border-y-gray-400 border-y-1px gap-6">
        <TextHeadline variant="h3" size="sm">
          My Instruments
        </TextHeadline>
        {userInstruments
          ?.sort((a, b) => b.levelOfExperience - a.levelOfExperience)
          .map((instrument) => (
            <InstrumentCard key={instrument.instrumentId} instrument={instrument} />
          ))}
      </div>
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
              Contact {user?.firstName}
            </TextHeadline>
            <div className="flex flex-col gap-4 w-full">
              {user?.email && (
                <Button
                  onClick={() => (window.location.href = `mailto:${user.email}`)}
                  buttonLabel={`${user.email}`}
                  buttonState="default"
                  buttonVariant="primary"
                  iconPosition="none"
                  size="lg"
                  className="text-body-sm w-full"
                />
              )}
              {user?.phoneNumber && (
                <Button
                  onClick={() => (window.location.href = `tel:${user.phoneNumber}`)}
                  buttonLabel={` ${user.phoneNumber}`}
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
  );
}
