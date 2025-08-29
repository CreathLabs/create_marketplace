import React from "react";

const ArtistCollectedEmail: React.FC<{ username: string; artworkName: string, collector: string, price: string }> = ({ username, artworkName, collector, price  }) => (
    <div>
        <p>
            Dear <strong>{username}</strong>,<br/>
            We hope this email finds you well and immersed in your artistic endeavors. We are thrilled to share some exciting news with you – your artwork on Creath Art Marketplace has been sold!
        </p>
        <p>
            🌟 Congratulations on Your Sale!<br/>
            We&apos;re delighted to inform you that {artworkName} has found an appreciative collector who resonates with the beauty and uniqueness of your creation. 
            Your art has truly made an impact, and we couldn&apos;t be happier to facilitate this connection.
        </p>
        <p>
            🎉 <strong>What Happens Next:</strong><br/>
            <strong>Packaging & Shipping:</strong> We understand the importance of ensuring your artwork reaches its new home in pristine condition. 
            Our dedicated team will reach out to you for packaging and shipping process with the utmost care.
        </p>
        <p>🖼️ <strong>Artwork Details:</strong></p>
        <ul>
            <li><strong>Artwork Title:</strong> {artworkName}</li>
            <li><strong>Collector:</strong> {collector}</li>
            <li><strong>Sale Price:</strong> {price}</li>
        </ul>
        <p>
            🌐 <strong>Share the Joy:</strong><br/>
            Feel free to share this exciting news with your followers and art enthusiasts on your social media platforms. 
            Your success contributes to the vibrant community we&apos;re building at Creath, and we encourage you to celebrate this milestone with your audience.
        </p>

        <p>📷 <strong>Share on Social Media:</strong></p>
        <ul>
            <li>Post a photo of the sold artwork.</li>
            <li>Tag us <a href="https://www.instagram.com/creathlabs/">@CreathLabs</a> and use the hashtag #SoldOnCreath #Creath #CreathLabs</li>
            <li>Share any thoughts or messages you&apos;d like to convey to the collector.</li>
        </ul>
        <p>
            <strong>Questions or Assistance:</strong><br/>
            If you have any questions or need assistance at any step of this process, please don&apos;t hesitate to reach out to our dedicated support team at <a href="mailto:Support@creath.io">Support@creath.io</a>.
        </p>
        <p>
            Thank you for choosing Creath Art Marketplace as the platform to showcase and sell your incredible art. We look forward to witnessing more of your artistic journey unfold on our platform.
        </p>
        <p>Best regards,<br/>The Creath Team</p>
    </div>
);

export default ArtistCollectedEmail;