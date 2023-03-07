const movieList = document.getElementById("movie-list");
const movieShowList = (item) => `
<div class=" grid-item">
    <div class="card">
        <img src=https://image.tmdb.org/t/p/original/${item.poster_path} width="100%" height="250">
        <div class="container">
                <h4>
                    <b>
                    ${item.title}
                    </b>
                </h4> 
                <p>
                ${item.popularity}
                </p>
        </div>
    </div>
</div>
        
`;
const fetchingData = async () => {
  const fetching = await fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=6916b5833979b9f679193d591cd740a7"
  );
  const convertToJson = await fetching.json();
  return convertToJson;
};

const showData = async () => {
  try {
    const fetchData = await fetchingData();
    fetchData.results.map((item) => {
      return (movieList.innerHTML += movieShowList(item));
    });
  } catch (error) {
    console.log(error);
  }
};

const sortData = async (value) => {
  const fetchData = await fetchingData();
  movieList.innerHTML = ``;
  switch (value) {
    case "ASC_BY_POPULARITY":
      fetchData.results
        .sort((itemA, itemB) => {
          return itemB.popularity - itemA.popularity;
        })
        .map((item) => {
          return (movieList.innerHTML += movieShowList(item));
        });
      break;
    case "DESC_BY_POPULARITY":
      fetchData.results
        .sort((itemA, itemB) => {
          return itemA.popularity - itemB.popularity;
        })
        .map((item) => {
          return (movieList.innerHTML += movieShowList(item));
        });
      break;
    default:
      break;
  }
};
showData();
