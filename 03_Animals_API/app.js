const express = require('express'); // imports express
const app = express(); // instantiates express

app.use(express.json());

// In-memory "database": an array of objects.
// Array because /animals must return a list, main action is GET
const animals = [
    { id: 1, name: "Bald Eagle", type: "bird", canFly: true },
    { id: 2, name: "Elephant", type: "mammal", weightKg: 6000 },
    { id: 3, name: "Salmon", type: "fish" }
];

// GET /animals  -> the whole collection
app.get('/animals', (req, res) => {
    res.send({ data: animals });
});

// GET /animals/:id  -> one animal
app.get('/animals/:id', (req, res) => {

    // req.params values are always strings, so convert to number before comparing with ===
    const id = Number(req.params.id);

    // 
    const animal = animals.find((animal) => animal.id === id);

    if (!animal) {
        res.status(404).send({ message: `No animal with id ${id}` });
        return; // exit the function early if no animal is found
    }

    res.send({ data: animal });
});

console.log({ data: undefined });

app.post("/animals", (req, res) => {
    const providedAnimal = req.body;

    providedAnimal.id = nextId++;

    animals.push(providedAnimal);

    res.send({ data: providedAnimal });
});

app.delete("/animals/:id", (req, res) => {
    const providedId = Number(req.params.id);
    const foundAnimal = animals.findIndex((animal)) => animal.id === providedId);

    if (foundanimalIndex === -1) {
        res.status(404).send({ errorMessage: `No animal found by id ${providedId}` })
    }

    animals.splice(foundanimalIndex, 1);

    res.send({});
});

app.patch("/animals/:id", (req, res) => {
    const providedId = Number(req.params.id);
    const foundAnimal = animals.findIndex((animal)) => animal.id === providedId);

    if (foundanimalIndex === -1) {
        res.status(404).send({ errorMessage: `No animal found by id ${providedId}` })
    }

    const providedAnimal = req.body;
    

)};


// post-fix
// console.log(value++);

// ++ increments before or after depending on placement.

// pre-fix
// consolge.log(++value);

// 2xx OK
// 3xx Redirect
// 4xx Client-side error
// 5xx Server-side error

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});





// overvejelser
// læsbar kode med flere variabler eller mindre memory load til garbage collector 
// uden additional variables
