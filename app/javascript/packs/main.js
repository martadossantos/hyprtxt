document.addEventListener("turbolinks:load", () => {

   let timeEl = document.querySelector('#time');
   let locationEl = document.querySelector('#location')

   let checkTime = function() {
      setInterval(() => timeEl.innerHTML = new Date().toLocaleTimeString(),1000);
   }
   checkTime();

   const regionNames = new Intl.DisplayNames(
      ['de'], {type: 'region'}
    );

   fetch("https://ipinfo.io/json?token=66767944fa5425")
   .then(
   (response) => response.json()
   )
   .then(jsonResponse => {
      let countryName = regionNames.of(jsonResponse.country);

      locationEl.innerHTML = jsonResponse.city + ', ' + countryName
   }
   )

   
   let poemUrl = 'http://127.0.0.1:3000/poems/2.json';

   function fetchPoem() {
         return fetch(poemUrl).then(function(response) {
            return response.json();
         }).then(function(json) {
            return json;
         });
   }

   fetchPoem().then(function(result) {
         console.log(result.title, result.body);
   });



 })