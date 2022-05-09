const si = require('systeminformation')
const { requiredValues } = require('./requiredValues')
var detailsStructure
var systemSpecs

function setSystemSpecs(_systemSpecs)
{
		systemSpecs = _systemSpecs
}

function getSystemSpecs()
{
	return systemSpecs
}

async function processSystemSpecs()
{


await si.get(requiredValues)
.then((data)=>{

detailsStructure = data
var systemSpecsObject = { }
systemSpecsObject['cpu-properties'] = processCpuDetails()
systemSpecsObject['ram-properties'] = processRamDetails()
systemSpecsObject['battery-properties'] = processBatteryDetails()
systemSpecsObject['video-card-properties'] = processGraphicsCardsDetails()
systemSpecsObject['drive-properties'] = processDrivesDetails()
systemSpecsObject['fs-properties'] = processFileSystemsDetails()

setSystemSpecs(systemSpecsObject)

})
.catch((err)=>{ console.log(' error occured while getting system information '); console.log(err) })
}


function convertBytesToGigs(numInBytes)
{
		// transform speed to GB
								temp = numInBytes / ( 1024 * 1024 * 1024 )
								temp = Math.round( temp )
							temp = temp + 'GB'
							return temp
}


function getMah(volts,wh)
{
	var mah_val = (wh) * (1000/(volts))
	return mah_val
}


function mwhToWh(mwh_value)
{
	var wh_val = 1000000 * mwh_value
	return wh_val
}

function getMahValue(volts_value, mwh_value )
{
	const wh_value = mwhToWh(mwh_value)

	var res = getMah(volts_value, wh_value)
	res = Math.round(res)
	res = res + ' mAH'

	var _v = res.slice(0,4)
	_v += ' mAH'
	return _v
}

// PROCESS CPU DETAILS
function processCpuDetails()
{

// VARIABLE DEFINITIONS
const cpuDetailsKeys = Object.keys(detailsStructure.cpu)
var i, _key, _value
var cpuDetailsArray = []
const cpuDetailsKeysLength  = cpuDetailsKeys.length



// LOOP THROUGH ALL PROPERTIES
		for( i = 0; i < cpuDetailsKeysLength; i++ )
		{


					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = cpuDetailsKeys[i]
					_value = detailsStructure.cpu[cpuDetailsKeys[i]]


					// SET THE KEY VALUE PAIR PROPERTY
					displayObject = {}
					displayObject[_key] = _value

					// CONVERT SPEEDS TO GIGAHERTZ
					if( _key === 'speed' )
					{
								// transform speed to ghz
							displayObject[_key] += ' GHz'
					}

					if( _key === 'minSpeed' )
					{
								// transform speed to ghz
							displayObject[_key] += ' GHz'
					}


					if( _key === 'maxSpeed' )
					{
							// transform speed to ghz
						displayObject[_key] += ' GHz'
					}


					// PUSH TO CPU_DETAILS_ARRAY
					cpuDetailsArray.push(displayObject)
		}


	// SEND CPU_DETAILS_ARRAY TO RENDERER
	return cpuDetailsArray
}

// PROCESS RAM DETAILS
function processRamDetails()
{


// VARIABLE DEFINITIONS
const ramDetailsKeys = Object.keys(detailsStructure.mem)
var i, _key, _value, temp
var ramDetailsArray = []
const ramDetailsKeysLength  = ramDetailsKeys.length



// LOOP THROUGH ALL PROPERTIES
		for( i = 0; i < ramDetailsKeysLength; i++ )
		{


					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = ramDetailsKeys[i]
					_value = detailsStructure.mem[ramDetailsKeys[i]]


					// SET THE KEY VALUE PAIR PROPERTY
					displayObject = {}
					displayObject[_key] = _value



					// CONVERT SPEEDS TO GIGAHERTZ
					if( _key === 'used' )
					{

							displayObject[_key] = convertBytesToGigs(_value)

					}else if( _key === 'total' )
					{

							displayObject[_key] = convertBytesToGigs(_value)

					}else if( _key === 'active' )
					{

							displayObject[_key] = convertBytesToGigs(_value)

					}else if( _key === 'available' )
					{

							displayObject[_key] =  convertBytesToGigs(_value)

					}else if( _key === 'free' )
					{

						displayObject[_key] = convertBytesToGigs(_value)

					}else{ /** Do nothing */ }



					// PUSH TO CPU_DETAILS_ARRAY
					ramDetailsArray.push(displayObject)
		}
	// SEND RAM_DETAILS_ARRAY TO RENDERER
					return ramDetailsArray
}

// PROCESS BATTERY DETAILS
function processBatteryDetails()
{

// VARIABLE DEFINITIONS
const batteryDetailsKeys = Object.keys(detailsStructure.battery)
var i, _key, _value, temp
var batteryDetailsArray = []
const batteryDetailsKeysLength  = batteryDetailsKeys.length

// Battery Specifics
const batteryVoltage = detailsStructure.battery['voltage']
const designedCapacityMwh = detailsStructure.battery['designedCapacity']
const maxCapacityMwh  = detailsStructure.battery['maxCapacity']
const currentCapacityMwh  = detailsStructure.battery['currentCapacity']


// convert capacity unit from mWh to mAH
detailsStructure.battery['capacityUnit'] = 'mAH'

// LOOP THROUGH ALL PROPERTIES
		for( i = 0; i < batteryDetailsKeysLength; i++ )
		{


					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = batteryDetailsKeys[i]
					_value = detailsStructure.battery[batteryDetailsKeys[i]]


					// SET THE KEY VALUE PAIR PROPERTY
					displayObject = {}
					displayObject[_key] = _value



					// CONVERT Batter capacity in m
					if( _key === 'designedCapacity' )
					{

							displayObject[_key] = getMahValue(batteryVoltage, designedCapacityMwh )

					}else if( _key === 'maxCapacity' )
					{

							displayObject[_key] = getMahValue( batteryVoltage, maxCapacityMwh )

					}else if( _key === 'currentCapacity' )
					{

							displayObject[_key] = getMahValue( batteryVoltage, currentCapacityMwh )

					}else{ /** Do nothing */ }



					// PUSH TO CPU_DETAILS_ARRAY
					batteryDetailsArray.push(displayObject)


		}

					// SEND RAM_DETAILS_ARRAY TO RENDERER
					return batteryDetailsArray
}

// PROCESS GRAPHICS CARDS DETAILS
function processGraphicsCardsDetails()
{

// VARIABLE DEFINITIONS
const graphicsCardsArray = detailsStructure.graphics.controllers // Graphics Cards Array
const graphicsCardArrayLength  = graphicsCardsArray.length
const graphicsCardsDetailsArray = []
var i, j

for( i = 0; i < graphicsCardArrayLength; i++ )
{

var graphicsDetailsKeys = Object.keys(graphicsCardsArray[i])
var graphicsDetailsKeysLength  = graphicsDetailsKeys.length


graphicsCardsDetailsArray.push({})

		for( j = 0; j < graphicsDetailsKeysLength; j++ )
		{



					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = graphicsDetailsKeys[j]
					_value = graphicsCardsArray[i][graphicsDetailsKeys[j]]


					// SET THE KEY VALUE PAIR PROPERTY
					graphicsCardsDetailsArray[i][_key] = _value

		}
}


			console.log( graphicsCardsDetailsArray )
			return graphicsCardsDetailsArray

}

// PROCESS DISPLAYS DETAILS
function processDisplaysDetails()
{


// VARIABLE DEFINITIONS
const displaysArray = detailsStructure.graphics.displays// Graphics Cards Array
const displaysArrayLength  = displaysArray.length
const displaysDetailsArray = []
var i, j

for( i = 0; i < displaysArrayLength; i++ )
{

var displaysDetailsKeys = Object.keys(displaysArray[i])
var displaysDetailsKeysLength  = displaysDetailsKeys.length

displaysDetailsArray[i] = { }

		for( j = 0; j < displaysDetailsKeysLength; j++ )
		{



					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = displaysDetailsKeys[j]
					_value = displaysArray[i][displaysDetailsKeys[j]]


					// SET THE KEY VALUE PAIR PROPERTY
					displaysDetailsArray[i][_key] = _value

		}
}

			return displaysDetailsArray

}


// PROCESS DRIVE  DETAILS
function processDrivesDetails(){

// VARIABLE DEFINITIONS
const disksArray =  detailsStructure.diskLayout
const disksArrayLength  = disksArray.length
const disksDetailsArray = []
var i, j

for( i = 0; i < disksArrayLength; i++ )
{

var diskDetailsKeys = Object.keys(disksArray[i])
var diskDetailsKeysLength  = diskDetailsKeys.length

disksDetailsArray[i] = { }

		for( j = 0; j < diskDetailsKeysLength; j++ )
		{


					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = diskDetailsKeys[j]
					_value = disksArray[i][diskDetailsKeys[j]]


							if( _key === 'smartData' || _key === 'smartStatus' ){ continue }


					if( _key === 'size' )
					{
								_value = convertBytesToGigs(_value)
					}

					// SET THE KEY VALUE PAIR PROPERTY
					disksDetailsArray[i][_key] = _value

		}
}

			return disksDetailsArray
}

// PROCESS File System STATS
function processFileSystemsDetails(){


// VARIABLE DEFINITIONS
const fsArray =  detailsStructure.fsSize
const fsArrayLength  = fsArray.length
const fsDetailsArray = []
var i, j

for( i = 0; i < fsArrayLength; i++ )
{

var fsDetailsKeys = Object.keys(fsArray[i])
var fsDetailsKeysLength  = fsDetailsKeys.length

fsDetailsArray[i] = { }

		for( j = 0; j < fsDetailsKeysLength; j++ )
		{



					// GET THE KEY AND VALUE OF THE CURRENT PROPERTY
					_key = fsDetailsKeys[j]
					_value = fsArray[i][fsDetailsKeys[j]]



					if( _key === 'size' || _key === 'used'  || _key === 'available' )
					{
							_value = convertBytesToGigs(_value)
					}

					if( _key === 'use' )
					{
						_value = _value + ' %'
					}

					// SET THE KEY VALUE PAIR PROPERTY
					fsDetailsArray[i][_key] = _value

		}
}

			return fsDetailsArray

}


module.exports = { processSystemSpecs, getSystemSpecs }
