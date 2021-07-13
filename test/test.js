const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const util = require('util');

const userUrl = 'http://localhost:8085/adduser';
const orderUrl = 'http://localhost:8085/placeorder';
const getAllOrdersUrl = 'http://localhost:8085/getallorders';
const getOrderDetails = 'http://localhost:8085/orderdetails';

const userid = 1;
const orderdetails = '1:1-2:5-3:2';

describe('place order', function() {
    it('adds order into the database'), function(done) {
        
        
        request.post({url : orderUrl, headers : {
            'userid' : userid,
            'details' : details
        }}, function(e,r,body) {
            var bodyValues = JSON.parse(body);
            expect(bodyValues['Answer']).to.equal('Order placed');
            done();
        })
    }

})



