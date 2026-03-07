import { Locator, Page } from "playwright";

export class CheckoutPage{
    private page: Page
    private paymentProvider: Locator

    constructor(page:Page){
        this.page=page
        this.paymentProvider = page.locator("//div[contains(@class, 'paymentView')]")
    }
    
    async getContentOfTable(tableNumber: number){
       return await this.page.locator(`//tbody//tr[${tableNumber}]`).locator('/td').first()
    }

    async buyViaCreditCard(){
        await this.page.locator("//span[text()='Pay with Card']").click()
        await this.paymentProvider.waitFor({'state':'visible'})
    }
}