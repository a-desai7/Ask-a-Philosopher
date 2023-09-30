import { useState, useEffect } from "react";

export default function AudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = new Audio(src);

    audioElement.loop = true;

    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    return () => {
      // Clean up audio element when the component unmounts
      audioElement.pause();
      audioElement.src = "";
    };
  }, [src, isPlaying]);

  return (
    <div>
      <button
      onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Remove ambience" : "Add ambience"}
      </button>
    </div>
  );
}
