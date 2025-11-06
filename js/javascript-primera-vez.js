const seccionAnimes = document.querySelector(".animes")


fetch("https://api.jikan.moe/v4/anime").then(
    function (peticion) {
        return peticion.json()
    }
).then(
    function (datos) {
        console.log(datos.data);

        const anime = datos.data.map(
            function (item) {
                return `<article>
        <div>
            <img src="${item.images.jpg.large_image_url}" alt="">
        </div>
        <h4>${item.title}</h4>
        <h5>Episodios: <span>${item.episodes}</span></h5>
        <button value="20">USD <span value="20">20</span></button>
    </article>`
            }
        )
        seccionAnimes.insertAdjacentHTML("afterbegin", anime.join(""))
    }
)

const carrito = []
let total = 0
const items = document.querySelector("#items")
const monto = document.querySelector("#monto")
const pagar = document.querySelector("#pagar")

seccionAnimes.addEventListener("click", function (evento) {
    const elemento = evento.target
    console.log(elemento, elemento.tagName);
    if (elemento.tagName === "BUTTON" || elemento.tagName === "SPAN") {
        //alert(elemento.value)
        carrito.push(parseInt(elemento.value))
        items.textContent = carrito.length
        console.log(carrito);
        total = 0
        for (let posicion = 0; posicion < carrito.length; posicion++) {
            total = total + carrito[posicion];
        }
        monto.textContent = total
    }
})

pagar.addEventListener("click", function () {
    Swal.fire({
        title: "Compra finalizada",
        text: `Gracias por tu compra de ${items.textContent} productos a USD ${monto.textContent}`,
        icon: "success"
    });
    monto.textContent = 0
    items.textContent = 0
})