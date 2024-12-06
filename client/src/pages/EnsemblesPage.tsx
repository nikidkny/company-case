import TextHeadline from "../components/atoms/TextHeadline";
import { useFetch } from "../hooks/use-fetch";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import { EnsembleType } from "../types/EnsembleType";
import TextBody from "../components/atoms/TextBody";
import { Dropdown } from "../components/molecules/Dropdown";
import { InstrumentType } from "../types/InstrumentType";
import Button from "../components/atoms/Button";
import { ICON_NAMES } from "../components/atoms/Icon/IconNames";
import EnsembleCard from "../components/molecules/EnsembleCard";

//TODO: this page will be ensembles posts page and will need to be reworked.
export default function EnsemblesPage() {
  const { ensembles, setEnsembles, filterOption, setFilterOption } = useStore();
  const { data, triggerFetch } = useFetch<EnsembleType[]>([], "/ensembles", "GET");

  const instrumentsFetch = useFetch<InstrumentType[]>([], "/instruments", "GET");

  //resets the filterOption when coming back to the page
  useEffect(() => {
    setFilterOption(null);
  }, [setFilterOption]);

  console.log(instrumentsFetch.data);
  console.log(filterOption);

  // Trigger fetch only when ensembles are empty
  useEffect(() => {
    if (ensembles.length === 0 && !data.length) {
      triggerFetch();

      // Only fetch if ensembles or instruments are not yet loaded
    }
    if (!instrumentsFetch.data.length) {
      instrumentsFetch.triggerFetch();
    }
  }, [ensembles, triggerFetch, data, instrumentsFetch]);

  // Set fetched data into the store
  useEffect(() => {
    //saving the data - making sure to avoid duplicates
    if (data.length > 0 && JSON.stringify(ensembles) !== JSON.stringify(data)) {
      setEnsembles(data);
      // This will correctly replace the list when fetching data - avoiding duplication
    }
  }, [data, setEnsembles, ensembles]);

  console.log({ ensembles });
  return (
    <div>
      <div className="p-6 flex flex-col justify-around gap-4">
        <TextHeadline variant="h3" size="lg">
          Find ensemble
        </TextHeadline>
        <TextBody variant="span">{ensembles.length} results found</TextBody>
        <Dropdown initialSelectedLabel="Choose an instrument" options={instrumentsFetch.data.map((instrument) => instrument.name)} selectedOption={filterOption} onSelect={(value) => setFilterOption(value)} className="w-auto" />
        <div className="flex flex-row items-center justify-between gap-3 w-full items-stretch text-blue-500">
          {/* //TODO: finish adding filter options as needed */}
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
          <Button buttonState="default" buttonLabel="Clear filter options" buttonVariant="secondary" iconPosition="none" className="no-underline w-full py-2" onClick={() => setFilterOption(null)} />
        </div>
      </div>
      <div className="p-6 flex flex-col justify-around gap-4 bg-gray-300">
        {ensembles.length > 0 ? (
          ensembles.map((ensemble, index) => <EnsembleCard key={index} ensemble={ensemble} />)
        ) : (
          <TextBody variant="p" size="md">
            No ensembles available
          </TextBody>
        )}
      </div>
    </div>
  );
}
