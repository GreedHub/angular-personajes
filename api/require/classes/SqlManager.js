let sqlConection = require("mssql");

class SqlManager{

    constructor(db_name) {

        if (!SqlManager.instance) {
            SqlManager.instance = this;
            this.database = db_name;
            this.server="localhost";
            this.user="sa";
            this.password="";
        }

        return SqlManager.instance;
        
    }

    setDbUser(user,password){
        this.user = user;
        this.password = password;
    }

    setServer(server){
        this.server = server;
    }

    async executeProcedure(sp_name,array_of_sqlparameter=[]){

        let pool = await new sqlConection.ConnectionPool({
            'server'   : this.server,
            'database' : this.database,
            'user'     : this.user,
            'password' : this.password
        }).connect();   
        let req = pool.request();
        
        return new Promise (async (resolve,reject)=>{
    
        array_of_sqlparameter.forEach(parameter=>{
            req.input(parameter.name, sqlConection.Char, parameter.value);
        });
        
        req.execute(sp_name,(err, result)=>{
            if(err!=undefined){
                console.log(err);
                reject(err);
                return;
            }          
            if(result.recordset){ 
                let response = []; 
                for(let k in result.recordset){ 
                    response.push(result.recordset[k])
                }
                resolve(response);
            }  
          
            resolve([]);
        });
    
    });
    
    }

    async executeQuery(query,array_of_sqlparameter=[]){

        let pool = await new sqlConection.ConnectionPool({
            'server'   : this.server,
            'database' : this.database,
            'user'     : this.user,
            'password' : this.password
        }).connect();   
        let req = pool.request();
        
        return new Promise (async (resolve,reject)=>{
    
        array_of_sqlparameter.forEach(parameter=>{
            req.input(parameter.name, sqlConection.Char, parameter.value);
        });
        
        req.query(query,(err, result)=>{
            if(err!=undefined){
                console.log(err);
                reject(err);
                return;
            }          
            if(result.recordset){ 
                let response = []; 
                for(let k in result.recordset){ 
                    response.push(result.recordset[k])
                }
                resolve(response);
            }  
          
            resolve([]);
        });
    
    });
    
    }
    



    
}

module.exports = SqlManager; 