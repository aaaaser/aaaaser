import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-800 dark:text-white">Hello World</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={400} height={400} />
    </div>
  );
}
