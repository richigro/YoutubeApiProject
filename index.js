const url = "https://www.googleapis.com/youtube/v3/search";
const apiKey = "AIzaSyDsiCnzHCqff_GpKlF426N6BRoQo7I56Bo";

function removeLastView() {
  $(".js-main").children().remove();
}

function addToPage(video) {
  $(".js-main").append(video);
}

function renderVideoThumbnail(data) {
  return `
      <div id="${data.id.videoId}" class="js-thumbnail thumbnail">
        <div id="${data.id.videoId}" class="thumbnail-img-container">
          <img class="js-img thumbnail-img" src="${data.snippet.thumbnails.medium.url}" alt="" />
        </div>
        <div class="thumbnail-info">
          <h1>${data.snippet.title}</h1>
          <p>${data.snippet.channelTitle} 2.3B views ${data.snippet.publishedAt}</p>
          <p>${data.snippet.description}</p>
        </div>  
      </div>
  `;
}

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: apiKey,
    q: `${searchTerm}`,
    maxResults: 25
  }
  $.getJSON(url, query, callback);
}

function printResult(data) {
  // array containing data items
  const objectArray = data.items;
  //  console.log(objectArray[0]);
  
  objectArray.forEach((videoObject) => {
     addToPage(renderVideoThumbnail(videoObject));
  });

}

function search(){
  let userQuery = "";
  $("button").click(function(event) {
    // remove current view
    removeLastView();

    userQuery = $('input[type="text"]').val();
   // clear text field
    $('input[type="text"]').val("");
    
    // get yOutube data from api 
    getDataFromApi(userQuery, printResult);


  });
}

function viewingPage(id) {
  return `
    <div class="video-view" >
        <iframe class="video" width="560" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div> 
  
  `;
}





function goToVideo() {
  $(".js-main").on("click", ".js-thumbnail", (event) => {
    // open another page with tagret url
    // remove video on page
    let videoId = event.target.parentElement.getAttribute("id");
    console.log("===========================================");
    console.log(videoId);
    removeLastView();
     // render new view
    addToPage(viewingPage(videoId));
  });
}

function runApp() {
  // do stuff
  search();
  goToVideo();
}

 $(runApp);
