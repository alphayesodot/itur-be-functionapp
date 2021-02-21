import * as env from 'env-var';

export default {
    mongo: {
        uri: env.get('MONGO_URI').default('mongodb://localhost:27017/devDB').asUrlString(),
    },
};
