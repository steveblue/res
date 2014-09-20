#res.js


Res.js is a swiss army knife for responsive sites.


Minified, Res.js comes in at 4kb making it the perfect compliment to your next project. Res.js is not dependant on jQuery or Zepto and is written in vanilla Javascript.


Res.js is simple to include in your project. Include res.js or the minified version as a dependency. Res.js takes one argument, a JSON array of breakpoints. This makes it easy to include in an JSON formatted model. 

Each state has a required name ("state") and breakpoint ("breakpoint").  If you wish to position elements via a Javascript based grid, you can also provide optional number of columns ("cols"), outer margin ("margin") and gutter ("gutter"). An example of setting multiple breakpoints and supplying the units needed to create a grid for each breakpoint is below. 

```

var r = new res([{
                     "state": "portrait",
                     "breakpoint": 420,
                     "cols": 4,
                     "margin": 10,
                     "gutter": 10
                 },
                 {
                     "state": "landscape",
                     "breakpoint": 640,
                     "cols": 4,
                     "margin": 10,
                     "gutter": 10
                 },
                 {
                     "state": "tablet",
                     "breakpoint": 768,
                     "cols": 12,
                     "margin": 40,
                     "gutter": 10
                 },
                 {
                     "state": "small",
                     "breakpoint": 1024,
                     "cols": 12,
                     "margin": 40,
                     "gutter": 10
                 },
                 {
                     "state": "medium",
                     "breakpoint": 1440,
                     "cols": 16,
                     "margin": 80,
                     "gutter": 20
                 },
                 {
                     "state": "large",
                     "breakpoint": 1920,
                     "cols": 16,
                     "margin": 80,
                     "gutter": 20
                 },
                 {
                     "state": "retina",
                     "breakpoint": 3840,
                     "cols": 16,
                     "margin": 160,
                     "gutter": 40
                 }]);


```

Res.js doesn't just define breakpoints in Javascript, it also provides easy access to OS and Browser type, detects whether a device is in Portrait or Landscape and uses Mouse or Touch input.

Once instantiated as an object, you can do things based on device type, input, orientation, os, and breakpoint. For example, this statement checks if the device type is Android and the device is oriented in landscape.

```

if( r.os === 'android' && r.device === 'tablet' && r.orient === 'landscape' ){
	
	// do something here for android tablets in landscape mode

}

```

Sometimes you need to specify the width of an element after filling it dynamically with content. With frameworks like famo.us coming out that primarily position and size elements with Javascript, this grid can come in handy.

```

// in a 12 column layout, give the element a width of 4 columns and position the element on the right side of the page, on column 8.

this.width = r.grid.colSpan[4];
this.x = r.grid.col[8];


```


In your app, you can listen for the "stateChange" event on the window and resposition and resize elements based on stateChange. This way you can make your apps more performant by not repeating `window.onresize` events. The stateChange fires after the window has resized and during initialization.

```

window.addEventListener('stateChange',function(ev){



});


```

Fork the repo and fire up index.html on your local development server. Type "r" in the console to get the current res.js implementation on the page. More examples coming soon.


Sumbit issues in the issue tracker, fork the repo and make a pull request to add a feature.
