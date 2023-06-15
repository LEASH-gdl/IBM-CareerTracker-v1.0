import React, {useState, useEffect} from "react";
import Menu from './Menu';
import NewsGrid from './NewsGrid';
import '../../css/news.css'

export default function News(){
    const [items, setItems] = useState([])
    const [active, setActive] = useState(1)
    const [category, setCategory] = useState("ai")

    useEffect(() =>{
    	const fetchData = async () => {
    		const response = await fetch(`/news/${category}.json`);
    		
    		if(response.status === 200){
    			response.json()
        		.then(data => setItems(data.articles))
    		}
    	}
    	
    	fetchData();
    	
    }, [category])


    return(
        <div id="news">
            <h1>News</h1>
            <Menu active={active} setActive={setActive} setCategory={setCategory}/>
            <NewsGrid items={items} category={category}/>
        </div>
    );
}