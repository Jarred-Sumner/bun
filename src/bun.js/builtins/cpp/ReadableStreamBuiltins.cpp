/*
 * Copyright (c) 2015 Igalia
 * Copyright (c) 2015 Igalia S.L.
 * Copyright (c) 2015 Igalia.
 * Copyright (c) 2015, 2016 Canon Inc. All rights reserved.
 * Copyright (c) 2015, 2016, 2017 Canon Inc.
 * Copyright (c) 2016, 2020 Apple Inc. All rights reserved.
 * Copyright (c) 2022 Codeblog Corp. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */

// DO NOT EDIT THIS FILE. It is automatically generated from JavaScript files for
// builtins by the script: Source/JavaScriptCore/Scripts/generate-js-builtins.py

#include "config.h"
#include "ReadableStreamBuiltins.h"

#include "WebCoreJSClientData.h"
#include <JavaScriptCore/HeapInlines.h>
#include <JavaScriptCore/IdentifierInlines.h>
#include <JavaScriptCore/Intrinsic.h>
#include <JavaScriptCore/JSCJSValueInlines.h>
#include <JavaScriptCore/JSCellInlines.h>
#include <JavaScriptCore/StructureInlines.h>
#include <JavaScriptCore/VM.h>

namespace WebCore {

const JSC::ConstructAbility s_readableStreamInitializeReadableStreamCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamInitializeReadableStreamCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamInitializeReadableStreamCodeLength = 2783;
static const JSC::Intrinsic s_readableStreamInitializeReadableStreamCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamInitializeReadableStreamCode =
    "(function (underlyingSource, strategy)\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "     if (underlyingSource === @undefined)\n" \
    "         underlyingSource = { @bunNativeType: 0, @bunNativePtr: 0, @lazy: false };\n" \
    "     if (strategy === @undefined)\n" \
    "         strategy = { };\n" \
    "\n" \
    "    if (!@isObject(underlyingSource))\n" \
    "        @throwTypeError(\"ReadableStream constructor takes an object as first argument\");\n" \
    "\n" \
    "    if (strategy !== @undefined && !@isObject(strategy))\n" \
    "        @throwTypeError(\"ReadableStream constructor takes an object as second argument, if any\");\n" \
    "\n" \
    "    @putByIdDirectPrivate(this, \"state\", @streamReadable);\n" \
    "    \n" \
    "    @putByIdDirectPrivate(this, \"reader\", @undefined);\n" \
    "    \n" \
    "    @putByIdDirectPrivate(this, \"storedError\", @undefined);\n" \
    "    \n" \
    "    @putByIdDirectPrivate(this, \"disturbed\", false);\n" \
    "    \n" \
    "    //\n" \
    "    @putByIdDirectPrivate(this, \"readableStreamController\", null);\n" \
    "    @putByIdDirectPrivate(this, \"bunNativeType\", @getByIdDirectPrivate(underlyingSource, \"bunNativeType\") ?? 0);\n" \
    "    @putByIdDirectPrivate(this, \"bunNativePtr\", @getByIdDirectPrivate(underlyingSource, \"bunNativePtr\") ?? 0);\n" \
    "\n" \
    "    const isDirect = underlyingSource.type === \"direct\";\n" \
    "    //\n" \
    "    const isUnderlyingSourceLazy = !!underlyingSource.@lazy;\n" \
    "    const isLazy = isDirect || isUnderlyingSourceLazy;\n" \
    "    \n" \
    "    //\n" \
    "    //\n" \
    "    if (@getByIdDirectPrivate(underlyingSource, \"pull\") !== @undefined && !isLazy) {\n" \
    "        const size = @getByIdDirectPrivate(strategy, \"size\");\n" \
    "        const highWaterMark = @getByIdDirectPrivate(strategy, \"highWaterMark\");\n" \
    "        @putByIdDirectPrivate(this, \"underlyingSource\", @undefined);\n" \
    "        @setupReadableStreamDefaultController(this, underlyingSource, size, highWaterMark !== @undefined ? highWaterMark : 1, @getByIdDirectPrivate(underlyingSource, \"start\"), @getByIdDirectPrivate(underlyingSource, \"pull\"), @getByIdDirectPrivate(underlyingSource, \"cancel\"));\n" \
    "        \n" \
    "        return this;\n" \
    "    }\n" \
    "    if (isDirect) {\n" \
    "        @putByIdDirectPrivate(this, \"underlyingSource\", underlyingSource);\n" \
    "        @putByIdDirectPrivate(this, \"start\", () => @createReadableStreamController(this, underlyingSource, strategy));\n" \
    "    } else if (isLazy) {\n" \
    "        const autoAllocateChunkSize = underlyingSource.autoAllocateChunkSize;\n" \
    "        @putByIdDirectPrivate(this, \"underlyingSource\", @undefined);\n" \
    "\n" \
    "        \n" \
    "        @putByIdDirectPrivate(this, \"start\", () => {\n" \
    "            const instance = @lazyLoadStream(this, autoAllocateChunkSize);\n" \
    "            if (instance) {\n" \
    "                @createReadableStreamController(this, instance, strategy);\n" \
    "            }\n" \
    "        });\n" \
    "    } else {\n" \
    "        @putByIdDirectPrivate(this, \"underlyingSource\", @undefined);\n" \
    "        @putByIdDirectPrivate(this, \"start\", @undefined);\n" \
    "        @createReadableStreamController(this, underlyingSource, strategy);\n" \
    "    }\n" \
    "    \n" \
    "\n" \
    "    return this;\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamReadableStreamToArrayCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamReadableStreamToArrayCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamReadableStreamToArrayCodeLength = 883;
static const JSC::Intrinsic s_readableStreamReadableStreamToArrayCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamReadableStreamToArrayCode =
    "(function (stream) {\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    if (!stream || @getByIdDirectPrivate(stream, \"state\") === @streamClosed) {\n" \
    "        return null;\n" \
    "    }\n" \
    "    var reader = stream.getReader();\n" \
    "    var manyResult = reader.readMany();\n" \
    "    \n" \
    "    async function processManyResult(result) {\n" \
    "        \n" \
    "        if (result.done) {\n" \
    "            return null;\n" \
    "        }\n" \
    "\n" \
    "        var chunks = result.value || [];\n" \
    "        \n" \
    "        while (true) {\n" \
    "            var thisResult = await reader.read();\n" \
    "            \n" \
    "            if (thisResult.done) {\n" \
    "                return chunks;\n" \
    "            }\n" \
    "            \n" \
    "            chunks.push(thisResult.value);\n" \
    "        }\n" \
    "\n" \
    "        return chunks;\n" \
    "    };\n" \
    "\n" \
    "\n" \
    "    if (manyResult && @isPromise(manyResult)) {\n" \
    "        return manyResult.@then(processManyResult);\n" \
    "    }\n" \
    "\n" \
    "    if (manyResult && manyResult.done) {\n" \
    "        return null;\n" \
    "    }\n" \
    "\n" \
    "    return processManyResult(manyResult);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamReadableStreamToTextCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamReadableStreamToTextCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamReadableStreamToTextCodeLength = 1080;
static const JSC::Intrinsic s_readableStreamReadableStreamToTextCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamReadableStreamToTextCode =
    "(function (stream) {\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    //\n" \
    "    var underlyingSource = @getByIdDirectPrivate(stream, \"underlyingSource\");\n" \
    "    if (underlyingSource !== @undefined) {\n" \
    "       \n" \
    "        const promise = @initializeTextStream.@call(stream, underlyingSource, @undefined);\n" \
    "        var reader = stream.getReader();\n" \
    "        return (async function() {\n" \
    "            while (@getByIdDirectPrivate(stream, \"state\") === @streamReadable) {\n" \
    "                var thisResult = await reader.read();\n" \
    "                if (thisResult.done) {\n" \
    "                    break;\n" \
    "                }\n" \
    "            }\n" \
    "\n" \
    "            try {\n" \
    "                reader.releaseLock();\n" \
    "            } catch(e) {\n" \
    "            }\n" \
    "    \n" \
    "            return await promise;\n" \
    "        })();\n" \
    "    }\n" \
    "\n" \
    "    //\n" \
    "    var toArrayBuffer = globalThis.Bun.readableStreamToArrayBuffer(stream);\n" \
    "    if (toArrayBuffer && @isPromise(toArrayBuffer)) {\n" \
    "        return toArrayBuffer.@then(function(arrayBuffer) {\n" \
    "            return new globalThis.TextDecoder().decode(arrayBuffer);\n" \
    "        });\n" \
    "    }\n" \
    "\n" \
    "    return new globalThis.TextDecoder().decode(arrayBuffer);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamReadableStreamToJSONCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamReadableStreamToJSONCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamReadableStreamToJSONCodeLength = 121;
static const JSC::Intrinsic s_readableStreamReadableStreamToJSONCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamReadableStreamToJSONCode =
    "(function (stream) {\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    //\n" \
    "    return @readableStreamToText(stream).@then(globalThis.JSON.parse);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamReadableStreamToBlobCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamReadableStreamToBlobCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamReadableStreamToBlobCodeLength = 834;
static const JSC::Intrinsic s_readableStreamReadableStreamToBlobCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamReadableStreamToBlobCode =
    "(function (stream) {\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    var underlyingSource = @getByIdDirectPrivate(stream, \"underlyingSource\");\n" \
    "    if (underlyingSource != @undefined) {\n" \
    "        var toArrayBuffer = globalThis.Bun.readableStreamToArrayBuffer(stream);\n" \
    "        if (toArrayBuffer && @isPromise(toArrayBuffer)) {\n" \
    "            return toArrayBuffer.@then(function(arrayBuffer) {\n" \
    "                return new globalThis.Blob([arrayBuffer]);\n" \
    "            });\n" \
    "        }\n" \
    "\n" \
    "        return new globalThis.Blob([toArrayBuffer]);\n" \
    "    }\n" \
    "\n" \
    " \n" \
    "    const array = @readableStreamToArray(stream);\n" \
    "    if (array === null) {\n" \
    "        return new globalThis.Blob();\n" \
    "    }\n" \
    "\n" \
    "    return array.@then(function(chunks) {\n" \
    "        if (chunks === null || chunks.length === 0) {\n" \
    "            return new globalThis.Blob();\n" \
    "        }\n" \
    "\n" \
    "        return new globalThis.Blob(chunks);\n" \
    "    });\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamReadableStreamToArrayPublicCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamReadableStreamToArrayPublicCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamReadableStreamToArrayPublicCodeLength = 841;
static const JSC::Intrinsic s_readableStreamReadableStreamToArrayPublicCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamReadableStreamToArrayPublicCode =
    "(function (stream) {\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    if (@getByIdDirectPrivate(stream, \"state\") === @streamClosed) {\n" \
    "        return [];\n" \
    "    }\n" \
    "    var reader = stream.getReader();\n" \
    "\n" \
    "    var manyResult = reader.readMany();\n" \
    "\n" \
    "    var processManyResult = (0, (async function(result) {\n" \
    "        if (result.done) {\n" \
    "            return [];\n" \
    "        }\n" \
    "\n" \
    "        var chunks = result.value || [];\n" \
    "        \n" \
    "        while (true) {\n" \
    "            var thisResult = await reader.read();\n" \
    "            if (thisResult.done) {\n" \
    "                return chunks;\n" \
    "            }\n" \
    "\n" \
    "            chunks.push(thisResult.value);\n" \
    "        }\n" \
    "\n" \
    "        return chunks;\n" \
    "    }));\n" \
    "\n" \
    "\n" \
    "    if (manyResult && @isPromise(manyResult)) {\n" \
    "        return manyResult.then(processManyResult);\n" \
    "    }\n" \
    "\n" \
    "    if (manyResult && manyResult.done) {\n" \
    "        return [];\n" \
    "    }\n" \
    "\n" \
    "    return processManyResult(manyResult);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamConsumeReadableStreamCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamConsumeReadableStreamCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamConsumeReadableStreamCodeLength = 3718;
static const JSC::Intrinsic s_readableStreamConsumeReadableStreamCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamConsumeReadableStreamCode =
    "(function (nativePtr, nativeType, inputStream) {\n" \
    "    \"use strict\";\n" \
    "    const symbol = globalThis.Symbol.for(\"Bun.consumeReadableStreamPrototype\");\n" \
    "    var cached =  globalThis[symbol];\n" \
    "    if (!cached) {\n" \
    "        cached = globalThis[symbol] = [];\n" \
    "    }\n" \
    "    var Prototype = cached[nativeType];\n" \
    "    if (Prototype === @undefined) {\n" \
    "        var [doRead, doError, doReadMany, doClose, onClose, deinit] = globalThis[globalThis.Symbol.for(\"Bun.lazy\")](nativeType);\n" \
    "\n" \
    "        Prototype = class NativeReadableStreamSink {\n" \
    "            constructor(reader, ptr) {\n" \
    "                this.#ptr = ptr;\n" \
    "                this.#reader = reader;\n" \
    "                this.#didClose = false;\n" \
    "\n" \
    "                this.handleError = this._handleError.bind(this);\n" \
    "                this.handleClosed = this._handleClosed.bind(this);\n" \
    "                this.processResult = this._processResult.bind(this);\n" \
    "\n" \
    "                reader.closed.then(this.handleClosed, this.handleError);\n" \
    "            }\n" \
    "\n" \
    "            handleError;\n" \
    "            handleClosed;\n" \
    "            _handleClosed() {\n" \
    "                if (this.#didClose) return;\n" \
    "                this.#didClose = true;\n" \
    "                var ptr = this.#ptr;\n" \
    "                this.#ptr = 0;\n" \
    "                doClose(ptr);\n" \
    "                deinit(ptr);\n" \
    "            }\n" \
    "\n" \
    "            _handleError(error) {\n" \
    "                if (this.#didClose) return;\n" \
    "                this.#didClose = true;\n" \
    "                var ptr = this.#ptr;\n" \
    "                this.#ptr = 0;\n" \
    "                doError(ptr, error);\n" \
    "                deinit(ptr);\n" \
    "            }\n" \
    "\n" \
    "            #ptr;\n" \
    "            #didClose = false;\n" \
    "            #reader;\n" \
    "\n" \
    "            _handleReadMany({value, done, size}) {\n" \
    "                if (done) {\n" \
    "                    this.handleClosed();\n" \
    "                    return;\n" \
    "                }\n" \
    "\n" \
    "                if (this.#didClose) return;\n" \
    "               \n" \
    "\n" \
    "                doReadMany(this.#ptr, value, done, size);\n" \
    "            }\n" \
    "        \n" \
    "\n" \
    "            read() {\n" \
    "                if (!this.#ptr) return @throwTypeError(\"ReadableStreamSink is already closed\");\n" \
    "                \n" \
    "                return this.processResult(this.#reader.read());\n" \
    "                \n" \
    "            }\n" \
    "\n" \
    "            _processResult(result) {\n" \
    "                if (result && @isPromise(result)) {\n" \
    "                    const flags = @getPromiseInternalField(result, @promiseFieldFlags);\n" \
    "                    if (flags & @promiseStateFulfilled) {\n" \
    "                        const fulfilledValue = @getPromiseInternalField(result, @promiseFieldReactionsOrResult);\n" \
    "                        if (fulfilledValue) {\n" \
    "                            result = fulfilledValue;\n" \
    "                        }\n" \
    "                    }\n" \
    "                }\n" \
    "\n" \
    "                if (result && @isPromise(result)) {\n" \
    "                    result.then(this.processResult, this.handleError);\n" \
    "                    return null;\n" \
    "                }\n" \
    "\n" \
    "                if (result.done) {\n" \
    "                    this.handleClosed();\n" \
    "                    return 0;\n" \
    "                } else if (result.value) {\n" \
    "                    return result.value;\n" \
    "                }  else {\n" \
    "                    return -1;\n" \
    "                }\n" \
    "            }\n" \
    "\n" \
    "            readMany() {\n" \
    "                if (!this.#ptr) return @throwTypeError(\"ReadableStreamSink is already closed\");\n" \
    "                return this.processResult(this.#reader.readMany());\n" \
    "            }\n" \
    "\n" \
    "            \n" \
    "        };\n" \
    "\n" \
    "        const minlength = nativeType + 1;\n" \
    "        if (cached.length < minlength) {\n" \
    "            cached.length = minlength;\n" \
    "        }\n" \
    "        @putByValDirect(cached, nativeType, Prototype);\n" \
    "    }\n" \
    "\n" \
    "    if (@isReadableStreamLocked(inputStream)) {\n" \
    "        @throwTypeError(\"Cannot start reading from a locked stream\");\n" \
    "    }\n" \
    "\n" \
    "   return new Prototype(inputStream.getReader(), nativePtr);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamCreateEmptyReadableStreamCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamCreateEmptyReadableStreamCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamCreateEmptyReadableStreamCodeLength = 156;
static const JSC::Intrinsic s_readableStreamCreateEmptyReadableStreamCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamCreateEmptyReadableStreamCode =
    "(function () {\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    var stream = new @ReadableStream({\n" \
    "        pull() {},\n" \
    "    });\n" \
    "    @readableStreamClose(stream);\n" \
    "    return stream;\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamCreateNativeReadableStreamCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamCreateNativeReadableStreamCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamCreateNativeReadableStreamCodeLength = 266;
static const JSC::Intrinsic s_readableStreamCreateNativeReadableStreamCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamCreateNativeReadableStreamCode =
    "(function (nativePtr, nativeType, autoAllocateChunkSize) {\n" \
    "    \"use strict\";\n" \
    "    return new @ReadableStream({\n" \
    "        @lazy: true,\n" \
    "        @bunNativeType: nativeType,\n" \
    "        @bunNativePtr: nativePtr,\n" \
    "        autoAllocateChunkSize: autoAllocateChunkSize,\n" \
    "    });\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamCancelCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamCancelCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamCancelCodeLength = 324;
static const JSC::Intrinsic s_readableStreamCancelCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamCancelCode =
    "(function (reason)\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    if (!@isReadableStream(this))\n" \
    "        return @Promise.@reject(@makeThisTypeError(\"ReadableStream\", \"cancel\"));\n" \
    "\n" \
    "    if (@isReadableStreamLocked(this))\n" \
    "        return @Promise.@reject(@makeTypeError(\"ReadableStream is locked\"));\n" \
    "\n" \
    "    return @readableStreamCancel(this, reason);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamGetReaderCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamGetReaderCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamGetReaderCodeLength = 680;
static const JSC::Intrinsic s_readableStreamGetReaderCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamGetReaderCode =
    "(function (options)\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    if (!@isReadableStream(this))\n" \
    "        throw @makeThisTypeError(\"ReadableStream\", \"getReader\");\n" \
    "\n" \
    "    const mode = @toDictionary(options, { }, \"ReadableStream.getReader takes an object as first argument\").mode;\n" \
    "    if (mode === @undefined) {\n" \
    "        var start_ = @getByIdDirectPrivate(this, \"start\");\n" \
    "        if (start_) {\n" \
    "            @putByIdDirectPrivate(this, \"start\", @undefined);\n" \
    "            start_();\n" \
    "        }\n" \
    "        \n" \
    "        return new @ReadableStreamDefaultReader(this);\n" \
    "    }\n" \
    "    //\n" \
    "    if (mode == 'byob') {\n" \
    "        return new @ReadableStreamBYOBReader(this);\n" \
    "    }\n" \
    "\n" \
    "    \n" \
    "    @throwTypeError(\"Invalid mode is specified\");\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamPipeThroughCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamPipeThroughCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamPipeThroughCodeLength = 1485;
static const JSC::Intrinsic s_readableStreamPipeThroughCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamPipeThroughCode =
    "(function (streams, options)\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    const transforms = streams;\n" \
    "\n" \
    "    const readable = transforms[\"readable\"];\n" \
    "    if (!@isReadableStream(readable))\n" \
    "        throw @makeTypeError(\"readable should be ReadableStream\");\n" \
    "\n" \
    "    const writable = transforms[\"writable\"];\n" \
    "    const internalWritable = @getInternalWritableStream(writable);\n" \
    "    if (!@isWritableStream(internalWritable))\n" \
    "        throw @makeTypeError(\"writable should be WritableStream\");\n" \
    "\n" \
    "    let preventClose = false;\n" \
    "    let preventAbort = false;\n" \
    "    let preventCancel = false;\n" \
    "    let signal;\n" \
    "    if (!@isUndefinedOrNull(options)) {\n" \
    "        if (!@isObject(options))\n" \
    "            throw @makeTypeError(\"options must be an object\");\n" \
    "\n" \
    "        preventAbort = !!options[\"preventAbort\"];\n" \
    "        preventCancel = !!options[\"preventCancel\"];\n" \
    "        preventClose = !!options[\"preventClose\"];\n" \
    "\n" \
    "        signal = options[\"signal\"];\n" \
    "        if (signal !== @undefined && !@isAbortSignal(signal))\n" \
    "            throw @makeTypeError(\"options.signal must be AbortSignal\");\n" \
    "    }\n" \
    "\n" \
    "    if (!@isReadableStream(this))\n" \
    "        throw @makeThisTypeError(\"ReadableStream\", \"pipeThrough\");\n" \
    "\n" \
    "    if (@isReadableStreamLocked(this))\n" \
    "        throw @makeTypeError(\"ReadableStream is locked\");\n" \
    "\n" \
    "    if (@isWritableStreamLocked(internalWritable))\n" \
    "        throw @makeTypeError(\"WritableStream is locked\");\n" \
    "\n" \
    "    @readableStreamPipeToWritableStream(this, internalWritable, preventClose, preventAbort, preventCancel, signal);\n" \
    "\n" \
    "    return readable;\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamPipeToCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamPipeToCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamPipeToCodeLength = 1523;
static const JSC::Intrinsic s_readableStreamPipeToCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamPipeToCode =
    "(function (destination)\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    //\n" \
    "    //\n" \
    "    let options = arguments[1];\n" \
    "\n" \
    "    let preventClose = false;\n" \
    "    let preventAbort = false;\n" \
    "    let preventCancel = false;\n" \
    "    let signal;\n" \
    "    if (!@isUndefinedOrNull(options)) {\n" \
    "        if (!@isObject(options))\n" \
    "            return @Promise.@reject(@makeTypeError(\"options must be an object\"));\n" \
    "\n" \
    "        try {\n" \
    "            preventAbort = !!options[\"preventAbort\"];\n" \
    "            preventCancel = !!options[\"preventCancel\"];\n" \
    "            preventClose = !!options[\"preventClose\"];\n" \
    "\n" \
    "            signal = options[\"signal\"];\n" \
    "        } catch(e) {\n" \
    "            return @Promise.@reject(e);\n" \
    "        }\n" \
    "\n" \
    "        if (signal !== @undefined && !@isAbortSignal(signal))\n" \
    "            return @Promise.@reject(@makeTypeError(\"options.signal must be AbortSignal\"));\n" \
    "    }\n" \
    "\n" \
    "    const internalDestination = @getInternalWritableStream(destination);\n" \
    "    if (!@isWritableStream(internalDestination))\n" \
    "        return @Promise.@reject(@makeTypeError(\"ReadableStream pipeTo requires a WritableStream\"));\n" \
    "\n" \
    "    if (!@isReadableStream(this))\n" \
    "        return @Promise.@reject(@makeThisTypeError(\"ReadableStream\", \"pipeTo\"));\n" \
    "\n" \
    "    if (@isReadableStreamLocked(this))\n" \
    "        return @Promise.@reject(@makeTypeError(\"ReadableStream is locked\"));\n" \
    "\n" \
    "    if (@isWritableStreamLocked(internalDestination))\n" \
    "        return @Promise.@reject(@makeTypeError(\"WritableStream is locked\"));\n" \
    "\n" \
    "    return @readableStreamPipeToWritableStream(this, internalDestination, preventClose, preventAbort, preventCancel, signal);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamTeeCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamTeeCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamTeeCodeLength = 175;
static const JSC::Intrinsic s_readableStreamTeeCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamTeeCode =
    "(function ()\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    if (!@isReadableStream(this))\n" \
    "        throw @makeThisTypeError(\"ReadableStream\", \"tee\");\n" \
    "\n" \
    "    return @readableStreamTee(this, false);\n" \
    "})\n" \
;

const JSC::ConstructAbility s_readableStreamLockedCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_readableStreamLockedCodeConstructorKind = JSC::ConstructorKind::None;
const int s_readableStreamLockedCodeLength = 178;
static const JSC::Intrinsic s_readableStreamLockedCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_readableStreamLockedCode =
    "(function ()\n" \
    "{\n" \
    "    \"use strict\";\n" \
    "\n" \
    "    if (!@isReadableStream(this))\n" \
    "        throw @makeGetterTypeError(\"ReadableStream\", \"locked\");\n" \
    "\n" \
    "    return @isReadableStreamLocked(this);\n" \
    "})\n" \
;


#define DEFINE_BUILTIN_GENERATOR(codeName, functionName, overriddenName, argumentCount) \
JSC::FunctionExecutable* codeName##Generator(JSC::VM& vm) \
{\
    JSVMClientData* clientData = static_cast<JSVMClientData*>(vm.clientData); \
    return clientData->builtinFunctions().readableStreamBuiltins().codeName##Executable()->link(vm, nullptr, clientData->builtinFunctions().readableStreamBuiltins().codeName##Source(), std::nullopt, s_##codeName##Intrinsic); \
}
WEBCORE_FOREACH_READABLESTREAM_BUILTIN_CODE(DEFINE_BUILTIN_GENERATOR)
#undef DEFINE_BUILTIN_GENERATOR


} // namespace WebCore
