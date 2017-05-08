/* example api calls:
 * https://api.themoviedb.org/3/movie/115?api_key=1922c66ebaed294ac65a15f52834a49b
 * https://api.themoviedb.org/3/movie/115/credits?api_key=1922c66ebaed294ac65a15f52834a49b
 * https://api.themoviedb.org/3/movie/115/similar?api_key=1922c66ebaed294ac65a15f52834a49b
 */

function convertToJson (apiResponse) {
  return apiResponse.json();
}

function getDataFromAPI (url, params) {
  const key = "1922c66ebaed294ac65a15f52834a49b";
  let fullUrl =`https://api.themoviedb.org/3/${url}?api_key=${key}`; 
  if (params) {
    fullUrl += `&${params}`
  }
  return fetch(fullUrl).then(convertToJson);
}

function showMovieTitle (text) {
  const heading = document.querySelector('section h1');
  heading.textContent = text;
}

const baseUrl = "http://image.tmdb.org/t/p/original";
/* example image: 
 * http://image.tmdb.org/t/p/original/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg
 */

function showHeaderImg (path) {
  const headerImg = document.querySelector('img.backdrop');
  headerImg.src = `${baseUrl}/${path}`;
}

function showPoster (path) {
  const poster = document.querySelector('aside img');
  poster.src = `${baseUrl}/${path}`
}

function showTagline (text) {
  const p = document.querySelector('p.tagline');
  p.textContent = text;
}

function showOverview (text) {
  const p = document.querySelector('p.overview');
  p.textContent = text;
}

function showOnPage (data) {
  showMovieTitle(data.original_title);
  showHeaderImg(data.backdrop_path);
  showPoster(data.poster_path);
  showTagline(data.tagline);
  showOverview(data.overview);
  return data;
}

function getMovie (apiResponse) {
  const movie = apiResponse.results[0];
  return getDataFromAPI(`movie/${movie.id}`);
}

function getCast (data) {
  return getDataFromAPI(`movie/${data.id}/credits`)
}

function showCastMember (castMember) {
  const castSpace = document.querySelector('dl');
  const actorSpace = document.createElement('dt');
  actorSpace.textContent = castMember.name;
  castSpace.appendChild(actorSpace);
  const characterSpace = document.createElement('dd');
  characterSpace.textContent = castMember.character;
  castSpace.appendChild(characterSpace);
}

function showCast (data) {
  const castList = document.querySelector('dl');
  castList.innerHTML = '';
  data.cast.forEach(showCastMember);
}

function findAndShowMovie (event) {
  event.preventDefault();
  const input = document.querySelector('input');
  const title = input.value;
  getDataFromAPI('search/movie', `query=${title}`)
    .then(getMovie)
    .then(showOnPage)
    .then(getCast)
    .then(showCast)
}

const button = document.querySelector('button');
button.addEventListener('click', findAndShowMovie);
