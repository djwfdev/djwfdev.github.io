import axios from 'axios';

export default axios.create({
    baseURL: 'https://lemon-roadsideassist.herokuapp.com/'
});