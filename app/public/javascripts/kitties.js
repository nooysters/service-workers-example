'use strict';

(function() {
  const imageTag = document.getElementById('kittyImage');

  const numImages = 9;
  let currImage = 0;

  function updateImage(url, element) {
    fetch(url).then(function(response) {
        if(response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      }).then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        element.src = objectURL;
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      })
  }


  function nextImage() {
    currImage++;
    const imageId = currImage % numImages;
    updateImage(`images/${imageId}.jpg`, imageTag);
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  imageTag.addEventListener('mouseup', nextImage);
})();
