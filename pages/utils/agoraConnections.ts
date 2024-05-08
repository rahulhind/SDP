// import { ICameraVideoTrack, IRemoteVideoTrack, IAgoraRTCClient, IRemoteAudioTrack } from "agora-rtc-sdk-ng";


// export async function connectToAgoraRtc(
//   roomId: string,
//   userId: string,
//   onVideoConnect: any,
//   onWebcamStart: any,
//   onAudioConnect: any,
//   token: string
// ) {
//   try {
//     const { default: AgoraRTC } = await import("agora-rtc-sdk-ng");

//     const client = AgoraRTC.createClient({
//       mode: "rtc",
//       codec: "vp8",
//     });

//     await client.join(process.env.NEXT_PUBLIC_AGORA_APP_ID!, roomId, token, userId);

//     client.on("user-published", (themUser, mediaType) => {
//       client.subscribe(themUser, mediaType).then(() => {
//         if (mediaType === "video") {
//           onVideoConnect(themUser.videoTrack);
//         }
//         if (mediaType === "audio") {
//           onAudioConnect(themUser.audioTrack);
//           themUser.audioTrack?.play();
//         }
//       });
//     });

//     const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
//     onWebcamStart(tracks[1]);
//     await client.publish(tracks);

//     return { tracks, client };
//   } catch (error) {
//     console.error("Error connecting to Agora RTC:", error);
//     throw error;
//   }
// }

// export async function connectToAgoraRtm(
//   roomId: string,
//   userId: string,
//   onMessage: (message: any) => void,
//   token: string
// ) {
//   try {
//     const { default: AgoraRTM } = await import("agora-rtm-sdk");

//     const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID!);
//     await client.login({ uid: userId, token });

//     const channel = await client.createChannel(roomId);
//     await channel.join();
//     channel.on("ChannelMessage", (message, userId) => {
//       onMessage({ userId, message: message.text });
//     });

//     return { channel };
//   } catch (error) {
//     console.error("Error connecting to Agora RTM:", error);
//     throw error;
//   }
// }
// agora.ts
import {
  ICameraVideoTrack,
  IRemoteVideoTrack,
  IAgoraRTCClient,
  IRemoteAudioTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

export async function connectToAgoraRtc(
  roomId: string,
  userId: string,
  onVideoConnect: (track: IRemoteVideoTrack | null) => void,
  onWebcamStart: (track: ICameraVideoTrack) => void,
  onAudioConnect: (track: IRemoteAudioTrack | null) => void,
  token: string
): Promise<{ tracks: [IMicrophoneAudioTrack, ICameraVideoTrack]; client: IAgoraRTCClient }> {
  const { default: AgoraRTC } = await import("agora-rtc-sdk-ng");

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  await client.join(
    process.env.NEXT_PUBLIC_AGORA_APP_ID!,
    roomId,
    token,
    userId
  );

  // Listen to user-published events
  client.on("user-published", (themUser, mediaType) => {
    client.subscribe(themUser, mediaType).then(() => {
      if (mediaType === "video") {
        onVideoConnect(themUser.videoTrack || null);
      } else if (mediaType === "audio") {
        onAudioConnect(themUser.audioTrack || null);
        themUser.audioTrack?.play();
      }
    });
  });

  // Create audio and video tracks
  const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

  // Start webcam video
  onWebcamStart(tracks[1]);
  await client.publish(tracks);

  // Return both tracks and the client
  return { tracks, client };
}

export async function connectToAgoraRtm(
  roomId: string,
  userId: string,
  onMessage: (message: { userId: string; message?: string }) => void,
  token: string
): Promise<{ channel: any }> {
  const { default: AgoraRTM } = await import("agora-rtm-sdk");
  const client = AgoraRTM.createInstance(process.env.NEXT_PUBLIC_AGORA_APP_ID!);
  await client.login({
    uid: userId,
    token,
  });
  const channel = await client.createChannel(roomId);
  await channel.join();
  channel.on("ChannelMessage", (message, userId) => {
    onMessage({
      userId,
      message: message.text,
    });
  });

  return {
    channel,
  };
}
