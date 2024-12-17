import { useEffect } from "react";
import { getUserIdFromCookie } from "../hooks/getCookies";
import { useFetch } from "../hooks/use-fetch";
// import { useStore } from "../store/useStore";
import { User } from "../types/UserType";
import { InstrumentType } from "../types/InstrumentType";
import { Dropdown } from "../components/molecules/Dropdown";
import { useStore } from "../store/useStore";
import Button from "../components/atoms/Button";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import TextHeadline from "../components/atoms/TextHeadline";
import TextBody from "../components/atoms/TextBody";
import MusicianCard from "../components/molecules/MusicianCard";

export default function MusiciansPage() {
  //   const { user } = useStore();
  const { filterOption, setFilterOption } = useStore();
  const { userId } = getUserIdFromCookie();
  console.log("userId", userId);

  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");
  //resets the filterOption when coming back to the page
  useEffect(() => {
    setFilterOption(null);
  }, [setFilterOption]);
  const { data: musicians, triggerFetch: musiciansTrigger } = useFetch<Partial<User>[] | null>(
    null,
    "/users",
    "GET"
  );

  useEffect(() => {
    musiciansTrigger();
    if (instrumentsFetch.data.length === 0) {
      instrumentsFetch.triggerFetch();
    }
  }, [musiciansTrigger, instrumentsFetch]);

  console.log("users", musicians);
  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 flex flex-col gap-6 border-b-gray-400 border-b-1px border-b-solid">
        <TextHeadline variant="h3" size="lg">
          Find musicians
        </TextHeadline>
        <TextBody variant="span">{musicians?.length} results found</TextBody>
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
          {/* {filterOption && ( */}
          <Button
            buttonState="default"
            buttonLabel="Clear filter options"
            buttonVariant="secondary"
            iconPosition="none"
            className="no-underline w-full py-2"
            onClick={() => setFilterOption(null)}
          />
          {/* )} */}
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6">
        {musicians &&
          musicians.map((musician) => (
            <MusicianCard key={musician._id} musician={musician}></MusicianCard>
          ))}
      </div>
    </div>
  );
}
