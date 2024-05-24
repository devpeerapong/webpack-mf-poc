import Heading from "./Heading";
import { Heading as CRAHeading } from "cra/Heading";
import { Heading as NextHeading } from "nextjs/Heading";
import { Heading as WebpackHeading } from "plainwebpack/Heading";
import { Heading as RsbuildHeading } from "rsbuildreact/Heading";

function App() {
  return (
    <div>
      <Heading />
      <CRAHeading />
      <NextHeading />
      <WebpackHeading />
      <RsbuildHeading />
    </div>
  );
}

export default App;
