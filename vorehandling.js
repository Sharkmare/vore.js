timeout= 4*1000
mode=0
modes = [0,1,2,3] //0 = firstrun (devour), 1 = sloshing (progress), 2 = succumb (end),3= escape
organs = 
[
  {name:"maw",damage:1,trapto:"throat",escapeto:"freedom",
  messages:[
    {key:0,message:"`\n *the bot leans down and swiftly chomps you up in its jaws.*"},
    {key:1,message:"\n *you get sloshed around inside the bots maw as it plays with you. Soaking you in saliva.*"},
    {key:2,message:"\n *as you ran out of stamina the bot used its tongue to press you against its gullet. Your head slipping in and getting pulled down as you got swallowed. A long trip down the gullet later you splashed into its stomach, defeated.*"},
    {key:0,message:"`\n *The bot swiftly snatches you up in its hand dangling you over its jaws before dropping you in.*"},
    {key:1,message:"\n *you were suckled on and tossed about within the bots maw.*"},
    {key:2,message:"\n *as you feel your body slowly go limp from exhaustion you are moved beneath the bots tongue, kept firmly pinned beneath it.*"},
    {key:3,message:"\n *you manage to climb free of the bots maw!*"}
    ],escapechance:1,trapchance:8
  },
  {name:"throat",damage:2,trapto:"stomach",escapeto:"maw",
  messages:[
    {key:0,message:"\n error text"},
    {key:1,message:"\n *the strong muscles contract and squeeze around you as a single finger squeezes down on the bulge you made in the bots throat.*"},
    {key:2,message:"\n *you feel your bodies limbs give in from exhaustion as you slide down the bots tight throat, dropping into the stomach without any stamina left.*"},
    {key:0,message:"\n error text"},
    {key:3,message:"\n error text"},
    {key:1,message:"\n *the throat ripples and pulses around you, squeezing your body as you travel through it.*"},
    {key:2,message:"\n *you feel your bodies limbs give in from exhaustion as you slide down the bots tight throat, dropping into the stomach without any stamina left.*"}
    ],escapechance:2,trapchance:5
  },
  {name:"stomach",damage:10,trapto:"stomach",escapeto:"throat",
  messages:[
    {key:0,message:"\n error text"},
    {key:1,message:"`\n *the stomach sloshes you about noisily*"},
    {key:2,message:"`\n *the bot lays down on its gut, tightly squeezing you within, pressing the last bits of stamina out of your body~*"},
    {key:0,message:"\n error text"},
    {key:3,message:"\n error text"},
    {key:1,message:"`\n *the stomach compacts around you and squeezes you tightly.*"},
    {key:2,message:"`\n *your body succumbs to the bots gut as it lets out a triumphant belch~*"}
    ],escapechance:1,trapchance:9
  }
]

if(typeof suffix != "number"){suffix=10}
if(suffix>100){suffix=100};if(suffix<1){suffix=100}
prey = {hp:100}
if(suffix) prey.hp = suffix
var healthbar;
hp=prey.hp
selected = "maw"

function slosh(hp,o,s)
{ 
  healthbar = hpbar(hp)
  organ = o.filter(e=>e.name == s)
  //console.log(organ)
  
  if (s == "freedom") {s="maw";return console.log(healthbar+modehandling(3,hp,s,o))}
  if(!HpIsZero(hp) && mode) {console.log(healthbar+modehandling(1,hp,s,o))}
  if (!mode){console.log(healthbar+modehandling(0,hp,s,o));mode=1}
  if(HpIsZero(hp)) {return  console.log(healthbar+modehandling(2,hp,s,o))}
  
setTimeout(function(){
handleslosh(hp,o,s,mode,healthbar) //restarts slosh process
},timeout)
}

function modehandling(mode=0,hp,s,o)
{organ = o.filter(e=>e.name == s);message = organ[0].messages.filter(e=>e.key==mode);
pos=Math.trunc(Math.random()*message.length);message = message[pos].message
  
  switch (mode)
  {
    case 0: 
      console.log("Encounter starts.")
      console.log(`Entered ${s}`)
      return message
    case 1: 
      //console.log(`sloshing in ${selected}`)
      //console.log(`${hp} hp left`)
      return message
    case 2: 

      console.log("You lost.")
      console.log(`${hp} hp left`)
      return message
    case 3:
      console.log("You won.")
      console.log(`${hp} hp left`)
      return message
    default: 
      console.log("error")
      return "error"
      
  }
}


function messagehandler() //verifying if user sent a message, possibly by object comparision or timestamping
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

function handleslosh(hp,o,s,mode,healthbar) //Handles actual damage being taken as well as escape/trap
{
hp=hp-o.filter(e=>e.name == s)[0].damage
organ = o.filter(e=>e.name == s)

doweescape=Math.trunc(Math.random()*10)
if (doweescape == organ[0].escapechance && Math.trunc(Math.random()*4== 0))
{

  console.log(healthbar+"\n *you are moved up from the " + s + " to the " + organ[0].escapeto+"*" )
s=organ[0].escapeto
}
else if ( doweescape == organ[0].trapchance && s!="stomach")
{

  console.log(healthbar+"\n *you are pulled down from the " + s + " to the " + organ[0].trapto+"*" )
s=organ[0].trapto
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
