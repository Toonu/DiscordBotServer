const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const keys = require("./client_secret.json");


const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ["https://www.googleapis.com/auth/spreadsheets"]);
                                                                               
                                                                               
client.authorize(function(err,tokens) {
  if(err) {
    console.log(err);
    return;
  } else {
    console.log("In");
    gsrun(client);
  }
});



async function gsrun(cl) {
  const gsapi = google.sheets({version: "v4", auth: cl});
  const getData = {
    spreadsheetId: "1mnKITmuBCaj0tekkGD2Wgnj-OpelRzDUyYruEVliNmM",
    range: "Sheet1!A1:B21"
  };
  
  
  let data = await gsapi.spreadsheets.values.get(getData);
  let dataArray = data.data.values;
  
  const pushData = {
    spreadsheetId: "1mnKITmuBCaj0tekkGD2Wgnj-OpelRzDUyYruEVliNmM",
    range: "Sheet1!C1",
    valueInputOption: "USER_ENTERED",
    resource: {values: dataArray}
  };
  let res = await gsapi.spreadsheets.values.update(pushData);
  console.log(dataArray[0][0]);
}