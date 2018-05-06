/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "d1027bad0a853c096039"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {any} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/client.js")(__webpack_require__.s = "./src/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/fast-levenshtein/levenshtein.js":
/*!******************************************************!*\
  !*** ./node_modules/fast-levenshtein/levenshtein.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;(function() {\n  'use strict';\n  \n  var collator;\n  try {\n    collator = (typeof Intl !== \"undefined\" && typeof Intl.Collator !== \"undefined\") ? Intl.Collator(\"generic\", { sensitivity: \"base\" }) : null;\n  } catch (err){\n    console.log(\"Collator could not be initialized and wouldn't be used\");\n  }\n  // arrays to re-use\n  var prevRow = [],\n    str2Char = [];\n  \n  /**\n   * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.\n   */\n  var Levenshtein = {\n    /**\n     * Calculate levenshtein distance of the two strings.\n     *\n     * @param str1 String the first string.\n     * @param str2 String the second string.\n     * @param [options] Additional options.\n     * @param [options.useCollator] Use `Intl.Collator` for locale-sensitive string comparison.\n     * @return Integer the levenshtein distance (0 and above).\n     */\n    get: function(str1, str2, options) {\n      var useCollator = (options && collator && options.useCollator);\n      \n      var str1Len = str1.length,\n        str2Len = str2.length;\n      \n      // base cases\n      if (str1Len === 0) return str2Len;\n      if (str2Len === 0) return str1Len;\n\n      // two rows\n      var curCol, nextCol, i, j, tmp;\n\n      // initialise previous row\n      for (i=0; i<str2Len; ++i) {\n        prevRow[i] = i;\n        str2Char[i] = str2.charCodeAt(i);\n      }\n      prevRow[str2Len] = str2Len;\n\n      var strCmp;\n      if (useCollator) {\n        // calculate current row distance from previous row using collator\n        for (i = 0; i < str1Len; ++i) {\n          nextCol = i + 1;\n\n          for (j = 0; j < str2Len; ++j) {\n            curCol = nextCol;\n\n            // substution\n            strCmp = 0 === collator.compare(str1.charAt(i), String.fromCharCode(str2Char[j]));\n\n            nextCol = prevRow[j] + (strCmp ? 0 : 1);\n\n            // insertion\n            tmp = curCol + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n            // deletion\n            tmp = prevRow[j + 1] + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n\n            // copy current col value into previous (in preparation for next iteration)\n            prevRow[j] = curCol;\n          }\n\n          // copy last col value into previous (in preparation for next iteration)\n          prevRow[j] = nextCol;\n        }\n      }\n      else {\n        // calculate current row distance from previous row without collator\n        for (i = 0; i < str1Len; ++i) {\n          nextCol = i + 1;\n\n          for (j = 0; j < str2Len; ++j) {\n            curCol = nextCol;\n\n            // substution\n            strCmp = str1.charCodeAt(i) === str2Char[j];\n\n            nextCol = prevRow[j] + (strCmp ? 0 : 1);\n\n            // insertion\n            tmp = curCol + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n            // deletion\n            tmp = prevRow[j + 1] + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n\n            // copy current col value into previous (in preparation for next iteration)\n            prevRow[j] = curCol;\n          }\n\n          // copy last col value into previous (in preparation for next iteration)\n          prevRow[j] = nextCol;\n        }\n      }\n      return nextCol;\n    }\n\n  };\n\n  // amd\n  if (\"function\" !== \"undefined\" && __webpack_require__(/*! !webpack amd define */ \"./node_modules/webpack/buildin/amd-define.js\") !== null && __webpack_require__(/*! !webpack amd options */ \"./node_modules/webpack/buildin/amd-options.js\")) {\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n      return Levenshtein;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  }\n  // commonjs\n  else if (typeof module !== \"undefined\" && module !== null && typeof exports !== \"undefined\" && module.exports === exports) {\n    module.exports = Levenshtein;\n  }\n  // web worker\n  else if (typeof self !== \"undefined\" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {\n    self.Levenshtein = Levenshtein;\n  }\n  // browser main thread\n  else if (typeof window !== \"undefined\" && window !== null) {\n    window.Levenshtein = Levenshtein;\n  }\n}());\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/fast-levenshtein/levenshtein.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * \n */\n\nfunction makeEmptyFunction(arg) {\n  return function () {\n    return arg;\n  };\n}\n\n/**\n * This function accepts and discards inputs; it has no side effects. This is\n * primarily useful idiomatically for overridable function endpoints which\n * always need to be callable, since JS lacks a null-call idiom ala Cocoa.\n */\nvar emptyFunction = function emptyFunction() {};\n\nemptyFunction.thatReturns = makeEmptyFunction;\nemptyFunction.thatReturnsFalse = makeEmptyFunction(false);\nemptyFunction.thatReturnsTrue = makeEmptyFunction(true);\nemptyFunction.thatReturnsNull = makeEmptyFunction(null);\nemptyFunction.thatReturnsThis = function () {\n  return this;\n};\nemptyFunction.thatReturnsArgument = function (arg) {\n  return arg;\n};\n\nmodule.exports = emptyFunction;\n\n//# sourceURL=webpack:///./node_modules/fbjs/lib/emptyFunction.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/invariant.js":
/*!********************************************!*\
  !*** ./node_modules/fbjs/lib/invariant.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar validateFormat = function validateFormat(format) {};\n\nif (true) {\n  validateFormat = function validateFormat(format) {\n    if (format === undefined) {\n      throw new Error('invariant requires an error message argument');\n    }\n  };\n}\n\nfunction invariant(condition, format, a, b, c, d, e, f) {\n  validateFormat(format);\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(format.replace(/%s/g, function () {\n        return args[argIndex++];\n      }));\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n}\n\nmodule.exports = invariant;\n\n//# sourceURL=webpack:///./node_modules/fbjs/lib/invariant.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/warning.js":
/*!******************************************!*\
  !*** ./node_modules/fbjs/lib/warning.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n */\n\n\n\nvar emptyFunction = __webpack_require__(/*! ./emptyFunction */ \"./node_modules/fbjs/lib/emptyFunction.js\");\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warning = emptyFunction;\n\nif (true) {\n  var printWarning = function printWarning(format) {\n    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    var argIndex = 0;\n    var message = 'Warning: ' + format.replace(/%s/g, function () {\n      return args[argIndex++];\n    });\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n\n  warning = function warning(condition, format) {\n    if (format === undefined) {\n      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n\n    if (format.indexOf('Failed Composite propType: ') === 0) {\n      return; // Ignore CompositeComponent proptype check.\n    }\n\n    if (!condition) {\n      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n        args[_key2 - 2] = arguments[_key2];\n      }\n\n      printWarning.apply(undefined, [format].concat(args));\n    }\n  };\n}\n\nmodule.exports = warning;\n\n//# sourceURL=webpack:///./node_modules/fbjs/lib/warning.js?");

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright 2015, Yahoo! Inc.\n * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.\n */\n(function (global, factory) {\n     true ? module.exports = factory() :\n    undefined;\n}(this, (function () {\n    'use strict';\n    \n    var REACT_STATICS = {\n        childContextTypes: true,\n        contextTypes: true,\n        defaultProps: true,\n        displayName: true,\n        getDefaultProps: true,\n        getDerivedStateFromProps: true,\n        mixins: true,\n        propTypes: true,\n        type: true\n    };\n    \n    var KNOWN_STATICS = {\n        name: true,\n        length: true,\n        prototype: true,\n        caller: true,\n        callee: true,\n        arguments: true,\n        arity: true\n    };\n    \n    var defineProperty = Object.defineProperty;\n    var getOwnPropertyNames = Object.getOwnPropertyNames;\n    var getOwnPropertySymbols = Object.getOwnPropertySymbols;\n    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\n    var getPrototypeOf = Object.getPrototypeOf;\n    var objectPrototype = getPrototypeOf && getPrototypeOf(Object);\n    \n    return function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {\n        if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components\n            \n            if (objectPrototype) {\n                var inheritedComponent = getPrototypeOf(sourceComponent);\n                if (inheritedComponent && inheritedComponent !== objectPrototype) {\n                    hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);\n                }\n            }\n            \n            var keys = getOwnPropertyNames(sourceComponent);\n            \n            if (getOwnPropertySymbols) {\n                keys = keys.concat(getOwnPropertySymbols(sourceComponent));\n            }\n            \n            for (var i = 0; i < keys.length; ++i) {\n                var key = keys[i];\n                if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {\n                    var descriptor = getOwnPropertyDescriptor(sourceComponent, key);\n                    try { // Avoid failures from read-only properties\n                        defineProperty(targetComponent, key, descriptor);\n                    } catch (e) {}\n                }\n            }\n            \n            return targetComponent;\n        }\n        \n        return targetComponent;\n    };\n})));\n\n\n//# sourceURL=webpack:///./node_modules/hoist-non-react-statics/index.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack:///./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nif (true) {\n  var invariant = __webpack_require__(/*! fbjs/lib/invariant */ \"./node_modules/fbjs/lib/invariant.js\");\n  var warning = __webpack_require__(/*! fbjs/lib/warning */ \"./node_modules/fbjs/lib/warning.js\");\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n  var loggedTypeFailures = {};\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (typeSpecs.hasOwnProperty(typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');\n        }\n      }\n    }\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ \"./node_modules/fbjs/lib/emptyFunction.js\");\nvar invariant = __webpack_require__(/*! fbjs/lib/invariant */ \"./node_modules/fbjs/lib/invariant.js\");\nvar warning = __webpack_require__(/*! fbjs/lib/warning */ \"./node_modules/fbjs/lib/warning.js\");\nvar assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\nvar ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\nvar checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ \"./node_modules/prop-types/checkPropTypes.js\");\n\nmodule.exports = function(isValidElement, throwOnDirectAccess) {\n  /* global Symbol */\n  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\n  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.\n\n  /**\n   * Returns the iterator method function contained on the iterable object.\n   *\n   * Be sure to invoke the function with the iterable as context:\n   *\n   *     var iteratorFn = getIteratorFn(myIterable);\n   *     if (iteratorFn) {\n   *       var iterator = iteratorFn.call(myIterable);\n   *       ...\n   *     }\n   *\n   * @param {?object} maybeIterable\n   * @return {?function}\n   */\n  function getIteratorFn(maybeIterable) {\n    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);\n    if (typeof iteratorFn === 'function') {\n      return iteratorFn;\n    }\n  }\n\n  /**\n   * Collection of methods that allow declaration and validation of props that are\n   * supplied to React components. Example usage:\n   *\n   *   var Props = require('ReactPropTypes');\n   *   var MyArticle = React.createClass({\n   *     propTypes: {\n   *       // An optional string prop named \"description\".\n   *       description: Props.string,\n   *\n   *       // A required enum prop named \"category\".\n   *       category: Props.oneOf(['News','Photos']).isRequired,\n   *\n   *       // A prop named \"dialog\" that requires an instance of Dialog.\n   *       dialog: Props.instanceOf(Dialog).isRequired\n   *     },\n   *     render: function() { ... }\n   *   });\n   *\n   * A more formal specification of how these methods are used:\n   *\n   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)\n   *   decl := ReactPropTypes.{type}(.isRequired)?\n   *\n   * Each and every declaration produces a function with the same signature. This\n   * allows the creation of custom validation functions. For example:\n   *\n   *  var MyLink = React.createClass({\n   *    propTypes: {\n   *      // An optional string or URI prop named \"href\".\n   *      href: function(props, propName, componentName) {\n   *        var propValue = props[propName];\n   *        if (propValue != null && typeof propValue !== 'string' &&\n   *            !(propValue instanceof URI)) {\n   *          return new Error(\n   *            'Expected a string or an URI for ' + propName + ' in ' +\n   *            componentName\n   *          );\n   *        }\n   *      }\n   *    },\n   *    render: function() {...}\n   *  });\n   *\n   * @internal\n   */\n\n  var ANONYMOUS = '<<anonymous>>';\n\n  // Important!\n  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.\n  var ReactPropTypes = {\n    array: createPrimitiveTypeChecker('array'),\n    bool: createPrimitiveTypeChecker('boolean'),\n    func: createPrimitiveTypeChecker('function'),\n    number: createPrimitiveTypeChecker('number'),\n    object: createPrimitiveTypeChecker('object'),\n    string: createPrimitiveTypeChecker('string'),\n    symbol: createPrimitiveTypeChecker('symbol'),\n\n    any: createAnyTypeChecker(),\n    arrayOf: createArrayOfTypeChecker,\n    element: createElementTypeChecker(),\n    instanceOf: createInstanceTypeChecker,\n    node: createNodeChecker(),\n    objectOf: createObjectOfTypeChecker,\n    oneOf: createEnumTypeChecker,\n    oneOfType: createUnionTypeChecker,\n    shape: createShapeTypeChecker,\n    exact: createStrictShapeTypeChecker,\n  };\n\n  /**\n   * inlined Object.is polyfill to avoid requiring consumers ship their own\n   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n   */\n  /*eslint-disable no-self-compare*/\n  function is(x, y) {\n    // SameValue algorithm\n    if (x === y) {\n      // Steps 1-5, 7-10\n      // Steps 6.b-6.e: +0 != -0\n      return x !== 0 || 1 / x === 1 / y;\n    } else {\n      // Step 6.a: NaN == NaN\n      return x !== x && y !== y;\n    }\n  }\n  /*eslint-enable no-self-compare*/\n\n  /**\n   * We use an Error-like object for backward compatibility as people may call\n   * PropTypes directly and inspect their output. However, we don't use real\n   * Errors anymore. We don't inspect their stack anyway, and creating them\n   * is prohibitively expensive if they are created too often, such as what\n   * happens in oneOfType() for any type before the one that matched.\n   */\n  function PropTypeError(message) {\n    this.message = message;\n    this.stack = '';\n  }\n  // Make `instanceof Error` still work for returned errors.\n  PropTypeError.prototype = Error.prototype;\n\n  function createChainableTypeChecker(validate) {\n    if (true) {\n      var manualPropTypeCallCache = {};\n      var manualPropTypeWarningCount = 0;\n    }\n    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {\n      componentName = componentName || ANONYMOUS;\n      propFullName = propFullName || propName;\n\n      if (secret !== ReactPropTypesSecret) {\n        if (throwOnDirectAccess) {\n          // New behavior only for users of `prop-types` package\n          invariant(\n            false,\n            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +\n            'Use `PropTypes.checkPropTypes()` to call them. ' +\n            'Read more at http://fb.me/use-check-prop-types'\n          );\n        } else if (\"development\" !== 'production' && typeof console !== 'undefined') {\n          // Old behavior for people using React.PropTypes\n          var cacheKey = componentName + ':' + propName;\n          if (\n            !manualPropTypeCallCache[cacheKey] &&\n            // Avoid spamming the console because they are often not actionable except for lib authors\n            manualPropTypeWarningCount < 3\n          ) {\n            warning(\n              false,\n              'You are manually calling a React.PropTypes validation ' +\n              'function for the `%s` prop on `%s`. This is deprecated ' +\n              'and will throw in the standalone `prop-types` package. ' +\n              'You may be seeing this warning due to a third-party PropTypes ' +\n              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',\n              propFullName,\n              componentName\n            );\n            manualPropTypeCallCache[cacheKey] = true;\n            manualPropTypeWarningCount++;\n          }\n        }\n      }\n      if (props[propName] == null) {\n        if (isRequired) {\n          if (props[propName] === null) {\n            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));\n          }\n          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));\n        }\n        return null;\n      } else {\n        return validate(props, propName, componentName, location, propFullName);\n      }\n    }\n\n    var chainedCheckType = checkType.bind(null, false);\n    chainedCheckType.isRequired = checkType.bind(null, true);\n\n    return chainedCheckType;\n  }\n\n  function createPrimitiveTypeChecker(expectedType) {\n    function validate(props, propName, componentName, location, propFullName, secret) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== expectedType) {\n        // `propValue` being instance of, say, date/regexp, pass the 'object'\n        // check, but we can offer a more precise error message here rather than\n        // 'of type `object`'.\n        var preciseType = getPreciseType(propValue);\n\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createAnyTypeChecker() {\n    return createChainableTypeChecker(emptyFunction.thatReturnsNull);\n  }\n\n  function createArrayOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');\n      }\n      var propValue = props[propName];\n      if (!Array.isArray(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));\n      }\n      for (var i = 0; i < propValue.length; i++) {\n        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);\n        if (error instanceof Error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createElementTypeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      if (!isValidElement(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createInstanceTypeChecker(expectedClass) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!(props[propName] instanceof expectedClass)) {\n        var expectedClassName = expectedClass.name || ANONYMOUS;\n        var actualClassName = getClassName(props[propName]);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createEnumTypeChecker(expectedValues) {\n    if (!Array.isArray(expectedValues)) {\n       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : undefined;\n      return emptyFunction.thatReturnsNull;\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      for (var i = 0; i < expectedValues.length; i++) {\n        if (is(propValue, expectedValues[i])) {\n          return null;\n        }\n      }\n\n      var valuesString = JSON.stringify(expectedValues);\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createObjectOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');\n      }\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));\n      }\n      for (var key in propValue) {\n        if (propValue.hasOwnProperty(key)) {\n          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n          if (error instanceof Error) {\n            return error;\n          }\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createUnionTypeChecker(arrayOfTypeCheckers) {\n    if (!Array.isArray(arrayOfTypeCheckers)) {\n       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;\n      return emptyFunction.thatReturnsNull;\n    }\n\n    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n      var checker = arrayOfTypeCheckers[i];\n      if (typeof checker !== 'function') {\n        warning(\n          false,\n          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +\n          'received %s at index %s.',\n          getPostfixForTypeWarning(checker),\n          i\n        );\n        return emptyFunction.thatReturnsNull;\n      }\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n        var checker = arrayOfTypeCheckers[i];\n        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {\n          return null;\n        }\n      }\n\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createNodeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!isNode(props[propName])) {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      for (var key in shapeTypes) {\n        var checker = shapeTypes[key];\n        if (!checker) {\n          continue;\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createStrictShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      // We need to check all keys in case some are required but missing from\n      // props.\n      var allKeys = assign({}, props[propName], shapeTypes);\n      for (var key in allKeys) {\n        var checker = shapeTypes[key];\n        if (!checker) {\n          return new PropTypeError(\n            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +\n            '\\nBad object: ' + JSON.stringify(props[propName], null, '  ') +\n            '\\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')\n          );\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n\n    return createChainableTypeChecker(validate);\n  }\n\n  function isNode(propValue) {\n    switch (typeof propValue) {\n      case 'number':\n      case 'string':\n      case 'undefined':\n        return true;\n      case 'boolean':\n        return !propValue;\n      case 'object':\n        if (Array.isArray(propValue)) {\n          return propValue.every(isNode);\n        }\n        if (propValue === null || isValidElement(propValue)) {\n          return true;\n        }\n\n        var iteratorFn = getIteratorFn(propValue);\n        if (iteratorFn) {\n          var iterator = iteratorFn.call(propValue);\n          var step;\n          if (iteratorFn !== propValue.entries) {\n            while (!(step = iterator.next()).done) {\n              if (!isNode(step.value)) {\n                return false;\n              }\n            }\n          } else {\n            // Iterator will provide entry [k,v] tuples rather than values.\n            while (!(step = iterator.next()).done) {\n              var entry = step.value;\n              if (entry) {\n                if (!isNode(entry[1])) {\n                  return false;\n                }\n              }\n            }\n          }\n        } else {\n          return false;\n        }\n\n        return true;\n      default:\n        return false;\n    }\n  }\n\n  function isSymbol(propType, propValue) {\n    // Native Symbol.\n    if (propType === 'symbol') {\n      return true;\n    }\n\n    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'\n    if (propValue['@@toStringTag'] === 'Symbol') {\n      return true;\n    }\n\n    // Fallback for non-spec compliant Symbols which are polyfilled.\n    if (typeof Symbol === 'function' && propValue instanceof Symbol) {\n      return true;\n    }\n\n    return false;\n  }\n\n  // Equivalent of `typeof` but with special handling for array and regexp.\n  function getPropType(propValue) {\n    var propType = typeof propValue;\n    if (Array.isArray(propValue)) {\n      return 'array';\n    }\n    if (propValue instanceof RegExp) {\n      // Old webkits (at least until Android 4.0) return 'function' rather than\n      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/\n      // passes PropTypes.object.\n      return 'object';\n    }\n    if (isSymbol(propType, propValue)) {\n      return 'symbol';\n    }\n    return propType;\n  }\n\n  // This handles more types than `getPropType`. Only used for error messages.\n  // See `createPrimitiveTypeChecker`.\n  function getPreciseType(propValue) {\n    if (typeof propValue === 'undefined' || propValue === null) {\n      return '' + propValue;\n    }\n    var propType = getPropType(propValue);\n    if (propType === 'object') {\n      if (propValue instanceof Date) {\n        return 'date';\n      } else if (propValue instanceof RegExp) {\n        return 'regexp';\n      }\n    }\n    return propType;\n  }\n\n  // Returns a string that is postfixed to a warning about an invalid type.\n  // For example, \"undefined\" or \"of type array\"\n  function getPostfixForTypeWarning(value) {\n    var type = getPreciseType(value);\n    switch (type) {\n      case 'array':\n      case 'object':\n        return 'an ' + type;\n      case 'boolean':\n      case 'date':\n      case 'regexp':\n        return 'a ' + type;\n      default:\n        return type;\n    }\n  }\n\n  // Returns class name of the object, if any.\n  function getClassName(propValue) {\n    if (!propValue.constructor || !propValue.constructor.name) {\n      return ANONYMOUS;\n    }\n    return propValue.constructor.name;\n  }\n\n  ReactPropTypes.checkPropTypes = checkPropTypes;\n  ReactPropTypes.PropTypes = ReactPropTypes;\n\n  return ReactPropTypes;\n};\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/factoryWithTypeCheckers.js?");

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nif (true) {\n  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&\n    Symbol.for &&\n    Symbol.for('react.element')) ||\n    0xeac7;\n\n  var isValidElement = function(object) {\n    return typeof object === 'object' &&\n      object !== null &&\n      object.$$typeof === REACT_ELEMENT_TYPE;\n  };\n\n  // By explicitly using `prop-types` you are opting into new development behavior.\n  // http://fb.me/prop-types-in-prod\n  var throwOnDirectAccess = true;\n  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ \"./node_modules/prop-types/factoryWithTypeCheckers.js\")(isValidElement, throwOnDirectAccess);\n} else {}\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack:///./node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "./node_modules/react-hot-loader/dist/react-hot-loader.development.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-hot-loader/dist/react-hot-loader.development.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\nvar React = __webpack_require__(/*! react */ \"react\");\nvar React__default = _interopDefault(React);\nvar shallowEqual = _interopDefault(__webpack_require__(/*! shallowequal */ \"./node_modules/shallowequal/index.js\"));\nvar levenshtein = _interopDefault(__webpack_require__(/*! fast-levenshtein */ \"./node_modules/fast-levenshtein/levenshtein.js\"));\nvar PropTypes = _interopDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\nvar reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\nvar hoistNonReactStatic = _interopDefault(__webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/index.js\"));\n\n/* eslint-disable no-underscore-dangle */\n\nvar isCompositeComponent = function isCompositeComponent(type) {\n  return typeof type === 'function';\n};\n\nvar getComponentDisplayName = function getComponentDisplayName(type) {\n  return type.displayName || type.name || 'Component';\n};\n\nvar getInternalInstance = function getInternalInstance(instance) {\n  return instance._reactInternalFiber || // React 16\n  instance._reactInternalInstance || // React 15\n  null;\n};\n\nvar updateInstance = function updateInstance(instance) {\n  var updater = instance.updater,\n      forceUpdate = instance.forceUpdate;\n\n  if (typeof forceUpdate === 'function') {\n    instance.forceUpdate();\n  } else if (updater && typeof updater.enqueueForceUpdate === 'function') {\n    updater.enqueueForceUpdate(instance);\n  }\n};\n\nvar isFragmentNode = function isFragmentNode(_ref) {\n  var type = _ref.type;\n  return React__default.Fragment && type === React__default.Fragment;\n};\n\nvar generation = 1;\n\nvar increment = function increment() {\n  return generation++;\n};\nvar get = function get() {\n  return generation;\n};\n\nvar PREFIX = '__reactstandin__';\nvar PROXY_KEY = PREFIX + 'key';\nvar GENERATION = PREFIX + 'proxyGeneration';\nvar REGENERATE_METHOD = PREFIX + 'regenerateByEval';\nvar UNWRAP_PROXY = PREFIX + 'getCurrent';\nvar CACHED_RESULT = PREFIX + 'cachedResult';\nvar PROXY_IS_MOUNTED = PREFIX + 'isMounted';\n\nvar configuration = {\n  logLevel: 'error'\n};\n\n/* eslint-disable no-console */\n\nvar logger = {\n  debug: function debug() {\n    if (['debug'].indexOf(configuration.logLevel) !== -1) {\n      var _console;\n\n      (_console = console).debug.apply(_console, arguments);\n    }\n  },\n  log: function log() {\n    if (['debug', 'log'].indexOf(configuration.logLevel) !== -1) {\n      var _console2;\n\n      (_console2 = console).log.apply(_console2, arguments);\n    }\n  },\n  warn: function warn() {\n    if (['debug', 'log', 'warn'].indexOf(configuration.logLevel) !== -1) {\n      var _console3;\n\n      (_console3 = console).warn.apply(_console3, arguments);\n    }\n  },\n  error: function error() {\n    if (['debug', 'log', 'warn', 'error'].indexOf(configuration.logLevel) !== -1) {\n      var _console4;\n\n      (_console4 = console).error.apply(_console4, arguments);\n    }\n  }\n};\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {\n  return typeof obj;\n} : function (obj) {\n  return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n};\n\nvar classCallCheck = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\nvar _extends = Object.assign || function (target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i];\n\n    for (var key in source) {\n      if (Object.prototype.hasOwnProperty.call(source, key)) {\n        target[key] = source[key];\n      }\n    }\n  }\n\n  return target;\n};\n\nvar inherits = function (subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n};\n\nvar possibleConstructorReturn = function (self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;\n};\n\n/* eslint-disable no-eval, func-names */\n\nfunction getDisplayName(Component) {\n  var displayName = Component.displayName || Component.name;\n  return displayName && displayName !== 'ReactComponent' ? displayName : 'Component';\n}\n\nvar reactLifeCycleMountMethods = ['componentWillMount', 'componentDidMount'];\n\nfunction isReactClass(Component) {\n  return Component.prototype && (Component.prototype.isReactComponent || Component.prototype.componentWillMount || Component.prototype.componentWillUnmount || Component.prototype.componentDidMount || Component.prototype.componentDidUnmount || Component.prototype.render);\n}\n\nfunction safeReactConstructor(Component, lastInstance) {\n  try {\n    if (lastInstance) {\n      return new Component(lastInstance.props, lastInstance.context);\n    }\n    return new Component({}, {});\n  } catch (e) {\n    // some components, like Redux connect could not be created without proper context\n  }\n  return null;\n}\n\nfunction isNativeFunction(fn) {\n  return typeof fn === 'function' ? fn.toString().indexOf('[native code]') > 0 : false;\n}\n\nvar identity = function identity(a) {\n  return a;\n};\nvar indirectEval = eval;\n\nvar doesSupportClasses = function () {\n  try {\n    indirectEval('class Test {}');\n    return true;\n  } catch (e) {\n    return false;\n  }\n}();\n\nvar ES6ProxyComponentFactory = doesSupportClasses && indirectEval('\\n(function(InitialParent, postConstructionAction) {\\n  return class ProxyComponent extends InitialParent {\\n    constructor(props, context) {\\n      super(props, context)\\n      postConstructionAction.call(this)\\n    }\\n  }\\n})\\n');\n\nvar ES5ProxyComponentFactory = function ES5ProxyComponentFactory(InitialParent, postConstructionAction) {\n  function ProxyComponent(props, context) {\n    InitialParent.call(this, props, context);\n    postConstructionAction.call(this);\n  }\n  ProxyComponent.prototype = Object.create(InitialParent.prototype);\n  Object.setPrototypeOf(ProxyComponent, InitialParent);\n  return ProxyComponent;\n};\n\nvar isReactComponentInstance = function isReactComponentInstance(el) {\n  return el && (typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && !el.type && el.render;\n};\n\nvar proxyClassCreator = doesSupportClasses ? ES6ProxyComponentFactory : ES5ProxyComponentFactory;\n\nfunction getOwnKeys(target) {\n  return [].concat(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));\n}\n\nfunction shallowStringsEqual(a, b) {\n  for (var key in a) {\n    if (String(a[key]) !== String(b[key])) {\n      return false;\n    }\n  }\n  return true;\n}\n\nfunction deepPrototypeUpdate(dest, source) {\n  var deepDest = Object.getPrototypeOf(dest);\n  var deepSrc = Object.getPrototypeOf(source);\n  if (deepDest && deepSrc && deepSrc !== deepDest) {\n    deepPrototypeUpdate(deepDest, deepSrc);\n  }\n  if (source.prototype && source.prototype !== dest.prototype) {\n    dest.prototype = source.prototype;\n  }\n}\n\nfunction safeDefineProperty(target, key, props) {\n  try {\n    Object.defineProperty(target, key, props);\n  } catch (e) {\n    logger.warn('Error while wrapping', key, ' -> ', e);\n  }\n}\n\nvar RESERVED_STATICS = ['length', 'displayName', 'name', 'arguments', 'caller', 'prototype', 'toString', 'valueOf', 'isStatelessFunctionalProxy', PROXY_KEY, UNWRAP_PROXY];\n\nfunction transferStaticProps(ProxyComponent, savedDescriptors, PreviousComponent, NextComponent) {\n  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {\n    if (RESERVED_STATICS.indexOf(key) !== -1) {\n      return;\n    }\n\n    var prevDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);\n    var savedDescriptor = savedDescriptors[key];\n\n    if (!shallowEqual(prevDescriptor, savedDescriptor)) {\n      safeDefineProperty(NextComponent, key, prevDescriptor);\n    }\n  });\n\n  // Copy newly defined static methods and properties\n  Object.getOwnPropertyNames(NextComponent).forEach(function (key) {\n    if (RESERVED_STATICS.indexOf(key) !== -1) {\n      return;\n    }\n\n    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(ProxyComponent, key);\n    var savedDescriptor = savedDescriptors[key];\n\n    // Skip redefined descriptors\n    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {\n      safeDefineProperty(NextComponent, key, prevDescriptor);\n      return;\n    }\n\n    if (prevDescriptor && !savedDescriptor) {\n      safeDefineProperty(ProxyComponent, key, prevDescriptor);\n      return;\n    }\n\n    var nextDescriptor = _extends({}, Object.getOwnPropertyDescriptor(NextComponent, key), {\n      configurable: true\n    });\n\n    savedDescriptors[key] = nextDescriptor;\n    safeDefineProperty(ProxyComponent, key, nextDescriptor);\n  });\n\n  // Remove static methods and properties that are no longer defined\n  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {\n    if (RESERVED_STATICS.indexOf(key) !== -1) {\n      return;\n    }\n    // Skip statics that exist on the next class\n    if (NextComponent.hasOwnProperty(key)) {\n      return;\n    }\n    // Skip non-configurable statics\n    var proxyDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);\n    if (proxyDescriptor && !proxyDescriptor.configurable) {\n      return;\n    }\n\n    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(PreviousComponent, key);\n    var savedDescriptor = savedDescriptors[key];\n\n    // Skip redefined descriptors\n    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {\n      return;\n    }\n\n    safeDefineProperty(ProxyComponent, key, {\n      value: undefined\n    });\n  });\n\n  return savedDescriptors;\n}\n\nfunction mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers) {\n  var injectedCode = {};\n  try {\n    var nextInstance = safeReactConstructor(NextComponent, lastInstance);\n\n    try {\n      // Bypass babel class inheritance checking\n      deepPrototypeUpdate(InitialComponent, NextComponent);\n    } catch (e) {\n      // It was ES6 class\n    }\n\n    var proxyInstance = safeReactConstructor(ProxyComponent, lastInstance);\n\n    if (!nextInstance || !proxyInstance) {\n      return injectedCode;\n    }\n\n    var mergedAttrs = _extends({}, proxyInstance, nextInstance);\n    var hasRegenerate = proxyInstance[REGENERATE_METHOD];\n    var ownKeys = getOwnKeys(Object.getPrototypeOf(ProxyComponent.prototype));\n    Object.keys(mergedAttrs).forEach(function (key) {\n      if (key.startsWith(PREFIX)) return;\n      var nextAttr = nextInstance[key];\n      var prevAttr = proxyInstance[key];\n      if (prevAttr && nextAttr) {\n        if (isNativeFunction(nextAttr) || isNativeFunction(prevAttr)) {\n          // this is bound method\n          var isSameArity = nextAttr.length === prevAttr.length;\n          var existsInPrototype = ownKeys.indexOf(key) >= 0 || ProxyComponent.prototype[key];\n          if (isSameArity && existsInPrototype) {\n            if (hasRegenerate) {\n              injectedCode[key] = 'Object.getPrototypeOf(this)[\\'' + key + '\\'].bind(this)';\n            } else {\n              logger.warn('React Hot Loader:,', 'Non-controlled class', ProxyComponent.name, 'contains a new native or bound function ', key, nextAttr, '. Unable to reproduce');\n            }\n          } else {\n            logger.warn('React Hot Loader:', 'Updated class ', ProxyComponent.name, 'contains native or bound function ', key, nextAttr, '. Unable to reproduce, use arrow functions instead.', '(arity: ' + nextAttr.length + '/' + prevAttr.length + ', proto: ' + (existsInPrototype ? 'yes' : 'no'));\n          }\n          return;\n        }\n\n        var nextString = String(nextAttr);\n        var injectedBefore = injectedMembers[key];\n        if (nextString !== String(prevAttr) || injectedBefore && nextString !== String(injectedBefore)) {\n          if (!hasRegenerate) {\n            if (nextString.indexOf('function') < 0 && nextString.indexOf('=>') < 0) {\n              // just copy prop over\n              injectedCode[key] = nextAttr;\n            } else {\n              logger.warn('React Hot Loader:', ' Updated class ', ProxyComponent.name, 'had different code for', key, nextAttr, '. Unable to reproduce. Regeneration support needed.');\n            }\n          } else {\n            injectedCode[key] = nextAttr;\n          }\n        }\n      }\n    });\n  } catch (e) {\n    logger.warn('React Hot Loader:', e);\n  }\n  return injectedCode;\n}\n\nfunction checkLifeCycleMethods(ProxyComponent, NextComponent) {\n  try {\n    var p1 = Object.getPrototypeOf(ProxyComponent.prototype);\n    var p2 = NextComponent.prototype;\n    reactLifeCycleMountMethods.forEach(function (key) {\n      var d1 = Object.getOwnPropertyDescriptor(p1, key) || { value: p1[key] };\n      var d2 = Object.getOwnPropertyDescriptor(p2, key) || { value: p2[key] };\n      if (!shallowStringsEqual(d1, d2)) {\n        logger.warn('React Hot Loader:', 'You did update', ProxyComponent.name, 's lifecycle method', key, '. Unable to repeat');\n      }\n    });\n  } catch (e) {\n    // Ignore errors\n  }\n}\n\nfunction inject(target, currentGeneration, injectedMembers) {\n  if (target[GENERATION] !== currentGeneration) {\n    var hasRegenerate = !!target[REGENERATE_METHOD];\n    Object.keys(injectedMembers).forEach(function (key) {\n      try {\n        if (hasRegenerate) {\n          target[REGENERATE_METHOD](key, '(function REACT_HOT_LOADER_SANDBOX () {\\n          var _this  = this; // common babel transpile\\n          var _this2 = this; // common babel transpile\\n          var _this3 = this; // common babel transpile\\n          return ' + injectedMembers[key] + ';\\n          }).call(this)');\n        } else {\n          target[key] = injectedMembers[key];\n        }\n      } catch (e) {\n        logger.warn('React Hot Loader: Failed to regenerate method ', key, ' of class ', target);\n        logger.warn('got error', e);\n      }\n    });\n\n    target[GENERATION] = currentGeneration;\n  }\n}\n\nvar has = Object.prototype.hasOwnProperty;\n\nvar proxies = new WeakMap();\n\nvar resetClassProxies = function resetClassProxies() {\n  proxies = new WeakMap();\n};\n\nvar blackListedClassMembers = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUnmount', 'hotComponentRender', 'getInitialState', 'getDefaultProps'];\n\nvar defaultRenderOptions = {\n  componentWillRender: identity,\n  componentDidUpdate: function componentDidUpdate(result) {\n    return result;\n  },\n  componentDidRender: function componentDidRender(result) {\n    return result;\n  }\n};\n\nvar defineClassMember = function defineClassMember(Class, methodName, methodBody) {\n  return safeDefineProperty(Class.prototype, methodName, {\n    configurable: true,\n    writable: true,\n    enumerable: false,\n    value: methodBody\n  });\n};\n\nvar defineClassMembers = function defineClassMembers(Class, methods) {\n  return Object.keys(methods).forEach(function (methodName) {\n    return defineClassMember(Class, methodName, methods[methodName]);\n  });\n};\n\nvar setSFPFlag = function setSFPFlag(component, flag) {\n  return safeDefineProperty(component, 'isStatelessFunctionalProxy', {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: flag\n  });\n};\n\nvar copyMethodDescriptors = function copyMethodDescriptors(target, source) {\n  if (source) {\n    // it is possible to use `function-double` to construct an ideal clone, but does not make a sence\n    var keys = Object.getOwnPropertyNames(source);\n\n    keys.forEach(function (key) {\n      return safeDefineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n\n    safeDefineProperty(target, 'toString', {\n      configurable: true,\n      writable: false,\n      enumerable: false,\n      value: function toString() {\n        return String(source);\n      }\n    });\n  }\n\n  return target;\n};\n\nfunction createClassProxy(InitialComponent, proxyKey, options) {\n  var renderOptions = _extends({}, defaultRenderOptions, options);\n  // Prevent double wrapping.\n  // Given a proxy class, return the existing proxy managing it.\n  var existingProxy = proxies.get(InitialComponent);\n\n  if (existingProxy) {\n    return existingProxy;\n  }\n\n  var CurrentComponent = void 0;\n  var savedDescriptors = {};\n  var injectedMembers = {};\n  var proxyGeneration = 0;\n  var isFunctionalComponent = !isReactClass(InitialComponent);\n\n  var lastInstance = null;\n\n  function postConstructionAction() {\n    this[GENERATION] = 0;\n\n    // As long we can't override constructor\n    // every class shall evolve from a base class\n    inject(this, proxyGeneration, injectedMembers);\n\n    lastInstance = this;\n  }\n\n  function proxiedUpdate() {\n    if (this) {\n      inject(this, proxyGeneration, injectedMembers);\n    }\n  }\n\n  function lifeCycleWrapperFactory(wrapperName) {\n    var sideEffect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;\n\n    return copyMethodDescriptors(function wrappedMethod() {\n      proxiedUpdate.call(this);\n      sideEffect(this);\n\n      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {\n        rest[_key] = arguments[_key];\n      }\n\n      return !isFunctionalComponent && CurrentComponent.prototype[wrapperName] && CurrentComponent.prototype[wrapperName].apply(this, rest);\n    }, InitialComponent.prototype && InitialComponent.prototype[wrapperName]);\n  }\n\n  function methodWrapperFactory(wrapperName, realMethod) {\n    return copyMethodDescriptors(function wrappedMethod() {\n      for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        rest[_key2] = arguments[_key2];\n      }\n\n      return realMethod.apply(this, rest);\n    }, realMethod);\n  }\n\n  var fakeBasePrototype = function fakeBasePrototype(Base) {\n    return Object.getOwnPropertyNames(Base).filter(function (key) {\n      return blackListedClassMembers.indexOf(key) === -1;\n    }).filter(function (key) {\n      var descriptor = Object.getOwnPropertyDescriptor(Base, key);\n      return typeof descriptor.value === 'function';\n    }).reduce(function (acc, key) {\n      acc[key] = methodWrapperFactory(key, Base[key]);\n      return acc;\n    }, {});\n  };\n\n  var componentDidMount = lifeCycleWrapperFactory('componentDidMount', function (target) {\n    target[PROXY_IS_MOUNTED] = true;\n  });\n  var componentDidUpdate = lifeCycleWrapperFactory('componentDidUpdate', renderOptions.componentDidUpdate);\n  var componentWillUnmount = lifeCycleWrapperFactory('componentWillUnmount', function (target) {\n    target[PROXY_IS_MOUNTED] = false;\n  });\n\n  function hotComponentRender() {\n    // repeating subrender call to keep RENDERED_GENERATION up to date\n    renderOptions.componentWillRender(this);\n    proxiedUpdate.call(this);\n    var result = void 0;\n\n    // We need to use hasOwnProperty here, as the cached result is a React node\n    // and can be null or some other falsy value.\n    if (has.call(this, CACHED_RESULT)) {\n      result = this[CACHED_RESULT];\n      delete this[CACHED_RESULT];\n    } else if (isFunctionalComponent) {\n      result = CurrentComponent(this.props, this.context);\n    } else {\n      result = CurrentComponent.prototype.render.call(this);\n    }\n\n    return renderOptions.componentDidRender.call(this, result);\n  }\n\n  function proxiedRender() {\n    renderOptions.componentWillRender(this);\n    return hotComponentRender.call(this);\n  }\n\n  var defineProxyMethods = function defineProxyMethods(Proxy) {\n    var Base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    defineClassMembers(Proxy, _extends({}, fakeBasePrototype(Base), {\n      render: proxiedRender,\n      hotComponentRender: hotComponentRender,\n      componentDidMount: componentDidMount,\n      componentDidUpdate: componentDidUpdate,\n      componentWillUnmount: componentWillUnmount\n    }));\n  };\n\n  var _ProxyFacade = void 0;\n  var ProxyComponent = null;\n  var proxy = void 0;\n\n  if (!isFunctionalComponent) {\n    ProxyComponent = proxyClassCreator(InitialComponent, postConstructionAction);\n\n    defineProxyMethods(ProxyComponent, InitialComponent.prototype);\n\n    _ProxyFacade = ProxyComponent;\n  } else {\n    // This function only gets called for the initial mount. The actual\n    // rendered component instance will be the return value.\n\n    // eslint-disable-next-line func-names\n    _ProxyFacade = function ProxyFacade(props, context) {\n      var result = CurrentComponent(props, context);\n\n      // simple SFC\n      if (!CurrentComponent.contextTypes) {\n        if (!_ProxyFacade.isStatelessFunctionalProxy) {\n          setSFPFlag(_ProxyFacade, true);\n        }\n\n        return renderOptions.componentDidRender(result);\n      }\n      setSFPFlag(_ProxyFacade, false);\n\n      // This is a Relay-style container constructor. We can't do the prototype-\n      // style wrapping for this as we do elsewhere, so just we just pass it\n      // through as-is.\n      if (isReactComponentInstance(result)) {\n        ProxyComponent = null;\n        return result;\n      }\n\n      // Otherwise, it's a normal functional component. Build the real proxy\n      // and use it going forward.\n      ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);\n\n      defineProxyMethods(ProxyComponent);\n\n      var determinateResult = new ProxyComponent(props, context);\n\n      // Cache the initial render result so we don't call the component function\n      // a second time for the initial render.\n      determinateResult[CACHED_RESULT] = result;\n      return determinateResult;\n    };\n  }\n\n  function get() {\n    return _ProxyFacade;\n  }\n\n  function getCurrent() {\n    return CurrentComponent;\n  }\n\n  safeDefineProperty(_ProxyFacade, UNWRAP_PROXY, {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: getCurrent\n  });\n\n  safeDefineProperty(_ProxyFacade, PROXY_KEY, {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: proxyKey\n  });\n\n  safeDefineProperty(_ProxyFacade, 'toString', {\n    configurable: true,\n    writable: false,\n    enumerable: false,\n    value: function toString() {\n      return String(CurrentComponent);\n    }\n  });\n\n  function update(NextComponent) {\n    if (typeof NextComponent !== 'function') {\n      throw new Error('Expected a constructor.');\n    }\n\n    if (NextComponent === CurrentComponent) {\n      return;\n    }\n\n    // Prevent proxy cycles\n    var existingProxy = proxies.get(NextComponent);\n    if (existingProxy) {\n      return;\n    }\n\n    proxies.set(NextComponent, proxy);\n\n    isFunctionalComponent = !isReactClass(NextComponent);\n    proxyGeneration++;\n\n    // Save the next constructor so we call it\n    var PreviousComponent = CurrentComponent;\n    CurrentComponent = NextComponent;\n\n    // Try to infer displayName\n    var displayName = getDisplayName(CurrentComponent);\n\n    safeDefineProperty(_ProxyFacade, 'displayName', {\n      configurable: true,\n      writable: false,\n      enumerable: true,\n      value: displayName\n    });\n\n    if (ProxyComponent) {\n      safeDefineProperty(ProxyComponent, 'name', {\n        value: displayName\n      });\n    }\n\n    savedDescriptors = transferStaticProps(_ProxyFacade, savedDescriptors, PreviousComponent, NextComponent);\n\n    if (isFunctionalComponent || !ProxyComponent) ; else {\n      checkLifeCycleMethods(ProxyComponent, NextComponent);\n      Object.setPrototypeOf(ProxyComponent.prototype, NextComponent.prototype);\n      defineProxyMethods(ProxyComponent, NextComponent.prototype);\n      if (proxyGeneration > 1) {\n        injectedMembers = mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers);\n      }\n    }\n  }\n\n  update(InitialComponent);\n\n  proxy = { get: get, update: update };\n\n  proxies.set(InitialComponent, proxy);\n  proxies.set(_ProxyFacade, proxy);\n\n  safeDefineProperty(proxy, UNWRAP_PROXY, {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: getCurrent\n  });\n\n  return proxy;\n}\n\nvar proxiesByID = void 0;\nvar idsByType = void 0;\n\nvar elementCount = 0;\nvar renderOptions = {};\n\nvar generateTypeId = function generateTypeId() {\n  return 'auto-' + elementCount++;\n};\n\nvar getIdByType = function getIdByType(type) {\n  return idsByType.get(type);\n};\n\nvar getProxyById = function getProxyById(id) {\n  return proxiesByID[id];\n};\nvar getProxyByType = function getProxyByType(type) {\n  return getProxyById(getIdByType(type));\n};\n\nvar setStandInOptions = function setStandInOptions(options) {\n  renderOptions = options;\n};\n\nvar updateProxyById = function updateProxyById(id, type) {\n  // Remember the ID.\n  idsByType.set(type, id);\n\n  if (!proxiesByID[id]) {\n    proxiesByID[id] = createClassProxy(type, id, renderOptions);\n  } else {\n    proxiesByID[id].update(type);\n  }\n  return proxiesByID[id];\n};\n\nvar createProxyForType = function createProxyForType(type) {\n  return getProxyByType(type) || updateProxyById(generateTypeId(), type);\n};\n\nvar resetProxies = function resetProxies() {\n  proxiesByID = {};\n  idsByType = new WeakMap();\n  resetClassProxies();\n};\n\nresetProxies();\n\n/* eslint-disable no-use-before-define */\n\nfunction resolveType(type) {\n  if (!isCompositeComponent(type)) return type;\n\n  var proxy = reactHotLoader.disableProxyCreation ? getProxyByType(type) : createProxyForType(type);\n\n  return proxy ? proxy.get() : type;\n}\n\nvar reactHotLoader = {\n  register: function register(type, uniqueLocalName, fileName) {\n    if (isCompositeComponent(type) && typeof uniqueLocalName === 'string' && uniqueLocalName && typeof fileName === 'string' && fileName) {\n      var id = fileName + '#' + uniqueLocalName;\n\n      if (getProxyById(id)) {\n        // component got replaced. Need to reconsile\n        increment();\n      }\n\n      updateProxyById(id, type);\n    }\n  },\n  reset: function reset() {\n    resetProxies();\n  },\n  patch: function patch(React$$1) {\n    if (!React$$1.createElement.isPatchedByReactHotLoader) {\n      var originalCreateElement = React$$1.createElement;\n      // Trick React into rendering a proxy so that\n      // its state is preserved when the class changes.\n      // This will update the proxy if it's for a known type.\n      React$$1.createElement = function (type) {\n        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n          args[_key - 1] = arguments[_key];\n        }\n\n        return originalCreateElement.apply(undefined, [resolveType(type)].concat(args));\n      };\n      React$$1.createElement.isPatchedByReactHotLoader = true;\n    }\n\n    if (!React$$1.createFactory.isPatchedByReactHotLoader) {\n      // Patch React.createFactory to use patched createElement\n      // because the original implementation uses the internal,\n      // unpatched ReactElement.createElement\n      React$$1.createFactory = function (type) {\n        var factory = React$$1.createElement.bind(null, type);\n        factory.type = type;\n        return factory;\n      };\n      React$$1.createFactory.isPatchedByReactHotLoader = true;\n    }\n\n    if (!React$$1.Children.only.isPatchedByReactHotLoader) {\n      var originalChildrenOnly = React$$1.Children.only;\n      // Use the same trick as React.createElement\n      React$$1.Children.only = function (children) {\n        return originalChildrenOnly(_extends({}, children, { type: resolveType(children.type) }));\n      };\n      React$$1.Children.only.isPatchedByReactHotLoader = true;\n    }\n\n    reactHotLoader.reset();\n  },\n\n\n  disableProxyCreation: false\n};\n\n/* eslint-disable no-underscore-dangle */\n\nfunction pushStack(stack, node) {\n  stack.type = node.type;\n  stack.children = [];\n  stack.instance = typeof node.type === 'function' ? node.stateNode : stack;\n\n  if (!stack.instance) {\n    stack.instance = {\n      SFC_fake: stack.type,\n      props: {},\n      render: function render() {\n        return stack.type(stack.instance.props);\n      }\n    };\n  }\n}\n\nfunction hydrateFiberStack(node, stack) {\n  pushStack(stack, node);\n  if (node.child) {\n    var child = node.child;\n\n    do {\n      var childStack = {};\n      hydrateFiberStack(child, childStack);\n      stack.children.push(childStack);\n      child = child.sibling;\n    } while (child);\n  }\n}\n\n/* eslint-disable no-underscore-dangle */\n\nfunction pushState(stack, type, instance) {\n  stack.type = type;\n  stack.children = [];\n  stack.instance = instance || stack;\n\n  if (typeof type === 'function' && type.isStatelessFunctionalProxy) {\n    // In React 15 SFC is wrapped by component. We have to detect our proxies and change the way it works\n    stack.instance = {\n      SFC_fake: type,\n      props: {},\n      render: function render() {\n        return type(stack.instance.props);\n      }\n    };\n  }\n}\n\nfunction hydrateLegacyStack(node, stack) {\n  if (node._currentElement) {\n    pushState(stack, node._currentElement.type, node._instance || stack);\n  }\n\n  if (node._renderedComponent) {\n    var childStack = {};\n    hydrateLegacyStack(node._renderedComponent, childStack);\n    stack.children.push(childStack);\n  } else if (node._renderedChildren) {\n    Object.keys(node._renderedChildren).forEach(function (key) {\n      var childStack = {};\n      hydrateLegacyStack(node._renderedChildren[key], childStack);\n      stack.children.push(childStack);\n    });\n  }\n}\n\n/* eslint-disable no-underscore-dangle */\n\nfunction getReactStack(instance) {\n  var rootNode = getInternalInstance(instance);\n  var stack = {};\n  var isFiber = typeof rootNode.tag === 'number';\n  if (isFiber) {\n    hydrateFiberStack(rootNode, stack);\n  } else {\n    hydrateLegacyStack(rootNode, stack);\n  }\n  return stack;\n}\n\n// some `empty` names, React can autoset display name to...\nvar UNDEFINED_NAMES = {\n  Unknown: true,\n  Component: true\n};\n\nvar renderStack = [];\n\nvar stackReport = function stackReport() {\n  var rev = renderStack.slice().reverse();\n  logger.warn('in', rev[0].name, rev);\n};\n\nvar areNamesEqual = function areNamesEqual(a, b) {\n  return a === b || UNDEFINED_NAMES[a] && UNDEFINED_NAMES[b];\n};\nvar isReactClass$1 = function isReactClass(fn) {\n  return fn && !!fn.render;\n};\nvar isFunctional = function isFunctional(fn) {\n  return typeof fn === 'function';\n};\nvar isArray = function isArray(fn) {\n  return Array.isArray(fn);\n};\nvar asArray = function asArray(a) {\n  return isArray(a) ? a : [a];\n};\nvar getTypeOf = function getTypeOf(type) {\n  if (isReactClass$1(type)) return 'ReactComponent';\n  if (isFunctional(type)) return 'StatelessFunctional';\n  return 'Fragment'; // ?\n};\n\nvar filterNullArray = function filterNullArray(a) {\n  if (!a) return [];\n  return a.filter(function (x) {\n    return !!x;\n  });\n};\n\nvar unflatten = function unflatten(a) {\n  return a.reduce(function (acc, a) {\n    if (Array.isArray(a)) {\n      acc.push.apply(acc, unflatten(a));\n    } else {\n      acc.push(a);\n    }\n    return acc;\n  }, []);\n};\n\nvar getElementType = function getElementType(child) {\n  return child.type[UNWRAP_PROXY] ? child.type[UNWRAP_PROXY]() : child.type;\n};\n\nvar haveTextSimilarity = function haveTextSimilarity(a, b) {\n  return (\n    // equal or slight changed\n    a === b || levenshtein.get(a, b) < a.length * 0.2\n  );\n};\n\nvar equalClasses = function equalClasses(a, b) {\n  var prototypeA = a.prototype;\n  var prototypeB = Object.getPrototypeOf(b.prototype);\n\n  var hits = 0;\n  var misses = 0;\n  Object.getOwnPropertyNames(prototypeA).forEach(function (key) {\n    if (typeof prototypeA[key] === 'function' && key !== 'constructor') {\n      if (haveTextSimilarity(String(prototypeA[key]), String(prototypeB[key]))) {\n        hits++;\n      } else {\n        misses++;\n        if (key === 'render') {\n          misses++;\n        }\n      }\n    }\n  });\n  // allow to add or remove one function\n  return hits > 0 && misses <= 1;\n};\n\nvar isSwappable = function isSwappable(a, b) {\n  // both are registered components\n  if (getIdByType(b) && getIdByType(a) === getIdByType(b)) {\n    return true;\n  }\n  if (getTypeOf(a) !== getTypeOf(b)) {\n    return false;\n  }\n  if (isReactClass$1(a.prototype)) {\n    return areNamesEqual(getComponentDisplayName(a), getComponentDisplayName(b)) && equalClasses(a, b);\n  }\n\n  if (isFunctional(a)) {\n    var nameA = getComponentDisplayName(a);\n    return areNamesEqual(nameA, getComponentDisplayName(b)) && nameA !== 'Component' || haveTextSimilarity(String(a), String(b));\n  }\n  return false;\n};\n\nvar render = function render(component) {\n  if (!component) {\n    return [];\n  }\n  if (isReactClass$1(component)) {\n    // not calling real render method to prevent call recursion.\n    // stateless components does not have hotComponentRender\n    return component.hotComponentRender ? component.hotComponentRender() : component.render();\n  }\n  if (isArray(component)) {\n    return component.map(render);\n  }\n  if (component.children) {\n    return component.children;\n  }\n\n  return [];\n};\n\nvar NO_CHILDREN = { children: [] };\nvar mapChildren = function mapChildren(children, instances) {\n  return {\n    children: children.filter(function (c) {\n      return c;\n    }).map(function (child, index) {\n      if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child.isMerged) {\n        return child;\n      }\n      var instanceLine = instances[index] || {};\n      var oldChildren = asArray(instanceLine.children || []);\n\n      if (Array.isArray(child)) {\n        return _extends({\n          type: null\n        }, mapChildren(child, oldChildren));\n      }\n\n      var newChildren = asArray(child.props && child.props.children || child.children || []);\n      var nextChildren = child.type !== 'function' && oldChildren.length && mapChildren(newChildren, oldChildren);\n\n      return _extends({\n        nextProps: child.props,\n        isMerged: true\n      }, instanceLine, nextChildren || {}, {\n        type: child.type\n      });\n    })\n  };\n};\n\nvar mergeInject = function mergeInject(a, b, instance) {\n  if (a && !Array.isArray(a)) {\n    return mergeInject([a], b);\n  }\n  if (b && !Array.isArray(b)) {\n    return mergeInject(a, [b]);\n  }\n\n  if (!a || !b) {\n    return NO_CHILDREN;\n  }\n  if (a.length === b.length) {\n    return mapChildren(a, b);\n  }\n\n  // in some cases (no confidence here) B could contain A except null children\n  // in some cases - could not.\n  // this depends on React version and the way you build component.\n\n  var nonNullA = filterNullArray(a);\n  if (nonNullA.length === b.length) {\n    return mapChildren(nonNullA, b);\n  }\n\n  var flatA = unflatten(nonNullA);\n  var flatB = unflatten(b);\n  if (flatA.length === flatB.length) {\n    return mapChildren(flatA, flatB);\n  }\n  if (flatB.length === 0 && flatA.length === 1 && _typeof(flatA[0]) !== 'object') ; else {\n    logger.warn('React-hot-loader: unable to merge ', a, 'and children of ', instance);\n    stackReport();\n  }\n  return NO_CHILDREN;\n};\n\nvar transformFlowNode = function transformFlowNode(flow) {\n  return flow.reduce(function (acc, node) {\n    if (isFragmentNode(node) && node.props && node.props.children) {\n      return [].concat(acc, filterNullArray(node.props.children));\n    }\n    return [].concat(acc, [node]);\n  }, []);\n};\n\nvar scheduledUpdates = [];\nvar scheduledUpdate = 0;\n\nvar flushScheduledUpdates = function flushScheduledUpdates() {\n  var instances = scheduledUpdates;\n  scheduledUpdates = [];\n  scheduledUpdate = 0;\n  instances.forEach(function (instance) {\n    return instance[PROXY_IS_MOUNTED] && updateInstance(instance);\n  });\n};\n\nvar unscheduleUpdate = function unscheduleUpdate(instance) {\n  scheduledUpdates = scheduledUpdates.filter(function (inst) {\n    return inst !== instance;\n  });\n};\n\nvar scheduleInstanceUpdate = function scheduleInstanceUpdate(instance) {\n  scheduledUpdates.push(instance);\n  if (!scheduledUpdate) {\n    scheduledUpdate = setTimeout(flushScheduledUpdates);\n  }\n};\n\nvar hotReplacementRender = function hotReplacementRender(instance, stack) {\n  if (isReactClass$1(instance)) {\n    var type = getElementType(stack);\n    renderStack.push({\n      name: getComponentDisplayName(type),\n      type: type,\n      props: stack.instance.props\n    });\n  }\n  var flow = transformFlowNode(filterNullArray(asArray(render(instance))));\n\n  var children = stack.children;\n\n\n  flow.forEach(function (child, index) {\n    var stackChild = children[index];\n    var next = function next(instance) {\n      // copy over props as long new component may be hidden inside them\n      // child does not have all props, as long some of them can be calculated on componentMount.\n      var nextProps = _extends({}, instance.props, child.nextProps || {}, child.props || {});\n\n      if (isReactClass$1(instance) && instance.componentWillUpdate) {\n        // Force-refresh component (bypass redux renderedComponent)\n        instance.componentWillUpdate(nextProps, instance.state);\n      }\n      instance.props = nextProps;\n      hotReplacementRender(instance, stackChild);\n    };\n\n    // text node\n    if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || !stackChild || !stackChild.instance) {\n      return;\n    }\n\n    if (_typeof(child.type) !== _typeof(stackChild.type)) {\n      // Portals could generate undefined !== null\n      if (child.type && stackChild.type) {\n        logger.warn('React-hot-loader: got ', child.type, 'instead of', stackChild.type);\n        stackReport();\n      }\n      return;\n    }\n\n    if (typeof child.type !== 'function') {\n      next(\n      // move types from render to the instances of hydrated tree\n      mergeInject(asArray(child.props ? child.props.children : child.children), stackChild.instance.children, stackChild.instance));\n    } else {\n      // unwrap proxy\n      var childType = getElementType(child);\n      if (!stackChild.type[PROXY_KEY]) {\n        /* eslint-disable no-console */\n        logger.error('React-hot-loader: fatal error caused by ', stackChild.type, ' - no instrumentation found. ', 'Please require react-hot-loader before React. More in troubleshooting.');\n        stackReport();\n        throw new Error('React-hot-loader: wrong configuration');\n      }\n\n      if (child.type === stackChild.type) {\n        next(stackChild.instance);\n      } else if (isSwappable(childType, stackChild.type)) {\n        // they are both registered, or have equal code/displayname/signature\n\n        // update proxy using internal PROXY_KEY\n        updateProxyById(stackChild.type[PROXY_KEY], childType);\n\n        next(stackChild.instance);\n      } else {\n        logger.warn('React-hot-loader: a ' + getComponentDisplayName(childType) + ' was found where a ' + getComponentDisplayName(stackChild) + ' was expected.\\n          ' + childType);\n        stackReport();\n      }\n\n      scheduleInstanceUpdate(stackChild.instance);\n    }\n  });\n\n  if (isReactClass$1(instance)) {\n    renderStack.pop();\n  }\n};\n\nvar hotReplacementRender$1 = (function (instance, stack) {\n  try {\n    // disable reconciler to prevent upcoming components from proxying.\n    reactHotLoader.disableProxyCreation = true;\n    renderStack = [];\n    hotReplacementRender(instance, stack);\n  } catch (e) {\n    logger.warn('React-hot-loader: reconcilation failed due to error', e);\n  } finally {\n    reactHotLoader.disableProxyCreation = false;\n  }\n});\n\nvar reconcileHotReplacement = function reconcileHotReplacement(ReactInstance) {\n  return hotReplacementRender$1(ReactInstance, getReactStack(ReactInstance));\n};\n\nvar RENDERED_GENERATION = 'REACT_HOT_LOADER_RENDERED_GENERATION';\n\nvar renderReconciler = function renderReconciler(target, force) {\n  // we are not inside parent reconcilation\n  var currentGeneration = get();\n  var componentGeneration = target[RENDERED_GENERATION];\n\n  target[RENDERED_GENERATION] = currentGeneration;\n\n  if (!reactHotLoader.disableProxyCreation) {\n    if ((componentGeneration || force) && componentGeneration !== currentGeneration) {\n      reconcileHotReplacement(target);\n      return true;\n    }\n  }\n  return false;\n};\n\nfunction asyncReconciledRender(target) {\n  renderReconciler(target, false);\n}\n\nfunction proxyWrapper(element) {\n  // post wrap on post render\n  if (!reactHotLoader.disableProxyCreation) {\n    unscheduleUpdate(this);\n  }\n\n  if (!element) {\n    return element;\n  }\n  if (Array.isArray(element)) {\n    return element.map(proxyWrapper);\n  }\n  if (typeof element.type === 'function') {\n    var proxy = getProxyByType(element.type);\n    if (proxy) {\n      return _extends({}, element, {\n        type: proxy.get()\n      });\n    }\n  }\n  return element;\n}\n\nsetStandInOptions({\n  componentWillRender: asyncReconciledRender,\n  componentDidRender: proxyWrapper,\n  componentDidUpdate: flushScheduledUpdates\n});\n\nvar AppContainer = function (_React$Component) {\n  inherits(AppContainer, _React$Component);\n\n  function AppContainer() {\n    var _temp, _this, _ret;\n\n    classCallCheck(this, AppContainer);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {\n      error: null,\n      // eslint-disable-next-line react/no-unused-state\n      generation: 0\n    }, _temp), possibleConstructorReturn(_this, _ret);\n  }\n\n  AppContainer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {\n    if (prevState.generation !== get()) {\n      // Hot reload is happening.\n      return {\n        error: null,\n        generation: get()\n      };\n    }\n    return null;\n  };\n\n  AppContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(prevProps, prevState) {\n    // Don't update the component if the state had an error and still has one.\n    // This allows to break an infinite loop of error -> render -> error -> render\n    // https://github.com/gaearon/react-hot-loader/issues/696\n    if (prevState.error && this.state.error) {\n      return false;\n    }\n\n    return true;\n  };\n\n  AppContainer.prototype.componentDidCatch = function componentDidCatch(error) {\n    logger.error(error);\n    this.setState({ error: error });\n  };\n\n  AppContainer.prototype.render = function render() {\n    var error = this.state.error;\n\n\n    if (this.props.errorReporter && error) {\n      return React__default.createElement(this.props.errorReporter, { error: error });\n    }\n\n    return React__default.Children.only(this.props.children);\n  };\n\n  return AppContainer;\n}(React__default.Component);\n\nAppContainer.propTypes = {\n  children: function children(props) {\n    if (React__default.Children.count(props.children) !== 1) {\n      return new Error('Invalid prop \"children\" supplied to AppContainer. ' + 'Expected a single React element with your app’s root component, e.g. <App />.');\n    }\n\n    return undefined;\n  },\n\n  errorReporter: PropTypes.oneOfType([PropTypes.node, PropTypes.func])\n};\n\nreactLifecyclesCompat.polyfill(AppContainer);\n\nvar openedModules = {};\n\nvar hotModules = {};\n\nvar createHotModule = function createHotModule() {\n  return { instances: [], updateTimeout: 0 };\n};\n\nvar hotModule = function hotModule(moduleId) {\n  if (!hotModules[moduleId]) {\n    hotModules[moduleId] = createHotModule();\n  }\n  return hotModules[moduleId];\n};\n\nvar isOpened = function isOpened(sourceModule) {\n  return sourceModule && !!openedModules[sourceModule.id];\n};\n\nvar enter = function enter(sourceModule) {\n  if (sourceModule && sourceModule.id) {\n    openedModules[sourceModule.id] = true;\n  } else {\n    logger.warn('React-hot-loader: no `module` variable found. Do you shadow system variable?');\n  }\n};\n\nvar leave = function leave(sourceModule) {\n  if (sourceModule && sourceModule.id) {\n    delete openedModules[sourceModule.id];\n  }\n};\n\n/* eslint-disable camelcase, no-undef */\nvar requireIndirect =  true ? __webpack_require__ : undefined;\n/* eslint-enable */\n\nvar createHoc = function createHoc(SourceComponent, TargetComponent) {\n  hoistNonReactStatic(TargetComponent, SourceComponent);\n  TargetComponent.displayName = 'HotExported' + getComponentDisplayName(SourceComponent);\n  return TargetComponent;\n};\n\nvar makeHotExport = function makeHotExport(sourceModule) {\n  var updateInstances = function updateInstances() {\n    var module = hotModule(sourceModule.id);\n    clearTimeout(module.updateTimeout);\n    module.updateTimeout = setTimeout(function () {\n      try {\n        requireIndirect(sourceModule.id);\n      } catch (e) {\n        // just swallow\n      }\n      module.instances.forEach(function (inst) {\n        return inst.forceUpdate();\n      });\n    });\n  };\n\n  if (sourceModule.hot) {\n    // Mark as self-accepted for Webpack\n    // Update instances for Parcel\n    sourceModule.hot.accept(updateInstances);\n\n    // Webpack way\n    if (sourceModule.hot.addStatusHandler) {\n      if (sourceModule.hot.status() === 'idle') {\n        sourceModule.hot.addStatusHandler(function (status) {\n          if (status === 'apply') {\n            updateInstances();\n          }\n        });\n      }\n    }\n  }\n};\n\nvar hot = function hot(sourceModule) {\n  if (!sourceModule || !sourceModule.id) {\n    // this is fatal\n    throw new Error('React-hot-loader: `hot` could not find the `id` property in the `module` you have provided');\n  }\n  var moduleId = sourceModule.id;\n  var module = hotModule(moduleId);\n  makeHotExport(sourceModule);\n\n  // TODO: Ensure that all exports from this file are react components.\n\n  return function (WrappedComponent) {\n    // register proxy for wrapped component\n    reactHotLoader.register(WrappedComponent, getComponentDisplayName(WrappedComponent), 'RHL' + moduleId);\n\n    return createHoc(WrappedComponent, function (_Component) {\n      inherits(ExportedComponent, _Component);\n\n      function ExportedComponent() {\n        classCallCheck(this, ExportedComponent);\n        return possibleConstructorReturn(this, _Component.apply(this, arguments));\n      }\n\n      ExportedComponent.prototype.componentDidMount = function componentDidMount() {\n        module.instances.push(this);\n      };\n\n      ExportedComponent.prototype.componentWillUnmount = function componentWillUnmount() {\n        var _this2 = this;\n\n        if (isOpened(sourceModule)) {\n          var componentName = getComponentDisplayName(WrappedComponent);\n          logger.error('React-hot-loader: Detected AppContainer unmount on module \\'' + moduleId + '\\' update.\\n' + ('Did you use \"hot(' + componentName + ')\" and \"ReactDOM.render()\" in the same file?\\n') + ('\"hot(' + componentName + ')\" shall only be used as export.\\n') + 'Please refer to \"Getting Started\" (https://github.com/gaearon/react-hot-loader/).');\n        }\n        module.instances = module.instances.filter(function (a) {\n          return a !== _this2;\n        });\n      };\n\n      ExportedComponent.prototype.render = function render() {\n        return React__default.createElement(\n          AppContainer,\n          null,\n          React__default.createElement(WrappedComponent, this.props)\n        );\n      };\n\n      return ExportedComponent;\n    }(React.Component));\n  };\n};\n\nvar getProxyOrType = function getProxyOrType(type) {\n  var proxy = getProxyByType(type);\n  return proxy ? proxy.get() : type;\n};\n\nvar areComponentsEqual = function areComponentsEqual(a, b) {\n  return getProxyOrType(a) === getProxyOrType(b);\n};\n\nvar setConfig = function setConfig(config) {\n  return Object.assign(configuration, config);\n};\n\nreactHotLoader.patch(React__default);\n\nexports.default = reactHotLoader;\nexports.AppContainer = AppContainer;\nexports.hot = hot;\nexports.enterModule = enter;\nexports.leaveModule = leave;\nexports.areComponentsEqual = areComponentsEqual;\nexports.setConfig = setConfig;\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/dist/react-hot-loader.development.js?");

/***/ }),

/***/ "./node_modules/react-hot-loader/index.js":
/*!************************************************!*\
  !*** ./node_modules/react-hot-loader/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.development.js */ \"./node_modules/react-hot-loader/dist/react-hot-loader.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/index.js?");

/***/ }),

/***/ "./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js ***!
  \****************************************************************************/
/*! exports provided: polyfill */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyfill\", function() { return polyfill; });\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nfunction componentWillMount() {\n  // Call this.constructor.gDSFP to support sub-classes.\n  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);\n  if (state !== null && state !== undefined) {\n    this.setState(state);\n  }\n}\n\nfunction componentWillReceiveProps(nextProps) {\n  // Call this.constructor.gDSFP to support sub-classes.\n  var state = this.constructor.getDerivedStateFromProps(nextProps, this.state);\n  if (state !== null && state !== undefined) {\n    this.setState(state);\n  }\n}\n\nfunction componentWillUpdate(nextProps, nextState) {\n  try {\n    var prevProps = this.props;\n    var prevState = this.state;\n    this.props = nextProps;\n    this.state = nextState;\n    this.__reactInternalSnapshotFlag = true;\n    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(\n      prevProps,\n      prevState\n    );\n  } finally {\n    this.props = prevProps;\n    this.state = prevState;\n  }\n}\n\n// React may warn about cWM/cWRP/cWU methods being deprecated.\n// Add a flag to suppress these warnings for this special case.\ncomponentWillMount.__suppressDeprecationWarning = true;\ncomponentWillReceiveProps.__suppressDeprecationWarning = true;\ncomponentWillUpdate.__suppressDeprecationWarning = true;\n\nfunction polyfill(Component) {\n  var prototype = Component.prototype;\n\n  if (!prototype || !prototype.isReactComponent) {\n    throw new Error('Can only polyfill class components');\n  }\n\n  if (\n    typeof Component.getDerivedStateFromProps !== 'function' &&\n    typeof prototype.getSnapshotBeforeUpdate !== 'function'\n  ) {\n    return Component;\n  }\n\n  // If new component APIs are defined, \"unsafe\" lifecycles won't be called.\n  // Error if any of these lifecycles are present,\n  // Because they would work differently between older and newer (16.3+) versions of React.\n  var foundWillMountName = null;\n  var foundWillReceivePropsName = null;\n  var foundWillUpdateName = null;\n  if (typeof prototype.componentWillMount === 'function') {\n    foundWillMountName = 'componentWillMount';\n  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {\n    foundWillMountName = 'UNSAFE_componentWillMount';\n  }\n  if (typeof prototype.componentWillReceiveProps === 'function') {\n    foundWillReceivePropsName = 'componentWillReceiveProps';\n  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {\n    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';\n  }\n  if (typeof prototype.componentWillUpdate === 'function') {\n    foundWillUpdateName = 'componentWillUpdate';\n  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {\n    foundWillUpdateName = 'UNSAFE_componentWillUpdate';\n  }\n  if (\n    foundWillMountName !== null ||\n    foundWillReceivePropsName !== null ||\n    foundWillUpdateName !== null\n  ) {\n    var componentName = Component.displayName || Component.name;\n    var newApiName =\n      typeof Component.getDerivedStateFromProps === 'function'\n        ? 'getDerivedStateFromProps()'\n        : 'getSnapshotBeforeUpdate()';\n\n    throw Error(\n      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +\n        componentName +\n        ' uses ' +\n        newApiName +\n        ' but also contains the following legacy lifecycles:' +\n        (foundWillMountName !== null ? '\\n  ' + foundWillMountName : '') +\n        (foundWillReceivePropsName !== null\n          ? '\\n  ' + foundWillReceivePropsName\n          : '') +\n        (foundWillUpdateName !== null ? '\\n  ' + foundWillUpdateName : '') +\n        '\\n\\nThe above lifecycles should be removed. Learn more about this warning here:\\n' +\n        'https://fb.me/react-async-component-lifecycle-hooks'\n    );\n  }\n\n  // React <= 16.2 does not support static getDerivedStateFromProps.\n  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.\n  // Newer versions of React will ignore these lifecycles if gDSFP exists.\n  if (typeof Component.getDerivedStateFromProps === 'function') {\n    prototype.componentWillMount = componentWillMount;\n    prototype.componentWillReceiveProps = componentWillReceiveProps;\n  }\n\n  // React <= 16.2 does not support getSnapshotBeforeUpdate.\n  // As a workaround, use cWU to invoke the new lifecycle.\n  // Newer versions of React will ignore that lifecycle if gSBU exists.\n  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {\n    if (typeof prototype.componentDidUpdate !== 'function') {\n      throw new Error(\n        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'\n      );\n    }\n\n    prototype.componentWillUpdate = componentWillUpdate;\n\n    var componentDidUpdate = prototype.componentDidUpdate;\n\n    prototype.componentDidUpdate = function componentDidUpdatePolyfill(\n      prevProps,\n      prevState,\n      maybeSnapshot\n    ) {\n      // 16.3+ will not execute our will-update method;\n      // It will pass a snapshot value to did-update though.\n      // Older versions will require our polyfilled will-update value.\n      // We need to handle both cases, but can't just check for the presence of \"maybeSnapshot\",\n      // Because for <= 15.x versions this might be a \"prevContext\" object.\n      // We also can't just check \"__reactInternalSnapshot\",\n      // Because get-snapshot might return a falsy value.\n      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.\n      var snapshot = this.__reactInternalSnapshotFlag\n        ? this.__reactInternalSnapshot\n        : maybeSnapshot;\n\n      componentDidUpdate.call(this, prevProps, prevState, snapshot);\n    };\n  }\n\n  return Component;\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js?");

/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/*!********************************************!*\
  !*** ./node_modules/shallowequal/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function shallowEqual(objA, objB, compare, compareContext) {\n\n    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;\n\n    if(ret !== void 0) {\n        return !!ret;\n    }\n\n    if(objA === objB) {\n        return true;\n    }\n\n    if(typeof objA !== 'object' || !objA ||\n       typeof objB !== 'object' || !objB) {\n        return false;\n    }\n\n    var keysA = Object.keys(objA);\n    var keysB = Object.keys(objB);\n\n    if(keysA.length !== keysB.length) {\n        return false;\n    }\n\n    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);\n\n    // Test for A's keys different from B.\n    for(var idx = 0; idx < keysA.length; idx++) {\n\n        var key = keysA[idx];\n\n        if(!bHasOwnProperty(key)) {\n            return false;\n        }\n\n        var valueA = objA[key];\n        var valueB = objB[key];\n\n        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;\n\n        if(ret === false ||\n           ret === void 0 && valueA !== valueB) {\n            return false;\n        }\n\n    }\n\n    return true;\n\n};\n\n\n//# sourceURL=webpack:///./node_modules/shallowequal/index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function() {\r\n\tthrow new Error(\"define cannot be used indirect\");\r\n};\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/amd-define.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */\r\nmodule.exports = __webpack_amd_options__;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, {}))\n\n//# sourceURL=webpack:///(webpack)/buildin/amd-options.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n\nvar _Dashboard = __webpack_require__(/*! ./impact/Dashboard */ \"./src/impact/Dashboard.js\");\n\nvar _Dashboard2 = _interopRequireDefault(_Dashboard);\n\nvar _Dashboard3 = __webpack_require__(/*! ./team/Dashboard */ \"./src/team/Dashboard.js\");\n\nvar _Dashboard4 = _interopRequireDefault(_Dashboard3);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n    var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n    enterModule && enterModule(module);\n})();\n\nvar App = function App() {\n    return _react2.default.createElement(\n        \"div\",\n        { className: \"expz-ots 12\" },\n        _react2.default.createElement(_Dashboard2.default, null),\n        _react2.default.createElement(_Dashboard4.default, null)\n    );\n};\n\nvar _default = (0, _reactHotLoader.hot)(module)(App);\n\nexports.default = _default;\n;\n\n(function () {\n    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n    var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n    if (!reactHotLoader) {\n        return;\n    }\n\n    reactHotLoader.register(App, \"App\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/App.js\");\n    reactHotLoader.register(_default, \"default\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/App.js\");\n    leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _App = __webpack_require__(/*! ./App */ \"./src/App.js\");\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n    var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n    enterModule && enterModule(module);\n})();\n\nfunction renderBySelector(selector) {\n\n    var container = document.querySelector(selector);\n    if (!container) {\n        throw new Error(\"No container found: \" + selector);\n    }\n    (0, _reactDom.render)(_react2.default.createElement(_App2.default, null), container);\n}\n\ndocument.body.dispatchEvent(new CustomEvent(\"OTS.ready\", {\n\n    detail: { render: renderBySelector },\n    bubbles: true\n\n}));\n;\n\n(function () {\n    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n    var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n    if (!reactHotLoader) {\n        return;\n    }\n\n    reactHotLoader.register(renderBySelector, \"renderBySelector\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/client.js\");\n    leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/client.js?");

/***/ }),

/***/ "./src/impact/Dashboard.js":
/*!*********************************!*\
  !*** ./src/impact/Dashboard.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n    var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n    enterModule && enterModule(module);\n})();\n\nvar Dashboard = function Dashboard() {\n    return _react2.default.createElement(\n        \"article\",\n        { className: \"impact-dashboard\" },\n        _react2.default.createElement(\n            \"h2\",\n            null,\n            \"Impact assessments\"\n        )\n    );\n};\n\nvar _default = Dashboard;\nexports.default = _default;\n;\n\n(function () {\n    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n    var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n    if (!reactHotLoader) {\n        return;\n    }\n\n    reactHotLoader.register(Dashboard, \"Dashboard\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/impact/Dashboard.js\");\n    reactHotLoader.register(_default, \"default\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/impact/Dashboard.js\");\n    leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/impact/Dashboard.js?");

/***/ }),

/***/ "./src/team/Dashboard.js":
/*!*******************************!*\
  !*** ./src/team/Dashboard.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n    var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n    enterModule && enterModule(module);\n})();\n\nvar Dashboard = function Dashboard() {\n    return _react2.default.createElement(\n        \"article\",\n        { className: \"team-dashboard\" },\n        _react2.default.createElement(\n            \"h2\",\n            null,\n            \"Team performancess\"\n        )\n    );\n};\n\nvar _default = Dashboard;\nexports.default = _default;\n;\n\n(function () {\n    var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n    var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n    if (!reactHotLoader) {\n        return;\n    }\n\n    reactHotLoader.register(Dashboard, \"Dashboard\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/team/Dashboard.js\");\n    reactHotLoader.register(_default, \"default\", \"/Users/andrewgibson/Dropbox/OpenTeamSpace/experimenz.ots/app/src/team/Dashboard.js\");\n    leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/team/Dashboard.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });