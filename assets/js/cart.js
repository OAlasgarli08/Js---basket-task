"use strict";

let basket = [];

if (JSON.parse(localStorage.getItem("basket")) == null) {
    localStorage.setItem("basket", JSON.stringify(basket));

} else {

    basket = JSON.parse(localStorage.getItem("basket"));
}

function checkCartForShowDatas(basket){
    let cartAlert = document.querySelector(".cart-alert");
    let cartTable = document.querySelector(".cart-table");
    if(basket.length == 0){
        cartAlert.classList.remove("d-none");
        cartTable.classList.add("d-none");

    }else{
        cartAlert.classList.add("d-none");
        cartTable.classList.remove("d-none");
    }
}

checkCartForShowDatas(basket);

getBasketCount(basket);

function getBasketCount(arr) {
    let basketCount = 0;
    if (arr.length != 0) {
        for (const item of arr) {
            basketCount += item.count;
        }
    }
    document.querySelector(".navigation .basket-count").innerText = basketCount;
}




function getBasketDatas() {
    let tableBody = document.querySelector("tbody");

    let datas = "";
    basket.forEach(product => {

        datas += `<tr>
        <td> <img src="${product.image}" style="width: 100px; height: 100px;" alt=""></td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td><span class= "decrease">-</span> <span><input type="number" class="numberInput" inputmode="numeric" /></span> <span class = "increase">+</span></td>
        <td>${product.price}</td>
        <td>${product.price * product.count} ₼</td>
        <td><i class="fa-solid fa-circle-xmark delete-icon data-id = ${product.id}"></i></td>
        </tr>`
    });

    tableBody.innerHTML = datas;
}

getBasketDatas();

function getGrandTotal(datas) {
    let grandTotal = 0;
    datas.forEach(data => {
        grandTotal+=(data.price*data.count)
    });

    document.querySelector(".total span").innerText = grandTotal;
}

getGrandTotal(basket);


let deleteIcons = document.querySelectorAll('.delete-icon');

deleteIcons.forEach(deleteIcon => {
    deleteIcon.addEventListener('click', function(){
        basket = basket.filter(m => m.id != parseInt(this.getAttribute("data-id")));
        localStorage.setItem('basket', JSON.stringify(basket));
        this.parentNode.parentNode.remove();

        getGrandTotal(basket);
        checkCartForShowDatas(basket);
        getBasketCount(basket);
    })

    

});



let increase = document.getElementsByClassName(".increase");
let decrease = document.getElementsByClassName(".decrease");



document.getElementById('numberInput').addEventListener('input', function() {
    if (this.value < 1) {
        this.value = 1;
    }
});

