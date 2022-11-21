import supertest from 'supertest';

import {app} from '../index';

const request = supertest(app);

describe('Test image wrong prams ', () => {

    it('test Endpoint is Working ',()=>{
        request.get('/api/images?filename=fjord').then((req)=>{
            expect(req.status).toBe(200);
        })
        
    })
    

});