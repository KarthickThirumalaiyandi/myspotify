var url = "https://api.spotify.com/v1/users"
async function gettoken(){
    let clientid = 'a09f6a83c6664fceb916b6726619e890'
    let clientsecret ='d746dd693a9d4104b0e2813d470a3ad9'
    let result = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientid + ':' + clientsecret)},
        body: 'grant_type=client_credentials'})

        let data =  await result.json();
        
        console.log("t " + data.access_token)
        localStorage.setItem("id",data.access_token)
}

async function getuserpr()
{
    document.getElementById("card").innerHTML=""  
    let ims  = document.getElementById("im")
     ims.removeAttribute('src')
    let user_id = document.getElementById("name").value
   // console.log("hi" + token)
      gettoken()
       console.log(localStorage.getItem("id"))
      //console.log(plid)
      //let user_id1 = 'zozw93fo6mwptz4p8077pmdv5' 
    let token1 = localStorage.getItem("id")

    let url = 'https://api.spotify.com/v1/users/' + user_id

    let tracks = await fetch(url,{ 
     method : 'GET',
     headers: { 'Authorization' : 'Bearer ' + token1}
    })
    tracklist = await tracks.json();
    console.log(tracklist)
    console.log(tracklist.display_name)
    //console.log(tracklist.images[0].url)
    document.getElementById("fn").innerHTML = tracklist.display_name
    let img1 = document.getElementById("im") 
    console.log(tracklist.images.length)
    if (tracklist.images.length !== 0)
    {
        img1.src= tracklist.images[0].url
    }

    document.querySelector("form").reset()
    userplaylist(user_id)
}

async function userplaylist(uid)
{
    gettoken()
    let token2 = localStorage.getItem("id")
    //let user_id = document.getElementById("fn").value   
    console.log(uid)
    let userpr = await fetch('https://api.spotify.com/v1/users/' + uid + '/playlists', 
    {   method : 'GET',
    headers: { 'Authorization' : 'Bearer ' + token2}
    });
    let userdata = await userpr.json();
    console.log(userdata)

    let tbody = document.getElementById("tbody")
    document.querySelector("form").reset()
    let divc = document.getElementById("card")
    let row = document.createElement("div")
    row.setAttribute('class','row')

    userdata.items.forEach((element) => {
            let imgsrc = element.images[0];
            let imgulr = imgsrc.url
            let col = document.createElement("div")
            col.setAttribute('class','col-3 mb-3')
    
            let card = document.createElement("div")
            card.setAttribute('class','card h-100')
    
            let imgcard = document.createElement("img")
            imgcard.setAttribute('class','card-img-top')
            imgcard.setAttribute('src',imgulr)
    
            let cardbody = document.createElement("div")
            cardbody.setAttribute('class','card-body')
    
            let cardtitle = document.createElement("h4")
            cardtitle.setAttribute('class','card-title')
            cardtitle.innerHTML = element.name 
            cardbody.append(cardtitle)
            card.append(imgcard,cardbody)
            col.append(card)
            row.append(col)
            divc.append(row)
        });

 //       document.body.append(divc)
     
}
