var url = "https://api.spotify.com/v1/users"
var token
async function gettoken(){
    let clientid = 'a09f6a83c6664fceb916b6726619e890'
    let clientsecret ='d746dd693a9d4104b0e2813d470a3ad9'
    let result = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientid + ':' + clientsecret)},
        body: 'grant_type=client_credentials'})

        let data =  await result.json();
        let user_id = document.getElementById("fn").value
        console.log(data)
        getuser(user_id,data.access_token)

       //console.log("HI :" + result)
       
        //console.log(data.access_token)
         //console.log(data)
        
      //  console.log(data.access_token);
        //return Promise.resolve(data.access_token)
//       token = data.access_token
//return data.access_token
//} 

//let token11 = gettoken()
//console.log(token11)
//gettoken()

//getoken(ont)
//function foo(token)
//{
//    getoken(ont)     
//}

//function getoken(ont)
//{
//    return ont
//} 

//getuser(user_id,data.access_token)

//console.log("HI :" + token)


//let data1 = new Promise()
//data1 = gettoken();
//console.log(typeof(data1))
//console.log(data1.access_token)

//console.log(token.access_token)
//let token1 = gettoken().then(value => {return value});
//console.log("hi :" + token1)

//async function getusers()
//{

}  
async function getuser(user_id,token)
{
  
    console.log(user_id)
let userpr = await fetch('https://api.spotify.com/v1/users/' + user_id + '/playlists', 
{   method : 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
});
    let userdata = await userpr.json();
        console.log(userdata)
  //  let userpr = await fetch('https://api.spotify.com/v1/me',
   // let name = userdata.items[0].name
    //let imge = userdata.items[0].images[1].url
    //console.log(imge)
    //userdata.items.forEach(function(element) {
      // console.log(element.tracks.href)
       //gettracks(element.tracks.href,token)
    //});
   document.getElementById("cc1").innerHTML= user_id
   // let im = document.getElementById("pli")
       // im.src = imge
let tbody = document.getElementById("tbody")
//let userdi = document.getElementById("c1")
//userdi.innerHTML = user_id
//tbody.innerHTML = `<div><h3> Playlist User Name - ${user_id} </h3></div>`
document.querySelector("form").reset()

userdata.items.forEach((element) => {
    let imgsrc = element.images[2];
    let imgulr = imgsrc.url 
    tbody.innerHTML += 

    `<tr class='cl'>
            <td >
                <div class="card">
                <div>
                <img class="card-img-top" id= "pli"  src="${imgulr}" onclick="gettracks()" alt="Card image cap">
                </div>
               <div>
          </td>
          <td>
            <h6 class="card-title" id="pln">${element.name}</h6>
            </td>
            <td>
            <a class='text-warning cc1'  onclick="getplaylist(${element.id})">Update</a> | <a class='text-danger' onclick="deleteplaylist(${element.id})">Delete</a>
            </td>
        </tr>`  
});


//document.getElementById("fn").value = ""
}

async function getplaylist(plid)
{

    console.log("hi" + token)

    let url = 'https://api.spotify.com/v1/playlists/' + plid + '/tracks'

    let tracks = await fetch(url,{ 
    method : 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
    })
    tracklist = await tracks.json();
    console.log(tracklist)

}

async function deleteplaylist(plid)
{
    console.log("hi" + token) 
    let murl = 'https://api.spotify.com/v1/users' + plid + '/playlist'
    let tracks = fetch(url,{ 
    method : 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
    })

    let trackslist = await (await tracks).json()
    console.log(trackslist)
}
