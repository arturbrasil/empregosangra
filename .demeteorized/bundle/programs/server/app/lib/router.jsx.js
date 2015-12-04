(function(){FlowRouter.route('/', {
  name: 'home',
  action: function (params) {
    renderMainLayoutWith(React.createElement(JobsList, null));
    setTitle('Jobs');
  }
});

FlowRouter.route('/jobs/add', {
  name: 'addJob',
  action: function (params) {
    renderMainLayoutWith(React.createElement(AddJob, null));
    setTitle('Add job');
  }
});

FlowRouter.route('/job/:slug/:_id', {
  name: 'showJob',
  action: function (params) {
    renderMainLayoutWith(React.createElement(ShowJob, null));
    var jobTitle = 'Job';
    Tracker.autorun(function () {
      if (Jobs.findOne()) {
        jobTitle = Jobs.findOne().title;
      }
      setTitle(jobTitle);
    });
  }
});

FlowRouter.route('/jobs/:identifier/activate', {
  name: 'activateJob',
  action: function (params) {
    renderMainLayoutWith(React.createElement(ActivateJob, null));
    setTitle('Activating job');
  }
});

FlowRouter.route('/jobs/:identifier/remove', {
  name: 'removeJob',
  action: function (params) {
    renderMainLayoutWith(React.createElement(RemoveJob, null));
    setTitle('Removing job');
  }
});

FlowRouter.route('/jobs/:identifier/update', {
  name: 'updateJob',
  action: function (params) {
    renderMainLayoutWith(React.createElement(UpdateJob, null));
    setTitle('Update job');
  }
});

var renderMainLayoutWith = function (component) {
  ReactLayout.render(MainLayout, {
    component: component
  });
};

})();

//# sourceMappingURL=router.jsx.js.map
