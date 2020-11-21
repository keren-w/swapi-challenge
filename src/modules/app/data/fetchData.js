import {getAllEntity, getDataForUrls, searchEntityByNames} from './apiService';
import {DB, ENTITYS, PLANETS_TO_COMPARE} from './constants';

const {VEHICLES, PILOTS_DB, PLANETS_DB} = DB;

export const fetchData = () => {
    return getAllEntity(ENTITYS.VEHICLES)
        .then(allVehicles => allVehicles.filter(vehicle => vehicle.pilots.length))
        .then(vehicles => {
            // update global const VEHICLES
            vehicles.forEach(vehicle => VEHICLES.push(vehicle));
            return getPilotDB(vehicles);
        })
        .then(pilotData => {
            // update global const PILOTS_DB
            Object.keys(pilotData).forEach(pilotId => PILOTS_DB[pilotId] = pilotData[pilotId]);
            return getPlanetsDB(pilotData);
        })
        .then(planetsData => {
            Object.keys(planetsData).forEach(planetId => PLANETS_DB[planetId] = planetsData[planetId]);
        })
};

const getPilotDB = vehicles => {
    // create a DB object to save pilots data by id
    const pilotsData = {};
    vehicles.forEach(vehicle => {
        const vehiclePilotsIds = vehicle.pilots.map(pilotUrl => {
            const pilotId = extractEntityId(pilotUrl);
            pilotsData[pilotId] = pilotUrl;
            return pilotId;
         });
         // change vehicles pilots reference to pilot Ids
         vehicle.pilots = vehiclePilotsIds;
        }
    );
    return getDataForUrls(pilotsData);
}

const getPlanetsDB = pilotData => {
    // create a DB object to save planets data by id
    const planetsData = {};
    Object.keys(pilotData).forEach(pilotId => {
        const planetId = extractEntityId(pilotData[pilotId].homeworld);
        // change pilots planets reference to planet Ids
        planetsData[planetId] = pilotData[pilotId].homeworld;
        pilotData[pilotId].homeworld = planetId;
    });
    return getDataForUrls(planetsData);
}

const extractEntityId = url => {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length-2]);
}

export const fetchQuestionPlanets = () => {
    const planetNamesToSearch = [];
    const planetsFromDB = PLANETS_TO_COMPARE.map(planetName => {
        const foundPlanet = Object.values(PLANETS_DB).find(planet => planet.name === planetName);
        if (!foundPlanet) {
            planetNamesToSearch.push(planetName);
        }
        return foundPlanet;
    }).filter(foundPlanet => foundPlanet);
    
    return searchEntityByNames(ENTITYS.PLANETS, planetNamesToSearch)
    .then(foundPlanets => foundPlanets.concat(planetsFromDB));
}