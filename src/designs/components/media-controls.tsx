"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaVolumeRange,
  MediaTimeDisplay,
  MediaFullscreenButton,
  MediaPlaybackRateButton,
  MediaPreviewTimeDisplay,
} from "media-chrome/dist/react";
import {
  PlayIcon,
  PauseIcon,
  VolumeLowIcon,
  VolumeOffIcon,
  FullScreenIcon,
  VolumeHighIcon,
  ArrowShrinkIcon,
  VolumeMute01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/libs/cn";

export function MediaControls({ src, poster }: { src: string; poster?: string }) {
  const [hasPlayed, setHasPlayed] = useState(false);

  return (
    <MediaController
      onPlay={() => setHasPlayed(true)}
      onPlayCapture={() => setHasPlayed(true)}
      className="block aspect-video size-full [--media-control-background:transparent] [--media-control-hover-background:transparent] [--media-icon-color:white] [--media-preview-time-background:black/60] [--media-preview-time-border-radius:4px] [--media-preview-time-margin-bottom:5px] [--media-preview-time-padding:4px_8px] [--media-preview-time-text-shadow:none] [--media-range-bar-border-radius:999px] [--media-range-bar-color:white] [--media-range-thumb-background:white] [--media-range-thumb-border-radius:999px] [--media-range-thumb-height:0.5rem] [--media-range-thumb-width:0.5rem] [--media-range-track-border-radius:999px] [--media-range-track-color:white/30] [--media-range-track-height:0.5rem]"
    >
      <video slot="media" src={src} poster={poster} crossOrigin="anonymous" preload="metadata" className="size-full object-cover" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="big-play-button transform transition-transform hover:scale-110">
          <MediaPlayButton noTooltip className="flex size-[clamp(4rem,8vw,6rem)] items-center justify-center rounded-full bg-black/50">
            <HugeiconsIcon slot="play" icon={PlayIcon} strokeWidth={0} className="size-1/2 fill-white text-white" />
            <HugeiconsIcon slot="pause" icon={PauseIcon} strokeWidth={0} className="size-1/2 fill-white text-white" />
          </MediaPlayButton>
        </div>
      </div>
      <MediaControlBar
        className={cn(
          "flex w-full items-center gap-2 bg-linear-to-t from-black/60 to-transparent px-4 py-1.5 pt-12 transition-all duration-500 ease-out",
          hasPlayed ? "pointer-events-auto translate-y-0" : "pointer-events-none translate-y-25",
        )}
      >
        <div className="group/volume flex items-center">
          <MediaMuteButton className="size-5">
            <HugeiconsIcon slot="high" icon={VolumeHighIcon} size={24} strokeWidth={2} className="fill-transparent text-white" />
            <HugeiconsIcon slot="medium" icon={VolumeLowIcon} size={24} strokeWidth={2} className="fill-transparent text-white" />
            <HugeiconsIcon slot="low" icon={VolumeMute01Icon} size={24} strokeWidth={2} className="fill-transparent text-white" />
            <HugeiconsIcon slot="off" icon={VolumeOffIcon} size={24} strokeWidth={2} className="fill-transparent text-white" />
          </MediaMuteButton>
          <MediaVolumeRange className="w-0 origin-left overflow-hidden transition-all duration-300 ease-out group-hover/volume:w-20" />
        </div>
        <MediaTimeRange className="flex-1">
          <MediaPreviewTimeDisplay
            slot="preview"
            className="mb-0 rounded-sm border border-white/20 bg-black/60 px-2.5 py-1.25 text-xs font-bold text-white"
          />
        </MediaTimeRange>
        <span className="flex text-center">
          <MediaTimeDisplay showDuration className="text-xs font-medium text-white" />
        </span>
        <MediaPlaybackRateButton className="text-[0.8rem] font-medium text-white" />
        <MediaFullscreenButton className="size-5">
          <HugeiconsIcon slot="enter" icon={FullScreenIcon} size={24} strokeWidth={2} className="fill-transparent text-white" />
          <HugeiconsIcon slot="exit" icon={ArrowShrinkIcon} size={24} strokeWidth={2} className="fill-transparent text-white" />
        </MediaFullscreenButton>
      </MediaControlBar>
    </MediaController>
  );
}
