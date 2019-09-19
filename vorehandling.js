organs = [{"name":"maw","damage":1,"trapto":"throat","escapeto":"freedom","messages":[{"key":"pre","message":"text 1"},{"key":"mid","message":"text 1"},{"key":"post","message":"text 1"},{"key":"pre","message":"text 2"},{"key":"mid","message":"text 2"},{"key":"post","message":"text 2"}],"escapechance":1,"trapchance":8},{"name":"throat","damage":2,"trapto":"stomach","escapeto":"maw","messages":[{"key":"pre","message":"text 1"},{"key":"mid","message":"text 1"},{"key":"post","message":"text 1"},{"key":"pre","message":"text 2"},{"key":"mid","message":"text 2"},{"key":"post","message":"text 2"}],"escapechance":2,"trapchance":5},{"name":"stomach","damage":4,"trapto":"stomach","escapeto":"throat","messages":[{"key":"pre","message":"text 1"},{"key":"mid","message":"text 1"},{"key":"post","message":"text 1"},{"key":"pre","message":"text 2"},{"key":"mid","message":"text 2"},{"key":"post","message":"text 2"}],"escapechance":1,"trapchance":9}]
prey = {hp:100}
console.log(organs)
hp=prey.hp
selected = "stomach"
function slosh(hp,o,s,mode=0,messages=0)
{
hp=hp-o.filter(e=>e.name == selected)[0].damage
if (HpIsZero(hp)) return succumb(o,s)
else 
{
messages=messagehandler(o,s,mode)
console.log("HP: " + messages[0].message)
}

}
function messagehandler(o,s,mode)
{console.log(1)
if(!mode){
organ=o.filter(e=>e.name == s)
messages = o[0].messages.filter(m=>m.key=="pre")
return messages

}

}
function handleslosh()
{

}
function hpvalidate()
{

}
function HpIsZero(hp)
{
  return (hp<!0)
}
function succumb(o,s)
{

}
slosh(prey.hp,organs,selected) //Process()

console.log(HpIsZero(hp))
