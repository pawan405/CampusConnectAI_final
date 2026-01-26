export default function ThreeDBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />

      {/* Animated Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_50%)]" />

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyan-600/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 w-1/3 h-1/3 bg-blue-600/5 blur-[150px]" />
    </div>
  );
}
