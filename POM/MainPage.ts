import { Locator, Page } from "@playwright/test"


export class MainPage{
    private page: Page
    private temperatureValue: Locator

    constructor(page:Page){
        this.page = page
        this.temperatureValue = page.locator("#temperature")
    }

    async setupTemperatureRoute(temperature: number) {
        await this.page.route('https://weathershopper.pythonanywhere.com/', async (route) => {
            const response = await route.fetch();
            let html = await response.text();
            html = html.replace(
                /<span id="temperature">.*?<\/span>/,
                `<span id="temperature">${temperature} &#8451;</span>`
            );
            await route.fulfill({ response, body: html });
        });
    }

    async getCurrentTemperature(){
        await this.temperatureValue.waitFor({'state':'visible'})
        return await this.temperatureValue.textContent()
    }

    async buyProduct(productName:'moisturizers'|'sunscreens'){
        await this.page.locator(`//button[text()='Buy ${productName}']`).click()
    }
}