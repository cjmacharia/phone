import request from 'supertest';
import app from '../index';
import chai from 'chai';
import http from 'http';
let expect = chai.expect
let should = chai.should()
describe('test phone numbers functionalities', () => {
    let port= 3001;
    let limit  = {
        NumberToGenerate: 10001
    }
    let number = {
        NumberToGenerate: 6
    }
    it('should genrate phone number', () => {
        return request(app).post('/')
            .send(number)
            .expect(201)
            .then(res => {
                expect(res.body).to.be.a('Object')
            })
    })

    it('cannot genertae more than 10,000 number', () => {
        return request(app).post('/')
            .send(limit)
            .expect(400)
            .then(res => {
                expect(res.body.message).to.be.eql(`Oops You have exceeded the 10,000  number generation limit`);
                expect(res.body).to.be.a('Object')
            })
    })

    it('can save data to external storage', () => {
         request(app).post('/')
            .send(number)
            .expect(201)
        return request(app)
            .post('/save')
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.body.message).to.be.eql(`successfully saved phone numbers to file storage`);
            })

    })

    it('Can get all generated phones', () => {
        request(app)
            .post('/')
            .send(number)
            .expect(201)
        return request(app)
            .get('/')
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.body).should.be.a('Object')
            })


    })
    it('can sort the generates numbers in ascending order', () => {
        request(app)
            .post('/')
            .send(number)
            .expect(201)
        return request(app)
            .get('/ascending')
            .expect(200)
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.body).should.be.a('Object')
                expect(res.body.PhoneNumbers).to.have.property('largestGeneratedNumber')
            })
    })
    it('can sort the generates numbers in descending order', () => {
        request(app)
            .post('/')
            .send(number)
            .expect(201)
        return request(app)
            .get('/descending')
            .expect(200)
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.body).should.be.a('Object')
                expect(res.body.PhoneNumbers).to.have.property('largestGeneratedNumber')
            })
    })

    it('can delete genrated phone numbers', () => {
        request(app)
            .post('/')
            .send(number)
            .set('Accept', 'application/json')
            .expect(201)
        return request(app)
            .delete('/')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res => {
                expect(res.body).should.be.a('Object')
                expect(res.body.message).to.be.eql('Successfully cleared the phone number storage');
            })


    })
})


