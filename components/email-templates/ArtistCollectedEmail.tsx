import React from "react";

const ArtistCollectedEmail: React.FC<{ username: string; artworkName: string }> = ({ username, artworkName }) => (
    <div>
        <h1>🎉 Congratulations, {username}!</h1>
        <p>You artwor: <strong>{artworkName}</strong> has been purchased on the Marketplace.</p>
        <p>Thank you for being part of Creath Marketplace!</p>
    </div>
);

export default ArtistCollectedEmail;