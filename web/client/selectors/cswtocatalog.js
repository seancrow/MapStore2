/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const assign = require('object-assign');
const {head} = require('lodash');
const urlUtil = require('url');

/**
 * Parses a csw object and returns an object with a common form.
 * records:
 *
 */
const cswToCatalogSelector = (catalog) => {
    let result = catalog.result;
    let searchOptions = catalog.searchOptions;
    if (result && result.records) {
        return result.records.map((record) => {
            let dc = record.dc;
            let thumbURL;
            let wms;
            // look in URI objects for wms and thumbnail
            if (dc && dc.URI) {
                let thumb = head([].filter.call(dc.URI, (uri) => {return uri.name === "thumbnail"; }) );
                thumbURL = thumb ? thumb.value : null;
                wms = head([].filter.call(dc.URI, (uri) => { return uri.protocol === "OGC:WMS-1.1.1-http-get-map"; }));
            }
            // look in references objects
            if (!wms && dc.references) {
                let refs = Array.isArray(dc.references) ? dc.references : [dc.references];
                wms = head([].filter.call( refs, (ref) => { return ref.scheme === "OGC:WMS-1.1.1-http-get-map" || ref.scheme === "OGC:WMS"; }));
                let urlObj = urlUtil.parse(wms.value, true);
                let layerName = urlObj.query && urlObj.query.layers;
                wms = assign({}, wms, {name: layerName} );
            }
            if (!thumbURL && dc.references) {
                let refs = Array.isArray(dc.references) ? dc.references : [dc.references];
                let thumb = head([].filter.call( refs, (ref) => { return ref.scheme === "WWW:LINK-1.0-http--image-thumbnail" || ref.scheme === "thumbnail"; }));
                if (thumb) {
                    thumbURL = thumb.value;
                }
            }
            let references = [];
            /*
            References have this form:
                {
                    type: "OGC:WMS",
                    url: "http:....",
                    params: {
                        name: "topp:states" // type specific
                    }
                }
            */
            if (wms) {
                let absolute = (wms.value.indexOf("http") === 0);
                if (!absolute) {
                    assign({}, wms, {value: searchOptions.catalogURL + "/" + wms.value} );
                }
                let wmsReference = {
                    type: wms.protocol || wms.scheme,
                    url: wms.value,
                    params: {
                        name: wms.name
                    }
                };
                references.push(wmsReference);
            }
            if (thumbURL) {
                let absolute = (thumbURL.indexOf("http") === 0);
                if (!absolute) {
                    thumbURL = searchOptions.catalogURL + "/" + thumbURL;
                }
            }
            // create the references array (now only wms is supported)

            // setup the final record object
            return {
                title: dc.title,
                description: dc.abstract,
                identifier: dc.identifier,
                thumbnail: thumbURL,
                tags: dc.subject,
                boundingBox: record.boundingBox,
                references: references
            };
        });
    }
};
module.exports = {cswToCatalogSelector};
