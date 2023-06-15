import { DonutChart,
	     SimpleBarChart,
	     LineChart,
	     TreemapChart
} from "@carbon/charts-react";
import { Tile, PaginationNav } from '@carbon/react';
import { useEffect, useState  } from 'react';
import "@carbon/charts/styles.css";

import {ANALYTICS_ROUTE} from '../data/apiRoutes' 
import '../css/graphs.css';
import TopCertsList from '../components/TopCertsList'
import * as ChartOptions from '../data/ManagerGraphsOptions';
import * as Ind from '../data/industry.js';

export default function ManagerGraphs() {
	const [charts, setCharts] = useState([
		<Tile key="tempAvg"/>,
		<DonutChart key="tempType"
			options={{...ChartOptions.type, ...ChartOptions.loading}}
			data={[]}/>,
		<SimpleBarChart key="tempCateg"
			options={{...ChartOptions.categories, ...ChartOptions.loading}}
			data={[]}/>,	
		<LineChart key="tempModel"
			options={{...ChartOptions.model, ...ChartOptions.loading}}
			data={[]}/>,
		<SimpleBarChart key="tempLocation"
			options={{...ChartOptions.location, ...ChartOptions.loading}}
			data={[]}/>
	]);
	
	const [topCertsPage, setTopCertsPage] = useState(0);

	useEffect(() => {
	
		async function makeCharts(){
			const response = await fetch(ANALYTICS_ROUTE);
			
			var chartData = [];
			var tempCharts = [];
			
			response.json().then((data) => {
			
				//Avg certifications and IBMers with certifications				
				const percentage = data.users_w_certifications / data.total_employees * 100;
				tempCharts.push(
					<Tile id="avgCerts" key="avgCerts">
						<p>
							The average IBM employee registered on this platform has <br/>
							<b>{data.average_certifications} certifications,</b><br/>
							which is {data.average_certifications > Ind.GLOBAL_CERTS_AVG ? 'above' : 'below'} the
							world average of {Ind.GLOBAL_CERTS_AVG}.
						</p>
						<hr/>
						<p>
							<b>{percentage.toFixed(2)}% of IBMers</b><br/>
							on registered locations have at least one certification registered on this platform
						</p>
					</Tile>
				);
				
				//Certifications, by type chart
				chartData = [
					{'group': 'Badges', 'value': data.badges_external.badge},
					{'group': 'External Certification', 'value': data.badges_external['external certification']}
				]
				
				tempCharts.push(
					<DonutChart key="typesChart"
						data={chartData}
						options={ChartOptions.type}
					/>
				);
				
				//Certifications, by category chart
				chartData = []
				Object.keys(data.certifications_per_category).forEach((categ) => {
					chartData.push({'group': categ, 'value': data.certifications_per_category[categ]});
				});
				
				tempCharts.push(
					<SimpleBarChart key="categoriesChart"
						data={chartData}
						options={ChartOptions.categories}
					/>
				);
				
				//Historical of certifications
				chartData = [];
				Object.keys(data.real_data).forEach(year => {
					chartData.push({
						"group": "Real",
						"key" : year,
						"certifications": data.real_data[year]
					});
					
					chartData.push({
						"group": "Trend",
						"key" : year,
						"certifications": data.model[year]
					});
				});
				
				tempCharts.push(
					<LineChart key="modelChart"
						data={chartData}
						options={ChartOptions.model}
					/>
				);
				
				//Users per location
				chartData = [];
				Object.keys(data.users_per_city).forEach(country => {				
					chartData.push({
						'name': country === "" ? "Other" : country,
						'children': []
					});
					
					Object.keys(data.users_per_city[country]).forEach(location => {
						chartData[chartData.length - 1].children.push({'name': location,
														   'value': data.users_per_city[country][location],
														   'showLabel': data.users_per_city[country][location] / data.users_w_certifications > 0.1});
					});
				});
				
				tempCharts.push(
					<TreemapChart key="locationChart"
						data={chartData}
						options={ChartOptions.location}
					/>
				);
				
				setCharts(tempCharts);
			});
		}
		
		makeCharts();
		
	}, [])

	return(
		<div>
			<h1>Insights</h1>
			<div className="graphsContainer">
				{charts}
				<Tile key="topCerts">
					<div style={{'height': '100%', 'display': 'flex', 'flexFlow': 'column', 'gap': '1em'}}>
					<h3>Top Industry Certifications</h3>
						<TopCertsList data={Ind.TOP_CERTS[topCertsPage]}/>
						<PaginationNav totalItems={Ind.TOP_CERTS.length} onChange={page => setTopCertsPage(page)} loop/>
					</div>
				</Tile>
			</div>
		</div>
	);
}