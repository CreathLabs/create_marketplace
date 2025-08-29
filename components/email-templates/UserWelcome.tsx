import React from "react";

const UserWelcome: React.FC<{ username: string}> = ({ username }) => (
    <div>
        <p>
            Dear {username},
        </p>
        <p>
            Welcome to Creath Art Marketplace where creativity meets blockchain innovation! We&apos;re thrilled to have you join our vibrant community of art enthusiasts and creators.
            Get ready to embark on a journey that redefines the art experience.
        </p>
        <p>Here&apos;s what you can expect from The Creath Art Marketplace:</p>
        <ol>
            <li>
                <strong>Explore Limitless Creativity:</strong> Immerse yourself in a world where artistic expression knows no bounds. Discover a diverse range of artworks spanning various styles and mediums.
            </li>
            <li>
                <strong>Own a Piece of Unique Art:</strong> Creath Art Marketplace is your gateway to owning exclusive, blockchain-authenticated art. Find the perfect piece that resonates with your style and vision.
            </li>
            <li>
                <strong>Engage with Emerging Artists:</strong> Connect with the next generation of artistic talent. Our platform showcases the works of emerging artists, providing a platform for them to shine.
            </li>
            <li>
                <strong>Secure and Transparent Transactions:</strong> Trust is at the core of our platform. With blockchain technology, your art transactions are secure, transparent, and authenticated, ensuring the integrity of your collection.
            </li>
            <li>
                <strong>Personalized Art Recommendations:</strong> Tailored to your preferences, our platform evolves with your tastes. Receive personalized recommendations that align with your unique artistic journey.
            </li>
        </ol>

        <p>Ready to get started?</p>

        <p>Click <a href="https://art.creath.io/profile">here</a> to complete your profile and start exploring the endless possibilities that await you on Creath Art Marketplace.</p>

        <p>Feel free to reach out to our support team at **support@creath.io** if you have any questions or need assistance along the way.</p>

        <p>Thank you for choosing Creath – Where Art and Blockchain Converge!</p>

        <p>Best Regards,<br />Creath Team</p>
    </div>
);

export default UserWelcome