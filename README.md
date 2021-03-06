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
There are two function signatures expected by uchain.  Every 'task' in the chain takes in a next function, and then any number of arguments.

    function (next, ...args) {...}

Every 'next' function is a callback, that takes in an error parameter, and then any number of results;  These results are passed to the next link in the chain.

    function (err, ...results) {...}

The utilities provided in the library generate next functions to bind your tasks together asynchronously.

## API

## Objects

<dl>
<dt><a href="#uchain">uchain</a> : <code>object</code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#nextFunction">nextFunction</a> : <code>function</code></dt>
<dd><p>An async callback function.</p>
</dd>
<dt><a href="#taskFunction">taskFunction</a> : <code>function</code></dt>
<dd><p>An async task function.</p>
</dd>
<dt><a href="#stringBuilder">stringBuilder</a> ⇒ <code>string</code></dt>
<dd><p>A string building function.</p>
</dd>
</dl>

<a name="uchain"></a>

## uchain : <code>object</code>
**Kind**: global namespace  

* [uchain](#uchain) : <code>object</code>
    * [.FromPromise](#uchain.FromPromise) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.ToPromise](#uchain.ToPromise) ⇒ <code>function</code>
    * [.Assert(validator, message)](#uchain.Assert) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.CatchError(task)](#uchain.CatchError) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.If(conditionTask, thenTask, elseTask)](#uchain.If) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.InOrder(...tasks)](#uchain.InOrder) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.InParallel(...tasks)](#uchain.InParallel) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.InSeries(...tasks)](#uchain.InSeries) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.Logging(...statements)](#uchain.Logging) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.ParallelFilter(filter)](#uchain.ParallelFilter) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.ParallelForEach(task)](#uchain.ParallelForEach) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.ParallelMap(task)](#uchain.ParallelMap) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.ParallelObjectFilter(task)](#uchain.ParallelObjectFilter) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.ParallelObjectMap(task)](#uchain.ParallelObjectMap) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.PassThrough()](#uchain.PassThrough)
    * [.PromiseWrapper(generator)](#uchain.PromiseWrapper) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.Promisify(task)](#uchain.Promisify) ⇒ <code>function</code>
    * [.Race(...tasks)](#uchain.Race) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.Retry(task, options)](#uchain.Retry) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.Throttle(task, limit)](#uchain.Throttle) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.TimeIn(task, ms)](#uchain.TimeIn) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.TimeOut(task, ms)](#uchain.TimeOut) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.Timer(task, label)](#uchain.Timer) ⇒ <code>[taskFunction](#taskFunction)</code>
    * [.While(conditionTask, loopTask)](#uchain.While) ⇒ <code>[taskFunction](#taskFunction)</code>


* * *

<a name="uchain.FromPromise"></a>

### uchain.FromPromise ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = InSeries(
    function(next, ...args) {...},
    FromPromise(
      (...args) => new Promise((resolve, reject) => resolve(...args))
    ),
    function(next, ...args) {},
    ...
  );

  chain(next, ...args);
```
Alias for PromiseWrapper
Wraps around a promise generator function,
to make it easier to integrate with task functions.

**Kind**: static constant of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task that wraps around the promise  

| Param | Type | Description |
| --- | --- | --- |
| generator | <code>function</code> | a function that generates a promise from the args. |


* * *

<a name="uchain.ToPromise"></a>

### uchain.ToPromise ⇒ <code>function</code>
```javascript

  let chain = InSeries(
    function(next, ...args) {...},
    function(next, ...args) {...},
    ...
  );

 new Promise()
   .then(
     ToPromise(chain)
   );

```

Alias for Promisify

Wraps around a task function and greates a promise generator,
to make it easier to integrate task functions and promises.

NOTE: uchain does not come bundled with a promise library,
it expects Promise to already exists in the global namespace.

NOTE: because uchain can 'return' multiple values through the next callback,
Promisify always resolves to an array of the results returned.

**Kind**: static constant of <code>[uchain](#uchain)</code>  
**Returns**: <code>function</code> - a function that generates a Promise when called  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>function</code> | a function that generates a promise from the args. |


* * *

<a name="uchain.Assert"></a>

### uchain.Assert(validator, message) ⇒ <code>[taskFunction](#taskFunction)</code>
Builds an async assertion task.  When called, if the arguments do not match the validator functions,
Assert passes an error to its callback.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - an assertion task  

| Param | Type | Description |
| --- | --- | --- |
| validator | <code>function</code> | a function that checks the arguments. |
| message | <code>string</code> | an optional error message to throw if the assertion fails, or a message builder function. |


* * *

<a name="uchain.CatchError"></a>

### uchain.CatchError(task) ⇒ <code>[taskFunction](#taskFunction)</code>
Errors bypass the normal flow of execution.  They're always returned to the last link in the chain, even if they occur inside nested InSeries or InParallel chains.

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

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a wrapper function around the task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | a function that checks the arguments. |


* * *

<a name="uchain.If"></a>

### uchain.If(conditionTask, thenTask, elseTask) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let task = If(
    function(next, ...args) {},
    function(next, ...args) {},
    function(next, ...args) {}
  );

  chain(next, ...args);
```
If accepts up to three tasks and returns a task that conditionally executes some.

```javascript
  let logIfEven = If(
    (next, num) => next(null, num % 2 === 0)
    (next, num) => { console.log('is even!'); next(null, num); },
    (next, num) => { console.log('is not even!'); next(null, num); },
  );

  let onDone = (err, ...results) => console.log(results);

  logIfEven(null, 1); // prints out 'is not even!' eventually
  logIfEven(null, 2); // prints out 'is even!' eventually
```
note: by default, the conditionTask, thenTask, and elseTask are all set to PassThrough
note: the conditionTask can return multiple results, but only the first is checked for truthiness

**Kind**: static method of <code>[uchain](#uchain)</code>  

| Param | Type | Description |
| --- | --- | --- |
| conditionTask | <code>[taskFunction](#taskFunction)</code> | a condition task. |
| thenTask | <code>[taskFunction](#taskFunction)</code> | a task to run if the condition returns a truthy value. |
| elseTask | <code>[taskFunction](#taskFunction)</code> | a task to run if the condition returns a falsy value. |


* * *

<a name="uchain.InOrder"></a>

### uchain.InOrder(...tasks) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = InOrder(
    function(next, ...args) {},
    function(next, ...args) {},
    ...
  );

  chain(next, ...args);
```
Runs several asynchronous tasks one after another.
Each task gets the arguments that were originally passed into the wrapper.
This is different from InSeries, where the output of each is task is passed as the input to the next.
```javascript
  let chain = InOrder(
    (next, a) => { a.val = 1; console.log(a.val); next();}
    (next) => { a.val = 2; console.log(a.val); next();}
    (next) => { a.val = 3; console.log(a.val); next();}
  )(null, {}); // prints out 1 2 3, eventually
```

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a wrapper function that runs the tasks in order  

| Param | Type | Description |
| --- | --- | --- |
| ...tasks | <code>[taskFunction](#taskFunction)</code> | any number of tasks to run in order. |


* * *

<a name="uchain.InParallel"></a>

### uchain.InParallel(...tasks) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = InParallel(
    function(next, ...args) {},
    function(next, ...args) {},
    ...
  );

  chain(next, ...args);
```
InParallel accepts a number of functions, and returns a task function that executes all of its child tasks in parallel.

```javascript
  let chain = InParallel(
    (next) => next(null, 1),
    (next) => next(null, 2),
    (next) => next(null, 3, 4),
  );

  let onDone = (err, ...results) => console.log(results);

  chain(onDone); // prints out [ 1 ] [ 2 ] [ 3, 4 ], eventually
```
note: because the callbacks can return any number of results,
the results from each task are autoboxed into an array.
This includes an empty array for tasks that don't return results.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a wrapper function that runs the tasks in parallel  

| Param | Type | Description |
| --- | --- | --- |
| ...tasks | <code>[taskFunction](#taskFunction)</code> | any number of tasks to run in parallel. |


* * *

<a name="uchain.InSeries"></a>

### uchain.InSeries(...tasks) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = InSeries(
    function(next, ...args) {},
    function(next, ...args) {},
    ...
  );

  chain(next, ...args);
```
Runs several tasks in series, and passes the results from one down to the next.
This works similarly to the 'waterfall' method in caolan's async.
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

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a wrapper function that runs the tasks in series  

| Param | Type | Description |
| --- | --- | --- |
| ...tasks | <code>[taskFunction](#taskFunction)</code> | any number of tasks to run in series. |


* * *

<a name="uchain.Logging"></a>

### uchain.Logging(...statements) ⇒ <code>[taskFunction](#taskFunction)</code>
A logging utility.
It passes the arguments received into all the statements, collects the results, and joins them together with newlines to build the final log statement

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a logging task  

| Param | Type | Description |
| --- | --- | --- |
| ...statements | <code>string</code> \| <code>[stringBuilder](#stringBuilder)</code> | any number of strings, or string builder functions |


* * *

<a name="uchain.ParallelFilter"></a>

### uchain.ParallelFilter(filter) ⇒ <code>[taskFunction](#taskFunction)</code>
Builds a task that filters all of its arguments in parallel, and returns the results

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a filtering task  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>[taskFunction](#taskFunction)</code> | an asynchronous filter function that returns true or false through its callback. |


* * *

<a name="uchain.ParallelForEach"></a>

### uchain.ParallelForEach(task) ⇒ <code>[taskFunction](#taskFunction)</code>
Builds a task wrapper that calls a task once on each of its arguments in parallel

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a parallel foreach task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | an asynchronous function that gets called once on each argument. |


* * *

<a name="uchain.ParallelMap"></a>

### uchain.ParallelMap(task) ⇒ <code>[taskFunction](#taskFunction)</code>
Builds a task wrapper that asynchronously maps each of its arguments to a result.
Note: even though the mapping function can return any number of results, ParallelMap only uses the first result

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a parallel map task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | an asynchronous mapping function. |


* * *

<a name="uchain.ParallelObjectFilter"></a>

### uchain.ParallelObjectFilter(task) ⇒ <code>[taskFunction](#taskFunction)</code>
Similar to ParallelFilter, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a parallel filter task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | an asynchronous filter function. |


* * *

<a name="uchain.ParallelObjectMap"></a>

### uchain.ParallelObjectMap(task) ⇒ <code>[taskFunction](#taskFunction)</code>
Similar to ParallelMap, but instead of running on an array of arguments, it runs a filter on every key-value pair in an object.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a parallel map task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | an asynchronous map function. |


* * *

<a name="uchain.PassThrough"></a>

### uchain.PassThrough()
Sometimes, you need to pass previous arguments along with a new result.  The easiest way to do this is to use PassThrough, which is a convenience method for:
```javascript
 (next, ...args) => next(null, ...args),
```

**Kind**: static method of <code>[uchain](#uchain)</code>  

* * *

<a name="uchain.PromiseWrapper"></a>

### uchain.PromiseWrapper(generator) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = InSeries(
    function(next, ...args) {...},
    PromiseWrapper(
      (...args) => new Promise((resolve, reject) => resolve(...args))
    ),
    function(next, ...args) {},
    ...
  );

  chain(next, ...args);
```
Wraps around a promise generator function,
to make it easier to integrate with task functions.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task that wraps around the promise  

| Param | Type | Description |
| --- | --- | --- |
| generator | <code>function</code> | a function that generates a promise from the args. |


* * *

<a name="uchain.Promisify"></a>

### uchain.Promisify(task) ⇒ <code>function</code>
```javascript

  let chain = InSeries(
    function(next, ...args) {...},
    function(next, ...args) {...},
    ...
  );

 new Promise()
   .then(
     Promisify(chain)
   );

```

Wraps around a task function and greates a promise generator,
to make it easier to integrate task functions and promises.

NOTE: uchain does not come bundled with a promise library,
it expects Promise to already exists in the global namespace.

NOTE: because uchain can 'return' multiple values through the next callback,
Promisify always resolves to an array of the results returned.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>function</code> - a function that generates a Promise when called  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>function</code> | a function that generates a promise from the args. |


* * *

<a name="uchain.Race"></a>

### uchain.Race(...tasks) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = Race(
    function(next, ...args) {},
    function(next, ...args) {},
    ...
  );

  chain(next, ...args);
```

Race accepts a number of functions, and returns a task function that executes all of its child tasks simultaneously.  The first result (or error) is returned, and the remaining results (or errors) are ignored.

```javascript
  let chain = Race(
    (next) => next(null, 1),
    (next) => setTimeout(next, 100, null, 2),
    (next) => { throw new Error(); } ,
  );

  let onDone = (err, ...results) => console.log(results);

  chain(onDone); // prints out [ 1 ], eventually
```

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task  

| Param | Type | Description |
| --- | --- | --- |
| ...tasks | <code>[taskFunction](#taskFunction)</code> | any number of tasks to run in parallel. |


* * *

<a name="uchain.Retry"></a>

### uchain.Retry(task, options) ⇒ <code>[taskFunction](#taskFunction)</code>
Wraps a task and attempts to retry if it throws an error, with an exponential backoff.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | the task to wrap. |
| options | <code>object</code> | an optional set of retry options. |
| options.timeout | <code>object</code> | maximum time to attempt retries. |
| options.retries | <code>object</code> | maximum number of retries to attempt. |


* * *

<a name="uchain.Throttle"></a>

### uchain.Throttle(task, limit) ⇒ <code>[taskFunction](#taskFunction)</code>
Wraps a task and ensures that only X number of instances of the task can be run in parallel.
Requests are queued up in an unbounded FIFO queue until they can be run.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | the task to throttle |
| limit | <code>number</code> | the number of instances that can run in parallel. default 1. |


* * *

<a name="uchain.TimeIn"></a>

### uchain.TimeIn(task, ms) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = TimeIn(
    function(next, ...args) {},
			1000
  );

  chain(next, ...args);
```

TimeIn wraps a single task function, and returns a function that only returns after X ms.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | the task to wrap in a timeout. |
| ms | <code>number</code> | the timein in ms. |


* * *

<a name="uchain.TimeOut"></a>

### uchain.TimeOut(task, ms) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let chain = TimeOut(
    function(next, ...args) {},
			1000
  );

  chain(next, ...args);
```

TimeOut wraps a single task function, and returns a function that returns early if the task fails to complete before the timeout triggers.

NOTE: no error is thrown on a timeout, the result is merely undefined.

NOTE: the timeout being triggered will not cancel the original task.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | the task to wrap in a timeout. |
| ms | <code>number</code> | the timeout in ms. |


* * *

<a name="uchain.Timer"></a>

### uchain.Timer(task, label) ⇒ <code>[taskFunction](#taskFunction)</code>
Wraps a task and logs how long it takes to finish, or fail.

**Kind**: static method of <code>[uchain](#uchain)</code>  
**Returns**: <code>[taskFunction](#taskFunction)</code> - a task  

| Param | Type | Description |
| --- | --- | --- |
| task | <code>[taskFunction](#taskFunction)</code> | the task to wrap. |
| label | <code>string</code> | an optional label to log. |


* * *

<a name="uchain.While"></a>

### uchain.While(conditionTask, loopTask) ⇒ <code>[taskFunction](#taskFunction)</code>
```javascript
  let task = While(
    function(next, ...args) {},
    function(next, ...args) {},
  );

  chain(next, ...args);
```
While accepts two tasks and returns a task that conditionally executes some.

```javascript
  let incUntil10 = While(
    (next, num) => next(null, num < 10),
    (next, num) => { console.log('num', nul); next(null, num + 1); },
  );

  let onDone = (err, ...results) => console.log(results);

  incUntil10(null, 1); // prints 1, 2, ... 9
```
note: the results of the loop task are saved to pass into the conditionTask, and the loopTask
note: when the condition task returns false, those results are passed down the chain

**Kind**: static method of <code>[uchain](#uchain)</code>  

| Param | Type | Description |
| --- | --- | --- |
| conditionTask | <code>[taskFunction](#taskFunction)</code> | a condition task. |
| loopTask | <code>[taskFunction](#taskFunction)</code> | a task to run if the condition returns a truthy value. |


* * *

<a name="nextFunction"></a>

## nextFunction : <code>function</code>
An async callback function.

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| err | <code>error</code> | 
| ...results | <code>\*</code> | 


* * *

<a name="taskFunction"></a>

## taskFunction : <code>function</code>
An async task function.

**Kind**: global typedef  

| Param | Type |
| --- | --- |
| next | <code>[nextFunction](#nextFunction)</code> | 
| ...args | <code>\*</code> | 


* * *

<a name="stringBuilder"></a>

## stringBuilder ⇒ <code>string</code>
A string building function.

**Kind**: global typedef  
**Returns**: <code>string</code> - the string  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 


* * *

