#res.js

===

Res.js is a swiss army knife for responsive sites.


Res.js is simple to include in your project. Include res.js or the minified version as a dependency. Res.js must be instantiated with an array of up to 5 breakpoints. I recommend the following: 320,480,768,1024,1440. These maximum values cover the most popular device resolutions. The last breakpoint includes every above the 5th value. Whichever breakpoints you choose, they will be named in the following order: portrait, landscape, tablet, small, medium, large. 


```

var r = new res([320,480,768,1024,1440]);


```

Res.js doesn't just define breakpoints in Javascript, it also provides easy access to OS and Browser types and detects whether a device is in Portrait or Landscape and uses Mouse or Touch input.

You can do things based on device type, input, orientation, os, and breakpoint. For example, this statement checks if the device type is Android and the device is oriented in landscape.

```

if( r.device === 'android' && r.orient === 'landscape' ){
	
	// do something here

}

```


I welcome anyone to contribute to the project to make Res.js better. Currently the breakpoints are quite rigid and should be made to accept a variety of breakpoints. The next release will allow for dynamic naming of breakpoints and include support for unlimited breakpoints. It may also be wise to refactor osCheck() to behave more like browserCheck().