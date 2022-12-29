import axios from 'axios'
export class Wincc {
	constructor() {
		const options = {
			method: 'GET',
			url: 'http://localhost:8090/wincc/WinCCRestService/TagManagement/Value/A1',
			headers: {
				'content-type': 'application/json',
				Authorization: 'Basic QWRtaW5pc3RyYXRvcjoxMjM0NTY='
			}
		};
		axios.request(options).then(function (response) {
			console.log(response.data);
		}).catch(function (error) {
			console.error(error);
		});
	}
}