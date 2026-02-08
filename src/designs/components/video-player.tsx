"use client";

import dynamic from "next/dynamic";

const MediaControls = dynamic(() => import("./media-controls").then((m) => m.MediaControls), { ssr: false });

export function VideoPlayer({ src, thumbnail }: { src: string; thumbnail: string }) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg max-[56rem]:rounded-none">
      <MediaControls src={src} poster={thumbnail} />
    </div>
  );
}
