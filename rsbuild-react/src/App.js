import Heading from "./Heading";
import { Heading as CRAHeading } from "cra/Heading";
import { Heading as ViteHeading } from "vite/Heading";
import { Heading as NextHeading } from "nextjs/Heading";
import { Heading as WebpackHeading } from "plainwebpack/Heading";

function App() {
  return (
    <div>
      <Heading />
      <CRAHeading />
      <ViteHeading />
      <NextHeading />
      <WebpackHeading />
    </div>
  );
}

export default App;
