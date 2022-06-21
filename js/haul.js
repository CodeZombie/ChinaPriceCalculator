function Haul(){
    this.products = [];
    this.fillUpWithDummyData();
}

Haul.prototype.fillUpWithDummyData = function() {
    //this.products.push(new Product(158, 6, 1.5, 829)); //sunyvonne
    //this.products.push(new Product(29, 0, 1.5, 268)); //belt
    //this.products.push(new Product(80, 10, 5.5, 1272)); //Blazers
    //this.products.push(new Product(32, 0, 1.5, 250)); //NikeAdidaas
    //this.products.push(new Product(9.9, 0, 1.5, 104)); //Acne Beanie
    //this.products.push(new Product(148, 0, 5.5, 1051)); //Cav Empt Sherpa
    //this.products.push(new Product(29.9, 0, 1.5, 689)); //MousePad
    //this.products.push(new Product(17, 0, 1.5, 95)); //Stussy Hat
    //this.products.push(new Product(32, 0, 1.5, 243)); //Stussy Shirt XL
    //this.products.push(new Product(32, 0, 1.5, 226)); //Stussy Shirt M
   // this.products.push(new Product(38, 0, 1.5, 239)); //Other Stussy Shirt
    //this.products.push(new Product(58.8, 0, 1.5, 275)); //Iraq Shirt
    //this.products.push(new Product(138, 8, 5.5, 1595)); //AF1s
    this.products.push(new Product("Cheap Mondays Jeans", 68, 0, 5.5, 639));
    this.products.push(new Product("Maison Shirt", 49, 0, 2.5, 300));
    this.products.push(new Product("Cool Shoes", 100, 0, 0, 1300));
    this.products.push(new Product("Stone Island Hat", 55, 0, 5.5, 200));
}

Haul.prototype.totalCost = function(){
    var cost = 0;
    for(var i = 0; i < this.products.length; i++){
        cost += this.products[i].cost();
    }
    return cost;
}

Haul.prototype.totalCostWithoutShippingOrOptionalServices = function(){
    var cost = 0;
    for(var i = 0; i < this.products.length; i++){
        cost += this.products[i].price;
    }
    return cost;
}

Haul.prototype.totalOptionalServicesCost = function() {
    var cost = 0;
    for(var i = 0; i < this.products.length; i++){
        cost += this.products[i].services_cost;
    }
    return cost;
}

Haul.prototype.totalDomesticShippingCost = function(){
    var cost = 0;
    for(var i = 0; i < this.products.length; i++){
        cost += this.products[i].domestic_shipping_price;
    }
    return cost;
}

Haul.prototype.totalWeight = function(){
    var weight = 0;
    for(var i = 0; i < this.products.length; i++){
        weight += this.products[i].weight;
    }
    return weight;
}