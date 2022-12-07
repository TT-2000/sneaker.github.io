import { FIREBASE_API } from "./config.js";

export function postNewProduct(product) {
  fetch(FIREBASE_API + "products.json", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function postNewCart(product) {
  fetch(FIREBASE_API + "cart.json", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function getAllProducts(handler) {
  fetch(FIREBASE_API + "products.json")
    .then((response) => response.json())
    .then((data) => {
      const output = [];

      for (const id in data) {
        output.push({ ...data[id], id: id });
      }

      handler(output);
      console.log(output)
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAllProductsInCart(handler) {
  fetch(FIREBASE_API + "cart.json")
    .then((response) => response.json())
    .then((data) => {
      const output = [];
      let index = 0; 
      for (const id in data) {
        output.push({ ...data[id], id: id });
      }
      handler(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getProductById(productId, handler) {
  fetch(FIREBASE_API + "products/" + productId + ".json")
    .then((response) => response.json())
    .then((data) => {
      handler(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
 
}


export function updateProductList(products, handler) {
  fetch(FIREBASE_API + "products.json", {
    method: "PUT",
    body: JSON.stringify(products),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      handler(products);
      console.log(products)
    })
    .catch((err) => console.log(err));
}



export function updateCartList(cart, handler) {
  fetch(FIREBASE_API + "cart.json", {
    method: "PUT",
    body: JSON.stringify(cart),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      handler(cart);
      console.log(cart)
    })
    .catch((err) => console.log(err));
}



