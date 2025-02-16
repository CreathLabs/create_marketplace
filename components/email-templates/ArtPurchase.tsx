import React from "react";

const ArtworkCollectedEmail: React.FC<{ username: string; artworkName: string }> = ({ username, artworkName }) => (
    <div>
      <h1>🎉 Congratulations, {username}!</h1>
      <p>You have successfully collected the artwork: <strong>{artworkName}</strong>.</p>
      <p>Thank you for being part of Creath Marketplace!</p>
    </div>
  );
  
  export default ArtworkCollectedEmail;  