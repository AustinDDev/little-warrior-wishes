export default function Hero() {
  return (
    <section
      className="h-[60vh] bg-cover bg-center flex items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('/butterflies.svg')" }}
    >
      <div className="bg-black bg-opacity-40 p-8 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Create Memories. Inspire Hope.</h1>
        <p className="text-lg">
          Bringing connection and compassion to every family’s journey.
        </p>
      </div>
    </section>
  );
}