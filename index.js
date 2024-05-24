const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const authRoute = require("./routes/authRoute");

app.use(cors())
app.use("/api/auth", authRoute)

app.get('/', (req, res) => {
  res.json('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})