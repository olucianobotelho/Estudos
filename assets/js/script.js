// Tradução do termo INNER = significa "Interno", innerhtml significa "Dentro do html"
function openBag(){
bag = document.querySelector('.cart-sidebar')
bag.style.display="block"
}
function closebag(){
bag.style.display="none"
}
document.getElementById('btn-cart').addEventListener('click',openBag)
document.getElementById('btn-close-cart').addEventListener('click',closebag)




