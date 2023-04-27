var apiKey = 'sk-iCaf64474eccc478b625'
var imgBtn = document.querySelector('.image-btn')


function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = `https://perenual.com/api/species-list?page=1&key=${apiKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      }
      )};

      imgBtn.addEventListener('click', function() {
        console.log('clicked')
        getApi()
      })

