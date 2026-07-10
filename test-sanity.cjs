require('dotenv').config({path: '.env.local'});
const { createClient } = require('@sanity/client');
const client = createClient({ 
  projectId: 'tedbep95', 
  dataset: 'production', 
  apiVersion: '2024-01-01', 
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN
});
client.fetch('*[]{"id": _id, "type": _type}').then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
