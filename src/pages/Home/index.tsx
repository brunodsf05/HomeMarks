import type { ReactNode } from "react";

const Background: React.FC<{ children?: ReactNode }> = ({ children }) => (
  <div className="min-h-screen w-full relative">
    {/* Azure Depths. From: https://patterncraft.fun/ */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #000000 40%, #010133 100%)",
      }}
    />
    <div className="relative z-1">{children}</div>
  </div>
);

export const Home: React.FC = () => (
  <Background>
    <p className="text-white">Hello world!</p>
  </Background>
);
