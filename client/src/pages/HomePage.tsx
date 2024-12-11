import Hero from "../components/molecules/Hero";

//the content of the homepage goes here
export default function HomePage() {
  return (
    <div className="p-6">
      {/* hero */}
      <Hero />
      {/* other contents if necessary */}
    </div>
  );
}
