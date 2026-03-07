import { Page } from "playwright";
import { MainPage } from "./MainPage";
import { ProductsListing } from "./ProductListting";
import { CheckoutPage } from "./CheckoutPage";

export class BaseTest{
    private page: Page
    mainPage: MainPage
    productListing: ProductsListing
    checkoutPage: CheckoutPage
    
    constructor(page: Page){
        this.page = page
        this.mainPage = new MainPage(page)
        this.productListing = new ProductsListing(page)
        this.checkoutPage = new CheckoutPage(page)
    }

    async open(url:string){
        await this.page.goto(url)
    }
}