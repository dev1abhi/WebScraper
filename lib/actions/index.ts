"use server"
import { scrapeAmazonProduct } from '../scraper';

export async function scrapeAndStoreProduct(productUrl:string)
{
    if (!productUrl) return;

    try {
        //scrape the product page
        const scrapeProduct = await scrapeAmazonProduct(productUrl);

        if (typeof scrapeProduct === 'undefined') return;

        //STORE IN DATABASE

    }
    catch (error) {
        throw new Error('Failed to create/update product : ${error.message}');
    }
 
}