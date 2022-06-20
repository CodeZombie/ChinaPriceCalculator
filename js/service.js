function Services() {
    this.agentServiceFeePercentage = 0.06;
    this.usdRMBExchangeRate = 6.200;

    this.paypalBaseCurrency = "CDN"
    this.paypalCurrencyConversionRate = 0.7547;     //The rate at which the base currency is converted to the paypal currency.
    this.paypalFeePercentage = 0.03;                //The amount paypal takes as a percentage of the total cost, after conversion.
    this.paypalFlatCharge = 0.03;                   //A charge, in USD that paypal charges as a flat fee.

    this.shippingBaseChargeYuan = 99.2;
    this.shippingBaseWeight = 1000;
    this.shippingSecondChargeYuan = 50.7;
    this.shippingSecondWeight = 1000;
    this.useSecondWeight = true;
}

Services.prototype.shippingCost = function(haul) {
    //Calculate the weight of the haul.
    //Figure out how much the haul is worth in Yuan.
    //if convertCurrency is true, convert the value in yuan to the base currency, including paypal service fee, but NOT agent service fee, as this is calculated separately.
    var haulWeight = haul.totalWeight();
    var cost = 0;

    //if the haul is less than the base weight, return the base charge only.
    if (haulWeight <= this.shippingBaseWeight) {
        return this.shippingBaseChargeYuan;
    }

    //since it is more than the base weight, we subtract the base weight from the haul weight, and add the base charge.
    haulWeight -= this.shippingBaseWeight;
    cost += this.shippingBaseChargeYuan
    if(this.useSecondWeight) {
        //for every secondaryWeight in the haul left, add the second charge. Remember to round up :)
        cost += Math.ceil(haulWeight / this.shippingSecondWeight) * this.shippingSecondChargeYuan;
    }else{
        //do the same thing, but with the base weight numbers instead.
        cost += Math.ceil(haulWeight / this.shippingBaseWeight) * this.shippingBaseChargeYuan;
    }

    return cost;
}

Services.prototype.agentServiceCharge = function(haul) {
    //(TotalHaulCost * AgentServiceFeePercentage)
    return (haul.totalCost() * this.agentServiceFeePercentage);
}

Services.prototype.totalHaulCost = function(haul) {
    //Calculate the total cost, in yuan, of the hual, including shipping and service fees.

    //Determine how much of the base currency you'd have to give paypal to pay for the total cost, in yuan.
    var total_cost = haul.totalCost() + this.shippingCost(haul) + this.agentServiceCharge(haul);
    console.log("haul.totalCost() = " + haul.totalCost());
    console.log("this.shippingCost(haul) = " + this.shippingCost(haul));
    console.log("this.agentServiceCharge(haul) = " + this.agentServiceCharge(haul));
    console.log("Total product/shipping cost in yuan: " + total_cost);

    var total_cost_usd = total_cost / this.usdRMBExchangeRate; //How much USD needs to make it to CSSBuy.

    console.log("Total Cost in USD: " + total_cost_usd);
    
    //How much USD we need to put into paypal to get total_cost_usd to CSSBuy.
    var paypal_cost_usd = total_cost_usd + (total_cost_usd * this.paypalFeePercentage) + this.paypalFlatCharge;

    console.log("Total Cost in USD, including paypal fees: " + paypal_cost_usd);

    //The amount of the base currency we need to pay to paypal to get paypal_cost_usd to CSSBuy.
    return paypal_cost_usd / this.paypalCurrencyConversionRate;
}