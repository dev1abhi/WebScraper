"use client"
import { url } from 'inspector';
import React, { FormEvent } from 'react'
import { useState } from 'react'


const isValidAmazonProductURL =(url:string)=> {
   try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
     //check if hostname contains amazon.com or amazon
    if (hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon')) {
        return true;
    }
   }
    catch (error) {
         return false;
}

return false;
}

function Searchbar() {
        const [searchPrompt, setsearchPrompt] = useState('');
         const [isLoading, setisLoading] = useState(false);
        const handleSubmit = (event:FormEvent<HTMLFormElement>)=> {
        event.preventDefault();

        const isValidLink =isValidAmazonProductURL(searchPrompt);
        if(!isValidLink){
            alert('Invalid Amazon product link, Please provide an Amazon product link');
            return;
        }

        try{
            setisLoading(true);
            //scrape the product page
        }
        catch(error){
        }
        finally{
            setisLoading(false);
        }

    }

  return (
   <form className='flex flex-wrap gap-4 mt-12'
    onSubmit={handleSubmit}
   
   >
    <input type="text" 
    placeholder='Enter product link' 
    className='searchbar-input' 
    value={searchPrompt} 
    onChange={(e)=>setsearchPrompt(e.target.value)}/>

     <button type='submit' className='searchbar-btn' disabled={searchPrompt=== ''}>
        {isLoading ? 'Searching...':'Search'}
     </button>


   </form>
  )
}

export default Searchbar