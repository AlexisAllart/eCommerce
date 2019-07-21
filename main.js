class Product{
    constructor(sn, name, photo, price, count){
        this.sn = sn;
        this.name = name;
        this.photo = photo;
        this.price = price;
        this.count = count;
    }
    getSn(){
        return this.sn;
    }
    getName(){
        return this.name;
    }
    getPhoto(){
        return this.photo;
    }
    getPrice(){
        return this.price;
    }
    getCount(){
        return this.count;
    }
    setSn(param){
        this.sn = param;
    }
    setName(param){
        this.name = param;
    }
    setPhoto(param){
        this.photo = param;
    }
    setPrice(param){
        this.price = param;
    }
    setCount(param){
        this.count = param;
    }
}

let listProducts=[
    new Product(0,'Truc','images/01.jpg',29.99,1),
    new Product(1,'Bidule','images/02.jpg',19.99,1),
    new Product(2,'Machin','images/03.jpg',34.99,1),
    new Product(3,'Engin','images/04.jpg',39.99,1),
    new Product(4,'Bazar','images/05.jpg',65.99,1),
    new Product(5,'Chose','images/06.jpg',14.99,1),
    new Product(6,'Fourbi','images/07.jpg',28.79,1),
    new Product(7,'Bitonio','images/08.jpg',12.89,1),
];

let showingCart=false;
let nextSn=8;
let listCart=[];
let target=document.getElementById('container');

function refresh(){
    target.innerHTML='';
    let x='<div class="text-center">';
    x+='<button class="btn btn-primary col-2" id="showCart" onclick="showCartToggle()">Show Cart</button>';
    x+='</div>';
    x+='<div class="row">';
    if (showingCart){
        x+='<h2 class="col-4">Product Name</h2>';
        x+='<h2 class="col-2">Count</h2>';
        x+='<h2 class="col-2">Unit</h2>';
        x+='<h2 class="col-2">Total</h2>';
        x+='<div class="col-2"></div>';
        let totalPrice=0;
        for (i=0;i<listCart.length;i++){
            x+='<div class="col-4">'+listCart[i].name+'</div>';
            x+='<div class="col-2">';
            x+='<input id="count'+i+'" class="countInput" type="number" oninput="changeCount('+i+',this.value)" value="'+listCart[i].count+'" min="1">';
            x+='</div>';
            x+='<div class="col-2">'+listCart[i].price+' €</div>';
            x+='<div class="col-2">'+Math.round(listCart[i].price*listCart[i].count * 100) / 100+' €</div>';
            x+='<div class="col-2">';
            x+='<button class="product-add w-100 btn btn-danger" onclick="removeFromCart('+i+')">Remove</button>';
            x+='</div>';
            totalPrice+=(listCart[i].price*listCart[i].count);
        }
        x+='<h2 class="col-8">Total price to pay :</h2>';
        x+='<h2 class="col-4"> '+totalPrice.toFixed(2)+' €</h2>';
    }
    else {
        for (i=0;i<listProducts.length;i++){
            x+='<div class="product-card col-12 col-lg-4 p-5">';
            x+='<button class="btn btn-danger deleteButton" onclick="deleteProduct('+i+')">X</button>';
            x+='<div class="innerCard">';
            x+='<h2 class="product-name text-center">'+listProducts[i].name+'</h2>';
            x+='<img class="product-photo w-100" src='+listProducts[i].photo+'><br/>';
            x+='<div class="row">';
            x+='<h2 class="product-price col-6">';
            x+=listProducts[i].price+' €';
            x+='</h2>';
            x+='<div class="col-6">';
            x+='<button class="product-add w-100 btn btn-success" onclick="addToCart('+i+')">Add to Cart</button>';
            x+='</div></div></div></div>';
        }
    }
    x+='</div>';
    if (!showingCart){
        x+='<div class="text-center">';
        x+='<button class="btn btn-warning" id="addProduct" onclick="addProduct()">Add New Product</button>';
        x+='</div>';
    }
    target.innerHTML=x;
    showingCart?document.getElementById('showCart').innerHTML='Show Products':'';
}

function addProduct(){
    pName = prompt("Product Name :");
    pPhoto = prompt("Product Photo URL :");
    pPrice = prompt("Product Price (€) :");
    product=new Product(nextSn,pName,pPhoto,pPrice,1);
    nextSn++;
    listProducts.push(product);
    refresh();
}

function deleteProduct(i){
    for (j=0;j<listCart.length;j++){
        if (listProducts[i].sn==listCart[j].sn){
            listCart.splice(j,1);
            j--;
        }
    }
    listProducts.splice(i,1);
    refresh();
}

function addToCart(i){
    listCart.push(new Product(listProducts[i].sn,listProducts[i].name,listProducts[i].photo,listProducts[i].price,listProducts[i].count));
    refresh();
}

function showCartToggle(){
    showingCart=!showingCart;
    refresh();
}

function removeFromCart(i){
    listCart.splice(i,1);
    refresh();
}

function changeCount(i,n){
    listCart[i].setCount(n);
    refresh();
    document.getElementById('count'+i).focus();
}

refresh();