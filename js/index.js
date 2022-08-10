const button_menu = document.getElementById("menu-icon")
button_menu.addEventListener("click", () => {
    const menu = document.getElementById("menu-to-displayed")
    if(menu.className === "menu-displayed"){
        menu.className = "menu-not-displayed"
    }else{
        menu.className = "menu-displayed"   
    }
})