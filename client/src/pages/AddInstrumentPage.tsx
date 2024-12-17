import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import TextHeadline from "../components/atoms/TextHeadline";
import { Dropdown } from "../components/molecules/Dropdown";
import { DropdownWithTags } from "../components/molecules/DropdownWithTags";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
import { InstrumentType } from "../types/InstrumentType";
import { musicGenresOptions } from "../utilities/musicGenresOptions";
import TextBody from "../components/atoms/TextBody";
import { User } from "../types/UserType";
import { levelDescriptions } from "../utilities/levelDescriptions";
import { UserInstrumentType } from "../types/userInstrumentType";
import { useNavigate } from "@tanstack/react-router";

export default function AddInstrumentPage() {
  // TO DO: Add validation
  // TO DO: Add error handling
  // states
  const [hasChanges, setHasChanges] = useState(false);
  const [level, setLevel] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType | null>(null);

  const { userId } = getUserIdFromCookie();
  const navigate = useNavigate();

  // Fetch Data
  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");
  const userInstrumentsFetch = useFetch<UserInstrumentType[]>(
    [],
    `/userInstruments/user/${userId}`,
    "GET"
  );

  const instrumentData: UserInstrumentType = {
    userId,
    instrumentId: selectedInstrument?._id || "",
    levelOfExperience: level.toString(),
    genres: selectedGenres,
    name: selectedInstrument?.name || "",
  };

  const { triggerFetch: fetchUserInstrumentsTrigger } = useFetch<Partial<User> | null>(
    null,
    "/userInstruments",
    "POST",
    { "Content-Type": "application/json" },
    instrumentData
  );

  // Fetch Trigger on Load
  useEffect(() => {
    if (instrumentsFetch.data.length === 0) {
      instrumentsFetch.triggerFetch();
    }
    if (userInstrumentsFetch.data.length === 0) {
      userInstrumentsFetch.triggerFetch();
    }
  }, [instrumentsFetch, userInstrumentsFetch]);

  // Handlers
  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
    setHasChanges(true);
  };

  const handleIncrease = () => setLevel((prev) => Math.min(prev + 1, 10));
  const handleDecrease = () => setLevel((prev) => Math.max(prev - 1, 1));

  const handleAddInstrument = () => {
    fetchUserInstrumentsTrigger();
    alert(`Instrument added to your profile`);
    navigate({ to: `/profile/${userId}` });
  };

  const handleBackButtonClick = () => {
    if (
      hasChanges &&
      !window.confirm("You have unsaved changes. Are you sure you want to go back?")
    )
      return;
    navigate({ to: `/profile/${userId}` });
  };

  // Filter Available Instruments, the ones that are not already in the user's profile
  const availableInstruments = instrumentsFetch.data.filter(
    (instrument) =>
      !userInstrumentsFetch.data.some(
        (userInstrument) => userInstrument.instrumentId === instrument._id
      )
  );

  // Helper function to get level description
  const getDescription = (level: number) => levelDescriptions[level];

  return (
    <div className="add-instrument-page-wrapper flex flex-col gap-6 p-6">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          onClick={handleBackButtonClick}
          buttonVariant="secondary"
          iconPosition="none"
          className="w-fit no-underline"
          buttonLabel="Back"
        />
      </div>
      <div className="instrument-wrapper flex flex-col gap-6">
        <TextHeadline variant="h2" size="sm">
          Add Instrument
        </TextHeadline>
        <Dropdown
          initialSelectedLabel="Choose an instrument"
          options={availableInstruments.map((instrument) => instrument.name)}
          selectedOption={selectedInstrument ? selectedInstrument.name : ""}
          onSelect={(value) => {
            const selectedInstrumentObj = availableInstruments.find(
              (instrument) => instrument.name === value
            );
            if (selectedInstrumentObj) {
              setSelectedInstrument(selectedInstrumentObj);
              setHasChanges(true);
            }
          }}
          className="w-auto"
        />
        <div>
          <TextHeadline variant="h3" size="sm">
            How experienced are you?
          </TextHeadline>
          <div className="border-solid border-1px border-gray-300 p-4 rounded-md shadow-base">
            <div className="flex flex-row gap-4">
              <TextHeadline variant="h3" size="sm">
                Level {level}
              </TextHeadline>
              <div className="flex items-center">
                <button
                  onClick={handleDecrease}
                  disabled={level === 1}
                  className={`border-solid border-1px border-gray-300 bg-transparent px-2 py-1 rounded-l-sm hover:bg-gray-200 ${level === 1 ? "opacity-50 cursor-not-allowed text-gray-300" : "text-red-500"}`}
                >
                  −
                </button>
                <button
                  onClick={handleIncrease}
                  disabled={level === 10}
                  className={`border-solid border-1px border-l-none border-gray-300 bg-transparent px-2 py-1 rounded-r-sm hover:bg-gray-200 ${level === 10 ? "opacity-50 cursor-not-allowed text-gray-300" : "text-red-500"}`}
                >
                  +
                </button>
              </div>
            </div>
            <TextBody variant="p" size="sm">
              {getDescription(level)}
            </TextBody>
          </div>
        </div>
        <div>
          <TextHeadline variant="h3" size="sm">
            Genre
          </TextHeadline>
          <DropdownWithTags
            options={musicGenresOptions}
            selectedTags={selectedGenres}
            onTagChange={handleGenreChange}
            className="w-full"
          />
        </div>
        <div className="w-full h-full">
          <Button
            buttonVariant="primary"
            onClick={handleAddInstrument}
            iconPosition="none"
            size="lg"
          >
            Add Instrument
          </Button>
        </div>
      </div>
    </div>
  );
}
