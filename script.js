const dishes = [{
    id: 1,
    name: "Paneer Tikka Masala",
    description: "qwer werty rtyu rtyui qwer werty rtyu rtyuiqwer werty rtyu rtyuiqwer werty rtyu rtyui",
    price: 454,
    rating: 3,
    category: "veg",
    discount: 20
}, {
    id: 2,
    name: "Chicken Tikka Masala",
    description: "qwer werty rtyu rtyui ",
    price: 454,
    rating: 3,
    category: "non-veg",
    discount: 10
},]

const cart = []
// {name, price, discount,quantity}

function savedToLocalDish(forLocalStorage){
    localStorage.setItem("dishes", JSON.stringify(forLocalStorage))
}

function getFromLocalDish(){
    return JSON.parse(localStorage.getItem('dishes'))
}

function savedToLocalCart(c){
    localStorage.setItem('cart',JSON.stringify(c))
}

function getCartFromLocal(){
    return JSON.parse(localStorage.getItem('cart'))
}

nameInput = document.querySelector("#nameInput")
descriptionInput = document.querySelector("#descriptionInput")
priceInput = document.querySelector("#priceInput")
discountInput = document.querySelector("#discountInput")
categoryVegInput = document.querySelector("#vegInput")
categoryNonVegInput = document.querySelector("#nonvegInput")
ratingInput = document.querySelector("#selectRating")


function renderDishes(dishes1) {

    document.querySelector("#showDishes").innerHTML = dishes1.map((dish, i) => `
                <div class='col-12 col-md-6 col-lg-3'>
                        <div class="card " style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${dish.name}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">${dish.category}</h6>
                                <p class="card-text">${dish.description.slice(0, 30)}...</p>
    <p class="card-link">Price: &#8377;<del>${dish.price}</del> with <b>${dish.discount}%</b></a>
    <p  class="card-link" ><button class="btn btn-danger" onclick="AddToCart(${dish.id})">Add to cart</button></a>
  </div>
</div>
                </div>
`).join('')
}


function addNewDish() {
    // const category =  categoryVegInput.checked ? "veg" : "non-veg"
    if(categoryVegInput.checked){

        category = "veg"
    }else{
        category = "non-veg"
    }
    const newDish = {
        id: Date.now(),
        name: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        discount: discountInput.value,
        category:category,
        rating: ratingInput.value
    }
    console.log(newDish)
    dishesFRomLocal = getFromLocalDish()
    dishesFRomLocal.push(newDish)
    savedToLocalDish(dishesFRomLocal)
    // remove values from input elements 
    // close the modal after succesful add 
    console.log(dishes)
    renderDishes(dishesFRomLocal)
}

function AddToCart(ID) {

    getCFromLocal = getCartFromLocal()
    index = getCFromLocal.findIndex((dInC, i) => dInC.dish_id == ID)

    if (index != -1) {
        getCFromLocal[index].quantity +=1
        
        console.log("quantity.cart ******",cart)

    } else {
        getFromLocalDishes = getFromLocalDish()
        const dishForCart = getFromLocalDishes.find((d) => d.id == ID)

        const dishInCart = {
            id: Date.now(),
            dish_id: dishForCart.id,
            name: dishForCart.name,
            price: dishForCart.price,
            discount: dishForCart.discount,
            quantity: 1
        }
        cart.push(dishInCart)
        console.log("cart ******",cart)
    }
    document.getElementById("cartLength").textContent = cart.length
}

document.addEventListener('DOMContentLoaded',()=>{

    alreadySavedDish = getFromLocalDish()
    if(!alreadySavedDish){
        savedToLocalDish(dishes)
    }

    renderDishes(alreadySavedDish)

    savedCArt = getCartFromLocal()
    if(!savedCArt){
        savedToLocalCart([])
    }

})