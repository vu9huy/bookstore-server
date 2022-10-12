const mongoose = require('mongoose');

let countRetry = 0;
exports.connectDatabase = async () => {
    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Successfully connected to the mongo database!');
        const isLog = process.env.NODE_ENV !== 'production';
        if (isLog) {
            mongoose.set('debug', true);
        }

        countRetry = 0;
    } catch (error) {
        console.log(error);
        countRetry += 1;
        console.log(`Could not connect to the mongo database. Retry times: ${countRetry}`);
        if (countRetry < 4) {
            setTimeout(this.connectDatabase, 3000);
        } else {
            process.exit();
        }
    }
};

exports.disConnect = async () => {
    await mongoose.disconnect();
};
