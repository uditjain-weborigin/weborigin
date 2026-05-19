"use client";

import dynamic from "next/dynamic";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  { ssr: false },
);

const ConfiguredStudio = dynamic(
  async () => {
    const [{ default: config }] = await Promise.all([
      import("../../../sanity.config"),
    ]);
    function Wrapper() {
      return <NextStudio config={config} />;
    }
    return Wrapper;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center text-foreground/60">
        Loading Studio…
      </div>
    ),
  },
);

export function Studio() {
  return <ConfiguredStudio />;
}
