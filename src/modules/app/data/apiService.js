import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api/';

export const getAllEntity = (entityName) => {
    const entityUrl = `${BASE_URL}${entityName}/`;
    return axios.get(entityUrl)
        .then(res => {
            const {data: {count}} = res;
            const numOfPages = Math.ceil(count/10);
            const restOfPagesQuerys = getRestOfPages(numOfPages);
            return Promise.all(restOfPagesQuerys.map(queryString => axios.get(entityUrl+queryString)));
        }).then(res => {
            return res
            .map(pageResult => pageResult.data.results)
            .reduce((acc, pageResult) => {
                return [...acc, ...pageResult]
            }, [])
        })
};

const getRestOfPages = count => {
    let restPages = [];
    for (let i=1 ; i<=count ; ++i) {
        restPages.push(`?page=${i}`)
    }
    return restPages;
};

export const getDataForUrls = (entityDB) => {
    const entityIds = Object.keys(entityDB);
    return Promise.all(entityIds.map(entityId => axios.get(entityDB[entityId])))
        .then(res => res
            .map(res => res.data)
            .reduce((acc, entityData, index) => {
                acc[entityIds[index]] = entityData;
            return acc;
        }, {})
    )
};

export const searchEntityByNames = (entityName, searchValues) => {
    const entityUrl = `${BASE_URL}${entityName}/`;
    return Promise.all(searchValues.map(searchValue => axios.get(entityUrl+`?search=${searchValue}`)))
    .then(entitySearchResults => entitySearchResults
        .map(entitySearchResult => entitySearchResult.data.results)
        .reduce((acc, entitySearchResult) => {
            return [...acc, ...entitySearchResult];
        }, [])
    );
};