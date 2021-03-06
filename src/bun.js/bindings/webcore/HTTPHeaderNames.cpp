/* C++ code produced by gperf version 3.0.3 */
/* Command-line: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/gperf --key-positions='*' -D -n -s 2 --output-file=HTTPHeaderNames.cpp HTTPHeaderNames.gperf  */

#if !((' ' == 32) && ('!' == 33) && ('"' == 34) && ('#' == 35) \
      && ('%' == 37) && ('&' == 38) && ('\'' == 39) && ('(' == 40) \
      && (')' == 41) && ('*' == 42) && ('+' == 43) && (',' == 44) \
      && ('-' == 45) && ('.' == 46) && ('/' == 47) && ('0' == 48) \
      && ('1' == 49) && ('2' == 50) && ('3' == 51) && ('4' == 52) \
      && ('5' == 53) && ('6' == 54) && ('7' == 55) && ('8' == 56) \
      && ('9' == 57) && (':' == 58) && (';' == 59) && ('<' == 60) \
      && ('=' == 61) && ('>' == 62) && ('?' == 63) && ('A' == 65) \
      && ('B' == 66) && ('C' == 67) && ('D' == 68) && ('E' == 69) \
      && ('F' == 70) && ('G' == 71) && ('H' == 72) && ('I' == 73) \
      && ('J' == 74) && ('K' == 75) && ('L' == 76) && ('M' == 77) \
      && ('N' == 78) && ('O' == 79) && ('P' == 80) && ('Q' == 81) \
      && ('R' == 82) && ('S' == 83) && ('T' == 84) && ('U' == 85) \
      && ('V' == 86) && ('W' == 87) && ('X' == 88) && ('Y' == 89) \
      && ('Z' == 90) && ('[' == 91) && ('\\' == 92) && (']' == 93) \
      && ('^' == 94) && ('_' == 95) && ('a' == 97) && ('b' == 98) \
      && ('c' == 99) && ('d' == 100) && ('e' == 101) && ('f' == 102) \
      && ('g' == 103) && ('h' == 104) && ('i' == 105) && ('j' == 106) \
      && ('k' == 107) && ('l' == 108) && ('m' == 109) && ('n' == 110) \
      && ('o' == 111) && ('p' == 112) && ('q' == 113) && ('r' == 114) \
      && ('s' == 115) && ('t' == 116) && ('u' == 117) && ('v' == 118) \
      && ('w' == 119) && ('x' == 120) && ('y' == 121) && ('z' == 122) \
      && ('{' == 123) && ('|' == 124) && ('}' == 125) && ('~' == 126))
/* The character set is not based on ISO-646.  */
#error "gperf generated tables don't work with this execution character set. Please report a bug to <bug-gnu-gperf@gnu.org>."
#endif

#line 2 "HTTPHeaderNames.gperf"

/*
 * Copyright (C) 2014 Apple Inc. All rights reserved.
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
 */

/// This file is generated by create-http-header-name-table, do not edit.

#include "config.h"
#include "HTTPHeaderNames.h"

#include <wtf/text/StringView.h>

IGNORE_WARNINGS_BEGIN("implicit-fallthrough")

// Older versions of gperf like to use the `register` keyword.
#define register

namespace WebCore {

static const struct HeaderNameString {
    const char* const name;
    unsigned length;
} headerNameStrings[] = {
    { "Accept", 6 },
    { "Accept-Charset", 14 },
    { "Accept-Encoding", 15 },
    { "Accept-Language", 15 },
    { "Accept-Ranges", 13 },
    { "Access-Control-Allow-Credentials", 32 },
    { "Access-Control-Allow-Headers", 28 },
    { "Access-Control-Allow-Methods", 28 },
    { "Access-Control-Allow-Origin", 27 },
    { "Access-Control-Expose-Headers", 29 },
    { "Access-Control-Max-Age", 22 },
    { "Access-Control-Request-Headers", 30 },
    { "Access-Control-Request-Method", 29 },
    { "Age", 3 },
    { "Authorization", 13 },
    { "Cache-Control", 13 },
    { "Connection", 10 },
    { "Content-Disposition", 19 },
    { "Content-Encoding", 16 },
    { "Content-Language", 16 },
    { "Content-Length", 14 },
    { "Content-Location", 16 },
    { "Content-Range", 13 },
    { "Content-Security-Policy", 23 },
    { "Content-Security-Policy-Report-Only", 35 },
    { "Content-Type", 12 },
    { "Cookie", 6 },
    { "Cookie2", 7 },
    { "Cross-Origin-Embedder-Policy", 28 },
    { "Cross-Origin-Embedder-Policy-Report-Only", 40 },
    { "Cross-Origin-Opener-Policy", 26 },
    { "Cross-Origin-Opener-Policy-Report-Only", 38 },
    { "Cross-Origin-Resource-Policy", 28 },
    { "DNT", 3 },
    { "Date", 4 },
    { "Default-Style", 13 },
    { "ETag", 4 },
    { "Expect", 6 },
    { "Expires", 7 },
    { "Host", 4 },
    { "Icy-MetaInt", 11 },
    { "Icy-Metadata", 12 },
    { "If-Match", 8 },
    { "If-Modified-Since", 17 },
    { "If-None-Match", 13 },
    { "If-Range", 8 },
    { "If-Unmodified-Since", 19 },
    { "Keep-Alive", 10 },
    { "Last-Event-ID", 13 },
    { "Last-Modified", 13 },
    { "Link", 4 },
    { "Location", 8 },
    { "Origin", 6 },
    { "Ping-From", 9 },
    { "Ping-To", 7 },
    { "Pragma", 6 },
    { "Proxy-Authorization", 19 },
    { "Purpose", 7 },
    { "Range", 5 },
    { "Referer", 7 },
    { "Referrer-Policy", 15 },
    { "Refresh", 7 },
    { "Report-To", 9 },
    { "Sec-Fetch-Dest", 14 },
    { "Sec-Fetch-Mode", 14 },
    { "Sec-WebSocket-Accept", 20 },
    { "Sec-WebSocket-Extensions", 24 },
    { "Sec-WebSocket-Key", 17 },
    { "Sec-WebSocket-Protocol", 22 },
    { "Sec-WebSocket-Version", 21 },
    { "Server-Timing", 13 },
    { "Service-Worker", 14 },
    { "Service-Worker-Allowed", 22 },
    { "Service-Worker-Navigation-Preload", 33 },
    { "Set-Cookie", 10 },
    { "Set-Cookie2", 11 },
    { "SourceMap", 9 },
    { "TE", 2 },
    { "Timing-Allow-Origin", 19 },
    { "Trailer", 7 },
    { "Transfer-Encoding", 17 },
    { "Upgrade", 7 },
    { "Upgrade-Insecure-Requests", 25 },
    { "User-Agent", 10 },
    { "Vary", 4 },
    { "Via", 3 },
    { "X-Content-Type-Options", 22 },
    { "X-DNS-Prefetch-Control", 22 },
    { "X-Frame-Options", 15 },
    { "X-SourceMap", 11 },
    { "X-Temp-Tablet", 13 },
    { "X-XSS-Protection", 16 },
};


#line 149 "HTTPHeaderNames.gperf"
struct HeaderNameHashEntry {
    const char* name;
    HTTPHeaderName headerName;
};
enum
  {
    TOTAL_KEYWORDS = 92,
    MIN_WORD_LENGTH = 2,
    MAX_WORD_LENGTH = 40,
    MIN_HASH_VALUE = 5,
    MAX_HASH_VALUE = 815
  };

/* maximum key range = 811, duplicates = 0 */

#ifndef GPERF_DOWNCASE
#define GPERF_DOWNCASE 1
static unsigned char gperf_downcase[256] =
  {
      0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,  13,  14,
     15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,
     30,  31,  32,  33,  34,  35,  36,  37,  38,  39,  40,  41,  42,  43,  44,
     45,  46,  47,  48,  49,  50,  51,  52,  53,  54,  55,  56,  57,  58,  59,
     60,  61,  62,  63,  64,  97,  98,  99, 100, 101, 102, 103, 104, 105, 106,
    107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121,
    122,  91,  92,  93,  94,  95,  96,  97,  98,  99, 100, 101, 102, 103, 104,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134,
    135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149,
    150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164,
    165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179,
    180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194,
    195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209,
    210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224,
    225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239,
    240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254,
    255
  };
#endif

#ifndef GPERF_CASE_STRNCMP
#define GPERF_CASE_STRNCMP 1
static int
gperf_case_strncmp (register const char *s1, register const char *s2, register unsigned int n)
{
  for (; n > 0;)
    {
      unsigned char c1 = gperf_downcase[(unsigned char)*s1++];
      unsigned char c2 = gperf_downcase[(unsigned char)*s2++];
      if (c1 != 0 && c1 == c2)
        {
          n--;
          continue;
        }
      return (int)c1 - (int)c2;
    }
  return 0;
}
#endif

class HTTPHeaderNamesHash
{
private:
  static inline unsigned int header_name_hash_function (const char *str, unsigned int len);
public:
  static const struct HeaderNameHashEntry *findHeaderNameImpl (const char *str, unsigned int len);
};

inline unsigned int
HTTPHeaderNamesHash::header_name_hash_function (register const char *str, register unsigned int len)
{
  static const unsigned short asso_values[] =
    {
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816,   0, 816, 816, 816, 816,
        5, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816,   0,  40,   0, 115,   0,
      120,  10, 155,   5, 816,   4,  45, 155,   5,   0,
       30,   0,   5,  60,   5,   5, 135,  55,  50,  15,
       60, 816, 816, 816, 816, 816, 816,   0,  40,   0,
      115,   0, 120,  10, 155,   5, 816,   4,  45, 155,
        5,   0,  30,   0,   5,  60,   5,   5, 135,  55,
       50,  15,  60, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816, 816, 816, 816, 816,
      816, 816, 816, 816, 816, 816
    };
  register unsigned int hval = 0;

  switch (len)
    {
      default:
        hval += asso_values[(unsigned char)str[39]];
      /*FALLTHROUGH*/
      case 39:
        hval += asso_values[(unsigned char)str[38]];
      /*FALLTHROUGH*/
      case 38:
        hval += asso_values[(unsigned char)str[37]];
      /*FALLTHROUGH*/
      case 37:
        hval += asso_values[(unsigned char)str[36]];
      /*FALLTHROUGH*/
      case 36:
        hval += asso_values[(unsigned char)str[35]];
      /*FALLTHROUGH*/
      case 35:
        hval += asso_values[(unsigned char)str[34]];
      /*FALLTHROUGH*/
      case 34:
        hval += asso_values[(unsigned char)str[33]];
      /*FALLTHROUGH*/
      case 33:
        hval += asso_values[(unsigned char)str[32]];
      /*FALLTHROUGH*/
      case 32:
        hval += asso_values[(unsigned char)str[31]];
      /*FALLTHROUGH*/
      case 31:
        hval += asso_values[(unsigned char)str[30]];
      /*FALLTHROUGH*/
      case 30:
        hval += asso_values[(unsigned char)str[29]];
      /*FALLTHROUGH*/
      case 29:
        hval += asso_values[(unsigned char)str[28]];
      /*FALLTHROUGH*/
      case 28:
        hval += asso_values[(unsigned char)str[27]];
      /*FALLTHROUGH*/
      case 27:
        hval += asso_values[(unsigned char)str[26]];
      /*FALLTHROUGH*/
      case 26:
        hval += asso_values[(unsigned char)str[25]];
      /*FALLTHROUGH*/
      case 25:
        hval += asso_values[(unsigned char)str[24]];
      /*FALLTHROUGH*/
      case 24:
        hval += asso_values[(unsigned char)str[23]];
      /*FALLTHROUGH*/
      case 23:
        hval += asso_values[(unsigned char)str[22]];
      /*FALLTHROUGH*/
      case 22:
        hval += asso_values[(unsigned char)str[21]];
      /*FALLTHROUGH*/
      case 21:
        hval += asso_values[(unsigned char)str[20]];
      /*FALLTHROUGH*/
      case 20:
        hval += asso_values[(unsigned char)str[19]];
      /*FALLTHROUGH*/
      case 19:
        hval += asso_values[(unsigned char)str[18]];
      /*FALLTHROUGH*/
      case 18:
        hval += asso_values[(unsigned char)str[17]];
      /*FALLTHROUGH*/
      case 17:
        hval += asso_values[(unsigned char)str[16]];
      /*FALLTHROUGH*/
      case 16:
        hval += asso_values[(unsigned char)str[15]];
      /*FALLTHROUGH*/
      case 15:
        hval += asso_values[(unsigned char)str[14]];
      /*FALLTHROUGH*/
      case 14:
        hval += asso_values[(unsigned char)str[13]];
      /*FALLTHROUGH*/
      case 13:
        hval += asso_values[(unsigned char)str[12]];
      /*FALLTHROUGH*/
      case 12:
        hval += asso_values[(unsigned char)str[11]];
      /*FALLTHROUGH*/
      case 11:
        hval += asso_values[(unsigned char)str[10]];
      /*FALLTHROUGH*/
      case 10:
        hval += asso_values[(unsigned char)str[9]];
      /*FALLTHROUGH*/
      case 9:
        hval += asso_values[(unsigned char)str[8]];
      /*FALLTHROUGH*/
      case 8:
        hval += asso_values[(unsigned char)str[7]];
      /*FALLTHROUGH*/
      case 7:
        hval += asso_values[(unsigned char)str[6]];
      /*FALLTHROUGH*/
      case 6:
        hval += asso_values[(unsigned char)str[5]];
      /*FALLTHROUGH*/
      case 5:
        hval += asso_values[(unsigned char)str[4]];
      /*FALLTHROUGH*/
      case 4:
        hval += asso_values[(unsigned char)str[3]];
      /*FALLTHROUGH*/
      case 3:
        hval += asso_values[(unsigned char)str[2]];
      /*FALLTHROUGH*/
      case 2:
        hval += asso_values[(unsigned char)str[1]];
      /*FALLTHROUGH*/
      case 1:
        hval += asso_values[(unsigned char)str[0]];
        break;
    }
  return hval;
}

static const struct HeaderNameHashEntry header_name_wordlist[] =
  {
#line 236 "HTTPHeaderNames.gperf"
    {"TE", HTTPHeaderName::TE},
#line 185 "HTTPHeaderNames.gperf"
    {"Cookie", HTTPHeaderName::Cookie},
#line 172 "HTTPHeaderNames.gperf"
    {"Age", HTTPHeaderName::Age},
#line 186 "HTTPHeaderNames.gperf"
    {"Cookie2", HTTPHeaderName::Cookie2},
#line 195 "HTTPHeaderNames.gperf"
    {"ETag", HTTPHeaderName::ETag},
#line 217 "HTTPHeaderNames.gperf"
    {"Range", HTTPHeaderName::Range},
#line 175 "HTTPHeaderNames.gperf"
    {"Connection", HTTPHeaderName::Connection},
#line 211 "HTTPHeaderNames.gperf"
    {"Origin", HTTPHeaderName::Origin},
#line 159 "HTTPHeaderNames.gperf"
    {"Accept", HTTPHeaderName::Accept},
#line 181 "HTTPHeaderNames.gperf"
    {"Content-Range", HTTPHeaderName::ContentRange},
#line 221 "HTTPHeaderNames.gperf"
    {"Report-To", HTTPHeaderName::ReportTo},
#line 213 "HTTPHeaderNames.gperf"
    {"Ping-To", HTTPHeaderName::PingTo},
#line 209 "HTTPHeaderNames.gperf"
    {"Link", HTTPHeaderName::Link},
#line 210 "HTTPHeaderNames.gperf"
    {"Location", HTTPHeaderName::Location},
#line 238 "HTTPHeaderNames.gperf"
    {"Trailer", HTTPHeaderName::Trailer},
#line 184 "HTTPHeaderNames.gperf"
    {"Content-Type", HTTPHeaderName::ContentType},
#line 233 "HTTPHeaderNames.gperf"
    {"Set-Cookie", HTTPHeaderName::SetCookie},
#line 234 "HTTPHeaderNames.gperf"
    {"Set-Cookie2", HTTPHeaderName::SetCookie2},
#line 180 "HTTPHeaderNames.gperf"
    {"Content-Location", HTTPHeaderName::ContentLocation},
#line 196 "HTTPHeaderNames.gperf"
    {"Expect", HTTPHeaderName::Expect},
#line 242 "HTTPHeaderNames.gperf"
    {"User-Agent", HTTPHeaderName::UserAgent},
#line 178 "HTTPHeaderNames.gperf"
    {"Content-Language", HTTPHeaderName::ContentLanguage},
#line 162 "HTTPHeaderNames.gperf"
    {"Accept-Language", HTTPHeaderName::AcceptLanguage},
#line 163 "HTTPHeaderNames.gperf"
    {"Accept-Ranges", HTTPHeaderName::AcceptRanges},
#line 193 "HTTPHeaderNames.gperf"
    {"Date", HTTPHeaderName::Date},
#line 192 "HTTPHeaderNames.gperf"
    {"DNT", HTTPHeaderName::DNT},
#line 216 "HTTPHeaderNames.gperf"
    {"Purpose", HTTPHeaderName::Purpose},
#line 218 "HTTPHeaderNames.gperf"
    {"Referer", HTTPHeaderName::Referer},
#line 244 "HTTPHeaderNames.gperf"
    {"Via", HTTPHeaderName::Via},
#line 204 "HTTPHeaderNames.gperf"
    {"If-Range", HTTPHeaderName::IfRange},
#line 197 "HTTPHeaderNames.gperf"
    {"Expires", HTTPHeaderName::Expires},
#line 243 "HTTPHeaderNames.gperf"
    {"Vary", HTTPHeaderName::Vary},
#line 177 "HTTPHeaderNames.gperf"
    {"Content-Encoding", HTTPHeaderName::ContentEncoding},
#line 240 "HTTPHeaderNames.gperf"
    {"Upgrade", HTTPHeaderName::Upgrade},
#line 161 "HTTPHeaderNames.gperf"
    {"Accept-Encoding", HTTPHeaderName::AcceptEncoding},
#line 199 "HTTPHeaderNames.gperf"
    {"Icy-MetaInt", HTTPHeaderName::IcyMetaInt},
#line 214 "HTTPHeaderNames.gperf"
    {"Pragma", HTTPHeaderName::Pragma},
#line 182 "HTTPHeaderNames.gperf"
    {"Content-Security-Policy", HTTPHeaderName::ContentSecurityPolicy},
#line 174 "HTTPHeaderNames.gperf"
    {"Cache-Control", HTTPHeaderName::CacheControl},
#line 206 "HTTPHeaderNames.gperf"
    {"Keep-Alive", HTTPHeaderName::KeepAlive},
#line 198 "HTTPHeaderNames.gperf"
    {"Host", HTTPHeaderName::Host},
#line 245 "HTTPHeaderNames.gperf"
    {"X-Content-Type-Options", HTTPHeaderName::XContentTypeOptions},
#line 219 "HTTPHeaderNames.gperf"
    {"Referrer-Policy", HTTPHeaderName::ReferrerPolicy},
#line 179 "HTTPHeaderNames.gperf"
    {"Content-Length", HTTPHeaderName::ContentLength},
#line 226 "HTTPHeaderNames.gperf"
    {"Sec-WebSocket-Key", HTTPHeaderName::SecWebSocketKey},
#line 173 "HTTPHeaderNames.gperf"
    {"Authorization", HTTPHeaderName::Authorization},
#line 235 "HTTPHeaderNames.gperf"
    {"SourceMap", HTTPHeaderName::SourceMap},
#line 224 "HTTPHeaderNames.gperf"
    {"Sec-WebSocket-Accept", HTTPHeaderName::SecWebSocketAccept},
#line 160 "HTTPHeaderNames.gperf"
    {"Accept-Charset", HTTPHeaderName::AcceptCharset},
#line 230 "HTTPHeaderNames.gperf"
    {"Service-Worker", HTTPHeaderName::ServiceWorker},
#line 250 "HTTPHeaderNames.gperf"
    {"X-XSS-Protection", HTTPHeaderName::XXSSProtection},
#line 189 "HTTPHeaderNames.gperf"
    {"Cross-Origin-Opener-Policy", HTTPHeaderName::CrossOriginOpenerPolicy},
#line 200 "HTTPHeaderNames.gperf"
    {"Icy-Metadata", HTTPHeaderName::IcyMetadata},
#line 248 "HTTPHeaderNames.gperf"
    {"X-SourceMap", HTTPHeaderName::XSourceMap},
#line 227 "HTTPHeaderNames.gperf"
    {"Sec-WebSocket-Protocol", HTTPHeaderName::SecWebSocketProtocol},
#line 176 "HTTPHeaderNames.gperf"
    {"Content-Disposition", HTTPHeaderName::ContentDisposition},
#line 183 "HTTPHeaderNames.gperf"
    {"Content-Security-Policy-Report-Only", HTTPHeaderName::ContentSecurityPolicyReportOnly},
#line 191 "HTTPHeaderNames.gperf"
    {"Cross-Origin-Resource-Policy", HTTPHeaderName::CrossOriginResourcePolicy},
#line 212 "HTTPHeaderNames.gperf"
    {"Ping-From", HTTPHeaderName::PingFrom},
#line 249 "HTTPHeaderNames.gperf"
    {"X-Temp-Tablet", HTTPHeaderName::XTempTablet},
#line 239 "HTTPHeaderNames.gperf"
    {"Transfer-Encoding", HTTPHeaderName::TransferEncoding},
#line 220 "HTTPHeaderNames.gperf"
    {"Refresh", HTTPHeaderName::Refresh},
#line 215 "HTTPHeaderNames.gperf"
    {"Proxy-Authorization", HTTPHeaderName::ProxyAuthorization},
#line 167 "HTTPHeaderNames.gperf"
    {"Access-Control-Allow-Origin", HTTPHeaderName::AccessControlAllowOrigin},
#line 237 "HTTPHeaderNames.gperf"
    {"Timing-Allow-Origin", HTTPHeaderName::TimingAllowOrigin},
#line 207 "HTTPHeaderNames.gperf"
    {"Last-Event-ID", HTTPHeaderName::LastEventID},
#line 241 "HTTPHeaderNames.gperf"
    {"Upgrade-Insecure-Requests", HTTPHeaderName::UpgradeInsecureRequests},
#line 229 "HTTPHeaderNames.gperf"
    {"Server-Timing", HTTPHeaderName::ServerTiming},
#line 169 "HTTPHeaderNames.gperf"
    {"Access-Control-Max-Age", HTTPHeaderName::AccessControlMaxAge},
#line 190 "HTTPHeaderNames.gperf"
    {"Cross-Origin-Opener-Policy-Report-Only", HTTPHeaderName::CrossOriginOpenerPolicyReportOnly},
#line 225 "HTTPHeaderNames.gperf"
    {"Sec-WebSocket-Extensions", HTTPHeaderName::SecWebSocketExtensions},
#line 194 "HTTPHeaderNames.gperf"
    {"Default-Style", HTTPHeaderName::DefaultStyle},
#line 228 "HTTPHeaderNames.gperf"
    {"Sec-WebSocket-Version", HTTPHeaderName::SecWebSocketVersion},
#line 247 "HTTPHeaderNames.gperf"
    {"X-Frame-Options", HTTPHeaderName::XFrameOptions},
#line 201 "HTTPHeaderNames.gperf"
    {"If-Match", HTTPHeaderName::IfMatch},
#line 203 "HTTPHeaderNames.gperf"
    {"If-None-Match", HTTPHeaderName::IfNoneMatch},
#line 222 "HTTPHeaderNames.gperf"
    {"Sec-Fetch-Dest", HTTPHeaderName::SecFetchDest},
#line 231 "HTTPHeaderNames.gperf"
    {"Service-Worker-Allowed", HTTPHeaderName::ServiceWorkerAllowed},
#line 164 "HTTPHeaderNames.gperf"
    {"Access-Control-Allow-Credentials", HTTPHeaderName::AccessControlAllowCredentials},
#line 170 "HTTPHeaderNames.gperf"
    {"Access-Control-Request-Headers", HTTPHeaderName::AccessControlRequestHeaders},
#line 246 "HTTPHeaderNames.gperf"
    {"X-DNS-Prefetch-Control", HTTPHeaderName::XDNSPrefetchControl},
#line 223 "HTTPHeaderNames.gperf"
    {"Sec-Fetch-Mode", HTTPHeaderName::SecFetchMode},
#line 208 "HTTPHeaderNames.gperf"
    {"Last-Modified", HTTPHeaderName::LastModified},
#line 232 "HTTPHeaderNames.gperf"
    {"Service-Worker-Navigation-Preload", HTTPHeaderName::ServiceWorkerNavigationPreload},
#line 168 "HTTPHeaderNames.gperf"
    {"Access-Control-Expose-Headers", HTTPHeaderName::AccessControlExposeHeaders},
#line 165 "HTTPHeaderNames.gperf"
    {"Access-Control-Allow-Headers", HTTPHeaderName::AccessControlAllowHeaders},
#line 187 "HTTPHeaderNames.gperf"
    {"Cross-Origin-Embedder-Policy", HTTPHeaderName::CrossOriginEmbedderPolicy},
#line 171 "HTTPHeaderNames.gperf"
    {"Access-Control-Request-Method", HTTPHeaderName::AccessControlRequestMethod},
#line 202 "HTTPHeaderNames.gperf"
    {"If-Modified-Since", HTTPHeaderName::IfModifiedSince},
#line 205 "HTTPHeaderNames.gperf"
    {"If-Unmodified-Since", HTTPHeaderName::IfUnmodifiedSince},
#line 188 "HTTPHeaderNames.gperf"
    {"Cross-Origin-Embedder-Policy-Report-Only", HTTPHeaderName::CrossOriginEmbedderPolicyReportOnly},
#line 166 "HTTPHeaderNames.gperf"
    {"Access-Control-Allow-Methods", HTTPHeaderName::AccessControlAllowMethods}
  };

static const signed char lookup[] =
  {
    -1, -1, -1, -1, -1,  0, -1, -1, -1,  1,  2, -1, -1, -1,
     3,  4, -1, -1, -1, -1,  5, -1, -1, -1, -1,  6, -1, -1,
    -1, -1,  7, -1, -1, -1, -1,  8, -1, -1, -1, -1,  9, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, 11,
    -1, -1, -1, 12, 13, -1, -1, -1, -1, 14, -1, -1, -1, -1,
    15, -1, -1, -1, 16, -1, -1, -1, -1, 17, 18, -1, -1, -1,
    -1, 19, -1, -1, -1, -1, 20, -1, -1, -1, -1, 21, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 22, -1,
    -1, -1, -1, 23, -1, -1, -1, -1, 24, -1, -1, -1, -1, 25,
    -1, -1, -1, -1, 26, -1, -1, -1, -1, 27, -1, -1, -1, -1,
    28, -1, -1, -1, -1, 29, -1, -1, -1, -1, 30, -1, -1, -1,
    -1, 31, -1, -1, -1, -1, 32, -1, -1, -1, -1, 33, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, 34, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 35,
    -1, -1, -1, -1, 36, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    37, -1, -1, -1, -1, 38, -1, -1, -1, 39, 40, -1, -1, -1,
    -1, 41, -1, -1, -1, -1, -1, -1, -1, -1, -1, 42, -1, -1,
    -1, -1, 43, -1, -1, 44, -1, -1, -1, -1, -1, -1, 45, -1,
    -1, -1, -1, 46, -1, -1, -1, 47, 48, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 49, 50, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 51, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 52, -1, -1, -1, -1, 53, -1, -1,
    -1, 54, 55, -1, -1, -1, -1, -1, -1, -1, -1, -1, 56, -1,
    -1, -1, -1, 57, -1, -1, -1, -1, 58, -1, -1, -1, -1, 59,
    -1, -1, -1, -1, 60, -1, -1, -1, -1, 61, -1, -1, -1, -1,
    62, -1, -1, -1, -1, 63, -1, -1, -1, -1, 64, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 65, -1, -1,
    -1, -1, 66, -1, -1, -1, -1, -1, -1, -1, -1, -1, 67, -1,
    -1, -1, -1, 68, -1, -1, -1, -1, 69, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 70, 71, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    72, 73, -1, -1, -1, -1, 74, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 75, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 76, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 77, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, 78, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, 79, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, 80, -1, -1, -1, -1, 81, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 82, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, 83, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 84, -1, -1,
    -1, -1, 85, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, 86, -1, -1, -1, -1, 87,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 88, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 89, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, 90, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, 91
  };

const struct HeaderNameHashEntry *
HTTPHeaderNamesHash::findHeaderNameImpl (register const char *str, register unsigned int len)
{
  if (len <= MAX_WORD_LENGTH && len >= MIN_WORD_LENGTH)
    {
      unsigned int key = header_name_hash_function (str, len);

      if (key <= MAX_HASH_VALUE)
        {
          register int index = lookup[key];

          if (index >= 0)
            {
              register const char *s = header_name_wordlist[index].name;

              if ((((unsigned char)*str ^ (unsigned char)*s) & ~32) == 0 && !gperf_case_strncmp (str, s, len) && s[len] == '\0')
                return &header_name_wordlist[index];
            }
        }
    }
  return 0;
}
#line 251 "HTTPHeaderNames.gperf"

bool findHTTPHeaderName(StringView stringView, HTTPHeaderName& headerName)
{
    unsigned length = stringView.length();
    if (length > maxHTTPHeaderNameLength || length < minHTTPHeaderNameLength)
        return false;

    if (stringView.is8Bit()) {
        if (auto nameAndString = HTTPHeaderNamesHash::findHeaderNameImpl(reinterpret_cast<const char*>(stringView.characters8()), length)) {
            headerName = nameAndString->headerName;
            return true;
        }
    } else {
        LChar characters[maxHTTPHeaderNameLength];
        for (unsigned i = 0; i < length; ++i) {
            UChar character = stringView.characters16()[i];
            if (!isASCII(character))
                return false;
                
            characters[i] = static_cast<LChar>(character);
        }
        
        if (auto nameAndString = HTTPHeaderNamesHash::findHeaderNameImpl(reinterpret_cast<const char*>(characters), length)) {
            headerName = nameAndString->headerName;
            return true;
        }
    }

    return false;
}

StringView httpHeaderNameString(HTTPHeaderName headerName)
{
    ASSERT(static_cast<unsigned>(headerName) < numHTTPHeaderNames);
    
    const auto& name = headerNameStrings[static_cast<unsigned>(headerName)];
    
    return StringView { reinterpret_cast<const LChar*>(name.name), static_cast<unsigned>(name.length) };
}

} // namespace WebCore

#if defined(__clang__)
IGNORE_WARNINGS_END
#endif
