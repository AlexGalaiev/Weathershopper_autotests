import { Locator, Page } from "playwright";

export class ProductsListing{
    private page: Page
    private productCard: Locator
    private cart: Locator
    
    constructor(page:Page){
        this.page = page
        this.productCard = page.locator("//div[contains(@class, 'col-4')]").first()
        this.cart = page.locator("#cart")
    }

    async addProductToCard(productName:string, price:'min'|'max'){
        let allProductsLocators = await this.getAllProductsLocators(productName)
        let productPrices = await this.getListOfPrices(allProductsLocators)
        if (productPrices.length === 0) {
            throw new Error(`Product with ${productName} component is not found`);
        }
        let targetProduct = productPrices.reduce((prev, current) => {
            if (price === 'min') {
                return (current.price < prev.price) ? current : prev;
            } else {
                return (current.price > prev.price) ? current : prev;
            }
        })
        await targetProduct.locator.scrollIntoViewIfNeeded({'timeout':500})
        await targetProduct.locator.locator("button").filter({hasText: "Add"}).click()
    }

    private async getAllProductsLocators(productName:string){
        await this.productCard.waitFor({state:'visible'})
        return await this.page.locator("//div[contains(@class, 'col-4')]",{has: await this.page.locator(`//p[contains(text(), '${productName}')]`)}).all()     
    }

    private async getListOfPrices(allProductsLocators:Locator[]){
        let productData = []
        for(let productLocator of allProductsLocators){
            let priceText = await productLocator.locator("p").filter({hasText: "Price"}).textContent()
            let match = priceText.match(/\d+/)
            let priceValue = parseInt(match[0], 10)
            productData.push({
                locator:productLocator,
                price: priceValue
            })
        }
        return productData
    }

    async getCartStatus(){
        return await this.cart.textContent()
    }
    async openCart(){
        await this.cart.click()
    }

}