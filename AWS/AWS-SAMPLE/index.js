// Load the SDK for JavaScript
var AWS = require("aws-sdk");
// Set the Region
AWS.config.update({
  region: "us-west-2",
  accessKeyId: "AKIASJFK7DVS6ILZQYES",
  secretAccessKey: "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",
});

// Create S3 service object
s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// Call S3 to list the buckets
s3.listBuckets(function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});
