import React from "react";

const ArtworkCollectedEmail: React.FC<{ username: string; artworkName: string }> = ({ username, artworkName }) => (
    <div>
      <p>🎉 Congratulations, {username}!</p>
      <p>You have successfully collected the artwork: <strong>{artworkName}</strong>.</p>
      <p>We&apos;re delighted to extend our warmest congratulations on your recent artful acquisition on Creath! 
        🌟 Your commitment to enriching your collection with extraordinary pieces is truly commendable, 
        and we&apos;re thrilled to be part of your artistic journey. Your collection adds a unique vibrancy to our platform, 
        inspiring fellow collectors and art enthusiasts. Keep an eye out for your masterpiece in the spotlight!</p>
      <p>
        <strong>Unlock Exclusive Collector Benefits</strong><br/>
        Your recent purchase opens the door to exclusive benefits reserved for Creath collectors. 
        From early access to new releases to personalized recommendations based on your preferences, 
        we&apos;re dedicated to enhancing your collecting experience.
      </p>
      <p>
        <strong>Share Your Joy:</strong><br/>
        We would love to see your newly acquired artwork in its new home! 
        Share a photo or a story about why this piece resonated with you and Tag us [@CreathLabs] 
        using the hashtag #Creath #CreathLabs. Your experiences contribute to the vibrant community of collectors on Creath.
      </p>
      <p>
        Thank you for choosing Creath as your artistic destination. 
        Your support fuels our mission to redefine art ownership in the digital age. 
        If you have any questions or if there&apos;s anything else we can assist you with, 
        feel free to reach out. Here&apos;s to the beginning of a beautiful journey with your new masterpiece!
      </p>
      <p>Best regards,<br/>The Creath Team</p>

      <p>Please reach out to us at <a href="mailto:support@creath.io">Support@creath.io</a> for details on how to get the physical copy of the work using your registered mail</p>
    </div>
  );
  
  export default ArtworkCollectedEmail;  