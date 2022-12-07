import { convertPrice, showToastMessage } from "../json/helper.js";
import { getAllProducts, updateProductList} from "../json/api.js";

let card = document.querySelector(".card")
let products;


const generateProductsMarkup = (productsData) => {
    return productsData.map( map => {
        return  `
            <li>
                <img src="${map.image || undefined}" alt="" srcset="">
                <h2 class="title">${map.title}</h2>
                <p class="price" >Giá : ${convertPrice(map.price)} / vnđ</p>
                <div class="button-list"> 
                <a href="./chitietsanpham.html#${map.id}">
                    <button class="add-cart">Chi tiết sản phẩm</button>
                </a>
                <button class="remove-card" data-product-id="${map.id}">X</button>
                </div>
            </li>
            `
    }).join("")
}

const handleRenderProducts = (productsData) => {
    card.innerHTML = generateProductsMarkup(productsData);
    products = productsData;
};

getAllProducts(handleRenderProducts)



card.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".remove-card");

    if (!deleteButton) return;
  
    const isDeleting = confirm("Bạn muốn xóa sản phẩm này?");
  
    if (!isDeleting) {
        showToastMessage("Xoa san pham that bai")
        return
    } else {
        showToastMessage("Xoa san pham thanh cong")
    }
  
    const prodId = deleteButton.dataset.productId;
    console.log(deleteButton.dataset)
    const newProductsList = products.filter(({ id }) => {
      return id !== prodId;
    });
  
    updateProductList(newProductsList, handleRenderProducts);
});












