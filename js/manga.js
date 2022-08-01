const API_PATH = "https://kitsu.io/api/edge"

const content_to_listen = document.getElementById("manga-name")
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
    let input_manga = document.getElementById("search-manga")
    input_manga.className = "searching-on"
}

function getName(){
    const content = document.getElementById("manga-name")
    if (content.value !== ""){
        getData(content.value)
    }
}

function getData(anime_name){
    fetch(API_PATH + `/manga?filter[text]=${anime_name}`, {
        headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json"
        }
    })
    .then(response => response.json())
    .then(data => {
        let manga_section = document.getElementById("manga-search-section")
        clean_section_manga(manga_section)
        create_elements(data, manga_section)
    })
}

function clean_section_manga(manga_section){
    if(manga_section.hasChildNodes()){
        let first = manga_section.firstElementChild
        while(first){
            first.remove()
            first = manga_section.firstElementChild
        }
    }
}

function create_elements(data, manga_section){

    manga_section.className = "manga-search-section"

    manga_section.style.backgroundImage = `url(${data.data[0].attributes.coverImage.original})`

    let manga_section_info = document.createElement("section")
    manga_section_info.className = "manga-section-info"

    let div_title = document.createElement("div")
    div_title.className = "div-title"

    let manga_title = document.createElement("h2")
    manga_title.innerHTML = `${data.data[0].attributes.titles.en_jp}`
    
    let div_subtitle = document.createElement("div")
    div_subtitle.className = "div-subtitle"

    let manga_title_jap = document.createElement("h3")
    manga_title_jap.innerHTML = `${data.data[0].attributes.titles.ja_jp}`
    
    let container_img = document.createElement("figure")
    
    let manga_image = document.createElement("img")
    manga_image.className = "manga_cover"
    manga_image.src = `${data.data[0].attributes.posterImage.large}`


    let manga_synopsis = document.createElement("p")
    manga_synopsis.className = "manga-synopsis"
    manga_synopsis.innerHTML = `${data.data[0].attributes.synopsis}`

    let div_data = document.createElement("div")
    div_data.className = "div-data"

    let manga_total_episodes = document.createElement("p")
    manga_total_episodes.innerHTML = `<strong>Total Chapters: </strong>${ongoing_data(data.data[0].attributes.chapterCount)}`
    
    let manga_total_duration = document.createElement("p")
    manga_total_duration.innerHTML = `<strong>Total Volumes: </strong>${ongoing_data(data.data[0].attributes.volumeCount)}`
    
    let manga_start_date = document.createElement("p")
    manga_start_date.innerHTML = `<strong>Start date: </strong>${data.data[0].attributes.startDate}`
    
    let manga_end_date = document.createElement("p")
    manga_end_date.innerHTML = `<strong>End date: </strong>${ongoing_data(data.data[0].attributes.endDate)}`
    
    let manga_show_type = document.createElement("p")
    manga_show_type.className = "manga-show-type"
    manga_show_type.innerHTML = `<strong>Serializaton: </strong>${data.data[0].attributes.serialization}`
    
    let manga_nsfw = document.createElement("p")
    manga_nsfw.innerHTML = `<strong>NSFW: </strong>${nsfw_manga_status(data)}`
    
    let manga_status = document.createElement("p")
    manga_status.className = "manga-status"
    manga_status.innerHTML = `<strong>Status: </strong>${data.data[0].attributes.status}`

    // manga section
    //     container img
    //     manga_section_info
    manga_section.appendChild(container_img)
    container_img.appendChild(manga_image)
    manga_section.appendChild(manga_section_info)
    manga_section_info.appendChild(div_title)
    div_title.appendChild(manga_title)
    manga_section_info.appendChild(div_subtitle)
    div_subtitle.appendChild(manga_title_jap)
    manga_section_info.appendChild(manga_synopsis)
    manga_section_info.appendChild(div_data)
    div_data.appendChild(manga_total_episodes)
    div_data.appendChild(manga_total_duration)
    div_data.appendChild(manga_start_date)
    div_data.appendChild(manga_end_date)
    div_data.appendChild(manga_show_type)
    div_data.appendChild(manga_nsfw)
    div_data.appendChild(manga_status)
}

function ongoing_data(data){
    return data === null ? "Ongoing" : data
}

function nsfw_manga_status(data){
    let nsfw_status = data.data[0].attributes.nsfw
    if(nsfw_status === true){
        return "Yes"
    }
    return "No"
}