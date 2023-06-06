const express = require ("express");
const bodyParser = require ("body-parser")
const apicache = require ("apicache")
const v1WorkoutRouter = require ("./v1/routes/workoutRoutes")
const v1MembersRouter = require ("./v1/routes/membersRoutes")
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;
const cache = apicache.middleware;

app.use(cache("2 minutes"))
app.use(bodyParser.json())

//Endpoints
app.use("/api/v1/workouts",v1WorkoutRouter);
app.use("/api/v1/members",v1MembersRouter);

app.listen (PORT, () => {
    console.log (`API is listening on port ${PORT}`)
    V1SwaggerDocs(app, PORT);
})