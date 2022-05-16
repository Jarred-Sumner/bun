/*
 * Copyright (c) 2016 Apple Inc. All rights reserved.
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
#include "JSBufferConstructorBuiltins.h"

#include "WebCoreJSClientData.h"
#include <JavaScriptCore/HeapInlines.h>
#include <JavaScriptCore/IdentifierInlines.h>
#include <JavaScriptCore/Intrinsic.h>
#include <JavaScriptCore/JSCJSValueInlines.h>
#include <JavaScriptCore/JSCellInlines.h>
#include <JavaScriptCore/StructureInlines.h>
#include <JavaScriptCore/VM.h>

namespace WebCore {

const JSC::ConstructAbility s_jsBufferConstructorFromCodeConstructAbility = JSC::ConstructAbility::CannotConstruct;
const JSC::ConstructorKind s_jsBufferConstructorFromCodeConstructorKind = JSC::ConstructorKind::None;
const int s_jsBufferConstructorFromCodeLength = 931;
static const JSC::Intrinsic s_jsBufferConstructorFromCodeIntrinsic = JSC::NoIntrinsic;
const char* const s_jsBufferConstructorFromCode =
    "(function (items) {\n" \
    "  \"use strict\";\n" \
    "\n" \
    "  if (!@isConstructor(this))\n" \
    "        @throwTypeError(\"Buffer.from requires |this| to be a constructor\");\n" \
    "\n" \
    "\n" \
    "    if (typeof items === 'string' || @ArrayBuffer.@isView(items)) {\n" \
    "        switch (@argumentCount()) {\n" \
    "            case 1: {\n" \
    "                return new this(items);\n" \
    "            }\n" \
    "            case 2: {\n" \
    "                return new this(items, @argument(1));\n" \
    "            }\n" \
    "            default: {\n" \
    "                return new this(items, @argument(1), @argument(2));\n" \
    "            }\n" \
    "        }\n" \
    "    }\n" \
    "\n" \
    "\n" \
    "    var arrayLike = @toObject(items, \"Buffer.from requires an array-like object - not null or undefined\");\n" \
    "\n" \
    "    //\n" \
    "    //\n" \
    "    //\n" \
    "    if (@isTypedArrayView(arrayLike)) {\n" \
    "        var length = @typedArrayLength(arrayLike);\n" \
    "        var result = this.allocUnsafe(length);\n" \
    "        result.set(arrayLike);\n" \
    "        return result;\n" \
    "    } \n" \
    "\n" \
    "    return @tailCallForwardArguments(@Uint8Array.from, this);\n" \
    "})\n" \
;


#define DEFINE_BUILTIN_GENERATOR(codeName, functionName, overriddenName, argumentCount) \
JSC::FunctionExecutable* codeName##Generator(JSC::VM& vm) \
{\
    JSVMClientData* clientData = static_cast<JSVMClientData*>(vm.clientData); \
    return clientData->builtinFunctions().jsBufferConstructorBuiltins().codeName##Executable()->link(vm, nullptr, clientData->builtinFunctions().jsBufferConstructorBuiltins().codeName##Source(), std::nullopt, s_##codeName##Intrinsic); \
}
WEBCORE_FOREACH_JSBUFFERCONSTRUCTOR_BUILTIN_CODE(DEFINE_BUILTIN_GENERATOR)
#undef DEFINE_BUILTIN_GENERATOR


} // namespace WebCore
