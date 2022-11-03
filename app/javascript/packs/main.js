document.addEventListener("turbolinks:load", () => {

   let onMobile = function() {
      let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
    
      if (isMobile) {
          return true
      } else {
        return false
      }
    };

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

   function setInitialForkTime() {
      let initialFork = document.querySelector('.js-intro-fork');

      initialFork.setAttribute('data-starttime', Math.floor(Date.now() / 1000));
   }

   setInitialForkTime();
   
   function fetchPoem(poemUrl) {
         return fetch(poemUrl).then(function(response) {
            return response.json();
         }).then(function(json) {
            return json;
         });
   }

   function addNewPoem(poemUrl, newPoemTitle) {

      fetchPoem(poemUrl, newPoemTitle).then(function(result) {

         const forkContainer = document.createElement('div');
         const newTitleEl = document.createElement('p');
         const newBodyEl = document.createElement('div');
         let newBodyContent = result.body;

         newTitleEl.innerHTML = newPoemTitle;
         newTitleEl.style.marginBottom = '12px';
         newTitleEl.style.textTransform = 'capitalize';
         newBodyEl.insertAdjacentHTML("afterbegin", newBodyContent);
         forkContainer.appendChild(newTitleEl);
         forkContainer.appendChild(newBodyEl);
         forkContainer.classList.add('fork-holder');

         forkContainer.setAttribute('data-starttime', Math.floor(Date.now() / 1000));
         forkContainer.setAttribute('poem-id', result.id);

         allForksContainer.appendChild(forkContainer);

         let forksContainerPos = window.getComputedStyle(allForksContainer).left;

         if (!onMobile(forksContainerPos)) {
            allForksContainer.style.left = `calc(${forksContainerPos} - 33vw`;
          } else {
            allForksContainer.style.left = `calc(${forksContainerPos} - 100vw`;
          }

   });
      
   }

   function addBreadcrumb(forkID, newPoemTitle) {
      let breadcrumbsContainer = document.querySelector('.js-breadcrumbs-container');

      const breadcrumbLinkEl = document.createElement('a');
      breadcrumbLinkEl.innerHTML = newPoemTitle;
      breadcrumbLinkEl.style.textTransform = 'capitalize';
      breadcrumbLinkEl.setAttribute('href', forkID);

      breadcrumbsContainer.prepend(breadcrumbLinkEl);
   }

   function onClickPoemLink(event) {
      event.preventDefault();

      let 
      forkID = event.target.getAttribute('href'), 
      poemUrl = `http://127.0.0.1:3000/poems/${forkID}.json`,
      newPoemTitle = event.target.innerText;

      addNewPoem(poemUrl, newPoemTitle);

      addBreadcrumb(forkID, newPoemTitle);

      /// THIS IS WORKING WHEN POEMS ARE CLICKED ON LINK
      /// WHEN CLICKED THRU BREADCRUMB
      /// IT CAN'T FIND CLOSEST FORK HOLDER
      let forkStartTime = event.target.closest('.fork-holder').getAttribute('data-starttime'),
      clickedForkID = event.target.closest('.fork-holder').getAttribute('poem-id');

      showTime(forkStartTime, clickedForkID);

      findAndSubmitForm(clickedForkID);
   }


   let 
   allForksContainer = document.querySelector('#js-forks-container'),
   allBreadcrumbsContainer = document.querySelector('.js-breadcrumbs-container');

   allBreadcrumbsContainer.addEventListener('click', function(event) {
      if (event.target && event.target.nodeName == "A") {
        onClickPoemLink(event);
      }
   });

   allForksContainer.addEventListener('click', function(event) {
      if(event.target && event.target.nodeName == "A") {
         onClickPoemLink(event);
      }
   });

   function showTime(forkStartTime, clickedForkID) {
      let timeNow = Math.floor(Date.now() / 1000);
      let timeElapsed = timeNow - forkStartTime;

      console.log('ID', clickedForkID, 'Seconds Reading', timeElapsed)
   };

   function findAndSubmitForm(clickedForkID) {
      let form = document.querySelector(`#edit_poem_${clickedForkID}`);

      console.log('ID', clickedForkID, form);
   }


 })