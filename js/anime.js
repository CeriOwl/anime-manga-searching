const API_PATH = "https://kitsu.io/api/edge"

const content_to_listen = document.getElementById("anime-name")
content_to_listen.addEventListener("keypress", data => {
    if(data.key === "Enter"){
        resizeInput()
        getName()
    }
})

const button_menu = document.getElementById("menu-icon")
button_menu.addEventListener("click", () => {
    const menu = document.getElementById("menu-to-displayed")
    if(menu.className === "menu-displayed"){
        menu.className = "menu-not-displayed"
    }else{
        menu.className = "menu-displayed"   
    }
})

function resizeInput(){
    let input_anime = document.getElementById("search-anime")
    console.log(input_anime.className = "searching-on")
}

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

    anime_section.className = "anime-search-section"

    anime_section.style.backgroundImage = `url(${data.data[0].attributes.coverImage.original})`

    let anime_section_info = document.createElement("section")
    anime_section_info.className = "anime-section-info"

    let div_title = document.createElement("div")
    div_title.className = "div-title"

    let anime_title = document.createElement("h2")
    anime_title.innerHTML = `${data.data[0].attributes.titles.en_jp}`
    
    let div_subtitle = document.createElement("div")
    div_subtitle.className = "div-subtitle"

    let anime_title_jap = document.createElement("h3")
    anime_title_jap.innerHTML = `${data.data[0].attributes.titles.ja_jp}`
    
    let container_img = document.createElement("figure")
    
    let anime_image = document.createElement("img")
    anime_image.className = "anime_cover"
    anime_image.src = `${data.data[0].attributes.posterImage.large}`


    let anime_synopsis = document.createElement("p")
    anime_synopsis.className = "anime-synopsis"
    anime_synopsis.innerHTML = `${data.data[0].attributes.synopsis}`

    let div_data = document.createElement("div")
    div_data.className = "div-data"

    let anime_total_episodes = document.createElement("p")
    anime_total_episodes.innerHTML = `<strong>Total Episodes: </strong>${data.data[0].attributes.episodeCount}`
    
    let anime_total_duration = document.createElement("p")
    anime_total_duration.innerHTML = `<strong>Episode Duration: </strong>${data.data[0].attributes.episodeLength} min`
    
    let anime_start_date = document.createElement("p")
    anime_start_date.innerHTML = `<strong>Start date: </strong>${data.data[0].attributes.startDate}`
    
    let anime_end_date = document.createElement("p")
    anime_end_date.innerHTML = `<strong>End date: </strong>${data.data[0].attributes.endDate}`
    
    let anime_show_type = document.createElement("p")
    anime_show_type.className = "anime-show-type"
    anime_show_type.innerHTML = `<strong>Show Type: </strong>${data.data[0].attributes.showType}`
    
    let anime_nsfw = document.createElement("p")
    anime_nsfw.innerHTML = `<strong>NSFW: </strong>${nsfw_anime_status(data)}`
    
    let anime_status = document.createElement("p")
    anime_status.className = "anime-status"
    anime_status.innerHTML = `<strong>Status: </strong>${data.data[0].attributes.status}`

    // anime section
    //     container img
    //     anime_section_info
    anime_section.appendChild(container_img)
    container_img.appendChild(anime_image)
    anime_section.appendChild(anime_section_info)
    anime_section_info.appendChild(div_title)
    div_title.appendChild(anime_title)
    anime_section_info.appendChild(div_subtitle)
    div_subtitle.appendChild(anime_title_jap)
    anime_section_info.appendChild(anime_synopsis)
    anime_section_info.appendChild(div_data)
    div_data.appendChild(anime_total_episodes)
    div_data.appendChild(anime_total_duration)
    div_data.appendChild(anime_start_date)
    div_data.appendChild(anime_end_date)
    div_data.appendChild(anime_show_type)
    div_data.appendChild(anime_nsfw)
    div_data.appendChild(anime_status)
}

function nsfw_anime_status(data){
    let nsfw_status = data.data[0].attributes.nsfw
    if(nsfw_status === true){
        return "Yes"
    }
    return "No"
}