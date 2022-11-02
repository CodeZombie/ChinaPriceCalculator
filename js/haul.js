function Haul(){
    this.products = [];
}

Haul.prototype.totalCost = function(){
    var cost = 0;
    for(let i = 0; i < this.products.length; i++) {
        if(!isNaN(parseFloat(this.products[i].cost()))){
            cost += this.products[i].cost()
        }else{
            return NaN
        }
    }
    return cost;
};

Haul.prototype.totalCostWithoutShippingOrOptionalServices = function(){
    var cost = 0;
    for(let i = 0; i < this.products.length; i++) {
        if(!isNaN(parseFloat(this.products[i].price))){
            cost += this.products[i].price
        }else{
            return NaN
        }
    }
    return cost;
};

Haul.prototype.totalOptionalServicesCost = function() {
    var cost = 0;
    for(let i = 0; i < this.products.length; i++) {
        if(!isNaN(parseFloat(this.products[i].services_cost))){
            cost += this.products[i].services_cost
        }else{
            return NaN
        }
    }
    return cost;
};

Haul.prototype.totalDomesticShippingCost = function(){
    var cost = 0;
    for(let i = 0; i < this.products.length; i++) {
        if(!isNaN(parseFloat(this.products[i].domestic_shipping_price))){
            cost += this.products[i].domestic_shipping_price
        }
        else{
            return NaN
        }   
    }
    return cost;
};

Haul.prototype.totalWeight = function(){
    var weight = 0;
    for(let i = 0; i < this.products.length; i++) {
        if(!isNaN(parseFloat(this.products[i].weight))){
            weight += this.products[i].weight
        }else{
            return NaN
        }
    }
    return weight;
};