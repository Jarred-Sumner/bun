// Type definitions for bun 0.0
// Project: https://github.com/Jarred-Sumner/bun
// Definitions by: Jarred Sumner <https://github.com/Jarred-Sumner>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

// This file is bundled so that your TypeScript editor integration loads it faster.
// ./bun.d.ts

interface VoidFunction {
  (): void;
}

/**
 *
 * Bun.js runtime APIs
 *
 * @example
 *
 * ```js
 * import {file} from 'bun';
 *
 * // Log the file to the console
 * const input = await file('/path/to/file.txt').text();
 * console.log(input);
 * ```
 *
 * This module aliases `globalThis.Bun`.
 *
 */
declare module "bun" {
  /**
   * Start a fast HTTP server.
   *
   * @param options Server options (port defaults to $PORT || 8080)
   *
   * -----
   *
   * @example
   *
   * ```ts
   * Bun.serve({
   *   fetch(req: Request): Response | Promise<Response> {
   *     return new Response("Hello World!");
   *   },
   *
   *   // Optional port number - the default value is 3000
   *   port: process.env.PORT || 3000,
   * });
   * ```
   * -----
   *
   * @example
   *
   * Send a file
   *
   * ```ts
   * Bun.serve({
   *   fetch(req: Request): Response | Promise<Response> {
   *     return new Response(Bun.file("./package.json"));
   *   },
   *
   *   // Optional port number - the default value is 3000
   *   port: process.env.PORT || 3000,
   * });
   * ```
   */
  export function serve(options: Serve): Server;

  /**
   * Synchronously resolve a `moduleId` as though it were imported from `parent`
   *
   * On failure, throws a `ResolveError`
   */
  // tslint:disable-next-line:unified-signatures
  export function resolveSync(moduleId: string, parent: string): string;

  /**
   * Resolve a `moduleId` as though it were imported from `parent`
   *
   * On failure, throws a `ResolveError`
   *
   * For now, use the sync version. There is zero performance benefit to using this async version. It exists for future-proofing.
   */
  // tslint:disable-next-line:unified-signatures
  export function resolve(moduleId: string, parent: string): Promise<string>;

  /**
   *
   * Use the fastest syscalls available to copy from `input` into `destination`.
   *
   * If `destination` exists, it must be a regular file or symlink to a file.
   *
   * @param destination The file or file path to write to
   * @param input The data to copy into `destination`.
   * @returns A promise that resolves with the number of bytes written.
   */
  // tslint:disable-next-line:unified-signatures
  export function write(
    destination: FileBlob | PathLike,
    input: Blob | TypedArray | string | BlobPart[]
  ): Promise<number>;

  /**
   *
   * Persist a {@link Response} body to disk.
   *
   * @param destination The file to write to. If the file doesn't exist,
   * it will be created and if the file does exist, it will be
   * overwritten. If `input`'s size is less than `destination`'s size,
   * `destination` will be truncated.
   * @param input - `Response` object
   * @returns A promise that resolves with the number of bytes written.
   */
  export function write(
    destination: FileBlob,
    input: Response
  ): Promise<number>;

  /**
   *
   * Persist a {@link Response} body to disk.
   *
   * @param destinationPath The file path to write to. If the file doesn't
   * exist, it will be created and if the file does exist, it will be
   * overwritten. If `input`'s size is less than `destination`'s size,
   * `destination` will be truncated.
   * @param input - `Response` object
   * @returns A promise that resolves with the number of bytes written.
   */
  // tslint:disable-next-line:unified-signatures
  export function write(
    destinationPath: PathLike,
    input: Response
  ): Promise<number>;

  /**
   *
   * Use the fastest syscalls available to copy from `input` into `destination`.
   *
   * If `destination` exists, it must be a regular file or symlink to a file.
   *
   * On Linux, this uses `copy_file_range`.
   *
   * On macOS, when the destination doesn't already exist, this uses
   * [`clonefile()`](https://www.manpagez.com/man/2/clonefile/) and falls
   * back to [`fcopyfile()`](https://www.manpagez.com/man/2/fcopyfile/)
   *
   * @param destination The file to write to. If the file doesn't exist,
   * it will be created and if the file does exist, it will be
   * overwritten. If `input`'s size is less than `destination`'s size,
   * `destination` will be truncated.
   * @param input The file to copy from.
   * @returns A promise that resolves with the number of bytes written.
   */
  // tslint:disable-next-line:unified-signatures
  export function write(
    destination: FileBlob,
    input: FileBlob
  ): Promise<number>;

  /**
   *
   * Use the fastest syscalls available to copy from `input` into `destination`.
   *
   * If `destination` exists, it must be a regular file or symlink to a file.
   *
   * On Linux, this uses `copy_file_range`.
   *
   * On macOS, when the destination doesn't already exist, this uses
   * [`clonefile()`](https://www.manpagez.com/man/2/clonefile/) and falls
   * back to [`fcopyfile()`](https://www.manpagez.com/man/2/fcopyfile/)
   *
   * @param destinationPath The file path to write to. If the file doesn't
   * exist, it will be created and if the file does exist, it will be
   * overwritten. If `input`'s size is less than `destination`'s size,
   * `destination` will be truncated.
   * @param input The file to copy from.
   * @returns A promise that resolves with the number of bytes written.
   */
  // tslint:disable-next-line:unified-signatures
  export function write(
    destinationPath: PathLike,
    input: FileBlob
  ): Promise<number>;

  export interface SystemError extends Error {
    errno?: number | undefined;
    code?: string | undefined;
    path?: string | undefined;
    syscall?: string | undefined;
  }

  /**
   * Concatenate an array of typed arrays into a single `ArrayBuffer`. This is a fast path.
   *
   * You can do this manually if you'd like, but this function will generally
   * be a little faster.
   *
   * If you want a `Uint8Array` instead, consider `Buffer.concat`.
   *
   * @param buffers An array of typed arrays to concatenate.
   * @returns An `ArrayBuffer` with the data from all the buffers.
   *
   * Here is similar code to do it manually, except about 30% slower:
   * ```js
   *   var chunks = [...];
   *   var size = 0;
   *   for (const chunk of chunks) {
   *     size += chunk.byteLength;
   *   }
   *   var buffer = new ArrayBuffer(size);
   *   var view = new Uint8Array(buffer);
   *   var offset = 0;
   *   for (const chunk of chunks) {
   *     view.set(chunk, offset);
   *     offset += chunk.byteLength;
   *   }
   *   return buffer;
   * ```
   *
   * This function is faster because it uses uninitialized memory when copying. Since the entire
   * length of the buffer is known, it is safe to use uninitialized memory.
   */
  export function concatArrayBuffers(
    buffers: Array<ArrayBufferView | ArrayBufferLike>
  ): ArrayBuffer;

  /**
   * Consume all data from a {@link ReadableStream} until it closes or errors.
   *
   * Concatenate the chunks into a single {@link ArrayBuffer}.
   *
   * Each chunk must be a TypedArray or an ArrayBuffer. If you need to support
   * chunks of different types, consider {@link readableStreamToBlob}
   *
   * @param stream The stream to consume.
   * @returns A promise that resolves with the concatenated chunks or the concatenated chunks as an `ArrayBuffer`.
   */
  export function readableStreamToArrayBuffer(
    stream: ReadableStream
  ): Promise<ArrayBuffer> | ArrayBuffer;

  /**
   * Consume all data from a {@link ReadableStream} until it closes or errors.
   *
   * Concatenate the chunks into a single {@link Blob}.
   *
   * @param stream The stream to consume.
   * @returns A promise that resolves with the concatenated chunks as a {@link Blob}.
   */
  export function readableStreamToBlob(stream: ReadableStream): Promise<Blob>;

  /**
   * Consume all data from a {@link ReadableStream} until it closes or errors.
   *
   * Concatenate the chunks into a single string. Chunks must be a TypedArray or an ArrayBuffer. If you need to support chunks of different types, consider {@link readableStreamToBlob}.
   *
   * @param stream The stream to consume.
   * @returns A promise that resolves with the concatenated chunks as a {@link String}.
   */
  export function readableStreamToText(stream: ReadableStream): Promise<string>;

  /**
   * Consume all data from a {@link ReadableStream} until it closes or errors.
   *
   * Concatenate the chunks into a single string and parse as JSON. Chunks must be a TypedArray or an ArrayBuffer. If you need to support chunks of different types, consider {@link readableStreamToBlob}.
   *
   * @param stream The stream to consume.
   * @returns A promise that resolves with the concatenated chunks as a {@link String}.
   */
  export function readableStreamToJSON(stream: ReadableStream): Promise<any>;

  /**
   * Consume all data from a {@link ReadableStream} until it closes or errors.
   *
   * @param stream The stream to consume
   * @returns A promise that resolves with the chunks as an array
   *
   */
  export function readableStreamToArray<T>(
    stream: ReadableStream
  ): Promise<T[]> | T[];

  /**
   * Escape the following characters in a string:
   *
   * - `"` becomes `"&quot;"`
   * - `&` becomes `"&amp;"`
   * - `'` becomes `"&#x27;"`
   * - `<` becomes `"&lt;"`
   * - `>` becomes `"&gt;"`
   *
   * This function is optimized for large input. On an M1X, it processes 480 MB/s -
   * 20 GB/s, depending on how much data is being escaped and whether there is non-ascii
   * text.
   *
   * Non-string types will be converted to a string before escaping.
   */
  export function escapeHTML(input: string | object | number | boolean): string;

  /**
   * Convert a filesystem path to a file:// URL.
   *
   * @param path The path to convert.
   * @returns A {@link URL} with the file:// scheme.
   *
   * @example
   * ```js
   * const url = Bun.pathToFileURL("/foo/bar.txt");
   * console.log(url.href); // "file:///foo/bar.txt"
   *```
   *
   * Internally, this function uses WebKit's URL API to
   * convert the path to a file:// URL.
   */
  export function pathToFileURL(path: string): URL;

  /**
   * Convert a {@link URL} to a filesystem path.
   * @param url The URL to convert.
   * @returns A filesystem path.
   * @throws If the URL is not a URL.
   * @example
   * ```js
   * const path = Bun.fileURLToPath(new URL("file:///foo/bar.txt"));
   * console.log(path); // "/foo/bar.txt"
   * ```
   */
  export function fileURLToPath(url: URL): string;

  /**
   * Fast incremental writer that becomes an `ArrayBuffer` on end().
   */
  export class ArrayBufferSink {
    constructor();

    start(options?: {
      asUint8Array?: boolean;
      /**
       * Preallocate an internal buffer of this size
       * This can significantly improve performance when the chunk size is small
       */
      highWaterMark?: number;
      /**
       * On {@link ArrayBufferSink.flush}, return the written data as a `Uint8Array`.
       * Writes will restart from the beginning of the buffer.
       */
      stream?: boolean;
    }): void;

    write(chunk: string | ArrayBufferView | ArrayBuffer): number;
    /**
     * Flush the internal buffer
     *
     * If {@link ArrayBufferSink.start} was passed a `stream` option, this will return a `ArrayBuffer`
     * If {@link ArrayBufferSink.start} was passed a `stream` option and `asUint8Array`, this will return a `Uint8Array`
     * Otherwise, this will return the number of bytes written since the last flush
     *
     * This API might change later to separate Uint8ArraySink and ArrayBufferSink
     */
    flush(): number | Uint8Array | ArrayBuffer;
    end(): ArrayBuffer | Uint8Array;
  }

  /**
   * [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) powered by the fastest system calls available for operating on files.
   *
   * This Blob is lazy. That means it won't do any work until you read from it.
   *
   * - `size` will not be valid until the contents of the file are read at least once.
   * - `type` is auto-set based on the file extension when possible
   *
   * @example
   * ```js
   * const file = Bun.file("./hello.json");
   * console.log(file.type); // "application/json"
   * console.log(await file.text()); // '{"hello":"world"}'
   * ```
   *
   * @example
   * ```js
   * await Bun.write(
   *   Bun.file("./hello.txt"),
   *   "Hello, world!"
   * );
   * ```
   *
   */
  export interface FileBlob extends Blob {
    /**
     * Offset any operation on the file starting at `begin` and ending at `end`. `end` is relative to 0
     *
     * Similar to [`TypedArray.subarray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray). Does not copy the file, open the file, or modify the file.
     *
     * If `begin` > 0, {@link Bun.write()} will be slower on macOS
     *
     * @param begin - start offset in bytes
     * @param end - absolute offset in bytes (relative to 0)
     */
    slice(begin?: number, end?: number): FileBlob;
  }

  /**
   *   This lets you use macros as regular imports
   *   @example
   *   ```
   *   {
   *     "react-relay": {
   *       "graphql": "bun-macro-relay/bun-macro-relay.tsx"
   *     }
   *   }
   *  ```
   */
  export type MacroMap = Record<string, Record<string, string>>;

  /**
   * Hash a string or array buffer using Wyhash
   *
   * This is not a cryptographic hash function.
   * @param data The data to hash.
   * @param seed The seed to use.
   */
  export const hash: ((
    data: string | ArrayBufferView | ArrayBuffer,
    seed?: number
  ) => number | bigint) &
    Hash;

  interface Hash {
    wyhash: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
    crc32: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
    adler32: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
    cityHash32: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
    cityHash64: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
    murmur32v3: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
    murmur64v2: (
      data: string | ArrayBufferView | ArrayBuffer,
      seed?: number
    ) => number | bigint;
  }

  export type Platform =
    /**
     * When building for bun.js
     */
    | "bun"
    /**
     * When building for the web
     */
    | "browser"
    /**
     * When building for node.js
     */
    | "node"
    | "neutral";

  export type JavaScriptLoader = "jsx" | "js" | "ts" | "tsx";

  export interface TranspilerOptions {
    /**
     * Replace key with value. Value must be a JSON string.
     * @example
     *  ```
     *  { "process.env.NODE_ENV": "\"production\"" }
     * ```
     */
    define?: Record<string, string>;

    /** What is the default loader used for this transpiler?  */
    loader?: JavaScriptLoader;

    /**  What platform are we targeting? This may affect how import and/or require is used */
    /**  @example "browser" */
    platform?: Platform;

    /**
     *  TSConfig.json file as stringified JSON or an object
     *  Use this to set a custom JSX factory, fragment, or import source
     *  For example, if you want to use Preact instead of React. Or if you want to use Emotion.
     */
    tsconfig?: string;

    /**
     *    Replace an import statement with a macro.
     *
     *    This will remove the import statement from the final output
     *    and replace any function calls or template strings with the result returned by the macro
     *
     *    @example
     *    ```json
     *    {
     *        "react-relay": {
     *            "graphql": "bun-macro-relay"
     *        }
     *    }
     *    ```
     *
     *    Code that calls `graphql` will be replaced with the result of the macro.
     *
     *    ```js
     *    import {graphql} from "react-relay";
     *
     *    // Input:
     *    const query = graphql`
     *        query {
     *            ... on User {
     *                id
     *            }
     *        }
     *    }`;
     *    ```
     *
     *    Will be replaced with:
     *
     *    ```js
     *    import UserQuery from "./UserQuery.graphql";
     *    const query = UserQuery;
     *    ```
     */
    macros?: MacroMap;

    autoImportJSX?: boolean;
    allowBunRuntime?: boolean;
    exports?: {
      eliminate?: string[];
      replace?: Record<string, string>;
    };
    treeShaking?: boolean;
    trimUnusedImports?: boolean;
    jsxOptimizationInline?: boolean;
  }

  /**
   * Quickly transpile TypeScript, JSX, or JS to modern JavaScript.
   *
   * @example
   * ```js
   * const transpiler = new Bun.Transpiler();
   * transpiler.transformSync(`
   *   const App = () => <div>Hello World</div>;
   *export default App;
   * `);
   * // This outputs:
   * const output = `
   * const App = () => jsx("div", {
   *   children: "Hello World"
   * }, undefined, false, undefined, this);
   *export default App;
   * `
   * ```
   *
   */
  export class Transpiler {
    constructor(options: TranspilerOptions);

    /**
     * Transpile code from TypeScript or JSX into valid JavaScript.
     * This function does not resolve imports.
     * @param code The code to transpile
     */
    transform(code: StringOrBuffer, loader?: JavaScriptLoader): Promise<string>;
    /**
     * Transpile code from TypeScript or JSX into valid JavaScript.
     * This function does not resolve imports.
     * @param code The code to transpile
     *
     */
    transformSync(
      code: StringOrBuffer,
      loader: JavaScriptLoader,
      ctx: object
    ): string;
    /**
     * Transpile code from TypeScript or JSX into valid JavaScript.
     * This function does not resolve imports.
     * @param code The code to transpile
     * @param ctx An object to pass to macros
     *
     */
    transformSync(code: StringOrBuffer, ctx: object): string;

    /**
     * Transpile code from TypeScript or JSX into valid JavaScript.
     * This function does not resolve imports.
     * @param code The code to transpile
     *
     */
    transformSync(code: StringOrBuffer, loader: JavaScriptLoader): string;

    /**
     * Get a list of import paths and paths from a TypeScript, JSX, TSX, or JavaScript file.
     * @param code The code to scan
     * @example
     * ```js
     * const {imports, exports} = transpiler.scan(`
     * import {foo} from "baz";
     * const hello = "hi!";
     * `);
     *
     * console.log(imports); // ["baz"]
     * console.log(exports); // ["hello"]
     * ```
     */
    scan(code: StringOrBuffer): { exports: string[]; imports: Import[] };

    /**
     *  Get a list of import paths from a TypeScript, JSX, TSX, or JavaScript file.
     * @param code The code to scan
     * @example
     * ```js
     * const imports = transpiler.scanImports(`
     * import {foo} from "baz";
     * import type {FooType} from "bar";
     * import type {DogeType} from "wolf";
     * `);
     *
     * console.log(imports); // ["baz"]
     * ```
     * This is a fast path which performs less work than `scan`.
     */
    scanImports(code: StringOrBuffer): Import[];
  }

  export interface Import {
    path: string;

    kind:
      | "import-statement"
      | "require-call"
      | "require-resolve"
      | "dynamic-import"
      | "import-rule"
      | "url-token"
      | "internal"
      | "entry-point";
  }

  export interface ServeOptions {
    /**
     * What port should the server listen on?
     * @default process.env.PORT || "3000"
     */
    port?: string | number;

    /**
     * What hostname should the server listen on?
     *
     * @default
     * ```js
     * "0.0.0.0" // listen on all interfaces
     * ```
     * @example
     *  ```js
     * "127.0.0.1" // Only listen locally
     * ```
     * @example
     * ```js
     * "remix.run" // Only listen on remix.run
     * ````
     *
     * note: hostname should not include a {@link port}
     */
    hostname?: string;

    /**
     * What URI should be used to make {@link Request.url} absolute?
     *
     * By default, looks at {@link hostname}, {@link port}, and whether or not SSL is enabled to generate one
     *
     * @example
     *```js
     * "http://my-app.com"
     * ```
     *
     * @example
     *```js
     * "https://wongmjane.com/"
     * ```
     *
     * This should be the public, absolute URL – include the protocol and {@link hostname}. If the port isn't 80 or 443, then include the {@link port} too.
     *
     * @example
     * "http://localhost:3000"
     *
     */
    baseURI?: string;

    /**
     * What is the maximum size of a request body? (in bytes)
     * @default 1024 * 1024 * 128 // 128MB
     */
    maxRequestBodySize?: number;

    /**
     * Render contextual errors? This enables bun's error page
     * @default process.env.NODE_ENV !== 'production'
     */
    development?: boolean;

    /**
     * Handle HTTP requests
     *
     * Respond to {@link Request} objects with a {@link Response} object.
     *
     */
    fetch(this: Server, request: Request): Response | Promise<Response>;

    error?: (
      this: Server,
      request: Errorlike
    ) => Response | Promise<Response> | undefined | Promise<undefined>;
  }

  export interface Errorlike extends Error {
    code?: string;
    errno?: number;
    syscall?: string;
  }

  export interface SSLAdvancedOptions {
    passphrase?: string;
    caFile?: string;
    dhParamsFile?: string;

    /**
     * This sets `OPENSSL_RELEASE_BUFFERS` to 1.
     * It reduces overall performance but saves some memory.
     * @default false
     */
    lowMemoryMode?: boolean;
  }
  interface SSLOptions {
    /**
     * File path to a TLS key
     *
     * To enable TLS, this option is required.
     */
    keyFile: string;
    /**
     * File path to a TLS certificate
     *
     * To enable TLS, this option is required.
     */
    certFile: string;
  }

  export type SSLServeOptions = ServeOptions &
    SSLOptions &
    SSLAdvancedOptions & {
      /**
       *  The keys are [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication) hostnames.
       *  The values are SSL options objects.
       */
      serverNames: Record<string, SSLOptions & SSLAdvancedOptions>;
    };

  /**
   * HTTP & HTTPS Server
   *
   * To start the server, see {@link serve}
   *
   * Often, you don't need to interact with this object directly. It exists to help you with the following tasks:
   * - Stop the server
   * - How many requests are currently being handled?
   *
   * For performance, Bun pre-allocates most of the data for 2048 concurrent requests.
   * That means starting a new server allocates about 500 KB of memory. Try to
   * avoid starting and stopping the server often (unless it's a new instance of bun).
   *
   * Powered by a fork of [uWebSockets](https://github.com/uNetworking/uWebSockets). Thank you @alexhultman.
   *
   */
  interface Server {
    /**
     * Stop listening to prevent new connections from being accepted.
     *
     * It does not close existing connections.
     *
     * It may take a second or two to actually stop.
     */
    stop(): void;

    /**
     * How many requests are in-flight right now?
     */
    readonly pendingRequests: number;
    readonly port: number;
    readonly hostname: string;
    readonly development: boolean;
  }

  export type Serve = SSLServeOptions | ServeOptions;

  /**
   * [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) powered by the fastest system calls available for operating on files.
   *
   * This Blob is lazy. That means it won't do any work until you read from it.
   *
   * - `size` will not be valid until the contents of the file are read at least once.
   * - `type` is auto-set based on the file extension when possible
   *
   * @example
   * ```js
   * const file = Bun.file("./hello.json");
   * console.log(file.type); // "application/json"
   * console.log(await file.json()); // { hello: "world" }
   * ```
   *
   * @example
   * ```js
   * await Bun.write(
   *   Bun.file("./hello.txt"),
   *   "Hello, world!"
   * );
   * ```
   * @param path The path to the file (lazily loaded)
   *
   */
  // tslint:disable-next-line:unified-signatures
  export function file(path: string, options?: BlobPropertyBag): FileBlob;

  /**
   * `Blob` that leverages the fastest system calls available to operate on files.
   *
   * This Blob is lazy. It won't do any work until you read from it. Errors propagate as promise rejections.
   *
   * `Blob.size` will not be valid until the contents of the file are read at least once.
   * `Blob.type` will have a default set based on the file extension
   *
   * @example
   * ```js
   * const file = Bun.file(new TextEncoder.encode("./hello.json"));
   * console.log(file.type); // "application/json"
   * ```
   *
   * @param path The path to the file as a byte buffer (the buffer is copied)
   */
  // tslint:disable-next-line:unified-signatures
  export function file(
    path: ArrayBufferLike | Uint8Array,
    options?: BlobPropertyBag
  ): FileBlob;

  /**
   * [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) powered by the fastest system calls available for operating on files.
   *
   * This Blob is lazy. That means it won't do any work until you read from it.
   *
   * - `size` will not be valid until the contents of the file are read at least once.
   *
   * @example
   * ```js
   * const file = Bun.file(fd);
   * ```
   *
   * @param fileDescriptor The file descriptor of the file
   */
  // tslint:disable-next-line:unified-signatures
  export function file(
    fileDescriptor: number,
    options?: BlobPropertyBag
  ): FileBlob;

  /**
   * Allocate a new [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) without zeroing the bytes.
   *
   * This can be 3.5x faster than `new Uint8Array(size)`, but if you send uninitialized memory to your users (even unintentionally), it can potentially leak anything recently in memory.
   */
  export function allocUnsafe(size: number): Uint8Array;

  /**
   * Pretty-print an object the same as {@link console.log} to a `string`
   *
   * Supports JSX
   *
   * @param args
   */
  export function inspect(...args: any): string;

  interface MMapOptions {
    /**
     * Sets MAP_SYNC flag on Linux. Ignored on macOS due to lack of support.
     */
    sync?: boolean;
    /**
     * Allow other processes to see results instantly?
     * This enables MAP_SHARED. If false, it enables MAP_PRIVATE.
     * @default true
     */
    shared?: boolean;
  }
  /**
   * Open a file as a live-updating `Uint8Array` without copying memory
   * - Writing to the array writes to the file.
   * - Reading from the array reads from the file.
   *
   * This uses the [`mmap()`](https://man7.org/linux/man-pages/man2/mmap.2.html) syscall under the hood.
   *
   * ---
   *
   * This API inherently has some rough edges:
   * - It does not support empty files. It will throw a `SystemError` with `EINVAL`
   * - Usage on shared/networked filesystems is discouraged. It will be very slow.
   * - If you delete or truncate the file, that will crash bun. This is called a segmentation fault.
   *
   * ---
   *
   * To close the file, set the array to `null` and it will be garbage collected eventually.
   *
   */
  export function mmap(path: PathLike, opts?: MMapOptions): Uint8Array;

  /** Write to stdout */
  const stdout: FileBlob;
  /** Write to stderr */
  const stderr: FileBlob;
  /**
   * Read from stdin
   *
   * This is read-only
   */
  const stdin: FileBlob;

  interface unsafe {
    /**
     * Cast bytes to a `String` without copying. This is the fastest way to get a `String` from a `Uint8Array` or `ArrayBuffer`.
     *
     * **Only use this for ASCII strings**. If there are non-ascii characters, your application may crash and/or very confusing bugs will happen such as `"foo" !== "foo"`.
     *
     * **The input buffer must not be garbage collected**. That means you will need to hold on to it for the duration of the string's lifetime.
     *
     */
    arrayBufferToString(buffer: Uint8Array | ArrayBufferLike): string;

    /**
     * Cast bytes to a `String` without copying. This is the fastest way to get a `String` from a `Uint16Array`
     *
     * **The input must be a UTF-16 encoded string**. This API does no validation whatsoever.
     *
     * **The input buffer must not be garbage collected**. That means you will need to hold on to it for the duration of the string's lifetime.
     *
     */
    // tslint:disable-next-line:unified-signatures
    arrayBufferToString(buffer: Uint16Array): string;

    /** Mock bun's segfault handler. You probably don't want to use this */
    segfault(): void;
  }
  export const unsafe: unsafe;

  type DigestEncoding = "hex" | "base64";

  /**
   * Are ANSI colors enabled for stdin and stdout?
   *
   * Used for {@link console.log}
   */
  export const enableANSIColors: boolean;

  /**
   * What script launched bun?
   *
   * Absolute file path
   *
   * @example "/never-gonna-give-you-up.js"
   */
  export const main: string;

  /**
   * Manually trigger the garbage collector
   *
   * This does two things:
   * 1. It tells JavaScriptCore to run the garbage collector
   * 2. It tells [mimalloc](https://github.com/microsoft/mimalloc) to clean up fragmented memory. Mimalloc manages the heap not used in JavaScriptCore.
   *
   * @param force Synchronously run the garbage collector
   */
  export function gc(force: boolean): void;

  /**
   * JavaScriptCore engine's internal heap snapshot
   *
   * I don't know how to make this something Chrome or Safari can read.
   *
   * If you have any ideas, please file an issue https://github.com/Jarred-Sumner/bun
   */
  interface HeapSnapshot {
    /** "2" */
    version: string;

    /** "Inspector" */
    type: string;

    nodes: number[];

    nodeClassNames: string[];
    edges: number[];
    edgeTypes: string[];
    edgeNames: string[];
  }

  /**
   * Nanoseconds since Bun.js was started as an integer.
   *
   * This uses a high-resolution monotonic system timer.
   *
   * After 14 weeks of consecutive uptime, this function
   * wraps
   */
  export function nanoseconds(): number;

  /**
   * Generate a heap snapshot for seeing where the heap is being used
   */
  export function generateHeapSnapshot(): HeapSnapshot;

  /**
   * The next time JavaScriptCore is idle, clear unused memory and attempt to reduce the heap size.
   */
  export function shrink(): void;

  /**
   * Open a file in your local editor. Auto-detects via `$VISUAL` || `$EDITOR`
   *
   * @param path path to open
   */
  export function openInEditor(path: string, options?: EditorOptions): void;

  interface EditorOptions {
    editor?: "vscode" | "subl";
    line?: number;
    column?: number;
  }

  /**
   * This class only exists in types
   */
  abstract class CryptoHashInterface<T> {
    /**
     * Update the hash with data
     *
     * @param data
     */
    update(data: StringOrBuffer): T;

    /**
     * Finalize the hash
     *
     * @param encoding `DigestEncoding` to return the hash in. If none is provided, it will return a `Uint8Array`.
     */
    digest(encoding: DigestEncoding): string;

    /**
     * Finalize the hash
     *
     * @param hashInto `TypedArray` to write the hash into. Faster than creating a new one each time
     */
    digest(hashInto?: TypedArray): TypedArray;

    /**
     * Run the hash over the given data
     *
     * @param input `string`, `Uint8Array`, or `ArrayBuffer` to hash. `Uint8Array` or `ArrayBuffer` is faster.
     *
     * @param hashInto `TypedArray` to write the hash into. Faster than creating a new one each time
     */
    static hash(input: StringOrBuffer, hashInto?: TypedArray): TypedArray;

    /**
     * Run the hash over the given data
     *
     * @param input `string`, `Uint8Array`, or `ArrayBuffer` to hash. `Uint8Array` or `ArrayBuffer` is faster.
     *
     * @param encoding `DigestEncoding` to return the hash in
     */
    static hash(input: StringOrBuffer, encoding: DigestEncoding): string;
  }

  /**
   *
   * Hash `input` using [SHA-2 512/256](https://en.wikipedia.org/wiki/SHA-2#Comparison_of_SHA_functions)
   *
   * @param input `string`, `Uint8Array`, or `ArrayBuffer` to hash. `Uint8Array` or `ArrayBuffer` will be faster
   * @param hashInto optional `Uint8Array` to write the hash to. 32 bytes minimum.
   *
   * This hashing function balances speed with cryptographic strength. This does not encrypt or decrypt data.
   *
   * The implementation uses [BoringSSL](https://boringssl.googlesource.com/boringssl) (used in Chromium & Go)
   *
   * The equivalent `openssl` command is:
   *
   * ```bash
   * # You will need OpenSSL 3 or later
   * openssl sha512-256 /path/to/file
   *```
   */
  export function sha(input: StringOrBuffer, hashInto?: Uint8Array): Uint8Array;

  /**
   *
   * Hash `input` using [SHA-2 512/256](https://en.wikipedia.org/wiki/SHA-2#Comparison_of_SHA_functions)
   *
   * @param input `string`, `Uint8Array`, or `ArrayBuffer` to hash. `Uint8Array` or `ArrayBuffer` will be faster
   * @param encoding `DigestEncoding` to return the hash in
   *
   * This hashing function balances speed with cryptographic strength. This does not encrypt or decrypt data.
   *
   * The implementation uses [BoringSSL](https://boringssl.googlesource.com/boringssl) (used in Chromium & Go)
   *
   * The equivalent `openssl` command is:
   *
   * ```bash
   * # You will need OpenSSL 3 or later
   * openssl sha512-256 /path/to/file
   *```
   */
  export function sha(input: StringOrBuffer, encoding: DigestEncoding): string;

  /**
   * This is not the default because it's not cryptographically secure and it's slower than {@link SHA512}
   *
   * Consider using the ugly-named {@link SHA512_256} instead
   */
  export class SHA1 extends CryptoHashInterface<SHA1> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 20;
  }
  export class MD5 extends CryptoHashInterface<MD5> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 16;
  }
  export class MD4 extends CryptoHashInterface<MD4> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 16;
  }
  export class SHA224 extends CryptoHashInterface<SHA224> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 28;
  }
  export class SHA512 extends CryptoHashInterface<SHA512> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 64;
  }
  export class SHA384 extends CryptoHashInterface<SHA384> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 48;
  }
  export class SHA256 extends CryptoHashInterface<SHA256> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 32;
  }
  /**
   * See also {@link sha}
   */
  export class SHA512_256 extends CryptoHashInterface<SHA512_256> {
    constructor();

    /**
     * The number of bytes the hash will produce
     */
    static readonly byteLength: 32;
  }
}

type TypedArray =
  | Uint8Array
  | Int8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;
type TimeLike = string | number | Date;
type StringOrBuffer = string | TypedArray | ArrayBufferLike;
type PathLike = string | TypedArray | ArrayBufferLike;
type PathOrFileDescriptor = PathLike | number;
type NoParamCallback = VoidFunction;
type BufferEncoding =
  | "buffer"
  | "utf8"
  | "utf-8"
  | "ascii"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "latin1"
  | "binary";

interface BufferEncodingOption {
  encoding?: BufferEncoding;
}

declare var Bun: typeof import("bun");


// ./buffer.d.ts

/**
 * `Buffer` objects are used to represent a fixed-length sequence of bytes. Many
 * Node.js APIs support `Buffer`s.
 *
 * The `Buffer` class is a subclass of JavaScript's [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) class and
 * extends it with methods that cover additional use cases. Node.js APIs accept
 * plain [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) s wherever `Buffer`s are supported as well.
 *
 * While the `Buffer` class is available within the global scope, it is still
 * recommended to explicitly reference it via an import or require statement.
 *
 * ```js
 * import { Buffer } from 'buffer';
 *
 * // Creates a zero-filled Buffer of length 10.
 * const buf1 = Buffer.alloc(10);
 *
 * // Creates a Buffer of length 10,
 * // filled with bytes which all have the value `1`.
 * const buf2 = Buffer.alloc(10, 1);
 *
 * // Creates an uninitialized buffer of length 10.
 * // This is faster than calling Buffer.alloc() but the returned
 * // Buffer instance might contain old data that needs to be
 * // overwritten using fill(), write(), or other functions that fill the Buffer's
 * // contents.
 * const buf3 = Buffer.allocUnsafe(10);
 *
 * // Creates a Buffer containing the bytes [1, 2, 3].
 * const buf4 = Buffer.from([1, 2, 3]);
 *
 * // Creates a Buffer containing the bytes [1, 1, 1, 1] – the entries
 * // are all truncated using `(value &#x26; 255)` to fit into the range 0–255.
 * const buf5 = Buffer.from([257, 257.5, -255, '1']);
 *
 * // Creates a Buffer containing the UTF-8-encoded bytes for the string 'tést':
 * // [0x74, 0xc3, 0xa9, 0x73, 0x74] (in hexadecimal notation)
 * // [116, 195, 169, 115, 116] (in decimal notation)
 * const buf6 = Buffer.from('tést');
 *
 * // Creates a Buffer containing the Latin-1 bytes [0x74, 0xe9, 0x73, 0x74].
 * const buf7 = Buffer.from('tést', 'latin1');
 * ```
 * @see [source](https://github.com/nodejs/node/blob/v18.0.0/lib/buffer.js)
 */
declare module 'buffer' {
  export const INSPECT_MAX_BYTES: number;
  export const kMaxLength: number;
  export type TranscodeEncoding = 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'latin1' | 'binary';
  export const SlowBuffer: {
      /** @deprecated since v6.0.0, use `Buffer.allocUnsafeSlow()` */
      new (size: number): Buffer;
      prototype: Buffer;
  };
  export { Buffer };
  /**
   * @experimental
   */
  export interface BlobOptions {
      /**
       * @default 'utf8'
       */
      encoding?: BufferEncoding | undefined;
      /**
       * The Blob content-type. The intent is for `type` to convey
       * the MIME media type of the data, however no validation of the type format
       * is performed.
       */
      type?: string | undefined;
  }
  global {
      // Buffer class
      type WithImplicitCoercion<T> =
          | T
          | {
                valueOf(): T;
            };
      /**
       * Raw data is stored in instances of the Buffer class.
       * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
       * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'base64url'|'binary'(deprecated)|'hex'
       */
      interface BufferConstructor {
          /**
           * Allocates a new buffer containing the given {str}.
           *
           * @param str String to store in buffer.
           * @param encoding encoding to use, optional.  Default is 'utf8'
           * @deprecated since v10.0.0 - Use `Buffer.from(string[, encoding])` instead.
           */
          new (str: string, encoding?: BufferEncoding): Buffer;
          /**
           * Allocates a new buffer of {size} octets.
           *
           * @param size count of octets to allocate.
           * @deprecated since v10.0.0 - Use `Buffer.alloc()` instead (also see `Buffer.allocUnsafe()`).
           */
          new (size: number): Buffer;
          /**
           * Allocates a new buffer containing the given {array} of octets.
           *
           * @param array The octets to store.
           * @deprecated since v10.0.0 - Use `Buffer.from(array)` instead.
           */
          new (array: Uint8Array): Buffer;
          /**
           * Produces a Buffer backed by the same allocated memory as
           * the given {ArrayBuffer}/{SharedArrayBuffer}.
           *
           *
           * @param arrayBuffer The ArrayBuffer with which to share memory.
           * @deprecated since v10.0.0 - Use `Buffer.from(arrayBuffer[, byteOffset[, length]])` instead.
           */
          new (arrayBuffer: ArrayBuffer | SharedArrayBuffer): Buffer;
          /**
           * Allocates a new buffer containing the given {array} of octets.
           *
           * @param array The octets to store.
           * @deprecated since v10.0.0 - Use `Buffer.from(array)` instead.
           */
          new (array: ReadonlyArray<any>): Buffer;
          /**
           * Copies the passed {buffer} data onto a new {Buffer} instance.
           *
           * @param buffer The buffer to copy.
           * @deprecated since v10.0.0 - Use `Buffer.from(buffer)` instead.
           */
          new (buffer: Buffer): Buffer;
          /**
           * Allocates a new `Buffer` using an `array` of bytes in the range `0` – `255`.
           * Array entries outside that range will be truncated to fit into it.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Creates a new Buffer containing the UTF-8 bytes of the string 'buffer'.
           * const buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
           * ```
           *
           * A `TypeError` will be thrown if `array` is not an `Array` or another type
           * appropriate for `Buffer.from()` variants.
           *
           * `Buffer.from(array)` and `Buffer.from(string)` may also use the internal`Buffer` pool like `Buffer.allocUnsafe()` does.
           */
          from(arrayBuffer: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>, byteOffset?: number, length?: number): Buffer;
          /**
           * Creates a new Buffer using the passed {data}
           * @param data data to create a new Buffer
           */
          from(data: Uint8Array | ReadonlyArray<number>): Buffer;
          from(data: WithImplicitCoercion<Uint8Array | ReadonlyArray<number> | string>): Buffer;
          /**
           * Creates a new Buffer containing the given JavaScript string {str}.
           * If provided, the {encoding} parameter identifies the character encoding.
           * If not provided, {encoding} defaults to 'utf8'.
           */
          from(
              str:
                  | WithImplicitCoercion<string>
                  | {
                        [Symbol.toPrimitive](hint: 'string'): string;
                    },
              encoding?: BufferEncoding
          ): Buffer;
          /**
           * Creates a new Buffer using the passed {data}
           * @param values to create a new Buffer
           */
          of(...items: number[]): Buffer;
          /**
           * Returns `true` if `obj` is a `Buffer`, `false` otherwise.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * Buffer.isBuffer(Buffer.alloc(10)); // true
           * Buffer.isBuffer(Buffer.from('foo')); // true
           * Buffer.isBuffer('a string'); // false
           * Buffer.isBuffer([]); // false
           * Buffer.isBuffer(new Uint8Array(1024)); // false
           * ```
           */
          isBuffer(obj: any): obj is Buffer;
          /**
           * Returns `true` if `encoding` is the name of a supported character encoding,
           * or `false` otherwise.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * console.log(Buffer.isEncoding('utf8'));
           * // Prints: true
           *
           * console.log(Buffer.isEncoding('hex'));
           * // Prints: true
           *
           * console.log(Buffer.isEncoding('utf/8'));
           * // Prints: false
           *
           * console.log(Buffer.isEncoding(''));
           * // Prints: false
           * ```
           * @param encoding A character encoding name to check.
           */
          isEncoding(encoding: string): encoding is BufferEncoding;
          /**
           * Returns the byte length of a string when encoded using `encoding`.
           * This is not the same as [`String.prototype.length`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length), which does not account
           * for the encoding that is used to convert the string into bytes.
           *
           * For `'base64'`, `'base64url'`, and `'hex'`, this function assumes valid input.
           * For strings that contain non-base64/hex-encoded data (e.g. whitespace), the
           * return value might be greater than the length of a `Buffer` created from the
           * string.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const str = '\u00bd + \u00bc = \u00be';
           *
           * console.log(`${str}: ${str.length} characters, ` +
           *             `${Buffer.byteLength(str, 'utf8')} bytes`);
           * // Prints: ½ + ¼ = ¾: 9 characters, 12 bytes
           * ```
           *
           * When `string` is a
           * `Buffer`/[`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)/[`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/-
           * Reference/Global_Objects/TypedArray)/[`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)/[`SharedArrayBuffer`](https://develop-
           * er.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer), the byte length as reported by `.byteLength`is returned.
           * @param string A value to calculate the length of.
           * @param [encoding='utf8'] If `string` is a string, this is its encoding.
           * @return The number of bytes contained within `string`.
           */
          byteLength(string: string | ArrayBufferView | ArrayBuffer | SharedArrayBuffer, encoding?: BufferEncoding): number;
          /**
           * Returns a new `Buffer` which is the result of concatenating all the `Buffer`instances in the `list` together.
           *
           * If the list has no items, or if the `totalLength` is 0, then a new zero-length`Buffer` is returned.
           *
           * If `totalLength` is not provided, it is calculated from the `Buffer` instances
           * in `list` by adding their lengths.
           *
           * If `totalLength` is provided, it is coerced to an unsigned integer. If the
           * combined length of the `Buffer`s in `list` exceeds `totalLength`, the result is
           * truncated to `totalLength`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Create a single `Buffer` from a list of three `Buffer` instances.
           *
           * const buf1 = Buffer.alloc(10);
           * const buf2 = Buffer.alloc(14);
           * const buf3 = Buffer.alloc(18);
           * const totalLength = buf1.length + buf2.length + buf3.length;
           *
           * console.log(totalLength);
           * // Prints: 42
           *
           * const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
           *
           * console.log(bufA);
           * // Prints: <Buffer 00 00 00 00 ...>
           * console.log(bufA.length);
           * // Prints: 42
           * ```
           *
           * `Buffer.concat()` may also use the internal `Buffer` pool like `Buffer.allocUnsafe()` does.
           * @param list List of `Buffer` or {@link Uint8Array} instances to concatenate.
           * @param totalLength Total length of the `Buffer` instances in `list` when concatenated.
           */
          concat(list: ReadonlyArray<Uint8Array>, totalLength?: number): Buffer;
          /**
           * Compares `buf1` to `buf2`, typically for the purpose of sorting arrays of`Buffer` instances. This is equivalent to calling `buf1.compare(buf2)`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from('1234');
           * const buf2 = Buffer.from('0123');
           * const arr = [buf1, buf2];
           *
           * console.log(arr.sort(Buffer.compare));
           * // Prints: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
           * // (This result is equal to: [buf2, buf1].)
           * ```
           * @return Either `-1`, `0`, or `1`, depending on the result of the comparison. See `compare` for details.
           */
          compare(buf1: Uint8Array, buf2: Uint8Array): -1 | 0 | 1;
          /**
           * Allocates a new `Buffer` of `size` bytes. If `fill` is `undefined`, the`Buffer` will be zero-filled.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.alloc(5);
           *
           * console.log(buf);
           * // Prints: <Buffer 00 00 00 00 00>
           * ```
           *
           * If `size` is larger than {@link constants.MAX_LENGTH} or smaller than 0, `ERR_INVALID_ARG_VALUE` is thrown.
           *
           * If `fill` is specified, the allocated `Buffer` will be initialized by calling `buf.fill(fill)`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.alloc(5, 'a');
           *
           * console.log(buf);
           * // Prints: <Buffer 61 61 61 61 61>
           * ```
           *
           * If both `fill` and `encoding` are specified, the allocated `Buffer` will be
           * initialized by calling `buf.fill(fill, encoding)`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
           *
           * console.log(buf);
           * // Prints: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
           * ```
           *
           * Calling `Buffer.alloc()` can be measurably slower than the alternative `Buffer.allocUnsafe()` but ensures that the newly created `Buffer` instance
           * contents will never contain sensitive data from previous allocations, including
           * data that might not have been allocated for `Buffer`s.
           *
           * A `TypeError` will be thrown if `size` is not a number.
           * @param size The desired length of the new `Buffer`.
           * @param [fill=0] A value to pre-fill the new `Buffer` with.
           * @param [encoding='utf8'] If `fill` is a string, this is its encoding.
           */
          alloc(size: number, fill?: string | Buffer | number, encoding?: BufferEncoding): Buffer;
          /**
           * Allocates a new `Buffer` of `size` bytes. If `size` is larger than {@link constants.MAX_LENGTH} or smaller than 0, `ERR_INVALID_ARG_VALUE` is thrown.
           *
           * The underlying memory for `Buffer` instances created in this way is _not_
           * _initialized_. The contents of the newly created `Buffer` are unknown and _may contain sensitive data_. Use `Buffer.alloc()` instead to initialize`Buffer` instances with zeroes.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(10);
           *
           * console.log(buf);
           * // Prints (contents may vary): <Buffer a0 8b 28 3f 01 00 00 00 50 32>
           *
           * buf.fill(0);
           *
           * console.log(buf);
           * // Prints: <Buffer 00 00 00 00 00 00 00 00 00 00>
           * ```
           *
           * A `TypeError` will be thrown if `size` is not a number.
           *
           * The `Buffer` module pre-allocates an internal `Buffer` instance of
           * size `Buffer.poolSize` that is used as a pool for the fast allocation of new`Buffer` instances created using `Buffer.allocUnsafe()`,`Buffer.from(array)`, `Buffer.concat()`, and the
           * deprecated`new Buffer(size)` constructor only when `size` is less than or equal
           * to `Buffer.poolSize >> 1` (floor of `Buffer.poolSize` divided by two).
           *
           * Use of this pre-allocated internal memory pool is a key difference between
           * calling `Buffer.alloc(size, fill)` vs. `Buffer.allocUnsafe(size).fill(fill)`.
           * Specifically, `Buffer.alloc(size, fill)` will _never_ use the internal `Buffer`pool, while `Buffer.allocUnsafe(size).fill(fill)`_will_ use the internal`Buffer` pool if `size` is less
           * than or equal to half `Buffer.poolSize`. The
           * difference is subtle but can be important when an application requires the
           * additional performance that `Buffer.allocUnsafe()` provides.
           * @param size The desired length of the new `Buffer`.
           */
          allocUnsafe(size: number): Buffer;
          /**
           * Allocates a new `Buffer` of `size` bytes. If `size` is larger than {@link constants.MAX_LENGTH} or smaller than 0, `ERR_INVALID_ARG_VALUE` is thrown. A zero-length `Buffer` is created
           * if `size` is 0.
           *
           * The underlying memory for `Buffer` instances created in this way is _not_
           * _initialized_. The contents of the newly created `Buffer` are unknown and_may contain sensitive data_. Use `buf.fill(0)` to initialize
           * such `Buffer` instances with zeroes.
           *
           * When using `Buffer.allocUnsafe()` to allocate new `Buffer` instances,
           * allocations under 4 KB are sliced from a single pre-allocated `Buffer`. This
           * allows applications to avoid the garbage collection overhead of creating many
           * individually allocated `Buffer` instances. This approach improves both
           * performance and memory usage by eliminating the need to track and clean up as
           * many individual `ArrayBuffer` objects.
           *
           * However, in the case where a developer may need to retain a small chunk of
           * memory from a pool for an indeterminate amount of time, it may be appropriate
           * to create an un-pooled `Buffer` instance using `Buffer.allocUnsafeSlow()` and
           * then copying out the relevant bits.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Need to keep around a few small chunks of memory.
           * const store = [];
           *
           * socket.on('readable', () => {
           *   let data;
           *   while (null !== (data = readable.read())) {
           *     // Allocate for retained data.
           *     const sb = Buffer.allocUnsafeSlow(10);
           *
           *     // Copy the data into the new allocation.
           *     data.copy(sb, 0, 0, 10);
           *
           *     store.push(sb);
           *   }
           * });
           * ```
           *
           * A `TypeError` will be thrown if `size` is not a number.
           * @param size The desired length of the new `Buffer`.
           */
          allocUnsafeSlow(size: number): Buffer;
          /**
           * This is the size (in bytes) of pre-allocated internal `Buffer` instances used
           * for pooling. This value may be modified.
           */
          poolSize: number;
      }
      interface Buffer extends Uint8Array {
          /**
           * Writes `string` to `buf` at `offset` according to the character encoding in`encoding`. The `length` parameter is the number of bytes to write. If `buf` did
           * not contain enough space to fit the entire string, only part of `string` will be
           * written. However, partially encoded characters will not be written.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.alloc(256);
           *
           * const len = buf.write('\u00bd + \u00bc = \u00be', 0);
           *
           * console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
           * // Prints: 12 bytes: ½ + ¼ = ¾
           *
           * const buffer = Buffer.alloc(10);
           *
           * const length = buffer.write('abcd', 8);
           *
           * console.log(`${length} bytes: ${buffer.toString('utf8', 8, 10)}`);
           * // Prints: 2 bytes : ab
           * ```
           * @param string String to write to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write `string`.
           * @param [length=buf.length - offset] Maximum number of bytes to write (written bytes will not exceed `buf.length - offset`).
           * @param [encoding='utf8'] The character encoding of `string`.
           * @return Number of bytes written.
           */
          write(string: string, encoding?: BufferEncoding): number;
          write(string: string, offset: number, encoding?: BufferEncoding): number;
          write(string: string, offset: number, length: number, encoding?: BufferEncoding): number;
          /**
           * Decodes `buf` to a string according to the specified character encoding in`encoding`. `start` and `end` may be passed to decode only a subset of `buf`.
           *
           * If `encoding` is `'utf8'` and a byte sequence in the input is not valid UTF-8,
           * then each invalid byte is replaced with the replacement character `U+FFFD`.
           *
           * The maximum length of a string instance (in UTF-16 code units) is available
           * as {@link constants.MAX_STRING_LENGTH}.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.allocUnsafe(26);
           *
           * for (let i = 0; i < 26; i++) {
           *   // 97 is the decimal ASCII value for 'a'.
           *   buf1[i] = i + 97;
           * }
           *
           * console.log(buf1.toString('utf8'));
           * // Prints: abcdefghijklmnopqrstuvwxyz
           * console.log(buf1.toString('utf8', 0, 5));
           * // Prints: abcde
           *
           * const buf2 = Buffer.from('tést');
           *
           * console.log(buf2.toString('hex'));
           * // Prints: 74c3a97374
           * console.log(buf2.toString('utf8', 0, 3));
           * // Prints: té
           * console.log(buf2.toString(undefined, 0, 3));
           * // Prints: té
           * ```
           * @param [encoding='utf8'] The character encoding to use.
           * @param [start=0] The byte offset to start decoding at.
           * @param [end=buf.length] The byte offset to stop decoding at (not inclusive).
           */
          toString(encoding?: BufferEncoding, start?: number, end?: number): string;
          /**
           * Returns a JSON representation of `buf`. [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) implicitly calls
           * this function when stringifying a `Buffer` instance.
           *
           * `Buffer.from()` accepts objects in the format returned from this method.
           * In particular, `Buffer.from(buf.toJSON())` works like `Buffer.from(buf)`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
           * const json = JSON.stringify(buf);
           *
           * console.log(json);
           * // Prints: {"type":"Buffer","data":[1,2,3,4,5]}
           *
           * const copy = JSON.parse(json, (key, value) => {
           *   return value &#x26;&#x26; value.type === 'Buffer' ?
           *     Buffer.from(value) :
           *     value;
           * });
           *
           * console.log(copy);
           * // Prints: <Buffer 01 02 03 04 05>
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           */
          toJSON(): {
              type: 'Buffer';
              data: number[];
          };
          /**
           * Returns `true` if both `buf` and `otherBuffer` have exactly the same bytes,`false` otherwise. Equivalent to `buf.compare(otherBuffer) === 0`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from('ABC');
           * const buf2 = Buffer.from('414243', 'hex');
           * const buf3 = Buffer.from('ABCD');
           *
           * console.log(buf1.equals(buf2));
           * // Prints: true
           * console.log(buf1.equals(buf3));
           * // Prints: false
           * ```
           * @param otherBuffer A `Buffer` or {@link Uint8Array} with which to compare `buf`.
           */
          equals(otherBuffer: Uint8Array): boolean;
          /**
           * Compares `buf` with `target` and returns a number indicating whether `buf`comes before, after, or is the same as `target` in sort order.
           * Comparison is based on the actual sequence of bytes in each `Buffer`.
           *
           * * `0` is returned if `target` is the same as `buf`
           * * `1` is returned if `target` should come _before_`buf` when sorted.
           * * `-1` is returned if `target` should come _after_`buf` when sorted.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from('ABC');
           * const buf2 = Buffer.from('BCD');
           * const buf3 = Buffer.from('ABCD');
           *
           * console.log(buf1.compare(buf1));
           * // Prints: 0
           * console.log(buf1.compare(buf2));
           * // Prints: -1
           * console.log(buf1.compare(buf3));
           * // Prints: -1
           * console.log(buf2.compare(buf1));
           * // Prints: 1
           * console.log(buf2.compare(buf3));
           * // Prints: 1
           * console.log([buf1, buf2, buf3].sort(Buffer.compare));
           * // Prints: [ <Buffer 41 42 43>, <Buffer 41 42 43 44>, <Buffer 42 43 44> ]
           * // (This result is equal to: [buf1, buf3, buf2].)
           * ```
           *
           * The optional `targetStart`, `targetEnd`, `sourceStart`, and `sourceEnd`arguments can be used to limit the comparison to specific ranges within `target`and `buf` respectively.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
           * const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);
           *
           * console.log(buf1.compare(buf2, 5, 9, 0, 4));
           * // Prints: 0
           * console.log(buf1.compare(buf2, 0, 6, 4));
           * // Prints: -1
           * console.log(buf1.compare(buf2, 5, 6, 5));
           * // Prints: 1
           * ```
           *
           * `ERR_OUT_OF_RANGE` is thrown if `targetStart < 0`, `sourceStart < 0`,`targetEnd > target.byteLength`, or `sourceEnd > source.byteLength`.
           * @param target A `Buffer` or {@link Uint8Array} with which to compare `buf`.
           * @param [targetStart=0] The offset within `target` at which to begin comparison.
           * @param [targetEnd=target.length] The offset within `target` at which to end comparison (not inclusive).
           * @param [sourceStart=0] The offset within `buf` at which to begin comparison.
           * @param [sourceEnd=buf.length] The offset within `buf` at which to end comparison (not inclusive).
           */
          compare(target: Uint8Array, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): -1 | 0 | 1;
          /**
           * Copies data from a region of `buf` to a region in `target`, even if the `target`memory region overlaps with `buf`.
           *
           * [`TypedArray.prototype.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set) performs the same operation, and is available
           * for all TypedArrays, including Node.js `Buffer`s, although it takes
           * different function arguments.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Create two `Buffer` instances.
           * const buf1 = Buffer.allocUnsafe(26);
           * const buf2 = Buffer.allocUnsafe(26).fill('!');
           *
           * for (let i = 0; i < 26; i++) {
           *   // 97 is the decimal ASCII value for 'a'.
           *   buf1[i] = i + 97;
           * }
           *
           * // Copy `buf1` bytes 16 through 19 into `buf2` starting at byte 8 of `buf2`.
           * buf1.copy(buf2, 8, 16, 20);
           * // This is equivalent to:
           * // buf2.set(buf1.subarray(16, 20), 8);
           *
           * console.log(buf2.toString('ascii', 0, 25));
           * // Prints: !!!!!!!!qrst!!!!!!!!!!!!!
           * ```
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Create a `Buffer` and copy data from one region to an overlapping region
           * // within the same `Buffer`.
           *
           * const buf = Buffer.allocUnsafe(26);
           *
           * for (let i = 0; i < 26; i++) {
           *   // 97 is the decimal ASCII value for 'a'.
           *   buf[i] = i + 97;
           * }
           *
           * buf.copy(buf, 0, 4, 10);
           *
           * console.log(buf.toString());
           * // Prints: efghijghijklmnopqrstuvwxyz
           * ```
           * @param target A `Buffer` or {@link Uint8Array} to copy into.
           * @param [targetStart=0] The offset within `target` at which to begin writing.
           * @param [sourceStart=0] The offset within `buf` from which to begin copying.
           * @param [sourceEnd=buf.length] The offset within `buf` at which to stop copying (not inclusive).
           * @return The number of bytes copied.
           */
          copy(target: Uint8Array, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
          /**
           * Returns a new `Buffer` that references the same memory as the original, but
           * offset and cropped by the `start` and `end` indices.
           *
           * This method is not compatible with the `Uint8Array.prototype.slice()`,
           * which is a superclass of `Buffer`. To copy the slice, use`Uint8Array.prototype.slice()`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('buffer');
           *
           * const copiedBuf = Uint8Array.prototype.slice.call(buf);
           * copiedBuf[0]++;
           * console.log(copiedBuf.toString());
           * // Prints: cuffer
           *
           * console.log(buf.toString());
           * // Prints: buffer
           *
           * // With buf.slice(), the original buffer is modified.
           * const notReallyCopiedBuf = buf.slice();
           * notReallyCopiedBuf[0]++;
           * console.log(notReallyCopiedBuf.toString());
           * // Prints: cuffer
           * console.log(buf.toString());
           * // Also prints: cuffer (!)
           * ```
           * @deprecated Use `subarray` instead.
           * @param [start=0] Where the new `Buffer` will start.
           * @param [end=buf.length] Where the new `Buffer` will end (not inclusive).
           */
          slice(start?: number, end?: number): Buffer;
          /**
           * Returns a new `Buffer` that references the same memory as the original, but
           * offset and cropped by the `start` and `end` indices.
           *
           * Specifying `end` greater than `buf.length` will return the same result as
           * that of `end` equal to `buf.length`.
           *
           * This method is inherited from [`TypedArray.prototype.subarray()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray).
           *
           * Modifying the new `Buffer` slice will modify the memory in the original `Buffer`because the allocated memory of the two objects overlap.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Create a `Buffer` with the ASCII alphabet, take a slice, and modify one byte
           * // from the original `Buffer`.
           *
           * const buf1 = Buffer.allocUnsafe(26);
           *
           * for (let i = 0; i < 26; i++) {
           *   // 97 is the decimal ASCII value for 'a'.
           *   buf1[i] = i + 97;
           * }
           *
           * const buf2 = buf1.subarray(0, 3);
           *
           * console.log(buf2.toString('ascii', 0, buf2.length));
           * // Prints: abc
           *
           * buf1[0] = 33;
           *
           * console.log(buf2.toString('ascii', 0, buf2.length));
           * // Prints: !bc
           * ```
           *
           * Specifying negative indexes causes the slice to be generated relative to the
           * end of `buf` rather than the beginning.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('buffer');
           *
           * console.log(buf.subarray(-6, -1).toString());
           * // Prints: buffe
           * // (Equivalent to buf.subarray(0, 5).)
           *
           * console.log(buf.subarray(-6, -2).toString());
           * // Prints: buff
           * // (Equivalent to buf.subarray(0, 4).)
           *
           * console.log(buf.subarray(-5, -2).toString());
           * // Prints: uff
           * // (Equivalent to buf.subarray(1, 4).)
           * ```
           * @param [start=0] Where the new `Buffer` will start.
           * @param [end=buf.length] Where the new `Buffer` will end (not inclusive).
           */
          subarray(start?: number, end?: number): Buffer;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian.
           *
           * `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(8);
           *
           * buf.writeBigInt64BE(0x0102030405060708n, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 01 02 03 04 05 06 07 08>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy: `0 <= offset <= buf.length - 8`.
           * @return `offset` plus the number of bytes written.
           */
          writeBigInt64BE(value: bigint, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian.
           *
           * `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(8);
           *
           * buf.writeBigInt64LE(0x0102030405060708n, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 08 07 06 05 04 03 02 01>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy: `0 <= offset <= buf.length - 8`.
           * @return `offset` plus the number of bytes written.
           */
          writeBigInt64LE(value: bigint, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian.
           *
           * This function is also available under the `writeBigUint64BE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(8);
           *
           * buf.writeBigUInt64BE(0xdecafafecacefaden, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer de ca fa fe ca ce fa de>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy: `0 <= offset <= buf.length - 8`.
           * @return `offset` plus the number of bytes written.
           */
          writeBigUInt64BE(value: bigint, offset?: number): number;
          /**
           * @alias Buffer.writeBigUInt64BE
           */
          writeBigUint64BE(value: bigint, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(8);
           *
           * buf.writeBigUInt64LE(0xdecafafecacefaden, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer de fa ce ca fe fa ca de>
           * ```
           *
           * This function is also available under the `writeBigUint64LE` alias.
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy: `0 <= offset <= buf.length - 8`.
           * @return `offset` plus the number of bytes written.
           */
          writeBigUInt64LE(value: bigint, offset?: number): number;
          /**
           * @alias Buffer.writeBigUInt64LE
           */
          writeBigUint64LE(value: bigint, offset?: number): number;
          /**
           * Writes `byteLength` bytes of `value` to `buf` at the specified `offset`as little-endian. Supports up to 48 bits of accuracy. Behavior is undefined
           * when `value` is anything other than an unsigned integer.
           *
           * This function is also available under the `writeUintLE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(6);
           *
           * buf.writeUIntLE(0x1234567890ab, 0, 6);
           *
           * console.log(buf);
           * // Prints: <Buffer ab 90 78 56 34 12>
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param value Number to be written to `buf`.
           * @param offset Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to write. Must satisfy `0 < byteLength <= 6`.
           * @return `offset` plus the number of bytes written.
           */
          writeUIntLE(value: number, offset: number, byteLength: number): number;
          /**
           * @alias Buffer.writeUIntLE
           */
          writeUintLE(value: number, offset: number, byteLength: number): number;
          /**
           * Writes `byteLength` bytes of `value` to `buf` at the specified `offset`as big-endian. Supports up to 48 bits of accuracy. Behavior is undefined
           * when `value` is anything other than an unsigned integer.
           *
           * This function is also available under the `writeUintBE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(6);
           *
           * buf.writeUIntBE(0x1234567890ab, 0, 6);
           *
           * console.log(buf);
           * // Prints: <Buffer 12 34 56 78 90 ab>
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param value Number to be written to `buf`.
           * @param offset Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to write. Must satisfy `0 < byteLength <= 6`.
           * @return `offset` plus the number of bytes written.
           */
          writeUIntBE(value: number, offset: number, byteLength: number): number;
          /**
           * @alias Buffer.writeUIntBE
           */
          writeUintBE(value: number, offset: number, byteLength: number): number;
          /**
           * Writes `byteLength` bytes of `value` to `buf` at the specified `offset`as little-endian. Supports up to 48 bits of accuracy. Behavior is undefined
           * when `value` is anything other than a signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(6);
           *
           * buf.writeIntLE(0x1234567890ab, 0, 6);
           *
           * console.log(buf);
           * // Prints: <Buffer ab 90 78 56 34 12>
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param value Number to be written to `buf`.
           * @param offset Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to write. Must satisfy `0 < byteLength <= 6`.
           * @return `offset` plus the number of bytes written.
           */
          writeIntLE(value: number, offset: number, byteLength: number): number;
          /**
           * Writes `byteLength` bytes of `value` to `buf` at the specified `offset`as big-endian. Supports up to 48 bits of accuracy. Behavior is undefined when`value` is anything other than a
           * signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(6);
           *
           * buf.writeIntBE(0x1234567890ab, 0, 6);
           *
           * console.log(buf);
           * // Prints: <Buffer 12 34 56 78 90 ab>
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param value Number to be written to `buf`.
           * @param offset Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to write. Must satisfy `0 < byteLength <= 6`.
           * @return `offset` plus the number of bytes written.
           */
          writeIntBE(value: number, offset: number, byteLength: number): number;
          /**
           * Reads an unsigned, big-endian 64-bit integer from `buf` at the specified`offset`.
           *
           * This function is also available under the `readBigUint64BE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);
           *
           * console.log(buf.readBigUInt64BE(0));
           * // Prints: 4294967295n
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy: `0 <= offset <= buf.length - 8`.
           */
          readBigUInt64BE(offset?: number): bigint;
          /**
           * @alias Buffer.readBigUInt64BE
           */
          readBigUint64BE(offset?: number): bigint;
          /**
           * Reads an unsigned, little-endian 64-bit integer from `buf` at the specified`offset`.
           *
           * This function is also available under the `readBigUint64LE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xff, 0xff]);
           *
           * console.log(buf.readBigUInt64LE(0));
           * // Prints: 18446744069414584320n
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy: `0 <= offset <= buf.length - 8`.
           */
          readBigUInt64LE(offset?: number): bigint;
          /**
           * @alias Buffer.readBigUInt64LE
           */
          readBigUint64LE(offset?: number): bigint;
          /**
           * Reads a signed, big-endian 64-bit integer from `buf` at the specified `offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed
           * values.
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy: `0 <= offset <= buf.length - 8`.
           */
          readBigInt64BE(offset?: number): bigint;
          /**
           * Reads a signed, little-endian 64-bit integer from `buf` at the specified`offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed
           * values.
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy: `0 <= offset <= buf.length - 8`.
           */
          readBigInt64LE(offset?: number): bigint;
          /**
           * Reads `byteLength` number of bytes from `buf` at the specified `offset`and interprets the result as an unsigned, little-endian integer supporting
           * up to 48 bits of accuracy.
           *
           * This function is also available under the `readUintLE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
           *
           * console.log(buf.readUIntLE(0, 6).toString(16));
           * // Prints: ab9078563412
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param offset Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to read. Must satisfy `0 < byteLength <= 6`.
           */
          readUIntLE(offset: number, byteLength: number): number;
          /**
           * @alias Buffer.readUIntLE
           */
          readUintLE(offset: number, byteLength: number): number;
          /**
           * Reads `byteLength` number of bytes from `buf` at the specified `offset`and interprets the result as an unsigned big-endian integer supporting
           * up to 48 bits of accuracy.
           *
           * This function is also available under the `readUintBE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
           *
           * console.log(buf.readUIntBE(0, 6).toString(16));
           * // Prints: 1234567890ab
           * console.log(buf.readUIntBE(1, 6).toString(16));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param offset Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to read. Must satisfy `0 < byteLength <= 6`.
           */
          readUIntBE(offset: number, byteLength: number): number;
          /**
           * @alias Buffer.readUIntBE
           */
          readUintBE(offset: number, byteLength: number): number;
          /**
           * Reads `byteLength` number of bytes from `buf` at the specified `offset`and interprets the result as a little-endian, two's complement signed value
           * supporting up to 48 bits of accuracy.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
           *
           * console.log(buf.readIntLE(0, 6).toString(16));
           * // Prints: -546f87a9cbee
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param offset Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to read. Must satisfy `0 < byteLength <= 6`.
           */
          readIntLE(offset: number, byteLength: number): number;
          /**
           * Reads `byteLength` number of bytes from `buf` at the specified `offset`and interprets the result as a big-endian, two's complement signed value
           * supporting up to 48 bits of accuracy.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);
           *
           * console.log(buf.readIntBE(0, 6).toString(16));
           * // Prints: 1234567890ab
           * console.log(buf.readIntBE(1, 6).toString(16));
           * // Throws ERR_OUT_OF_RANGE.
           * console.log(buf.readIntBE(1, 0).toString(16));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           *
           * Note: as of Bun v0.1.2, this is not implemented yet.
           * @param offset Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - byteLength`.
           * @param byteLength Number of bytes to read. Must satisfy `0 < byteLength <= 6`.
           */
          readIntBE(offset: number, byteLength: number): number;
          /**
           * Reads an unsigned 8-bit integer from `buf` at the specified `offset`.
           *
           * This function is also available under the `readUint8` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([1, -2]);
           *
           * console.log(buf.readUInt8(0));
           * // Prints: 1
           * console.log(buf.readUInt8(1));
           * // Prints: 254
           * console.log(buf.readUInt8(2));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 1`.
           */
          readUInt8(offset?: number): number;
          /**
           * @alias Buffer.readUInt8
           */
          readUint8(offset?: number): number;
          /**
           * Reads an unsigned, little-endian 16-bit integer from `buf` at the specified`offset`.
           *
           * This function is also available under the `readUint16LE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56]);
           *
           * console.log(buf.readUInt16LE(0).toString(16));
           * // Prints: 3412
           * console.log(buf.readUInt16LE(1).toString(16));
           * // Prints: 5634
           * console.log(buf.readUInt16LE(2).toString(16));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 2`.
           */
          readUInt16LE(offset?: number): number;
          /**
           * @alias Buffer.readUInt16LE
           */
          readUint16LE(offset?: number): number;
          /**
           * Reads an unsigned, big-endian 16-bit integer from `buf` at the specified`offset`.
           *
           * This function is also available under the `readUint16BE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56]);
           *
           * console.log(buf.readUInt16BE(0).toString(16));
           * // Prints: 1234
           * console.log(buf.readUInt16BE(1).toString(16));
           * // Prints: 3456
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 2`.
           */
          readUInt16BE(offset?: number): number;
          /**
           * @alias Buffer.readUInt16BE
           */
          readUint16BE(offset?: number): number;
          /**
           * Reads an unsigned, little-endian 32-bit integer from `buf` at the specified`offset`.
           *
           * This function is also available under the `readUint32LE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);
           *
           * console.log(buf.readUInt32LE(0).toString(16));
           * // Prints: 78563412
           * console.log(buf.readUInt32LE(1).toString(16));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 4`.
           */
          readUInt32LE(offset?: number): number;
          /**
           * @alias Buffer.readUInt32LE
           */
          readUint32LE(offset?: number): number;
          /**
           * Reads an unsigned, big-endian 32-bit integer from `buf` at the specified`offset`.
           *
           * This function is also available under the `readUint32BE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);
           *
           * console.log(buf.readUInt32BE(0).toString(16));
           * // Prints: 12345678
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 4`.
           */
          readUInt32BE(offset?: number): number;
          /**
           * @alias Buffer.readUInt32BE
           */
          readUint32BE(offset?: number): number;
          /**
           * Reads a signed 8-bit integer from `buf` at the specified `offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed values.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([-1, 5]);
           *
           * console.log(buf.readInt8(0));
           * // Prints: -1
           * console.log(buf.readInt8(1));
           * // Prints: 5
           * console.log(buf.readInt8(2));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 1`.
           */
          readInt8(offset?: number): number;
          /**
           * Reads a signed, little-endian 16-bit integer from `buf` at the specified`offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed values.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0, 5]);
           *
           * console.log(buf.readInt16LE(0));
           * // Prints: 1280
           * console.log(buf.readInt16LE(1));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 2`.
           */
          readInt16LE(offset?: number): number;
          /**
           * Reads a signed, big-endian 16-bit integer from `buf` at the specified `offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed values.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0, 5]);
           *
           * console.log(buf.readInt16BE(0));
           * // Prints: 5
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 2`.
           */
          readInt16BE(offset?: number): number;
          /**
           * Reads a signed, little-endian 32-bit integer from `buf` at the specified`offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed values.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0, 0, 0, 5]);
           *
           * console.log(buf.readInt32LE(0));
           * // Prints: 83886080
           * console.log(buf.readInt32LE(1));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 4`.
           */
          readInt32LE(offset?: number): number;
          /**
           * Reads a signed, big-endian 32-bit integer from `buf` at the specified `offset`.
           *
           * Integers read from a `Buffer` are interpreted as two's complement signed values.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([0, 0, 0, 5]);
           *
           * console.log(buf.readInt32BE(0));
           * // Prints: 5
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 4`.
           */
          readInt32BE(offset?: number): number;
          /**
           * Reads a 32-bit, little-endian float from `buf` at the specified `offset`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([1, 2, 3, 4]);
           *
           * console.log(buf.readFloatLE(0));
           * // Prints: 1.539989614439558e-36
           * console.log(buf.readFloatLE(1));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 4`.
           */
          readFloatLE(offset?: number): number;
          /**
           * Reads a 32-bit, big-endian float from `buf` at the specified `offset`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([1, 2, 3, 4]);
           *
           * console.log(buf.readFloatBE(0));
           * // Prints: 2.387939260590663e-38
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 4`.
           */
          readFloatBE(offset?: number): number;
          /**
           * Reads a 64-bit, little-endian double from `buf` at the specified `offset`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
           *
           * console.log(buf.readDoubleLE(0));
           * // Prints: 5.447603722011605e-270
           * console.log(buf.readDoubleLE(1));
           * // Throws ERR_OUT_OF_RANGE.
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 8`.
           */
          readDoubleLE(offset?: number): number;
          /**
           * Reads a 64-bit, big-endian double from `buf` at the specified `offset`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
           *
           * console.log(buf.readDoubleBE(0));
           * // Prints: 8.20788039913184e-304
           * ```
           * @param [offset=0] Number of bytes to skip before starting to read. Must satisfy `0 <= offset <= buf.length - 8`.
           */
          readDoubleBE(offset?: number): number;
          reverse(): this;
          /**
           * Interprets `buf` as an array of unsigned 16-bit integers and swaps the
           * byte order _in-place_. Throws `ERR_INVALID_BUFFER_SIZE` if `buf.length` is not a multiple of 2.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
           *
           * console.log(buf1);
           * // Prints: <Buffer 01 02 03 04 05 06 07 08>
           *
           * buf1.swap16();
           *
           * console.log(buf1);
           * // Prints: <Buffer 02 01 04 03 06 05 08 07>
           *
           * const buf2 = Buffer.from([0x1, 0x2, 0x3]);
           *
           * buf2.swap16();
           * // Throws ERR_INVALID_BUFFER_SIZE.
           * ```
           *
           * One convenient use of `buf.swap16()` is to perform a fast in-place conversion
           * between UTF-16 little-endian and UTF-16 big-endian:
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('This is little-endian UTF-16', 'utf16le');
           * buf.swap16(); // Convert to big-endian UTF-16 text.
           * ```
           * @return A reference to `buf`.
           */
          swap16(): Buffer;
          /**
           * Interprets `buf` as an array of unsigned 32-bit integers and swaps the
           * byte order _in-place_. Throws `ERR_INVALID_BUFFER_SIZE` if `buf.length` is not a multiple of 4.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
           *
           * console.log(buf1);
           * // Prints: <Buffer 01 02 03 04 05 06 07 08>
           *
           * buf1.swap32();
           *
           * console.log(buf1);
           * // Prints: <Buffer 04 03 02 01 08 07 06 05>
           *
           * const buf2 = Buffer.from([0x1, 0x2, 0x3]);
           *
           * buf2.swap32();
           * // Throws ERR_INVALID_BUFFER_SIZE.
           * ```
           * @return A reference to `buf`.
           */
          swap32(): Buffer;
          /**
           * Interprets `buf` as an array of 64-bit numbers and swaps byte order _in-place_.
           * Throws `ERR_INVALID_BUFFER_SIZE` if `buf.length` is not a multiple of 8.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]);
           *
           * console.log(buf1);
           * // Prints: <Buffer 01 02 03 04 05 06 07 08>
           *
           * buf1.swap64();
           *
           * console.log(buf1);
           * // Prints: <Buffer 08 07 06 05 04 03 02 01>
           *
           * const buf2 = Buffer.from([0x1, 0x2, 0x3]);
           *
           * buf2.swap64();
           * // Throws ERR_INVALID_BUFFER_SIZE.
           * ```
           * @return A reference to `buf`.
           */
          swap64(): Buffer;
          /**
           * Writes `value` to `buf` at the specified `offset`. `value` must be a
           * valid unsigned 8-bit integer. Behavior is undefined when `value` is anything
           * other than an unsigned 8-bit integer.
           *
           * This function is also available under the `writeUint8` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeUInt8(0x3, 0);
           * buf.writeUInt8(0x4, 1);
           * buf.writeUInt8(0x23, 2);
           * buf.writeUInt8(0x42, 3);
           *
           * console.log(buf);
           * // Prints: <Buffer 03 04 23 42>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 1`.
           * @return `offset` plus the number of bytes written.
           */
          writeUInt8(value: number, offset?: number): number;
          /**
           * @alias Buffer.writeUInt8
           */
          writeUint8(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian. The `value`must be a valid unsigned 16-bit integer. Behavior is undefined when `value` is
           * anything other than an unsigned 16-bit integer.
           *
           * This function is also available under the `writeUint16LE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeUInt16LE(0xdead, 0);
           * buf.writeUInt16LE(0xbeef, 2);
           *
           * console.log(buf);
           * // Prints: <Buffer ad de ef be>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 2`.
           * @return `offset` plus the number of bytes written.
           */
          writeUInt16LE(value: number, offset?: number): number;
          /**
           * @alias Buffer.writeUInt16LE
           */
          writeUint16LE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian. The `value`must be a valid unsigned 16-bit integer. Behavior is undefined when `value`is anything other than an
           * unsigned 16-bit integer.
           *
           * This function is also available under the `writeUint16BE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeUInt16BE(0xdead, 0);
           * buf.writeUInt16BE(0xbeef, 2);
           *
           * console.log(buf);
           * // Prints: <Buffer de ad be ef>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 2`.
           * @return `offset` plus the number of bytes written.
           */
          writeUInt16BE(value: number, offset?: number): number;
          /**
           * @alias Buffer.writeUInt16BE
           */
          writeUint16BE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian. The `value`must be a valid unsigned 32-bit integer. Behavior is undefined when `value` is
           * anything other than an unsigned 32-bit integer.
           *
           * This function is also available under the `writeUint32LE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeUInt32LE(0xfeedface, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer ce fa ed fe>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 4`.
           * @return `offset` plus the number of bytes written.
           */
          writeUInt32LE(value: number, offset?: number): number;
          /**
           * @alias Buffer.writeUInt32LE
           */
          writeUint32LE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian. The `value`must be a valid unsigned 32-bit integer. Behavior is undefined when `value`is anything other than an
           * unsigned 32-bit integer.
           *
           * This function is also available under the `writeUint32BE` alias.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeUInt32BE(0xfeedface, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer fe ed fa ce>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 4`.
           * @return `offset` plus the number of bytes written.
           */
          writeUInt32BE(value: number, offset?: number): number;
          /**
           * @alias Buffer.writeUInt32BE
           */
          writeUint32BE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset`. `value` must be a valid
           * signed 8-bit integer. Behavior is undefined when `value` is anything other than
           * a signed 8-bit integer.
           *
           * `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(2);
           *
           * buf.writeInt8(2, 0);
           * buf.writeInt8(-2, 1);
           *
           * console.log(buf);
           * // Prints: <Buffer 02 fe>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 1`.
           * @return `offset` plus the number of bytes written.
           */
          writeInt8(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian.  The `value`must be a valid signed 16-bit integer. Behavior is undefined when `value` is
           * anything other than a signed 16-bit integer.
           *
           * The `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(2);
           *
           * buf.writeInt16LE(0x0304, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 04 03>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 2`.
           * @return `offset` plus the number of bytes written.
           */
          writeInt16LE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian.  The `value`must be a valid signed 16-bit integer. Behavior is undefined when `value` is
           * anything other than a signed 16-bit integer.
           *
           * The `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(2);
           *
           * buf.writeInt16BE(0x0102, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 01 02>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 2`.
           * @return `offset` plus the number of bytes written.
           */
          writeInt16BE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian. The `value`must be a valid signed 32-bit integer. Behavior is undefined when `value` is
           * anything other than a signed 32-bit integer.
           *
           * The `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeInt32LE(0x05060708, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 08 07 06 05>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 4`.
           * @return `offset` plus the number of bytes written.
           */
          writeInt32LE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian. The `value`must be a valid signed 32-bit integer. Behavior is undefined when `value` is
           * anything other than a signed 32-bit integer.
           *
           * The `value` is interpreted and written as a two's complement signed integer.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeInt32BE(0x01020304, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 01 02 03 04>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 4`.
           * @return `offset` plus the number of bytes written.
           */
          writeInt32BE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian. Behavior is
           * undefined when `value` is anything other than a JavaScript number.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeFloatLE(0xcafebabe, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer bb fe 4a 4f>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 4`.
           * @return `offset` plus the number of bytes written.
           */
          writeFloatLE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian. Behavior is
           * undefined when `value` is anything other than a JavaScript number.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(4);
           *
           * buf.writeFloatBE(0xcafebabe, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 4f 4a fe bb>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 4`.
           * @return `offset` plus the number of bytes written.
           */
          writeFloatBE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as little-endian. The `value`must be a JavaScript number. Behavior is undefined when `value` is anything
           * other than a JavaScript number.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(8);
           *
           * buf.writeDoubleLE(123.456, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 77 be 9f 1a 2f dd 5e 40>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 8`.
           * @return `offset` plus the number of bytes written.
           */
          writeDoubleLE(value: number, offset?: number): number;
          /**
           * Writes `value` to `buf` at the specified `offset` as big-endian. The `value`must be a JavaScript number. Behavior is undefined when `value` is anything
           * other than a JavaScript number.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(8);
           *
           * buf.writeDoubleBE(123.456, 0);
           *
           * console.log(buf);
           * // Prints: <Buffer 40 5e dd 2f 1a 9f be 77>
           * ```
           * @param value Number to be written to `buf`.
           * @param [offset=0] Number of bytes to skip before starting to write. Must satisfy `0 <= offset <= buf.length - 8`.
           * @return `offset` plus the number of bytes written.
           */
          writeDoubleBE(value: number, offset?: number): number;
          /**
           * Fills `buf` with the specified `value`. If the `offset` and `end` are not given,
           * the entire `buf` will be filled:
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Fill a `Buffer` with the ASCII character 'h'.
           *
           * const b = Buffer.allocUnsafe(50).fill('h');
           *
           * console.log(b.toString());
           * // Prints: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
           * ```
           *
           * `value` is coerced to a `uint32` value if it is not a string, `Buffer`, or
           * integer. If the resulting integer is greater than `255` (decimal), `buf` will be
           * filled with `value &#x26; 255`.
           *
           * If the final write of a `fill()` operation falls on a multi-byte character,
           * then only the bytes of that character that fit into `buf` are written:
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Fill a `Buffer` with character that takes up two bytes in UTF-8.
           *
           * console.log(Buffer.allocUnsafe(5).fill('\u0222'));
           * // Prints: <Buffer c8 a2 c8 a2 c8>
           * ```
           *
           * If `value` contains invalid characters, it is truncated; if no valid
           * fill data remains, an exception is thrown:
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.allocUnsafe(5);
           *
           * console.log(buf.fill('a'));
           * // Prints: <Buffer 61 61 61 61 61>
           * console.log(buf.fill('aazz', 'hex'));
           * // Prints: <Buffer aa aa aa aa aa>
           * console.log(buf.fill('zz', 'hex'));
           * // Throws an exception.
           * ```
           * @param value The value with which to fill `buf`.
           * @param [offset=0] Number of bytes to skip before starting to fill `buf`.
           * @param [end=buf.length] Where to stop filling `buf` (not inclusive).
           * @param [encoding='utf8'] The encoding for `value` if `value` is a string.
           * @return A reference to `buf`.
           */
          fill(value: string | Uint8Array | number, offset?: number, end?: number, encoding?: BufferEncoding): this;
          /**
           * If `value` is:
           *
           * * a string, `value` is interpreted according to the character encoding in`encoding`.
           * * a `Buffer` or [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), `value` will be used in its entirety.
           * To compare a partial `Buffer`, use `buf.subarray`.
           * * a number, `value` will be interpreted as an unsigned 8-bit integer
           * value between `0` and `255`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('this is a buffer');
           *
           * console.log(buf.indexOf('this'));
           * // Prints: 0
           * console.log(buf.indexOf('is'));
           * // Prints: 2
           * console.log(buf.indexOf(Buffer.from('a buffer')));
           * // Prints: 8
           * console.log(buf.indexOf(97));
           * // Prints: 8 (97 is the decimal ASCII value for 'a')
           * console.log(buf.indexOf(Buffer.from('a buffer example')));
           * // Prints: -1
           * console.log(buf.indexOf(Buffer.from('a buffer example').slice(0, 8)));
           * // Prints: 8
           *
           * const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');
           *
           * console.log(utf16Buffer.indexOf('\u03a3', 0, 'utf16le'));
           * // Prints: 4
           * console.log(utf16Buffer.indexOf('\u03a3', -4, 'utf16le'));
           * // Prints: 6
           * ```
           *
           * If `value` is not a string, number, or `Buffer`, this method will throw a`TypeError`. If `value` is a number, it will be coerced to a valid byte value,
           * an integer between 0 and 255.
           *
           * If `byteOffset` is not a number, it will be coerced to a number. If the result
           * of coercion is `NaN` or `0`, then the entire buffer will be searched. This
           * behavior matches [`String.prototype.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf).
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const b = Buffer.from('abcdef');
           *
           * // Passing a value that's a number, but not a valid byte.
           * // Prints: 2, equivalent to searching for 99 or 'c'.
           * console.log(b.indexOf(99.9));
           * console.log(b.indexOf(256 + 99));
           *
           * // Passing a byteOffset that coerces to NaN or 0.
           * // Prints: 1, searching the whole buffer.
           * console.log(b.indexOf('b', undefined));
           * console.log(b.indexOf('b', {}));
           * console.log(b.indexOf('b', null));
           * console.log(b.indexOf('b', []));
           * ```
           *
           * If `value` is an empty string or empty `Buffer` and `byteOffset` is less
           * than `buf.length`, `byteOffset` will be returned. If `value` is empty and`byteOffset` is at least `buf.length`, `buf.length` will be returned.
           * @param value What to search for.
           * @param [byteOffset=0] Where to begin searching in `buf`. If negative, then offset is calculated from the end of `buf`.
           * @param [encoding='utf8'] If `value` is a string, this is the encoding used to determine the binary representation of the string that will be searched for in `buf`.
           * @return The index of the first occurrence of `value` in `buf`, or `-1` if `buf` does not contain `value`.
           */
          indexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
          /**
           * Identical to `buf.indexOf()`, except the last occurrence of `value` is found
           * rather than the first occurrence.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('this buffer is a buffer');
           *
           * console.log(buf.lastIndexOf('this'));
           * // Prints: 0
           * console.log(buf.lastIndexOf('buffer'));
           * // Prints: 17
           * console.log(buf.lastIndexOf(Buffer.from('buffer')));
           * // Prints: 17
           * console.log(buf.lastIndexOf(97));
           * // Prints: 15 (97 is the decimal ASCII value for 'a')
           * console.log(buf.lastIndexOf(Buffer.from('yolo')));
           * // Prints: -1
           * console.log(buf.lastIndexOf('buffer', 5));
           * // Prints: 5
           * console.log(buf.lastIndexOf('buffer', 4));
           * // Prints: -1
           *
           * const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'utf16le');
           *
           * console.log(utf16Buffer.lastIndexOf('\u03a3', undefined, 'utf16le'));
           * // Prints: 6
           * console.log(utf16Buffer.lastIndexOf('\u03a3', -5, 'utf16le'));
           * // Prints: 4
           * ```
           *
           * If `value` is not a string, number, or `Buffer`, this method will throw a`TypeError`. If `value` is a number, it will be coerced to a valid byte value,
           * an integer between 0 and 255.
           *
           * If `byteOffset` is not a number, it will be coerced to a number. Any arguments
           * that coerce to `NaN`, like `{}` or `undefined`, will search the whole buffer.
           * This behavior matches [`String.prototype.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf).
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const b = Buffer.from('abcdef');
           *
           * // Passing a value that's a number, but not a valid byte.
           * // Prints: 2, equivalent to searching for 99 or 'c'.
           * console.log(b.lastIndexOf(99.9));
           * console.log(b.lastIndexOf(256 + 99));
           *
           * // Passing a byteOffset that coerces to NaN.
           * // Prints: 1, searching the whole buffer.
           * console.log(b.lastIndexOf('b', undefined));
           * console.log(b.lastIndexOf('b', {}));
           *
           * // Passing a byteOffset that coerces to 0.
           * // Prints: -1, equivalent to passing 0.
           * console.log(b.lastIndexOf('b', null));
           * console.log(b.lastIndexOf('b', []));
           * ```
           *
           * If `value` is an empty string or empty `Buffer`, `byteOffset` will be returned.
           * @param value What to search for.
           * @param [byteOffset=buf.length - 1] Where to begin searching in `buf`. If negative, then offset is calculated from the end of `buf`.
           * @param [encoding='utf8'] If `value` is a string, this is the encoding used to determine the binary representation of the string that will be searched for in `buf`.
           * @return The index of the last occurrence of `value` in `buf`, or `-1` if `buf` does not contain `value`.
           */
          lastIndexOf(value: string | number | Uint8Array, byteOffset?: number, encoding?: BufferEncoding): number;
          /**
           * Creates and returns an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) of `[index, byte]` pairs from the contents
           * of `buf`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * // Log the entire contents of a `Buffer`.
           *
           * const buf = Buffer.from('buffer');
           *
           * for (const pair of buf.entries()) {
           *   console.log(pair);
           * }
           * // Prints:
           * //   [0, 98]
           * //   [1, 117]
           * //   [2, 102]
           * //   [3, 102]
           * //   [4, 101]
           * //   [5, 114]
           * ```
           */
          entries(): IterableIterator<[number, number]>;
          /**
           * Equivalent to `buf.indexOf() !== -1`.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('this is a buffer');
           *
           * console.log(buf.includes('this'));
           * // Prints: true
           * console.log(buf.includes('is'));
           * // Prints: true
           * console.log(buf.includes(Buffer.from('a buffer')));
           * // Prints: true
           * console.log(buf.includes(97));
           * // Prints: true (97 is the decimal ASCII value for 'a')
           * console.log(buf.includes(Buffer.from('a buffer example')));
           * // Prints: false
           * console.log(buf.includes(Buffer.from('a buffer example').slice(0, 8)));
           * // Prints: true
           * console.log(buf.includes('this', 4));
           * // Prints: false
           * ```
           * @param value What to search for.
           * @param [byteOffset=0] Where to begin searching in `buf`. If negative, then offset is calculated from the end of `buf`.
           * @param [encoding='utf8'] If `value` is a string, this is its encoding.
           * @return `true` if `value` was found in `buf`, `false` otherwise.
           */
          includes(value: string | number | Buffer, byteOffset?: number, encoding?: BufferEncoding): boolean;
          /**
           * Creates and returns an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) of `buf` keys (indices).
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('buffer');
           *
           * for (const key of buf.keys()) {
           *   console.log(key);
           * }
           * // Prints:
           * //   0
           * //   1
           * //   2
           * //   3
           * //   4
           * //   5
           * ```
           */
          keys(): IterableIterator<number>;
          /**
           * Creates and returns an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) for `buf` values (bytes). This function is
           * called automatically when a `Buffer` is used in a `for..of` statement.
           *
           * ```js
           * import { Buffer } from 'buffer';
           *
           * const buf = Buffer.from('buffer');
           *
           * for (const value of buf.values()) {
           *   console.log(value);
           * }
           * // Prints:
           * //   98
           * //   117
           * //   102
           * //   102
           * //   101
           * //   114
           *
           * for (const value of buf) {
           *   console.log(value);
           * }
           * // Prints:
           * //   98
           * //   117
           * //   102
           * //   102
           * //   101
           * //   114
           * ```
           */
          values(): IterableIterator<number>;
      }
      var Buffer: BufferConstructor;
  }
}
declare module 'node:buffer' {
  export * from 'buffer';
}


// ./ffi.d.ts

/**
 * `bun:ffi` lets you efficiently call C functions & FFI functions from JavaScript
 *  without writing bindings yourself.
 *
 * ```js
 * import {dlopen, CString, ptr} from 'bun:ffi';
 *
 * const lib = dlopen('libsqlite3', {
 * });
 * ```
 *
 * This is powered by just-in-time compiling C wrappers
 * that convert JavaScript types to C types and back. Internally,
 * bun uses [tinycc](https://github.com/TinyCC/tinycc), so a big thanks
 * goes to Fabrice Bellard and TinyCC maintainers for making this possible.
 *
 */
declare module "bun:ffi" {
  export enum FFIType {
    char = 0,
    /**
     * 8-bit signed integer
     *
     * Must be a value between -127 and 127
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * signed char
     * char // on x64 & aarch64 macOS
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    int8_t = 1,
    /**
     * 8-bit signed integer
     *
     * Must be a value between -127 and 127
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * signed char
     * char // on x64 & aarch64 macOS
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    i8 = 1,

    /**
     * 8-bit unsigned integer
     *
     * Must be a value between 0 and 255
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * unsigned char
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    uint8_t = 2,
    /**
     * 8-bit unsigned integer
     *
     * Must be a value between 0 and 255
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * unsigned char
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    u8 = 2,

    /**
     * 16-bit signed integer
     *
     * Must be a value between -32768 and 32767
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * in16_t
     * short // on arm64 & x64
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    int16_t = 3,
    /**
     * 16-bit signed integer
     *
     * Must be a value between -32768 and 32767
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * in16_t
     * short // on arm64 & x64
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    i16 = 3,

    /**
     * 16-bit unsigned integer
     *
     * Must be a value between 0 and 65535, inclusive.
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * uint16_t
     * unsigned short // on arm64 & x64
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    uint16_t = 4,
    /**
     * 16-bit unsigned integer
     *
     * Must be a value between 0 and 65535, inclusive.
     *
     * When passing to a FFI function (C ABI), type coercsion is not performed.
     *
     * In C:
     * ```c
     * uint16_t
     * unsigned short // on arm64 & x64
     * ```
     *
     * In JavaScript:
     * ```js
     * var num = 0;
     * ```
     */
    u16 = 4,

    /**
     * 32-bit signed integer
     *
     */
    int32_t = 5,

    /**
     * 32-bit signed integer
     *
     * Alias of {@link FFIType.int32_t}
     */
    i32 = 5,
    /**
     * 32-bit signed integer
     *
     * The same as `int` in C
     *
     * ```c
     * int
     * ```
     */
    int = 5,

    /**
     * 32-bit unsigned integer
     *
     * The same as `unsigned int` in C (on x64 & arm64)
     *
     * C:
     * ```c
     * unsigned int
     * ```
     * JavaScript:
     * ```js
     * ptr(new Uint32Array(1))
     * ```
     */
    uint32_t = 6,
    /**
     * 32-bit unsigned integer
     *
     * Alias of {@link FFIType.uint32_t}
     */
    u32 = 6,

    /**
     * int64 is a 64-bit signed integer
     *
     * This is not implemented yet!
     */
    int64_t = 7,
    /**
     * i64 is a 64-bit signed integer
     *
     * This is not implemented yet!
     */
    i64 = 7,

    /**
     * 64-bit unsigned integer
     *
     * This is not implemented yet!
     */
    uint64_t = 8,
    /**
     * 64-bit unsigned integer
     *
     * This is not implemented yet!
     */
    u64 = 8,

    /**
     * Doubles are not supported yet!
     */
    double = 9,
    /**
     * Doubles are not supported yet!
     */
    f64 = 9,
    /**
     * Floats are not supported yet!
     */
    float = 10,
    /**
     * Floats are not supported yet!
     */
    f32 = 10,

    /**
     * Booelan value
     *
     * Must be `true` or `false`. `0` and `1` type coercion is not supported.
     *
     * In C, this corresponds to:
     * ```c
     * bool
     * _Bool
     * ```
     *
     *
     */
    bool = 11,

    /**
     * Pointer value
     *
     * See {@link Bun.FFI.ptr} for more information
     *
     * In C:
     * ```c
     * void*
     * ```
     *
     * In JavaScript:
     * ```js
     * ptr(new Uint8Array(1))
     * ```
     */
    ptr = 12,
    /**
     * Pointer value
     *
     * alias of {@link FFIType.ptr}
     */
    pointer = 12,

    /**
     * void value
     *
     * void arguments are not supported
     *
     * void return type is the default return type
     *
     * In C:
     * ```c
     * void
     * ```
     *
     */
    void = 13,

    /**
     * When used as a `returns`, this will automatically become a {@link CString}.
     *
     * When used in `args` it is equivalent to {@link FFIType.pointer}
     *
     */
    cstring = 14,

    /**
     * Attempt to coerce `BigInt` into a `Number` if it fits. This improves performance
     * but means you might get a `BigInt` or you might get a `number`.
     *
     * In C, this always becomes `int64_t`
     *
     * In JavaScript, this could be number or it could be BigInt, depending on what
     * value is passed in.
     *
     */
    i64_fast = 15,

    /**
     * Attempt to coerce `BigInt` into a `Number` if it fits. This improves performance
     * but means you might get a `BigInt` or you might get a `number`.
     *
     * In C, this always becomes `uint64_t`
     *
     * In JavaScript, this could be number or it could be BigInt, depending on what
     * value is passed in.
     *
     */
    u64_fast = 16,
  }
  export type FFITypeOrString =
    | FFIType
    | "char"
    | "int8_t"
    | "i8"
    | "uint8_t"
    | "u8"
    | "int16_t"
    | "i16"
    | "uint16_t"
    | "u16"
    | "int32_t"
    | "i32"
    | "int"
    | "uint32_t"
    | "u32"
    | "int64_t"
    | "i64"
    | "uint64_t"
    | "u64"
    | "double"
    | "f64"
    | "float"
    | "f32"
    | "bool"
    | "ptr"
    | "pointer"
    | "void"
    | "cstring";

  interface FFIFunction {
    /**
     * Arguments to a FFI function (C ABI)
     *
     * Defaults to an empty array, which means no arguments.
     *
     * To pass a pointer, use "ptr" or "pointer" as the type name. To get a pointer, see {@link ptr}.
     *
     * @example
     * From JavaScript:
     * ```js
     * const lib = dlopen('add', {
     *    // FFIType can be used or you can pass string labels.
     *    args: [FFIType.i32, "i32"],
     *    returns: "i32",
     * });
     * lib.symbols.add(1, 2)
     * ```
     * In C:
     * ```c
     * int add(int a, int b) {
     *   return a + b;
     * }
     * ```
     */
    args?: FFITypeOrString[];
    /**
     * Return type to a FFI function (C ABI)
     *
     * Defaults to {@link FFIType.void}
     *
     * To pass a pointer, use "ptr" or "pointer" as the type name. To get a pointer, see {@link ptr}.
     *
     * @example
     * From JavaScript:
     * ```js
     * const lib = dlopen('z', {
     *    version: {
     *      returns: "ptr",
     *   }
     * });
     * console.log(new CString(lib.symbols.version()));
     * ```
     * In C:
     * ```c
     * char* version()
     * {
     *  return "1.0.0";
     * }
     * ```
     */
    returns?: FFITypeOrString;

    /**
     * Function pointer to the native function
     *
     * If provided, instead of using dlsym() to lookup the function, Bun will use this instead.
     * This pointer should not be null (0).
     *
     * This is useful if the library has already been loaded
     * or if the module is also using Node-API.
     */
    ptr?: number | bigint;
  }

  type Symbols = Record<string, FFIFunction>;

  // /**
  //  * Compile a callback function
  //  *
  //  * Returns a function pointer
  //  *
  //  */
  // export function callback(ffi: FFIFunction, cb: Function): number;

  export interface Library {
    symbols: Record<
      string,
      CallableFunction & {
        /**
         * The function without a wrapper
         */
        native: CallableFunction;
      }
    >;

    /**
     * `dlclose` the library, unloading the symbols and freeing allocated memory.
     *
     * Once called, the library is no longer usable.
     *
     * Calling a function from a library that has been closed is undefined behavior.
     */
    close(): void;
  }

  /**
   * Open a library using `"bun:ffi"`
   *
   * @param name The name of the library or file path. This will be passed to `dlopen()`
   * @param symbols Map of symbols to load where the key is the symbol name and the value is the {@link FFIFunction}
   *
   * @example
   *
   * ```js
   * import {dlopen} from 'bun:ffi';
   *
   * const lib = dlopen("duckdb.dylib", {
   *   get_version: {
   *     returns: "cstring",
   *     args: [],
   *   },
   * });
   * lib.symbols.get_version();
   * // "1.0.0"
   * ```
   *
   * This is powered by just-in-time compiling C wrappers
   * that convert JavaScript types to C types and back. Internally,
   * bun uses [tinycc](https://github.com/TinyCC/tinycc), so a big thanks
   * goes to Fabrice Bellard and TinyCC maintainers for making this possible.
   *
   */
  export function dlopen(name: string, symbols: Symbols): Library;

  /**
   * Turn a native library's function pointer into a JavaScript function
   *
   * Libraries using Node-API & bun:ffi in the same module could use this to skip an extra dlopen() step.
   *
   * @param fn {@link FFIFunction} declaration. `ptr` is required
   *
   * @example
   *
   * ```js
   * import {CFunction} from 'bun:ffi';
   *
   * const getVersion = new CFunction({
   *   returns: "cstring",
   *   args: [],
   *   ptr: myNativeLibraryGetVersion,
   * });
   * getVersion();
   * getVersion.close();
   * ```
   *
   * This is powered by just-in-time compiling C wrappers
   * that convert JavaScript types to C types and back. Internally,
   * bun uses [tinycc](https://github.com/TinyCC/tinycc), so a big thanks
   * goes to Fabrice Bellard and TinyCC maintainers for making this possible.
   *
   */
  export function CFunction(
    fn: FFIFunction & { ptr: number | bigint }
  ): CallableFunction & {
    /**
     * Free the memory allocated by the wrapping function
     */
    close(): void;
  };

  /**
   * Link a map of symbols to JavaScript functions
   *
   * This lets you use native libraries that were already loaded somehow. You usually will want {@link dlopen} instead.
   *
   * You could use this with Node-API to skip loading a second time.
   *
   * @param symbols Map of symbols to load where the key is the symbol name and the value is the {@link FFIFunction}
   *
   * @example
   *
   * ```js
   * import { linkSymbols } from "bun:ffi";
   *
   * const [majorPtr, minorPtr, patchPtr] = getVersionPtrs();
   *
   * const lib = linkSymbols({
   *   // Unlike with dlopen(), the names here can be whatever you want
   *   getMajor: {
   *     returns: "cstring",
   *     args: [],
   *
   *     // Since this doesn't use dlsym(), you have to provide a valid ptr
   *     // That ptr could be a number or a bigint
   *     // An invalid pointer will crash your program.
   *     ptr: majorPtr,
   *   },
   *   getMinor: {
   *     returns: "cstring",
   *     args: [],
   *     ptr: minorPtr,
   *   },
   *   getPatch: {
   *     returns: "cstring",
   *     args: [],
   *     ptr: patchPtr,
   *   },
   * });
   *
   * const [major, minor, patch] = [
   *   lib.symbols.getMajor(),
   *   lib.symbols.getMinor(),
   *   lib.symbols.getPatch(),
   * ];
   * ```
   *
   * This is powered by just-in-time compiling C wrappers
   * that convert JavaScript types to C types and back. Internally,
   * bun uses [tinycc](https://github.com/TinyCC/tinycc), so a big thanks
   * goes to Fabrice Bellard and TinyCC maintainers for making this possible.
   *
   */
  export function linkSymbols(symbols: Symbols): Library;

  /**
   * Read a pointer as a {@link Buffer}
   *
   * If `byteLength` is not provided, the pointer is assumed to be 0-terminated.
   *
   * @param ptr The memory address to read
   * @param byteOffset bytes to skip before reading
   * @param byteLength bytes to read
   *
   * While there are some checks to catch invalid pointers, this is a difficult
   * thing to do safely. Passing an invalid pointer can crash the program and
   * reading beyond the bounds of the pointer will crash the program or cause
   * undefined behavior. Use with care!
   *
   */
  export function toBuffer(
    ptr: number,
    byteOffset?: number,
    byteLength?: number
  ): Buffer;

  /**
   * Read a pointer as an {@link ArrayBuffer}
   *
   * If `byteLength` is not provided, the pointer is assumed to be 0-terminated.
   *
   * @param ptr The memory address to read
   * @param byteOffset bytes to skip before reading
   * @param byteLength bytes to read
   *
   * While there are some checks to catch invalid pointers, this is a difficult
   * thing to do safely. Passing an invalid pointer can crash the program and
   * reading beyond the bounds of the pointer will crash the program or cause
   * undefined behavior. Use with care!
   */
  export function toArrayBuffer(
    ptr: number,
    byteOffset?: number,
    byteLength?: number
  ): ArrayBuffer;

  /**
   * Get the pointer backing a {@link TypedArray} or {@link ArrayBuffer}
   *
   * Use this to pass {@link TypedArray} or {@link ArrayBuffer} to C functions.
   *
   * This is for use with FFI functions. For performance reasons, FFI will
   * not automatically convert typed arrays to C pointers.
   *
   * @param {TypedArray|ArrayBuffer|DataView} view the typed array or array buffer to get the pointer for
   * @param {number} byteOffset optional offset into the view in bytes
   *
   * @example
   *
   * From JavaScript:
   * ```js
   * const array = new Uint8Array(10);
   * const rawPtr = ptr(array);
   * myFFIFunction(rawPtr);
   * ```
   * To C:
   * ```c
   * void myFFIFunction(char* rawPtr) {
   *  // Do something with rawPtr
   * }
   * ```
   *
   */
  export function ptr(
    view: TypedArray | ArrayBufferLike | DataView,
    byteOffset?: number
  ): number;

  /**
   * Get a string from a UTF-8 encoded C string
   * If `byteLength` is not provided, the string is assumed to be null-terminated.
   *
   * @example
   * ```js
   * var ptr = lib.symbols.getVersion();
   * console.log(new CString(ptr));
   * ```
   *
   * @example
   * ```js
   * var ptr = lib.symbols.getVersion();
   * // print the first 4 characters
   * console.log(new CString(ptr, 0, 4));
   * ```
   *
   * While there are some checks to catch invalid pointers, this is a difficult
   * thing to do safely. Passing an invalid pointer can crash the program and
   * reading beyond the bounds of the pointer will crash the program or cause
   * undefined behavior. Use with care!
   */

  export class CString extends String {
    /**
     * Get a string from a UTF-8 encoded C string
     * If `byteLength` is not provided, the string is assumed to be null-terminated.
     *
     * @param ptr The pointer to the C string
     * @param byteOffset bytes to skip before reading
     * @param byteLength bytes to read
     *
     *
     * @example
     * ```js
     * var ptr = lib.symbols.getVersion();
     * console.log(new CString(ptr));
     * ```
     *
     * @example
     * ```js
     * var ptr = lib.symbols.getVersion();
     * // print the first 4 characters
     * console.log(new CString(ptr, 0, 4));
     * ```
     *
     * While there are some checks to catch invalid pointers, this is a difficult
     * thing to do safely. Passing an invalid pointer can crash the program and
     * reading beyond the bounds of the pointer will crash the program or cause
     * undefined behavior. Use with care!
     */
    constructor(ptr: number, byteOffset?: number, byteLength?: number);

    /**
     * The ptr to the C string
     *
     * This `CString` instance is a clone of the string, so it
     * is safe to continue using this instance after the `ptr` has been
     * freed.
     */
    ptr: number;
    byteOffset?: number;
    byteLength?: number;

    /**
     * Get the {@link ptr} as an `ArrayBuffer`
     *
     * `null` or empty ptrs returns an `ArrayBuffer` with `byteLength` 0
     */
    get arrayBuffer(): ArrayBuffer;
  }

  /**
   * View the generated C code for FFI bindings
   *
   * You probably won't need this unless there's a bug in the FFI bindings
   * generator or you're just curious.
   */
  export function viewSource(symbols: Symbols, is_callback?: false): string[];
  export function viewSource(callback: FFIFunction, is_callback: true): string;

  /**
   * Platform-specific file extension name for dynamic libraries
   *
   * "." is not included
   *
   * @example
   * ```js
   * "dylib" // macOS
   * ```
   *
   * @example
   * ```js
   * "so" // linux
   * ```
   */
  export const suffix: string;
}


// ./sqlite.d.ts

/**
 * Fast SQLite3 driver for Bun.js
 * @since v0.0.83
 *
 * @example
 * ```ts
 * import { Database } from 'bun:sqlite';
 *
 * var db = new Database('app.db');
 * db.query('SELECT * FROM users WHERE name = ?').all('John');
 * // => [{ id: 1, name: 'John' }]
 * ```
 *
 * The following types can be used when binding parameters:
 *
 * | JavaScript type | SQLite type |
 * | -------------- | ----------- |
 * | `string` | `TEXT` |
 * | `number` | `INTEGER` or `DECIMAL` |
 * | `boolean` | `INTEGER` (1 or 0) |
 * | `Uint8Array` | `BLOB` |
 * | `Buffer` | `BLOB` |
 * | `bigint` | `INTEGER` |
 * | `null` | `NULL` |
 */
declare module "bun:sqlite" {
  export class Database {
    /**
     * Open or create a SQLite3 database
     *
     * @param filename The filename of the database to open. Pass an empty string (`""`) or `":memory:"` or undefined for an in-memory database.
     * @param options defaults to `{readwrite: true, create: true}`. If a number, then it's treated as `SQLITE_OPEN_*` constant flags.
     *
     * @example
     *
     * ```ts
     * const db = new Database("mydb.sqlite");
     * db.run("CREATE TABLE foo (bar TEXT)");
     * db.run("INSERT INTO foo VALUES (?)", "baz");
     * console.log(db.query("SELECT * FROM foo").all());
     * ```
     *
     * @example
     *
     * Open an in-memory database
     *
     * ```ts
     * const db = new Database(":memory:");
     * db.run("CREATE TABLE foo (bar TEXT)");
     * db.run("INSERT INTO foo VALUES (?)", "hiiiiii");
     * console.log(db.query("SELECT * FROM foo").all());
     * ```
     *
     * @example
     *
     * Open read-only
     *
     * ```ts
     * const db = new Database("mydb.sqlite", {readonly: true});
     * ```
     */
    constructor(
      filename?: string,
      options?:
        | number
        | {
            /**
             * Open the database as read-only (no write operations, no create).
             *
             * Equivalent to {@link constants.SQLITE_OPEN_READONLY}
             */
            readonly?: boolean;
            /**
             * Allow creating a new database
             *
             * Equivalent to {@link constants.SQLITE_OPEN_CREATE}
             */
            create?: boolean;
            /**
             * Open the database as read-write
             *
             * Equivalent to {@link constants.SQLITE_OPEN_READWRITE}
             */
            readwrite?: boolean;
          }
    );

    /**
     * This is an alias of `new Database()`
     *
     * See {@link Database}
     */
    static open(
      filename: string,
      options?:
        | number
        | {
            /**
             * Open the database as read-only (no write operations, no create).
             *
             * Equivalent to {@link constants.SQLITE_OPEN_READONLY}
             */
            readonly?: boolean;
            /**
             * Allow creating a new database
             *
             * Equivalent to {@link constants.SQLITE_OPEN_CREATE}
             */
            create?: boolean;
            /**
             * Open the database as read-write
             *
             * Equivalent to {@link constants.SQLITE_OPEN_READWRITE}
             */
            readwrite?: boolean;
          }
    ): Database;

    /**
     * Execute a SQL query **without returning any results**.
     *
     * This does not cache the query, so if you want to run a query multiple times, you should use {@link prepare} instead.
     *
     * @example
     * ```ts
     * db.run("CREATE TABLE foo (bar TEXT)");
     * db.run("INSERT INTO foo VALUES (?)", "baz");
     * ```
     *
     * Useful for queries like:
     * - `CREATE TABLE`
     * - `INSERT INTO`
     * - `UPDATE`
     * - `DELETE FROM`
     * - `DROP TABLE`
     * - `PRAGMA`
     * - `ATTACH DATABASE`
     * - `DETACH DATABASE`
     * - `REINDEX`
     * - `VACUUM`
     * - `EXPLAIN ANALYZE`
     * - `CREATE INDEX`
     * - `CREATE TRIGGER`
     * - `CREATE VIEW`
     * - `CREATE VIRTUAL TABLE`
     * - `CREATE TEMPORARY TABLE`
     *
     * @param sql The SQL query to run
     *
     * @param bindings Optional bindings for the query
     *
     * @returns `Database` instance
     *
     * Under the hood, this calls `sqlite3_prepare_v3` followed by `sqlite3_step` and `sqlite3_finalize`.
     *
     *  * The following types can be used when binding parameters:
     *
     * | JavaScript type | SQLite type |
     * | -------------- | ----------- |
     * | `string` | `TEXT` |
     * | `number` | `INTEGER` or `DECIMAL` |
     * | `boolean` | `INTEGER` (1 or 0) |
     * | `Uint8Array` | `BLOB` |
     * | `Buffer` | `BLOB` |
     * | `bigint` | `INTEGER` |
     * | `null` | `NULL` |
     */
    run<ParamsType = SQLQueryBindings>(
      sqlQuery: string,
      ...bindings: ParamsType[]
    ): void;
    /** 
        This is an alias of {@link Database.prototype.run}
     */
    exec<ParamsType = SQLQueryBindings>(
      sqlQuery: string,
      ...bindings: ParamsType[]
    ): void;

    /**
     * Compile a SQL query and return a {@link Statement} object. This is the
     * same as {@link prepare} except that it caches the compiled query.
     *
     * This **does not execute** the query, but instead prepares it for later
     * execution and caches the compiled query if possible.
     *
     * @example
     * ```ts
     * // compile the query
     * const stmt = db.query("SELECT * FROM foo WHERE bar = ?");
     * // run the query
     * stmt.all("baz");
     *
     * // run the query again
     * stmt.all();
     * ```
     *
     * @param sql The SQL query to compile
     *
     * @returns `Statment` instance
     *
     * Under the hood, this calls `sqlite3_prepare_v3`.
     *
     */
    query<ParamsType = SQLQueryBindings, ReturnType = any>(
      sqlQuery: string
    ): Statement<ParamsType, ReturnType>;

    /**
     * Compile a SQL query and return a {@link Statement} object.
     *
     * This does not cache the compiled query and does not execute the query.
     *
     * @example
     * ```ts
     * // compile the query
     * const stmt = db.query("SELECT * FROM foo WHERE bar = ?");
     * // run the query
     * stmt.all("baz");
     * ```
     *
     * @param sql The SQL query to compile
     * @param params Optional bindings for the query
     *
     * @returns `Statment` instance
     *
     * Under the hood, this calls `sqlite3_prepare_v3`.
     *
     */
    prepare<ParamsType = SQLQueryBindings, ReturnType = any>(
      sql: string,
      ...params: ParamsType[]
    ): Statement<ParamsType, ReturnType>;

    /**
     * Is the database in a transaction?
     *
     * @returns `true` if the database is in a transaction, `false` otherwise
     *
     * @example
     * ```ts
     * db.run("CREATE TABLE foo (bar TEXT)");
     * db.run("INSERT INTO foo VALUES (?)", "baz");
     * db.run("BEGIN");
     * db.run("INSERT INTO foo VALUES (?)", "qux");
     * console.log(db.inTransaction());
     * ```
     */
    get inTransaction(): boolean;

    /**
     * Close the database connection.
     *
     * It is safe to call this method multiple times. If the database is already
     * closed, this is a no-op. Running queries after the database has been
     * closed will throw an error.
     *
     * @example
     * ```ts
     * db.close();
     * ```
     * This is called automatically when the database instance is garbage collected.
     *
     * Internally, this calls `sqlite3_close_v2`.
     */
    close(): void;

    /**
     * The filename passed when `new Database()` was called
     * @example
     * ```ts
     * const db = new Database("mydb.sqlite");
     * console.log(db.filename);
     * // => "mydb.sqlite"
     * ```
     */
    readonly filename: string;

    /**
     * The underlying `sqlite3` database handle
     *
     * In native code, this is not a file descriptor, but an index into an array of database handles
     */
    readonly handle: number;

    /**
     * Load a SQLite3 extension
     *
     * macOS requires a custom SQLite3 library to be linked because the Apple build of SQLite for macOS disables loading extensions. See {@link Database.setCustomSQLite}
     *
     * Bun chooses the Apple build of SQLite on macOS because it brings a ~50% performance improvement.
     *
     * @param extension name/path of the extension to load
     * @param entryPoint optional entry point of the extension
     */
    loadExtension(extension, entryPoint?: string): void;

    /**
     * Change the dynamic library path to SQLite
     *
     * @note macOS-only
     *
     * This only works before SQLite is loaded, so
     * that's before you call `new Database()`.
     *
     * It can only be run once because this will load
     * the SQLite library into the process.
     *
     * @param path The path to the SQLite library
     *
     */
    static setCustomSQLite(path: string): boolean;

    /**
     * Creates a function that always runs inside a transaction. When the
     * function is invoked, it will begin a new transaction. When the function
     * returns, the transaction will be committed. If an exception is thrown,
     * the transaction will be rolled back (and the exception will propagate as
     * usual).
     *
     * @param insideTransaction The callback which runs inside a transaction
     *
     * @example
     * ```ts
     * // setup
     * import { Database } from "bun:sqlite";
     * const db = Database.open(":memory:");
     * db.exec(
     *   "CREATE TABLE cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, age INTEGER)"
     * );
     *
     * const insert = db.prepare("INSERT INTO cats (name, age) VALUES ($name, $age)");
     * const insertMany = db.transaction((cats) => {
     *   for (const cat of cats) insert.run(cat);
     * });
     *
     * insertMany([
     *   { $name: "Joey", $age: 2 },
     *   { $name: "Sally", $age: 4 },
     *   { $name: "Junior", $age: 1 },
     * ]);
     * ```
     */
    transaction(insideTransaction: (...args: any) => void): CallableFunction & {
      /**
       * uses "BEGIN DEFERRED"
       */
      deferred: (...args: any) => void;
      /**
       * uses "BEGIN IMMEDIATE"
       */
      immediate: (...args: any) => void;
      /**
       * uses "BEGIN EXCLUSIVE"
       */
      exclusive: (...args: any) => void;
    };
  }

  /**
   * A prepared statement.
   *
   * This is returned by {@link Database.prepare} and {@link Database.query}.
   *
   * @example
   * ```ts
   * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
   * stmt.all("baz");
   * // => [{bar: "baz"}]
   * ```
   *
   * @example
   * ```ts
   * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
   * stmt.get("baz");
   * // => {bar: "baz"}
   * ```
   *
   * @example
   * ```ts
   * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
   * stmt.run("baz");
   * // => undefined
   * ```
   */
  export class Statement<ParamsType = SQLQueryBindings, ReturnType = any> {
    /**
     * Creates a new prepared statement from native code.
     *
     * This is used internally by the {@link Database} class. Probably you don't need to call this yourself.
     */
    constructor(nativeHandle: any);

    /**
     * Execute the prepared statement and return all results as objects.
     *
     * @param params optional values to bind to the statement. If omitted, the statement is run with the last bound values or no parameters if there are none.
     *
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
     *
     * stmt.all("baz");
     * // => [{bar: "baz"}]
     *
     * stmt.all();
     * // => [{bar: "baz"}]
     *
     * stmt.all("foo");
     * // => [{bar: "foo"}]
     * ```
     */
    all(...params: ParamsType[]): ReturnType[];

    /**
     * Execute the prepared statement and return **the first** result.
     *
     * If no result is returned, this returns `null`.
     *
     * @param params optional values to bind to the statement. If omitted, the statement is run with the last bound values or no parameters if there are none.
     *
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
     *
     * stmt.all("baz");
     * // => [{bar: "baz"}]
     *
     * stmt.all();
     * // => [{bar: "baz"}]
     *
     * stmt.all("foo");
     * // => [{bar: "foo"}]
     * ```
     *
     * The following types can be used when binding parameters:
     *
     * | JavaScript type | SQLite type |
     * | -------------- | ----------- |
     * | `string` | `TEXT` |
     * | `number` | `INTEGER` or `DECIMAL` |
     * | `boolean` | `INTEGER` (1 or 0) |
     * | `Uint8Array` | `BLOB` |
     * | `Buffer` | `BLOB` |
     * | `bigint` | `INTEGER` |
     * | `null` | `NULL` |
     *
     */
    get(...params: ParamsType[]): ReturnType | null;

    /**
     * Execute the prepared statement. This returns `undefined`.
     *
     * @param params optional values to bind to the statement. If omitted, the statement is run with the last bound values or no parameters if there are none.
     *
     * @example
     * ```ts
     * const stmt = db.prepare("UPDATE foo SET bar = ?");
     * stmt.run("baz");
     * // => undefined
     *
     * stmt.run();
     * // => undefined
     *
     * stmt.run("foo");
     * // => undefined
     * ```
     *
     * The following types can be used when binding parameters:
     *
     * | JavaScript type | SQLite type |
     * | -------------- | ----------- |
     * | `string` | `TEXT` |
     * | `number` | `INTEGER` or `DECIMAL` |
     * | `boolean` | `INTEGER` (1 or 0) |
     * | `Uint8Array` | `BLOB` |
     * | `Buffer` | `BLOB` |
     * | `bigint` | `INTEGER` |
     * | `null` | `NULL` |
     *
     */
    run(...params: ParamsType[]): void;

    /**
     * Execute the prepared statement and return the results as an array of arrays.
     *
     * This is a little faster than {@link all}.
     *
     * @param params optional values to bind to the statement. If omitted, the statement is run with the last bound values or no parameters if there are none.
     *
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
     *
     * stmt.values("baz");
     * // => [['baz']]
     *
     * stmt.values();
     * // => [['baz']]
     *
     * stmt.values("foo");
     * // => [['foo']]
     * ```
     *
     * The following types can be used when binding parameters:
     *
     * | JavaScript type | SQLite type |
     * | -------------- | ----------- |
     * | `string` | `TEXT` |
     * | `number` | `INTEGER` or `DECIMAL` |
     * | `boolean` | `INTEGER` (1 or 0) |
     * | `Uint8Array` | `BLOB` |
     * | `Buffer` | `BLOB` |
     * | `bigint` | `INTEGER` |
     * | `null` | `NULL` |
     *
     */
    values(
      ...params: ParamsType[]
    ): Array<Array<string | bigint | number | boolean | Uint8Array>>;

    /**
     * The names of the columns returned by the prepared statement.
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT bar FROM foo WHERE bar = ?");
     *
     * console.log(stmt.columnNames);
     * // => ["bar"]
     * ```
     */
    readonly columnNames: string[];

    /**
     * The number of parameters expected in the prepared statement.
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?");
     * console.log(stmt.paramsCount);
     * // => 1
     * ```
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ? AND baz = ?");
     * console.log(stmt.paramsCount);
     * // => 2
     * ```
     *
     */
    readonly paramsCount: number;

    /**
     * Finalize the prepared statement, freeing the resources used by the
     * statement and preventing it from being executed again.
     *
     * This is called automatically when the prepared statement is garbage collected.
     *
     * It is safe to call this multiple times. Calling this on a finalized
     * statement has no effect.
     *
     * Internally, this calls `sqlite3_finalize`.
     */
    finalize(): void;

    /**
     * Return the expanded SQL string for the prepared statement.
     *
     * Internally, this calls `sqlite3_expanded_sql()` on the underlying `sqlite3_stmt`.
     *
     * @example
     * ```ts
     * const stmt = db.prepare("SELECT * FROM foo WHERE bar = ?", "baz");
     * console.log(stmt.toString());
     * // => "SELECT * FROM foo WHERE bar = 'baz'"
     * console.log(stmt);
     * // => "SELECT * FROM foo WHERE bar = 'baz'"
     * ```
     */
    toString(): string;

    /**
     * Native object representing the underlying `sqlite3_stmt`
     *
     * This is left untyped because the ABI of the native bindings may change at any time.
     */
    readonly native: any;
  }

  /**
   * Constants from `sqlite3.h`
   *
   * This list isn't exhaustive, but some of the ones which are relevant
   */
  export const constants: {
    /**
     * Open the database as read-only (no write operations, no create).
     * @value 0x00000001
     */
    SQLITE_OPEN_READONLY: number;
    /**
     * Open the database for reading and writing
     * @value 0x00000002
     */
    SQLITE_OPEN_READWRITE: number;
    /**
     * Allow creating a new database
     * @value 0x00000004
     */
    SQLITE_OPEN_CREATE: number;
    /**
     *
     * @value 0x00000008
     */
    SQLITE_OPEN_DELETEONCLOSE: number;
    /**
     *
     * @value 0x00000010
     */
    SQLITE_OPEN_EXCLUSIVE: number;
    /**
     *
     * @value 0x00000020
     */
    SQLITE_OPEN_AUTOPROXY: number;
    /**
     *
     * @value 0x00000040
     */
    SQLITE_OPEN_URI: number;
    /**
     *
     * @value 0x00000080
     */
    SQLITE_OPEN_MEMORY: number;
    /**
     *
     * @value 0x00000100
     */
    SQLITE_OPEN_MAIN_DB: number;
    /**
     *
     * @value 0x00000200
     */
    SQLITE_OPEN_TEMP_DB: number;
    /**
     *
     * @value 0x00000400
     */
    SQLITE_OPEN_TRANSIENT_DB: number;
    /**
     *
     * @value 0x00000800
     */
    SQLITE_OPEN_MAIN_JOURNAL: number;
    /**
     *
     * @value 0x00001000
     */
    SQLITE_OPEN_TEMP_JOURNAL: number;
    /**
     *
     * @value 0x00002000
     */
    SQLITE_OPEN_SUBJOURNAL: number;
    /**
     *
     * @value 0x00004000
     */
    SQLITE_OPEN_SUPER_JOURNAL: number;
    /**
     *
     * @value 0x00008000
     */
    SQLITE_OPEN_NOMUTEX: number;
    /**
     *
     * @value 0x00010000
     */
    SQLITE_OPEN_FULLMUTEX: number;
    /**
     *
     * @value 0x00020000
     */
    SQLITE_OPEN_SHAREDCACHE: number;
    /**
     *
     * @value 0x00040000
     */
    SQLITE_OPEN_PRIVATECACHE: number;
    /**
     *
     * @value 0x00080000
     */
    SQLITE_OPEN_WAL: number;
    /**
     *
     * @value 0x01000000
     */
    SQLITE_OPEN_NOFOLLOW: number;
    /**
     *
     * @value 0x02000000
     */
    SQLITE_OPEN_EXRESCODE: number;
    /**
     *
     * @value 0x01
     */
    SQLITE_PREPARE_PERSISTENT: number;
    /**
     *
     * @value 0x02
     */
    SQLITE_PREPARE_NORMALIZE: number;
    /**
     *
     * @value 0x04
     */
    SQLITE_PREPARE_NO_VTAB: number;
  };

  /**
   * The native module implementing the sqlite3 C bindings
   *
   * It is lazily-initialized, so this will return `undefined` until the first
   * call to new Database().
   *
   * The native module makes no gurantees about ABI stability, so it is left
   * untyped
   *
   * If you need to use it directly for some reason, please let us know because
   * that probably points to a deficiency in this API.
   *
   */
  export var native: any;

  export type SQLQueryBindings =
    | string
    | bigint
    | TypedArray
    | number
    | boolean
    | null
    | Record<string, string | bigint | TypedArray | number | boolean | null>;

  export default Database;
}


// ./fs.d.ts

/**
 * The `fs` module enables interacting with the file system in a
 * way modeled on standard POSIX functions.
 *
 * ```js
 * import * as fs from 'fs';
 * ```
 *
 * All file system operations have synchronous and callback
 * forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM).
 */
declare module "fs" {
  import type { SystemError } from "bun";

  interface ObjectEncodingOptions {
    encoding?: BufferEncoding | null | undefined;
  }
  type EncodingOption =
    | ObjectEncodingOptions
    | BufferEncoding
    | undefined
    | null;
  type OpenMode = number | string;
  type Mode = number | string;
  interface StatsBase<T> {
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isSymbolicLink(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
    dev: T;
    ino: T;
    mode: T;
    nlink: T;
    uid: T;
    gid: T;
    rdev: T;
    size: T;
    blksize: T;
    blocks: T;
    atimeMs: T;
    mtimeMs: T;
    ctimeMs: T;
    birthtimeMs: T;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
  }
  interface Stats extends StatsBase<number> {}
  /**
   * A `fs.Stats` object provides information about a file.
   *
   * Objects returned from {@link stat}, {@link lstat} and {@link fstat} and
   * their synchronous counterparts are of this type.
   * If `bigint` in the `options` passed to those methods is true, the numeric values
   * will be `bigint` instead of `number`, and the object will contain additional
   * nanosecond-precision properties suffixed with `Ns`.
   *
   * ```console
   * Stats {
   *   dev: 2114,
   *   ino: 48064969,
   *   mode: 33188,
   *   nlink: 1,
   *   uid: 85,
   *   gid: 100,
   *   rdev: 0,
   *   size: 527,
   *   blksize: 4096,
   *   blocks: 8,
   *   atimeMs: 1318289051000.1,
   *   mtimeMs: 1318289051000.1,
   *   ctimeMs: 1318289051000.1,
   *   birthtimeMs: 1318289051000.1,
   *   atime: Mon, 10 Oct 2011 23:24:11 GMT,
   *   mtime: Mon, 10 Oct 2011 23:24:11 GMT,
   *   ctime: Mon, 10 Oct 2011 23:24:11 GMT,
   *   birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
   * ```
   *
   * `bigint` version:
   *
   * ```console
   * BigIntStats {
   *   dev: 2114n,
   *   ino: 48064969n,
   *   mode: 33188n,
   *   nlink: 1n,
   *   uid: 85n,
   *   gid: 100n,
   *   rdev: 0n,
   *   size: 527n,
   *   blksize: 4096n,
   *   blocks: 8n,
   *   atimeMs: 1318289051000n,
   *   mtimeMs: 1318289051000n,
   *   ctimeMs: 1318289051000n,
   *   birthtimeMs: 1318289051000n,
   *   atimeNs: 1318289051000000000n,
   *   mtimeNs: 1318289051000000000n,
   *   ctimeNs: 1318289051000000000n,
   *   birthtimeNs: 1318289051000000000n,
   *   atime: Mon, 10 Oct 2011 23:24:11 GMT,
   *   mtime: Mon, 10 Oct 2011 23:24:11 GMT,
   *   ctime: Mon, 10 Oct 2011 23:24:11 GMT,
   *   birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
   * ```
   * @since v0.0.67
   */
  class Stats {}
  /**
   * A representation of a directory entry, which can be a file or a subdirectory
   * within the directory, as returned by reading from an `fs.Dir`. The
   * directory entry is a combination of the file name and file type pairs.
   *
   * Additionally, when {@link readdir} or {@link readdirSync} is called with
   * the `withFileTypes` option set to `true`, the resulting array is filled with `fs.Dirent` objects, rather than strings or `Buffer` s.
   * @since v0.0.67
   */
  class Dirent {
    /**
     * Returns `true` if the `fs.Dirent` object describes a regular file.
     * @since v0.0.67
     */
    isFile(): boolean;
    /**
     * Returns `true` if the `fs.Dirent` object describes a file system
     * directory.
     * @since v0.0.67
     */
    isDirectory(): boolean;
    /**
     * Returns `true` if the `fs.Dirent` object describes a block device.
     * @since v0.0.67
     */
    isBlockDevice(): boolean;
    /**
     * Returns `true` if the `fs.Dirent` object describes a character device.
     * @since v0.0.67
     */
    isCharacterDevice(): boolean;
    /**
     * Returns `true` if the `fs.Dirent` object describes a symbolic link.
     * @since v0.0.67
     */
    isSymbolicLink(): boolean;
    /**
     * Returns `true` if the `fs.Dirent` object describes a first-in-first-out
     * (FIFO) pipe.
     * @since v0.0.67
     */
    isFIFO(): boolean;
    /**
     * Returns `true` if the `fs.Dirent` object describes a socket.
     * @since v0.0.67
     */
    isSocket(): boolean;
    /**
     * The file name that this `fs.Dirent` object refers to. The type of this
     * value is determined by the `options.encoding` passed to {@link readdir} or {@link readdirSync}.
     * @since v0.0.67
     */
    name: string;
  }

  /**
   * Asynchronously rename file at `oldPath` to the pathname provided
   * as `newPath`. In the case that `newPath` already exists, it will
   * be overwritten. If there is a directory at `newPath`, an error will
   * be raised instead. No arguments other than a possible exception are
   * given to the completion callback.
   *
   * See also: [`rename(2)`](http://man7.org/linux/man-pages/man2/rename.2.html).
   *
   * ```js
   * import { rename } from 'fs';
   *
   * rename('oldFile.txt', 'newFile.txt', (err) => {
   *   if (err) throw err;
   *   console.log('Rename complete!');
   * });
   * ```
   * @since v0.0.67
   */
  function rename(
    oldPath: PathLike,
    newPath: PathLike,
    callback: NoParamCallback
  ): void;
  // namespace rename {
  //   /**
  //    * Asynchronous rename(2) - Change the name or location of a file or directory.
  //    * @param oldPath A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    */
  //   function __promisify__(oldPath: PathLike, newPath: PathLike): Promise<void>;
  // }
  /**
   * Renames the file from `oldPath` to `newPath`. Returns `undefined`.
   *
   * See the POSIX [`rename(2)`](http://man7.org/linux/man-pages/man2/rename.2.html) documentation for more details.
   * @since v0.0.67
   */
  function renameSync(oldPath: PathLike, newPath: PathLike): void;
  /**
   * Truncates the file. No arguments other than a possible exception are
   * given to the completion callback. A file descriptor can also be passed as the
   * first argument. In this case, `fs.ftruncate()` is called.
   *
   * ```js
   * import { truncate } from 'fs';
   * // Assuming that 'path/file.txt' is a regular file.
   * truncate('path/file.txt', (err) => {
   *   if (err) throw err;
   *   console.log('path/file.txt was truncated');
   * });
   * ```
   *
   * Passing a file descriptor is deprecated and may result in an error being thrown
   * in the future.
   *
   * See the POSIX [`truncate(2)`](http://man7.org/linux/man-pages/man2/truncate.2.html) documentation for more details.
   * @since v0.0.67
   * @param [len=0]
   */
  function truncate(
    path: PathLike,
    len: number | undefined | null,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronous truncate(2) - Truncate a file to a specified length.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  function truncate(path: PathLike, callback: NoParamCallback): void;
  // namespace truncate {
  //   /**
  //    * Asynchronous truncate(2) - Truncate a file to a specified length.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param len If not specified, defaults to `0`.
  //    */
  //   function __promisify__(path: PathLike, len?: number | null): Promise<void>;
  // }
  /**
   * Truncates the file. Returns `undefined`. A file descriptor can also be
   * passed as the first argument. In this case, `fs.ftruncateSync()` is called.
   *
   * Passing a file descriptor is deprecated and may result in an error being thrown
   * in the future.
   * @since v0.0.67
   * @param [len=0]
   */
  function truncateSync(path: PathLike, len?: number | null): void;
  /**
   * Truncates the file descriptor. No arguments other than a possible exception are
   * given to the completion callback.
   *
   * See the POSIX [`ftruncate(2)`](http://man7.org/linux/man-pages/man2/ftruncate.2.html) documentation for more detail.
   *
   * If the file referred to by the file descriptor was larger than `len` bytes, only
   * the first `len` bytes will be retained in the file.
   *
   * For example, the following program retains only the first four bytes of the
   * file:
   *
   * ```js
   * import { open, close, ftruncate } from 'fs';
   *
   * function closeFd(fd) {
   *   close(fd, (err) => {
   *     if (err) throw err;
   *   });
   * }
   *
   * open('temp.txt', 'r+', (err, fd) => {
   *   if (err) throw err;
   *
   *   try {
   *     ftruncate(fd, 4, (err) => {
   *       closeFd(fd);
   *       if (err) throw err;
   *     });
   *   } catch (err) {
   *     closeFd(fd);
   *     if (err) throw err;
   *   }
   * });
   * ```
   *
   * If the file previously was shorter than `len` bytes, it is extended, and the
   * extended part is filled with null bytes (`'\0'`):
   *
   * If `len` is negative then `0` will be used.
   * @since v0.0.67
   * @param [len=0]
   */
  function ftruncate(
    fd: number,
    len: number | undefined | null,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronous ftruncate(2) - Truncate a file to a specified length.
   * @param fd A file descriptor.
   */
  function ftruncate(fd: number, callback: NoParamCallback): void;
  // namespace ftruncate {
  //   /**
  //    * Asynchronous ftruncate(2) - Truncate a file to a specified length.
  //    * @param fd A file descriptor.
  //    * @param len If not specified, defaults to `0`.
  //    */
  //   function __promisify__(fd: number, len?: number | null): Promise<void>;
  // }
  /**
   * Truncates the file descriptor. Returns `undefined`.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link ftruncate}.
   * @since v0.0.67
   * @param [len=0]
   */
  function ftruncateSync(fd: number, len?: number | null): void;
  /**
   * Asynchronously changes owner and group of a file. No arguments other than a
   * possible exception are given to the completion callback.
   *
   * See the POSIX [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function chown(
    path: PathLike,
    uid: number,
    gid: number,
    callback: NoParamCallback
  ): void;
  // namespace chown {
  //   /**
  //    * Asynchronous chown(2) - Change ownership of a file.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     uid: number,
  //     gid: number
  //   ): Promise<void>;
  // }
  /**
   * Synchronously changes owner and group of a file. Returns `undefined`.
   * This is the synchronous version of {@link chown}.
   *
   * See the POSIX [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function chownSync(path: PathLike, uid: number, gid: number): void;
  /**
   * Sets the owner of the file. No arguments other than a possible exception are
   * given to the completion callback.
   *
   * See the POSIX [`fchown(2)`](http://man7.org/linux/man-pages/man2/fchown.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function fchown(
    fd: number,
    uid: number,
    gid: number,
    callback: NoParamCallback
  ): void;
  // namespace fchown {
  //   /**
  //    * Asynchronous fchown(2) - Change ownership of a file.
  //    * @param fd A file descriptor.
  //    */
  //   function __promisify__(fd: number, uid: number, gid: number): Promise<void>;
  // }
  /**
   * Sets the owner of the file. Returns `undefined`.
   *
   * See the POSIX [`fchown(2)`](http://man7.org/linux/man-pages/man2/fchown.2.html) documentation for more detail.
   * @since v0.0.67
   * @param uid The file's new owner's user id.
   * @param gid The file's new group's group id.
   */
  function fchownSync(fd: number, uid: number, gid: number): void;
  /**
   * Set the owner of the symbolic link. No arguments other than a possible
   * exception are given to the completion callback.
   *
   * See the POSIX [`lchown(2)`](http://man7.org/linux/man-pages/man2/lchown.2.html) documentation for more detail.
   */
  function lchown(
    path: PathLike,
    uid: number,
    gid: number,
    callback: NoParamCallback
  ): void;
  // namespace lchown {
  //   /**
  //    * Asynchronous lchown(2) - Change ownership of a file. Does not dereference symbolic links.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     uid: number,
  //     gid: number
  //   ): Promise<void>;
  // }
  /**
   * Set the owner for the path. Returns `undefined`.
   *
   * See the POSIX [`lchown(2)`](http://man7.org/linux/man-pages/man2/lchown.2.html) documentation for more details.
   * @param uid The file's new owner's user id.
   * @param gid The file's new group's group id.
   */
  function lchownSync(path: PathLike, uid: number, gid: number): void;
  /**
   * Changes the access and modification times of a file in the same way as {@link utimes}, with the difference that if the path refers to a symbolic
   * link, then the link is not dereferenced: instead, the timestamps of the
   * symbolic link itself are changed.
   *
   * No arguments other than a possible exception are given to the completion
   * callback.
   * @since v0.0.67
   */
  function lutimes(
    path: PathLike,
    atime: TimeLike,
    mtime: TimeLike,
    callback: NoParamCallback
  ): void;
  // namespace lutimes {
  //   /**
  //    * Changes the access and modification times of a file in the same way as `fsPromises.utimes()`,
  //    * with the difference that if the path refers to a symbolic link, then the link is not
  //    * dereferenced: instead, the timestamps of the symbolic link itself are changed.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param atime The last access time. If a string is provided, it will be coerced to number.
  //    * @param mtime The last modified time. If a string is provided, it will be coerced to number.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     atime: TimeLike,
  //     mtime: TimeLike
  //   ): Promise<void>;
  // }
  /**
   * Change the file system timestamps of the symbolic link referenced by `path`.
   * Returns `undefined`, or throws an exception when parameters are incorrect or
   * the operation fails. This is the synchronous version of {@link lutimes}.
   * @since v0.0.67
   */
  function lutimesSync(path: PathLike, atime: TimeLike, mtime: TimeLike): void;
  /**
   * Asynchronously changes the permissions of a file. No arguments other than a
   * possible exception are given to the completion callback.
   *
   * See the POSIX [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html) documentation for more detail.
   *
   * ```js
   * import { chmod } from 'fs';
   *
   * chmod('my_file.txt', 0o775, (err) => {
   *   if (err) throw err;
   *   console.log('The permissions for file "my_file.txt" have been changed!');
   * });
   * ```
   * @since v0.0.67
   */
  function chmod(path: PathLike, mode: Mode, callback: NoParamCallback): void;
  // namespace chmod {
  //   /**
  //    * Asynchronous chmod(2) - Change permissions of a file.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
  //    */
  //   function __promisify__(path: PathLike, mode: Mode): Promise<void>;
  // }
  /**
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link chmod}.
   *
   * See the POSIX [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function chmodSync(path: PathLike, mode: Mode): void;
  /**
   * Sets the permissions on the file. No arguments other than a possible exception
   * are given to the completion callback.
   *
   * See the POSIX [`fchmod(2)`](http://man7.org/linux/man-pages/man2/fchmod.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function fchmod(fd: number, mode: Mode, callback: NoParamCallback): void;
  // namespace fchmod {
  //   /**
  //    * Asynchronous fchmod(2) - Change permissions of a file.
  //    * @param fd A file descriptor.
  //    * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
  //    */
  //   function __promisify__(fd: number, mode: Mode): Promise<void>;
  // }
  /**
   * Sets the permissions on the file. Returns `undefined`.
   *
   * See the POSIX [`fchmod(2)`](http://man7.org/linux/man-pages/man2/fchmod.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function fchmodSync(fd: number, mode: Mode): void;
  /**
   * Changes the permissions on a symbolic link. No arguments other than a possible
   * exception are given to the completion callback.
   *
   * This method is only implemented on macOS.
   *
   * See the POSIX [`lchmod(2)`](https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2) documentation for more detail.
   * @deprecated Since v0.4.7
   */
  function lchmod(path: PathLike, mode: Mode, callback: NoParamCallback): void;
  // /** @deprecated */
  // namespace lchmod {
  //   /**
  //    * Asynchronous lchmod(2) - Change permissions of a file. Does not dereference symbolic links.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
  //    */
  //   function __promisify__(path: PathLike, mode: Mode): Promise<void>;
  // }
  /**
   * Changes the permissions on a symbolic link. Returns `undefined`.
   *
   * This method is only implemented on macOS.
   *
   * See the POSIX [`lchmod(2)`](https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2) documentation for more detail.
   * @deprecated Since v0.4.7
   */
  function lchmodSync(path: PathLike, mode: Mode): void;
  /**
   * Asynchronous [`stat(2)`](http://man7.org/linux/man-pages/man2/stat.2.html). The callback gets two arguments `(err, stats)` where`stats` is an `fs.Stats` object.
   *
   * In case of an error, the `err.code` will be one of `Common System Errors`.
   *
   * Using `fs.stat()` to check for the existence of a file before calling`fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended.
   * Instead, user code should open/read/write the file directly and handle the
   * error raised if the file is not available.
   *
   * To check if a file exists without manipulating it afterwards, {@link access} is recommended.
   *
   * For example, given the following directory structure:
   *
   * ```text
   * - txtDir
   * -- file.txt
   * - app.js
   * ```
   *
   * The next program will check for the stats of the given paths:
   *
   * ```js
   * import { stat } from 'fs';
   *
   * const pathsToCheck = ['./txtDir', './txtDir/file.txt'];
   *
   * for (let i = 0; i < pathsToCheck.length; i++) {
   *   stat(pathsToCheck[i], (err, stats) => {
   *     console.log(stats.isDirectory());
   *     console.log(stats);
   *   });
   * }
   * ```
   *
   * The resulting output will resemble:
   *
   * ```console
   * true
   * Stats {
   *   dev: 16777220,
   *   mode: 16877,
   *   nlink: 3,
   *   uid: 501,
   *   gid: 20,
   *   rdev: 0,
   *   blksize: 4096,
   *   ino: 14214262,
   *   size: 96,
   *   blocks: 0,
   *   atimeMs: 1561174653071.963,
   *   mtimeMs: 1561174614583.3518,
   *   ctimeMs: 1561174626623.5366,
   *   birthtimeMs: 1561174126937.2893,
   *   atime: 2019-06-22T03:37:33.072Z,
   *   mtime: 2019-06-22T03:36:54.583Z,
   *   ctime: 2019-06-22T03:37:06.624Z,
   *   birthtime: 2019-06-22T03:28:46.937Z
   * }
   * false
   * Stats {
   *   dev: 16777220,
   *   mode: 33188,
   *   nlink: 1,
   *   uid: 501,
   *   gid: 20,
   *   rdev: 0,
   *   blksize: 4096,
   *   ino: 14214074,
   *   size: 8,
   *   blocks: 8,
   *   atimeMs: 1561174616618.8555,
   *   mtimeMs: 1561174614584,
   *   ctimeMs: 1561174614583.8145,
   *   birthtimeMs: 1561174007710.7478,
   *   atime: 2019-06-22T03:36:56.619Z,
   *   mtime: 2019-06-22T03:36:54.584Z,
   *   ctime: 2019-06-22T03:36:54.584Z,
   *   birthtime: 2019-06-22T03:26:47.711Z
   * }
   * ```
   * @since v0.0.67
   */
  function stat(
    path: PathLike,
    callback: (err: SystemError | null, stats: Stats) => void
  ): void;
  function stat(
    path: PathLike,
    options:
      | (StatOptions & {
          bigint?: false | undefined;
        })
      | undefined,
    callback: (err: SystemError | null, stats: Stats) => void
  ): void;
  function stat(
    path: PathLike,
    options: StatOptions & {
      bigint: true;
    },
    callback: (err: SystemError | null, stats: BigIntStats) => void
  ): void;
  function stat(
    path: PathLike,
    options: StatOptions | undefined,
    callback: (err: SystemError | null, stats: Stats | BigIntStats) => void
  ): void;
  // namespace stat {
  //   /**
  //    * Asynchronous stat(2) - Get file status.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: StatOptions & {
  //       bigint?: false | undefined;
  //     }
  //   ): Promise<Stats>;
  //   function __promisify__(
  //     path: PathLike,
  //     options: StatOptions & {
  //       bigint: true;
  //     }
  //   ): Promise<BigIntStats>;
  //   function __promisify__(
  //     path: PathLike,
  //     options?: StatOptions
  //   ): Promise<Stats | BigIntStats>;
  // }
  // tslint:disable-next-line:unified-signatures
  interface StatSyncFn extends Function {
    // tslint:disable-next-line:unified-signatures
    (path: PathLike, options?: undefined): Stats;
    (
      path: PathLike,
      options?: StatSyncOptions & {
        bigint?: false | undefined;
        throwIfNoEntry: false;
      }
    ): Stats | undefined;
    (
      path: PathLike,
      options: StatSyncOptions & {
        bigint: true;
        throwIfNoEntry: false;
      }
    ): BigIntStats | undefined;
    // tslint:disable-next-line:unified-signatures
    (
      path: PathLike,
      // tslint:disable-next-line:unified-signatures
      options?: StatSyncOptions & {
        bigint?: false | undefined;
      }
    ): Stats;
    (
      path: PathLike,
      options: StatSyncOptions & {
        bigint: true;
      }
    ): BigIntStats;
    (
      path: PathLike,
      options: StatSyncOptions & {
        bigint: boolean;
        throwIfNoEntry?: false | undefined;
      }
    ): Stats | BigIntStats;
    (path: PathLike, options?: StatSyncOptions):
      | Stats
      | BigIntStats
      | undefined;
  }
  /**
   * Synchronous stat(2) - Get file status.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  var statSync: StatSyncFn;
  /**
   * Invokes the callback with the `fs.Stats` for the file descriptor.
   *
   * See the POSIX [`fstat(2)`](http://man7.org/linux/man-pages/man2/fstat.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function fstat(
    fd: number,
    callback: (err: SystemError | null, stats: Stats) => void
  ): void;
  function fstat(
    fd: number,
    options:
      | (StatOptions & {
          bigint?: false | undefined;
        })
      | undefined,
    callback: (err: SystemError | null, stats: Stats) => void
  ): void;
  function fstat(
    fd: number,
    options: StatOptions & {
      bigint: true;
    },
    callback: (err: SystemError | null, stats: BigIntStats) => void
  ): void;
  function fstat(
    fd: number,
    options: StatOptions | undefined,
    callback: (err: SystemError | null, stats: Stats | BigIntStats) => void
  ): void;
  // namespace fstat {
  //   /**
  //    * Asynchronous fstat(2) - Get file status.
  //    * @param fd A file descriptor.
  //    */
  //   function __promisify__(
  //     fd: number,
  //     options?: StatOptions & {
  //       bigint?: false | undefined;
  //     }
  //   ): Promise<Stats>;
  //   function __promisify__(
  //     fd: number,
  //     options: StatOptions & {
  //       bigint: true;
  //     }
  //   ): Promise<BigIntStats>;
  //   function __promisify__(
  //     fd: number,
  //     options?: StatOptions
  //   ): Promise<Stats | BigIntStats>;
  // }
  /**
   * Retrieves the `fs.Stats` for the file descriptor.
   *
   * See the POSIX [`fstat(2)`](http://man7.org/linux/man-pages/man2/fstat.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function fstatSync(
    fd: number,
    options?: StatOptions & {
      bigint?: false | undefined;
    }
  ): Stats;
  function fstatSync(
    fd: number,
    options: StatOptions & {
      bigint: true;
    }
  ): BigIntStats;
  function fstatSync(fd: number, options?: StatOptions): Stats | BigIntStats;
  /**
   * Retrieves the `fs.Stats` for the symbolic link referred to by the path.
   * The callback gets two arguments `(err, stats)` where `stats` is a `fs.Stats` object. `lstat()` is identical to `stat()`, except that if `path` is a symbolic
   * link, then the link itself is stat-ed, not the file that it refers to.
   *
   * See the POSIX [`lstat(2)`](http://man7.org/linux/man-pages/man2/lstat.2.html) documentation for more details.
   * @since v0.0.67
   */
  function lstat(
    path: PathLike,
    callback: (err: SystemError | null, stats: Stats) => void
  ): void;
  function lstat(
    path: PathLike,
    options:
      | (StatOptions & {
          bigint?: false | undefined;
        })
      | undefined,
    callback: (err: SystemError | null, stats: Stats) => void
  ): void;
  function lstat(
    path: PathLike,
    options: StatOptions & {
      bigint: true;
    },
    callback: (err: SystemError | null, stats: BigIntStats) => void
  ): void;
  function lstat(
    path: PathLike,
    options: StatOptions | undefined,
    callback: (err: SystemError | null, stats: Stats | BigIntStats) => void
  ): void;
  // namespace lstat {
  //   /**
  //    * Asynchronous lstat(2) - Get file status. Does not dereference symbolic links.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: StatOptions & {
  //       bigint?: false | undefined;
  //     }
  //   ): Promise<Stats>;
  //   function __promisify__(
  //     path: PathLike,
  //     options: StatOptions & {
  //       bigint: true;
  //     }
  //   ): Promise<BigIntStats>;
  //   function __promisify__(
  //     path: PathLike,
  //     options?: StatOptions
  //   ): Promise<Stats | BigIntStats>;
  // }
  /**
   * Synchronous lstat(2) - Get file status. Does not dereference symbolic links.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  var lstatSync: StatSyncFn;
  /**
   * Creates a new link from the `existingPath` to the `newPath`. See the POSIX [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html) documentation for more detail. No arguments other than
   * a possible
   * exception are given to the completion callback.
   * @since v0.0.67
   */
  function link(
    existingPath: PathLike,
    newPath: PathLike,
    callback: NoParamCallback
  ): void;
  // namespace link {
  //   /**
  //    * Asynchronous link(2) - Create a new link (also known as a hard link) to an existing file.
  //    * @param existingPath A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param newPath A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(
  //     existingPath: PathLike,
  //     newPath: PathLike
  //   ): Promise<void>;
  // }
  /**
   * Creates a new link from the `existingPath` to the `newPath`. See the POSIX [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html) documentation for more detail. Returns `undefined`.
   * @since v0.0.67
   */
  function linkSync(existingPath: PathLike, newPath: PathLike): void;
  /**
   * Creates the link called `path` pointing to `target`. No arguments other than a
   * possible exception are given to the completion callback.
   *
   * See the POSIX [`symlink(2)`](http://man7.org/linux/man-pages/man2/symlink.2.html) documentation for more details.
   *
   * The `type` argument is only available on Windows and ignored on other platforms.
   * It can be set to `'dir'`, `'file'`, or `'junction'`. If the `type` argument is
   * not set, Node.js will autodetect `target` type and use `'file'` or `'dir'`. If
   * the `target` does not exist, `'file'` will be used. Windows junction points
   * require the destination path to be absolute. When using `'junction'`, the`target` argument will automatically be normalized to absolute path.
   *
   * Relative targets are relative to the link’s parent directory.
   *
   * ```js
   * import { symlink } from 'fs';
   *
   * symlink('./mew', './example/mewtwo', callback);
   * ```
   *
   * The above example creates a symbolic link `mewtwo` in the `example` which points
   * to `mew` in the same directory:
   *
   * ```bash
   * $ tree example/
   * example/
   * ├── mew
   * └── mewtwo -> ./mew
   * ```
   * @since v0.0.67
   */
  function symlink(
    target: PathLike,
    path: PathLike,
    type: "symlink" | "junction" | undefined | null,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
   * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
   * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
   */
  function symlink(
    target: PathLike,
    path: PathLike,
    callback: NoParamCallback
  ): void;
  // namespace symlink {
  //   /**
  //    * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
  //    * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
  //    * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
  //    * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
  //    * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
  //    */
  //   function __promisify__(
  //     target: PathLike,
  //     path: PathLike,
  //     type?: string | null
  //   ): Promise<void>;
  //   type Type = "dir" | "file" | "junction";
  // }
  /**
   * Returns `undefined`.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link symlink}.
   * @since v0.0.67
   */
  function symlinkSync(
    target: PathLike,
    path: PathLike,
    type?: "symlink" | "junction" | null
  ): void;
  /**
   * Reads the contents of the symbolic link referred to by `path`. The callback gets
   * two arguments `(err, linkString)`.
   *
   * See the POSIX [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html) documentation for more details.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use for
   * the link path passed to the callback. If the `encoding` is set to `'buffer'`,
   * the link path returned will be passed as a `Buffer` object.
   * @since v0.0.67
   */
  function readlink(
    path: PathLike,
    options: EncodingOption,
    callback: (err: SystemError | null, linkString: string) => void
  ): void;
  /**
   * Asynchronous readlink(2) - read value of a symbolic link.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  // tslint:disable-next-line:unified-signatures
  function readlink(
    path: PathLike,
    options: BufferEncodingOption,
    callback: (err: SystemError | null, linkString: Buffer) => void
  ): void;
  /**
   * Asynchronous readlink(2) - read value of a symbolic link.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  // tslint:disable-next-line:unified-signatures
  function readlink(
    path: PathLike,
    options: EncodingOption,
    // tslint:disable-next-line:unified-signatures
    callback: (err: SystemError | null, linkString: string | Buffer) => void
  ): void;
  /**
   * Asynchronous readlink(2) - read value of a symbolic link.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  // tslint:disable-next-line:unified-signatures
  function readlink(
    path: PathLike,
    callback: (err: SystemError | null, linkString: string) => void
  ): void;
  // namespace readlink {
  //   /**
  //    * Asynchronous readlink(2) - read value of a symbolic link.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: EncodingOption
  //   ): Promise<string>;
  //   /**
  //    * Asynchronous readlink(2) - read value of a symbolic link.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options: BufferEncodingOption
  //   ): Promise<Buffer>;
  //   /**
  //    * Asynchronous readlink(2) - read value of a symbolic link.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: EncodingOption
  //   ): Promise<string | Buffer>;
  // }
  /**
   * Returns the symbolic link's string value.
   *
   * See the POSIX [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html) documentation for more details.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use for
   * the link path returned. If the `encoding` is set to `'buffer'`,
   * the link path returned will be passed as a `Buffer` object.
   * @since v0.0.67
   */
  function readlinkSync(path: PathLike, options?: EncodingOption): string;
  /**
   * Synchronous readlink(2) - read value of a symbolic link.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function readlinkSync(path: PathLike, options: BufferEncodingOption): Buffer;
  /**
   * Synchronous readlink(2) - read value of a symbolic link.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function readlinkSync(
    path: PathLike,
    options?: EncodingOption
  ): string | Buffer;
  /**
   * Asynchronously computes the canonical pathname by resolving `.`, `..` and
   * symbolic links.
   *
   * A canonical pathname is not necessarily unique. Hard links and bind mounts can
   * expose a file system entity through many pathnames.
   *
   * This function behaves like [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html), with some exceptions:
   *
   * 1. No case conversion is performed on case-insensitive file systems.
   * 2. The maximum number of symbolic links is platform-independent and generally
   * (much) higher than what the native [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html) implementation supports.
   *
   * The `callback` gets two arguments `(err, resolvedPath)`. May use `process.cwd`to resolve relative paths.
   *
   * Only paths that can be converted to UTF8 strings are supported.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use for
   * the path passed to the callback. If the `encoding` is set to `'buffer'`,
   * the path returned will be passed as a `Buffer` object.
   *
   * If `path` resolves to a socket or a pipe, the function will return a system
   * dependent name for that object.
   * @since v0.0.67
   */
  function realpath(
    path: PathLike,
    options: EncodingOption,
    callback: (err: SystemError | null, resolvedPath: string) => void
  ): void;
  /**
   * Asynchronous realpath(3) - return the canonicalized absolute pathname.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  // tslint:disable-next-line:unified-signatures
  function realpath(
    path: PathLike,
    options: BufferEncodingOption,
    callback: (err: SystemError | null, resolvedPath: Buffer) => void
  ): void;
  /**
   * Asynchronous realpath(3) - return the canonicalized absolute pathname.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  // tslint:disable-next-line:unified-signatures
  function realpath(
    path: PathLike,
    options: EncodingOption,
    // tslint:disable-next-line:unified-signatures
    callback: (err: SystemError | null, resolvedPath: string | Buffer) => void
  ): void;
  /**
   * Asynchronous realpath(3) - return the canonicalized absolute pathname.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  // tslint:disable-next-line:unified-signatures
  function realpath(
    path: PathLike,
    callback: (err: SystemError | null, resolvedPath: string) => void
  ): void;
  // namespace realpath {
  //   /**
  //    * Asynchronous realpath(3) - return the canonicalized absolute pathname.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: EncodingOption
  //   ): Promise<string>;
  //   /**
  //    * Asynchronous realpath(3) - return the canonicalized absolute pathname.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options: BufferEncodingOption
  //   ): Promise<Buffer>;
  //   /**
  //    * Asynchronous realpath(3) - return the canonicalized absolute pathname.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: EncodingOption
  //   ): Promise<string | Buffer>;
  //   /**
  //    * Asynchronous [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html).
  //    *
  //    * The `callback` gets two arguments `(err, resolvedPath)`.
  //    *
  //    * Only paths that can be converted to UTF8 strings are supported.
  //    *
  //    * The optional `options` argument can be a string specifying an encoding, or an
  //    * object with an `encoding` property specifying the character encoding to use for
  //    * the path passed to the callback. If the `encoding` is set to `'buffer'`,
  //    * the path returned will be passed as a `Buffer` object.
  //    *
  //    * On Linux, when Node.js is linked against musl libc, the procfs file system must
  //    * be mounted on `/proc` in order for this function to work. Glibc does not have
  //    * this restriction.
  //    * @since v0.0.67
  //    */
  //   function native(
  //     path: PathLike,
  //     options: EncodingOption,
  //     // tslint:disable-next-line:unified-signatures
  //     callback: (err: SystemError | null, resolvedPath: string) => void
  //   ): void;
  //   function native(
  //     path: PathLike,
  //     options: BufferEncodingOption,
  //     // tslint:disable-next-line:unified-signatures
  //     callback: (err: SystemError | null, resolvedPath: Buffer) => void
  //   ): void;
  //   function native(
  //     path: PathLike,
  //     options: EncodingOption,
  //     // tslint:disable-next-line:unified-signatures
  //     callback: (err: SystemError | null, resolvedPath: string | Buffer) => void
  //   ): void;
  //   function native(
  //     path: PathLike,
  //     callback: (err: SystemError | null, resolvedPath: string) => void
  //   ): void;
  // }
  /**
   * Returns the resolved pathname.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link realpath}.
   * @since v0.0.67
   */
  function realpathSync(path: PathLike, options?: EncodingOption): string;
  /**
   * Synchronous realpath(3) - return the canonicalized absolute pathname.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function realpathSync(path: PathLike, options: BufferEncodingOption): Buffer;
  /**
   * Synchronous realpath(3) - return the canonicalized absolute pathname.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function realpathSync(
    path: PathLike,
    options?: EncodingOption
  ): string | Buffer;
  namespace realpathSync {
    function native(path: PathLike, options?: EncodingOption): string;
    function native(path: PathLike, options: BufferEncodingOption): Buffer;
    function native(path: PathLike, options?: EncodingOption): string | Buffer;
  }
  /**
   * Asynchronously removes a file or symbolic link. No arguments other than a
   * possible exception are given to the completion callback.
   *
   * ```js
   * import { unlink } from 'fs';
   * // Assuming that 'path/file.txt' is a regular file.
   * unlink('path/file.txt', (err) => {
   *   if (err) throw err;
   *   console.log('path/file.txt was deleted');
   * });
   * ```
   *
   * `fs.unlink()` will not work on a directory, empty or otherwise. To remove a
   * directory, use {@link rmdir}.
   *
   * See the POSIX [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html) documentation for more details.
   * @since v0.0.67
   */
  function unlink(path: PathLike, callback: NoParamCallback): void;
  // namespace unlink {
  //   /**
  //    * Asynchronous unlink(2) - delete a name and possibly the file it refers to.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(path: PathLike): Promise<void>;
  // }
  /**
   * Synchronous [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html). Returns `undefined`.
   * @since v0.0.67
   */
  function unlinkSync(path: PathLike): void;
  interface RmDirOptions {
    /**
     * If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
     * `EPERM` error is encountered, Node.js will retry the operation with a linear
     * backoff wait of `retryDelay` ms longer on each try. This option represents the
     * number of retries. This option is ignored if the `recursive` option is not
     * `true`.
     * @default 0
     */
    maxRetries?: number | undefined;
    /**
     * @deprecated since v14.14.0 In future versions of Node.js and will trigger a warning
     * `fs.rmdir(path, { recursive: true })` will throw if `path` does not exist or is a file.
     * Use `fs.rm(path, { recursive: true, force: true })` instead.
     *
     * If `true`, perform a recursive directory removal. In
     * recursive mode soperations are retried on failure.
     * @default false
     */
    recursive?: boolean | undefined;
    /**
     * The amount of time in milliseconds to wait between retries.
     * This option is ignored if the `recursive` option is not `true`.
     * @default 100
     */
    retryDelay?: number | undefined;
  }
  /**
   * Asynchronous [`rmdir(2)`](http://man7.org/linux/man-pages/man2/rmdir.2.html). No arguments other than a possible exception are given
   * to the completion callback.
   *
   * Using `fs.rmdir()` on a file (not a directory) results in an `ENOENT` error on
   * Windows and an `ENOTDIR` error on POSIX.
   *
   * To get a behavior similar to the `rm -rf` Unix command, use {@link rm} with options `{ recursive: true, force: true }`.
   * @since v0.0.67
   */
  function rmdir(path: PathLike, callback: NoParamCallback): void;
  function rmdir(
    path: PathLike,
    options: RmDirOptions,
    callback: NoParamCallback
  ): void;
  // namespace rmdir {
  //   /**
  //    * Asynchronous rmdir(2) - delete a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: RmDirOptions
  //   ): Promise<void>;
  // }
  /**
   * Synchronous [`rmdir(2)`](http://man7.org/linux/man-pages/man2/rmdir.2.html). Returns `undefined`.
   *
   * Using `fs.rmdirSync()` on a file (not a directory) results in an `ENOENT` error
   * on Windows and an `ENOTDIR` error on POSIX.
   *
   * To get a behavior similar to the `rm -rf` Unix command, use {@link rmSync} with options `{ recursive: true, force: true }`.
   * @since v0.0.67
   */
  function rmdirSync(path: PathLike, options?: RmDirOptions): void;
  interface RmOptions {
    /**
     * When `true`, exceptions will be ignored if `path` does not exist.
     * @default false
     */
    force?: boolean | undefined;
    /**
     * If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or
     * `EPERM` error is encountered, Node.js will retry the operation with a linear
     * backoff wait of `retryDelay` ms longer on each try. This option represents the
     * number of retries. This option is ignored if the `recursive` option is not
     * `true`.
     * @default 0
     */
    maxRetries?: number | undefined;
    /**
     * If `true`, perform a recursive directory removal. In
     * recursive mode, operations are retried on failure.
     * @default false
     */
    recursive?: boolean | undefined;
    /**
     * The amount of time in milliseconds to wait between retries.
     * This option is ignored if the `recursive` option is not `true`.
     * @default 100
     */
    retryDelay?: number | undefined;
  }
  interface MakeDirectoryOptions {
    /**
     * Indicates whether parent folders should be created.
     * If a folder was created, the path to the first created folder will be returned.
     * @default false
     */
    recursive?: boolean | undefined;
    /**
     * A file mode. If a string is passed, it is parsed as an octal integer. If not specified
     * @default 0o777
     */
    mode?: Mode | undefined;
  }
  /**
   * Asynchronously creates a directory.
   *
   * The callback is given a possible exception and, if `recursive` is `true`, the
   * first directory path created, `(err[, path])`.`path` can still be `undefined` when `recursive` is `true`, if no directory was
   * created.
   *
   * The optional `options` argument can be an integer specifying `mode` (permission
   * and sticky bits), or an object with a `mode` property and a `recursive`property indicating whether parent directories should be created. Calling`fs.mkdir()` when `path` is a directory that
   * exists results in an error only
   * when `recursive` is false.
   *
   * ```js
   * import { mkdir } from 'fs';
   *
   * // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
   * mkdir('/tmp/a/apple', { recursive: true }, (err) => {
   *   if (err) throw err;
   * });
   * ```
   *
   * On Windows, using `fs.mkdir()` on the root directory even with recursion will
   * result in an error:
   *
   * ```js
   * import { mkdir } from 'fs';
   *
   * mkdir('/', { recursive: true }, (err) => {
   *   // => [Error: EPERM: operation not permitted, mkdir 'C:\']
   * });
   * ```
   *
   * See the POSIX [`mkdir(2)`](http://man7.org/linux/man-pages/man2/mkdir.2.html) documentation for more details.
   * @since v0.0.67
   */
  function mkdir(
    path: PathLike,
    options: MakeDirectoryOptions & {
      recursive: true;
    },
    callback: (err: SystemError | null, path?: string) => void
  ): void;
  /**
   * Asynchronous mkdir(2) - create a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function mkdir(
    path: PathLike,
    options:
      | Mode
      | (MakeDirectoryOptions & {
          recursive?: false | undefined;
        })
      | null
      | undefined,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronous mkdir(2) - create a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function mkdir(
    path: PathLike,
    // tslint:disable-next-line:unified-signatures
    options: Mode | MakeDirectoryOptions | null | undefined,
    callback: (err: SystemError | null, path?: string) => void
  ): void;
  /**
   * Asynchronous mkdir(2) - create a directory with a mode of `0o777`.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  function mkdir(path: PathLike, callback: NoParamCallback): void;
  // namespace mkdir {
  //   /**
  //    * Asynchronous mkdir(2) - create a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
  //    * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options: MakeDirectoryOptions & {
  //       recursive: true;
  //     }
  //   ): Promise<string | undefined>;
  //   /**
  //    * Asynchronous mkdir(2) - create a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
  //    * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?:
  //       | Mode
  //       | (MakeDirectoryOptions & {
  //           recursive?: false | undefined;
  //         })
  //       | null
  //   ): Promise<void>;
  //   /**
  //    * Asynchronous mkdir(2) - create a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
  //    * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?: Mode | MakeDirectoryOptions | null
  //   ): Promise<string | undefined>;
  // }
  /**
   * Synchronously creates a directory. Returns `undefined`, or if `recursive` is`true`, the first directory path created.
   * This is the synchronous version of {@link mkdir}.
   *
   * See the POSIX [`mkdir(2)`](http://man7.org/linux/man-pages/man2/mkdir.2.html) documentation for more details.
   * @since v0.0.67
   */
  function mkdirSync(
    path: PathLike,
    options: MakeDirectoryOptions & {
      recursive: true;
    }
  ): string | undefined;
  /**
   * Synchronous mkdir(2) - create a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function mkdirSync(
    path: PathLike,
    options?:
      | Mode
      | (MakeDirectoryOptions & {
          recursive?: false | undefined;
        })
      | null
  ): void;
  /**
   * Synchronous mkdir(2) - create a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
   * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
   */
  function mkdirSync(
    path: PathLike,
    options?: Mode | MakeDirectoryOptions | null
  ): string | undefined;
  /**
   * Creates a unique temporary directory.
   *
   * Generates six random characters to be appended behind a required`prefix` to create a unique temporary directory. Due to platform
   * inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms,
   * notably the BSDs, can return more than six random characters, and replace
   * trailing `X` characters in `prefix` with random characters.
   *
   * The created directory path is passed as a string to the callback's second
   * parameter.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use.
   *
   * ```js
   * import { mkdtemp } from 'fs';
   *
   * mkdtemp(path.join(os.tmpdir(), 'foo-'), (err, directory) => {
   *   if (err) throw err;
   *   console.log(directory);
   *   // Prints: /tmp/foo-itXde2 or C:\Users\...\AppData\Local\Temp\foo-itXde2
   * });
   * ```
   *
   * The `fs.mkdtemp()` method will append the six randomly selected characters
   * directly to the `prefix` string. For instance, given a directory `/tmp`, if the
   * intention is to create a temporary directory _within_`/tmp`, the `prefix`must end with a trailing platform-specific path separator
   * (`require('path').sep`).
   *
   * ```js
   * import { tmpdir } from 'os';
   * import { mkdtemp } from 'fs';
   *
   * // The parent directory for the new temporary directory
   * const tmpDir = tmpdir();
   *
   * // This method is *INCORRECT*:
   * mkdtemp(tmpDir, (err, directory) => {
   *   if (err) throw err;
   *   console.log(directory);
   *   // Will print something similar to `/tmpabc123`.
   *   // A new temporary directory is created at the file system root
   *   // rather than *within* the /tmp directory.
   * });
   *
   * // This method is *CORRECT*:
   * import { sep } from 'path';
   * mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
   *   if (err) throw err;
   *   console.log(directory);
   *   // Will print something similar to `/tmp/abc123`.
   *   // A new temporary directory is created within
   *   // the /tmp directory.
   * });
   * ```
   * @since v0.0.67
   */
  function mkdtemp(
    prefix: string,
    options: EncodingOption,
    callback: (err: SystemError | null, folder: string) => void
  ): void;
  /**
   * Asynchronously creates a unique temporary directory.
   * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function mkdtemp(
    prefix: string,
    options:
      | "buffer"
      | {
          encoding: "buffer";
        },
    callback: (err: SystemError | null, folder: Buffer) => void
  ): void;
  /**
   * Asynchronously creates a unique temporary directory.
   * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function mkdtemp(
    prefix: string,
    options: EncodingOption,
    // tslint:disable-next-line:unified-signatures
    callback: (err: SystemError | null, folder: string | Buffer) => void
  ): void;
  /**
   * Asynchronously creates a unique temporary directory.
   * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
   */
  // tslint:disable-next-line:unified-signatures
  function mkdtemp(
    prefix: string,
    callback: (err: SystemError | null, folder: string) => void
  ): void;
  // namespace mkdtemp {
  //   /**
  //    * Asynchronously creates a unique temporary directory.
  //    * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     prefix: string,
  //     options?: EncodingOption
  //   ): Promise<string>;
  //   /**
  //    * Asynchronously creates a unique temporary directory.
  //    * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     prefix: string,
  //     options: BufferEncodingOption
  //   ): Promise<Buffer>;
  //   /**
  //    * Asynchronously creates a unique temporary directory.
  //    * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     prefix: string,
  //     options?: EncodingOption
  //   ): Promise<string | Buffer>;
  // }
  /**
   * Returns the created directory path.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link mkdtemp}.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use.
   * @since v0.0.67
   */
  function mkdtempSync(prefix: string, options?: EncodingOption): string;
  /**
   * Synchronously creates a unique temporary directory.
   * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function mkdtempSync(prefix: string, options: BufferEncodingOption): Buffer;
  /**
   * Synchronously creates a unique temporary directory.
   * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function mkdtempSync(
    prefix: string,
    options?: EncodingOption
  ): string | Buffer;
  /**
   * Reads the contents of a directory. The callback gets two arguments `(err, files)`where `files` is an array of the names of the files in the directory excluding`'.'` and `'..'`.
   *
   * See the POSIX [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) documentation for more details.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use for
   * the filenames passed to the callback. If the `encoding` is set to `'buffer'`,
   * the filenames returned will be passed as `Buffer` objects.
   *
   * If `options.withFileTypes` is set to `true`, the `files` array will contain `fs.Dirent` objects.
   * @since v0.0.67
   */
  function readdir(
    path: PathLike,
    options:
      | {
          encoding: BufferEncoding | null;
          withFileTypes?: false | undefined;
        }
      | BufferEncoding
      | undefined
      | null,
    callback: (err: SystemError | null, files: string[]) => void
  ): void;
  /**
   * Asynchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function readdir(
    path: PathLike,
    options:
      | {
          encoding: "buffer";
          withFileTypes?: false | undefined;
        }
      | "buffer",
    callback: (err: SystemError | null, files: Buffer[]) => void
  ): void;
  /**
   * Asynchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function readdir(
    path: PathLike,
    options:
      | (ObjectEncodingOptions & {
          withFileTypes?: false | undefined;
        })
      | BufferEncoding
      | undefined
      | null,
    callback: (err: SystemError | null, files: string[] | Buffer[]) => void
  ): void;
  /**
   * Asynchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  function readdir(
    path: PathLike,
    callback: (err: SystemError | null, files: string[]) => void
  ): void;
  /**
   * Asynchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options If called with `withFileTypes: true` the result data will be an array of Dirent.
   */
  function readdir(
    path: PathLike,
    options: ObjectEncodingOptions & {
      withFileTypes: true;
    },
    callback: (err: SystemError | null, files: Dirent[]) => void
  ): void;
  // namespace readdir {
  //   /**
  //    * Asynchronous readdir(3) - read a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?:
  //       | {
  //           encoding: BufferEncoding | null;
  //           withFileTypes?: false | undefined;
  //         }
  //       | BufferEncoding
  //       | null
  //   ): Promise<string[]>;
  //   /**
  //    * Asynchronous readdir(3) - read a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options:
  //       | "buffer"
  //       | {
  //           encoding: "buffer";
  //           withFileTypes?: false | undefined;
  //         }
  //   ): Promise<Buffer[]>;
  //   /**
  //    * Asynchronous readdir(3) - read a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options?:
  //       | (ObjectEncodingOptions & {
  //           withFileTypes?: false | undefined;
  //         })
  //       | BufferEncoding
  //       | null
  //   ): Promise<string[] | Buffer[]>;
  //   /**
  //    * Asynchronous readdir(3) - read a directory.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param options If called with `withFileTypes: true` the result data will be an array of Dirent
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     options: ObjectEncodingOptions & {
  //       withFileTypes: true;
  //     }
  //   ): Promise<Dirent[]>;
  // }
  /**
   * Reads the contents of the directory.
   *
   * See the POSIX [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) documentation for more details.
   *
   * The optional `options` argument can be a string specifying an encoding, or an
   * object with an `encoding` property specifying the character encoding to use for
   * the filenames returned. If the `encoding` is set to `'buffer'`,
   * the filenames returned will be passed as `Buffer` objects.
   *
   * If `options.withFileTypes` is set to `true`, the result will contain `fs.Dirent` objects.
   * @since v0.0.67
   */
  function readdirSync(
    path: PathLike,
    options?:
      | {
          encoding: BufferEncoding | null;
          withFileTypes?: false | undefined;
        }
      | BufferEncoding
      | null
  ): string[];
  /**
   * Synchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function readdirSync(
    path: PathLike,
    options:
      | {
          encoding: "buffer";
          withFileTypes?: false | undefined;
        }
      | "buffer"
  ): Buffer[];
  /**
   * Synchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
   */
  function readdirSync(
    path: PathLike,
    options?:
      | (ObjectEncodingOptions & {
          withFileTypes?: false | undefined;
        })
      | BufferEncoding
      | null
  ): string[] | Buffer[];
  /**
   * Synchronous readdir(3) - read a directory.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * @param options If called with `withFileTypes: true` the result data will be an array of Dirent.
   */
  function readdirSync(
    path: PathLike,
    options: ObjectEncodingOptions & {
      withFileTypes: true;
    }
  ): Dirent[];
  /**
   * Closes the file descriptor. No arguments other than a possible exception are
   * given to the completion callback.
   *
   * Calling `fs.close()` on any file descriptor (`fd`) that is currently in use
   * through any other `fs` operation may lead to undefined behavior.
   *
   * See the POSIX [`close(2)`](http://man7.org/linux/man-pages/man2/close.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function close(fd: number, callback?: NoParamCallback): void;
  // namespace close {
  //   /**
  //    * Asynchronous close(2) - close a file descriptor.
  //    * @param fd A file descriptor.
  //    */
  //   function __promisify__(fd: number): Promise<void>;
  // }
  /**
   * Closes the file descriptor. Returns `undefined`.
   *
   * Calling `fs.closeSync()` on any file descriptor (`fd`) that is currently in use
   * through any other `fs` operation may lead to undefined behavior.
   *
   * See the POSIX [`close(2)`](http://man7.org/linux/man-pages/man2/close.2.html) documentation for more detail.
   * @since v0.0.67
   */
  function closeSync(fd: number): void;
  /**
   * Asynchronous file open. See the POSIX [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html) documentation for more details.
   *
   * `mode` sets the file mode (permission and sticky bits), but only if the file was
   * created. On Windows, only the write permission can be manipulated; see {@link chmod}.
   *
   * The callback gets two arguments `(err, fd)`.
   *
   * Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented
   * by [Naming Files, Paths, and Namespaces](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file). Under NTFS, if the filename contains
   * a colon, Node.js will open a file system stream, as described by [this MSDN page](https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams).
   *
   * Functions based on `fs.open()` exhibit this behavior as well:`fs.writeFile()`, `fs.readFile()`, etc.
   * @since v0.0.67
   * @param [flags='r'] See `support of file system `flags``.
   * @param [mode=0o666]
   */
  function open(
    path: PathLike,
    flags: OpenMode,
    mode: Mode | undefined | null,
    callback: (err: SystemError | null, fd: number) => void
  ): void;
  /**
   * Asynchronous open(2) - open and possibly create a file. If the file is created, its mode will be `0o666`.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   */
  function open(
    path: PathLike,
    flags: OpenMode,
    callback: (err: SystemError | null, fd: number) => void
  ): void;
  // namespace open {
  //   /**
  //    * Asynchronous open(2) - open and possibly create a file.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param mode A file mode. If a string is passed, it is parsed as an octal integer. If not supplied, defaults to `0o666`.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     flags: OpenMode,
  //     mode?: Mode | null
  //   ): Promise<number>;
  // }
  /**
   * Returns an integer representing the file descriptor.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link open}.
   * @since v0.0.67
   * @param [flags='r']
   * @param [mode=0o666]
   */
  function openSync(
    path: PathLike,
    flags: OpenMode,
    mode?: Mode | null
  ): number;
  /**
   * Change the file system timestamps of the object referenced by `path`.
   *
   * The `atime` and `mtime` arguments follow these rules:
   *
   * * Values can be either numbers representing Unix epoch time in seconds,`Date`s, or a numeric string like `'123456789.0'`.
   * * If the value can not be converted to a number, or is `NaN`, `Infinity` or`-Infinity`, an `Error` will be thrown.
   * @since v0.0.67
   */
  function utimes(
    path: PathLike,
    atime: TimeLike,
    mtime: TimeLike,
    callback: NoParamCallback
  ): void;
  // namespace utimes {
  //   /**
  //    * Asynchronously change file timestamps of the file referenced by the supplied path.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * @param atime The last access time. If a string is provided, it will be coerced to number.
  //    * @param mtime The last modified time. If a string is provided, it will be coerced to number.
  //    */
  //   function __promisify__(
  //     path: PathLike,
  //     atime: TimeLike,
  //     mtime: TimeLike
  //   ): Promise<void>;
  // }
  /**
   * Returns `undefined`.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link utimes}.
   * @since v0.0.67
   */
  function utimesSync(path: PathLike, atime: TimeLike, mtime: TimeLike): void;
  /**
   * Change the file system timestamps of the object referenced by the supplied file
   * descriptor. See {@link utimes}.
   * @since v0.0.67
   */
  function futimes(
    fd: number,
    atime: TimeLike,
    mtime: TimeLike,
    callback: NoParamCallback
  ): void;
  // namespace futimes {
  //   /**
  //    * Asynchronously change file timestamps of the file referenced by the supplied file descriptor.
  //    * @param fd A file descriptor.
  //    * @param atime The last access time. If a string is provided, it will be coerced to number.
  //    * @param mtime The last modified time. If a string is provided, it will be coerced to number.
  //    */
  //   function __promisify__(
  //     fd: number,
  //     atime: TimeLike,
  //     mtime: TimeLike
  //   ): Promise<void>;
  // }
  /**
   * Synchronous version of {@link futimes}. Returns `undefined`.
   * @since v0.0.67
   */
  function futimesSync(fd: number, atime: TimeLike, mtime: TimeLike): void;
  /**
   * Request that all data for the open file descriptor is flushed to the storage
   * device. The specific implementation is operating system and device specific.
   * Refer to the POSIX [`fsync(2)`](http://man7.org/linux/man-pages/man2/fsync.2.html) documentation for more detail. No arguments other
   * than a possible exception are given to the completion callback.
   * @since v0.0.67
   */
  function fsync(fd: number, callback: NoParamCallback): void;
  // namespace fsync {
  //   /**
  //    * Asynchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
  //    * @param fd A file descriptor.
  //    */
  //   function __promisify__(fd: number): Promise<void>;
  // }
  /**
   * Request that all data for the open file descriptor is flushed to the storage
   * device. The specific implementation is operating system and device specific.
   * Refer to the POSIX [`fsync(2)`](http://man7.org/linux/man-pages/man2/fsync.2.html) documentation for more detail. Returns `undefined`.
   * @since v0.0.67
   */
  function fsyncSync(fd: number): void;
  /**
   * Write `buffer` to the file specified by `fd`. If `buffer` is a normal object, it
   * must have an own `toString` function property.
   *
   * `offset` determines the part of the buffer to be written, and `length` is
   * an integer specifying the number of bytes to write.
   *
   * `position` refers to the offset from the beginning of the file where this data
   * should be written. If `typeof position !== 'number'`, the data will be written
   * at the current position. See [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html).
   *
   * The callback will be given three arguments `(err, bytesWritten, buffer)` where`bytesWritten` specifies how many _bytes_ were written from `buffer`.
   *
   * If this method is invoked as its `util.promisify()` ed version, it returns
   * a promise for an `Object` with `bytesWritten` and `buffer` properties.
   *
   * It is unsafe to use `fs.write()` multiple times on the same file without waiting
   * for the callback.
   *
   * On Linux, positional writes don't work when the file is opened in append mode.
   * The kernel ignores the position argument and always appends the data to
   * the end of the file.
   * @since v0.0.67
   */
  function write<TBuffer extends ArrayBufferView>(
    fd: number,
    buffer: TBuffer,
    offset: number | undefined | null,
    length: number | undefined | null,
    position: number | undefined | null,
    callback: (
      err: SystemError | null,
      written: number,
      buffer: TBuffer
    ) => void
  ): void;
  /**
   * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
   * @param fd A file descriptor.
   * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
   * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
   */
  function write<TBuffer extends ArrayBufferView>(
    fd: number,
    buffer: TBuffer,
    offset: number | undefined | null,
    length: number | undefined | null,
    callback: (
      err: SystemError | null,
      written: number,
      buffer: TBuffer
    ) => void
  ): void;
  /**
   * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
   * @param fd A file descriptor.
   * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
   */
  function write<TBuffer extends ArrayBufferView>(
    fd: number,
    buffer: TBuffer,
    offset: number | undefined | null,
    callback: (
      err: SystemError | null,
      written: number,
      buffer: TBuffer
    ) => void
  ): void;
  /**
   * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
   * @param fd A file descriptor.
   */
  function write<TBuffer extends ArrayBufferView>(
    fd: number,
    buffer: TBuffer,
    callback: (
      err: SystemError | null,
      written: number,
      buffer: TBuffer
    ) => void
  ): void;
  /**
   * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
   * @param fd A file descriptor.
   * @param string A string to write.
   * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
   * @param encoding The expected string encoding.
   */
  function write(
    fd: number,
    string: string,
    position: number | undefined | null,
    encoding: BufferEncoding | undefined | null,
    callback: (err: SystemError | null, written: number, str: string) => void
  ): void;
  /**
   * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
   * @param fd A file descriptor.
   * @param string A string to write.
   * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
   */
  function write(
    fd: number,
    string: string,
    position: number | undefined | null,
    callback: (err: SystemError | null, written: number, str: string) => void
  ): void;
  /**
   * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
   * @param fd A file descriptor.
   * @param string A string to write.
   */
  function write(
    fd: number,
    string: string,
    callback: (err: SystemError | null, written: number, str: string) => void
  ): void;
  // namespace write {
  //   /**
  //    * Asynchronously writes `buffer` to the file referenced by the supplied file descriptor.
  //    * @param fd A file descriptor.
  //    * @param offset The part of the buffer to be written. If not supplied, defaults to `0`.
  //    * @param length The number of bytes to write. If not supplied, defaults to `buffer.length - offset`.
  //    * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
  //    */
  //   function __promisify__<TBuffer extends ArrayBufferView>(
  //     fd: number,
  //     buffer?: TBuffer,
  //     offset?: number,
  //     length?: number,
  //     position?: number | null
  //   ): Promise<{
  //     bytesWritten: number;
  //     buffer: TBuffer;
  //   }>;
  //   /**
  //    * Asynchronously writes `string` to the file referenced by the supplied file descriptor.
  //    * @param fd A file descriptor.
  //    * @param string A string to write.
  //    * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
  //    * @param encoding The expected string encoding.
  //    */
  //   function __promisify__(
  //     fd: number,
  //     string: string,
  //     position?: number | null,
  //     encoding?: BufferEncoding | null
  //   ): Promise<{
  //     bytesWritten: number;
  //     buffer: string;
  //   }>;
  // }
  /**
   * If `buffer` is a plain object, it must have an own (not inherited) `toString`function property.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link write}.
   * @since v0.0.67
   * @return The number of bytes written.
   */
  function writeSync(
    fd: number,
    buffer: ArrayBufferView,
    offset?: number | null,
    length?: number | null,
    position?: number | null
  ): number;
  /**
   * Synchronously writes `string` to the file referenced by the supplied file descriptor, returning the number of bytes written.
   * @param fd A file descriptor.
   * @param string A string to write.
   * @param position The offset from the beginning of the file where this data should be written. If not supplied, defaults to the current position.
   * @param encoding The expected string encoding.
   */
  function writeSync(
    fd: number,
    string: string,
    position?: number | null,
    encoding?: BufferEncoding | null
  ): number;
  type ReadPosition = number | bigint;
  interface ReadSyncOptions {
    /**
     * @default 0
     */
    offset?: number | undefined;
    /**
     * @default `length of buffer`
     */
    length?: number | undefined;
    /**
     * @default null
     */
    position?: ReadPosition | null | undefined;
  }
  interface ReadAsyncOptions<TBuffer extends ArrayBufferView>
    extends ReadSyncOptions {
    buffer?: TBuffer;
  }
  /**
   * Read data from the file specified by `fd`.
   *
   * The callback is given the three arguments, `(err, bytesRead, buffer)`.
   *
   * If the file is not modified concurrently, the end-of-file is reached when the
   * number of bytes read is zero.
   *
   * If this method is invoked as its `util.promisify()` ed version, it returns
   * a promise for an `Object` with `bytesRead` and `buffer` properties.
   * @since v0.0.67
   * @param buffer The buffer that the data will be written to.
   * @param offset The position in `buffer` to write the data to.
   * @param length The number of bytes to read.
   * @param position Specifies where to begin reading from in the file. If `position` is `null` or `-1 `, data will be read from the current file position, and the file position will be updated. If
   * `position` is an integer, the file position will be unchanged.
   */
  function read<TBuffer extends ArrayBufferView>(
    fd: number,
    buffer: TBuffer,
    offset: number,
    length: number,
    position: ReadPosition | null,
    callback: (
      err: SystemError | null,
      bytesRead: number,
      buffer: TBuffer
    ) => void
  ): void;
  /**
   * Similar to the above `fs.read` function, this version takes an optional `options` object.
   * If not otherwise specified in an `options` object,
   * `buffer` defaults to `Buffer.alloc(16384)`,
   * `offset` defaults to `0`,
   * `length` defaults to `buffer.byteLength`, `- offset` as of Node 17.6.0
   * `position` defaults to `null`
   * @since v0.0.67
   */
  function read<TBuffer extends ArrayBufferView>(
    fd: number,
    options: ReadAsyncOptions<TBuffer>,
    callback: (
      err: SystemError | null,
      bytesRead: number,
      buffer: TBuffer
    ) => void
  ): void;
  function read(
    fd: number,
    callback: (
      err: SystemError | null,
      bytesRead: number,
      buffer: ArrayBufferView
    ) => void
  ): void;
  // namespace read {
  //   /**
  //    * @param fd A file descriptor.
  //    * @param buffer The buffer that the data will be written to.
  //    * @param offset The offset in the buffer at which to start writing.
  //    * @param length The number of bytes to read.
  //    * @param position The offset from the beginning of the file from which data should be read. If `null`, data will be read from the current position.
  //    */
  //   function __promisify__<TBuffer extends ArrayBufferView>(
  //     fd: number,
  //     buffer: TBuffer,
  //     offset: number,
  //     length: number,
  //     position: number | null
  //   ): Promise<{
  //     bytesRead: number;
  //     buffer: TBuffer;
  //   }>;
  //   function __promisify__<TBuffer extends ArrayBufferView>(
  //     fd: number,
  //     options: ReadAsyncOptions<TBuffer>
  //   ): Promise<{
  //     bytesRead: number;
  //     buffer: TBuffer;
  //   }>;
  //   function __promisify__(fd: number): Promise<{
  //     bytesRead: number;
  //     buffer: ArrayBufferView;
  //   }>;
  // }

  // TODO: Add AbortSignal support
  // tslint:disable-next-line:no-empty-interface
  interface Abortable {}

  /**
   * Returns the number of `bytesRead`.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link read}.
   * @since v0.0.67
   */
  function readSync(
    fd: number,
    buffer: ArrayBufferView,
    offset: number,
    length: number,
    position: ReadPosition | null
  ): number;
  /**
   * Similar to the above `fs.readSync` function, this version takes an optional `options` object.
   * If no `options` object is specified, it will default with the above values.
   */
  function readSync(
    fd: number,
    buffer: ArrayBufferView,
    opts?: ReadSyncOptions
  ): number;
  /**
   * Asynchronously reads the entire contents of a file.
   *
   * ```js
   * import { readFile } from 'fs';
   *
   * readFile('/etc/passwd', (err, data) => {
   *   if (err) throw err;
   *   console.log(data);
   * });
   * ```
   *
   * The callback is passed two arguments `(err, data)`, where `data` is the
   * contents of the file.
   *
   * If no encoding is specified, then the raw buffer is returned.
   *
   * If `options` is a string, then it specifies the encoding:
   *
   * ```js
   * import { readFile } from 'fs';
   *
   * readFile('/etc/passwd', 'utf8', callback);
   * ```
   *
   * When the path is a directory, the behavior of `fs.readFile()` and {@link readFileSync} is platform-specific. On macOS, Linux, and Windows, an
   * error will be returned. On FreeBSD, a representation of the directory's contents
   * will be returned.
   *
   * ```js
   * import { readFile } from 'fs';
   *
   * // macOS, Linux, and Windows
   * readFile('<directory>', (err, data) => {
   *   // => [Error: EISDIR: illegal operation on a directory, read <directory>]
   * });
   *
   * //  FreeBSD
   * readFile('<directory>', (err, data) => {
   *   // => null, <data>
   * });
   * ```
   *
   * It is possible to abort an ongoing request using an `AbortSignal`. If a
   * request is aborted the callback is called with an `AbortError`:
   *
   * ```js
   * import { readFile } from 'fs';
   *
   * const controller = new AbortController();
   * const signal = controller.signal;
   * readFile(fileInfo[0].name, { signal }, (err, buf) => {
   *   // ...
   * });
   * // When you want to abort the request
   * controller.abort();
   * ```
   *
   * The `fs.readFile()` function buffers the entire file. To minimize memory costs,
   * when possible prefer streaming via `fs.createReadStream()`.
   *
   * Aborting an ongoing request does not abort individual operating
   * system requests but rather the internal buffering `fs.readFile` performs.
   * @since v0.0.67
   * @param path filename or file descriptor
   */
  function readFile(
    path: PathOrFileDescriptor,
    options:
      | ({
          encoding?: null | undefined;
          flag?: string | undefined;
        } & Abortable)
      | undefined
      | null,
    callback: (err: SystemError | null, data: Buffer) => void
  ): void;
  /**
   * Asynchronously reads the entire contents of a file.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
   * If a flag is not provided, it defaults to `'r'`.
   */
  function readFile(
    path: PathOrFileDescriptor,
    options:
      | ({
          encoding: BufferEncoding;
          flag?: string | undefined;
        } & Abortable)
      | BufferEncoding,
    callback: (err: SystemError | null, data: string) => void
  ): void;
  /**
   * Asynchronously reads the entire contents of a file.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
   * If a flag is not provided, it defaults to `'r'`.
   */
  function readFile(
    path: PathOrFileDescriptor,
    options:
      | (ObjectEncodingOptions & {
          flag?: string | undefined;
        } & Abortable)
      | BufferEncoding
      | undefined
      | null,
    callback: (err: SystemError | null, data: string | Buffer) => void
  ): void;
  /**
   * Asynchronously reads the entire contents of a file.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   */
  function readFile(
    path: PathOrFileDescriptor,
    callback: (err: SystemError | null, data: Buffer) => void
  ): void;
  // namespace readFile {
  //   /**
  //    * Asynchronously reads the entire contents of a file.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
  //    * @param options An object that may contain an optional flag.
  //    * If a flag is not provided, it defaults to `'r'`.
  //    */
  //   function __promisify__(
  //     path: PathOrFileDescriptor,
  //     options?: {
  //       encoding?: null | undefined;
  //       flag?: string | undefined;
  //     } | null
  //   ): Promise<Buffer>;
  //   /**
  //    * Asynchronously reads the entire contents of a file.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
  //    * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
  //    * If a flag is not provided, it defaults to `'r'`.
  //    */
  //   function __promisify__(
  //     path: PathOrFileDescriptor,
  //     options:
  //       | {
  //           encoding: BufferEncoding;
  //           flag?: string | undefined;
  //         }
  //       | BufferEncoding
  //   ): Promise<string>;
  //   /**
  //    * Asynchronously reads the entire contents of a file.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
  //    * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
  //    * If a flag is not provided, it defaults to `'r'`.
  //    */
  //   function __promisify__(
  //     path: PathOrFileDescriptor,
  //     options?:
  //       | (ObjectEncodingOptions & {
  //           flag?: string | undefined;
  //         })
  //       | BufferEncoding
  //       | null
  //   ): Promise<string | Buffer>;
  // }
  /**
   * Returns the contents of the `path`.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link readFile}.
   *
   * If the `encoding` option is specified then this function returns a
   * string. Otherwise it returns a buffer.
   *
   * Similar to {@link readFile}, when the path is a directory, the behavior of`fs.readFileSync()` is platform-specific.
   *
   * ```js
   * import { readFileSync } from 'fs';
   *
   * // macOS, Linux, and Windows
   * readFileSync('<directory>');
   * // => [Error: EISDIR: illegal operation on a directory, read <directory>]
   *
   * //  FreeBSD
   * readFileSync('<directory>'); // => <data>
   * ```
   * @since v0.0.67
   * @param path filename or file descriptor
   */
  function readFileSync(
    path: PathOrFileDescriptor,
    options?: {
      encoding?: null | undefined;
      flag?: string | undefined;
    } | null
  ): Buffer;
  /**
   * Synchronously reads the entire contents of a file.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
   * If a flag is not provided, it defaults to `'r'`.
   */
  function readFileSync(
    path: PathOrFileDescriptor,
    options:
      | {
          encoding: BufferEncoding;
          flag?: string | undefined;
        }
      | BufferEncoding
  ): string;
  /**
   * Synchronously reads the entire contents of a file.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param options Either the encoding for the result, or an object that contains the encoding and an optional flag.
   * If a flag is not provided, it defaults to `'r'`.
   */
  function readFileSync(
    path: PathOrFileDescriptor,
    options?:
      | (ObjectEncodingOptions & {
          flag?: string | undefined;
        })
      | BufferEncoding
      | null
  ): string | Buffer;
  type WriteFileOptions =
    | (ObjectEncodingOptions &
        Abortable & {
          mode?: Mode | undefined;
          flag?: string | undefined;
        })
    | BufferEncoding
    | null;
  /**
   * When `file` is a filename, asynchronously writes data to the file, replacing the
   * file if it already exists. `data` can be a string or a buffer.
   *
   * When `file` is a file descriptor, the behavior is similar to calling`fs.write()` directly (which is recommended). See the notes below on using
   * a file descriptor.
   *
   * The `encoding` option is ignored if `data` is a buffer.
   *
   * The `mode` option only affects the newly created file. See {@link open} for more details.
   *
   * If `data` is a plain object, it must have an own (not inherited) `toString`function property.
   *
   * ```js
   * import { writeFile } from 'fs';
   * import { Buffer } from 'buffer';
   *
   * const data = new Uint8Array(Buffer.from('Hello Node.js'));
   * writeFile('message.txt', data, (err) => {
   *   if (err) throw err;
   *   console.log('The file has been saved!');
   * });
   * ```
   *
   * If `options` is a string, then it specifies the encoding:
   *
   * ```js
   * import { writeFile } from 'fs';
   *
   * writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
   * ```
   *
   * It is unsafe to use `fs.writeFile()` multiple times on the same file without
   * waiting for the callback.
   *
   * Similarly to `fs.readFile` \- `fs.writeFile` is a convenience method that
   * performs multiple `write` calls internally to write the buffer passed to it.
   *
   * It is possible to use an `AbortSignal` to cancel an `fs.writeFile()`.
   * Cancelation is "best effort", and some amount of data is likely still
   * to be written.
   *
   * ```js
   * import { writeFile } from 'fs';
   * import { Buffer } from 'buffer';
   *
   * const controller = new AbortController();
   * const { signal } = controller;
   * const data = new Uint8Array(Buffer.from('Hello Node.js'));
   * writeFile('message.txt', data, { signal }, (err) => {
   *   // When a request is aborted - the callback is called with an AbortError
   * });
   * // When the request should be aborted
   * controller.abort();
   * ```
   *
   * Aborting an ongoing request does not abort individual operating
   * system requests but rather the internal buffering `fs.writeFile` performs.
   * @since v0.0.67
   * @param file filename or file descriptor
   */
  function writeFile(
    file: PathOrFileDescriptor,
    data: string | ArrayBufferView,
    options: WriteFileOptions,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronously writes data to a file, replacing the file if it already exists.
   * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
   */
  function writeFile(
    path: PathOrFileDescriptor,
    data: string | ArrayBufferView,
    callback: NoParamCallback
  ): void;
  // namespace writeFile {
  //   /**
  //    * Asynchronously writes data to a file, replacing the file if it already exists.
  //    * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
  //    * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
  //    * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
  //    * If `encoding` is not supplied, the default of `'utf8'` is used.
  //    * If `mode` is not supplied, the default of `0o666` is used.
  //    * If `mode` is a string, it is parsed as an octal integer.
  //    * If `flag` is not supplied, the default of `'w'` is used.
  //    */
  //   function __promisify__(
  //     path: PathOrFileDescriptor,
  //     data: string | ArrayBufferView,
  //     options?: WriteFileOptions
  //   ): Promise<void>;
  // }
  /**
   * Returns `undefined`.
   *
   * If `data` is a plain object, it must have an own (not inherited) `toString`function property.
   *
   * The `mode` option only affects the newly created file. See {@link open} for more details.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link writeFile}.
   * @since v0.0.67
   * @param file filename or file descriptor
   */
  function writeFileSync(
    file: PathOrFileDescriptor,
    data: string | ArrayBufferView,
    options?: WriteFileOptions
  ): void;
  /**
   * Asynchronously append data to a file, creating the file if it does not yet
   * exist. `data` can be a string or a `Buffer`.
   *
   * The `mode` option only affects the newly created file. See {@link open} for more details.
   *
   * ```js
   * import { appendFile } from 'fs';
   *
   * appendFile('message.txt', 'data to append', (err) => {
   *   if (err) throw err;
   *   console.log('The "data to append" was appended to file!');
   * });
   * ```
   *
   * If `options` is a string, then it specifies the encoding:
   *
   * ```js
   * import { appendFile } from 'fs';
   *
   * appendFile('message.txt', 'data to append', 'utf8', callback);
   * ```
   *
   * The `path` may be specified as a numeric file descriptor that has been opened
   * for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will
   * not be closed automatically.
   *
   * ```js
   * import { open, close, appendFile } from 'fs';
   *
   * function closeFd(fd) {
   *   close(fd, (err) => {
   *     if (err) throw err;
   *   });
   * }
   *
   * open('message.txt', 'a', (err, fd) => {
   *   if (err) throw err;
   *
   *   try {
   *     appendFile(fd, 'data to append', 'utf8', (err) => {
   *       closeFd(fd);
   *       if (err) throw err;
   *     });
   *   } catch (err) {
   *     closeFd(fd);
   *     throw err;
   *   }
   * });
   * ```
   * @since v0.0.67
   * @param path filename or file descriptor
   */
  function appendFile(
    path: PathOrFileDescriptor,
    data: string | Uint8Array,
    options: WriteFileOptions,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronously append data to a file, creating the file if it does not exist.
   * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
   * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
   * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
   */
  function appendFile(
    file: PathOrFileDescriptor,
    data: string | Uint8Array,
    callback: NoParamCallback
  ): void;
  // namespace appendFile {
  //   /**
  //    * Asynchronously append data to a file, creating the file if it does not exist.
  //    * @param file A path to a file. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
  //    * @param data The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string.
  //    * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
  //    * If `encoding` is not supplied, the default of `'utf8'` is used.
  //    * If `mode` is not supplied, the default of `0o666` is used.
  //    * If `mode` is a string, it is parsed as an octal integer.
  //    * If `flag` is not supplied, the default of `'a'` is used.
  //    */
  //   function __promisify__(
  //     file: PathOrFileDescriptor,
  //     data: string | Uint8Array,
  //     options?: WriteFileOptions
  //   ): Promise<void>;
  // }
  /**
   * Synchronously append data to a file, creating the file if it does not yet
   * exist. `data` can be a string or a `Buffer`.
   *
   * The `mode` option only affects the newly created file. See {@link open} for more details.
   *
   * ```js
   * import { appendFileSync } from 'fs';
   *
   * try {
   *   appendFileSync('message.txt', 'data to append');
   *   console.log('The "data to append" was appended to file!');
   * } catch (err) {
   *   // Handle the error
   * }
   * ```
   *
   * If `options` is a string, then it specifies the encoding:
   *
   * ```js
   * import { appendFileSync } from 'fs';
   *
   * appendFileSync('message.txt', 'data to append', 'utf8');
   * ```
   *
   * The `path` may be specified as a numeric file descriptor that has been opened
   * for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will
   * not be closed automatically.
   *
   * ```js
   * import { openSync, closeSync, appendFileSync } from 'fs';
   *
   * let fd;
   *
   * try {
   *   fd = openSync('message.txt', 'a');
   *   appendFileSync(fd, 'data to append', 'utf8');
   * } catch (err) {
   *   // Handle the error
   * } finally {
   *   if (fd !== undefined)
   *     closeSync(fd);
   * }
   * ```
   * @since v0.0.67
   * @param path filename or file descriptor
   */
  function appendFileSync(
    path: PathOrFileDescriptor,
    data: string | Uint8Array,
    options?: WriteFileOptions
  ): void;

  /**
   * Test whether or not the given path exists by checking with the file system.
   * Then call the `callback` argument with either true or false:
   *
   * ```js
   * import { exists } from 'fs';
   *
   * exists('/etc/passwd', (e) => {
   *   console.log(e ? 'it exists' : 'no passwd!');
   * });
   * ```
   *
   * **The parameters for this callback are not consistent with other Node.js**
   * **callbacks.** Normally, the first parameter to a Node.js callback is an `err`parameter, optionally followed by other parameters. The `fs.exists()` callback
   * has only one boolean parameter. This is one reason `fs.access()` is recommended
   * instead of `fs.exists()`.
   *
   * Using `fs.exists()` to check for the existence of a file before calling`fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended. Doing
   * so introduces a race condition, since other processes may change the file's
   * state between the two calls. Instead, user code should open/read/write the
   * file directly and handle the error raised if the file does not exist.
   *
   * **write (NOT RECOMMENDED)**
   *
   * ```js
   * import { exists, open, close } from 'fs';
   *
   * exists('myfile', (e) => {
   *   if (e) {
   *     console.error('myfile already exists');
   *   } else {
   *     open('myfile', 'wx', (err, fd) => {
   *       if (err) throw err;
   *
   *       try {
   *         writeMyData(fd);
   *       } finally {
   *         close(fd, (err) => {
   *           if (err) throw err;
   *         });
   *       }
   *     });
   *   }
   * });
   * ```
   *
   * **write (RECOMMENDED)**
   *
   * ```js
   * import { open, close } from 'fs';
   * open('myfile', 'wx', (err, fd) => {
   *   if (err) {
   *     if (err.code === 'EEXIST') {
   *       console.error('myfile already exists');
   *       return;
   *     }
   *
   *     throw err;
   *   }
   *
   *   try {
   *     writeMyData(fd);
   *   } finally {
   *     close(fd, (err) => {
   *       if (err) throw err;
   *     });
   *   }
   * });
   * ```
   *
   * **read (NOT RECOMMENDED)**
   *
   * ```js
   * import { open, close, exists } from 'fs';
   *
   * exists('myfile', (e) => {
   *   if (e) {
   *     open('myfile', 'r', (err, fd) => {
   *       if (err) throw err;
   *
   *       try {
   *         readMyData(fd);
   *       } finally {
   *         close(fd, (err) => {
   *           if (err) throw err;
   *         });
   *       }
   *     });
   *   } else {
   *     console.error('myfile does not exist');
   *   }
   * });
   * ```
   *
   * **read (RECOMMENDED)**
   *
   * ```js
   * import { open, close } from 'fs';
   *
   * open('myfile', 'r', (err, fd) => {
   *   if (err) {
   *     if (err.code === 'ENOENT') {
   *       console.error('myfile does not exist');
   *       return;
   *     }
   *
   *     throw err;
   *   }
   *
   *   try {
   *     readMyData(fd);
   *   } finally {
   *     close(fd, (err) => {
   *       if (err) throw err;
   *     });
   *   }
   * });
   * ```
   *
   * The "not recommended" examples above check for existence and then use the
   * file; the "recommended" examples are better because they use the file directly
   * and handle the error, if any.
   *
   * In general, check for the existence of a file only if the file won’t be
   * used directly, for example when its existence is a signal from another
   * process.
   * @since v0.0.67
   */
  function exists(path: PathLike, callback: (exists: boolean) => void): void;
  /**
   * Returns `true` if the path exists, `false` otherwise.
   *
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link exists}.
   *
   * `fs.exists()` is deprecated, but `fs.existsSync()` is not. The `callback`parameter to `fs.exists()` accepts parameters that are inconsistent with other
   * Node.js callbacks. `fs.existsSync()` does not use a callback.
   *
   * ```js
   * import { existsSync } from 'fs';
   *
   * if (existsSync('/etc/passwd'))
   *   console.log('The path exists.');
   * ```
   * @since v0.0.67
   */
  function existsSync(path: PathLike): boolean;
  namespace constants {
    // File Access Constants
    /** Constant for fs.access(). File is visible to the calling process. */
    var F_OK: number;
    /** Constant for fs.access(). File can be read by the calling process. */
    var R_OK: number;
    /** Constant for fs.access(). File can be written by the calling process. */
    var W_OK: number;
    /** Constant for fs.access(). File can be executed by the calling process. */
    var X_OK: number;
    // File Copy Constants
    /** Constant for fs.copyFile. Flag indicating the destination file should not be overwritten if it already exists. */
    var COPYFILE_EXCL: number;
    /**
     * Constant for fs.copyFile. copy operation will attempt to create a copy-on-write reflink.
     * If the underlying platform does not support copy-on-write, then a fallback copy mechanism is used.
     */
    var COPYFILE_FICLONE: number;
    /**
     * Constant for fs.copyFile. Copy operation will attempt to create a copy-on-write reflink.
     * If the underlying platform does not support copy-on-write, then the operation will fail with an error.
     */
    var COPYFILE_FICLONE_FORCE: number;
    // File Open Constants
    /** Constant for fs.open(). Flag indicating to open a file for read-only access. */
    var O_RDONLY: number;
    /** Constant for fs.open(). Flag indicating to open a file for write-only access. */
    var O_WRONLY: number;
    /** Constant for fs.open(). Flag indicating to open a file for read-write access. */
    var O_RDWR: number;
    /** Constant for fs.open(). Flag indicating to create the file if it does not already exist. */
    var O_CREAT: number;
    /** Constant for fs.open(). Flag indicating that opening a file should fail if the O_CREAT flag is set and the file already exists. */
    var O_EXCL: number;
    /**
     * Constant for fs.open(). Flag indicating that if path identifies a terminal device,
     * opening the path shall not cause that terminal to become the controlling terminal for the process
     * (if the process does not already have one).
     */
    var O_NOCTTY: number;
    /** Constant for fs.open(). Flag indicating that if the file exists and is a regular file, and the file is opened successfully for write access, its length shall be truncated to zero. */
    var O_TRUNC: number;
    /** Constant for fs.open(). Flag indicating that data will be appended to the end of the file. */
    var O_APPEND: number;
    /** Constant for fs.open(). Flag indicating that the open should fail if the path is not a directory. */
    var O_DIRECTORY: number;
    /**
     * constant for fs.open().
     * Flag indicating reading accesses to the file system will no longer result in
     * an update to the atime information associated with the file.
     * This flag is available on Linux operating systems only.
     */
    var O_NOATIME: number;
    /** Constant for fs.open(). Flag indicating that the open should fail if the path is a symbolic link. */
    var O_NOFOLLOW: number;
    /** Constant for fs.open(). Flag indicating that the file is opened for synchronous I/O. */
    var O_SYNC: number;
    /** Constant for fs.open(). Flag indicating that the file is opened for synchronous I/O with write operations waiting for data integrity. */
    var O_DSYNC: number;
    /** Constant for fs.open(). Flag indicating to open the symbolic link itself rather than the resource it is pointing to. */
    var O_SYMLINK: number;
    /** Constant for fs.open(). When set, an attempt will be made to minimize caching effects of file I/O. */
    var O_DIRECT: number;
    /** Constant for fs.open(). Flag indicating to open the file in nonblocking mode when possible. */
    var O_NONBLOCK: number;
    // File Type Constants
    /** Constant for fs.Stats mode property for determining a file's type. Bit mask used to extract the file type code. */
    var S_IFMT: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a regular file. */
    var S_IFREG: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a directory. */
    var S_IFDIR: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a character-oriented device file. */
    var S_IFCHR: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a block-oriented device file. */
    var S_IFBLK: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a FIFO/pipe. */
    var S_IFIFO: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a symbolic link. */
    var S_IFLNK: number;
    /** Constant for fs.Stats mode property for determining a file's type. File type constant for a socket. */
    var S_IFSOCK: number;
    // File Mode Constants
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable, writable and executable by owner. */
    var S_IRWXU: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable by owner. */
    var S_IRUSR: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating writable by owner. */
    var S_IWUSR: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating executable by owner. */
    var S_IXUSR: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable, writable and executable by group. */
    var S_IRWXG: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable by group. */
    var S_IRGRP: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating writable by group. */
    var S_IWGRP: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating executable by group. */
    var S_IXGRP: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable, writable and executable by others. */
    var S_IRWXO: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating readable by others. */
    var S_IROTH: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating writable by others. */
    var S_IWOTH: number;
    /** Constant for fs.Stats mode property for determining access permissions for a file. File mode indicating executable by others. */
    var S_IXOTH: number;
    /**
     * When set, a memory file mapping is used to access the file. This flag
     * is available on Windows operating systems only. On other operating systems,
     * this flag is ignored.
     */
    var UV_FS_O_FILEMAP: number;
  }
  /**
   * Tests a user's permissions for the file or directory specified by `path`.
   * The `mode` argument is an optional integer that specifies the accessibility
   * checks to be performed. Check `File access constants` for possible values
   * of `mode`. It is possible to create a mask consisting of the bitwise OR of
   * two or more values (e.g. `fs.constants.W_OK | fs.constants.R_OK`).
   *
   * The final argument, `callback`, is a callback function that is invoked with
   * a possible error argument. If any of the accessibility checks fail, the error
   * argument will be an `Error` object. The following examples check if`package.json` exists, and if it is readable or writable.
   *
   * ```js
   * import { access, constants } from 'fs';
   *
   * const file = 'package.json';
   *
   * // Check if the file exists in the current directory.
   * access(file, constants.F_OK, (err) => {
   *   console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
   * });
   *
   * // Check if the file is readable.
   * access(file, constants.R_OK, (err) => {
   *   console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
   * });
   *
   * // Check if the file is writable.
   * access(file, constants.W_OK, (err) => {
   *   console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
   * });
   *
   * // Check if the file exists in the current directory, and if it is writable.
   * access(file, constants.F_OK | constants.W_OK, (err) => {
   *   if (err) {
   *     console.error(
   *       `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
   *   } else {
   *     console.log(`${file} exists, and it is writable`);
   *   }
   * });
   * ```
   *
   * Do not use `fs.access()` to check for the accessibility of a file before calling`fs.open()`, `fs.readFile()` or `fs.writeFile()`. Doing
   * so introduces a race condition, since other processes may change the file's
   * state between the two calls. Instead, user code should open/read/write the
   * file directly and handle the error raised if the file is not accessible.
   *
   * **write (NOT RECOMMENDED)**
   *
   * ```js
   * import { access, open, close } from 'fs';
   *
   * access('myfile', (err) => {
   *   if (!err) {
   *     console.error('myfile already exists');
   *     return;
   *   }
   *
   *   open('myfile', 'wx', (err, fd) => {
   *     if (err) throw err;
   *
   *     try {
   *       writeMyData(fd);
   *     } finally {
   *       close(fd, (err) => {
   *         if (err) throw err;
   *       });
   *     }
   *   });
   * });
   * ```
   *
   * **write (RECOMMENDED)**
   *
   * ```js
   * import { open, close } from 'fs';
   *
   * open('myfile', 'wx', (err, fd) => {
   *   if (err) {
   *     if (err.code === 'EEXIST') {
   *       console.error('myfile already exists');
   *       return;
   *     }
   *
   *     throw err;
   *   }
   *
   *   try {
   *     writeMyData(fd);
   *   } finally {
   *     close(fd, (err) => {
   *       if (err) throw err;
   *     });
   *   }
   * });
   * ```
   *
   * **read (NOT RECOMMENDED)**
   *
   * ```js
   * import { access, open, close } from 'fs';
   * access('myfile', (err) => {
   *   if (err) {
   *     if (err.code === 'ENOENT') {
   *       console.error('myfile does not exist');
   *       return;
   *     }
   *
   *     throw err;
   *   }
   *
   *   open('myfile', 'r', (err, fd) => {
   *     if (err) throw err;
   *
   *     try {
   *       readMyData(fd);
   *     } finally {
   *       close(fd, (err) => {
   *         if (err) throw err;
   *       });
   *     }
   *   });
   * });
   * ```
   *
   * **read (RECOMMENDED)**
   *
   * ```js
   * import { open, close } from 'fs';
   *
   * open('myfile', 'r', (err, fd) => {
   *   if (err) {
   *     if (err.code === 'ENOENT') {
   *       console.error('myfile does not exist');
   *       return;
   *     }
   *
   *     throw err;
   *   }
   *
   *   try {
   *     readMyData(fd);
   *   } finally {
   *     close(fd, (err) => {
   *       if (err) throw err;
   *     });
   *   }
   * });
   * ```
   *
   * The "not recommended" examples above check for accessibility and then use the
   * file; the "recommended" examples are better because they use the file directly
   * and handle the error, if any.
   *
   * In general, check for the accessibility of a file only if the file will not be
   * used directly, for example when its accessibility is a signal from another
   * process.
   *
   * On Windows, access-control policies (ACLs) on a directory may limit access to
   * a file or directory. The `fs.access()` function, however, does not check the
   * ACL and therefore may report that a path is accessible even if the ACL restricts
   * the user from reading or writing to it.
   * @since v0.0.67
   * @param [mode=fs.constants.F_OK]
   */
  function access(
    path: PathLike,
    mode: number | undefined,
    callback: NoParamCallback
  ): void;
  /**
   * Asynchronously tests a user's permissions for the file specified by path.
   * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
   */
  function access(path: PathLike, callback: NoParamCallback): void;
  // namespace access {
  //   /**
  //    * Asynchronously tests a user's permissions for the file specified by path.
  //    * @param path A path to a file or directory. If a URL is provided, it must use the `file:` protocol.
  //    * URL support is _experimental_.
  //    */
  //   function __promisify__(path: PathLike, mode?: number): Promise<void>;
  // }
  /**
   * Synchronously tests a user's permissions for the file or directory specified
   * by `path`. The `mode` argument is an optional integer that specifies the
   * accessibility checks to be performed. Check `File access constants` for
   * possible values of `mode`. It is possible to create a mask consisting of
   * the bitwise OR of two or more values
   * (e.g. `fs.constants.W_OK | fs.constants.R_OK`).
   *
   * If any of the accessibility checks fail, an `Error` will be thrown. Otherwise,
   * the method will return `undefined`.
   *
   * ```js
   * import { accessSync, constants } from 'fs';
   *
   * try {
   *   accessSync('etc/passwd', constants.R_OK | constants.W_OK);
   *   console.log('can read/write');
   * } catch (err) {
   *   console.error('no access!');
   * }
   * ```
   * @since v0.0.67
   * @param [mode=fs.constants.F_OK]
   */
  function accessSync(path: PathLike, mode?: number): void;

  /**
   * Forces all currently queued I/O operations associated with the file to the
   * operating system's synchronized I/O completion state. Refer to the POSIX [`fdatasync(2)`](http://man7.org/linux/man-pages/man2/fdatasync.2.html) documentation for details. No arguments other
   * than a possible
   * exception are given to the completion callback.
   * @since v0.0.67
   */
  function fdatasync(fd: number, callback: NoParamCallback): void;
  // namespace fdatasync {
  //   /**
  //    * Asynchronous fdatasync(2) - synchronize a file's in-core state with storage device.
  //    * @param fd A file descriptor.
  //    */
  //   function __promisify__(fd: number): Promise<void>;
  // }
  /**
   * Forces all currently queued I/O operations associated with the file to the
   * operating system's synchronized I/O completion state. Refer to the POSIX [`fdatasync(2)`](http://man7.org/linux/man-pages/man2/fdatasync.2.html) documentation for details. Returns `undefined`.
   * @since v0.0.67
   */
  function fdatasyncSync(fd: number): void;
  /**
   * Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it
   * already exists. No arguments other than a possible exception are given to the
   * callback function. Node.js makes no guarantees about the atomicity of the copy
   * operation. If an error occurs after the destination file has been opened for
   * writing, Node.js will attempt to remove the destination.
   *
   * `mode` is an optional integer that specifies the behavior
   * of the copy operation. It is possible to create a mask consisting of the bitwise
   * OR of two or more values (e.g.`fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).
   *
   * * `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already
   * exists.
   * * `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a
   * copy-on-write reflink. If the platform does not support copy-on-write, then a
   * fallback copy mechanism is used.
   * * `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
   * create a copy-on-write reflink. If the platform does not support
   * copy-on-write, then the operation will fail.
   *
   * ```js
   * import { copyFile, constants } from 'fs';
   *
   * function callback(err) {
   *   if (err) throw err;
   *   console.log('source.txt was copied to destination.txt');
   * }
   *
   * // destination.txt will be created or overwritten by default.
   * copyFile('source.txt', 'destination.txt', callback);
   *
   * // By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
   * copyFile('source.txt', 'destination.txt', constants.COPYFILE_EXCL, callback);
   * ```
   * @since v0.0.67
   * @param src source filename to copy
   * @param dest destination filename of the copy operation
   * @param [mode=0] modifiers for copy operation.
   */
  function copyFile(
    src: PathLike,
    dest: PathLike,
    callback: NoParamCallback
  ): void;
  function copyFile(
    src: PathLike,
    dest: PathLike,
    mode: number,
    callback: NoParamCallback
  ): void;
  // namespace copyFile {
  //   function __promisify__(
  //     src: PathLike,
  //     dst: PathLike,
  //     mode?: number
  //   ): Promise<void>;
  // }
  /**
   * Synchronously copies `src` to `dest`. By default, `dest` is overwritten if it
   * already exists. Returns `undefined`. Node.js makes no guarantees about the
   * atomicity of the copy operation. If an error occurs after the destination file
   * has been opened for writing, Node.js will attempt to remove the destination.
   *
   * `mode` is an optional integer that specifies the behavior
   * of the copy operation. It is possible to create a mask consisting of the bitwise
   * OR of two or more values (e.g.`fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).
   *
   * * `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already
   * exists.
   * * `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a
   * copy-on-write reflink. If the platform does not support copy-on-write, then a
   * fallback copy mechanism is used.
   * * `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to
   * create a copy-on-write reflink. If the platform does not support
   * copy-on-write, then the operation will fail.
   *
   * ```js
   * import { copyFileSync, constants } from 'fs';
   *
   * // destination.txt will be created or overwritten by default.
   * copyFileSync('source.txt', 'destination.txt');
   * console.log('source.txt was copied to destination.txt');
   *
   * // By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
   * copyFileSync('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
   * ```
   * @since v0.0.67
   * @param src source filename to copy
   * @param dest destination filename of the copy operation
   * @param [mode=0] modifiers for copy operation.
   */
  function copyFileSync(src: PathLike, dest: PathLike, mode?: number): void;
  /**
   * Write an array of `ArrayBufferView`s to the file specified by `fd` using`writev()`.
   *
   * `position` is the offset from the beginning of the file where this data
   * should be written. If `typeof position !== 'number'`, the data will be written
   * at the current position.
   *
   * The callback will be given three arguments: `err`, `bytesWritten`, and`buffers`. `bytesWritten` is how many bytes were written from `buffers`.
   *
   * If this method is `util.promisify()` ed, it returns a promise for an`Object` with `bytesWritten` and `buffers` properties.
   *
   *
   * On Linux, positional writes don't work when the file is opened in append mode.
   * The kernel ignores the position argument and always appends the data to
   * the end of the file.
   * @since v0.0.67
   */
  function writev(
    fd: number,
    buffers: ReadonlyArray<ArrayBufferView>,
    cb: (
      err: SystemError | null,
      bytesWritten: number,
      buffers: ArrayBufferView[]
    ) => void
  ): void;
  function writev(
    fd: number,
    buffers: ReadonlyArray<ArrayBufferView>,
    position: number,
    cb: (
      err: SystemError | null,
      bytesWritten: number,
      buffers: ArrayBufferView[]
    ) => void
  ): void;
  interface WriteVResult {
    bytesWritten: number;
    buffers: ArrayBufferView[];
  }
  // namespace writev {
  //   function __promisify__(
  //     fd: number,
  //     buffers: ReadonlyArray<ArrayBufferView>,
  //     position?: number
  //   ): Promise<WriteVResult>;
  // }
  /**
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link writev}.
   * @since v0.0.67
   * @return The number of bytes written.
   */
  function writevSync(
    fd: number,
    buffers: ReadonlyArray<ArrayBufferView>,
    position?: number
  ): number;
  /**
   * Read from a file specified by `fd` and write to an array of `ArrayBufferView`s
   * using `readv()`.
   *
   * `position` is the offset from the beginning of the file from where data
   * should be read. If `typeof position !== 'number'`, the data will be read
   * from the current position.
   *
   * The callback will be given three arguments: `err`, `bytesRead`, and`buffers`. `bytesRead` is how many bytes were read from the file.
   *
   * If this method is invoked as its `util.promisify()` ed version, it returns
   * a promise for an `Object` with `bytesRead` and `buffers` properties.
   * @since v0.0.67
   */
  function readv(
    fd: number,
    buffers: ReadonlyArray<ArrayBufferView>,
    cb: (
      err: SystemError | null,
      bytesRead: number,
      buffers: ArrayBufferView[]
    ) => void
  ): void;
  function readv(
    fd: number,
    buffers: ReadonlyArray<ArrayBufferView>,
    position: number,
    cb: (
      err: SystemError | null,
      bytesRead: number,
      buffers: ArrayBufferView[]
    ) => void
  ): void;
  interface ReadVResult {
    bytesRead: number;
    buffers: ArrayBufferView[];
  }
  // namespace readv {
  //   function __promisify__(
  //     fd: number,
  //     buffers: ReadonlyArray<ArrayBufferView>,
  //     position?: number
  //   ): Promise<ReadVResult>;
  // }
  /**
   * For detailed information, see the documentation of the asynchronous version of
   * this API: {@link readv}.
   * @since v0.0.67
   * @return The number of bytes read.
   */
  function readvSync(
    fd: number,
    buffers: ReadonlyArray<ArrayBufferView>,
    position?: number
  ): number;
  interface OpenDirOptions {
    encoding?: BufferEncoding | undefined;
    /**
     * Number of directory entries that are buffered
     * internally when reading from the directory. Higher values lead to better
     * performance but higher memory usage.
     * @default 32
     */
    bufferSize?: number | undefined;
  }

  interface BigIntStats extends StatsBase<bigint> {
    atimeNs: bigint;
    mtimeNs: bigint;
    ctimeNs: bigint;
    birthtimeNs: bigint;
  }
  interface BigIntOptions {
    bigint: true;
  }
  interface StatOptions {
    bigint?: boolean | undefined;
  }
  interface StatSyncOptions extends StatOptions {
    throwIfNoEntry?: boolean | undefined;
  }
  interface CopyOptions {
    /**
     * Dereference symlinks
     * @default false
     */
    dereference?: boolean;
    /**
     * When `force` is `false`, and the destination
     * exists, throw an error.
     * @default false
     */
    errorOnExist?: boolean;
    /**
     * function to filter copied files/directories. Return
     * `true` to copy the item, `false` to ignore it.
     */
    filter?(source: string, destination: string): boolean;
    /**
     * Overwrite existing file or directory. _The copy
     * operation will ignore errors if you set this to false and the destination
     * exists. Use the `errorOnExist` option to change this behavior.
     * @default true
     */
    force?: boolean;
    /**
     * When `true` timestamps from `src` will
     * be preserved.
     * @default false
     */
    preserveTimestamps?: boolean;
    /**
     * Copy directories recursively.
     * @default false
     */
    recursive?: boolean;
  }
}

declare module "node:fs" {
  import * as fs from "fs";
  export = fs;
}


// ./html-rewriter.d.ts

declare namespace HTMLRewriterTypes {
  interface HTMLRewriterElementContentHandlers {
    element?(element: Element): void | Promise<void>;
    comments?(comment: Comment): void | Promise<void>;
    text?(text: Text): void | Promise<void>;
  }

  interface HTMLRewriterDocumentContentHandlers {
    doctype?(doctype: Doctype): void | Promise<void>;
    comments?(comment: Comment): void | Promise<void>;
    text?(text: Text): void | Promise<void>;
    end?(end: DocumentEnd): void | Promise<void>;
  }

  interface Text {
    readonly text: string;
    readonly lastInTextNode: boolean;
    readonly removed: boolean;
    before(content: Content, options?: ContentOptions): Text;
    after(content: Content, options?: ContentOptions): Text;
    replace(content: Content, options?: ContentOptions): Text;
    remove(): Text;
  }

  interface Doctype {
    readonly name: string | null;
    readonly publicId: string | null;
    readonly systemId: string | null;
  }

  interface DocumentEnd {
    append(content: Content, options?: ContentOptions): DocumentEnd;
  }

  interface ContentOptions {
    html?: boolean;
  }
  type Content = string;

  interface Comment {
    text: string;
    readonly removed: boolean;
    before(content: Content, options?: ContentOptions): Comment;
    after(content: Content, options?: ContentOptions): Comment;
    replace(content: Content, options?: ContentOptions): Comment;
    remove(): Comment;
  }

  interface Element {
    tagName: string;
    readonly attributes: IterableIterator<string[]>;
    readonly removed: boolean;
    readonly namespaceURI: string;
    getAttribute(name: string): string | null;
    hasAttribute(name: string): boolean;
    setAttribute(name: string, value: string): Element;
    removeAttribute(name: string): Element;
    before(content: Content, options?: ContentOptions): Element;
    after(content: Content, options?: ContentOptions): Element;
    prepend(content: Content, options?: ContentOptions): Element;
    append(content: Content, options?: ContentOptions): Element;
    replace(content: Content, options?: ContentOptions): Element;
    remove(): Element;
    removeAndKeepContent(): Element;
    setInnerContent(content: Content, options?: ContentOptions): Element;
    onEndTag(handler: (tag: EndTag) => void | Promise<void>): void;
  }

  interface EndTag {
    name: string;
    before(content: Content, options?: ContentOptions): EndTag;
    after(content: Content, options?: ContentOptions): EndTag;
    remove(): EndTag;
  }
}

/**
 * [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter?bun) is a fast API for transforming HTML.
 *
 * Bun leverages a native implementation powered by [lol-html](https://github.com/cloudflare/lol-html).
 *
 * HTMLRewriter can be used to transform HTML in a variety of ways, including:
 * * Rewriting URLs
 * * Adding meta tags
 * * Removing elements
 * * Adding elements to the head
 *
 * @example
 * ```ts
 * const rewriter = new HTMLRewriter().on('a[href]', {
 *   element(element: Element) {
 *     // Rewrite all the URLs to this youtube video
 *     element.setAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
 *   }
 * });
 * rewriter.transform(await fetch("https://remix.run"));
 * ```
 */
declare class HTMLRewriter {
  constructor();
  on(
    selector: string,
    handlers: HTMLRewriterTypes.HTMLRewriterElementContentHandlers
  ): HTMLRewriter;
  onDocument(
    handlers: HTMLRewriterTypes.HTMLRewriterDocumentContentHandlers
  ): HTMLRewriter;
  /**
   * @param input - The HTML to transform
   * @returns A new {@link Response} with the transformed HTML
   */
  transform(input: Response): Response;
}


// ./globals.d.ts

type Encoding = "utf-8" | "windows-1252" | "utf-16";

interface console {
  assert(condition?: boolean, ...data: any[]): void;
  clear(): void;
  /**
   * Increment a [count](https://www.youtube.com/watch?v=2AoxCkySv34&t=22s)
   * @param label label counter
   */
  count(label?: string): void;
  countReset(label?: string): void;
  debug(...data: any[]): void;
  dir(item?: any, options?: any): void;
  dirxml(...data: any[]): void;
  /**
   * Log to stderr in your terminal
   *
   * Appears in red
   *
   * @param data something to display
   */
  error(...data: any[]): void;
  /** Does nothing currently */
  group(...data: any[]): void;
  /** Does nothing currently */
  groupCollapsed(...data: any[]): void;
  /** Does nothing currently */
  groupEnd(): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  /** Does nothing currently */
  table(tabularData?: any, properties?: string[]): void;
  /**
   * Begin a timer to log with {@link console.timeEnd}
   *
   * @param label - The label to use for the timer
   *
   * ```ts
   *  console.time("how long????");
   * for (let i = 0; i < 999999; i++) {
   *    // do stuff
   *    let x = i * i;
   * }
   * console.timeEnd("how long????");
   * ```
   */
  time(label?: string): void;
  /**
   * End a timer to log with {@link console.time}
   *
   * @param label - The label to use for the timer
   *
   * ```ts
   *  console.time("how long????");
   * for (let i = 0; i < 999999; i++) {
   *  // do stuff
   *  let x = i * i;
   * }
   * console.timeEnd("how long????");
   * ```
   */
  timeEnd(label?: string): void;
  timeLog(label?: string, ...data: any[]): void;
  timeStamp(label?: string): void;
  trace(...data: any[]): void;
  warn(...data: any[]): void;
}

declare var console: console;

interface ImportMeta {
  /**
   * `file://` url string for the current module.
   *
   * @example
   * ```ts
   * console.log(import.meta.url);
   * "file:///Users/me/projects/my-app/src/my-app.ts"
   * ```
   */
  url: string;
  /**
   * Absolute path to the source file
   */
  path: string;
  /**
   * Absolute path to the directory containing the source file.
   *
   * Does not have a trailing slash
   */
  dir: string;
  /**
   * Filename of the source file
   */
  file: string;
  /**
   * Resolve a module ID the same as if you imported it
   *
   * On failure, throws a `ResolveError`
   */
  resolve(moduleId: string): Promise<string>;
  /**
   * Resolve a `moduleId` as though it were imported from `parent`
   *
   * On failure, throws a `ResolveError`
   */
  // tslint:disable-next-line:unified-signatures
  resolve(moduleId: string, parent: string): Promise<string>;
}

/** @deprecated Please use `import.meta.path` instead. */
declare var __filename: string;

/** @deprecated Please use `import.meta.dir` instead. */
declare var __dirname: string;

interface EncodeIntoResult {
  /**
   * The read Unicode code units of input.
   */
  read: number;
  /**
   * The written UTF-8 bytes of output.
   */
  written: number;
}

interface Process {
  /**
   * The current version of Bun
   */
  version: string;
  /**
   * Run a function on the next tick of the event loop
   *
   * This is the same as {@link queueMicrotask}
   *
   * @param callback - The function to run
   */
  nextTick(callback: (...args: any) => any, ...args: any): void;
  versions: Record<string, string>;
  ppid: number;
  pid: number;
  arch:
    | "arm64"
    | "arm"
    | "ia32"
    | "mips"
    | "mipsel"
    | "ppc"
    | "ppc64"
    | "s390"
    | "s390x"
    | "x32"
    | "x64"
    | "x86";
  platform: "darwin" | "freebsd" | "linux" | "openbsd" | "sunos" | "win32";
  argv: string[];
  // execArgv: string[];
  env: Record<string, string> & {
    NODE_ENV: string;
  };
  // execPath: string;
  // abort(): void;
  chdir(directory: string): void;
  cwd(): string;
  exit(code?: number): void;
  getgid(): number;
  setgid(id: number | string): void;
  getuid(): number;
  setuid(id: number | string): void;
}

declare var process: Process;

interface BlobInterface {
  text(): Promise<string>;
  arrayBuffer(): Promise<ArrayBuffer>;
  json(): Promise<JSON>;
}

type BlobPart = string | Blob | ArrayBufferView | ArrayBuffer;
interface BlobPropertyBag {
  /** Set a default "type" */
  type?: string;

  /** Not implemented in Bun yet. */
  endings?: "transparent" | "native";
}

/**
 * This Fetch API interface allows you to perform various actions on HTTP
 * request and response headers. These actions include retrieving, setting,
 * adding to, and removing. A Headers object has an associated header list,
 * which is initially empty and consists of zero or more name and value
 * pairs.
 *
 * You can add to this using methods like append()
 *
 * In all methods of this interface, header names are matched by
 * case-insensitive byte sequence.
 */
interface Headers {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  entries(): IterableIterator<[string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  forEach(
    callbackfn: (value: string, key: string, parent: Headers) => void,
    thisArg?: any
  ): void;
}

declare var Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};

type HeadersInit = Array<[string, string]> | Record<string, string> | Headers;
type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";

declare class Blob implements BlobInterface {
  /**
   * Create a new [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
   *
   * @param `parts` - An array of strings, numbers, TypedArray, or [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects
   * @param `options` - An object containing properties to be added to the [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
   */
  constructor(parts?: BlobPart[] | Blob, options?: BlobPropertyBag);
  /**
   * Create a new view **without 🚫 copying** the underlying data.
   *
   * Similar to [`TypedArray.subarray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray)
   *
   * @param begin The index that sets the beginning of the view.
   * @param end The index that sets the end of the view.
   *
   */
  slice(begin?: number, end?: number): Blob;

  /**
   * Read the data from the blob as a string. It will be decoded from UTF-8.
   */
  text(): Promise<string>;

  /**
   * Read the data from the blob as a ReadableStream.
   */
  stream(): ReadableStream<Uint8Array>;

  /**
   * Read the data from the blob as an ArrayBuffer.
   *
   * This copies the data into a new ArrayBuffer.
   */
  arrayBuffer(): Promise<ArrayBuffer>;

  /**
   * Read the data from the blob as a JSON object.
   *
   * This first decodes the data from UTF-8, then parses it as JSON.
   *
   */
  json(): Promise<JSON>;

  type: string;
  size: number;
}

interface ResponseInit {
  headers?: HeadersInit;
  /** @default 200 */
  status?: number;

  /** @default "OK" */
  statusText?: string;
}

/**
 * Represents an HTTP [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 *
 * Use it to get the body of the response, the status code, and other information.
 *
 * @example
 * ```ts
 * const response: Response = await fetch("https://remix.run");
 * await response.text();
 * ```
 * @example
 * ```ts
 * const response: Response = await fetch("https://remix.run");
 * await Bun.write("remix.html", response);
 * ```
 */
declare class Response implements BlobInterface {
  constructor(body: BlobPart | BlobPart[], options?: ResponseInit);

  /**
   * Create a new {@link Response} with a JSON body
   *
   * @param body - The body of the response
   * @param options - options to pass to the response
   *
   * @example
   *
   * ```ts
   * const response = Response.json({hi: "there"});
   * console.assert(
   *   await response.text(),
   *   `{"hi":"there"}`
   * );
   * ```
   * -------
   *
   * This is syntactic sugar for:
   * ```js
   *  new Response(JSON.stringify(body), {headers: { "Content-Type": "application/json" }})
   * ```
   * @link https://github.com/whatwg/fetch/issues/1389
   */
  static json(body?: any, options?: ResponseInit | number): Response;
  /**
   * Create a new {@link Response} that redirects to url
   *
   * @param url - the URL to redirect to
   * @param status - the HTTP status code to use for the redirect
   */
  // tslint:disable-next-line:unified-signatures
  static redirect(url: string, status?: number): Response;

  /**
   * Create a new {@link Response} that redirects to url
   *
   * @param url - the URL to redirect to
   * @param options - options to pass to the response
   */
  // tslint:disable-next-line:unified-signatures
  static redirect(url: string, options?: ResponseInit): Response;

  /**
   * Create a new {@link Response} that has a network error
   */
  static error(): Response;

  /**
   * HTTP [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) sent with the response.
   *
   * @example
   * ```ts
   * const {headers} = await fetch("https://remix.run");
   * headers.get("Content-Type");
   * headers.get("Content-Length");
   * headers.get("Set-Cookie");
   * ```
   */
  readonly headers: Headers;

  /**
   * Has the body of the response already been consumed?
   */
  readonly bodyUsed: boolean;

  /**
   * Read the data from the Response as a string. It will be decoded from UTF-8.
   *
   * When the body is valid latin1, this operation is zero copy.
   */
  text(): Promise<string>;

  /**
   * Read the data from the Response as a string. It will be decoded from UTF-8.
   *
   * When the body is valid latin1, this operation is zero copy.
   */
  arrayBuffer(): Promise<ArrayBuffer>;

  /**
   * Read the data from the Response as a JSON object.
   *
   * This first decodes the data from UTF-8, then parses it as JSON.
   *
   */
  json(): Promise<JSON>;

  /**
   * Read the data from the Response as a Blob.
   *
   * This allows you to reuse the underlying data.
   *
   * @returns Promise<Blob> - The body of the response as a {@link Blob}.
   */
  blob(): Promise<Blob>;

  readonly ok: boolean;
  readonly redirected: boolean;
  /**
   * HTTP status code
   *
   * @example
   * 200
   *
   * 0 for network errors
   */
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  /** HTTP url as a string */
  readonly url: string;

  /** Copy the Response object into a new Response, including the body */
  clone(): Response;
}

type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";
type RequestCredentials = "include" | "omit" | "same-origin";
type RequestDestination =
  | ""
  | "audio"
  | "audioworklet"
  | "document"
  | "embed"
  | "font"
  | "frame"
  | "iframe"
  | "image"
  | "manifest"
  | "object"
  | "paintworklet"
  | "report"
  | "script"
  | "sharedworker"
  | "style"
  | "track"
  | "video"
  | "worker"
  | "xslt";
type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
type RequestRedirect = "error" | "follow" | "manual";
type ReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";
type RequestInfo = Request | string;

type BodyInit = ReadableStream | XMLHttpRequestBodyInit;
type XMLHttpRequestBodyInit = Blob | BufferSource | string;
type ReadableStreamController<T> = ReadableStreamDefaultController<T>;
type ReadableStreamDefaultReadResult<T> =
  | ReadableStreamDefaultReadValueResult<T>
  | ReadableStreamDefaultReadDoneResult;
type ReadableStreamReader<T> = ReadableStreamDefaultReader<T>;

interface RequestInit {
  /**
   * A BodyInit object or null to set request's body.
   */
  body?: BodyInit | null;
  /**
   * A string indicating how the request will interact with the browser's cache to set request's cache.
   *
   * Note: as of Bun v0.0.74, this is not implemented yet.
   */
  cache?: RequestCache;
  /**
   * A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.
   */
  credentials?: RequestCredentials;
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set request's headers.
   */
  headers?: HeadersInit;
  /**
   * A cryptographic hash of the resource to be fetched by request. Sets request's integrity.
   *
   * Note: as of Bun v0.0.74, this is not implemented yet.
   */
  integrity?: string;
  /**
   * A boolean to set request's keepalive.
   *
   * Note: as of Bun v0.0.74, this is not implemented yet.
   */
  keepalive?: boolean;
  /**
   * A string to set request's method.
   */
  method?: string;
  /**
   * A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.
   */
  mode?: RequestMode;
  /**
   * A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.
   */
  redirect?: RequestRedirect;
  /**
   * A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.
   */
  referrer?: string;
  /**
   * A referrer policy to set request's referrerPolicy.
   */
  referrerPolicy?: ReferrerPolicy;
  /**
   * An AbortSignal to set request's signal.
   *
   * Note: as of Bun v0.0.74, this is not implemented yet.
   */
  signal?: AbortSignal | null;
  /**
   * Can only be null. Used to disassociate request from any Window.
   *
   * This does nothing in Bun
   */
  window?: any;
}

/**
 * [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) represents an HTTP request.
 *
 * @example
 * ```ts
 * const request = new Request("https://remix.run/");
 * await fetch(request);
 * ```
 *
 * @example
 * ```ts
 * const request = new Request("https://remix.run/");
 * await fetch(request);
 * ```
 */
declare class Request implements BlobInterface {
  constructor(requestInfo: RequestInfo, requestInit?: RequestInit);

  /**
   * Read or write the HTTP headers for this request.
   *
   * @example
   * ```ts
   * const request = new Request("https://remix.run/");
   * request.headers.set("Content-Type", "application/json");
   * request.headers.set("Accept", "application/json");
   * await fetch(request);
   * ```
   */
  headers: Headers;

  /**
   * The URL (as a string) corresponding to the HTTP request
   * @example
   * ```ts
   * const request = new Request("https://remix.run/");
   * request.url; // "https://remix.run/"
   * ```
   */
  readonly url: string;

  /**
   * Consume the [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) body as a string. It will be decoded from UTF-8.
   *
   * When the body is valid latin1, this operation is zero copy.
   */
  text(): Promise<string>;

  /**
   * Consume the [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) body as an ArrayBuffer.
   *
   */
  arrayBuffer(): Promise<ArrayBuffer>;

  /**
   * Consume the [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) body as a JSON object.
   *
   * This first decodes the data from UTF-8, then parses it as JSON.
   *
   */
  json(): Promise<JSON>;

  /**
   * Consume the [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) body as a `Blob`.
   *
   * This allows you to reuse the underlying data.
   *
   */
  blob(): Promise<Blob>;

  /**
   * Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.
   */
  readonly cache: RequestCache;
  /**
   * Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.
   */
  readonly credentials: RequestCredentials;
  /**
   * Returns the kind of resource requested by request, e.g., "document" or "script".
   *
   * In Bun, this always returns "navigate".
   */
  readonly destination: RequestDestination;
  /**
   * Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI]
   *
   * This does nothing in Bun right now.
   */
  readonly integrity: string;
  /**
   * Returns a boolean indicating whether or not request can outlive the global in which it was created.
   *
   * In Bun, this always returns false.
   */
  readonly keepalive: boolean;
  /**
   * Returns request's HTTP method, which is "GET" by default.
   */
  readonly method: string;
  /**
   * Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs.
   */
  readonly mode: RequestMode;
  /**
   * Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.
   */
  readonly redirect: RequestRedirect;
  /**
   * Returns the referrer of request. Its value can be a same-origin URL
   * if explicitly set in init, the empty string to indicate no referrer,
   * and "about:client" when defaulting to the global's default. This is
   * used during fetching to determine the value of the `Referer` header
   * of the request being made.
   */
  readonly referrer: string;
  /**
   * Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer.
   */
  readonly referrerPolicy: ReferrerPolicy;
  /**
   * Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler.
   *
   * Note: this is **not implemented yet**. The cake is a lie.
   */
  readonly signal: AbortSignal;

  /** Copy the Request object into a new Request, including the body */
  clone(): Request;
}

interface Crypto {
  getRandomValues<T extends TypedArray = TypedArray>(array: T): T;
  /**
   * Generate a cryptographically secure random UUID.
   *
   * @example
   *
   * ```js
   * crypto.randomUUID()
   * '5e6adf82-f516-4468-b1e1-33d6f664d7dc'
   * ```
   */
  randomUUID(): string;
}

declare var crypto: Crypto;

/**
 * [`atob`](https://developer.mozilla.org/en-US/docs/Web/API/atob) converts ascii text into base64.
 *
 * @param asciiText The ascii text to convert.
 */
declare function atob(asciiText: string): string;

/**
 * [`btoa`](https://developer.mozilla.org/en-US/docs/Web/API/btoa) decodes base64 into ascii text.
 *
 * @param base64Text The base64 text to convert.
 */
declare function btoa(base64Text: string): string;

/**
 * An implementation of the [WHATWG Encoding Standard](https://encoding.spec.whatwg.org/) `TextEncoder` API. All
 * instances of `TextEncoder` only support UTF-8 encoding.
 *
 * ```js
 * const encoder = new TextEncoder();
 * const uint8array = encoder.encode('this is some data');
 * ```
 *
 */
declare class TextEncoder {
  constructor(encoding?: "utf-8");
  readonly encoding: "utf-8";

  /**
   * UTF-8 encodes the `input` string and returns a `Uint8Array` containing the
   * encoded bytes.
   * @param [input='an empty string'] The text to encode.
   */
  encode(input?: string): Uint8Array;
  /**
   * UTF-8 encodes the `src` string to the `dest` Uint8Array and returns an object
   * containing the read Unicode code units and written UTF-8 bytes.
   *
   * ```js
   * const encoder = new TextEncoder();
   * const src = 'this is some data';
   * const dest = new Uint8Array(10);
   * const { read, written } = encoder.encodeInto(src, dest);
   * ```
   * @param src The text to encode.
   * @param dest The array to hold the encode result.
   */
  encodeInto(src?: string, dest?: TypedArray): EncodeIntoResult;
}

declare class TextDecoder {
  constructor(
    encoding?: Encoding,
    options?: { fatal?: boolean; ignoreBOM?: boolean }
  );

  encoding: Encoding;
  ignoreBOM: boolean;
  fatal: boolean;

  /**
   * Decodes the `input` and returns a string. If `options.stream` is `true`, any
   * incomplete byte sequences occurring at the end of the `input` are buffered
   * internally and emitted after the next call to `textDecoder.decode()`.
   *
   * If `textDecoder.fatal` is `true`, decoding errors that occur will result in a`TypeError` being thrown.
   * @param input An `ArrayBuffer`, `DataView` or `TypedArray` instance containing the encoded data.
   */
  decode(input?: TypedArray | ArrayBuffer): string;
}

/**
 * ShadowRealms are a distinct global environment, with its own global object
 * containing its own intrinsics and built-ins (standard objects that are not
 * bound to global variables, like the initial value of Object.prototype).
 *
 *
 * @example
 *
 * ```js
 * const red = new ShadowRealm();
 *
 * // realms can import modules that will execute within it's own environment.
 * // When the module is resolved, it captured the binding value, or creates a new
 * // wrapped function that is connected to the callable binding.
 * const redAdd = await red.importValue('./inside-code.js', 'add');
 *
 * // redAdd is a wrapped function exotic object that chains it's call to the
 * // respective imported binding.
 * let result = redAdd(2, 3);
 *
 * console.assert(result === 5); // yields true
 *
 * // The evaluate method can provide quick code evaluation within the constructed
 * // shadowRealm without requiring any module loading, while it still requires CSP
 * // relaxing.
 * globalThis.someValue = 1;
 * red.evaluate('globalThis.someValue = 2'); // Affects only the ShadowRealm's global
 * console.assert(globalThis.someValue === 1);
 *
 * // The wrapped functions can also wrap other functions the other way around.
 * const setUniqueValue =
 * await red.importValue('./inside-code.js', 'setUniqueValue');
 *
 * // setUniqueValue = (cb) => (cb(globalThis.someValue) * 2);
 *
 * result = setUniqueValue((x) => x ** 3);
 *
 * console.assert(result === 16); // yields true
 * ```
 */
declare class ShadowRealm {
  /**
   * Creates a new [ShadowRealm](https://github.com/tc39/proposal-shadowrealm/blob/main/explainer.md#introduction)
   *
   * @example
   *
   * ```js
   * const red = new ShadowRealm();
   *
   * // realms can import modules that will execute within it's own environment.
   * // When the module is resolved, it captured the binding value, or creates a new
   * // wrapped function that is connected to the callable binding.
   * const redAdd = await red.importValue('./inside-code.js', 'add');
   *
   * // redAdd is a wrapped function exotic object that chains it's call to the
   * // respective imported binding.
   * let result = redAdd(2, 3);
   *
   * console.assert(result === 5); // yields true
   *
   * // The evaluate method can provide quick code evaluation within the constructed
   * // shadowRealm without requiring any module loading, while it still requires CSP
   * // relaxing.
   * globalThis.someValue = 1;
   * red.evaluate('globalThis.someValue = 2'); // Affects only the ShadowRealm's global
   * console.assert(globalThis.someValue === 1);
   *
   * // The wrapped functions can also wrap other functions the other way around.
   * const setUniqueValue =
   * await red.importValue('./inside-code.js', 'setUniqueValue');
   *
   * // setUniqueValue = (cb) => (cb(globalThis.someValue) * 2);
   *
   * result = setUniqueValue((x) => x ** 3);
   *
   * console.assert(result === 16); // yields true
   * ```
   */
  constructor();
  importValue(specifier: string, bindingName: string): Promise<any>;
  evaluate(sourceText: string): any;
}

interface Blob {
  /**
   * Read the contents of the [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) as a JSON object
   * @warn in browsers, this function is only available for `Response` and `Request`
   */
  json(): Promise<any>;
  /**
   * Read the [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) as a UTF-8 string
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
   */
  text(): Promise<string>;
  /**
   * Read the [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) as an ArrayBuffer object
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer
   */
  arrayBuffer(): Promise<ArrayBuffer>;
}

declare var performance: {
  /**
   * Seconds since Bun.js started
   *
   * Uses a high-precision system timer to measure the time elapsed since the
   * Bun.js runtime was initialized. The value is represented as a double
   * precision floating point number. The value is monotonically increasing
   * during the lifetime of the runtime.
   *
   */
  now: () => number;
};

/**
 * Cancel a repeating timer by its timer ID.
 * @param id timer id
 */
declare function clearInterval(id?: number): void;
/**
 * Cancel a delayed function call by its timer ID.
 * @param id timer id
 */
declare function clearTimeout(id?: number): void;
// declare function createImageBitmap(image: ImageBitmapSource, options?: ImageBitmapOptions): Promise<ImageBitmap>;
// declare function createImageBitmap(image: ImageBitmapSource, sx: number, sy: number, sw: number, sh: number, options?: ImageBitmapOptions): Promise<ImageBitmap>;
/**
 * Send a HTTP(s) request
 *
 * @param url URL string
 * @param init A structured value that contains settings for the fetch() request.
 *
 * @returns A promise that resolves to {@link Response} object.
 *
 *
 */
declare function fetch(url: string, init?: RequestInit): Promise<Response>;

/**
 * Send a HTTP(s) request
 *
 * @param request Request object
 * @param init A structured value that contains settings for the fetch() request.
 *
 * @returns A promise that resolves to {@link Response} object.
 *
 *
 */
// tslint:disable-next-line:unified-signatures
declare function fetch(request: Request, init?: RequestInit): Promise<Response>;

declare function queueMicrotask(callback: () => void): void;
/**
 * Log an error using the default exception handler
 * @param error Error or string
 */
declare function reportError(error: any): void;
/**
 * Run a function every `interval` milliseconds
 * @param handler function to call
 * @param interval milliseconds to wait between calls
 */
declare function setInterval(
  handler: TimerHandler,
  interval?: number,
  ...arguments: any[]
): number;
/**
 * Run a function after `timeout` (milliseconds)
 * @param handler function to call
 * @param timeout milliseconds to wait between calls
 */
declare function setTimeout(
  handler: TimerHandler,
  timeout?: number,
  ...arguments: any[]
): number;
declare function addEventListener<K extends keyof EventMap>(
  type: K,
  listener: (this: object, ev: EventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void;
declare function addEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void;
declare function removeEventListener<K extends keyof EventMap>(
  type: K,
  listener: (this: object, ev: EventMap[K]) => any,
  options?: boolean | EventListenerOptions
): void;
declare function removeEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
): void;

// -----------------------
// -----------------------
// --- libdom.d.ts

interface ErrorEventInit extends EventInit {
  colno?: number;
  error?: any;
  filename?: string;
  lineno?: number;
  message?: string;
}

interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

interface EventListenerOptions {
  capture?: boolean;
}

interface UIEventInit extends EventInit {
  detail?: number;
  view?: null;
  /** @deprecated */
  which?: number;
}

interface EventModifierInit extends UIEventInit {
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  modifierAltGraph?: boolean;
  modifierCapsLock?: boolean;
  modifierFn?: boolean;
  modifierFnLock?: boolean;
  modifierHyper?: boolean;
  modifierNumLock?: boolean;
  modifierScrollLock?: boolean;
  modifierSuper?: boolean;
  modifierSymbol?: boolean;
  modifierSymbolLock?: boolean;
  shiftKey?: boolean;
}

interface EventSourceInit {
  withCredentials?: boolean;
}

/** A controller object that allows you to abort one or more DOM requests as and when desired. */
interface AbortController {
  /**
   * Returns the AbortSignal object associated with this object.
   */
  readonly signal: AbortSignal;
  /**
   * Invoking this method will set this object's AbortSignal's aborted flag and signal to any observers that the associated activity is to be aborted.
   */
  abort(): void;
}

/** EventTarget is a DOM interface implemented by objects that can receive events and may have listeners for them. */
interface EventTarget {
  /**
   * Appends an event listener for events whose type attribute value is
   * type. The callback argument sets the callback that will be invoked
   * when the event is dispatched.
   *
   * The options argument sets listener-specific options. For
   * compatibility this can be a boolean, in which case the method behaves
   * exactly as if the value was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being
   * invoked when the event's eventPhase attribute value is
   * BUBBLING_PHASE. When false (or not present), callback will not be
   * invoked when event's eventPhase attribute value is CAPTURING_PHASE.
   * Either way,callback will be invoked if event's eventPhase attribute
   * value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will
   * not cancel the event by invoking preventDefault(). This is used to
   * enable performance optimizations described in § 2.8 Observing event
   * listeners.
   *
   * When set to true, options's once indicates that the callback will
   * only be invoked once after which the event listener will be removed.
   *
   * If an AbortSignal is passed for options's signal, then the event
   * listener will be removed when signal is aborted.
   *
   * The event listener is appended to target's event listener list and is
   * not appended if it has the same type, callback, and capture.
   */
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void;
  /** Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. */
  dispatchEvent(event: Event): boolean;
  /** Removes the event listener in target's event listener list with the same type, callback, and options. */
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): void;
}

declare var EventTarget: {
  prototype: EventTarget;
  new (): EventTarget;
};

/** An event which takes place in the DOM. */
interface Event {
  /**
   * Returns true or false depending on how event was initialized. True
   * if event goes through its target's ancestors in reverse tree order,
   * and false otherwise.
   */
  readonly bubbles: boolean;
  cancelBubble: boolean;
  /**
   * Returns true or false depending on how event was initialized. Its
   * return value does not always carry meaning, but true can indicate
   * that part of the operation during which event was dispatched, can be
   * canceled by invoking the preventDefault() method.
   */
  readonly cancelable: boolean;
  /**
   * Returns true or false depending on how event was initialized. True
   * if event invokes listeners past a ShadowRoot node that is the root of
   * its target, and false otherwise.
   */
  readonly composed: boolean;
  /**
   * Returns the object whose event listener's callback is currently
   * being invoked.
   */
  readonly currentTarget: EventTarget | null;
  /**
   * Returns true if preventDefault() was invoked successfully to
   * indicate cancelation, and false otherwise.
   */
  readonly defaultPrevented: boolean;
  /**
   * Returns the event's phase, which is one of NONE, CAPTURING_PHASE,
   * AT_TARGET, and BUBBLING_PHASE.
   */
  readonly eventPhase: number;
  /**
   * Returns true if event was dispatched by the user agent, and false
   * otherwise.
   */
  readonly isTrusted: boolean;
  /**
   * @deprecated
   */
  returnValue: boolean;
  /**
   * @deprecated
   */
  readonly srcElement: EventTarget | null;
  /**
   * Returns the object to which event is dispatched (its target).
   */
  readonly target: EventTarget | null;
  /**
   * Returns the event's timestamp as the number of milliseconds measured
   * relative to the time origin.
   */
  readonly timeStamp: DOMHighResTimeStamp;
  /**
   * Returns the type of event, e.g. "click", "hashchange", or "submit".
   */
  readonly type: string;
  /**
   * Returns the invocation target objects of event's path (objects on
   * which listeners will be invoked), except for any nodes in shadow
   * trees of which the shadow root's mode is "closed" that are not
   * reachable from event's currentTarget.
   */
  composedPath(): EventTarget[];
  /**
   * @deprecated
   */
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
  /**
   * If invoked when the cancelable attribute value is true, and while
   * executing a listener for the event with passive set to false, signals
   * to the operation that caused event to be dispatched that it needs to
   * be canceled.
   */
  preventDefault(): void;
  /**
   * Invoking this method prevents event from reaching any registered
   * event listeners after the current one finishes running and, when
   * dispatched in a tree, also prevents event from reaching any other
   * objects.
   */
  stopImmediatePropagation(): void;
  /**
   * When dispatched in a tree, invoking this method prevents event from
   * reaching any objects other than the current object.
   */
  stopPropagation(): void;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
}

declare var Event: {
  prototype: Event;
  new (type: string, eventInitDict?: EventInit): Event;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
};

/**
 * Events providing information related to errors in scripts or in files.
 */
interface ErrorEvent extends Event {
  readonly colno: number;
  readonly error: any;
  readonly filename: string;
  readonly lineno: number;
  readonly message: string;
}

declare var ErrorEvent: {
  prototype: ErrorEvent;
  new (type: string, eventInitDict?: ErrorEventInit): ErrorEvent;
};

/**
 * The URL interface represents an object providing static methods used for
 * creating object URLs.
 */
interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}

interface URLSearchParams {
  /** Appends a specified key/value pair as a new search parameter. */
  append(name: string, value: string): void;
  /** Deletes the given search parameter, and its associated value, from the list of all search parameters. */
  delete(name: string): void;
  /** Returns the first value associated to the given search parameter. */
  get(name: string): string | null;
  /** Returns all the values association with a given search parameter. */
  getAll(name: string): string[];
  /** Returns a Boolean indicating if such a search parameter exists. */
  has(name: string): boolean;
  /** Sets the value associated to a given search parameter to the given value. If there were several values, delete the others. */
  set(name: string, value: string): void;
  sort(): void;
  /** Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
  toString(): string;
  forEach(
    callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
    thisArg?: any
  ): void;
}

declare var URLSearchParams: {
  prototype: URLSearchParams;
  new (
    init?: string[][] | Record<string, string> | string | URLSearchParams
  ): URLSearchParams;
  toString(): string;
};

declare var URL: {
  prototype: URL;
  new (url: string | URL, base?: string | URL): URL;
  /** Not implemented yet */
  createObjectURL(obj: Blob): string;
  /** Not implemented yet */
  revokeObjectURL(url: string): void;
};

type TimerHandler = (...args: any[]) => void;

interface EventListener {
  (evt: Event): void;
}

interface EventListenerObject {
  handleEvent(object: Event): void;
}

declare var AbortController: {
  prototype: AbortController;
  new (): AbortController;
};

interface FetchEvent extends Event {
  readonly request: Request;
  readonly url: string;

  waitUntil(promise: Promise<any>): void;
  respondWith(response: Response | Promise<Response>): void;
}

interface EventMap {
  fetch: FetchEvent;
  // exit: Event;
}

interface AbortSignalEventMap {
  abort: Event;
}

interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
}

/** A signal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required via an AbortController object. */
interface AbortSignal extends EventTarget {
  /**
   * Returns true if this AbortSignal's AbortController has signaled to abort, and false otherwise.
   */
  readonly aborted: boolean;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  addEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare var AbortSignal: {
  prototype: AbortSignal;
  new (): AbortSignal;
};

// type AlgorithmIdentifier = Algorithm | string;
// type BodyInit = ReadableStream | XMLHttpRequestBodyInit;
type BufferSource = ArrayBufferView | ArrayBuffer;
// type COSEAlgorithmIdentifier = number;
// type CSSNumberish = number;
// type CanvasImageSource =
//   | HTMLOrSVGImageElement
//   | HTMLVideoElement
//   | HTMLCanvasElement
//   | ImageBitmap;
type DOMHighResTimeStamp = number;
// type EpochTimeStamp = number;
type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

/**
 * Low-level JavaScriptCore API for accessing the native ES Module loader (not a Bun API)
 *
 * Before using this, be aware of a few things:
 *
 * **Using this incorrectly will crash your application**.
 *
 * This API may change any time JavaScriptCore is updated.
 *
 * Bun may rewrite ESM import specifiers to point to bundled code. This will
 * be confusing when using this API, as it will return a string like
 * "/node_modules.server.bun".
 *
 * Bun may inject additional imports into your code. This usually has a `bun:` prefix.
 *
 */
declare var Loader: {
  /**
   * ESM module registry
   *
   * This lets you implement live reload in Bun. If you
   * delete a module specifier from this map, the next time it's imported, it
   * will be re-transpiled and loaded again.
   *
   * The keys are the module specifiers and the
   * values are metadata about the module.
   *
   * The keys are an implementation detail for Bun that will change between
   * versions.
   *
   * - Userland modules are an absolute file path
   * - Virtual modules have a `bun:` prefix or `node:` prefix
   * - JS polyfills start with `"/bun-vfs/"`. `"buffer"` is an example of a JS polyfill
   * - If you have a `node_modules.bun` file, many modules will point to that file
   *
   * Virtual modules and JS polyfills are embedded in bun's binary. They don't
   * point to anywhere in your local filesystem.
   *
   *
   */
  registry: Map<
    string,
    {
      /**
       * This refers to the state the ESM module is in
       *
       * TODO: make an enum for this number
       *
       *
       */
      state: number;
      dependencies: string[];
      /**
       * Your application will probably crash if you mess with this.
       */
      module: any;
    }
  >;
  /**
   * For an already-evaluated module, return the dependencies as module specifiers
   *
   * This list is already sorted and uniqued.
   *
   * @example
   *
   * For this code:
   * ```js
   * // /foo.js
   * import classNames from 'classnames';
   * import React from 'react';
   * import {createElement} from 'react';
   * ```
   *
   * This would return:
   * ```js
   * Loader.dependencyKeysIfEvaluated("/foo.js")
   * ["bun:wrap", "/path/to/node_modules/classnames/index.js", "/path/to/node_modules/react/index.js"]
   * ```
   *
   * @param specifier - module specifier as it appears in transpiled source code
   *
   */
  dependencyKeysIfEvaluated: (specifier: string) => string[];
  /**
   * The function JavaScriptCore internally calls when you use an import statement.
   *
   * This may return a path to `node_modules.server.bun`, which will be confusing.
   *
   * Consider {@link Bun.resolve} or {@link ImportMeta.resolve}
   * instead.
   *
   * @param specifier - module specifier as it appears in transpiled source code
   */
  resolve: (specifier: string) => Promise<string>;
  /**
   * Synchronously resolve a module specifier
   *
   * This may return a path to `node_modules.server.bun`, which will be confusing.
   *
   * Consider {@link Bun.resolveSync}
   * instead.
   */
  resolveSync: (specifier: string, from: string) => string;
};

/** This Streams API interface represents a readable stream of byte data. The Fetch API offers a concrete instance of a ReadableStream through the body property of a Response object. */
interface ReadableStream<R = any> {
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getReader(): ReadableStreamDefaultReader<R>;
  pipeThrough<T>(
    transform: ReadableWritablePair<T, R>,
    options?: StreamPipeOptions
  ): ReadableStream<T>;
  pipeTo(
    destination: WritableStream<R>,
    options?: StreamPipeOptions
  ): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
  forEach(
    callbackfn: (value: any, key: number, parent: ReadableStream<R>) => void,
    thisArg?: any
  ): void;
}

declare var ReadableStream: {
  prototype: ReadableStream;
  new <R = any>(
    underlyingSource?: DirectUnderlyingSource<R> | UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>
  ): ReadableStream<R>;
};

interface QueuingStrategy<T = any> {
  highWaterMark?: number;
  size?: QueuingStrategySize<T>;
}

interface QueuingStrategyInit {
  /**
   * Creates a new ByteLengthQueuingStrategy with the provided high water mark.
   *
   * Note that the provided high water mark will not be validated ahead of time. Instead, if it is negative, NaN, or not a number, the resulting ByteLengthQueuingStrategy will cause the corresponding stream constructor to throw.
   */
  highWaterMark: number;
}

/** This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams. */
interface ByteLengthQueuingStrategy extends QueuingStrategy<ArrayBufferView> {
  readonly highWaterMark: number;
  readonly size: QueuingStrategySize<ArrayBufferView>;
}

declare var ByteLengthQueuingStrategy: {
  prototype: ByteLengthQueuingStrategy;
  new (init: QueuingStrategyInit): ByteLengthQueuingStrategy;
};

interface ReadableStreamDefaultController<R = any> {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk?: R): void;
  error(e?: any): void;
}

interface ReadableStreamDirectController {
  close(error?: Error): void;
  write(data: ArrayBufferView | ArrayBuffer | string): number | Promise<number>;
  end(): number | Promise<number>;
  flush(): number | Promise<number>;
  start(): void;
}

declare var ReadableStreamDefaultController: {
  prototype: ReadableStreamDefaultController;
  new (): ReadableStreamDefaultController;
};

interface ReadableStreamDefaultReader<R = any>
  extends ReadableStreamGenericReader {
  read(): Promise<ReadableStreamDefaultReadResult<R>>;
  releaseLock(): void;
}

declare var ReadableStreamDefaultReader: {
  prototype: ReadableStreamDefaultReader;
  new <R = any>(stream: ReadableStream<R>): ReadableStreamDefaultReader<R>;
};

interface ReadableStreamGenericReader {
  readonly closed: Promise<undefined>;
  cancel(reason?: any): Promise<void>;
}

interface ReadableStreamDefaultReadDoneResult {
  done: true;
  value?: undefined;
}

interface ReadableStreamDefaultReadValueResult<T> {
  done: false;
  value: T;
}

interface ReadableWritablePair<R = any, W = any> {
  readable: ReadableStream<R>;
  /**
   * Provides a convenient, chainable way of piping this readable stream through a transform stream (or any other { writable, readable } pair). It simply pipes the stream into the writable side of the supplied pair, and returns the readable side for further use.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   */
  writable: WritableStream<W>;
}

/** This Streams API interface provides a standard abstraction for writing streaming data to a destination, known as a sink. This object comes with built-in backpressure and queuing. */
interface WritableStream<W = any> {
  readonly locked: boolean;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  getWriter(): WritableStreamDefaultWriter<W>;
}

declare var WritableStream: {
  prototype: WritableStream;
  new <W = any>(
    underlyingSink?: UnderlyingSink<W>,
    strategy?: QueuingStrategy<W>
  ): WritableStream<W>;
};

/** This Streams API interface represents a controller allowing control of a WritableStream's state. When constructing a WritableStream, the underlying sink is given a corresponding WritableStreamDefaultController instance to manipulate. */
interface WritableStreamDefaultController {
  error(e?: any): void;
}

declare var WritableStreamDefaultController: {
  prototype: WritableStreamDefaultController;
  new (): WritableStreamDefaultController;
};

/** This Streams API interface is the object returned by WritableStream.getWriter() and once created locks the < writer to the WritableStream ensuring that no other streams can write to the underlying sink. */
interface WritableStreamDefaultWriter<W = any> {
  readonly closed: Promise<undefined>;
  readonly desiredSize: number | null;
  readonly ready: Promise<undefined>;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
  write(chunk?: W): Promise<void>;
}

declare var WritableStreamDefaultWriter: {
  prototype: WritableStreamDefaultWriter;
  new <W = any>(stream: WritableStream<W>): WritableStreamDefaultWriter<W>;
};

interface TransformerFlushCallback<O> {
  (controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}

interface TransformerStartCallback<O> {
  (controller: TransformStreamDefaultController<O>): any;
}

interface TransformerTransformCallback<I, O> {
  (
    chunk: I,
    controller: TransformStreamDefaultController<O>
  ): void | PromiseLike<void>;
}

interface UnderlyingSinkAbortCallback {
  (reason?: any): void | PromiseLike<void>;
}

interface UnderlyingSinkCloseCallback {
  (): void | PromiseLike<void>;
}

interface UnderlyingSinkStartCallback {
  (controller: WritableStreamDefaultController): any;
}

interface UnderlyingSinkWriteCallback<W> {
  (
    chunk: W,
    controller: WritableStreamDefaultController
  ): void | PromiseLike<void>;
}

interface UnderlyingSourceCancelCallback {
  (reason?: any): void | PromiseLike<void>;
}

interface UnderlyingSink<W = any> {
  abort?: UnderlyingSinkAbortCallback;
  close?: UnderlyingSinkCloseCallback;
  start?: UnderlyingSinkStartCallback;
  type?: undefined | "default" | "bytes";
  write?: UnderlyingSinkWriteCallback<W>;
}

interface UnderlyingSource<R = any> {
  cancel?: UnderlyingSourceCancelCallback;
  pull?: UnderlyingSourcePullCallback<R>;
  start?: UnderlyingSourceStartCallback<R>;
  type?: undefined;
}

interface DirectUnderlyingSource<R = any> {
  cancel?: UnderlyingSourceCancelCallback;
  pull: (
    controller: ReadableStreamDirectController
  ) => void | PromiseLike<void>;
  type: "direct";
}

interface UnderlyingSourcePullCallback<R> {
  (controller: ReadableStreamController<R>): void | PromiseLike<void>;
}

interface UnderlyingSourceStartCallback<R> {
  (controller: ReadableStreamController<R>): any;
}

interface GenericTransformStream {
  readonly readable: ReadableStream;
  readonly writable: WritableStream;
}

interface TransformStream<I = any, O = any> {
  readonly readable: ReadableStream<O>;
  readonly writable: WritableStream<I>;
}

declare var TransformStream: {
  prototype: TransformStream;
  new <I = any, O = any>(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>
  ): TransformStream<I, O>;
};

interface TransformStreamDefaultController<O = any> {
  readonly desiredSize: number | null;
  enqueue(chunk?: O): void;
  error(reason?: any): void;
  terminate(): void;
}

declare var TransformStreamDefaultController: {
  prototype: TransformStreamDefaultController;
  new (): TransformStreamDefaultController;
};

interface StreamPipeOptions {
  preventAbort?: boolean;
  preventCancel?: boolean;
  /**
   * Pipes this readable stream to a given writable stream destination. The way in which the piping process behaves under various error conditions can be customized with a number of passed options. It returns a promise that fulfills when the piping process completes successfully, or rejects if any errors were encountered.
   *
   * Piping a stream will lock it for the duration of the pipe, preventing any other consumer from acquiring a reader.
   *
   * Errors and closures of the source and destination streams propagate as follows:
   *
   * An error in this source readable stream will abort destination, unless preventAbort is truthy. The returned promise will be rejected with the source's error, or with any error that occurs during aborting the destination.
   *
   * An error in destination will cancel this source readable stream, unless preventCancel is truthy. The returned promise will be rejected with the destination's error, or with any error that occurs during canceling the source.
   *
   * When this source readable stream closes, destination will be closed, unless preventClose is truthy. The returned promise will be fulfilled once this process completes, unless an error is encountered while closing the destination, in which case it will be rejected with that error.
   *
   * If destination starts out closed or closing, this source readable stream will be canceled, unless preventCancel is true. The returned promise will be rejected with an error indicating piping to a closed stream failed, or with any error that occurs during canceling the source.
   *
   * The signal option can be set to an AbortSignal to allow aborting an ongoing pipe operation via the corresponding AbortController. In this case, this source readable stream will be canceled, and destination aborted, unless the respective options preventCancel or preventAbort are set.
   */
  preventClose?: boolean;
  signal?: AbortSignal;
}

/** This Streams API interface provides a built-in byte length queuing strategy that can be used when constructing streams. */
interface CountQueuingStrategy extends QueuingStrategy {
  readonly highWaterMark: number;
  readonly size: QueuingStrategySize;
}

declare var CountQueuingStrategy: {
  prototype: CountQueuingStrategy;
  new (init: QueuingStrategyInit): CountQueuingStrategy;
};

interface QueuingStrategySize<T = any> {
  (chunk?: T): number;
}

interface Transformer<I = any, O = any> {
  flush?: TransformerFlushCallback<O>;
  readableType?: undefined;
  start?: TransformerStartCallback<O>;
  transform?: TransformerTransformCallback<I, O>;
  writableType?: undefined;
}


// ./path.d.ts

/**
 * The `path` module provides utilities for working with file and directory paths.
 * It can be accessed using:
 *
 * ```js
 * import path  from 'path';
 * ```
 */
declare module "path/posix" {
  /**
   * A parsed path object generated by path.parse() or consumed by path.format().
   */
  interface ParsedPath {
    /**
     * The root of the path such as '/' or 'c:\'
     */
    root: string;
    /**
     * The full directory path such as '/home/user/dir' or 'c:\path\dir'
     */
    dir: string;
    /**
     * The file name including extension (if any) such as 'index.html'
     */
    base: string;
    /**
     * The file extension (if any) such as '.html'
     */
    ext: string;
    /**
     * The file name without extension (if any) such as 'index'
     */
    name: string;
  }
  interface FormatInputPathObject {
    /**
     * The root of the path such as '/' or 'c:\'
     */
    root?: string | undefined;
    /**
     * The full directory path such as '/home/user/dir' or 'c:\path\dir'
     */
    dir?: string | undefined;
    /**
     * The file name including extension (if any) such as 'index.html'
     */
    base?: string | undefined;
    /**
     * The file extension (if any) such as '.html'
     */
    ext?: string | undefined;
    /**
     * The file name without extension (if any) such as 'index'
     */
    name?: string | undefined;
  }

  /**
   * Normalize a string path, reducing '..' and '.' parts.
   * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.
   *
   * @param p string path to normalize.
   */
  export function normalize(p: string): string;
  /**
   * Join all arguments together and normalize the resulting path.
   * Arguments must be strings. In v0.8, non-string arguments were silently ignored. In v0.10 and up, an exception is thrown.
   *
   * @param paths paths to join.
   */
  export function join(...paths: string[]): string;
  /**
   * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
   *
   * Starting from leftmost {from} parameter, resolves {to} to an absolute path.
   *
   * If {to} isn't already absolute, {from} arguments are prepended in right to left order,
   * until an absolute path is found. If after using all {from} paths still no absolute path is found,
   * the current working directory is used as well. The resulting path is normalized,
   * and trailing slashes are removed unless the path gets resolved to the root directory.
   *
   * @param pathSegments string paths to join.  Non-string arguments are ignored.
   */
  export function resolve(...pathSegments: string[]): string;
  /**
   * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
   *
   * @param path path to test.
   */
  export function isAbsolute(p: string): boolean;
  /**
   * Solve the relative path from {from} to {to}.
   * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
   */
  export function relative(from: string, to: string): string;
  /**
   * Return the directory name of a path. Similar to the Unix dirname command.
   *
   * @param p the path to evaluate.
   */
  export function dirname(p: string): string;
  /**
   * Return the last portion of a path. Similar to the Unix basename command.
   * Often used to extract the file name from a fully qualified path.
   *
   * @param p the path to evaluate.
   * @param ext optionally, an extension to remove from the result.
   */
  export function basename(p: string, ext?: string): string;
  /**
   * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
   * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
   *
   * @param p the path to evaluate.
   */
  export function extname(p: string): string;
  /**
   * The platform-specific file separator. '\\' or '/'.
   */
  export var sep: string;
  /**
   * The platform-specific file delimiter. ';' or ':'.
   */
  export var delimiter: string;
  /**
   * Returns an object from a path string - the opposite of format().
   *
   * @param pathString path to evaluate.
   */
  export function parse(p: string): ParsedPath;
  /**
   * Returns a path string from an object - the opposite of parse().
   *
   * @param pathString path to evaluate.
   */
  export function format(pP: FormatInputPathObject): string;
  /**
   * On Windows systems only, returns an equivalent namespace-prefixed path for the given path.
   * If path is not a string, path will be returned without modifications.
   * This method is meaningful only on Windows system.
   * On POSIX systems, the method is non-operational and always returns path without modifications.
   */
  export function toNamespacedPath(path: string): string;
}

/**
 * The `path` module provides utilities for working with file and directory paths.
 * It can be accessed using:
 *
 * ```js
 * import path  from 'path';
 * ```
 */
declare module "path/win32" {
  export * from "path/posix";
}

/**
 * The `path` module provides utilities for working with file and directory paths.
 * It can be accessed using:
 *
 * ```js
 * import path  from 'path';
 * ```
 */
declare module "path" {
  export * from "path/posix";
  export * as posix from "path/posix";
  export * as win32 from "path/win32";
}

/**
 * The `path` module provides utilities for working with file and directory paths.
 * It can be accessed using:
 *
 * ```js
 * import path  from 'path';
 * ```
 */
declare module "node:path" {
  export * from "path";
}
/**
 * The `path` module provides utilities for working with file and directory paths.
 * It can be accessed using:
 *
 * ```js
 * import path  from 'path';
 * ```
 */
declare module "node:path/posix" {
  export * from "path/posix";
}
/**
 * The `path` module provides utilities for working with file and directory paths.
 * It can be accessed using:
 *
 * ```js
 * import path  from 'path';
 * ```
 */
declare module "node:path/win32" {
  export * from "path/win32";
}


// ./bun-test.d.ts

/**
 *
 * This isn't really designed for third-party usage yet.
 * You can try it if you want though!
 *
 * To run the tests, run `bun wiptest`
 *
 * @example
 *
 * ```bash
 * $ bun wiptest
 * ```
 *
 * @example
 * ```bash
 * $ bun wiptest file-name
 * ```
 */

declare module "bun:test" {
  export function describe(label: string, body: () => void): any;
  export function it(label: string, test: () => void | Promise<any>): any;
  export function test(label: string, test: () => void | Promise<any>): any;

  export function expect(value: any): Expect;

  interface Expect {
    toBe(value: any): void;
    toContain(value: any): void;
  }
}

declare module "test" {
  import BunTestModule = require("bun:test");
  export = BunTestModule;
}


// ./jsc.d.ts

declare module "bun:jsc" {
  export function describe(value: any): string;
  export function describeArray(args: any[]): string;
  export function gcAndSweep(): void;
  export function fullGC(): void;
  export function edenGC(): void;
  export function heapSize(): number;
  export function heapStats(): {
    heapSize: number;
    heapCapacity: number;
    extraMemorySize: number;
    objectCount: number;
    protectedObjectCount: number;
    globalObjectCount: number;
    protectedGlobalObjectCount: number;
    objectTypeCounts: Record<string, number>;
    protectedObjectTypeCounts: Record<string, number>;
  };
  export function memoryUsage(): {
    current: number;
    peak: number;
    currentCommit: number;
    peakCommit: number;
    pageFaults: number;
  };
  export function getRandomSeed(): number;
  export function setRandomSeed(value: number): void;
  export function isRope(input: string): boolean;
  export function callerSourceOrigin(): string;
  export function noFTL(func: Function): Function;
  export function noOSRExitFuzzing(func: Function): Function;
  export function optimizeNextInvocation(func: Function): Function;
  export function numberOfDFGCompiles(func: Function): number;
  export function releaseWeakRefs(): void;
  export function totalCompileTime(func: Function): number;
  export function reoptimizationRetryCount(func: Function): number;
  export function drainMicrotasks(): void;

  /**
   * This returns objects which native code has explicitly protected from being
   * garbage collected
   *
   * By calling this function you create another reference to the object, which
   * will further prevent it from being garbage collected
   *
   * This function is mostly a debugging tool for bun itself.
   *
   * Warning: not all objects returned are supposed to be observable from JavaScript
   */
  export function getProtectedObjects(): any[];

  /**
   * Start a remote debugging socket server on the given port.
   *
   * This exposes JavaScriptCore's built-in debugging server.
   *
   * This is untested. May not be supported yet on macOS
   */
  export function startRemoteDebugger(host?: string, port?: number): void;
}


// ./assert.d.ts

/**
 * The `assert` module provides a set of assertion functions for verifying
 * invariants.
 * @see [source](https://github.com/nodejs/node/blob/v18.0.0/lib/assert.js)
 */
 declare module 'assert' {
  /**
   * An alias of {@link ok}.
   * @param value The input that is checked for being truthy.
   */
  function assert(value: unknown, message?: string | Error): asserts value;
  namespace assert {
      /**
       * Indicates the failure of an assertion. All errors thrown by the `assert` module
       * will be instances of the `AssertionError` class.
       */
      class AssertionError extends Error {
          actual: unknown;
          expected: unknown;
          operator: string;
          generatedMessage: boolean;
          code: 'ERR_ASSERTION';
          constructor(options?: {
              /** If provided, the error message is set to this value. */
              message?: string | undefined;
              /** The `actual` property on the error instance. */
              actual?: unknown | undefined;
              /** The `expected` property on the error instance. */
              expected?: unknown | undefined;
              /** The `operator` property on the error instance. */
              operator?: string | undefined;
              /** If provided, the generated stack trace omits frames before this function. */
              // tslint:disable-next-line:ban-types
              stackStartFn?: Function | undefined;
          });
      }
      /**
       * This feature is currently experimental and behavior might still change.
       * @experimental
       */
      class CallTracker {
          /**
           * The wrapper function is expected to be called exactly `exact` times. If the
           * function has not been called exactly `exact` times when `tracker.verify()` is called, then `tracker.verify()` will throw an
           * error.
           *
           * ```js
           * import assert from 'assert';
           *
           * // Creates call tracker.
           * const tracker = new assert.CallTracker();
           *
           * function func() {}
           *
           * // Returns a function that wraps func() that must be called exact times
           * // before tracker.verify().
           * const callsfunc = tracker.calls(func);
           * ```
           * @param [fn='A no-op function']
           * @param [exact=1]
           * @return that wraps `fn`.
           */
          calls(exact?: number): () => void;
          calls<Func extends (...args: any[]) => any>(fn?: Func, exact?: number): Func;
          /**
           * The arrays contains information about the expected and actual number of calls of
           * the functions that have not been called the expected number of times.
           *
           * ```js
           * import assert from 'assert';
           *
           * // Creates call tracker.
           * const tracker = new assert.CallTracker();
           *
           * function func() {}
           *
           * function foo() {}
           *
           * // Returns a function that wraps func() that must be called exact times
           * // before tracker.verify().
           * const callsfunc = tracker.calls(func, 2);
           *
           * // Returns an array containing information on callsfunc()
           * tracker.report();
           * // [
           * //  {
           * //    message: 'Expected the func function to be executed 2 time(s) but was
           * //    executed 0 time(s).',
           * //    actual: 0,
           * //    expected: 2,
           * //    operator: 'func',
           * //    stack: stack trace
           * //  }
           * // ]
           * ```
           * @return of objects containing information about the wrapper functions returned by `calls`.
           */
          report(): CallTrackerReportInformation[];
          /**
           * Iterates through the list of functions passed to `tracker.calls()` and will throw an error for functions that
           * have not been called the expected number of times.
           *
           * ```js
           * import assert from 'assert';
           *
           * // Creates call tracker.
           * const tracker = new assert.CallTracker();
           *
           * function func() {}
           *
           * // Returns a function that wraps func() that must be called exact times
           * // before tracker.verify().
           * const callsfunc = tracker.calls(func, 2);
           *
           * callsfunc();
           *
           * // Will throw an error since callsfunc() was only called once.
           * tracker.verify();
           * ```
           */
          verify(): void;
      }
      interface CallTrackerReportInformation {
          message: string;
          /** The actual number of times the function was called. */
          actual: number;
          /** The number of times the function was expected to be called. */
          expected: number;
          /** The name of the function that is wrapped. */
          operator: string;
          /** A stack trace of the function. */
          stack: object;
      }
      type AssertPredicate = RegExp | (new () => object) | ((thrown: unknown) => boolean) | object | Error;
      /**
       * Throws an `AssertionError` with the provided error message or a default
       * error message. If the `message` parameter is an instance of an `Error` then
       * it will be thrown instead of the `AssertionError`.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.fail();
       * // AssertionError [ERR_ASSERTION]: Failed
       *
       * assert.fail('boom');
       * // AssertionError [ERR_ASSERTION]: boom
       *
       * assert.fail(new TypeError('need array'));
       * // TypeError: need array
       * ```
       *
       * Using `assert.fail()` with more than two arguments is possible but deprecated.
       * See below for further details.
       * @param [message='Failed']
       */
      function fail(message?: string | Error): never;
      /** @deprecated since v10.0.0 - use fail([message]) or other assert functions instead. */
      function fail(
          actual: unknown,
          expected: unknown,
          message?: string | Error,
          operator?: string,
          // tslint:disable-next-line:ban-types
          stackStartFn?: Function
      ): never;
      /**
       * Tests if `value` is truthy. It is equivalent to`assert.equal(!!value, true, message)`.
       *
       * If `value` is not truthy, an `AssertionError` is thrown with a `message`property set equal to the value of the `message` parameter. If the `message`parameter is `undefined`, a default
       * error message is assigned. If the `message`parameter is an instance of an `Error` then it will be thrown instead of the`AssertionError`.
       * If no arguments are passed in at all `message` will be set to the string:`` 'No value argument passed to `assert.ok()`' ``.
       *
       * Be aware that in the `repl` the error message will be different to the one
       * thrown in a file! See below for further details.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.ok(true);
       * // OK
       * assert.ok(1);
       * // OK
       *
       * assert.ok();
       * // AssertionError: No value argument passed to `assert.ok()`
       *
       * assert.ok(false, 'it\'s false');
       * // AssertionError: it's false
       *
       * // In the repl:
       * assert.ok(typeof 123 === 'string');
       * // AssertionError: false == true
       *
       * // In a file (e.g. test.js):
       * assert.ok(typeof 123 === 'string');
       * // AssertionError: The expression evaluated to a falsy value:
       * //
       * //   assert.ok(typeof 123 === 'string')
       *
       * assert.ok(false);
       * // AssertionError: The expression evaluated to a falsy value:
       * //
       * //   assert.ok(false)
       *
       * assert.ok(0);
       * // AssertionError: The expression evaluated to a falsy value:
       * //
       * //   assert.ok(0)
       * ```
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * // Using `assert()` works the same:
       * assert(0);
       * // AssertionError: The expression evaluated to a falsy value:
       * //
       * //   assert(0)
       * ```
       */
      function ok(value: unknown, message?: string | Error): asserts value;
      /**
       * **Strict assertion mode**
       *
       * An alias of {@link strictEqual}.
       *
       * **Legacy assertion mode**
       *
       * > Stability: 3 - Legacy: Use {@link strictEqual} instead.
       *
       * Tests shallow, coercive equality between the `actual` and `expected` parameters
       * using the [`==` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality). `NaN` is specially handled
       * and treated as being identical if both sides are `NaN`.
       *
       * ```js
       * import assert from 'assert';
       *
       * assert.equal(1, 1);
       * // OK, 1 == 1
       * assert.equal(1, '1');
       * // OK, 1 == '1'
       * assert.equal(NaN, NaN);
       * // OK
       *
       * assert.equal(1, 2);
       * // AssertionError: 1 == 2
       * assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
       * // AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
       * ```
       *
       * If the values are not equal, an `AssertionError` is thrown with a `message`property set equal to the value of the `message` parameter. If the `message`parameter is undefined, a default
       * error message is assigned. If the `message`parameter is an instance of an `Error` then it will be thrown instead of the`AssertionError`.
       */
      function equal(actual: unknown, expected: unknown, message?: string | Error): void;
      /**
       * **Strict assertion mode**
       *
       * An alias of {@link notStrictEqual}.
       *
       * **Legacy assertion mode**
       *
       * > Stability: 3 - Legacy: Use {@link notStrictEqual} instead.
       *
       * Tests shallow, coercive inequality with the [`!=` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Inequality). `NaN` is
       * specially handled and treated as being identical if both sides are `NaN`.
       *
       * ```js
       * import assert from 'assert';
       *
       * assert.notEqual(1, 2);
       * // OK
       *
       * assert.notEqual(1, 1);
       * // AssertionError: 1 != 1
       *
       * assert.notEqual(1, '1');
       * // AssertionError: 1 != '1'
       * ```
       *
       * If the values are equal, an `AssertionError` is thrown with a `message`property set equal to the value of the `message` parameter. If the `message`parameter is undefined, a default error
       * message is assigned. If the `message`parameter is an instance of an `Error` then it will be thrown instead of the`AssertionError`.
       */
      function notEqual(actual: unknown, expected: unknown, message?: string | Error): void;
      /**
       * **Strict assertion mode**
       *
       * An alias of {@link deepStrictEqual}.
       *
       * **Legacy assertion mode**
       *
       * > Stability: 3 - Legacy: Use {@link deepStrictEqual} instead.
       *
       * Tests for deep equality between the `actual` and `expected` parameters. Consider
       * using {@link deepStrictEqual} instead. {@link deepEqual} can have
       * surprising results.
       *
       * _Deep equality_ means that the enumerable "own" properties of child objects
       * are also recursively evaluated by the following rules.
       */
      function deepEqual(actual: unknown, expected: unknown, message?: string | Error): void;
      /**
       * **Strict assertion mode**
       *
       * An alias of {@link notDeepStrictEqual}.
       *
       * **Legacy assertion mode**
       *
       * > Stability: 3 - Legacy: Use {@link notDeepStrictEqual} instead.
       *
       * Tests for any deep inequality. Opposite of {@link deepEqual}.
       *
       * ```js
       * import assert from 'assert';
       *
       * const obj1 = {
       *   a: {
       *     b: 1
       *   }
       * };
       * const obj2 = {
       *   a: {
       *     b: 2
       *   }
       * };
       * const obj3 = {
       *   a: {
       *     b: 1
       *   }
       * };
       * const obj4 = Object.create(obj1);
       *
       * assert.notDeepEqual(obj1, obj1);
       * // AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }
       *
       * assert.notDeepEqual(obj1, obj2);
       * // OK
       *
       * assert.notDeepEqual(obj1, obj3);
       * // AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }
       *
       * assert.notDeepEqual(obj1, obj4);
       * // OK
       * ```
       *
       * If the values are deeply equal, an `AssertionError` is thrown with a`message` property set equal to the value of the `message` parameter. If the`message` parameter is undefined, a default
       * error message is assigned. If the`message` parameter is an instance of an `Error` then it will be thrown
       * instead of the `AssertionError`.
       */
      function notDeepEqual(actual: unknown, expected: unknown, message?: string | Error): void;
      /**
       * Tests strict equality between the `actual` and `expected` parameters as
       * determined by [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.strictEqual(1, 2);
       * // AssertionError [ERR_ASSERTION]: Expected inputs to be strictly equal:
       * //
       * // 1 !== 2
       *
       * assert.strictEqual(1, 1);
       * // OK
       *
       * assert.strictEqual('Hello foobar', 'Hello World!');
       * // AssertionError [ERR_ASSERTION]: Expected inputs to be strictly equal:
       * // + actual - expected
       * //
       * // + 'Hello foobar'
       * // - 'Hello World!'
       * //          ^
       *
       * const apples = 1;
       * const oranges = 2;
       * assert.strictEqual(apples, oranges, `apples ${apples} !== oranges ${oranges}`);
       * // AssertionError [ERR_ASSERTION]: apples 1 !== oranges 2
       *
       * assert.strictEqual(1, '1', new TypeError('Inputs are not identical'));
       * // TypeError: Inputs are not identical
       * ```
       *
       * If the values are not strictly equal, an `AssertionError` is thrown with a`message` property set equal to the value of the `message` parameter. If the`message` parameter is undefined, a
       * default error message is assigned. If the`message` parameter is an instance of an `Error` then it will be thrown
       * instead of the `AssertionError`.
       */
      function strictEqual<T>(actual: unknown, expected: T, message?: string | Error): asserts actual is T;
      /**
       * Tests strict inequality between the `actual` and `expected` parameters as
       * determined by [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.notStrictEqual(1, 2);
       * // OK
       *
       * assert.notStrictEqual(1, 1);
       * // AssertionError [ERR_ASSERTION]: Expected "actual" to be strictly unequal to:
       * //
       * // 1
       *
       * assert.notStrictEqual(1, '1');
       * // OK
       * ```
       *
       * If the values are strictly equal, an `AssertionError` is thrown with a`message` property set equal to the value of the `message` parameter. If the`message` parameter is undefined, a
       * default error message is assigned. If the`message` parameter is an instance of an `Error` then it will be thrown
       * instead of the `AssertionError`.
       */
      function notStrictEqual(actual: unknown, expected: unknown, message?: string | Error): void;
      /**
       * Tests for deep equality between the `actual` and `expected` parameters.
       * "Deep" equality means that the enumerable "own" properties of child objects
       * are recursively evaluated also by the following rules.
       */
      function deepStrictEqual<T>(actual: unknown, expected: T, message?: string | Error): asserts actual is T;
      /**
       * Tests for deep strict inequality. Opposite of {@link deepStrictEqual}.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.notDeepStrictEqual({ a: 1 }, { a: '1' });
       * // OK
       * ```
       *
       * If the values are deeply and strictly equal, an `AssertionError` is thrown
       * with a `message` property set equal to the value of the `message` parameter. If
       * the `message` parameter is undefined, a default error message is assigned. If
       * the `message` parameter is an instance of an `Error` then it will be thrown
       * instead of the `AssertionError`.
       */
      function notDeepStrictEqual(actual: unknown, expected: unknown, message?: string | Error): void;
      /**
       * Expects the function `fn` to throw an error.
       *
       * If specified, `error` can be a [`Class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),
       * [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a validation function,
       * a validation object where each property will be tested for strict deep equality,
       * or an instance of error where each property will be tested for strict deep
       * equality including the non-enumerable `message` and `name` properties. When
       * using an object, it is also possible to use a regular expression, when
       * validating against a string property. See below for examples.
       *
       * If specified, `message` will be appended to the message provided by the`AssertionError` if the `fn` call fails to throw or in case the error validation
       * fails.
       *
       * Custom validation object/error instance:
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * const err = new TypeError('Wrong value');
       * err.code = 404;
       * err.foo = 'bar';
       * err.info = {
       *   nested: true,
       *   baz: 'text'
       * };
       * err.reg = /abc/i;
       *
       * assert.throws(
       *   () => {
       *     throw err;
       *   },
       *   {
       *     name: 'TypeError',
       *     message: 'Wrong value',
       *     info: {
       *       nested: true,
       *       baz: 'text'
       *     }
       *     // Only properties on the validation object will be tested for.
       *     // Using nested objects requires all properties to be present. Otherwise
       *     // the validation is going to fail.
       *   }
       * );
       *
       * // Using regular expressions to validate error properties:
       * throws(
       *   () => {
       *     throw err;
       *   },
       *   {
       *     // The `name` and `message` properties are strings and using regular
       *     // expressions on those will match against the string. If they fail, an
       *     // error is thrown.
       *     name: /^TypeError$/,
       *     message: /Wrong/,
       *     foo: 'bar',
       *     info: {
       *       nested: true,
       *       // It is not possible to use regular expressions for nested properties!
       *       baz: 'text'
       *     },
       *     // The `reg` property contains a regular expression and only if the
       *     // validation object contains an identical regular expression, it is going
       *     // to pass.
       *     reg: /abc/i
       *   }
       * );
       *
       * // Fails due to the different `message` and `name` properties:
       * throws(
       *   () => {
       *     const otherErr = new Error('Not found');
       *     // Copy all enumerable properties from `err` to `otherErr`.
       *     for (const [key, value] of Object.entries(err)) {
       *       otherErr[key] = value;
       *     }
       *     throw otherErr;
       *   },
       *   // The error's `message` and `name` properties will also be checked when using
       *   // an error as validation object.
       *   err
       * );
       * ```
       *
       * Validate instanceof using constructor:
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.throws(
       *   () => {
       *     throw new Error('Wrong value');
       *   },
       *   Error
       * );
       * ```
       *
       * Validate error message using [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions):
       *
       * Using a regular expression runs `.toString` on the error object, and will
       * therefore also include the error name.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.throws(
       *   () => {
       *     throw new Error('Wrong value');
       *   },
       *   /^Error: Wrong value$/
       * );
       * ```
       *
       * Custom error validation:
       *
       * The function must return `true` to indicate all internal validations passed.
       * It will otherwise fail with an `AssertionError`.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.throws(
       *   () => {
       *     throw new Error('Wrong value');
       *   },
       *   (err) => {
       *     assert(err instanceof Error);
       *     assert(/value/.test(err));
       *     // Avoid returning anything from validation functions besides `true`.
       *     // Otherwise, it's not clear what part of the validation failed. Instead,
       *     // throw an error about the specific validation that failed (as done in this
       *     // example) and add as much helpful debugging information to that error as
       *     // possible.
       *     return true;
       *   },
       *   'unexpected error'
       * );
       * ```
       *
       * `error` cannot be a string. If a string is provided as the second
       * argument, then `error` is assumed to be omitted and the string will be used for`message` instead. This can lead to easy-to-miss mistakes. Using the same
       * message as the thrown error message is going to result in an`ERR_AMBIGUOUS_ARGUMENT` error. Please read the example below carefully if using
       * a string as the second argument gets considered:
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * function throwingFirst() {
       *   throw new Error('First');
       * }
       *
       * function throwingSecond() {
       *   throw new Error('Second');
       * }
       *
       * function notThrowing() {}
       *
       * // The second argument is a string and the input function threw an Error.
       * // The first case will not throw as it does not match for the error message
       * // thrown by the input function!
       * assert.throws(throwingFirst, 'Second');
       * // In the next example the message has no benefit over the message from the
       * // error and since it is not clear if the user intended to actually match
       * // against the error message, Node.js throws an `ERR_AMBIGUOUS_ARGUMENT` error.
       * assert.throws(throwingSecond, 'Second');
       * // TypeError [ERR_AMBIGUOUS_ARGUMENT]
       *
       * // The string is only used (as message) in case the function does not throw:
       * assert.throws(notThrowing, 'Second');
       * // AssertionError [ERR_ASSERTION]: Missing expected exception: Second
       *
       * // If it was intended to match for the error message do this instead:
       * // It does not throw because the error messages match.
       * assert.throws(throwingSecond, /Second$/);
       *
       * // If the error message does not match, an AssertionError is thrown.
       * assert.throws(throwingFirst, /Second$/);
       * // AssertionError [ERR_ASSERTION]
       * ```
       *
       * Due to the confusing error-prone notation, avoid a string as the second
       * argument.
       */
      function throws(block: () => unknown, message?: string | Error): void;
      function throws(block: () => unknown, error: AssertPredicate, message?: string | Error): void;
      /**
       * Asserts that the function `fn` does not throw an error.
       *
       * Using `assert.doesNotThrow()` is actually not useful because there
       * is no benefit in catching an error and then rethrowing it. Instead, consider
       * adding a comment next to the specific code path that should not throw and keep
       * error messages as expressive as possible.
       *
       * When `assert.doesNotThrow()` is called, it will immediately call the `fn`function.
       *
       * If an error is thrown and it is the same type as that specified by the `error`parameter, then an `AssertionError` is thrown. If the error is of a
       * different type, or if the `error` parameter is undefined, the error is
       * propagated back to the caller.
       *
       * If specified, `error` can be a [`Class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),
       * [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) or a validation
       * function. See {@link throws} for more details.
       *
       * The following, for instance, will throw the `TypeError` because there is no
       * matching error type in the assertion:
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.doesNotThrow(
       *   () => {
       *     throw new TypeError('Wrong value');
       *   },
       *   SyntaxError
       * );
       * ```
       *
       * However, the following will result in an `AssertionError` with the message
       * 'Got unwanted exception...':
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.doesNotThrow(
       *   () => {
       *     throw new TypeError('Wrong value');
       *   },
       *   TypeError
       * );
       * ```
       *
       * If an `AssertionError` is thrown and a value is provided for the `message`parameter, the value of `message` will be appended to the `AssertionError` message:
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.doesNotThrow(
       *   () => {
       *     throw new TypeError('Wrong value');
       *   },
       *   /Wrong value/,
       *   'Whoops'
       * );
       * // Throws: AssertionError: Got unwanted exception: Whoops
       * ```
       */
      function doesNotThrow(block: () => unknown, message?: string | Error): void;
      function doesNotThrow(block: () => unknown, error: AssertPredicate, message?: string | Error): void;
      /**
       * Throws `value` if `value` is not `undefined` or `null`. This is useful when
       * testing the `error` argument in callbacks. The stack trace contains all frames
       * from the error passed to `ifError()` including the potential new frames for`ifError()` itself.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.ifError(null);
       * // OK
       * assert.ifError(0);
       * // AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 0
       * assert.ifError('error');
       * // AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 'error'
       * assert.ifError(new Error());
       * // AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error
       *
       * // Create some random error frames.
       * let err;
       * (function errorFrame() {
       *   err = new Error('test error');
       * })();
       *
       * (function ifErrorFrame() {
       *   assert.ifError(err);
       * })();
       * // AssertionError [ERR_ASSERTION]: ifError got unwanted exception: test error
       * //     at ifErrorFrame
       * //     at errorFrame
       * ```
       */
      function ifError(value: unknown): asserts value is null | undefined;
      /**
       * Awaits the `asyncFn` promise or, if `asyncFn` is a function, immediately
       * calls the function and awaits the returned promise to complete. It will then
       * check that the promise is rejected.
       *
       * If `asyncFn` is a function and it throws an error synchronously,`assert.rejects()` will return a rejected `Promise` with that error. If the
       * function does not return a promise, `assert.rejects()` will return a rejected`Promise` with an `ERR_INVALID_RETURN_VALUE` error. In both cases the error
       * handler is skipped.
       *
       * Besides the async nature to await the completion behaves identically to {@link throws}.
       *
       * If specified, `error` can be a [`Class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),
       * [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a validation function,
       * an object where each property will be tested for, or an instance of error where
       * each property will be tested for including the non-enumerable `message` and`name` properties.
       *
       * If specified, `message` will be the message provided by the `AssertionError` if the `asyncFn` fails to reject.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * await assert.rejects(
       *   async () => {
       *     throw new TypeError('Wrong value');
       *   },
       *   {
       *     name: 'TypeError',
       *     message: 'Wrong value'
       *   }
       * );
       * ```
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * await assert.rejects(
       *   async () => {
       *     throw new TypeError('Wrong value');
       *   },
       *   (err) => {
       *     assert.strictEqual(err.name, 'TypeError');
       *     assert.strictEqual(err.message, 'Wrong value');
       *     return true;
       *   }
       * );
       * ```
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.rejects(
       *   Promise.reject(new Error('Wrong value')),
       *   Error
       * ).then(() => {
       *   // ...
       * });
       * ```
       *
       * `error` cannot be a string. If a string is provided as the second
       * argument, then `error` is assumed to be omitted and the string will be used for`message` instead. This can lead to easy-to-miss mistakes. Please read the
       * example in {@link throws} carefully if using a string as the second
       * argument gets considered.
       */
      function rejects(block: (() => Promise<unknown>) | Promise<unknown>, message?: string | Error): Promise<void>;
      function rejects(block: (() => Promise<unknown>) | Promise<unknown>, error: AssertPredicate, message?: string | Error): Promise<void>;
      /**
       * Awaits the `asyncFn` promise or, if `asyncFn` is a function, immediately
       * calls the function and awaits the returned promise to complete. It will then
       * check that the promise is not rejected.
       *
       * If `asyncFn` is a function and it throws an error synchronously,`assert.doesNotReject()` will return a rejected `Promise` with that error. If
       * the function does not return a promise, `assert.doesNotReject()` will return a
       * rejected `Promise` with an `ERR_INVALID_RETURN_VALUE` error. In both cases
       * the error handler is skipped.
       *
       * Using `assert.doesNotReject()` is actually not useful because there is little
       * benefit in catching a rejection and then rejecting it again. Instead, consider
       * adding a comment next to the specific code path that should not reject and keep
       * error messages as expressive as possible.
       *
       * If specified, `error` can be a [`Class`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes),
       * [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) or a validation
       * function. See {@link throws} for more details.
       *
       * Besides the async nature to await the completion behaves identically to {@link doesNotThrow}.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * await assert.doesNotReject(
       *   async () => {
       *     throw new TypeError('Wrong value');
       *   },
       *   SyntaxError
       * );
       * ```
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
       *   .then(() => {
       *     // ...
       *   });
       * ```
       */
      function doesNotReject(block: (() => Promise<unknown>) | Promise<unknown>, message?: string | Error): Promise<void>;
      function doesNotReject(block: (() => Promise<unknown>) | Promise<unknown>, error: AssertPredicate, message?: string | Error): Promise<void>;
      /**
       * Expects the `string` input to match the regular expression.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.match('I will fail', /pass/);
       * // AssertionError [ERR_ASSERTION]: The input did not match the regular ...
       *
       * assert.match(123, /pass/);
       * // AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.
       *
       * assert.match('I will pass', /pass/);
       * // OK
       * ```
       *
       * If the values do not match, or if the `string` argument is of another type than`string`, an `AssertionError` is thrown with a `message` property set equal
       * to the value of the `message` parameter. If the `message` parameter is
       * undefined, a default error message is assigned. If the `message` parameter is an
       * instance of an `Error` then it will be thrown instead of the `AssertionError`.
       */
      function match(value: string, regExp: RegExp, message?: string | Error): void;
      /**
       * Expects the `string` input not to match the regular expression.
       *
       * ```js
       * import assert from 'assert/strict';
       *
       * assert.doesNotMatch('I will fail', /fail/);
       * // AssertionError [ERR_ASSERTION]: The input was expected to not match the ...
       *
       * assert.doesNotMatch(123, /pass/);
       * // AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.
       *
       * assert.doesNotMatch('I will pass', /different/);
       * // OK
       * ```
       *
       * If the values do match, or if the `string` argument is of another type than`string`, an `AssertionError` is thrown with a `message` property set equal
       * to the value of the `message` parameter. If the `message` parameter is
       * undefined, a default error message is assigned. If the `message` parameter is an
       * instance of an `Error` then it will be thrown instead of the `AssertionError`.
       */
      // TODO: this is typed, but not in the browserify polyfill?
      // function doesNotMatch(value: string, regExp: RegExp, message?: string | Error): void;

      const strict: Omit<typeof assert, 'equal' | 'notEqual' | 'deepEqual' | 'notDeepEqual' | 'ok' | 'strictEqual' | 'deepStrictEqual' | 'ifError' | 'strict'> & {
          (value: unknown, message?: string | Error): asserts value;
          equal: typeof strictEqual;
          notEqual: typeof notStrictEqual;
          deepEqual: typeof deepStrictEqual;
          notDeepEqual: typeof notDeepStrictEqual;
          // Mapped types and assertion functions are incompatible?
          // TS2775: Assertions require every name in the call target
          // to be declared with an explicit type annotation.
          ok: typeof ok;
          strictEqual: typeof strictEqual;
          deepStrictEqual: typeof deepStrictEqual;
          ifError: typeof ifError;
          strict: typeof strict;
      };
  }
  export = assert;
}
declare module 'node:assert' {
  import assert = require('assert');
  export = assert;
}

// ./events.d.ts

/**
 * Much of the Node.js core API is built around an idiomatic asynchronous
 * event-driven architecture in which certain kinds of objects (called "emitters")
 * emit named events that cause `Function` objects ("listeners") to be called.
 *
 * For instance: a `net.Server` object emits an event each time a peer
 * connects to it; a `fs.ReadStream` emits an event when the file is opened;
 * a `stream` emits an event whenever data is available to be read.
 *
 * All objects that emit events are instances of the `EventEmitter` class. These
 * objects expose an `eventEmitter.on()` function that allows one or more
 * functions to be attached to named events emitted by the object. Typically,
 * event names are camel-cased strings but any valid JavaScript property key
 * can be used.
 *
 * When the `EventEmitter` object emits an event, all of the functions attached
 * to that specific event are called _synchronously_. Any values returned by the
 * called listeners are _ignored_ and discarded.
 *
 * The following example shows a simple `EventEmitter` instance with a single
 * listener. The `eventEmitter.on()` method is used to register listeners, while
 * the `eventEmitter.emit()` method is used to trigger the event.
 *
 * ```js
 * const EventEmitter = require('events');
 *
 * class MyEmitter extends EventEmitter {}
 *
 * const myEmitter = new MyEmitter();
 * myEmitter.on('event', () => {
 *   console.log('an event occurred!');
 * });
 * myEmitter.emit('event');
 * ```
 * @see [source](https://github.com/nodejs/node/blob/v18.0.0/lib/events.js)
 */
 declare module 'events' {
  interface EventEmitterOptions {
      /**
       * Enables automatic capturing of promise rejection.
       */
      captureRejections?: boolean | undefined;
  }
  interface NodeEventTarget {
      once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  }
  interface DOMEventTarget {
      addEventListener(
          eventName: string,
          listener: (...args: any[]) => void,
          opts?: {
              once: boolean;
          }
      ): any;
  }
  interface StaticEventEmitterOptions {
      signal?: AbortSignal | undefined;
  }
  interface EventEmitter {
      /**
       * Alias for `emitter.on(eventName, listener)`.
       */
      addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Adds the `listener` function to the end of the listeners array for the
       * event named `eventName`. No checks are made to see if the `listener` has
       * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
       * times.
       *
       * ```js
       * server.on('connection', (stream) => {
       *   console.log('someone connected!');
       * });
       * ```
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       *
       * By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
       * event listener to the beginning of the listeners array.
       *
       * ```js
       * const myEE = new EventEmitter();
       * myEE.on('foo', () => console.log('a'));
       * myEE.prependListener('foo', () => console.log('b'));
       * myEE.emit('foo');
       * // Prints:
       * //   b
       * //   a
       * ```
       * @param eventName The name of the event.
       * @param listener The callback function
       */
      on(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Adds a **one-time**`listener` function for the event named `eventName`. The
       * next time `eventName` is triggered, this listener is removed and then invoked.
       *
       * ```js
       * server.once('connection', (stream) => {
       *   console.log('Ah, we have our first user!');
       * });
       * ```
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       *
       * By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
       * event listener to the beginning of the listeners array.
       *
       * ```js
       * const myEE = new EventEmitter();
       * myEE.once('foo', () => console.log('a'));
       * myEE.prependOnceListener('foo', () => console.log('b'));
       * myEE.emit('foo');
       * // Prints:
       * //   b
       * //   a
       * ```
       * @param eventName The name of the event.
       * @param listener The callback function
       */
      once(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Removes the specified `listener` from the listener array for the event named`eventName`.
       *
       * ```js
       * const callback = (stream) => {
       *   console.log('someone connected!');
       * };
       * server.on('connection', callback);
       * // ...
       * server.removeListener('connection', callback);
       * ```
       *
       * `removeListener()` will remove, at most, one instance of a listener from the
       * listener array. If any single listener has been added multiple times to the
       * listener array for the specified `eventName`, then `removeListener()` must be
       * called multiple times to remove each instance.
       *
       * Once an event is emitted, all listeners attached to it at the
       * time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
       * not remove them from`emit()` in progress. Subsequent events behave as expected.
       *
       * ```js
       * const myEmitter = new MyEmitter();
       *
       * const callbackA = () => {
       *   console.log('A');
       *   myEmitter.removeListener('event', callbackB);
       * };
       *
       * const callbackB = () => {
       *   console.log('B');
       * };
       *
       * myEmitter.on('event', callbackA);
       *
       * myEmitter.on('event', callbackB);
       *
       * // callbackA removes listener callbackB but it will still be called.
       * // Internal listener array at time of emit [callbackA, callbackB]
       * myEmitter.emit('event');
       * // Prints:
       * //   A
       * //   B
       *
       * // callbackB is now removed.
       * // Internal listener array [callbackA]
       * myEmitter.emit('event');
       * // Prints:
       * //   A
       * ```
       *
       * Because listeners are managed using an internal array, calling this will
       * change the position indices of any listener registered _after_ the listener
       * being removed. This will not impact the order in which listeners are called,
       * but it means that any copies of the listener array as returned by
       * the `emitter.listeners()` method will need to be recreated.
       *
       * When a single function has been added as a handler multiple times for a single
       * event (as in the example below), `removeListener()` will remove the most
       * recently added instance. In the example the `once('ping')`listener is removed:
       *
       * ```js
       * const ee = new EventEmitter();
       *
       * function pong() {
       *   console.log('pong');
       * }
       *
       * ee.on('ping', pong);
       * ee.once('ping', pong);
       * ee.removeListener('ping', pong);
       *
       * ee.emit('ping');
       * ee.emit('ping');
       * ```
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       */
      removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Alias for `emitter.removeListener()`.
       */
      off(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Removes all listeners, or those of the specified `eventName`.
       *
       * It is bad practice to remove listeners added elsewhere in the code,
       * particularly when the `EventEmitter` instance was created by some other
       * component or module (e.g. sockets or file streams).
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       */
      removeAllListeners(event?: string | symbol): this;
      /**
       * By default `EventEmitter`s will print a warning if more than `10` listeners are
       * added for a particular event. This is a useful default that helps finding
       * memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
       * modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       */
      setMaxListeners(n: number): this;
      /**
       * Returns the current max listener value for the `EventEmitter` which is either
       * set by `emitter.setMaxListeners(n)` or defaults to {@link defaultMaxListeners}.
       */
      getMaxListeners(): number;
      /**
       * Returns a copy of the array of listeners for the event named `eventName`.
       *
       * ```js
       * server.on('connection', (stream) => {
       *   console.log('someone connected!');
       * });
       * console.log(util.inspect(server.listeners('connection')));
       * // Prints: [ [Function] ]
       * ```
       */
      listeners(eventName: string | symbol): Function[];
      /**
       * Returns a copy of the array of listeners for the event named `eventName`,
       * including any wrappers (such as those created by `.once()`).
       *
       * ```js
       * const emitter = new EventEmitter();
       * emitter.once('log', () => console.log('log once'));
       *
       * // Returns a new Array with a function `onceWrapper` which has a property
       * // `listener` which contains the original listener bound above
       * const listeners = emitter.rawListeners('log');
       * const logFnWrapper = listeners[0];
       *
       * // Logs "log once" to the console and does not unbind the `once` event
       * logFnWrapper.listener();
       *
       * // Logs "log once" to the console and removes the listener
       * logFnWrapper();
       *
       * emitter.on('log', () => console.log('log persistently'));
       * // Will return a new Array with a single function bound by `.on()` above
       * const newListeners = emitter.rawListeners('log');
       *
       * // Logs "log persistently" twice
       * newListeners[0]();
       * emitter.emit('log');
       * ```
       */
      rawListeners(eventName: string | symbol): Function[];
      /**
       * Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
       * to each.
       *
       * Returns `true` if the event had listeners, `false` otherwise.
       *
       * ```js
       * const EventEmitter = require('events');
       * const myEmitter = new EventEmitter();
       *
       * // First listener
       * myEmitter.on('event', function firstListener() {
       *   console.log('Helloooo! first listener');
       * });
       * // Second listener
       * myEmitter.on('event', function secondListener(arg1, arg2) {
       *   console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
       * });
       * // Third listener
       * myEmitter.on('event', function thirdListener(...args) {
       *   const parameters = args.join(', ');
       *   console.log(`event with parameters ${parameters} in third listener`);
       * });
       *
       * console.log(myEmitter.listeners('event'));
       *
       * myEmitter.emit('event', 1, 2, 3, 4, 5);
       *
       * // Prints:
       * // [
       * //   [Function: firstListener],
       * //   [Function: secondListener],
       * //   [Function: thirdListener]
       * // ]
       * // Helloooo! first listener
       * // event with parameters 1, 2 in second listener
       * // event with parameters 1, 2, 3, 4, 5 in third listener
       * ```
       */
      emit(eventName: string | symbol, ...args: any[]): boolean;
      /**
       * Returns the number of listeners listening to the event named `eventName`.
       * @param eventName The name of the event being listened for
       */
      listenerCount(eventName: string | symbol): number;
      /**
       * Adds the `listener` function to the _beginning_ of the listeners array for the
       * event named `eventName`. No checks are made to see if the `listener` has
       * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
       * times.
       *
       * ```js
       * server.prependListener('connection', (stream) => {
       *   console.log('someone connected!');
       * });
       * ```
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       * @param eventName The name of the event.
       * @param listener The callback function
       */
      prependListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
       * listener is removed, and then invoked.
       *
       * ```js
       * server.prependOnceListener('connection', (stream) => {
       *   console.log('Ah, we have our first user!');
       * });
       * ```
       *
       * Returns a reference to the `EventEmitter`, so that calls can be chained.
       * @param eventName The name of the event.
       * @param listener The callback function
       */
      prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
      /**
       * Returns an array listing the events for which the emitter has registered
       * listeners. The values in the array are strings or `Symbol`s.
       *
       * ```js
       * const EventEmitter = require('events');
       * const myEE = new EventEmitter();
       * myEE.on('foo', () => {});
       * myEE.on('bar', () => {});
       *
       * const sym = Symbol('symbol');
       * myEE.on(sym, () => {});
       *
       * console.log(myEE.eventNames());
       * // Prints: [ 'foo', 'bar', Symbol(symbol) ]
       * ```
       */
      eventNames(): Array<string | symbol>;
  }
  /**
   * The `EventEmitter` class is defined and exposed by the `events` module:
   *
   * ```js
   * const EventEmitter = require('events');
   * ```
   *
   * All `EventEmitter`s emit the event `'newListener'` when new listeners are
   * added and `'removeListener'` when existing listeners are removed.
   *
   * It supports the following option:
   */
  class EventEmitter {
      constructor(options?: EventEmitterOptions);
      /**
       * Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
       * event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
       * The `Promise` will resolve with an array of all the arguments emitted to the
       * given event.
       *
       * This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
       * semantics and does not listen to the `'error'` event.
       *
       * ```js
       * const { once, EventEmitter } = require('events');
       *
       * async function run() {
       *   const ee = new EventEmitter();
       *
       *   process.nextTick(() => {
       *     ee.emit('myevent', 42);
       *   });
       *
       *   const [value] = await once(ee, 'myevent');
       *   console.log(value);
       *
       *   const err = new Error('kaboom');
       *   process.nextTick(() => {
       *     ee.emit('error', err);
       *   });
       *
       *   try {
       *     await once(ee, 'myevent');
       *   } catch (err) {
       *     console.log('error happened', err);
       *   }
       * }
       *
       * run();
       * ```
       *
       * The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
       * '`error'` event itself, then it is treated as any other kind of event without
       * special handling:
       *
       * ```js
       * const { EventEmitter, once } = require('events');
       *
       * const ee = new EventEmitter();
       *
       * once(ee, 'error')
       *   .then(([err]) => console.log('ok', err.message))
       *   .catch((err) => console.log('error', err.message));
       *
       * ee.emit('error', new Error('boom'));
       *
       * // Prints: ok boom
       * ```
       *
       * An `AbortSignal` can be used to cancel waiting for the event:
       *
       * ```js
       * const { EventEmitter, once } = require('events');
       *
       * const ee = new EventEmitter();
       * const ac = new AbortController();
       *
       * async function foo(emitter, event, signal) {
       *   try {
       *     await once(emitter, event, { signal });
       *     console.log('event emitted!');
       *   } catch (error) {
       *     if (error.name === 'AbortError') {
       *       console.error('Waiting for the event was canceled!');
       *     } else {
       *       console.error('There was an error', error.message);
       *     }
       *   }
       * }
       *
       * foo(ee, 'foo', ac.signal);
       * ac.abort(); // Abort waiting for the event
       * ee.emit('foo'); // Prints: Waiting for the event was canceled!
       * ```
       */
      static once(emitter: NodeEventTarget, eventName: string | symbol, options?: StaticEventEmitterOptions): Promise<any[]>;
      static once(emitter: DOMEventTarget, eventName: string, options?: StaticEventEmitterOptions): Promise<any[]>;
      /**
       * ```js
       * const { on, EventEmitter } = require('events');
       *
       * (async () => {
       *   const ee = new EventEmitter();
       *
       *   // Emit later on
       *   process.nextTick(() => {
       *     ee.emit('foo', 'bar');
       *     ee.emit('foo', 42);
       *   });
       *
       *   for await (const event of on(ee, 'foo')) {
       *     // The execution of this inner block is synchronous and it
       *     // processes one event at a time (even with await). Do not use
       *     // if concurrent execution is required.
       *     console.log(event); // prints ['bar'] [42]
       *   }
       *   // Unreachable here
       * })();
       * ```
       *
       * Returns an `AsyncIterator` that iterates `eventName` events. It will throw
       * if the `EventEmitter` emits `'error'`. It removes all listeners when
       * exiting the loop. The `value` returned by each iteration is an array
       * composed of the emitted event arguments.
       *
       * An `AbortSignal` can be used to cancel waiting on events:
       *
       * ```js
       * const { on, EventEmitter } = require('events');
       * const ac = new AbortController();
       *
       * (async () => {
       *   const ee = new EventEmitter();
       *
       *   // Emit later on
       *   process.nextTick(() => {
       *     ee.emit('foo', 'bar');
       *     ee.emit('foo', 42);
       *   });
       *
       *   for await (const event of on(ee, 'foo', { signal: ac.signal })) {
       *     // The execution of this inner block is synchronous and it
       *     // processes one event at a time (even with await). Do not use
       *     // if concurrent execution is required.
       *     console.log(event); // prints ['bar'] [42]
       *   }
       *   // Unreachable here
       * })();
       *
       * process.nextTick(() => ac.abort());
       * ```
       * @param eventName The name of the event being listened for
       * @return that iterates `eventName` events emitted by the `emitter`
       */
      static on(emitter: EventEmitter, eventName: string, options?: StaticEventEmitterOptions): AsyncIterableIterator<any>;
      /**
       * A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.
       *
       * ```js
       * const { EventEmitter, listenerCount } = require('events');
       * const myEmitter = new EventEmitter();
       * myEmitter.on('event', () => {});
       * myEmitter.on('event', () => {});
       * console.log(listenerCount(myEmitter, 'event'));
       * // Prints: 2
       * ```
       * @deprecated Since v3.2.0 - Use `listenerCount` instead.
       * @param emitter The emitter to query
       * @param eventName The event name
       */
      static listenerCount(emitter: EventEmitter, eventName: string | symbol): number;
      /**
       * Returns a copy of the array of listeners for the event named `eventName`.
       *
       * For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
       * the emitter.
       *
       * For `EventTarget`s this is the only way to get the event listeners for the
       * event target. This is useful for debugging and diagnostic purposes.
       *
       * ```js
       * const { getEventListeners, EventEmitter } = require('events');
       *
       * {
       *   const ee = new EventEmitter();
       *   const listener = () => console.log('Events are fun');
       *   ee.on('foo', listener);
       *   getEventListeners(ee, 'foo'); // [listener]
       * }
       * {
       *   const et = new EventTarget();
       *   const listener = () => console.log('Events are fun');
       *   et.addEventListener('foo', listener);
       *   getEventListeners(et, 'foo'); // [listener]
       * }
       * ```
       */
      static getEventListeners(emitter: DOMEventTarget | EventEmitter, name: string | symbol): Function[];
      /**
       * ```js
       * const {
       *   setMaxListeners,
       *   EventEmitter
       * } = require('events');
       *
       * const target = new EventTarget();
       * const emitter = new EventEmitter();
       *
       * setMaxListeners(5, target, emitter);
       * ```
       * @param n A non-negative number. The maximum number of listeners per `EventTarget` event.
       * @param eventsTargets Zero or more {EventTarget} or {EventEmitter} instances. If none are specified, `n` is set as the default max for all newly created {EventTarget} and {EventEmitter}
       * objects.
       */
      static setMaxListeners(n?: number, ...eventTargets: Array<DOMEventTarget | EventEmitter>): void;
      /**
       * This symbol shall be used to install a listener for only monitoring `'error'`
       * events. Listeners installed using this symbol are called before the regular
       * `'error'` listeners are called.
       *
       * Installing a listener using this symbol does not change the behavior once an
       * `'error'` event is emitted, therefore the process will still crash if no
       * regular `'error'` listener is installed.
       */
      static readonly errorMonitor: unique symbol;
      static readonly captureRejectionSymbol: unique symbol;
      /**
       * Sets or gets the default captureRejection value for all emitters.
       */
      static captureRejections: boolean;
      static defaultMaxListeners: number;
  }
  import internal = require('node:events');
  namespace EventEmitter {
      // Should just be `export { EventEmitter }`, but that doesn't work in TypeScript 3.4
      export { internal as EventEmitter };
      export interface Abortable {
          /**
           * When provided the corresponding `AbortController` can be used to cancel an asynchronous action.
           */
          signal?: AbortSignal | undefined;
      }
  }
  export = EventEmitter;
}
declare module 'node:events' {
  import events = require('events');
  export = events;
}
