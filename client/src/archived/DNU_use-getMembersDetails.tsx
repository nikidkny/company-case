// import { useEffect, useState } from "react";
// import { useFetch } from "./use-fetch";

// interface MemberDetails {
//   firstName: string;
//   lastName: string;
// }
// export function useGetMembersDetails({ membersIds }: { membersIds: string[] }) {
//   const [membersDetails, setMembersDetails] = useState<MemberDetails[]>([]); // You can create a type for the member details.
//   const [error, setError] = useState<string | null>(null);
//   const [shouldFetch, setShouldFetch] = useState(false);

//   const triggerFetch = () => {
//     setShouldFetch(true);
//     console.log("running");
//   };
//   console.log("membersIds", membersIds);

//   const { data, loading } = useFetch<MemberDetails[]>(
//     [],
//     "/users/details",
//     "POST",
//     {
//       "Content-Type": "application/json",
//     },
//     { membersIds: membersIds }
//   );

//   useEffect(() => {
//     if (!shouldFetch) return;
//     if (data) {
//       setMembersDetails(data);
//       console.log("data", data); // Assuming `data` contains the users' details with first and last name.
//     }

//     if (loading) {
//       // Optionally handle loading state here.
//     }

//     if (error) {
//       // Optionally handle error state here.
//       setError(error);
//     }
//   }, [data, loading, error, shouldFetch]);

//   return { membersDetails, error, loading, triggerFetch };
// }
