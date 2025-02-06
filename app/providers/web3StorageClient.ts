import axios from "axios";

const key = '2e8cac5f2edb20d6bf41';
const secret = 'b70daa0be22c09b8ca1b00f663ae32d312cc96b2700b291c709c5cfe15e510cc';
const jwt  = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZjllMTViYy1hY2M2LTQ1ODktODAyZS03MzI4ZmUzZWI5ZGQiLCJlbWFpbCI6ImFiZHVsbWFsaWtxdWFkcmk1MDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJlOGNhYzVmMmVkYjIwZDZiZjQxIiwic2NvcGVkS2V5U2VjcmV0IjoiYjcwZGFhMGJlMjJjMDliOGNhMWIwMGY2NjNhZTMyZDMxMmNjOTZiMjcwMGIyOTFjNzA5YzVjZmUxNWU1MTBjYyIsImlhdCI6MTY3ODYyMzg2NX0.9oyEU-HwtAhYgzaYJE2UfZacyFWbPRdJa1Fh00PJ3KY`


export const pinJSONToIPFS = async(JSONBody: any) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios({method:"post",url: url,data: JSONBody,
            headers: {
                pinata_api_key: `${key}`,
                pinata_secret_api_key: `${secret}`,
                Authorization: jwt
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};