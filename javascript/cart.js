import { getAllProductsInCart, updateCartList} from "../json/api.js";
import { convertPrice, showToastMessage } from "../json/helper.js";


let listProduct = document.querySelector(".list-product-cart")
const listPrice = document.querySelector(".list-price")
const total = document.querySelector(".total span")
let cart;


const renderCartPage = (products) => {

    listProduct.innerHTML = products.map(({ title, quantity, price, image, id }) =>
        `
        <li>
            <div class="list-product-cart_card">
                <img src="${image}" alt="" srcset="">                
                <div class="title">
                    <h3>${title}</h3>
                    <p class="price">Giá: <span>${convertPrice(price)}</span> / vnđ</p>
                    <span class="amount">Số lượng: ${quantity} </span>
                </div>
                </div>
                <div class="remove-card" data-product-id="${id}">X</div>
        </li>
        `
    ).join("")

    
    listPrice.innerHTML = products.map(({ title, quantity, price }) =>
         `
        <li>
            <span>- ${title} (SL: ${convertPrice(quantity)})</span>
            <span>${convertPrice(quantity * price)}đ</span>
        </li>
        `
    ).join("");

    total.textContent =
    convertPrice(
      products.reduce(
        (incre, { quantity, price }) => incre + quantity * price,
        0
      )
    ) + "đ";    
    cart = products
}

console.log(cart)

listProduct.onclick = event => {
    const btnRemove = event.target.closest(".remove-card")
    

    if (!btnRemove) return;

    const isDeleting = confirm("Bạn muốn xóa sản phẩm này?");
  
    if (!isDeleting) {
        showToastMessage("Xoa san pham that bai")
        return
    } else {
        showToastMessage("Xoa san pham thanh cong")
    }

    const prodId = btnRemove.dataset.productId;
    
    const newProductsList = cart.filter(({ id }) => {
        return id === prodId;
    });
    
   cart.splice(newProductsList, 1)

    console.log(cart)
    updateCartList(cart, renderCartPage)
}

getAllProductsInCart(renderCartPage)

// badge.textContent = 


