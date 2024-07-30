"use server"


export async function scrapeAndStoreProduct(productUrl:string)
{
    if (!productUrl) return;

    try {
        //scrape the product page
        const scrapeProduct = await scrapeAmazonProduct(productUrl);
    }
    catch (error) {
        throw new Error('Failed to create/update product : ${error.message}');
    }
 
}