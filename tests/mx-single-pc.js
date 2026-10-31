#!/usr/bin/env node
'use strict';
// Static safety checks for the MX single-PC adaptation; no test customer data is modified.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const src = fs.readFileSync(path.join(__dirname, '..', 'single-pc', 'ozark-pos-single-pc.html'), 'utf8');
for (const value of [
  '<html lang="es-MX">','Lavandería POS MX','Peso (kg)',
  'wfKg','ql.kg','setQuoteKg', 'Lavado y secado (MXN/kg)',
  'Ingresa el peso en kilogramos','Moneda $10','Moneda $0.50',
  "s[2]+'/'+s[1]+'/'+s[0]"
]) assert.ok(src.includes(value), 'Falta adaptación: '+value);
for(const value of ['wfLbs','ql.lbs','setQuoteLbs','25¢ quarter',"Weight (lb)"]){
  assert.ok(!src.includes(value), 'Referencia a unidades estadounidenses: '+value);
}
assert.match(src,/function saveWFInline\(oid,i\)[\s\S]{0,650}l\.wfKg=lb/);
assert.match(src,/function quoteWFLine\(ql\)[\s\S]{0,600}ql\.kg/);
assert.match(src,/function countTotal\(counts\)/);
console.log('OK: adaptación MX básica y rutas kg/caja presentes. Faltan pruebas operativas de navegador y cobros.');
