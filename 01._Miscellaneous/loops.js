// -- Loop Methods in JavaScript

// .map .filter .reduce .find .find .indexOf indexOf ((forEach - evade at "almost" all costs))

// Rule 1: Use loop methods in Javascript // Javascript conventions
// Rule 2: Don't use for loops unless if you are finger counting
// Rule 3: Use .map if you need the data afterwards, otherwise only use .forEach if you don't

// map returns a new list of the same size: 1:1

// task: double the numbers
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map((num) => num * 2);
console.log(doubledNumbers+2);


const numbersIterated = numbers.map ((value, index, array) => console.log(value, index, array));
console.log(numbersIterated)

// the forbidden for loop - dont use. 
for (let i = 0; i < numbers.length; i++) {
    return i * 2;
}

const countries = [
    { name: "Lesotho", gpd: 530 },
    { name: "Papa New Guinea", gdp: 1025 },
    { name: "Saint Vincent and the Grenadines", gpd: 1200 }
];

// task: if the country us lesotho, boost the GPD with 500
/*
const countriesWithGPDUpdated = countries.map((country) => {
    if (country.name === "Lesotho") {
        country.gpd += 500;
    }
    return country;
});

*/

const countriesWithGPDUpdated = countries.map((country) => {
    return {
        name: country.name,
        gpd: country.name === "Lesotho" ? country.gdp + 500 : country.gdp
    };
});

console.log(countriesWithGPDUpdated)

// task -> filter out the countries where the gdp is below 1000
// Rule of thumb here is return new lists and work on with those. 
// if several methods use the same base, side effect will occur. 

const richCountries = countries.filter(countries => countries.gpd > 1000);
console.log(richCountries);