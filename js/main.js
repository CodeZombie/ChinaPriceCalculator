
ChinaApp = Vue.createApp({
    data() {
        return {
            agent: new Agent(),
            haul: new Haul(),
        }
    },
    methods: { 
        printableCurrency(value, symbol = '$', currency_name = this.agent.localCurrency) {
            if (currency_name != '' ){
                currency_name = ' ' + currency_name;
            }
            if(value == null) {
                return symbol + "??.??" + currency_name;
            }
            return symbol + value.toFixed(2) + currency_name;
        }
    },
    computed: {
        //grams:
        totalWeight() {
            return this.haul.totalWeight();
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
            return this.printableCurrency(this.agent.agentServiceCharge(this.haul), '￥', '')
        },

        //local currency
        totalProductCostWithoutShippingOrOptionalServiceChargePrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.haul.totalCostWithoutShippingOrOptionalServices()))
        },
        totalDomesticShippingCostPrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.haul.totalDomesticShippingCost()))
        },
        totalOptionalServicesCostPrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.haul.totalOptionalServicesCost()))
        },
        totalInternationalShippingCostPrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.agent.totalShippingCost(this.haul)))
        },
        agentServiceChargePrintable() {
            return this.printableCurrency(this.agent.yuanToLocalCurrency(this.agent.agentServiceCharge(this.haul)))
        },
        paymentProcessorChargePrintable() {
            return this.printableCurrency(this.agent.paymentProcessorCharge())
        },

        totalHaulCostPrintable() {
            return this.printableCurrency(this.agent.totalHaulCost(this.haul))
        }
    }
}).mount('#app');

//incorporate the following into the code so the user doesn't have to manually enter their currency exchange rate:
//https://open.er-api.com/v6/latest/USD