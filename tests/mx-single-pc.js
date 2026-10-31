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
// Language map: keep a substantial Spanish vocabulary without modifying internal IDs.
const dictLine = src.match(/const DICT=(\{[^\n]*\});/);
assert.ok(dictLine, 'Falta diccionario de traducción es-MX');
const dict = JSON.parse(dictLine[1]);
assert.ok(Object.keys(dict).length >= 500, 'El diccionario es-MX perdió traducciones');
assert.equal(dict['Cancel'], 'Cancelar');
assert.equal(dict['Backup'], 'Respaldo');
// The bag/shop ticket must never identify kilograms as pounds.
assert.ok(src.includes("r+='Peso: '+kg+' kg @ '+money(rate)+'/kg\\n';"),
  'El ticket interno no debe imprimir libras al cobrar por kg');
// Syntax-parse each inline script without executing the POS or touching customer data.
const scripts = [...src.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 2, 'La edición debe conservar aplicación + localización autónomas');
for (const m of scripts) new Function(m[1]);
// Spanish labels must be embedded in the rendered Settings screen, not only in docs.
const settingsSection = src.slice(src.indexOf('function adminSettings(){'), src.indexOf('/* 💾 OWN YOUR DATA', src.indexOf('function adminSettings(){')));
for (const label of [
  'Reglas de operación', 'Piezas por bolsa dividida', 'Lavado y secado (MXN/kg)',
  'Precio fijo por carga ($ MXN)', 'Días para la entrega',
  'Días para servicio urgente', 'Forma de asignar estantes',
  'Días para recordatorios', 'Cargo por almacenaje (%)',
  'Cierre automático de bolsas', 'Guardar reglas', 'Guardar listas'
]) assert.ok(settingsSection.includes(label), 'Falta etiqueta de configuración: ' + label);
const adminSection = src.slice(src.indexOf('function renderAdmin(){'), src.indexOf('/* 💬 Customer feedback',src.indexOf('function renderAdmin(){')));
for (const label of ['📊 Resumen', '🏷️ Catálogo de precios', '👥 Clientes', '⚙ Configuración'])
  assert.ok(adminSection.includes(label), 'Falta traducción de administración: '+label);
const storeEditor = src.slice(src.indexOf('function editStore('),src.indexOf('/* ============================ MODAL / UTIL',src.indexOf('function editStore(')));
for (const label of ['Editar sucursal', 'Agregar sucursal','Nombre</label>','Impuesto (%)</label>','Cancelar</button>'])
  assert.ok(storeEditor.includes(label), 'Falta traducción de sucursal: '+label);
console.log('OK: adaptación MX básica y rutas kg/caja presentes. Faltan pruebas operativas de navegador y cobros.');
