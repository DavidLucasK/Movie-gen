// https://developer.themoviedb.org/reference/movie-popular-list
async function getMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

/* Função para pegar filmes somente de comédia e romance
   Legenda :   %20 = Espaço
               %2C = Vírgula
                35 = Comédia
             10749 = Romance
*/
async function getMoviesRomanceComedy() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=35%20%2C%2010749', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

// Pega informações extras do filme
// https://api.themoviedb.org/3/movie/{movie_id}
async function getMoreInfo(id) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/movie/' + id +'?language=pt-BR', options)
    .then(response => response.json())
  } catch (error) {
    console.log(error)
  }
}

// Função para assistir trailer no Youtube
// https://api.themoviedb.org/3/movie/{movie_id}/videos
async function watch(e) {
  const movie_id = e.currentTarget.dataset.id
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=pt-BR`, options)
    .then(response => response.json())

    const { results } = data

    const youtubeVideo = results.find(video => video.type === "Trailer")

    window.open(`https://youtube.com/watch?v=${youtubeVideo.key}`, 'blank')

  } catch (error) {
    console.log(error)
  }
  
}

// Função que cria o layout de cada 'movie' a partir das variáveis
function createMovieLayout({
  id,
  genre,
  title,
  stars,
  image,
  time,
  year
}) {
  return `
  <div class="movie">
    <div class="title">
      <span>${title}</span>

      <div>
        <img src="./assets/icons/Star.svg" alt="">

        <p>${stars}</p>
      </div>
    </div>

    <div class="poster">
      <img src="https://image.tmdb.org/t/p/w500${image}" alt="Imagem de ${title}">
    </div>

    <div class="info">
      <div class="duration">
        <img src="./assets/icons/Clock.svg" alt="">

        <span>${time}</span>
      </div>

      <div class="year">
        <img src="./assets/icons/calendar-blank.svg" alt="">

        <span>${year}</span>
      </div>
    </div>

    <button onclick="watch(event)" data-id="${id}" data-genre="${genre}">
      <img src="./assets/icons/Play.svg" alt="">

      <span>Assistir Trailer</span>
    </button>
  </div>
  `
}

// Função que seleciona 5 filmes na API
function select5Videos(results) {
  const random = ()=> Math.floor(Math.random() * results.length)

  let selectedVideos = new Set()
  while(selectedVideos.size < 5) {
    selectedVideos.add(results[random()].id)
  }

  return [...selectedVideos]
}

// Função que pega um numero aleatório entre dois números para usar como número da página de busca dos filmes
function numberRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para transformar tempo de minutos em Horas:Minutos:Segundos
function minutesToHourMinutesAndSeconds(minutes) {
  const date = new Date(null)
  date.setMinutes(minutes)
  return date.toISOString().slice(11, 19)
}

// Função que inicia o site
async function start() {
  // pegar as sugestões de filmes da API
  const { results } = await getMovies()
  // pegar randomicamente 5 filmes para sugestão
  const best3 = select5Videos(results).map(async movie => {
    // pegar informações extras do 3 filmes
    const info = await getMoreInfo(movie)

    // organizar os dados para ...
    const props = {
      id: info.id,
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4)
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best3)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

start()