const apiKey = "fbe4c6d4f2a46c67e73bc50835e4b662";

const genreMap = {
  35: "Comédia",
  28: "Ação",
  10749: "Romance",
  16: "Animação",
  18: "Drama",
};

// Função genérica para obter filmes com ou sem gênero
async function getMovies(genreId = null) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&page=${numberRandom(
    1,
    10
  )}&sort_by=vote_count.desc&vote_average.gte=7`;

  if (genreId) {
    url += `&with_genres=${genreId}`;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
}

/* Função para pegar filmes somente de comédia e romance
   Legenda :   %20 = Espaço
               %2C = Vírgula
                35 = Comédia
             10749 = Romance
             
*/

// Pega informações extras do filme
// https://api.themoviedb.org/3/movie/{movie_id}
async function getMoreInfo(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g",
    },
  };

  try {
    return fetch(
      "https://api.themoviedb.org/3/movie/" + id + "?language=pt-BR",
      options
    ).then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
}

// Função para assistir trailer no Youtube
// https://api.themoviedb.org/3/movie/{movie_id}/videos
async function watch(e) {
  const movie_id = e.currentTarget.dataset.id;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g",
    },
  };

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=pt-BR`,
      options
    ).then((response) => response.json());

    const { results } = data;

    const youtubeVideo = results.find((video) => video.type === "Trailer");

    window.open(`https://youtube.com/watch?v=${youtubeVideo.key}`, "blank");
  } catch (error) {
    console.log(error);
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

        <div class="stars">
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

      <button class="watch-trailer" onclick="watch(event)" data-id="${id}" data-genre="${genre}">
        <img src="./assets/icons/Play.svg" alt="">

        <span>Assistir Trailer</span>
      </button>
      ${
        Array.isArray(streamingImg) &&
        streamingImg.length > 0 &&
        streamingImg.length < 3
          ? `<div class="streamings">${streamingImg
              .map((img) => `<img src="${img}" alt="Streaming">`)
              .join("")}</div>`
          : ""
      }
    </div>
  `;
}

async function getStreaming(id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmU0YzZkNGYyYTQ2YzY3ZTczYmM1MDgzNWU0YjY2MiIsInN1YiI6IjY0Y2IxMzBmNzA2ZTU2MDE0ZWMzZThhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hXwniJ4G1OXopv24yN6A3uJnjLAatmHOxChrpp3W_g",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      options
    );
    const data = await response.json();

    if (!data.results?.BR?.flatrate) {
      console.log("Nenhuma informação de provedores encontrada para o Brasil.");
      return null;
    }

    // Pegar os `logo_path` de cada provedor dentro de `flatrate`
    const logos = data.results.BR.flatrate.map(
      (provider) => `https://image.tmdb.org/t/p/w500${provider.logo_path}`
    );
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
  const random = () => Math.floor(Math.random() * results.length);

  let selectedVideos = new Set();
  while (selectedVideos.size < 5) {
    selectedVideos.add(results[random()].id);
  }

  return [...selectedVideos];
}

// Função que pega um numero aleatório entre dois números para usar como número da página de busca dos filmes
function numberRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para transformar tempo de minutos em Horas:Minutos:Segundos
function minutesToHourMinutesAndSeconds(minutes) {
  const date = new Date(null);
  date.setMinutes(minutes);
  return date.toISOString().slice(11, 19);
}

// Função que inicia o site
async function start(genreId = null) {
  const moviesContainer = document.querySelector(".movies");
  const loadingTemplate = document.getElementById("loading-template");

  // 🌀 Mostra os 5 placeholders de loading
  moviesContainer.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const clone = loadingTemplate.cloneNode(true);
    clone.removeAttribute("id");
    clone.style.display = "block";
    moviesContainer.appendChild(clone);
  }

  // 🔍 Busca os filmes
  const { results } = await getMovies(genreId);

  // 🎯 Seleciona 5 filmes
  const best5 = select5Videos(results).map(async (movie) => {
    const info = await getMoreInfo(movie);
    const streamings = info?.id ? await getStreaming(info.id) : [];

    const props = {
      id: info.id,
      genre: info.genres[0],
      title: info.title,
      stars: Number(info.vote_average).toFixed(1),
      image: info.poster_path,
      time: minutesToHourMinutesAndSeconds(info.runtime),
      year: info.release_date.slice(0, 4),
      streamingImg: streamings,
    };

    return createMovieLayout(props);
  });

  // 🧩 Aguarda os layouts
  const output = await Promise.all(best5);

  // ✅ Substitui os placeholders pelo conteúdo real
  moviesContainer.innerHTML = output.join("");
}

start();

let currentIndex = 0;

function scrollToMovie(index) {
  const movies = document.querySelectorAll(".movie");
  const moviesContainer = document.querySelector(".movies");
  if (index >= 0 && index < movies.length) {
    moviesContainer.style.transform = `translateX(-${index * 100}%)`;
  }
}

function showLoading() {
  const container = document.getElementById("movies-container");

  // Captura o modelo original de filme (template) do HTML
  const template = document.querySelector(".movie");

  // Limpa tudo do container antes de recriar os loadings
  container.innerHTML = "";

  // Cria e adiciona 5 cópias do template de loading
  for (let i = 0; i < 5; i++) {
    const clone = template.cloneNode(true);
    container.appendChild(clone);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o botão burger e a lista de links mobile
  const menugen = document.querySelector(".gen");
  const genlist = document.querySelector(".menugens");
  const navLinks = genlist.querySelectorAll(".menugens a");

  genlist.style.display = "none";
  // Adiciona um evento de clique ao botão burger
  menugen.addEventListener("click", () => {
    // Verifica se a lista de links mobile está visível
    if (genlist.style.display === "block") {
      // Se visível, oculta a lista
      genlist.style.display = "none";
    } else {
      // Se não visível, exibe a lista
      genlist.style.display = "block";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Oculta a lista de links móveis quando um link é clicado
      genlist.style.display = "none";
    });
  });
});
