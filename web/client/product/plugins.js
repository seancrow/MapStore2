/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    plugins: {
        MousePositionPlugin: require('../plugins/MousePosition'),
        PrintPlugin: require('../plugins/Print'),
        IdentifyPlugin: require('../plugins/Identify'),
        TOCPlugin: require('../plugins/TOC'),
        BackgroundSwitcherPlugin: require('../plugins/BackgroundSwitcher'),
        MeasurePlugin: require('../plugins/Measure'),
        MapPlugin: require('../plugins/Map'),
        ToolbarPlugin: require('../plugins/Toolbar'),
        DrawerMenuPlugin: require('../plugins/DrawerMenu'),
        ShapeFilePlugin: require('../plugins/ShapeFile'),
        SnapshotPlugin: require('../plugins/Snapshot'),
        SettingsPlugin: require('../plugins/Settings'),
        SearchPlugin: require('../plugins/Search'),
        ScaleBoxPlugin: require('../plugins/ScaleBox'),
        LocatePlugin: require('../plugins/Locate'),
        ZoomAllPlugin: require('../plugins/ZoomAll'),
        MapLoadingPlugin: require('../plugins/MapLoading'),
        AboutPlugin: require('./plugins/About'),
        HelpPlugin: require('../plugins/Help'),
        HomePlugin: require('../plugins/Home'),
        MadeWithLovePlugin: require('./plugins/MadeWithLove'),
        MetadataExplorerPlugin: require('../plugins/MetadataExplorer')
    },
    requires: {
        ReactSwipe: require('react-swipe'),
        SwipeHeader: require('../components/data/identify/SwipeHeader')
    }
};
