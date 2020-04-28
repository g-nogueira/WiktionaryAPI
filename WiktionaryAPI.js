"use strict";

const http = require("./HttpWrapper");
/**
 * @summary An API for searching terms, images, and articles on Wikipedia.
 */
module.exports = new (class WiktionaryAPI {
	constructor() {
		this.getDefinitions = this.searchTerm;
		this.baseUrl = "https://{{language}}.wiktionary.org/api/rest_v1";
		this.request = {
			path: {
				page: {
					definition: "page/definition"
				}
			},
			language: {
				english: "en",
				portuguese: "pt",
				russian: "ru"
			}
		};

	}

	/**
	 * @summary Searchs a single page on Wikipedia containing given term.
	 * @param {string} title A full or partial title to be searched for.
	 * @param {string} [language] The language code for the resultset.
	 * @returns {Promise<Object>} Returns a promise that resolves to an object.
	 */
	searchTitle(title, language) {

		return new Promise((resolve, reject) => {

			var request = this.request;
			var url = this._buildUrl({
				language: language || request.language.english,
				title: title,
				path: request.path.page.definition,
			});

			http.get(url).then(resolve).catch(reject);

		});
	}


	/**
	 *
	 *
	 * @param {object} params
	 * @param {String} params.language
	 * @param {String} params.title
	 * @param {String} params.path
	 */
	_buildUrl(params) {
		var url = `${this.baseUrl.replace("{{language}}", params.language)}/${params.path}/${params.title}`;
		return encodeURI(url);
	}
});