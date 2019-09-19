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
selected = "maw"

function slosh(hp,o,s)
{ 
  healthbar = hpbar(hp)
  console.log(healthbar)
  if (!mode){modehandling(0,hp);mode=1}
  if (selected == "freedom") {return mstate = modehandling(3,hp)}
  if(!HpIsZero(hp)) {mstate = modehandling(1,hp)}
  if(HpIsZero(hp)) {return mstate = modehandling(2,hp)}
  

handleslosh(hp,o,s,mode) //restarts slosh process
}

function modehandling(mode=0,hp)
{
  switch (mode)
  {
    case 0: 
      console.log("Encounter starts.")
      console.log(`Entered ${selected}`)
      return "start"
    case 1: 
      //console.log(`sloshing in ${selected}`)
      //console.log(`${hp} hp left`)
      return "progress"
    case 2: 
      console.log("You lost.")
      console.log(`${hp} hp left`)
      return "loss"
    case 3:
      console.log("You won.")
      console.log(`${hp} hp left`)
      return "win"
    default: 
      console.log("error")
      return "error"
      
  }
}


function messagehandler()
{
var mymessage="this";
var lastmessage="that";
var currentmessage="these";

function unstamp(stamp)
{
sanity = stamp.split("T")
sanity = sanity.join(":")
sanity = sanity.split("+")
sanity = sanity.join(":")
sanity = sanity.split(":")
return sanity
}
function restamp(sanity)
{
unstamp(stamp)
ISOtoVAR(stamp)
return restamp =`${td}T${th}:${tm}:${ts}+00:00`
}
function ISOtoOBJ(stamp)
{
  unstamp(stamp)
  ISOtoVAR(stamp)
  objSTAMP = {
  date : parseInt(td),
  hour : parseInt(th),
  minute : parseInt(tm),
  second : parseFloat(ts),
}
}
function ISOtoVAR(stamp)
{
td = sanity[0]; th = sanity[1]; tm = sanity[2];ts = sanity[3]
}

}

function handleslosh(hp,o,s,mode) //Handles actual damage being taken as well as escape/trap
{
hp=hp-o.filter(e=>e.name == selected)[0].damage
organ = o.filter(e=>e.name == selected)

doweescape=Math.trunc(Math.random()*10)
if (doweescape == organ[0].escapechance ) 
{

  console.log("Moved from " + selected + " to " + organ[0].escapeto )
selected=organ[0].escapeto
}
else if ( doweescape == organ[0].trapchance )
{

  console.log("Moved from " + selected + " to " + organ[0].trapto )
selected=organ[0].trapto
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
