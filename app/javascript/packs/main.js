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
         let totalSecsRead = result.total_read_time;

         newTitleEl.innerHTML = newPoemTitle;
         newTitleEl.style.marginBottom = '12px';
         newTitleEl.style.textTransform = 'capitalize';
         newBodyEl.insertAdjacentHTML("afterbegin", newBodyContent);
         forkContainer.appendChild(newTitleEl);
         forkContainer.appendChild(newBodyEl);
         forkContainer.classList.add('fork-holder');

         forkContainer.setAttribute('data-starttime', Math.floor(Date.now() / 1000));
         forkContainer.setAttribute('poem-id', result.id);

         forkContainer.setAttribute('data-totalreadtime', totalSecsRead);

         allForksContainer.appendChild(forkContainer);

         let forksContainerPos = window.getComputedStyle(allForksContainer).left;

         if (!onMobile(forksContainerPos)) {
            allForksContainer.style.left = `calc(${forksContainerPos} - 33vw`;
          } else {
            allForksContainer.style.left = `calc(${forksContainerPos} - 100vw`;
          }


         let forkTimeSpan = document.querySelector('.js-fork-total-read-time'),
         forkCalculatedTime = calculateForkReadTime(totalSecsRead);

         forkTimeSpan.innerHTML = forkCalculatedTime;

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

   }


   let 
   allForksContainer = document.querySelector('#js-forks-container'),
   allBreadcrumbsContainer = document.querySelector('.js-breadcrumbs-container');

   allBreadcrumbsContainer.addEventListener('click', function(event) {
      if (event.target && event.target.nodeName == "A") {
        onClickPoemLink(event);

      //   console.log(event.target.parentElement.children[1])

      //   console.log(allForksContainer.lastChild)

        let forkStartTime = allForksContainer.lastChild.getAttribute('data-starttime'),
        clickedForkID = allForksContainer.lastChild.getAttribute('poem-id'),
        prevReadTime = allForksContainer.lastChild.getAttribute('data-totalreadtime');

      //   showTime(forkStartTime);
   
        findAndSubmitForm(clickedForkID, forkStartTime, prevReadTime);

      }
   });

   allForksContainer.addEventListener('click', function(event) {
      if(event.target && event.target.nodeName == "A") {
         onClickPoemLink(event);

         let forkStartTime = event.target.closest('.fork-holder').getAttribute('data-starttime'),
         clickedForkID = event.target.closest('.fork-holder').getAttribute('poem-id'),
         prevReadTime = event.target.closest('.fork-holder').getAttribute('data-totalreadtime');
   
         findAndSubmitForm(clickedForkID, forkStartTime, prevReadTime);
      }
   });

   function showTime(forkStartTime) {
      let timeNow = Math.floor(Date.now() / 1000);
      let timeElapsed = timeNow - forkStartTime;

      return timeElapsed;
   };

   function findAndSubmitForm(clickedForkID, forkStartTime, prevReadTime) {
      let form = document.querySelector(`#edit_poem_${clickedForkID}`),
      inputField = form.querySelector('input#poem_total_read_time');

      let timeElapsed = showTime(forkStartTime);

      let totalReadTime = parseInt(prevReadTime) + parseInt(timeElapsed);

      inputField.setAttribute("value", totalReadTime);

      form.submit();
   }

   function calculateForkReadTime(totalSecsRead) {
      let mins = Math.floor(totalSecsRead / 60),
      secs = totalSecsRead % 60;

      var totalFormattedTime = 0;
    
      if (mins < 1) {
         totalFormattedTime = secs + ' secs'
      } else if (mins == 1) {
         totalFormattedTime = mins + ' min and ' + secs + ' secs'
      } else {
         totalFormattedTime = mins + ' mins and ' + secs + ' secs'
      }
      
      return totalFormattedTime;
   }


 })