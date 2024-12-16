import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import TextHeadline from "../components/atoms/TextHeadline";
import { Dropdown } from "../components/molecules/Dropdown";
import { DropdownWithTags } from "../components/molecules/DropdownWithTags";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
// import { useStore } from "../store/useStore";
import { InstrumentType } from "../types/InstrumentType";
import { musicGenresOptions } from "../utilities/musicGenresOptions";
import TextBody from "../components/atoms/TextBody";
import { User } from "../types/UserType";

export default function AddInstrumentPage() {
  const { userId } = getUserIdFromCookie();
  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");
  useEffect(() => {
    if (instrumentsFetch.data.length === 0) {
      instrumentsFetch.triggerFetch();
    }
  }, [instrumentsFetch]);

  const [level, setLevel] = useState(1);
  const descriptions: { [key: number]: string } = {
    1: "Passer til en musiker der har spillet under 1 år og kan spille efter simple/forsimplede noder.",
    2: "Passer til en musiker der har spillet 1-2 år og kan spille efter simple/forsimplede noder.",
    3: "Passer til en musiker der har spillet 2-4 år og kan spille efter lettere komplekse noder.",
    4: "Passer til en musiker der har spillet 4-6 år og kan spille efter lettere komplekse noder.",
    5: "Passer til en musiker der har spillet 6-10 år og kan spille efter komplekse noder.",
    6: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
    7: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
    8: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
    9: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
    10: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.",
  };

  // Function to get the description based on the level
  const getDescription = (level: number) => {
    return descriptions[level];
  };

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string>("");

  const instrumentData = {
    userId,
    name: selectedInstrument,
    levelOfExperience: level.toString(),
    genres: selectedGenres,
  };

  const { triggerFetch: userFetchTrigger } = useFetch<Partial<User> | null>(
    null,
    "/userInstruments",
    "POST",
    { "Content-Type": "application/json" },
    instrumentData
  );

  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleIncrease = () => {
    setLevel((prev) => Math.min(prev + 1, 10));
  };

  const handleDecrease = () => {
    setLevel((prev) => Math.max(prev - 1, 1));
  };

  const handleAddInstrument = () => {
    userFetchTrigger();
  };

  return (
    <div className="add-instrument-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          to={`/profile/${userId}`}
          params={{ userId }}
          buttonVariant="secondary"
          iconPosition="none"
          className="w-fit no-underline"
          buttonLabel="Back"
        ></Button>
      </div>
      <div className="instrument-wrapper flex flex-col gap-6">
        <TextHeadline variant="h2" size="sm">
          Add Instrument
        </TextHeadline>
        <Dropdown
          initialSelectedLabel="Choose an instrument"
          options={instrumentsFetch.data.map((instrument) => instrument.name)}
          selectedOption={selectedInstrument}
          onSelect={(value) => setSelectedInstrument(value)}
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
                  className={`border-solid border-1px border-gray-300 bg-transparent  px-2 py-1 rounded-l-sm hover:bg-gray-200 ${level === 1 ? "opacity-50 cursor-not-allowed text-gray-300" : "text-red-500"}`}
                  disabled={level === 1}
                >
                  −
                </button>
                <button
                  onClick={handleIncrease}
                  className={`border-solid border-1px border-l-none border-gray-300 bg-transparent  px-2 py-1 rounded-r-sm hover:bg-gray-200 ${level === 10 ? "opacity-50 cursor-not-allowed text-gray-300" : "text-red-500"}`}
                  disabled={level === 10}
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
