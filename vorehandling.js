timeout= 1*1000
mode=0
modes = [0,1,2,3] //0 = firstrun (devour), 1 = sloshing (progress), 2 = succumb (end),3= escape
organs = 
[
  {name:"maw",damage:1,trapto:"throat",escapeto:"freedom",
  messages:[
    {key:"pre",message:"text 1"},
    {key:"mid",message:"text 1"},
    {key:"post",message:"text 1"},
    {key:"pre",message:"text 2"},
    {key:"mid",message:"text 2"},
    {key:"post",message:"text 2"}
    ],escapechance:1,trapchance:8
  },
  {name:"throat",damage:2,trapto:"stomach",escapeto:"maw",
  messages:[
    {key:"pre",message:"text 1"},
    {key:"mid",message:"text 1"},
    {key:"post",message:"text 1"},
    {key:"pre",message:"text 2"},
    {key:"mid",message:"text 2"},
    {key:"post",message:"text 2"}
    ],escapechance:2,trapchance:5
  },
  {name:"stomach",damage:10,trapto:"stomach",escapeto:"throat",
  messages:[
    {key:"pre",message:"text 1"},
    {key:"mid",message:"text 1"},
    {key:"post",message:"text 1"},
    {key:"pre",message:"text 2"},
    {key:"mid",message:"text 2"},
    {key:"post",message:"text 2"}
    ],escapechance:1,trapchance:9
  }
]
prey = {hp:100}

var healthbar;
hp=prey.hp
selected = "stomach"

function slosh(hp,o,s)
{ 
  healthbar = hpbar(hp)
  if (selected == "freedom") {return modehandling(3)}
  if(!HpIsZero(hp)) {modehandling(1)}
  if(HpIsZero(hp)) {return modehandling(2)}
  

handleslosh(hp,o,s,mode) //restarts slosh process
}

function modehandling(mode=0)
{
  switch (mode)
  {
    case 0: 
      console.log("Encounter starts.")
      return "start"
    case 1: 
      console.log("HP lost.")
      return "progress"
    case 2: 
      console.log("You died.")
      return "loss"
    case 3:
      console.log("You won.")
      return "win"
    default: 
      return "error"
      
  }
}


function messagehandler()
{}

function handleslosh(hp,o,s,mode) //Handles actual damage being taken as well as escape/trap
{
hp=hp-o.filter(e=>e.name == selected)[0].damage
organ = o.filter(e=>e.name == selected)


if (Math.trunc(Math.random()*10) == organ[0].escapechance ) 
{

  console.log("Moved from " + selected + " to " + organ[0].escapeto )
selected=organ[0].escapeto
}


setTimeout(function(){

slosh(hp,o,s,mode)
},timeout)
}

function hpbar(hp,mhpo=50,heartsymbol="█") //Generates an hp bar based on math
{   
    hpo=Math.trunc(hp/2); hearts = []; hearts.push("Hp: `")
    for (i=0;i< hpo ;i++) {hearts.push(heartsymbol)}
    hpo=mhpo-hpo
    for (i=0;i< hpo ;i++) {hearts.push(" ")}
    hearts.push("`")
    return hearts.join("")
}

function HpIsZero(hp) //Checks hp being 0. returns true if 0
{
  return (hp<!0)
}
function succumb(o,s,mode) //Handles "player" losing.
{modehandling(mode)

}

slosh(prey.hp,organs,selected) //Process()
