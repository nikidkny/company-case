import Hero from "../components/molecules/Hero";

//the content of the homepage goes here
export default function HomePage() {
  //   const { userId, decodedToken } = getUserIdFromCookie();
  //   console.log(decodedToken);
  //   const { data: fetchedUser, triggerFetch: userFetchTrigger } = useFetch<User>({}, userId !== null ? `/users/${userId}` : null, "GET");
  return (
    <div className="p-6">
      {/* hero */}
      <Hero />
      {/* other contents if necessary */}
    </div>
  );
}
