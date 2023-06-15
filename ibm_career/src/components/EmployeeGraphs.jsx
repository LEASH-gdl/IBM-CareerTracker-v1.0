import { DonutChart, LineChart } from "@carbon/charts-react";
import { useEffect, useState  } from 'react';
import "@carbon/charts/styles.css";

import '../css/graphs.css';
import * as ChartOptions from '../data/EmployeeGraphsOptions.js';

export default function EmployeeGraphs(props) {
	const [charts, setCharts] = useState([]);

	useEffect(() => {
	
		var categoriesData = [];
		var yearlyData = [];
		
		var temp = {};
		
		Object.keys(props.certifications).map((categ) => {
			categoriesData.push({'group' : categ, 'value': props.certifications[categ].length});
			
			props.certifications[categ].forEach((cert) => {
				let year = cert.issue_date.slice(0,4);
				if(temp[year] === undefined){
					temp[year] = 1;
				} else {
					temp[year]++;
				}
			});
		});
		
		for(var i = Object.keys(temp).sort()[0]; i <= Object.keys(temp).sort().slice(-1); i++){
			
			yearlyData.push({
				'year': String(i) + "-01-02"
			});
			
			yearlyData[yearlyData.length - 1].amount = (temp[i] === undefined) ? 0 : temp[i];
		}
		
		setCharts([
			<DonutChart
				key="categoriesChart"
				data={categoriesData}
				options={ChartOptions.categories}>
			</DonutChart>,
			<LineChart
				key="yearlyChart"
				data={yearlyData}
				options={ChartOptions.yearly}>
			</LineChart>
		]);
		
	}, []);

	return(
		<div>
		<h1>Insights</h1>
		<div className="graphsContainer">
			{charts}
		</div>
		</div>
	);
}