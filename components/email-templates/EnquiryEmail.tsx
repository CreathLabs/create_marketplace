import React from 'react';


const EnquiryEmail: React.FC<{ name: string; email: string, enquiry: string }> = ({ name, email, enquiry }) => (
    <div>
        <h4>A new messgae from the Marketplace</h4>
        <p>From: {name}</p>
        <p>Email: {email}</p>
        <p>Enquiry: {enquiry}</p>
    </div>
);

export default EnquiryEmail;