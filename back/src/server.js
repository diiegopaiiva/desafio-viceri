const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');  // Corrigido para importar o js-yaml
const fs = require('fs');
const path = require('path');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
