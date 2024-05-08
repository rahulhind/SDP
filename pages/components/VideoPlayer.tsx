import React, { useRef, useEffect } from "react";
import {
  ICameraVideoTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";

export const VideoPlayer = ({
  videoTrack,
  style,
}: {
  videoTrack: IRemoteVideoTrack | ICameraVideoTrack;
  style: object;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const playerRef = ref.current;
    if (!videoTrack || !playerRef) return;

    videoTrack.play(playerRef);

    return () => {
      videoTrack.stop();
    };
  }, [videoTrack]);

  return <div ref={ref} style={style}></div>;
};
