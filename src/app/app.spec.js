'use strict';

describe('angularScopesBug', function () {

  var $rootScope, element, welcomeCtrlScope;

  beforeEach(module('angularScopesBug'));

  beforeEach(inject(function (_$rootScope_, $compile) {

    $rootScope = _$rootScope_;

    var linkFn, el;

    var scope = $rootScope.$new();

    el = angular.element('\
      <div ng-controller="WelcomeController">\
        <h1>Hello, {{ getName() }}</h1>\
        <div ng-controller="EditingController" id="name-editor-wrapper">\
          <button ng-click="changeName()" ng-show="!editMode">Change your name</button>\
          <div ng-show="editMode">\
            <name-editor ng-show="editMode"></name-editor>\
            <button ng-click="closeEditor()" ng-show="editMode">Close name editor</button>\
          </div>\
        </div>\
      </div>\
    ');

    // The $compile method returns the directive's link function
    linkFn = $compile(el);

    // The link function returns the resulting DOM object
    element = linkFn(scope);

    element.scope().$apply();

    welcomeCtrlScope = element.scope();

  }));

  function changeInputValue($sniffer, value) {
    var inputElement = element.find("input");
    inputElement.val(value);
    inputElement.trigger($sniffer.hasEvent('input') ? 'input' : 'change');
    $rootScope.$digest();
  }

  it('getName should return John after change', inject(function ($sniffer) {
    changeInputValue($sniffer, 'John');
    expect(welcomeCtrlScope.getName()).toEqual('John');
  }));

  it('header should be changed after the name change', inject(function ($sniffer) {
    changeInputValue($sniffer, 'John');
    var h1Element = element.find('h1');
    expect(h1Element.text()).toEqual('Hello, John');
  }));

  it('directive should have the same scope as controller and change should be reflected', inject(function ($sniffer) {
    var nameEditorControllerScope = element.find('#name-editor-wrapper').scope();
    var nameEditorDirectiveScope = element.find('name-editor').scope();
    expect(nameEditorDirectiveScope.$id).toEqual(nameEditorControllerScope.$id);
    changeInputValue($sniffer, 'John');
    expect(nameEditorDirectiveScope.getName()).toEqual('John');
  }));
});
