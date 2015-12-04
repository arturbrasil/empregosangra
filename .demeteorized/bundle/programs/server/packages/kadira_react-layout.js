(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var ReactLayout;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/kadira:react-layout/lib/react_layout.js                  //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
ReactLayout = {};                                                    // 1
ReactLayout._currentLayoutClass;                                     // 2
ReactLayout._currentLayoutComp;                                      // 3
                                                                     // 4
ReactLayout._getRootNode = function() {                              // 5
  var rootNode = $('#react-root').get(0);                            // 6
                                                                     // 7
  if(rootNode) {                                                     // 8
    return rootNode;                                                 // 9
  } else {                                                           // 10
    $('body').append('<div id="react-root"></div>');                 // 11
    return $('#react-root').get(0);                                  // 12
  }                                                                  // 13
};                                                                   // 14
                                                                     // 15
ReactLayout.render = function(layoutClass, regions) {                // 16
  if(Meteor.isClient) {                                              // 17
    return ReactLayout._renderClient(layoutClass, regions);          // 18
  } else {                                                           // 19
    return ReactLayout._renderServer(layoutClass, regions);          // 20
  }                                                                  // 21
};                                                                   // 22
                                                                     // 23
ReactLayout._renderServer = function(layoutClass, regions) {         // 24
  var el = React.createElement(layoutClass, regions);                // 25
  var html = React.renderToString(el);                               // 26
                                                                     // 27
  if(Package['kadira:flow-router-ssr']) {                            // 28
    var FlowRouter = Package['kadira:flow-router-ssr'].FlowRouter;   // 29
    var ssrContext = FlowRouter.ssrContext.get();                    // 30
    ssrContext.setHtml(html);                                        // 31
  }                                                                  // 32
};                                                                   // 33
                                                                     // 34
ReactLayout._renderClient = function(layoutClass, regions) {         // 35
  var self = this;                                                   // 36
  self._ready(function() {                                           // 37
    var rootNode = self._getRootNode();                              // 38
    if(self._currentLayoutClass !== layoutClass) {                   // 39
      self._currentLayoutClass = layoutClass;                        // 40
      var el = React.createElement(layoutClass, regions);            // 41
      var renderdComp = React.render(el, rootNode);                  // 42
      self._currentLayoutComp = renderdComp;                         // 43
    } else {                                                         // 44
      self._currentLayoutComp.setProps(regions);                     // 45
    }                                                                // 46
  });                                                                // 47
};                                                                   // 48
                                                                     // 49
ReactLayout._ready = function(cb) {                                  // 50
  // may be we need to come up with a better way to do this          // 51
  $(cb);                                                             // 52
};                                                                   // 53
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['kadira:react-layout'] = {
  ReactLayout: ReactLayout
};

})();

//# sourceMappingURL=kadira_react-layout.js.map
