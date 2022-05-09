



const requiredValues =
{
	cpu:'manufacturer, brand, vendor, family, model, stepping, voltage, speed, speedMin, speedMax, governor, cores, physicalCores, processors, socket,virtualization',
	mem:'total, free, used, active, available, buffers, cached, slab, buffcache, swaptotal, swapused, swapfree',
	battery:'hasBattery, cycleCount, isCharging, designedCapacity, maxCapacity, currentCapacity, voltage, capacityUnit, percent, timeRemaining, acConnected, type, model, manufacturer, serial',
	graphics:'controllers, displays',
	diskLayout:'*',
  fsSize:'*'
}



module.exports = { requiredValues }

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
					ramDetailsArray.push(displayObject)


					// SEND RAM_DETAILS_ARRAY TO RENDERER
					console.log(ramDetailsArray)
		}

}
