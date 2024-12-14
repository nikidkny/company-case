import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import TextHeadline from "../components/atoms/TextHeadline";
import { Dropdown } from "../components/molecules/Dropdown";
import { DropdownWithTags } from "../components/molecules/DropdownWithTags";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
import { useStore } from "../store/useStore";
import { InstrumentType } from "../types/InstrumentType";
import { musicGenresOptions } from "../utilities/musicGenresOptions";

export default function AddInstrumentPage() {
  const { user } = useStore();
  const { userId } = getUserIdFromCookie();
  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<string>("");

  useEffect(() => {
    if (instrumentsFetch.data.length === 0) {
      instrumentsFetch.triggerFetch();
    }
  }, [instrumentsFetch]);
  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };
  return (
    <div className="edit-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          to={`/profile/${userId}`}
          params={{ userId }}
          buttonVariant="secondary"
          iconPosition="none"
          className="w-fit"
          buttonLabel="Back"
        ></Button>
      </div>
      <TextHeadline variant="h2" size="sm">
        Add Instrument
      </TextHeadline>
      <div className="edit-name-wrapper">
        <TextHeadline variant="h3" size="sm">
          Name
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
          <div>
            <div>
              <TextHeadline variant="h3" size="sm">
                Level
              </TextHeadline>
              {/* plus and minus buttons missing to change the level */}
            </div>
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
            onClick={() => console.log("Save changes")}
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
