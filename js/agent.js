function Agent() {
    this.agentServiceFeePercentage = 6;
    this.usdRMBExchangeRate = 7.000;

    this.localCurrency = "CAD";
    this.localCurrencyToUSDExchangeRate = 0.780457;     //The rate at which the base currency is converted to the paypal currency.
    //this.paypalFeePercentage = 0.03;                //The amount paypal takes as a percentage of the total cost, after conversion.
    this.paypalFlatCharge = 0.03;                   //A charge, in USD that paypal charges as a flat fee.

    this.shippingBaseChargeYuan = 99.2;
    this.shippingBaseWeight = 1000;
    this.shippingSecondChargeYuan = 50.7;
    this.shippingSecondWeight = 1000;
    this.useSecondWeight = true;
}

//Ouptut: RMB
Agent.prototype.totalShippingCost = function(haul) {
    //Calculate the weight of the haul.
    //Figure out how much the haul is worth in Yuan.
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

Agent.prototype.yuanToLocalCurrency = function(yuan) {
    return (yuan / this.usdRMBExchangeRate) / this.localCurrencyToUSDExchangeRate
}

//output: RMB
Agent.prototype.totalCostWithoutAgentServiceCharge = function(haul) {
    return haul.totalCost() + this.totalShippingCost(haul)
}

//output: RMB
Agent.prototype.agentServiceCharge = function(haul) {
    return (this.totalCostWithoutAgentServiceCharge(haul)) * (this.agentServiceFeePercentage / 100.0);
}

//Ouput: Local Currency
Agent.prototype.paymentProcessorCharge = function(haul) {
    return this.paypalFlatCharge * this.localCurrencyToUSDExchangeRate;
}

Agent.prototype.totalHaulCost = function(haul) {
    //Calculate the total cost, in yuan, of the hual, including shipping and service fees.

    if(!haul) {
        return 0.0;
    }
    
    var total_cost_in_local_currency = this.yuanToLocalCurrency(this.totalCostWithoutAgentServiceCharge(haul) + this.agentServiceCharge(haul));
    total_cost_in_local_currency += this.paymentProcessorCharge();
    return total_cost_in_local_currency;
}