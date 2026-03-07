
export type ProductCategory = 'moisturizers' | 'sunscreens';

export type PriceLevel = 'min'|'max'

export interface CosmeticStore {
    temperature: number, 
    category: ProductCategory,
    product1: string,
    product2: string,
    product1PriceLevel: PriceLevel,
    product2PriceLevel: PriceLevel,

}