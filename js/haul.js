function Haul(){
    this.products = [];
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
    this.products.push(new Product(68, 0, 5.5, 639)); // Cheap Mondays
    this.products.push(new Product(50, 0, 1.5, 374)); // Maison Shirt
    this.products.push(new Product(183.15, 0, 0, 765)); // Maison Shirt
    this.products.push(new Product(47, 0, 5.5, 700)); // Nelly sweater
}

Haul.prototype.totalCost = function(){
    var cost = 0;
    for(var i = 0; i < this.products.length; i++){
        cost += this.products[i].cost();
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