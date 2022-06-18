/*
 * Copyright (C) 2011 Google Inc.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#pragma once

#include "ContextDestructionObserver.h"
#include "EventTarget.h"
#include "ExceptionOr.h"
#include <wtf/URL.h>
#include <wtf/HashSet.h>
#include <wtf/Lock.h>

#include "WebSocketStream.h"

namespace JSC {
class ArrayBuffer;
class ArrayBufferView;
}

namespace WebCore {

// class Blob;
class WebSocket final : public RefCounted<WebSocket>, public EventTargetWithInlineData, public ContextDestructionObserver {
    WTF_MAKE_ISO_ALLOCATED(WebSocket);
    friend struct uWS::WebSocket<false, false, WebSocket*>;
    friend struct uWS::WebSocket<false, true, WebSocket*>;
    friend struct uWS::WebSocket<true, false, WebSocket*>;
    friend struct uWS::WebSocket<true, true, WebSocket*>;
    friend WebCore::WebSocketStream;
    friend WebCore::SecureWebSocketStream;
    friend WebCore::ServerWebSocketStream;
    friend WebCore::ServerSecureWebSocketStream;

public:
    static ASCIILiteral subprotocolSeparator();

    static ExceptionOr<Ref<WebSocket>> create(ScriptExecutionContext&, const String& url);
    static ExceptionOr<Ref<WebSocket>> create(ScriptExecutionContext&, const String& url, const String& protocol);
    static ExceptionOr<Ref<WebSocket>> create(ScriptExecutionContext&, const String& url, const Vector<String>& protocols);
    ~WebSocket();

    enum State {
        CONNECTING = 0,
        OPEN = 1,
        CLOSING = 2,
        CLOSED = 3
    };

    ExceptionOr<void> connect(const String& url);
    ExceptionOr<void> connect(const String& url, const String& protocol);
    ExceptionOr<void> connect(const String& url, const Vector<String>& protocols);

    ExceptionOr<void> send(const String& message);
    ExceptionOr<void> send(JSC::ArrayBuffer&);
    ExceptionOr<void> send(JSC::ArrayBufferView&);
    // ExceptionOr<void> send(Blob&);

    ExceptionOr<void> close(std::optional<unsigned short> code, const String& reason);

    WebSocketStream* channel() const;

    const URL& url() const;
    State readyState() const;
    unsigned bufferedAmount() const;

    String protocol() const;
    String extensions() const;

    String binaryType() const;
    ExceptionOr<void> setBinaryType(const String&);

    ScriptExecutionContext* scriptExecutionContext() const final;

    using RefCounted::deref;
    using RefCounted::ref;

private:
    typedef union AnyWebSocket {
        uWS::WebSocket<false, false, WebSocket*>* client;
        uWS::WebSocket<false, true, WebSocket*>* clientSSL;
        uWS::WebSocket<true, false, WebSocket*>* server;
        uWS::WebSocket<true, true, WebSocket*>* serverSSL;
    } AnyWebSocket;
    enum ConnectedWebSocketKind {
        None,
        Client,
        ClientSSL,
        Server,
        ServerSSL
    };

    explicit WebSocket(ScriptExecutionContext&);

    void dispatchErrorEventIfNeeded();

    // void contextDestroyed() final;
    // void suspend(ReasonForSuspension) final;
    // void resume() final;
    // void stop() final;
    // const char* activeDOMObjectName() const final;

    EventTargetInterface eventTargetInterface() const final;

    void refEventTarget() final { ref(); }
    void derefEventTarget() final { deref(); }

    void didConnect();
    void didReceiveMessage(String&& message);
    void didReceiveData(const char* data, size_t length);
    void didReceiveBinaryData(Vector<uint8_t>&&);
    void didReceiveMessageError(String&& reason);
    void didUpdateBufferedAmount(unsigned bufferedAmount);
    void didStartClosingHandshake();
    void didClose(unsigned unhandledBufferedAmount, ClosingHandshakeCompletionStatus, unsigned short code, const String& reason);
    void didConnect(us_socket_t* socket, char* bufferedData, size_t bufferedDataSize);
    void didFailToConnect(int32_t code);
    void sendWebSocketData(const char* data, size_t length);

    void failAsynchronously();

    enum class BinaryType { Blob,
        ArrayBuffer };

    WebSocketStream* m_channel { nullptr };

    State m_state { CONNECTING };
    URL m_url;
    unsigned m_bufferedAmount { 0 };
    unsigned m_bufferedAmountAfterClose { 0 };
    BinaryType m_binaryType { BinaryType::ArrayBuffer };
    String m_subprotocol;
    String m_extensions;
    void* m_upgradeClient { nullptr };
    bool m_isSecure { false };
    AnyWebSocket m_connectedWebSocket { nullptr };
    ConnectedWebSocketKind m_connectedWebSocketKind { ConnectedWebSocketKind::None };

    bool m_dispatchedErrorEvent { false };
    // RefPtr<PendingActivity<WebSocket>> m_pendingActivity;
};

} // namespace WebCore
