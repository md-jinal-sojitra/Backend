const fs = require('fs');
const request = require('request');
const file = 'test4.txt';
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/pinata-filesystem",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("connected to db"))
.catch((err) => console.log(err));

function uploadToPinata(file) {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const apiKey = '9738fb4207eb51a4ee15';
  const apiSecret = '03a9451e402440c37e1ddfd5262971fa527e7ba741d5bc582a730ee07a74dd27';
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data',
      'pinata_api_key': apiKey,
      'pinata_secret_api_key': apiSecret
    },
    formData: {
      file: {
        value: fs.createReadStream(file),
        options: {
          filename: file,
          contentType: null
        }
      }
    }
  };

  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        const data = JSON.parse(body);
        //console.log(`File uploaded successfully with IPFS hash ${data.IpfsHash}`);
        resolve(data.IpfsHash);
        const object = {
          name: data.IpfsHash 
        };
        //res.send(result);
        const data1 =  postData(object);

      }
    });
  });
}


uploadToPinata(file)
  .then(ipfsHash => console.log(`File uploaded successfully with IPFS hash ${ipfsHash}`))
  .catch(error => console.error(error));

// async function submit(){
//   const object = {
//     name: ipfsHash 
//   };
//   res.send(result);
//   const data = await postData(object);
// }
// submit();

const FileSchema = mongoose.Schema({
    name: String,
    // path: { type: String },
    // cid: String,
    // size: Number,
});
  
const File = new mongoose.model("File", FileSchema);
  
const postData = (data) => {
  try {
    const result = File.insertMany(data);
    return result;
  } catch (err) {
    console.log("An error occured... " + err.message);
  }
};

  
