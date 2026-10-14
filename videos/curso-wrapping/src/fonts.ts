import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Mismas fuentes que academiadetail.com
loadFont({ family: "Bebas Neue", url: staticFile("fonts/bebas-neue-latin.woff2"), weight: "400" });
loadFont({ family: "Open Sans", url: staticFile("fonts/open-sans-latin-var.woff2"), weight: "300 800" });
