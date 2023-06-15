import '../../css/news.css'
import {
	ContentSwitcher,
	Switch
} from '@carbon/react'

export default function Menu({active, setActive, setCategory}){
    const links = [
        {id: 1, text:"Artificial Inteligence", name: "ai"},
        {id: 2, text:"Cybersecurity", name: "cybersecurity"},
        {id: 3, text:"Agile Methodologies", name: "agile"},
        {id: 4, text:"DevOps", name: "devops"},
        {id: 5, text:"Big Data", name: "bigdata"},
    ]

    function onClick(id, value) {
        setActive(id)
        setCategory(value)
    }
    return(
    	<ContentSwitcher
    		onChange={selected => onClick(selected.index, selected.name)}
    		selectedIndex={0}>
    		{links.map((link, i) => 
    			<Switch key={i} name={link.name} text={link.text}/>
    		)}
    	</ContentSwitcher>
    );
}