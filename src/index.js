require('babel-polyfill');
// var page = require('page');
import { navegador } from './navegador'
import { sub_navegador } from './sub_navegador'
import { login } from './login'
navegador()
sub_navegador()
login()

