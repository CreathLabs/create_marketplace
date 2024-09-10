import React from "react";

const ArtworkUploadedEmail: React.FC<{ username: string; name: string }> = ({
  username,
  name,
}) => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-500 p-4">
          <h1 className="text-white text-2xl font-semibold">
            Artwork Uploaded
          </h1>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-lg">Dear {username},</p>
          <p className="text-gray-700 mt-4">
            {`We are pleased to inform you that your artwork, ${name}, has been successfully
            uploaded and is currently pending approval. Once approved it will be listed on the Marketplace`}
          </p>
          <p className="text-gray-700 mt-4">
            You will be notified once the approval process is complete. Thank
            you for your patience.
          </p>
          <p className="text-gray-700 mt-6">
            Best regards,
            <br />
            The Creath Marketplace Team
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkUploadedEmail;
