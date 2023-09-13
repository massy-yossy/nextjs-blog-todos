import Head from "next/head";

export default function Layout({title = "defult title", children}) {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-1 justify-center items-center w-screen flex-col">
        {children}
      </div>
      <footer className="w-full h-6 flex justify-center items-center text-gray-500 text-sm">
        2023 udemy
      </footer>
    </div>
  );
}
