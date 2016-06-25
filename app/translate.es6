/*
function getQueries(doc) {
}
function uploadDocument(taoId, docId, language, document) {
}
function makeDocument(response, taoId, docId, language) {
  let metadata = {
        title: response.data.translations[0],
        description: response.data.translations[1]
      },
      sections = {},
      document;
  angular.forEach(response.data.translations, (translation, key) => {
    let sectionId = key/3,
        textType = key%3;
    switch(textType) {
      case 0:
        sections[sectionId].title = translation;
        break;
      case 1:
        sections[sectionId].description = translation;
        break;
      case 2:
        sections[sectionId].imageCaption = translation;
        break;
      default:
        break;
    }
  });
  document = {
    sections: sections,
    metadata: metadata
  };
  return uploadDocument(taoId, docId, language, document);
}
function translate(taoId, docId, target, source) {
  getDocument(docId)
    .then((doc) => {
      callApi(doc, target, source)
        .then((response) => {
          makeDocument(response, taoId, docId, target)
            .then(() => {
              // Success
            })
            .catch(() => {
              // Failure
            });
        })
        .catch(() => {
          // Failure
        });
    })
    .catch(() => {
      // Failure
    });
}
function callApi(doc, target, source) {
  let apiKey = 'myApiKey',
      queries = getQueries(doc),
      httpQuery = `https://www.googleapis.com/language/translate/v2?key=${apiKey}&source=${source}&target=${target}&${queries}`;
  return http(httpQuery);
}
*/
