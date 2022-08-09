//
let value=`spider`
let page=1
let movielist=document.querySelector("#movielist")
let noMovies=document.querySelector('.no-movies')
let totalresult;
let getmovies=async(val,pag)=>{
    try{
        let MovieData=await fetch(`https://www.omdbapi.com/?s=${val}&page=${pag}&apikey=e9b58612`)
        let MoviewInfo=await MovieData.json()
        console.log(MoviewInfo)
        //list of value
        MoviewSerchlist=MoviewInfo.Search

        //total available
         totalresult=MoviewInfo.totalResults
        if(totalresult>0){
        movielist.innerHTML=''
        noMovies.innerHTML=''
        MoviewSerchlist.map((movie)=>{
            displayMovies(movie)

        })
        pagination(pag)
    }
    else{
        movielist.innerHTML=''
        document.querySelector(".pagination").innerHTML='';
        noMovies.innerHTML=`
        <div class="alert alert-dark" role="alert">with this keyword there is no data</div>
        `
    }
    }
    catch(err){
        console.log(err)
    }
}

getmovies(value,page)

let displayMovies=async(movies)=>{
    console.log(movies)
movielist.innerHTML+=`
    <div class="movie">
    <div>
    <p>${movies.Year}</p>
    </div>

    <div>
    <img src="${movies.Poster}" alt="Loading.." class="imgMovie">
    </div>
    <div>
    <span>${movies.Type}</span>
    <h3>${movies.Title}</h3>
    </div>
    </div>

`

    }

let searchMoview=()=>{
    value=document.querySelector("#searchMoview").value
    if(value===''){
        value="spider"
    }
    getmovies(value,page)

}




//pagination display
let pagination = (pagenumbs) => {
    let pagelist = document.querySelector(".pagination");
    let totalpage = Math.ceil(totalresult / 10);
    let lastpage = totalpage;
  console.log(lastpage)
    //checking total page reaches or not
    if (
      totalpage === Number(pagenumbs) ||
      totalpage < Number(pagenumbs)
    ) {
      lastpage = totalpage;
      console.log(lastpage);
    } else {
      //pagination displaying 3 value
      lastpage = Number(pagenumbs) + 2;
    }
  
    let pagli = "";
    let isdisableprev = "";
    let isdesablenext = "";
    //disable previous btn
    if (Number(pagenumbs) === 1) {
      isdisableprev = "disabled";
    }
  
    //disable next btn
    if (Number(pagenumbs) === totalpage) {
      isdesablenext = "disabled";
    }
  
    pagli += `<li class="page-item Previous ${isdisableprev}" id=${
      Number(pagenumbs) - 1
    }>
      <a class="page-link">Previous</a>
    </li>`;
  
    for (let i = Number(pagenumbs); i <= lastpage; i++) {
      let isactive = "";
  
      if (i === Number(pagenumbs)) {
        isactive = "active";
      }
      pagli += `<li class="page-item ${isactive} ${isdesablenext}" id=${i}>
                  <a class="page-link" href="#">${i}</a>
                  </li>`;
    }
  
    pagli += ` <li class="page-item Next ${isdesablenext}" id=${
      Number(pagenumbs) + 1
    }>
      <a class="page-link" >Next</a>
    </li>`;
  
    pagelist.innerHTML = pagli;
    //click set
    pageclick();
  };


  
//click event page number click
let pageclick = () => {
    //select page-item not set to disable class
    let clicknumber = document.querySelectorAll(".pagination li:not(.disabled)");
  
    clicknumber.forEach((clicknumber, ind) => {
      clicknumber.addEventListener("click", function () {
        let text = this.id;
        pagenumb = clicknumber.id;
  console.log(value)
        getmovies(value,pagenumb);
      });
    });
  };