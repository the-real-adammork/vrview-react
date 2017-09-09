"use strict";
//todo: scene description
//todo: loader
//todo: usar callback function con "refs"
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var VrviewCmp_1 = require("./vrview/VrviewCmp");
var Fabric_1 = require("office-ui-fabric-react/lib/Fabric");
var CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Nav_1 = require("office-ui-fabric-react/lib/Nav");
var DocumentCard_1 = require("office-ui-fabric-react/lib/DocumentCard");
// import {Image, IImageProps} from 'office-ui-fabric-react/lib/Image';
var URL_CODE = 'https://github.com/YagoLopez/vrview-react/blob/bde928cf3507e0376a058a0df36634fb800e3158/src/App.tsx#L40';
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Scene configuration. Contains images, hotspots and navigation between scenes
         * It is passed to <Vrview/> as props
         */
        _this.sceneConfig = {
            scene: { width: '100%', height: 400, image: '../images/coral.jpg', is_stereo: true, is_debug: true },
            hotspots: [
                { name: 'hotspot1', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                        scene: { image: '../images/landscape1.jpg', is_stereo: false },
                        hotspots: [
                            { name: 'hotspot3', pitch: 0, yaw: -35, radius: 0.05, distance: 2, newScene: {
                                    scene: { image: '../images/palmbeach.jpg', is_stereo: false }
                                } },
                            { name: 'hotspot4', pitch: 0, yaw: 0, radius: 0.05, distance: 2, newScene: {
                                    scene: { image: '../images/landscape2.jpg', is_stereo: false }
                                } }
                        ]
                    } },
                { name: 'hotspot2', pitch: 0, yaw: -35, radius: 0.05, distance: 2 }
            ]
        };
        /**
         * Change scene programatically.
         * To change scene just set state with new data. State is only mantained in <Vrview>, not in <App> component
         * Reason for this is to manage the rendering of <Vrview> with its life-cycle methods
         */
        _this.changeScene = function () {
            _this.vrviewCmp.setState({
                scene: { image: '../images/walrus.jpg', is_stereo: true },
                hotspots: [
                    { name: 'hotspot5', pitch: -20, yaw: -25, radius: 0.05, distance: 2, clickFn: function () { return alert('Function executed'); } }
                ]
            });
        };
        /**
         * To reset the scene to the initial state is needed to clear hotspot click handlers
         */
        _this.resetScene = function () {
            _this.vrviewCmp.clearHotspotsClickHandlers();
            _this.vrviewCmp.setState(_this.sceneConfig);
        };
        /**
         * Debug mode: a small window shows FPS (frames per second) in canvas
         */
        _this.toggleDebugMode = function () {
            _this.vrviewCmp.toggleDebugMode();
        };
        /**
         * This function is used to close Left Menu Panel when clicking overlay (outside panel).
         * Left Menu Panel is created and deleted dynamically.
         * To get a reference to the overlay renderPanelFooter() is used
         */
        _this.renderPanelFooter = function () {
            var overlay = document.querySelector('.ms-Overlay');
            if (overlay) {
                overlay.addEventListener('mousedown', function () {
                    _this.hideLeftPanel();
                });
            }
        };
        _this.showLeftPanel = function () {
            _this.refs.panel.open();
        };
        _this.hideLeftPanel = function () {
            _this.refs.panel.dismiss();
        };
        _this.resetSceneAndHideLeftMenu = function () {
            _this.resetScene();
            _this.hideLeftPanel();
        };
        _this.changeSceneAndHideLeftMenu = function () {
            _this.changeScene();
            _this.hideLeftPanel();
        };
        _this.toggleDebugModeAndHideLeftMenu = function () {
            _this.toggleDebugMode();
            _this.hideLeftPanel();
        };
        return _this;
    }
    App.prototype.render = function () {
        // let imageProps: IImageProps = {
        //   src: 'http://placehold.it/500x250',
        //   width: 350,
        //   height: 150
        // };
        var _this = this;
        var topMenuItems = [
            {
                key: 'menuBtn',
                icon: 'CollapseMenu',
                onClick: this.showLeftPanel,
                title: 'Left Menu'
            },
            {
                key: 'divider',
                itemType: ContextualMenu_1.ContextualMenuItemType.Divider
            },
            {
                key: 'resetScene',
                name: 'Reset Scene',
                icon: 'RevToggleKey',
                onClick: this.resetScene,
                title: 'Return to Initial Scene'
            },
            {
                key: 'toggleDebugMode',
                name: 'Toggle Debug Mode',
                icon: 'PowerBILogo',
                onClick: this.toggleDebugMode,
                title: 'Change Debug Mode State'
            },
            {
                key: 'more',
                name: 'Change Scene',
                icon: 'Org',
                items: [
                    {
                        key: 'changeScene',
                        name: 'Change Scene Programatically',
                        icon: 'DecreaseIndentLegacy',
                        onClick: this.changeScene,
                        title: 'Scene changed by code',
                    },
                    {
                        key: 'viewCode',
                        name: 'View Code',
                        icon: 'IncreaseIndentLegacy',
                        href: URL_CODE,
                        target: '_blank'
                    }
                ]
            }
        ];
        var leftMenuItems = [{
                links: [
                    { name: 'Reset Scene', url: '', key: 'resetScene', onClick: this.resetSceneAndHideLeftMenu },
                    { name: 'Toggle Debug Mode', url: '', key: 'toggleDebugMode', onClick: this.toggleDebugModeAndHideLeftMenu },
                    { name: 'Change Scene', url: '',
                        links: [{
                                name: 'Programatically',
                                key: 'changeScene',
                                url: '',
                                onClick: this.changeSceneAndHideLeftMenu
                            },
                            {
                                name: 'View Code',
                                key: 'viewCode',
                                url: URL_CODE,
                                target: '_blank'
                            }],
                        isExpanded: true
                    }
                ]
            }];
        return (React.createElement(Fabric_1.Fabric, null,
            React.createElement(CommandBar_1.CommandBar, { isSearchBoxVisible: false, items: topMenuItems, className: "command-bar" }),
            React.createElement(Panel_1.Panel, { ref: "panel", type: Panel_1.PanelType.smallFixedNear, onRenderFooter: this.renderPanelFooter, headerText: "React Component Based on Google's Vrview Library" },
                React.createElement("div", null,
                    React.createElement(Nav_1.Nav, { groups: leftMenuItems, selectedKey: 'resetScene' }))),
            React.createElement("h1", { className: "centered" }, "Virtual Reality View"),
            React.createElement(DocumentCard_1.DocumentCard, { className: "layout shadow" },
                React.createElement(VrviewCmp_1.default, __assign({}, this.sceneConfig, { ref: function (vrview) { _this.vrviewCmp = vrview; } })),
                React.createElement(DocumentCard_1.DocumentCardTitle, { title: 'Revenue stream proposal fiscal year 2016 version02.pptx' })),
            React.createElement("p", null,
                React.createElement("a", { href: "javascript:void(0)" },
                    React.createElement("img", { src: "http://placehold.it/500x250", onClick: this.changeScene })))));
    };
    return App;
}(React.Component));
exports.App = App;
