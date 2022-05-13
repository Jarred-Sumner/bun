/*
 * Copyright 2022 Codeblog Corp. All rights reserved.
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
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// ^ that comment is required or the builtins generator will have a fit.


function from(items) {
  "use strict";

  if (!@isConstructor(this))
        @throwTypeError("Buffer.from requires |this| to be a constructor");


    if (typeof items === 'string') {
        switch (@argumentCount()) {
            case 1: {
                return new this(items);
            }
            case 2: {
                return new this(items, @argument(1));
            }
            default: {
                return new this(items, @argument(1), @argument(2));
            }
        }
    }


    var arrayLike = @toObject(items, "Buffer.from requires an array-like object - not null or undefined");

    // Buffer-specific fast path: 
    // - uninitialized memory
    // - use .set
    if (@isTypedArrayView(arrayLike)) {
        var length = @typedArrayLength(arrayLike);
        var result = this.allocUnsafe(length);
        result.set(arrayLike);
        return result;
    } else if (arrayLike instanceof ArrayBuffer || arrayLike instanceof SharedArrayBuffer) {
        var out;
        switch (@argumentCount()) {
            case 1: {
                out = new @Uint8Array(arrayLike);
                break;
            }
            case 2: {
                out = @Uint8Array(items, @argument(1));
                break;
            }
            default: {
                out = @Uint8Array(items, @argument(1), @argument(2));
                break;
            }
        }
        
        this.toBuffer(out);
        return out;
    }

    return @tailCallForwardArguments(@Uint8Array.from, this);
}
