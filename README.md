# Greymind Yeoman-based Generator
Greymind.com Yeoman-based generator for popular web frameworks.

## Usage
* `npm install -g generator-greymind`
* `yo greymind <AppName>`

## Sub-generators
Usage: `yo greymind:<sub-generator-name> [args]`

* `ngcontroller <ControllerName>`
  * Don't suffix with `Controller`
  * Creates a controller named `ControllerName` at `client/app/controller-name/controller-name.controller.js`
* `ngview <ViewName>`
  * Don't suffix with `View`
  * Assumes controller with same name as `ViewName`
  * Creates a view named `ViewName` at `client/app/view-name/view-name.html`
* `ngdirective <DirectiveName>`
  * Don't suffix with `Directive`
  * Creates directive named `directiveName` at `client/app/directives/directive-name.js`

## Contributors
* Balakrishnan (Balki) Ranganathan

## License
MIT
