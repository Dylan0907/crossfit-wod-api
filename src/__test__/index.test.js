const {app} = require ('../index')
const DB = require('../database/db.json')

const request = require('supertest')

const workouts = DB.workouts

describe ('GET /workouts', () =>{
    test('Should return a 200 status', async () => {
       const response = await request(app).get('/api/v1/workouts').send()
       expect(response.status).toBe(200)
       console.log(response.body.data)
    })

    test('Should return an array of workouts', async () => {
        const response = await await request(app).get('/api/v1/workouts').send()
        expect(response.body.data).toMatchObject(workouts)
     })
})