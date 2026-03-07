import { expect } from "@playwright/test"
import {test} from "../test-options"

test.describe('Weather Shopper: Product Selection Logic', async()=>{

    test('Select moisturizer if weather is cold', async({app, weatherShop})=>{
        await test.step('Artificially set temperature to 15 °C', async()=>{
            await app.mainPage.setupTemperatureRoute(15)
        })
        await test.step('Open main page, check pre conditions and switch to moisturizers screen', async()=>{
            await app.open(weatherShop)
            expect(await app.mainPage.getCurrentTemperature()).toContain('15')
            await app.mainPage.buyProduct('moisturizers')
        })
        await test.step('Adding sevral products to cart and proceed shoping',async()=>{
            await app.productListing.addProductToCard('Aloe', 'min')
            await app.productListing.addProductToCard('Almond', 'min')
            expect(await app.productListing.getCartStatus()).not.toEqual('Empty')
            await app.productListing.openCart()
        })
        await test.step('Check product visibility and proceed paymnets', async ()=>{
            expect(await app.checkoutPage.getContentOfTable(1)).toBeVisible()
            expect(await app.checkoutPage.getContentOfTable(2)).toBeVisible()
            await app.checkoutPage.buyViaCreditCard()
        })
    
    })
})
