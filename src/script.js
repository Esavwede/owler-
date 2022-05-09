console.log("start")
console.log(Date.now() )

// Property Display
const cpuPropertiesDisplay = document.getElementById("cpu-properties")
const ramPropertiesDisplay = document.getElementById("ram-properties")
const drivePropertiesDisplay = document.getElementById("drive-properties")
const videoCardPropertiesDisplay = document.getElementById("video-card-properties")
const batteryPropertiesDisplay = document.getElementById("battery-properties")
const settingsDisplay = document.getElementById("settings")

var activeView = cpuPropertiesDisplay
console.log(activeView )
// Property Menu
const cpu = document.getElementById("cpu")
const ram = document.getElementById("ram")
const drive = document.getElementById("drive")
const videoCard = document.getElementById("video-card")
const battery = document.getElementById("battery")
const settings = document.getElementById("settings")




var activeEl = document.getElementById("cpu")
activeEl.classList.add('active')


cpu.addEventListener('click',handleMenuClick,false)
ram.addEventListener('click',handleMenuClick,false)
drive.addEventListener('click',handleMenuClick,false)
videoCard.addEventListener('click',handleMenuClick,false)
battery.addEventListener('click',handleMenuClick,false)
settings.addEventListener('click',handleMenuClick,false)



function handleMenuClick()
{

  const el = event.target
  activeEl.classList.remove('active')


  if( el.nodeName === "IMG" )
  {
    const imageParent = el.parentNode
    const imageDivParent = imageParent.parentNode

    imageDivParent.classList.add('active')
    activeEl = imageDivParent

    const imageId = el.getAttribute('id')

    console.log(el)
    console.log( imageId )
    // pop the last element "i"

    activeView.style.display = 'none'

    activeView = document.getElementById(imageId+'properties')
    activeView.style.display = 'block'

    return
  }


  if( el.nodeName === "DIV" )
  {

    var el_id = el.getAttribute('id')
    var divParent = el


    if( el_id !== 'cpu' || el_id !== 'ram' || el_id !== 'drive' || el_id !== 'video-card' || el_id !== 'battery' || el_id !== 'settings' )
    {

          divParent = el.parentNode

    }

    el_id = divParent.getAttribute('id')

    console.log(divParent)
    console.log(activeView + 'active view')

    divParent.classList.add('active')
    activeEl = divParent

    const divId = el.getAttribute('id')
    // pop the last element "i"

    activeView.style.display = 'none'

    console.log(activeView + 'still active here ')
    activeView = document.getElementById(el_id+'-properties')
    activeView.style.display = 'block'

    return
  }


}




function appendPropertiesToDisplay(propertyId,propertiesArray)
{


console.log(` propertyId ${ propertyId} : propertyArr ${ propertiesArray}`)
    var div
    const propertiesArrayLength = propertiesArray.length
    var i, text
    const display = document.getElementById(propertyId)


if( propertyId === 'video-card-properties' || propertyId === 'drive-properties' )
{

  for( var i = 0; i < propertiesArray.length; i++ )
  {

    const currentKeys = Object.keys(propertiesArray[i])
    const currentKeysLength = currentKeys.length

      for( var j = 0; j < currentKeysLength; j++ )
      {
        div = document.createElement("DIV")
        div.setAttribute("class","property-value")

            let keys = Object.keys(propertiesArray[i])
            div.innerHTML = ` ${ currentKeys[j] }:         ${ propertiesArray[i][currentKeys[j]] }`
            display.appendChild(div)


      }
  }


return
}
    for( i = 0; i < propertiesArrayLength; i++ )
    {

      div = document.createElement("DIV")
      div.setAttribute("class","property-value")

          let keys = Object.keys(propertiesArray[i])
          div.innerHTML = ` ${ keys[0] }:        ${ propertiesArray[i][keys[0]] }`
          display.appendChild(div)
    }

}



console.log("end")
console.log(Date.now())


// ELECTRON APPLICATION
const electron = require('electron')
const ipc = electron.ipcRenderer

ipc.on('systemSpecs',(event, data)=>{

  console.log(" appending data to display ")
  appendPropertiesToDisplay('cpu-properties',data['cpu-properties'])
  appendPropertiesToDisplay('ram-properties',data['ram-properties'])
  appendPropertiesToDisplay('drive-properties',data['drive-properties'])
  appendPropertiesToDisplay('battery-properties',data['battery-properties'])
  appendPropertiesToDisplay('video-card-properties',data['video-card-properties'])
  console.log(' finished appending data to display ')
})


ipc.on('specsReady',(event, data)=>{
  document.getElementById("preloader").style.display = 'none'
  document.getElementById("application-container").style.display = 'block'
})
