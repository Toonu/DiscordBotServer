module.exports = {
	name: 'test',
	description: 'Testing purposes, do not misuse!',
	args: false,
	usage: '<>',
	cooldown: 5,
	guildOnly: true,
	execute(message, args) {
    const fs = require('fs');
    const readline = require('readline');
    const {google} = require('googleapis');
    const keys = require("./../client_secret.json");


    const client = new google.auth.JWT(keys.client_email, null, keys.private_key, ["https://www.googleapis.com/auth/spreadsheets"]);


    client.authorize(function(err,tokens) {
      if(err) {
        message.channel.send(err);
        //console.log(err);
        return;
      } else {
        //console.log("In");
        message.channel.send("in");
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
      
      console.log(dataArray[0][0].toString());
      //message.channel.send(dataArray[0][0]);
      //message.channel.send(dataArray[0][0]);
      message.channel.send(dataArray.slice(0,2));
      //message.channel.send(dataArray);
      
      
      const pushData = {
        spreadsheetId: "1mnKITmuBCaj0tekkGD2Wgnj-OpelRzDUyYruEVliNmM",
        range: "Sheet1!C1",
        valueInputOption: "USER_ENTERED",
        resource: {values: dataArray}
      };
      let res = await gsapi.spreadsheets.values.update(pushData);
      
    }
  },
};

