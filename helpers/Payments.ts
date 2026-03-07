import { Locator, Page } from "playwright";


export class Payments{
    private page: Page
    private email: Locator
    private cardNumber: Locator
    private ccExp: Locator
    private cvv: Locator
    private payBtn: Locator

    constructor(page: Page){
        this.page = page
        this.email = page.locator("#email")
        this.cardNumber = page.locator("#card_number")
        this.ccExp = page.locator("#cc-exp")
        this.cvv = page.locator("#cc-csc")
        this.payBtn = page.locator("#submitButton")
    }

    async fillCreditCardForm(userEmail:string, cardNumber:string, cardExp:string, cardCvv:string){
        await this.email.pressSequentially(userEmail, {delay:150})
        await this.email.pressSequentially(cardNumber, {delay:150})
        await this.ccExp.pressSequentially(cardExp, {delay:100})
        await this.cvv.pressSequentially(cardCvv, {delay:100})
        const [paymentResponse] = await Promise.all([
            this.page.waitForResponse('https://api.stripe.com/v1/tokens', {'timeout':10000}),
            this.payBtn.click()
        ])
        let paymentData = await paymentResponse.status()
        return paymentData
    }

}