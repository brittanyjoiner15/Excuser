
const mongo = require("mongodb").MongoClient;
const url = "mongodb+srv://onlykingKD:NHW9D6MV@cluster0.gbs2o.mongodb.net/test?authSource=admin&replicaSet=atlas-l4bvx5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const dbName = "myNewDB";

mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Connected successfully to server");
    const db = client.db(dbName);
});

module.exports = {
    getRandom: function getRandom(numberOfExcuses) {

        
        var limit = numberOfExcuses > excuses.length ? excuses.length : numberOfExcuses;

        var out = new Array(limit);
        var excuse;

        for (var i = 0; i < limit; i++) {
            do {
                excuse = excuses[Math.floor(Math.random() * excuses.length)];
            } while (out.indexOf(excuse) > -1);
            out[i] = excuse;
        }
        
        return out;
    },

    getByID: function getByID(id) {
        for (var i = 0; i < excuses.length; i++) {
            if (excuses[i].id == id) {
                return excuses[i];
            }
        }
        return null;
    },    

    getByCategory: function getByCategory(category, numberOfExcuses) {

        var categoryExcuses = excuses.filter(function (excuse) {
            return excuse.category === category;
        });

        var limit = numberOfExcuses > categoryExcuses.length ? categoryExcuses.length : numberOfExcuses;

        var out = new Array(limit);
        var excuse;

        for (var i = 0; i < limit; i++) {
            do {
                excuse = categoryExcuses[Math.floor(Math.random() * categoryExcuses.length)];
            } while (out.indexOf(excuse) > -1);
            out[i] = excuse;
        }
        
        return out;
    }
        
}