module.exports = function (swaggerjsdoc, fs, schemas, deref, dagon) {
  return function () {
    var options = {
      swaggerDefinition: {
        swagger: '2.0',
        info: {
          version: '0.0.1',
          title: 'MethodFitness'
        },
        schemes: [
          'http'
        ],
        consumes: [
          'application/json'
        ],
        produces: [
          'application/json'
        ]
      },
      apis: ['./app/src/routes/routes.js']
    };

    var swaggerSpec = swaggerjsdoc(options);
    var schemaDefs = Object.assign({},
      schemas.domainSchemas.definitions,
      schemas.responseSchemas.definitions,
      schemas.requestSchemas.definitions);
    swaggerSpec.definitions = deref()({definitions:schemaDefs}, true).definitions;
    if (!fs.existsSync('./app/src/swagger/')) {
      fs.mkdirSync('./app/src/swagger/');
    }
    var swaggerDocument = JSON.stringify(swaggerSpec, null, 4);
    fs.writeFileSync('./app/src/swagger/swagger_spec.json', swaggerDocument, {mode: 0o0777});
    return swaggerDocument;
  };
};