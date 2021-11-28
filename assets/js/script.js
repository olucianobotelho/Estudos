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
                <button class="btn-add-cart btn btn-main btn-block" type="submit" 
                data-id="${product.id}"
                data-name="${product.name}"
                data-image="${product.image}"
                data-price="${product.price}"
                
                
                ">Adicionar</button>
                 </div>
            </article>`
        })
            banana += '</div></section>'
            data.innerHTML+=banana
            
    })

    const removeOfCart = () =>{
        console.log('Vou Remover')
        const btnRemoveCartEls = document.querySelectorAll('#btn-remove')

        btnremoveCartEls.forEach(btn => {
            btn.addEventListener('click', removeToCart)
    
        })



    }
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
    const product = event.target.dataset
    const index = productsCart.findIndex((item) =>{
        if (item.id == product.id){
            return true
        } 
        return false

    })

    if(index == -1){
        productsCart.push({

            // eu to copiando os dados da variavel product pra dentro desse productsCart
            ...product ,
            price:Number(product.price), qty:1

        })
    }else{
        productsCart[index].qty++
    }
handleCartUpdate()
    

}
const setupAddToCart = () => {
    const btnAddCartEls = document.querySelectorAll('.btn-add-cart')
    console.log('btnAddCartEls', btnAddCartEls)
    btnAddCartEls.forEach(btn => {
        btn.addEventListener('click', addToCart)

    })
}



const handleCartUpdate = () =>{
   const badgeEl = document.querySelector('#btn-cart .badge') 
   const emptyCartEl = document.querySelector('#empty-cart')
   const cartWithProductsEl = document.querySelector('#cart-with-products') 
   const cartItensParent = cartWithProductsEl.querySelector('ul')
   const cartTotalValueEl = document.querySelector('#cart-total-value')

    const total = productsCart.reduce((total,item) =>{
        return total + item.qty
    }, 0)


    
    if (total > 0 ){
        badgeEl.classList.add('badge-show')
        badgeEl.innerText = total
        cartWithProductsEl.classList.add('cart-with-products-show')
        emptyCartEl.classList.remove('empty-cart-show')
        cartItensParent.innerHTML = ''
        productsCart.forEach((product)=>{
            cartItensParent.innerHTML += `<li class="cart-item"><img src="${product.image}" alt="" width="70" height="70">

            <div class="" id="${product.id}">
                <p class="h3">${product.name}</p>
                <p class="price">R$ ${product.price.toLocaleString('pt-br',{minimumFractionDigits:2})}</p>
            </div>
            <input id="btn-remove" class="form-input" type="number" min="1" value="${product.qty}" name="quantidade" >
            <button id="remover-item">
                <i class="fas fa-trash-alt"></i>
            </button>



        </li>`


        })

        const totalPrice = productsCart.reduce((total, item)=>{
            return total + item.qty * item.price



        },0)
        
        cartTotalValueEl.innerText = ('R$',totalPrice.toLocaleString('pt-br',{minimumFractionDigits:2}))

    } else{
        badgeEl.classList.remove('badge-show')
        emptyCartEl.classList.add('empty-cart-show')
        cartWithProductsEl.classList.remove('cart-with-products-show')
    }
}
handleCartUpdate()




