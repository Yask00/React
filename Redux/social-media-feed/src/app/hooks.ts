// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// React-Redux 9.1 includes .withTypes() methods that apply the right types to those hooks.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();