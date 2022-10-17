const AWS = require('aws-sdk');
require('dotenv').config({ path: '../.env' })

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;

AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey
});
const s3 = new AWS.S3();

const uploadFile = async (name) => {
    try {
        const url = await s3.getSignedUrlPromise('putObject', {
            Bucket: bucketName,
            Key: name,
            Expires: 60 * 10,
            ContentType: 'image/*'
        })
        const urlImage = `https://${bucketName}.s3.${region}.amazonaws.com/${name}`
        console.log('url', url);
        console.log('urlImage', urlImage);

        return { url, urlImage };
    } catch (error) {
        console.log(error);
    }
}

module.exports = uploadFile;