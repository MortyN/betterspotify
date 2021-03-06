const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json());

app.post("/refresh", (req, res) =>{
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:8082",
        clientId: "2e17e297722948e0aafa6a6550ba6345",
        clientSecret: "201572c4be8e425baf9367c76e224d46",
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
            //Save the access token
            spotifyApi.setAccessToken(data.body["access_token"])
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })

})

app.post("/login", (req,res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:8082",
        clientId: "2e17e297722948e0aafa6a6550ba6345",
        clientSecret: "201572c4be8e425baf9367c76e224d46"
    })

    spotifyApi.authorizationCodeGrant(code).then(data =>{
        
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})


app.post("/refresh", (req,res) =>{
    const refreshToken = req.body.refreshToken
})

console.log("App running ;)")
app.listen(8081)