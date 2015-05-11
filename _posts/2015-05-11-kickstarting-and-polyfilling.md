# Polyfilling and Kickstarting?

Pull out that kickstart or polyfill code. I want to be in control.

- don’t put that `domcontentloaded` listener in your datepicker or autocomplete, it’s not it’s responsibility to boot itself.

- pull out and serve separately.

polyfills input type datepicker
`datepicker.polyfill.js`

autoloads datepicker for .datepicker classes
`datepicker.kickstart.js`

clean module waits for initialisation by developer
`datepicker.js`