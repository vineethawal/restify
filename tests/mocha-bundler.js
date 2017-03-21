import chai from 'chai'
import sinon from 'sinon'

import supertest from 'supertest'
import app from '../app'

global.request = supertest(app)
global.assert = chai.assert
global.sinon = sinon
