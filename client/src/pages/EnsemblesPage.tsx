import TextHeadline from "../components/atoms/TextHeadline";
import EnsembleCard from "../components/molecules/EnsembleCard";
import { useFetch } from "../hooks/use-fetch";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import { EnsembleType } from "../types/EnsembleType";

export default function EnsemblesPage() {
  const { ensembles, setEnsembles } = useStore();
  const { data, triggerFetch } = useFetch<EnsembleType[]>([], "/ensembles", "GET");

  // Trigger fetch only when ensembles are empty
  useEffect(() => {
    if (ensembles.length === 0) {
      triggerFetch(); // Only fetch if ensembles are not yet loaded
    }
  }, [ensembles, triggerFetch]);

  // Set fetched data into the store
  useEffect(() => {
    if (data.length > 0) {
      setEnsembles(data); // This will correctly replace the list when fetching data
    }
  }, [data, setEnsembles]);

  console.log({ ensembles });
  return (
    <div>
      <TextHeadline>Ensembles</TextHeadline>
      <div>
        {ensembles.map((ensemble, index) => (
          <EnsembleCard key={index} ensemble={ensemble} />
        ))}
      </div>
    </div>
  );
}
