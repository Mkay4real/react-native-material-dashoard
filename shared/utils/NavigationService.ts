import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const _navigator = React.createRef<any>();

function navigate(name: string, params?: any) {
	_navigator.current?.navigate(name, params);
}

function reset(route: string, params?: object | undefined) {
	_navigator.current?.dispatch({
		...StackActions.replace(route, params)
	});
}

function pop(n=1) {
	const popAction = StackActions.pop(n);
	_navigator.current?.dispatch(popAction);
}

function popToTop(){
  _navigator.current?.dispatch(StackActions.popToTop());
}

export default {
  navigate,
  reset,
  pop,
  popToTop
};
