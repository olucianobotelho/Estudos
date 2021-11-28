// Tradução do termo INNER = significa "Interno", innerhtml significa "Dentro do html"

function openBag(){
bag = document.querySelector('.cart-sidebar')
bag.style.display="block"


}
function closebag(){
bag.style.display="none"
}

function addmore(){
    
}


document.getElementById('btn-cart').addEventListener('click',openBag)
document.getElementById('btn-close-cart').addEventListener('click',closebag)
document.getElementById('adicionar-item').addEventListener('click',closebag)



// FETCH = BUSCAR
// THEN = ENTÃO
// FOR EACH = PARA CADA



const fetchProducts = () =>{
    const data = document.querySelector('#data')

    
    
 fetch('http://127.0.0.1:5500/products.json')
.then(response => response.json())
.then(body => {

    
    
    

    
        
        
   
    data.innerHTML = ''
    

    body.groups.forEach(group=>{
            
        let banana = `<section><h2>${group.name}</h2><div class="products-grid">`

            group.products.forEach( product =>{
            
                const description = product.description != null ? `<p>${product.description}` : ``

            banana+=
            
            
            `<article class="card">
                <img src="${product.image}" alt="${product.name}" width="196" height="120">
                 <div class="card-content">
                <h3>${product.name}</h3>
                <p class="card-price">R$ ${product.price.toLocaleString('pt-br',{minimumFractionDigits:2})}</p>
                ${description}
                <button class="btn-add-cart btn btn-main btn-block" type="submit" data-id="${product.name}">Adicionar</button>
                 </div>
            </article>`
        })
            banana += '</div></section>'
            data.innerHTML+=banana
            
    })
    setupAddToCart()
})
.catch(err =>{
console.log(err)
data.innerHTML='<p class="alert-error"> Falha ao carregar produtos.Recarregue a Página</p>'

})
}
fetchProducts()

// PRODUCTS CART


const productsCart = []
const addToCart = (event) => {
    console.log('Produto Adicionado', event.target.dataset)

}
const setupAddToCart = () => {
    const btnAddCartEls = document.querySelectorAll('.btn-add-cart')
    console.log('btnAddCartEls', btnAddCartEls)
    btnAddCartEls.forEach(btn => {
        btn.addEventListener('click', addToCart)

    })
}








