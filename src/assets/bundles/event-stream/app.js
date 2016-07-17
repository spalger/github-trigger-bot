import angular from 'angular'
angular.module('EventStream', [])
  .component('eventStream', {
    template: `
      <h1>h1</h2>
      <p>This is a paragraph {{es.name}}</p>
    `,
    controllerAs: 'es',
    controller() {
      this.name = 'Event Stream'
    },
  })
