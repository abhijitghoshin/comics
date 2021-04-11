AFRAME.registerComponent("tour", {
  schema:{
state:{type:"string",default:"places-list"},
selectedcard:{type:"string",default:"#card1"}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "captain_marvel",
        title: "Captain Marvel",
        url: "./assets/thumbnails/captain_marvel.jpg",
      },
      {
        id: "empyre",
        title: "Empyre",
        url: "./assets/thumbnails/empyre.jpeg",
      },

      {
        id: "spiderman",
        title: "Spiderman",
        url: "./assets/thumbnails/spiderman.jpeg",
      },
      {
        id: "thor",
        title: "Thor",
        url: "./assets/thumbnails/thor.jpg",
      },
      {
        id: "avengers",
        title: "Avengers",
        url: "./assets/thumbnails/avengers.jpg",
      },
      {
        id: "captain_america",
        title: "Captain_America",
        url: "./assets/thumbnails/captain_america.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl=this.createBorder(position,item.id)
      // Thumbnail Element
     const thumbnails=this.createThumbnail(item)
     borderEl.appendChild(thumbnails)
      // Title Text Element
      const titleEl=this.createTitleEl(position,item)
      borderEl.appendChild(titleEl)
      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder:function(position,id){
    const entityEl=document.createElement("a-entity")
    entityEl.setAttribute("id",id)
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry",{
      primitive:"ring",
      radiusInnner:9,
      radiusOuter:10,
    })
    entityEl.setAttribute("position",position)
    entityEl.setAttribute("material",{
      color:"teal",
      opacity:0.4
    })
    entityEl.setAttribute("cursor-listener",{})
    return entityEl
  },
  createThumbnail:function(item){
    const entityEl=document.createElement("a-entity")
    
    entityEl.setAttribute("visible",true)
    entityEl.setAttribute("geometry",{
      primitive:"circle",
     
      radius:9,
    })
    
    entityEl.setAttribute("material",{
     src:item.url
    })
    return entityEl
  },
  createTitleEl:function(position,item){
    const entityEl=document.createElement("a-entity")
    entityEl.setAttribute("visible",true)
    const Elposition=position
Elposition.y=-20;

    entityEl.setAttribute("position",Elposition)
     
    
    entityEl.setAttribute("text",{
     font:"exo2bold",
     align:"center",
     width:60,
     color:"#e65100",
     value:item.title
    })
    return entityEl
  },
  hideEl:function(ellist){
    ellist.map(el=>{
      el.setAttribute("visible",false)
    })
  },
showView:function(){
  const {selectedcard}=this.data 
  const skyel=document.querySelector("#main-container")
  skyel.setAttribute("material",{
    src:"./assets/360/${selectedcard}/place-0.jpj",
    color:"#fff"
  })
},
tick:function(){
  const {state}=this.el.getAttribute("tour")
  if(state==="view"){
    this.hideEl([this.placesContainer])
    this.showView()
  }
}


});
