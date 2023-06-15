import NewsItem from './NewsItem';
import '../../css/news.css'
import {useState, useEffect} from 'react';

export default function NewsGrid({items, category}){
	const [news, setNews] = useState([]);
	
	useEffect(() => {
		setNews([]);
		
		var tempNews = [];
		items.forEach((item, i) => {
			tempNews.push(<NewsItem key={i} item={item}/>);
		});
		
		setNews(tempNews);
		
	},[items, setNews]);

    return(
        <div className='news-grid'>
            {news}
        </div>
    );
}