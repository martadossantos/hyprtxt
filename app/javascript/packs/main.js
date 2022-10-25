document.addEventListener("turbolinks:load", () => {

   let 
      timeEl = document.querySelector('#time'),
      locationEl = document.querySelector('#location'),
      checkTime = function() {
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

   

   function fetchPoem(poemUrl) {
         return fetch(poemUrl).then(function(response) {
            return response.json();
         }).then(function(json) {
            return json;
         });
   }

   // fetchPoem().then(function(result) {
   //       console.log(result.title, result.body);
   // });

   function addNewPoem(poemUrl, newPoemTitle) {

      fetchPoem(poemUrl, newPoemTitle).then(function(result) {

         const forkContainer = document.createElement('div');
         const newTitleEl = document.createElement('p');
         const newBodyEl = document.createElement('div');
         let newBodyContent = result.body;

         newTitleEl.innerHTML = newPoemTitle;
         newTitleEl.style.marginBottom = '12px';
         newBodyEl.insertAdjacentHTML("afterbegin", newBodyContent);
         forkContainer.appendChild(newTitleEl);
         forkContainer.appendChild(newBodyEl);
         forkContainer.style.width = '33vw';

         allForksContainer.appendChild(forkContainer);

         let forksContainerPos = window.getComputedStyle(allForksContainer).left;

         allForksContainer.style.left = `calc(${forksContainerPos} - 33vw`;


   });
      
   }


   let allForksLinks = document.querySelectorAll('#js-forks-container a');

   let 
   allForksContainer = document.querySelector('#js-forks-container');


   allForksContainer.addEventListener('click', function(event) {
      if(event.target && event.target.nodeName == "A") {

         event.preventDefault();

         let 
         forkID = event.target.getAttribute('href'), 
         poemUrl = `http://127.0.0.1:3000/poems/${forkID}.json`,
         newPoemTitle = event.target.innerText;

         addNewPoem(poemUrl, newPoemTitle);


      }
   });





   // forksClick.addEventListener('click', function() {

   //    fetchPoem().then(function(result) {

   //       const newDiv = document.createElement('div');
   //       const newTitleEl = document.createElement('p');
   //       const textContent = result.title;

   //       newTitleEl.innerHTML = textContent;
   //       newDiv.appendChild(newTitleEl);
   //       newDiv.style.width = '33vw';

   //       forksContainer.appendChild(newDiv);

   //       let forksContainerPos = window.getComputedStyle(forksContainer).left;

   //       forksContainer.style.left = `calc(${forksContainerPos} - 33vw`;


   // });

   // })

   


 })