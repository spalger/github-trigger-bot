import angular from 'angular'
import SocketIO from 'socket.io-client'

angular.module('GithubEvents', [])
  .component('githubEvents', {
    template: `
      <h1>h1</h2>
      <ul>
        <li ng-repeat="event in stream.events track by $index">
          <pre>{{ event | json }}</pre>
        </li>
      </ul>
    `,
    controllerAs: 'stream',
    controller($scope) {
      this.events = []
      this.io = new SocketIO('/github-events')

      this.io.on('created', event => {
        $scope.$apply(() => {
          this.events.unshift(event)
          if (this.events.length > 10) this.events.length = 10
        })
      })
    },
  })
