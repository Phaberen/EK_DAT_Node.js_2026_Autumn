const express = require('express');
const app = express();

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
    // req.params values are always strings, so convert before comparing with ===
    const id = Number(req.params.id);

    const animal = animals.find((animal) => animal.id === id);

    if (!animal) {
        return res.status(404).send({ message: `No animal with id ${id}` });
    }

    res.send({ data: animal });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
