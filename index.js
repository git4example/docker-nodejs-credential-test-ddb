'use strict';

var AWS = require('aws-sdk');
require('log-timestamp');
console.log("Hi there");

var aws_region  = process.env['AWS_REGION'] ? process.env['AWS_REGION'] : 'ap-southeast-2'
var aws_profile = process.env['AWS_PROFILE'] ?  process.env['AWS_PROFILE'] : 'default'
AWS.config.update({region:'ap-southeast-2'});

AWS.CredentialProviderChain.defaultProviders = [
  function () { return new AWS.EnvironmentCredentials('AWS'); },
  function () { return new AWS.EnvironmentCredentials('AMAZON'); },
  function () { return new AWS.SharedIniFileCredentials(); },
  function () { return new AWS.ECSCredentials(); },
  function () { return new AWS.ProcessCredentials(); },
  function () { return new AWS.TokenFileWebIdentityCredentials(); },
  function () { return new AWS.EC2MetadataCredentials() }
];

var chain = new AWS.CredentialProviderChain();

chain.resolve((err, cred)=>{
  AWS.config.credentials = cred;
  //console.log("Heres your credentials : ");
  console.log(cred);
}, (err) => {
  console.log(err);
});

var dynamodb = new AWS.DynamoDB();
logSingleItem();

// Get a single item with the getItem operation
async function logSingleItem(){
  try {
        var i,n;
        var params = {};
        var x = 0.0001;
        for (i = 0; i < 10; i++) {
          x += Math.sqrt(x);
          console.log("Get Tables..");
          var params = {};
          var result = await dynamodb.listTables(params, await function(err, data) {
          if (result.err) console.log(err, err.stack); // an error occurred
          else console.log(data);           // successful response
          });
        }
    } catch (error) {
        console.error(error);
  }
}
/*
var i=0, j,n;
var x = 0.0000001;
var params = {};
var dynamodb = new AWS.DynamoDB();
for(;;){
//for(let a=1;a<=5;a++){
  console.log("Get Tables..");
  try{
    setTimeout(() => {
        while (i<3) {
          for (j = 0; j < 100; j++) {
            x += Math.sqrt(x);
          }
          //console.log("Count :" + i + " - sqrt Ans : " + x);
          x = Math.random();
          //console.log(x);
          i++
        }
          dynamodb.listTables(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else  console.log(data);        // successful response
          });
        }, 1000);
  } catch (error) {
      console.log(error);
  }
}


function getTable() {
  try{
      
     
      while (i<3) {
        for (j = 0; j < 100; j++) {
          x += Math.sqrt(x);
        }
        //console.log("Count :" + i + " - sqrt Ans : " + x);
        x = Math.random();
        //console.log(x);
        i++
      }
  }catch (error) {
    console.log(error);
  }
  return;
}
*/


// console.log("CredentialProviderChain: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.EnvironmentCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("EnvironmentCredentials: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.EnvironmentCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("EnvironmentCredentials: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.EC2MetadataCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("EC2MetadataCredentials: ");
// console.log(AWS.config.credentials );

// AWS.config.credentials = new AWS.ECSCredentials({
//   httpOptions: {timeout: 5000}, // 5 second timeout
//   maxRetries: 10, // retry 10 times
// });

// console.log("ECSCredentials : ");
// console.log(AWS.config.credentials );