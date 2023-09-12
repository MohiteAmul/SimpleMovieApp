const API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.dsec&api_key=346b96f5477a58a9e70105144cfe1fc8'
const SERACH_URL='https://api.themoviedb.org/3/search/movie?api_key=346b96f5477a58a9e70105144cfe1fc8&query="'
const IMG_PATH='https://image.tmdb.org/t/p/w1280'
const API_KEY='346b96f5477a58a9e70105144cfe1fc8'
const form=document.querySelector('.search')
const search=document.querySelector('.search-box')
const main=document.querySelector('main')
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=346b96f5477a58a9e70105144cfe1fc8

getMovies(API_URL)
async function getMovies(url){
    const res=await fetch(url)
    const data=await res.json()

    showMovies(data.results);
}

function showMovies(movies){
    main.innerHTML=''
    movies.forEach((movie)=>{
        const {title,poster_path,vote_average,overview}=movie
        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML=` <img
        src="${IMG_PATH + poster_path}"
        alt=""
        srcset=""
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average )}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>`
      main.appendChild(movieEl)
    })
}
function getClassByRate(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }

}
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchTerm=search.value

    if(searchTerm && searchTerm!==''){
        getMovies(SERACH_URL + searchTerm)

        search.value=''
    }else{
        window.location.reload()
    }
})