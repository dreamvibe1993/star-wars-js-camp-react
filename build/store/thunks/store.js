import { configureStore } from "@reduxjs/toolkit";
import { reducer } from './reducer';
export var store = configureStore({ reducer: reducer });
