const API_PATH = "https://kitsu.io/api/edge"

const content_to_listen = document.getElementById("anime-name")
content_to_listen.addEventListener("keypress", data => {
    if(data.key === "Enter"){
        getName()
    }
})

function getName(){
    const content = document.getElementById("anime-name")
    if (content.value !== ""){
        getData(content.value)
    }
}

function getData(anime_name){
    fetch(API_PATH + `/anime?filter[text]=${anime_name}`, {
        headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json"
        }
    })
    .then(response => response.json())
    .then(data => {
        let anime_section = document.getElementById("anime-search-section")
        clean_section_anime(anime_section)
        create_elements(data, anime_section)
        console.log(data.data[0])
        // Arriba nada se borra equisde
    })
}

function clean_section_anime(anime_section){
    if(anime_section.hasChildNodes()){
        let first = anime_section.firstElementChild
        while(first){
            first.remove()
            first = anime_section.firstElementChild
        }
    }
}

function create_elements(data, anime_section){
    let anime_title = document.createElement("h2")
    anime_title.innerHTML = `${data.data[0].attributes.titles.en_jp}`
    let anime_title_jap = document.createElement("h3")
    anime_title_jap.innerHTML = `${data.data[0].attributes.titles.ja_jp}`
    let anime_image = document.createElement("img")
    anime_image.src = `${data.data[0].attributes.posterImage.large}`
    let anime_synopsis = document.createElement("p")
    anime_synopsis.innerHTML = `${data.data[0].attributes.synopsis}`
    let anime_total_episodes = document.createElement("p")
    anime_total_episodes.innerHTML = `Total Episodes: ${data.data[0].attributes.episodeCount}`
    let anime_total_duration = document.createElement("p")
    anime_total_duration.innerHTML = `Episode Duration: ${data.data[0].attributes.episodeLength} min`
    let anime_start_date = document.createElement("p")
    anime_start_date.innerHTML = `Start date: ${data.data[0].attributes.startDate}`
    let anime_end_date = document.createElement("p")
    anime_end_date.innerHTML = `End date: ${data.data[0].attributes.endDate}`
    let anime_show_type = document.createElement("p")
    anime_show_type.innerHTML = `Show Type: ${data.data[0].attributes.showType}`
    let anime_nsfw = document.createElement("p")
    anime_nsfw.innerHTML = `NSFW: ${nsfw_anime_status(data)}`
    let anime_status = document.createElement("p")
    anime_status.innerHTML = `Status: ${data.data[0].attributes.status}`

    anime_section.appendChild(anime_image)
    anime_section.appendChild(anime_title)
    anime_section.appendChild(anime_title_jap)
    anime_section.appendChild(anime_synopsis)
    anime_section.appendChild(anime_total_episodes)
    anime_section.appendChild(anime_total_duration)
    anime_section.appendChild(anime_start_date)
    anime_section.appendChild(anime_end_date)
    anime_section.appendChild(anime_show_type)
    anime_section.appendChild(anime_nsfw)
    anime_section.appendChild(anime_status)
}

function nsfw_anime_status(data){
    let nsfw_status = data.data[0].attributes.nsfw
    if(nsfw_status === true){
        return "Yes"
    }
    return "No"
}