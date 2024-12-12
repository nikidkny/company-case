import { useParams } from "@tanstack/react-router";
import TextHeadline from "../components/atoms/TextHeadline";
import { useStore } from "../store/useStore";

export default function CreateEnsemblePostPage() {
  const { ensemblesId } = useParams({ strict: false });
  const { selectedEnsembleOption } = useStore();
  console.log(selectedEnsembleOption);
  //   const {
  //     data: ensemble,
  //     triggerFetch: triggerFetchEnsembleDetails,
  //     shouldFetch,
  //   } = useFetch<EnsembleType>(
  //     {
  //       _id: "",
  //       name: "",
  //       memberList: [],
  //       createdBy: "",
  //       description: "",
  //       numberOfMembers: 0,
  //       zip: "",
  //       city: "",
  //       sessionFrequency: "",
  //       genres: [],
  //       isPermanent: false,
  //       //image: "",
  //       activeMusicians: "",
  //       webpage: "",
  //       createdAt: "",
  //     },
  //     `/ensembles/${ensemblesId}`,
  //     "GET"
  //   );

  //   useEffect(() => {
  //     if (ensemblesId) {
  //       triggerFetchEnsembleDetails();
  //     }
  //   }, [ensemblesId]);
  return (
    <>
      <div className="p-6 flex flex-col justify-around gap-6 bg-gray-300">
        <TextHeadline variant="h3" size="lg">
          Create post for {selectedEnsembleOption.label}
        </TextHeadline>
      </div>
    </>
  );
}
