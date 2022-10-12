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

 })