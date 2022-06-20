function Product(price, domestic_shipping_price, services_cost, weight){
    this.name = "Example Product";
    this.price = price;
    this.domestic_shipping_price = domestic_shipping_price;
    this.weight = weight;
    this.services_cost = services_cost;
}

Product.prototype.cost = function(){
    return this.price + this.domestic_shipping_price + this.services_cost;
}