
//get pouch functions for: 
const { Device_history_add, bulk_device_history, Set_Settings, Get_Setting_OBJ } = require('./pouchdb/pouchdb')



// action => { ADD_DEVICE_HISTORY, GET_ALL_HISTORY, GET_SETTINGS, SET_TARGET, GET_DEVICEBANK }  
// .... save and update are the same thing
// .... get will get all  - settings doc
//


// all .env settinsg in an obj
const settings = {
       
    NODE_ENV :  process.env.NODE_ENV,
    SYSTEM_NAME :  process.env.SYSTEM_NAME,
    DATABASE :  process.env.DATABASE,
    DATABASE_URL :  process.env.DATABASE_URL,
    HARDWARE_SAMPLE_RATE :  process.env.HARDWARE_SAMPLE_RATE,
    SAMPLE_TEMP_SCALE :  process.env.SAMPLE_TEMP_SCALE,
    HOST :  process.env.HOST,
    PORT :  process.env.PORT,

}


//define instance function 
var ADD_DEVICE_HISTORY = null, 
      GET_ALL_HISTORY = null, 
      GET_SETTINGS = null, 
      SET_TARGET = null, 
      GET_DEVICEBANK = null;


// on load up - set global variables for database actions
const database_init = () => {


  

    switch (process.env.DATABASE) {
        case 'POUCHDB':

            console.log('database set to pouchdb');
         
            ADD_DEVICE_HISTORY = Device_history_add()
            GET_ALL_HISTORY = bulk_device_history()
            GET_SETTINGS = Get_Setting_OBJ()
            SET_TARGET = null
            GET_DEVICEBANK = null

            //save .env variables to  settings 

            // console.log(ADD_DEVICE_HISTORY);
            
        break;
    
        default:
            break;
    }



}


const database_action =  async ( action,  target, data ) => {

    console.log('hello?');

    switch (action) {
        case 'ADD_DEVICE_HISTORY': 
                //takes device_id and to_save
                console.log('added');
                return ADD_DEVICE_HISTORY(target, data)
            break;
        case 'GET_ALL_HISTORY': 
                //takes device_id and to_save
                console.log('got');
                return GET_ALL_HISTORY()
            break;
        default:
            throw 'there has been an error in the action setting of the database_action()'
        break;
    }
    
   


}



module.exports = { database_init, database_action }
