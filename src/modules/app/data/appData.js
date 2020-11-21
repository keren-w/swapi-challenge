import {DB} from './constants';
import {fetchData, fetchQuestionPlanets} from './fetchData';

const {VEHICLES, PILOTS_DB, PLANETS_DB} = DB;

export const getAppData = () => {
    const appData = {};
    return fetchData()
    .then(res => {
        logDB();
        appData.highestPopulationVehicle = getWinningVehicle(res);
        return fetchQuestionPlanets();
    })
    .then(questionPlanets => {
        appData.planetsPopulation = questionPlanets.map(planet => ({
            name: planet.name,
            population: planet.population
        }));
        return appData;
    })
}

const logDB = () => {
    console.log("VEHICLES", VEHICLES);
    console.log("PILOTS_DB", PILOTS_DB);
    console.log("PLANETS_DB", PLANETS_DB);
};

const getWinningVehicle = () => {
    const sumVehiclePlanetPopulation = VEHICLES.map(vehicle => {
        const {pilots, name} = vehicle;
        const pilotsData = pilots.map(pilotId => PILOTS_DB[pilotId]);
        const populationSum = sumPopulationForVehicle(pilotsData);
        const planetsData = pilotsData.map(pilot => pilot.homeworld)
        .map(planetId => {
            const planetData = PLANETS_DB[planetId];
                return {
                    name: planetData.name,
                    population: planetData.population
                }
            });

        return {
            vehicle: name,
            pilots: pilotsData.map(pilot => pilot.name),
            planets: planetsData,
            totalPopulation: populationSum
        }
    });
    
   return sumVehiclePlanetPopulation.reduce((winningVehicle, vehicle) => {
        if(vehicle.totalPopulation > winningVehicle.totalPopulation) {
            winningVehicle = vehicle
        }
        return winningVehicle;
    }, {totalPopulation: 0});
}

const sumPopulationForVehicle = pilotsData => {
    return pilotsData.reduce((totalPopulation, pilotData) => {
        const pilotPlanetId = pilotData.homeworld;
        const planetPopulation = PLANETS_DB[pilotPlanetId].population;
        if (planetPopulation !== "unknown") {
            totalPopulation += parseInt(planetPopulation);
        }
        return totalPopulation;
        }, 0);
};