const DateAdder = require("../util/DateAdder");

class TimeDateManger {

    getTime (data) {
        return `${(new Date(data)).getHours()}:${(new Date(data)).getMinutes()}`   
    }

    getCurrentTime(){
        return `${(new Date()).getHours()}:${(new Date()).getMinutes()}`   
    }

    conpareTime(date1, date2){
        let firstDate = date1.split(":");
        let secondDate = date2.split(":");
        let firstDateDuration = parseInt(firstDate[0]) + (parseInt(firstDate[1])/60);
        let secondDateDuration = parseInt(secondDate[0]) + (parseInt(secondDate[1])/60);

        if(firstDateDuration > secondDateDuration){
            return true;
        }
        else if (firstDateDuration < secondDateDuration){
            return false;
        }
        else{
            return "equal";
        }
    }

    addingDate (date1, date2)  {
        let firstDate = date1.split(":");
        let secondDate = date2.split(":");
        const result = [];
        
    
        firstDate.reduceRight((carry, num, index)=>{
            const max = [24, 60, 60][index];
            const add = +secondDate[index];
            result.unshift( (+num+add+carry) % max );
            return Math.floor( (+num + add + carry) / max );
        }, 0);
    
    return result.join(":");
    }



}
module.exports = new TimeDateManger();