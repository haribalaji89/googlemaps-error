//Fix is part of PT security findings
var googlemapsid = document.getElementById("gmapsapi")?.getAttribute("data-name");
let src = googlemapsid == null ? "https://maps.googleapis.com/maps/api/js?key=AIzaSyDbUbD4oaqD-wHS8VemmApEUZMJKpcStto" : 
"https://maps.googleapis.com/maps/api/js?key=AIzaSyDbUbD4oaqD-wHS8VemmApEUZMJKpcStto&"+googlemapsid;

const body = document.body;
const script = document.createElement("script");
script.type = 'text/javascript';
script.innerHTML = "";
script.src = src;
script.async = true;
script.defer = true;
body.appendChild(script);