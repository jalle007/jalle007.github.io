var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone, ViewChild } from '@angular/core';
import { Config, Menu, NavController, Platform } from 'ionic-angular';
import * as helpers from '../directives/helpers';
import { PageOne, PageTwo, PageThree } from '../pages/menus/basic/pages';
import { BasicPage } from '../pages/action-sheets/basic/pages';
var MyApp = (function () {
    function MyApp(platform, config, zone) {
        this.platform = platform;
        this.config = config;
        this.zone = zone;
        this.isProductionMode = false;
        this.isLab = false;
        this.currentPlatform = 'ios';
        this.currentPageIndex = 1;
        this.pages = [
            { title: 'Home', component: PageOne },
            { title: 'Friends', component: PageTwo },
            { title: 'Events', component: PageThree }
        ];
        this.rootPage = BasicPage;
    }
    MyApp.prototype.ngAfterContentInit = function () {
        var _this = this;
        // if viewing the preview app in lab, hide the statusbars
        this.isLab = window.parent.location.pathname === '/ionic-lab';
        if (this.isLab)
            this.config.set('statusbarPadding', false);
        // production-only code
        // production is false unless viewed on the docs
        // http://ionicframework.com/docs/v2/components/
        if (this.platform.getQueryParam('production') === 'true') {
            this.isProductionMode = true;
            // Platform is ios by default
            // only change it if android or windows
            if (this.platform.is('android')) {
                this.currentPlatform = 'android';
            }
            else if (this.platform.is('windows')) {
                this.currentPlatform = 'windows';
            }
            if (helpers.hasScrollbar() === true) {
                setTimeout(function () {
                    var body = document.getElementsByTagName('body')[0];
                    body.className = body.className + ' has-scrollbar';
                }, 500);
            }
            window.parent.postMessage(this.currentPlatform, '*');
            window.addEventListener('message', function (e) {
                _this.zone.run(function () {
                    if (e.data) {
                        var data;
                        try {
                            data = JSON.parse(e.data);
                        }
                        catch (e) {
                            console.error(e);
                        }
                        if (data.hash) {
                            _this.nextPage = helpers.getPageFor(data.hash.replace('#', ''));
                            if (data.hash !== 'menus') {
                                _this.menu.close();
                                _this.menu.enable(false);
                            }
                        }
                        else {
                            _this.currentPageIndex = 1;
                            _this.nextPage = BasicPage;
                        }
                        setTimeout(function () {
                            helpers.debounce(_this.content.setRoot(_this.nextPage), 60, false);
                        });
                    }
                });
            });
        }
    };
    MyApp.prototype.previousSection = function () {
        var previousPage = this.currentPageIndex - 1;
        if (previousPage < 0) {
            previousPage = 0;
        }
        var pageName = Object.keys(helpers.getPages())[previousPage];
        this.content.setRoot(helpers.getPageFor(pageName), {}, { animate: false });
        this.currentPageIndex = previousPage;
    };
    MyApp.prototype.nextSection = function () {
        var nextPage = this.currentPageIndex + 1;
        var pageList = Object.keys(helpers.getPages());
        if (nextPage >= pageList.length) {
            nextPage = pageList.length - 1;
        }
        var pageName = pageList[nextPage];
        this.content.setRoot(helpers.getPageFor(pageName), {}, { animate: false });
        this.currentPageIndex = nextPage;
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        helpers.debounce(this.content.setRoot(page.component), 60, false);
    };
    return MyApp;
}());
__decorate([
    ViewChild('content'),
    __metadata("design:type", NavController)
], MyApp.prototype, "content", void 0);
__decorate([
    ViewChild(Menu),
    __metadata("design:type", Menu)
], MyApp.prototype, "menu", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.template.html'
    }),
    __metadata("design:paramtypes", [Platform, Config, NgZone])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map