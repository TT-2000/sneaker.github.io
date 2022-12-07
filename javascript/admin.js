import { postNewProduct } from "../json/api.js";
import { showToastMessage } from "../json/helper.js";

const form = document.querySelector("form")
const type = document.querySelectorAll("[type=text]")

form.onsubmit = (e) => {
    e.preventDefault()
    
    const formData = [...new FormData(form)]
    const {title, image, price, describe} = Object.fromEntries(formData)
    let formIsValid = true
    
        if (title.trim() === "") {
            showMessage("#name", "Vui lòng nhập tên sản phẩm")
            formIsValid = false
        } else {
            showMessage("#name", "")
        }
    
        if (image === "") {
            showMessage("#image", "Vui lòng thêm ảnh sản phẩm")
            formIsValid = false
        } else {
            showMessage("#image", "")
        }
    
        if (price === "" ) {
            showMessage("#price", "Vui lòng thêm giá sản phẩm")
            formIsValid = false
        } else if (!Number(price))  {
            showMessage("#price", "Giá sản phẩm phải là kiểu số")
            formIsValid = false
        } else {
            showMessage("#price", "")
        }
    
        if (describe === "") {
            showMessage("#describe", "Vui lòng thêm mô tả")
            formIsValid = false
        } else {
            showMessage("#describe", "")
        }


    if (formIsValid) {        

        type.forEach( e => {
            console.log(e.value)
            e.value = ""
        })

        const newProduct =  {title, image, price, describe};

        postNewProduct(newProduct);

        showToastMessage("Thêm sản phẩm thành công")   
        
    } else {
        showToastMessage("Thêm sản phẩm thất bại")
    }

}


function showMessage(id , text) {
    const errorMessage = document.querySelector(id)
    const message = errorMessage.parentElement.querySelector(".message")
    message.innerHTML = text
}



