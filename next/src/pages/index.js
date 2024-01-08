import { useState, useEffect, lazy } from "react";
import Heading from "@/components/Heading";
import { Heading as WebpackHeading } from "plainwebpack/Heading";

export default function Home() {
  const [CRAHeading, setCRAHeading] = useState(null);
  const [ViteHeading, setViteHeading] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCRAHeading(lazy(() => import("cra/Heading")));
    }

    if (typeof window !== "undefined") {
      setViteHeading(
        lazy(() =>
          import("vite/Heading").then((module) => ({ default: module.Heading }))
        )
      );
    }
  }, []);

  return (
    <div className="mx-auto max-w-screen-md p-8">
      <Heading />
      {CRAHeading && <CRAHeading />}
      {ViteHeading && <ViteHeading />}
      {WebpackHeading && <WebpackHeading />}
    </div>
  );
}

// import Heading from "@/components/Heading";
// import { lazy, useEffect, useState } from "react";

// // const CRAHeading2 = dynamic(() => import("cra/Heading"), { ssr: false });

// export default function Home() {
//   const [CRAHeading, setCRAHeading] = useState(null);
//   const [ViteHeading, setViteHeading] = useState(null);
//   const [WebpackHeading, setWebpackHeading] = useState(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setCRAHeading(lazy(() => import("cra/Heading")));
//     }

//     if (typeof window !== "undefined") {
//       setViteHeading(
//         lazy(() =>
//           import("vite/Heading").then((module) => ({ default: module.Heading }))
//         )
//       );
//     }

//     if (typeof window !== "undefined") {
//       setWebpackHeading(lazy(() => import("plainwebpack/Heading")));
//     }
//   }, []);

//   return (
//     <div className="mx-auto max-w-screen-md p-8">
//       <Heading />
//       {CRAHeading && <CRAHeading />}
//       {ViteHeading && <ViteHeading />}
//       {WebpackHeading && <WebpackHeading />}
//     </div>
//   );
// }
