import { useState, useEffect, lazy } from "react";
import Heading from "@/components/Heading";
import { Heading as WebpackHeading } from "plainwebpack/Heading";

export default function Home() {
  const [CRAHeading, setCRAHeading] = useState(null);
  const [ViteHeading, setViteHeading] = useState(null);
  const [RsbuildHeading, setRsbuildHeading] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCRAHeading(lazy(() => import("cra/Heading")));

      setViteHeading(
        lazy(() =>
          import("vite/Heading").then((module) => ({ default: module.Heading }))
        )
      );

      setRsbuildHeading(import("rsbuildreact/Heading"));
    }
  }, []);

  return (
    <div className="mx-auto max-w-screen-md p-8">
      <Heading />
      {CRAHeading && <CRAHeading />}
      {ViteHeading && <ViteHeading />}
      {WebpackHeading && <WebpackHeading />}
      {RsbuildHeading && <RsbuildHeading />}
    </div>
  );
}

export const getServerSideProps = () => ({
  props: { ssr: true },
});
