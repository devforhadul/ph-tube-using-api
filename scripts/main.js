
function removeActiveClass(){
  const activeClass = document.getElementsByClassName('active');
  
  for(const btn of activeClass){
    btn.classList.remove('active');
  }
  
}

function loadCategory() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategorys(data.categories))
}


function displayCategorys(category) {

    const categoryBox = document.getElementById('categoryBox');
    for (const cat of category) {
        //console.log(cat);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <button
            id="btn-${cat.category_id}"
            onclick="cickCategorybyVideo(${cat.category_id})"
            class="bg-[#25252526] px-5 py-1 rounded hover:bg-green-600 hover:text-white text-gray-700 font-semibold categoryClass"
          >${cat.category}</button>
        `;
        categoryBox.append(categoryDiv);

    }
}

const cickCategorybyVideo = (id)=>{

  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>{
    displayVideos(data.category)
    
    removeActiveClass()
    const clickedButton = document.getElementById(`btn-${id}`)
    clickedButton.classList.add('active');
    

  })

}

loadVideos()
function loadVideos(searchIp ="") {
    console.log(searchIp);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchIp}`)
        .then(res => res.json())
        .then(data => {
          removeActiveClass();
          document.getElementById('btnAll').classList.add('active');
          displayVideos(data.videos)
        
        })
}




function displayVideos(videos) {


    const elementBox = document.getElementById('elementBox');
    elementBox.innerHTML = "";

    
    if(videos.length === 0){
      elementBox.innerHTML=`
      <div
        class="py-20 col-span-full flex flex-col justify-center items-center text-center"
      >
        <img class="w-[120px]" src="./assets/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
      `;
      return;
    }

    videos.forEach(video => {
        //console.log(video);
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="card bg-base-100 ">
            <figure class="relative">
              <img
                src="${video.thumbnail}"
                alt="Shoes"
                class="w-full h-[200px] object-cover"
              />
              <span
                class="absolute bottom-2 right-1 bg-black text-white px-2 py-1 rounded-sm text-sm"
                >3hrs 56 min ago</span
              >
            </figure>
            <div class="card-body flex flex-row gap-3 px-0">
              <div class="profile">
                <div class="avatar">
                  <div
                    class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2"
                  >
                    <img
                      src="${video.authors[0].profile_picture}"
                    />
                  </div>
                </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-gray-400 text-sm flex gap-1">${video.authors[0].profile_name}
                ${(video.authors[0].verified === true) ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ""}
                </p>
                <p class="text-gray-400 text-sm">${video.others.views} views</p>
              </div>
            </div>
            <button onclick="showDeteils('${video.video_id}')"  class="btn btn-block">See Deteils</button>
          </div>
        `;
        elementBox.append(videoDiv);

        document.getElementById('searchBox').addEventListener('keyup', (e)=>{
    
          const searchIp = e.target.value;
          loadVideos(searchIp);
          
      
        })
        


    })

}

const showDeteils = (getId)=>{

  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${getId}`)
  .then(res=>res.json())
  .then(data=> displayModalCard(data.video))

  document.getElementById('modal-box').showModal();
  

}

const displayModalCard = (modalVideo)=>{
  console.log(modalVideo);
  const modalInfo = document.getElementById('modalInfo');
  modalInfo.innerHTML = `
  <h3 class="text-lg font-bold">${modalVideo.title}</h3>
<img class="w-full object-cover" src="${modalVideo.thumbnail}" alt="">
  
  <p class="py-4">${modalVideo.authors[0].profile_name}</p>
  <p class="py-4">${modalVideo.description}</p>
  `;

  

}




// Load data form web...
loadCategory()
