import axios from "axios";

export default class Search {
    constructor(queryType, countryName = '') {
        this.queryType = queryType;
        this.countryName = countryName;
    }

    async getResults() {
        try {
            // returns a json from the api
            const result = await axios(`https://corona.lmao.ninja/v2/${this.queryType}/${this.countryName}`);

            this.data = result.data;
            // console.log(this.data);

        } catch (error) {
            console.log(error);
        }
    }
}




// api url: https://corona.lmao.ninja/v2/