import { getProductById, postNewCart } from "../json/api.js";
import { convertPrice, showToastMessage } from "../json/helper.js";

const productImg = document.querySelector(".product-detail-left") 
const nameProduct = document.querySelector(".name-product") 
const productPrice = document.querySelector(".product-detail_price")
const productDescribe = document.querySelector(".product-detail_describe")
const btnAddCart = document.querySelector(".btn-add_cart")
const next = document.querySelector(".next")
const prev = document.querySelector(".prev")
const number = document.querySelector(".amount-product span")
const change = location.hash.slice(1);
let quantity = 1;
let productDetail;


const renderProductDetail = (productData) => {
        productImg.innerHTML = 
        `
            <img class="product-detail_img" src="${productData.image}" alt="" srcset="">
        `
        nameProduct.innerHTML = `
            <h2>${productData.title}</h2>
            <p>Mã sản phẩm : <span>${productData.id}</span></p>
        `

        productPrice.innerHTML = `
            <p>Giá : <span>${convertPrice(productData.price)}</span> / vnđ</p>
        `
        productDescribe.innerHTML = `
            <h3>Đắc điểm nổi bật :</h3>
            <p> ${productData.describe} </p>
        `
}


console.log(next)
const handleQuantityChange = () => {
    next.onclick = function() {
        quantity++
        number.innerHTML = quantity
        
    }
    
    prev.onclick = function() {
        if (quantity <= 1) {
            return
        }
        quantity--
        number.innerHTML = quantity
    }
}

const handleAddProductToCart = () => {
    btnAddCart.addEventListener("click", () => {
      const { id, ...rest } = productDetail;
      postNewCart({ ...rest, quantity});
      showToastMessage("Đã thêm sản phẩm vào giỏ");
    });
};

getProductById(change, (productData) => {
    productDetail = productData;
    renderProductDetail(productData);
});


handleAddProductToCart()
handleQuantityChange()







