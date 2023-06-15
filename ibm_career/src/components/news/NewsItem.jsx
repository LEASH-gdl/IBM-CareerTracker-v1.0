import '../../css/news.css'

import {
	ExpandableTile,
	TileAboveTheFoldContent,
	TileBelowTheFoldContent
} from '@carbon/react'

export default function NewsItem({item}) {
	const title = item.title.length > 100 ? item.title.substring(0,90) + '...' : item.title;
	const date = item.published_date.split(' ')[0];

    return(
    	<ExpandableTile className="NewsItem">
    		<TileAboveTheFoldContent>
    			<div className="NewsItemPreview">
					<img
						src={item.media}
						onError={({ currentTarget }) => {
							currentTarget.onerror = null; // prevents looping
							currentTarget.src="/images/no-image.png";
						}}
						className="newsImg"
					/>
					<div className="NewsItemInfo">
						<div className="article-source">
				            <img
				            	src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE%2CSIZE%2CURL&url=http://${item.clean_url}&size=32`} alt="website icon"
				            />
				            <span>{item.clean_url}</span>
				        </div>
						<h4>{title}</h4>
		            </div>
		        </div>
    		</TileAboveTheFoldContent>
    		<TileBelowTheFoldContent>
    			<div className="article-details">
					<p>
		                {item.excerpt} <a href={item.link} target="_blank">Read More</a>
		            </p>
		            <div>
		                <small><b>Published On: </b> {date} </small>
		            </div>
                </div>
    		</TileBelowTheFoldContent>
    	</ExpandableTile>
    );
}