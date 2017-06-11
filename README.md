# uchain

A tiny library for chaining functions asynchronously.

```javascript
    let chain = InSeries(
        InParallel(
            (next, a, b) => next(null, a + b),
            (next, a, b) => next(null, a - b),
        ),
        (next, [ sum ], [ difference ]) => next(null, sum * difference),
        (next, result) => console.log('asynchronous math', result)
    );

    chain(null, 1, 2); // prints out -3, eventually
```

### Links in the chain
There are two function signatures expected by uchain.  Every 'link' in the chain takes in a next function, and then any number of arguments.

    function (next, ...args) {...}

Every 'next' function is a callback, that takes in an error parameter, and then any number of results;  These results are passed to the next link in the chain.

    function (err, ...results) {...}

The utilities provided in the library generate next functions to bind your chain links together asynchronously.

### InSeries

```javascript
    let chain = InSeries(
	    function(next, ...args) {},
	    function(next, ...args) {},
	    ...
    );

    chain(next, ...args);
```

InSeries accepts a number of functions, and returns a link function that executes all of its child links in order.

```javascript
    let chain = InSeries(
        (next) => { console.log(1); next();}
        InSeries(
            (next) => { console.log(2); next();}
            (next) => { console.log(3); next();}
        ),
        InSeries(
            (next) => { console.log(4); next();}
            (next) => { console.log(5); next();}
        )
    )(); // prints out 1 2 3 4 5, eventually
```

### InParallel

```javascript
    let chain = InParallel(
	    function(next, ...args) {},
	    function(next, ...args) {},
	    ...
    );

    chain(next, ...args);
```

InParallel accepts a number of functions, and returns a link function that executes all of its child links simultaneously.  The result arrays are concatenated into an array that is spread as arguments to the next link.

```javascript
    let chain = InParallel(
        (next) => next(null, 1),
        (next) => next(null, 2),
        (next) => next(null, 3, 4),
    );

	let onDone = (err, ...results) => console.log(results);

    chain(onDone); // prints out [ 1 ] [ 2 ] [ 3, 4 ], eventually
```

### Race

```javascript
    let chain = Race(
	    function(next, ...args) {},
	    function(next, ...args) {},
	    ...
    );

    chain(next, ...args);
```

Race accepts a number of functions, and returns a link function that executes all of its child links simultaneously.  The first result (or error) is returned, and the remaining results (or errors) are ignored.

```javascript
    let chain = Race(
        (next) => next(null, 1),
        (next) => setTimeout(next, 100, null, 2),
        (next) => { throw new Error(); } ,
    );

	let onDone = (err, ...results) => console.log(results);

    chain(onDone); // prints out [ 1 ], eventually
```


### CatchError

Error bypass the normal flow of execution.  They're always returned to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.

```javascript
    let chain = InSeries(
        (next) => { console.log(1); next(); }
        InSeries(
            (next) => { console.log(2); next(); }
            (next) => { console.log(3); next('Error'); }
        ),
        InSeries(
            (next) => { console.log(4); next();}
            (next) => { console.log(5); next();}
        )
    )(console.log); // prints out 1 2 3 Error, eventually
```

If you need to catch an error explicitly at some point, wrap a chain in CatchError, which will return the error as the first argument to the next function.

```javascript
    let chain = InSeries(
        (next) => { console.log(1); next();}
        CatchError(
            InSeries(
                (next) => { console.log(2); next();}
                (next) => { console.log(3); next('Error');}
            ),
        ),
        (next, error) => error != null ? console.log('Error Caught') : null,
        InSeries(
            (next) => { console.log(4); next();}
            (next) => { console.log(5); next();}
        )
    )(console.log); // prints out 1 2 3 Error Caught 4 5, eventually
```

### PassThrough

Sometimes, you need to pass previous arguments along with a new result.  The easiest way to do this is to use PassThrough, whchich is a convenience method for

```javascript
    (next, ...args) => next(null, ...args),
```

### Logging

Logging is useful for debugging.  It prints all of the arguments passed in to console.log, with a tag, and then passes them through.


### Assert

Assert is useful for debugging.  It takes in a validator function, which is then passed any arguments to check.  If validator returns false, an error is thrown.
