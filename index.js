const express = require("express");
const app = express();
const port = 3000;

var arr = 
[
{
    "id" : "101236523652",
    "payeename":"gin",
    "payername":"a",
    "payeeacc":"112451784523",
    "payeracc":"895623157811",
    "date":"15092022",
    "amt":"123.296"
},
{
    "id":"10AB14523654",
    "payeename":"piya",
    "payername":"b",
    "payeeacc":"122345567889",
    "payeracc":"231551567889",
    "date":"15092022",
    "amt":"456.42"
},
{
    "id":"a@bc",
    "payeename":"hello",
    "payername":"c",
    "payeeacc":"852345567889",
    "payeracc":"232585567889",
    "date": "23022012",
    "amt":"85236.23"
}
]

var pass = [];
var fail = [];



app.get("/", (req, res) => {
  res.send(arr);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const doValidation = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if(true){ ///--------------------add check func in if condtn-----------------------------///
      let flag=1;
      if (arr[i]["id"].length!=12 && !arr[i]["id"].match(/^[0-9a-z]+$/gi)){
     //   console.log(arr[i]["id"]);
        flag=0;
      }
      else if(arr[i]["date"].length!=8 && !validatedate(arr[i]["date"])){
     //   console.log(arr[i]["date"]);
        flag=0;
      }
      else if( !(arr[i]["payeename"].length<36 &&  arr[i]["payername"].length<36 && arr[i]["payeeacc"].length == 12 && arr[i]["payeracc"].length == 12)){
       // console.log(arr[i]["payeename"]);
        flag =0;
      }
      else if(!arr[i]["payeename"].match(/^[0-9a-z]+$/gi) || !arr[i]["payername"].match(/^[0-9a-z]+$/gi) || !arr[i]["payeeacc"].match(/^[0-9a-z]+$/gi) || !arr[i]["payeracc"].match(/^[0-9a-z]+$/gi)){
       //   console.log( arr[i]["payername"]);
          flag =0;
      }
      else if(arr[i]["amt"].length<14){
       // console.log(arr[i]["amt"]);
        let value = arr[i]["amt"].split(".");
        if(value[0].length>10 || value[1].length>2){
         // console.log("lo");
         // console.log(arr[i]["amt"]);
         // console.log("lo");
          flag =0;
        }
      }

      if(flag==0){
        fail.push(arr[i]);
      }
      else{
        pass.push(arr[i]);
      }

    }
    //console.log(arr[i]["amt"].length<14);
    //console.log(arr[i]["id"]);
  }
  //console.log(pass.length);
  console.log("pass");
  pass.forEach(function (e) {console.log(e)});
  console.log("fail");
  fail.forEach(function (e) {console.log(e)});
 // (validatedate("15092022"));
}

function validatedate(date){  
  var today = new Date();

  if(date.length!=8){
    return false;
  }
  
  if(today.getFullYear() === parseInt(date.substring(4),10) &&
  today.getMonth()+1 === parseInt(date.substring(2, 4),10)&&
  today.getDate() === parseInt(date.substring(0, 2),10)){
    //console.log(today.getDate());  
    return true;
  }
  else{
    return false;
  }

 // console.log(today.getDate());    
}   

function saveJSON(){
  var fs = require('fs');
  var passjson = JSON.stringify(pass);
fs.writeFile('pass.json', passjson, 'utf8', function(err) {
  if (err) throw err;
  console.log('pass complete');
  });

  var failjson = JSON.stringify(fail);
fs.writeFile('fail.json', failjson, 'utf8', function(err) {
  if (err) throw err;
  console.log('fail complete');
  });
}

doValidation(arr)
saveJSON()