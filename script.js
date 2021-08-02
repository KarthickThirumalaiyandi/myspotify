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

        let user_id = document.getElementById("name").value
        
        document.getElementById("card").innerHTML=""
        //document.getElementById("pws").innerHTML=""  
        let ims  = document.getElementById("im")
        ims.removeAttribute('src')
        
    // console.log("hi" + token)
        gettoken()
        console.log(localStorage.getItem("id"))
        //console.log(plid)
        //let user_id1 = 'zozw93fo6mwptz4p8077pmdv5' 
        let token1 = localStorage.getItem("id")
        localStorage.setItem("name",user_id)

        let url = 'https://api.spotify.com/v1/users/' + user_id

        let tracks = await fetch(url,{ 
        method : 'GET',
        headers: { 'Authorization' : 'Bearer ' + token1}
        })
        tracklist = await tracks.json();
        console.log(tracklist)
        console.log(tracklist.display_name)
        //console.log(tracklist.images[0].url)
        document.getElementById("head").innerHTML = "PROFILE"
        document.getElementById("fn").innerHTML = tracklist.display_name
        let img1 = document.getElementById("im") 
        console.log(tracklist.images.length)
        document.getElementById("flr").innerHTML = tracklist.followers.total + " Followers ."
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
        let userpr = await fetch('https://api.spotify.com/v1/users/' + uid + '/playlists?limit=50', 
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

        let pla = document.createElement("div")
        pla.setAttribute('class','pal')
        pla.innerHTML="Public Playlists"

        let btn = document.createElement("button")
        btn.setAttribute('class','btn btn-dark')
        btn.addEventListener('click',() => gettrack());
        btn.innerHTML = "FOLLOW"

        let addel = document.createElement("div")
        addel.setAttribute('class','adddel')
        
        //let adbdiv = document.createElement("div")
        //adbdiv.setAttribute('class','adddela')

        //let delbdiv = document.createElement("div")
        //delbdiv.setAttribute('class','adddeld')

        let addbtn = document.createElement("button")
        addbtn.setAttribute('class','btn btn-success')
        addbtn.addEventListener('click',() => gettrack());
        addbtn.innerHTML = "Add Track"

        //adbdiv.append(addbtn)

        let delbtn = document.createElement("button")
        delbtn.setAttribute('class','btn btn-warning')
        delbtn.addEventListener('click',() => removetrack());
        delbtn.innerHTML = "Delete Track"

        //delbdiv.append(delbtn)

        addel.append(addbtn,delbtn)
        userdata.items.forEach((element) => {
            let imgulr
            console.log("HI" + element.images.length)
            //console.log("HI" + element.images[0].url)

                if (element.images.length !== 0)
                {
                    imgulr = element.images[0].url
                }
                
                console.log("hiii" + element.id)
                let col = document.createElement("div")
                col.setAttribute('class','col-3 mb-3')
        
                let card = document.createElement("div")
                card.setAttribute('class','card h-100');
                card.addEventListener('click',() => gtracklist(element.id));

               let imgcard = document.createElement("img")
               imgcard.setAttribute('class','card-img-top')
               imgcard.setAttribute('src',imgulr)
 
               
                //let cardbody = document.createElement("div")
                //cardbody.setAttribute('class','card-body')
        
               let cardtitle = document.createElement("h6")
               cardtitle.setAttribute('class','card-title')
                cardtitle.innerHTML = element.name 
                //cardbody.append(cardtitle)
                //card.append(imgcard,cardbody)
                card.append(imgcard,cardtitle)
                col.append(card)
                row.append(col)
                divc.append(pla,btn,addel,row)
                
            });
//            console.log("hi" + userdata.total)
            document.getElementById("pl").innerHTML =  userdata.total + " Playlists ."
            
    //       document.body.append(divc)
        //userfollowera(uid1)
        
    }
async function gettrack(ele){
        console.log("hii")
        console.log("hi " + ele.value)
        gettoken()
        let token3 = localStorage.getItem("id")
        let tracklst = document.getElementById("tracklst") 
        //console.log(uid)
        let tracklist = await fetch('https://api.spotify.com/v1/search?q=' + ele.value +' &type=track&limit=50', 
          {   method : 'GET',
         headers: { 'Authorization' : 'Bearer ' + token3}
        });

        let track = await tracklist.json();
        //console.log(track.tracks.items[0].name)

       track.tracks.items.forEach((element) => {
            
             console.log("hi" + element.name)
                
             let tracklst = document.getElementById("tracklst")
             let newoption = document.createElement('option')
             //let optiontxt = document.createElement(`<p> <input type="button" value="Submit" class="btn btn-primary"> </p>`)
             //newoption.appendChild(optiontxt) 
             //newoption.value =  element.name 
             //newoption.innerHTML = + `<p> <input type="button" value="Submit" class="btn btn-primary"> </p>`
             newoption.setAttribute("value",element.name)
            // newoption.setAttribute("innerHTML",`<p> <input type="button" value="Submit" class="btn btn-primary"> </p>`)
             tracklst.appendChild(newoption)
            });
}
   
async function gtracklist (ele)
{
   console.log("hii" + ele)
  //  console.log("hi " + ele.value)
    gettoken()
    let token4 = localStorage.getItem("id")
    //let tracklst = document.getElementById("tracklst") 
    //console.log(uid)
    let tracklist = await fetch('https://api.spotify.com/v1/playlists/' + ele, 
      {   method : 'GET',
        headers: { 'Authorization' : 'Bearer ' + token4}
     });

     let bckbtn = document.createElement("button")
        bckbtn.setAttribute('class','btn btn-secondary')
        bckbtn.addEventListener('click',() => getuserpr1());
        bckbtn.innerHTML = "Back"

    let tracklisto = await tracklist.json();
    console.log(tracklisto)
    let imgulr1 = document.getElementById("im")
    if (tracklisto.images.length !== 0)
    {
        imgulr1.src = tracklisto.images[0].url
    }   

    let folw 
    if (tracklisto.followers.total !== 0 )
    {
        folw = tracklisto.followers.total + " likes . "
    }
    else
    {
        folw =""
    }

    let song 
    if (tracklisto.tracks.total !== 0)
    {
        song = tracklisto.tracks.total + " songs" 
    }
    else
    {
        song =""
    }

    document.getElementById("fn").innerHTML = tracklisto.name
    document.getElementById("head").innerHTML = ""
    //document.getElementById("pro").innerHTML = ""
    document.getElementById("pl").innerHTML = tracklisto.owner.display_name + " . " + folw + song 
    document.getElementById("flr").innerHTML = ""
    let divr = document.getElementById("card")
    divr.innerHTML = ""
    let divc = document.getElementById("card")
    let row = document.createElement("div")
    row.setAttribute('class','row')

        let addel1 = document.createElement("div")
        addel1.setAttribute('class','adddel')

        let addbtn1 = document.createElement("button")
        addbtn1.setAttribute('class','btn btn-success')
        addbtn1.addEventListener('click',() => gettrack());
        addbtn1.innerHTML = "Add Track"

        let delbtn1 = document.createElement("button")
        delbtn1.setAttribute('class','btn btn-warning')
        delbtn1.addEventListener('click',() => removetrack());
        delbtn1.innerHTML = "Delete Track"
    
     addel1.append(addbtn1,delbtn1)

     tracklisto.tracks.items.forEach((element) => {
        
        
           console.log("hiii" + element.track.id)
            let col = document.createElement("div")
            col.setAttribute('class','col-3 mb-3')
    
            let card = document.createElement("div")
            card.setAttribute('class','card h-100');
        
            let imgulr
            if (element.track.album.images.length !== 0)
            {
              imgulr = element.track.album.images[0].url
           }   


           let imgcard = document.createElement("img")
           imgcard.setAttribute('class','card-img-top')
           imgcard.setAttribute('src',imgulr)

           
            //let cardbody = document.createElement("div")
            //cardbody.setAttribute('class','card-body')
    
           let cardtitle = document.createElement("h6")
           cardtitle.setAttribute('class','card-title')
            cardtitle.innerHTML = element.track.name 
            //cardbody.append(cardtitle)
            //card.append(imgcard,cardbody)
            
            card.append(imgcard,cardtitle)
            col.append(card)
            row.append(col)
            divc.append(bckbtn,addel1,row)
            
        });
}

async function getuserpr1()
    {
        document.getElementById("card").innerHTML=""
        //document.getElementById("pws").innerHTML=""  
     //   let ims  = document.getElementById("im")
      //  ims.removeAttribute('src')
        let user_id = localStorage.getItem("name")
    // console.log("hi" + token)
        gettoken()
        console.log(localStorage.getItem("id"))
        //console.log(plid)
        //let user_id1 = 'zozw93fo6mwptz4p8077pmdv5' 
        let token5 = localStorage.getItem("id")

        let url = 'https://api.spotify.com/v1/users/' + user_id

        let tracks = await fetch(url,{ 
        method : 'GET',
        headers: { 'Authorization' : 'Bearer ' + token5}
        })
        tracklist = await tracks.json();
        console.log(tracklist)
        console.log(tracklist.display_name)
        //console.log(tracklist.images[0].url)
        document.getElementById("fn").innerHTML = tracklist.display_name
        document.getElementById("head").innerHTML = "PROFILE"
        let img1 = document.getElementById("im") 
        console.log(tracklist.images.length)
        document.getElementById("flr").innerHTML = tracklist.followers.total + " Followers ."
        if (tracklist.images.length !== 0)
        {
            img1.src= tracklist.images[0].url
        }

        document.querySelector("form").reset()
        userplaylist(user_id)
    }
