import React from "react";

export const Video = () => {
  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <iframe
        width="100%"
        height="472"
        src="https://www.youtube.com/embed/HuoD5UN-a-g?si=M5mJRWdsV2leZ2aV"
        title="YouTube video player"
        frameorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};
