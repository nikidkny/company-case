import { useEffect } from "react";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
import { useStore } from "../store/useStore";
import { User } from "../types/UserType";
import { InstrumentType } from "../types/InstrumentType";
import { UserInstrumentType } from "../types/userInstrumentType";
import { Dropdown } from "../components/molecules/Dropdown";
import Button from "../components/atoms/Button";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import TextHeadline from "../components/atoms/TextHeadline";
import TextBody from "../components/atoms/TextBody";
import MusicianCard from "../components/molecules/MusicianCard";

export default function MusiciansPage() {
  // States
  const { filterOption, setFilterOption } = useStore();
  const { userId } = getUserIdFromCookie();

  // Instrument fetch
  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");

  // Fetch musicians
  const { data: allMusicians, triggerFetch: fetchAllMusicians } = useFetch<Partial<User>[] | null>(
    null,
    "/users",
    "GET"
  );
  // Fetch all musicians' instruments except the logged-in user
  const { data: allMusicianInstruments, triggerFetch: fetchMusicianInstruments } = useFetch<
    UserInstrumentType[]
  >([], `/userInstruments/excludeUser/${userId}`, "GET");

  useEffect(() => {
    // Reset filter option on page load
    setFilterOption(null);
  }, [setFilterOption]);

  useEffect(() => {
    // Fetch data on page load
    fetchAllMusicians();
    fetchMusicianInstruments();

    if (instrumentsFetch.data.length === 0) {
      instrumentsFetch.triggerFetch();
    }
  }, [fetchAllMusicians, instrumentsFetch, fetchMusicianInstruments]);

  // Filter instruments for musicians
  const filteredMusiciansWithInstruments =
    allMusicians
      ?.map((musician) => ({
        ...musician,
        instruments: allMusicianInstruments.filter(
          (instrument) => instrument.userId === musician._id
        ),
      }))
      .filter((musician) => musician.instruments.length > 0) || [];

  // Apply filtering based on the selected instrument from the dropdown
  const displayedMusicians = filterOption
    ? filteredMusiciansWithInstruments.filter((musician) =>
        musician.instruments.some(
          (instrument) => instrument.name.toLowerCase() === filterOption.toLowerCase()
        )
      )
    : filteredMusiciansWithInstruments;

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 flex flex-col gap-6 border-b-gray-400 border-b-1px border-b-solid">
        <TextHeadline variant="h3" size="lg">
          Find musicians
        </TextHeadline>
        <TextBody variant="span">{displayedMusicians.length} results found</TextBody>
        <Dropdown
          initialSelectedLabel="Choose an instrument"
          options={instrumentsFetch.data.map((instrument) => instrument.name)}
          selectedOption={filterOption}
          onSelect={(value) => setFilterOption(value)}
          className="w-full"
        />
        <div className="flex flex-row items-center justify-between gap-3 w-full items-stretch">
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
      <div className="flex flex-col gap-6 p-6">
        {displayedMusicians.length > 0 ? (
          displayedMusicians.map((musician) => (
            <MusicianCard
              key={musician._id}
              musician={musician}
              instruments={musician.instruments}
            />
          ))
        ) : (
          <TextHeadline variant="h3" size="lg">
            No musicians found
          </TextHeadline>
        )}
      </div>
    </div>
  );
}
