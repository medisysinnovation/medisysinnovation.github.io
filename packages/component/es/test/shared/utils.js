import _regeneratorRuntime from '@babel/runtime/regenerator';

var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }

    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }

      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

import MockDate from 'mockdate';
import { act } from 'react-dom/test-utils';
export function setMockDate() {
  var dateString =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : '2017-09-18T03:30:07.795';
  MockDate.set(dateString);
}
export function resetMockDate() {
  MockDate.reset();
}
var globalTimeout = global.setTimeout;
export var sleep = function sleep() {
  var timeout =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return __awaiter(
    void 0,
    void 0,
    void 0,
    /*#__PURE__*/ _regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return act(function() {
                return __awaiter(
                  void 0,
                  void 0,
                  void 0,
                  /*#__PURE__*/ _regeneratorRuntime.mark(function _callee() {
                    return _regeneratorRuntime.wrap(function _callee$(
                      _context,
                    ) {
                      while (1) {
                        switch ((_context.prev = _context.next)) {
                          case 0:
                            _context.next = 2;
                            return new Promise(function(resolve) {
                              return globalTimeout(resolve, timeout);
                            });

                          case 2:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    },
                    _callee);
                  }),
                );
              });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2);
    }),
  );
};
