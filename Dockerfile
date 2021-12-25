FROM ubuntu:20.04 as bun-base-with-args

FROM bun-base-with-args as bun-base

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

WORKDIR ${GITHUB_WORKSPACE}

RUN apt-get update && \
    apt-get install --no-install-recommends -y wget gnupg2 curl lsb-release wget software-properties-common && \
    add-apt-repository ppa:longsleep/golang-backports && \
    wget https://apt.llvm.org/llvm.sh --no-check-certificate && \
    chmod +x llvm.sh && \
    ./llvm.sh 12 && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common \
    cmake \
    build-essential \
    git \
    libssl-dev \
    ruby \
    liblld-12-dev \
    libclang-12-dev \
    nodejs \
    gcc \
    g++ \
    npm \
    clang-12 \
    clang-format-12 \
    libc++-12-dev \
    libc++abi-12-dev \
    lld-12 \
    libicu-dev \
    wget \
    unzip \
    tar \
    golang-go ninja-build pkg-config automake autoconf libtool curl && \
    update-alternatives --install /usr/bin/cc cc /usr/bin/clang-12 90 && \
    update-alternatives --install /usr/bin/cpp cpp /usr/bin/clang++-12 90 && \
    update-alternatives --install /usr/bin/c++ c++ /usr/bin/clang++-12 90 && \
    npm install -g esbuild

ENV CC=clang-12 
ENV CXX=clang++-12


ARG BUILDARCH=amd64


WORKDIR $GITHUB_WORKSPACE

ENV WEBKIT_OUT_DIR ${WEBKIT_DIR}

ENV JSC_BASE_DIR $WEBKIT_OUT_DIR
ENV LIB_ICU_PATH ${GITHUB_WORKSPACE}/icu/source/lib
ENV BUN_RELEASE_DIR ${BUN_RELEASE_DIR}
ENV BUN_DEPS_OUT_DIR ${BUN_DEPS_OUT_DIR}

RUN cd / && mkdir -p $BUN_RELEASE_DIR $BUN_DEPS_OUT_DIR ${BUN_DIR} ${BUN_DEPS_OUT_DIR}

LABEL org.opencontainers.image.title="Bun base image ${BUILDARCH} (glibc)"
LABEL org.opencontainers.image.source=https://github.com/jarred-sumner/bun


FROM bun-base as bun-base-with-zig-and-webkit

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun
ARG BUILDARCH=amd64

WORKDIR $GITHUB_WORKSPACE

RUN cd $GITHUB_WORKSPACE && \
    curl -o zig-linux-$BUILDARCH.zip -L https://github.com/Jarred-Sumner/zig/releases/download/dec20/zig-linux-$BUILDARCH.zip && \
    unzip -q zig-linux-$BUILDARCH.zip && \
    rm zig-linux-$BUILDARCH.zip;

RUN cd $GITHUB_WORKSPACE && \
    curl -o bun-webkit-linux-$BUILDARCH.tar.gz -L https://github.com/Jarred-Sumner/WebKit/releases/download/Bun-v0/bun-webkit-linux-$BUILDARCH.tar.gz && \
    tar -xzf bun-webkit-linux-$BUILDARCH.tar.gz && \
    rm bun-webkit-linux-$BUILDARCH.tar.gz && \
    cat $WEBKIT_OUT_DIR/include/cmakeconfig.h > /dev/null

RUN  cd $GITHUB_WORKSPACE && \
    curl -o icu4c-66_1-src.tgz -L https://github.com/unicode-org/icu/releases/download/release-66-1/icu4c-66_1-src.tgz  && \
    tar -xzf icu4c-66_1-src.tgz && \
    rm icu4c-66_1-src.tgz && \
    cd icu/source && \
    ./configure --enable-static --disable-shared && \
    make -j$(nproc)

ENV ZIG "${ZIG_PATH}/zig"

LABEL org.opencontainers.image.title="Bun base image with zig & webkit ${BUILDARCH} (glibc)"
LABEL org.opencontainers.image.source=https://github.com/jarred-sumner/bun

FROM bun-base as mimalloc

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

COPY Makefile ${BUN_DIR}/Makefile
COPY src/deps/mimalloc ${BUN_DIR}/src/deps/mimalloc

RUN cd ${BUN_DIR} && \
    make mimalloc

FROM bun-base as zlib

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

COPY Makefile ${BUN_DIR}/Makefile
COPY src/deps/zlib ${BUN_DIR}/src/deps/zlib

WORKDIR $BUN_DIR

RUN cd $BUN_DIR && \
    make zlib

FROM bun-base as libarchive

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

COPY Makefile ${BUN_DIR}/Makefile
COPY src/deps/libarchive ${BUN_DIR}/src/deps/libarchive

WORKDIR $BUN_DIR

RUN cd $BUN_DIR && \
    make libarchive

FROM bun-base as boringssl

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

COPY Makefile ${BUN_DIR}/Makefile
COPY src/deps/boringssl ${BUN_DIR}/src/deps/boringssl

WORKDIR $BUN_DIR

RUN cd $BUN_DIR && \
    make boringssl

FROM bun-base as picohttp

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

COPY Makefile ${BUN_DIR}/Makefile
COPY src/deps/picohttpparser ${BUN_DIR}/src/deps/picohttpparser
COPY src/deps/*.c ${BUN_DIR}/src/deps
COPY src/deps/*.h ${BUN_DIR}/src/deps

WORKDIR $BUN_DIR

RUN cd $BUN_DIR && \
    make picohttp

FROM bun-base-with-zig-and-webkit as identifier_cache

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

WORKDIR $BUN_DIR

COPY Makefile ${BUN_DIR}/Makefile
COPY src/js_lexer/identifier_data.zig ${BUN_DIR}/src/js_lexer/identifier_data.zig
COPY src/js_lexer/identifier_cache.zig ${BUN_DIR}/src/js_lexer/identifier_cache.zig

RUN cd $BUN_DIR && \
    make identifier-cache

FROM bun-base-with-zig-and-webkit as node_fallbacks

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

WORKDIR $BUN_DIR


COPY Makefile ${BUN_DIR}/Makefile
COPY src/node-fallbacks ${BUN_DIR}/src/node-fallbacks
RUN cd $BUN_DIR && \
    make node-fallbacks

FROM bun-base-with-zig-and-webkit as build_release

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun


WORKDIR $BUN_DIR

COPY ./src ${BUN_DIR}/src
COPY ./build.zig ${BUN_DIR}/build.zig
COPY ./completions ${BUN_DIR}/completions
COPY ./packages ${BUN_DIR}/packages
COPY ./build-id ${BUN_DIR}/build-id
COPY ./package.json ${BUN_DIR}/package.json
COPY ./misctools ${BUN_DIR}/misctools
COPY Makefile ${BUN_DIR}/Makefile

COPY --from=mimalloc ${BUN_DEPS_OUT_DIR}/*.o ${BUN_DEPS_OUT_DIR}
COPY --from=libarchive ${BUN_DEPS_OUT_DIR}/*.a ${BUN_DEPS_OUT_DIR}
COPY --from=picohttp ${BUN_DEPS_OUT_DIR}/*.o ${BUN_DEPS_OUT_DIR}
COPY --from=boringssl ${BUN_DEPS_OUT_DIR}/*.a ${BUN_DEPS_OUT_DIR}
COPY --from=zlib ${BUN_DEPS_OUT_DIR}/*.a ${BUN_DEPS_OUT_DIR}
COPY --from=identifier_cache ${BUN_DIR}/src/js_lexer/*.blob ${BUN_DIR}/src/js_lexer

RUN cd $BUN_DIR && make \
    jsc-bindings-headers \
    api \
    analytics \
    bun_error \
    fallback_decoder 

RUN cd $BUN_DIR && rm -rf /root/.cache zig-cache && \
    mkdir -p $BUN_RELEASE_DIR; make release \
    copy-to-bun-release-dir

FROM bun-base-with-zig-and-webkit as bun.devcontainer

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun


ENV WEBKIT_OUT_DIR ${WEBKIT_DIR}
ENV PATH "$ZIG_PATH:$PATH"
ENV JSC_BASE_DIR $WEBKIT_OUT_DIR
ENV LIB_ICU_PATH /home/ubuntu/icu/source/lib
ENV BUN_RELEASE_DIR ${BUN_RELEASE_DIR}
ENV PATH "/workspaces/bun/packages/bun-linux-x64:/workspaces/bun/packages/bun-linux-aarch64:/workspaces/bun/packages/debug-bun-linux-x64:/workspaces/bun/packages/debug-bun-linux-aarch64:$PATH"
ENV PATH "/home/ubuntu/zls/zig-out/bin:$PATH"

ENV BUN_INSTALL /home/ubuntu/.bun
ENV XDG_CONFIG_HOME /home/ubuntu/.config

RUN update-alternatives --install /usr/bin/lldb lldb /usr/bin/lldb-12 90

COPY .devcontainer/workspace.code-workspace /workspaces/workspace.code-workspace
COPY .devcontainer/zls.json /workspaces/workspace.code-workspace
COPY .devcontainer/limits.conf /etc/security/limits.conf
COPY ".devcontainer/scripts/" /scripts/
COPY ".devcontainer/scripts/getting-started.sh" /workspaces/getting-started.sh
RUN mkdir -p /home/ubuntu/.bun /home/ubuntu/.config /workspaces/bun && \
    bash /scripts/common-debian.sh && \
    bash /scripts/github.sh && \
    bash /scripts/nice.sh && \
    bash /scripts/zig-env.sh
COPY .devcontainer/zls.json /home/ubuntu/.config/zls.json

FROM bun-base-with-args as test_base

WORKDIR $BUN_DIR

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

ENV NPM_CLIENT bun
ENV PATH "${BUN_DIR}/packages/bun-linux-x64:${BUN_DIR}/packages/bun-linux-aarch64:$PATH"
ENV CI 1

# All this is necessary because Ubuntu decided to use snap for their Chromium packages
# Which breaks using Chrome in the container on aarch64
RUN apt-get clean && apt-get update && \
    apt-get install -y wget gnupg2 curl make git unzip nodejs npm psmisc && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys DCC9EFBF77E11517 && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 648ACFD622F3D138 && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys AA8E81B4331F7F50 && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 112695A0E562B32A

COPY ./integration ${BUN_DIR}/integration
COPY Makefile ${BUN_DIR}/Makefile
COPY package.json ${BUN_DIR}/package.json

# We don't want to worry about architecture differences in this image
COPY --from=release /opt/bun/bin/bun ${BUN_DIR}/packages/bun-linux-aarch64/bun
COPY --from=release /opt/bun/bin/bun ${BUN_DIR}/packages/bun-linux-x64/bun

FROM bun-base-with-args as release 

ARG DEBIAN_FRONTEND=noninteractive
ARG GITHUB_WORKSPACE=/build
ARG ZIG_PATH=${GITHUB_WORKSPACE}/zig
# Directory extracts to "bun-webkit"
ARG WEBKIT_DIR=${GITHUB_WORKSPACE}/bun-webkit 
ARG BUN_RELEASE_DIR=${GITHUB_WORKSPACE}/bun-release
ARG BUN_DEPS_OUT_DIR=${GITHUB_WORKSPACE}/bun-deps
ARG BUN_DIR=${GITHUB_WORKSPACE}/bun

WORKDIR /opt/bun
COPY .devcontainer/limits.conf /etc/security/limits.conf

ENV BUN_INSTALL /opt/bun
ENV PATH "/opt/bun/bin:$PATH"
ARG BUILDARCH=amd64
LABEL org.opencontainers.image.title="Bun ${BUILDARCH} (glibc)"
LABEL org.opencontainers.image.source=https://github.com/jarred-sumner/bun
COPY --from=build_release /opt/bun/bin/bun ${BUN_DIR}/packages/bun-linux-aarch64/bun
COPY --from=build_release /opt/bun/bin/bun ${BUN_DIR}/packages/bun-linux-x64/bun