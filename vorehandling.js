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
  {name:"stomach",damage:4,trapto:"stomach",escapeto:"throat",
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

console.log(organs)
hp=prey.hp
selected = "stomach"

function slosh(hp,o,s)
{ //console.clear()//this purges the console.
  healthbar = hpbar(hp)
  //console.log(healthbar)
  modehandling(mode)
  if(HpIsZero(hp)) {mode=2}
  else {mode=1}  
if (HpIsZero(hp)) return succumb(o,s)

handleslosh(hp,o,s) //restarts slosh process
}

function modehandling(mode=0)
{
  switch (mode)
  {
    case 0: 
      
      return "start"
    case 1: 
      
      return "progress"
    case 2: 
      
      return "loss"
    case 3:
      
      return "win"
    default: 
      return "error"
      
  }
}


function messagehandler()
{}

function handleslosh(hp,o,s) //Handles actual damage being taken as well as escape/trap
{
hp=hp-o.filter(e=>e.name == selected)[0].damage

setTimeout(function(){

slosh(hp,o,s)
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
function succumb(o,s) //Handles "player" losing.
{}

slosh(prey.hp,organs,selected) //Process()
