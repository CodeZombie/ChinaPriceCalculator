
ChinaApp = Vue.createApp({
    data() {
        return {
            agent: new Agent(),
            haul: new Haul(),
        }
    },
    methods: { 
        printableCurrency(value, symbol, currency_name = this.agent.localCurrency) {
            console.log("isNaN: " + isNaN(value) + " value: " + value)
            console.log(value)
            console.log(typeof(value))
            value_str = isNaN(value) ? "??.??" : value.toFixed(2);
            currency_name = (currency_name.length == 0) ? "" : ` ${currency_name}`
            return `${symbol}${value_str}${currency_name}`
        },
        addNewProduct: function(){
            this.haul.products.push(new Product(58.8, 0, 1.5, 275));
        },
        deleteProduct: function(product){
            const index = this.haul.products.indexOf(product);
            if (index > -1) {
                this.haul.products.splice(index, 1);
            }
        }
    },
    computed: {
        //grams:
        totalWeight() {
            w = this.haul.totalWeight();
            if(isNaN(w)){
                return "?"
            }
            return w.toString()
        },
        
        //yuan
        totalProductCostWithoutShippingOrOptionalServiceChargeYuanPrintable() {
            return this.printableCurrency(this.haul.totalCostWithoutShippingOrOptionalServices(), '￥', '');
        },
        totalDomesticShippingCostYuanPrintable() {
            return this.printableCurrency(this.haul.totalDomesticShippingCost(), '￥', '')
        },
        totalOptionalServicesCostYuanPrintable() {
            return this.printableCurrency(this.haul.totalOptionalServicesCost(), '￥', '')
        },
        totalInternationalShippingCostYuanPrintable() {
            return this.printableCurrency(this.agent.totalShippingCost(this.haul), '￥', '')
        },
        agentServiceChargeYuanPrintable() {
            console.log("ham")
            console.log(this.haul)
            return this.printableCurrency(this.agent.agentServiceCharge(this.haul), '￥', '')
        },

        //local currency
        totalProductCostWithoutShippingOrOptionalServiceChargePrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.haul.totalCostWithoutShippingOrOptionalServices()), '$')
        },
        totalDomesticShippingCostPrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.haul.totalDomesticShippingCost()), '$')
        },
        totalOptionalServicesCostPrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.haul.totalOptionalServicesCost()), '$')
        },
        totalInternationalShippingCostPrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.agent.totalShippingCost(this.haul)), '$')
        },
        agentServiceChargePrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.agent.agentServiceCharge(this.haul)), '$')
        },
        paymentProcessorChargePrintable() {
            return this.printableCurrency(this.agent.paymentProcessorCharge(), '$')
        },

        totalHaulCostPrintable() {
            return this.printableCurrency(this.agent.totalHaulCost(this.haul), '$')
        }
    }
}).mount('#app');

//TODO:
//incorporate the following into the code so the user doesn't have to manually enter their currency exchange rate:
//https://open.er-api.com/v6/latest/USD