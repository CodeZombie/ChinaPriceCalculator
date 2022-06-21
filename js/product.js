function Product(name, price, domestic_shipping_price, services_cost, weight){
    //Prices should be in CNY
    this.name = name;
    this.price = price;
    this.domestic_shipping_price = domestic_shipping_price;
    this.weight = weight;
    this.services_cost = services_cost;
}

/*
    Cost of the product in CNY, including domestic shipping and services
*/
Product.prototype.cost = function(){
    return this.price + this.domestic_shipping_price + this.services_cost;
}