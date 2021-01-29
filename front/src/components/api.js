import axios from 'axios'

let options = [];

const getOptions = (input) => {

    axios.defaults.baseURL = 'http://127.0.0.1:3000';
    // axios.defaults.headers.common['Accept'] = 'application/json';
    // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

    return axios.get('/listcountries')
        .then(function (response) {
            console.log(response.data.data)
            options = response.data.data.map(country => ({ value: country.name, label: country.name }));
            return { options };
        })
        .catch(function (error) {
            console.log(error);
        });
}

const sleep = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export const loadOptions = async (search, prevOptions) => {
    getOptions();
    await sleep(1000);

    let filteredOptions;
    if (!search) {
        filteredOptions = options;
    } else {
        const searchLower = search.toLowerCase();

        filteredOptions = options.filter(({ label }) =>
            label.toLowerCase().includes(searchLower)
        );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 10
    );

    return {
        options: slicedOptions,
        hasMore
    };
};

export const addNewOption = async inputValue => {
    await sleep(1000);

    axios.defaults.baseURL = 'http://127.0.0.1:3000';
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

    axios.post('/add', {
        name: inputValue
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    const newOption = {
        label: inputValue,
        value: inputValue
    };

    options.push(newOption);

    return newOption;
};
