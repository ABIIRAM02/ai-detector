import ObjectDetectin from "@/Components/ObjectDetectin";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-5 w-full bg-black text-white">
      <h2 className="text-center text-5xl py-10 font-semibold uppercase gradient-title">
        AI detector
      </h2>
      <ObjectDetectin />
    </main>
  );
}
