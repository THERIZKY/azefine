"use client";

import { useTheme } from "next-themes";
import PixelBlast from "@/components/template/background/pixelblast/PixelBlast";

export default function PixelBlastBackground() {
  const { resolvedTheme } = useTheme();

  if (resolvedTheme !== "dark") return null;
  console.log(resolvedTheme);
  return (
    // Component inspired by github.com/zavalit/bayer-dithering-webgl-demo
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <PixelBlast
        variant="square"
        pixelSize={4}
        color="#B19EEF"
        patternScale={2}
        patternDensity={1}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.5}
        edgeFade={0.25}
        transparent
      />
    </div>
  );
}
