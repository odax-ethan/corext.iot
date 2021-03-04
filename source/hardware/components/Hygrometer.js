var five = require("johnny-five");
const { systemEmitter } = require('../../util/emitter/systemEmitter')

class HYRGOMETER {
    constructor(device, target_board) {
        this.device = device; //devices shape
        this.uid = this.device.uid // pull id out 
        this.target_board = target_board; //the devices board
        this.device_container
    }

    build () {
        this.device_container = new five.Hygrometer({id:this.uid, pin: this.device.pin, controller: this.device.controller, freq:2000})
        
        this.device_container.on("data" , function() {
            systemEmitter.emit('event', this.uid, 'trigger', 'OK', this.relativeHumidity, TIMESTAMP.local)
        });
    }
}


module.exports = { HYRGOMETER }