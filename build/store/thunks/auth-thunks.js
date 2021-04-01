var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as AuthAPI from '../../api/services/auth';
export var UserSignInStatus;
(function (UserSignInStatus) {
    UserSignInStatus[UserSignInStatus["Pending"] = 2] = "Pending";
    UserSignInStatus[UserSignInStatus["Authorised"] = 1] = "Authorised";
    UserSignInStatus[UserSignInStatus["Unauthorised"] = 0] = "Unauthorised";
})(UserSignInStatus || (UserSignInStatus = {}));
export var authStateReducer = createSlice({
    name: 'authState',
    initialState: {
        isUserSignedIn: UserSignInStatus.Pending,
        passwordErrorCodeMsg: null,
        emailErrorCodeMsg: null,
        userEmail: null,
    },
    reducers: {
        signUserIn: function (state) {
            state.isUserSignedIn = UserSignInStatus.Authorised;
        },
        signUserOut: function (state) {
            state.isUserSignedIn = UserSignInStatus.Unauthorised;
        },
        setPassErrMsg: function (state, action) {
            state.passwordErrorCodeMsg = action.payload;
        },
        setEmailErrMsg: function (state, action) {
            state.emailErrorCodeMsg = action.payload;
        },
        setUserEmailString: function (state, action) {
            state.userEmail = action.payload;
        },
        flushAllErrCodes: function (state) {
            state.emailErrorCodeMsg = null;
            state.passwordErrorCodeMsg = null;
            state.userEmail = null;
        },
    },
});
export var signUserIn = (_a = authStateReducer.actions, _a.signUserIn), signUserOut = _a.signUserOut, setPassErrMsg = _a.setPassErrMsg, setEmailErrMsg = _a.setEmailErrMsg, setUserEmailString = _a.setUserEmailString, flushAllErrCodes = _a.flushAllErrCodes;
export var signIn = createAsyncThunk('auth/signIn', function (_a, thunkAPI) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    thunkAPI.dispatch(flushAllErrCodes());
                    return [4 /*yield*/, AuthAPI.userSignIn(email, password)
                            .catch(function (err) {
                            if (err.code === 'auth/user-not-found') {
                                thunkAPI.dispatch(setEmailErrMsg(err.message));
                            }
                            else if (err.code === 'auth/wrong-password') {
                                thunkAPI.dispatch(setPassErrMsg(err.message));
                            }
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
export var signCurrentUserOut = createAsyncThunk('auth/signOut', function (id, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                thunkAPI.dispatch(flushAllErrCodes());
                return [4 /*yield*/, AuthAPI.userSignOut()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
export var createUserAccount = createAsyncThunk('auth/create', function (_a, thunkAPI) {
    var email = _a.email, password = _a.password;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    thunkAPI.dispatch(flushAllErrCodes());
                    return [4 /*yield*/, AuthAPI.createUser(email, password)
                            .catch(function (err) {
                            thunkAPI.dispatch(setEmailErrMsg(err.message));
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
