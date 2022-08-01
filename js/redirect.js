let url = window.location.href
let raiz = url.split("/")[4]
let nueva_raiz = `${raiz[0]}//${raiz[2]}/${raiz[3]}/html/index.html`
window.location.href = nueva_raiz