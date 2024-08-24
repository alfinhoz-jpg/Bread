const apiKey = "9156d44c8f14b8e16f9160b631dde46e";
const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb,org/3/search/movie?api_key=${apiKey}&query=`
const form = document.getElementById("search-form");
const query = document.getElementById("search-input");
const result  = document.getElementById("result");

let page = 1;
let isSearching = false;

//Fetch não mostrando o resultado pela url
async function fetchData(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Internet ruim, tente novamente.")
        }
        return await response.json();
    }catch (error){
        return null;
    }
}

//Fetch mostrando resultados por url
async function fetchAndShowResults(url){
    const data = await fetchData(url);
    if(data && data.result) {
        showResults(data.result);
    }
}

//Criar template cards de filmes no html
function createMovieCard(movie){
    const { posterPath, originalTitle, releaseDate, overview} = movie;
    const imagePath = posterPath ? imgApi + posterPath : "./img-01.jpeg";
    const truncatedTitle = originalTitle.length > 15 ? originalTitle.slice(0, 15) + ". . ." : originalTitle;
    const formattedDate = releaseDate || "No release date";
    const cardTemplate = `
        <div class="column">
            <div class="card">
                <a class="card-media" href="./img-01>.jpeg">
                <img src="${imagePath}" alt="${originalTitle}"
                width="100%">
                </a>
                <div class="card-content">
                    <div class="card-header">
                        <div class="left-content">
                            <h3 style="font-weight: 600">${truncatedTitle}</h3>
                            <span style="color: #12efec">${formattedDate}</span>
                        </div>
                        <div class="right-content">
                            <a href="${imagePath}" target="_blank" class="card-btn">Ver capa</a>
                        </div>
                    </div>
                    <div class="info">
                        ${overview || "Sem descrição. . ."}
                    </div>
                </div>
            </div>
        </div>
    `;
    return cardTemplate;
}

//Limpar resultados de pesquisas
function clearResults(){
    result.innerHTML = "";

}

//Mostrar resultados na página
function showResults(item){
    const newContent = item.map(createMovieCard).join("");
    result.innerHTML = newContent || "<p>Sem resultados.</p>"
}

//