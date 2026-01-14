export default function Footer() {
  return (
    <footer className="relative bg-[#47549e] text-white py-6 mt-12">
      {/* Main footer content */}
      <div className="text-center space-y-1">
        <p>© {new Date().getFullYear()} Little Warrior Wishes</p>
        <p className="text-sm">Create Memories. Inspire Hope.</p>
      </div>

      {/* Developer credit */}
      <div className="mt-4 text-center text-xs text-white/70 md:mt-0 md:absolute md:bottom-4 md:right-6 md:text-right">
        Developed by{" "}
        <a
          href="https://daltondev.me"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          AustinDaltonDev
        </a>
      </div>
    </footer>
  );
}
