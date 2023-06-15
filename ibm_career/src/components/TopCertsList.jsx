import { OrderedList, ListItem } from '@carbon/react';

export default function TopCertsList(props){
	return(
		<div style={{'height': '100%', 'display': 'flex', 'flexFlow': 'column', 'gap': '1em'}}>
			<h4>{props.data.title}</h4>
			<OrderedList style={{'marginLeft': '2em'}}>
				{props.data.elements.map((cert, i) =>
					<ListItem key={i}>{cert}</ListItem>
				)}
			</OrderedList>
			
			<p style={{'fontSize': '0.8em', 'color': '#909090'}}>
			Source: {" "}
			{props.data.source.link === undefined ?
				props.data.source.text
			:
				<a href={props.data.source.link}>{props.data.source.text}</a>
			}
			</p>
		</div>
	);
}