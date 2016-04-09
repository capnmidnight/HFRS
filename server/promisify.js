function callbackHander(resolve, reject, error, response) {
  if (error) {
    reject(error);
  }
  else {
    resolve(response);
  }
}

function promiseHandler(ctx, name, thunk, args, resolve, reject) {
  args.push(callbackHander.bind(null, resolve, reject));
  thunk.apply(ctx, args);
}

function wrappedFunction(ctx, name, thunk) {
  var args = Array.prototype.splice.call(arguments, 3);
  return new Promise(promiseHandler.bind(null, ctx, name, thunk, args));
}

module.exports = function (context) {
  var newContext = {};
  for (var name in context) {
    var obj = context[name];
    if (typeof obj === "function") {
      newContext[name] = wrappedFunction.bind(null, context, name, obj);
    }
    else {
      newContext[name] = obj;
    }
  }
  return newContext;
};