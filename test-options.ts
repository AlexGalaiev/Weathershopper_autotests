import {test as base, Page} from "@playwright/test"
import { BaseTest } from "./POM/BaseTest"


export type TestOptions = {
    weatherShop:string,
    app: BaseTest
}

export const test = base.extend<TestOptions>({
    weatherShop:['',{option:true}],
    app: async({page}, use)=>{
        let baseTest = new BaseTest(page)
        await use(baseTest)
    }
})
