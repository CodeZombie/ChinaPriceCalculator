Currency = function(name, symbol, conversion_rate) {
    this.name = name
    this.symbol = symbol
    this.conversion_rate = conversion_rate
}

function Money(value, currency){
    this.value = value
    this.currency = currency
}

Money.prototype.toString = function(with_currency_name = false) {
    return `${this.currency.symbol}${this.value.toFixed(2)}${with_currency_name ? " " + this.currency.name : ""}`
}

Money.prototype.convert = function(other_currency) {
    value_as_usd = this.value * this.currency.conversion_rate;
    new_value = value_as_usd / other_currency.conversion_rate;
    return new Money(new_value, other_currency)
}

//cad = new Currency("CAD", "$", 0.74); my_money = new Money(50, cad); my_money.toString()