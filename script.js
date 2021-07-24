async function gettoken(){
    let clientid = 'a09f6a83c6664fceb916b6726619e890'
    let clientsecret ='d746dd693a9d4104b0e2813d470a3ad9'
    let result = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientid + ':' + clientsecret)},
        body: 'grant_type=client_credentials'})

        let data = await result.json();
        //console.log(data)
        var user_id = "tuggareutangranser"
        console.log();
         getuser(user_id,data.access_token)

} 

gettoken();


//console.log(token.access_token)

async function getuser(user_id,token)
{
    
let userpr = await fetch('https://api.spotify.com/v1/users/' + user_id + '/playlists',
{   method : 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
});
    let userdata = await userpr.json();
        console.log(userdata)
    //let name = userdata.items[0].name
    //let imge = userdata.items[0].images[1].url
    //console.log(imge)
    //userdata.items.forEach(function(element) {
      // console.log(element.tracks.href)
       //gettracks(element.tracks.href,token)
    //});
   // document.getElementById("pln").innerHTML= name
   // let im = document.getElementById("pli")
   // im.src = imge
let cbody = document.getElementById("cbody")

cbody.innerHTML = `<div><h3> Playlist User Name - ${user_id} </h3></div>`

userdata.items.forEach((element) => {
    let imgsrc = element.images[1].url; 
    cbody.innerHTML += 
    `<div class="card" style="width: 30%;">
        <img class="card-img-top" id= "pli" src="${imgsrc}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title" id="pln">${element.name}</h5>
        </div>
      </div>`
});




}


async function gettracks(url,token)
{

    let tracks = fetch(url,{ 
    method : 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
    })

    let trackslist = await (await tracks).json()
    console.log(trackslist)
}
