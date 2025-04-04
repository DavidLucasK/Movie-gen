
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

async function getMoviesFilter() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=16', options)
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
  year,
  streamingImg,
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
      ${
        Array.isArray(streamingImg) && streamingImg.length > 0 && streamingImg.length < 3
          ? `<div class="streamings">${streamingImg.map(img => `<img src="${img}" alt="Streaming">`).join('')}</div>`
          : ''
      }
    </div>
  `
}

// Comedia
async function getMoviesComedy() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=35', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

// Comedia
async function getMoviesAction() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=28', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

// Romance
async function getMoviesRomance() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=10749', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

// Animação
async function getMoviesAnimation() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=16', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

// Drama
async function getMoviesDrama() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&&page=' + numberRandom(1, 10) + '&sort_by=vote_count.desc&vote_average.gte=7&with_genres=18', options)
      .then(response => response.json())
  } catch(error) {
    console.log(error)
  }

}

async function getStreaming(id) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, options);
    const data = await response.json();

    if (!data.results?.BR?.flatrate) {
      console.log("Nenhuma informação de provedores encontrada para o Brasil.");
      return null;
    }

    // Pegar os `logo_path` de cada provedor dentro de `flatrate`
    const logos = data.results.BR.flatrate.map(provider => `https://image.tmdb.org/t/p/w500${provider.logo_path}`);
    // const logos = `https://image.tmdb.org/t/p/w500${data.results.BR.flatrate[0].logo_path}`;

    console.log(logos); // Exibe os caminhos das imagens
    return logos; // Retorna o array com os caminhos das imagens

  } catch (error) {
    console.error("Erro ao buscar provedores:", error);
    return null;
  }
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

//Função que pega os generos

async function getGenre() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g'
    }
  };

  try {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=pt', options)
    .then(response => response.json())
  } catch (error) {
    console.log(error)
  }
}

// Função que inicia o site
async function start() {
  // pegar as sugestões de filmes da API
  const { results } = await getMovies()
  // pegar randomicamente 5 filmes para sugestão
  const best5 = select5Videos(results).map(async movie => {
  // pegar informações extras do 5 filmes
  const info = await getMoreInfo(movie);

  const streamings = info?.id ? await getStreaming(info.id) : [];

  // organizar os dados para ...
    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best5)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

start();

// Função que inicia o site
async function startComedy() {
  // pegar as sugestões de filmes da API
  const { results } = await getMoviesComedy()
  // pegar randomicamente 5 filmes para sugestão
  const best5 = select5Videos(results).map(async movie => {
  // pegar informações extras do 5 filmes
  const info = await getMoreInfo(movie);

  const streamings = info?.id ? await getStreaming(info.id) : [];

  // organizar os dados para ...
    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best5)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

// Função que inicia o site
async function startAction() {
  // pegar as sugestões de filmes da API
  const { results } = await getMoviesAction()
  // pegar randomicamente 5 filmes para sugestão
  const best5 = select5Videos(results).map(async movie => {
  // pegar informações extras do 5 filmes
  const info = await getMoreInfo(movie)

  const streamings = info?.id ? await getStreaming(info.id) : [];

  // organizar os dados para ...
    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best5)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

// Função que inicia o site
async function startRomance() {
  // pegar as sugestões de filmes da API
  const { results } = await getMoviesRomance()
  // pegar randomicamente 5 filmes para sugestão
  const best5 = select5Videos(results).map(async movie => {
  // pegar informações extras do 5 filmes
  const info = await getMoreInfo(movie)

  const streamings = info?.id ? await getStreaming(info.id) : [];

  // organizar os dados para ...
    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best5)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

// Função que inicia o site
async function startAnimation() {
  // pegar as sugestões de filmes da API
  const { results } = await getMoviesAnimation()
  // pegar randomicamente 5 filmes para sugestão
  const best5 = select5Videos(results).map(async movie => {
  // pegar informações extras do 5 filmes
  const info = await getMoreInfo(movie)

  const streamings = info?.id ? await getStreaming(info.id) : [];

  // organizar os dados para ...
    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best5)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

// Função que inicia o site
async function startDrama() {
  // pegar as sugestões de filmes da API
  const { results } = await getMoviesDrama()
  // pegar randomicamente 5 filmes para sugestão
  const best5 = select5Videos(results).map(async movie => {
  // pegar informações extras do 5 filmes
  const info = await getMoreInfo(movie)

  const streamings = info?.id ? await getStreaming(info.id) : [];

  // organizar os dados para ...
    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings
    }
    console.log(props)
    return createMovieLayout(props)
  })

  const output = await Promise.all(best5)
  
  
  // Substitue o conteúdo dos movies no arquivo HTML
  document.querySelector('.movies').innerHTML = output.join("")
}

let currentIndex = 0;

function scrollToMovie(index) {
    const movies = document.querySelectorAll('.movie');
    const moviesContainer = document.querySelector('.movies');
    if (index >= 0 && index < movies.length) {
        moviesContainer.style.transform = `translateX(-${index * 100}%)`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
  // Seleciona o botão burger e a lista de links mobile
  const menugen = document.querySelector('.gen');
  const genlist = document.querySelector('.menugens');
  const navLinks = genlist.querySelectorAll('.menugens a');

  genlist.style.display = 'none';
  // Adiciona um evento de clique ao botão burger
  menugen.addEventListener('click', () => {
    // Verifica se a lista de links mobile está visível
    if (genlist.style.display === 'block') {
      // Se visível, oculta a lista
      genlist.style.display = 'none';
    } else {
      // Se não visível, exibe a lista
      genlist.style.display = 'block';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Oculta a lista de links móveis quando um link é clicado
      genlist.style.display = 'none';
    });
  });
});