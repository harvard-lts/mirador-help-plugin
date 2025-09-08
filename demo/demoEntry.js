import Mirador from "mirador/dist/es/src/index";
import Plugin from "../src/index";

document.addEventListener("DOMContentLoaded", () => {
  const config = {
    id: "mirador",
    windows: [
      {
        manifestId: "https://nrs.lib.harvard.edu/URN-3:HUAM:925863:MANIFEST:3",
      },
    ],
  };

  const plugins = [...Plugin];

  Mirador.viewer(config, plugins);
});
