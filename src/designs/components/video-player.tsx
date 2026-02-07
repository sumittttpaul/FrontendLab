"use client";

import dynamic from "next/dynamic";

const MediaControls = dynamic(() => import("./media-controls").then((m) => m.MediaControls), { ssr: false });

export function VideoPlayer({
  src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  poster = "https://cdn.shortpixel.ai/spai/q_lossy+w_728+to_webp+ret_img/thumbnailtest.com/wp-content/uploads/2024/04/Thumbnail-URL.jpg",
}: {
  src?: string;
  poster?: string;
}) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <MediaControls src={src} poster={poster} />
    </div>
  );
}
