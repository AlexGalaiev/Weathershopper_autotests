import { Locator, Page } from "playwright";

export class ThankYouPage{
    private page: Page
    private headerTitle: Locator

    constructor(page: Page){
        this.page=page
        this.headerTitle=page.locator('//h2')
    }
    async getTitleText(){
        await this.headerTitle.waitFor({state:'visible'})
        return await this.headerTitle.textContent()
    }
}