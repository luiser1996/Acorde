import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
}

// Función para incrustar videos de youtube
const YouTubeEmbed = ({ videoId }: YouTubeEmbedProps): JSX.Element => {
  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTubeEmbed;