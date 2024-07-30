const newContainer=document.getElementById("news-container")
const apiKey="aa7333f4c3d24750b502b4a04c22d643"
const searchField=document.getElementById("input-field")
const searchBtn=document.getElementById("search-btn")



/* data load */
const newsDataLoad=async()=>{
    try{
        const res=await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&pagesize=10&apiKey=${apiKey}`)
        const data=await res.json();
        console.log(data.articles
        )
        return data.articles;
    }
    catch(error){
        console.log({message:error.message})
    }
};

/* for maping data  */
(async()=>{
    try{
        const allNews=await newsDataLoad();
        await displayData(allNews)

    }
    catch(error){
        console.log({message:error.message})
    }

})();

/* for search query */
searchBtn.addEventListener("click",async()=>{
    const query=searchField.value.trim();
    if(query !==""){
        try{
            const allNews=await queryFetch(query);
            displayData(allNews);

        }
        catch(error){
            console.log({message:error.message})
        }

    }
});

const queryFetch=async(query)=>{
    try{
        const apiUrl=(`https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`);
        const res=await fetch(apiUrl);
        const data=await res.json();
        return data.articles
    }
    catch(error){
        console.log({message:error.message})
    }

}

/* to display data */
const displayData=async(allNews)=>{
    try{
       
        newContainer.innerHTML=""
        allNews.map((item)=>{
            const newsCard=document.createElement("div");
            newsCard.classList.add("news-card");
            const img=document.createElement("img");
            img.src=item.urlToImage;
            const title=document.createElement("h2")
            const truncatedTitle=item.title.length >30 ? item.title.slice(0,30) + "..." : item.title
            title.textContent=truncatedTitle;
           
            const des=document.createElement("p");
            const truncatedDes=item.description.length <50 ? item.description.slice(0,30) +" ...":item.description
            des.textContent=truncatedDes;


            newsCard.appendChild(img)
            newsCard.appendChild(title)
            newsCard.appendChild(des)
            newContainer.appendChild(newsCard);
            newsCard.addEventListener("click",()=>{
                window.open(item.url,"_blank")
            })
        })
    }catch(error){
        console.log({message:error.message})
    }
}


