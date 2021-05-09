import { Get_PROFILE, Profile_Error, Clear_profile, Update_Profile, Get_PROFILES, Get_Repos } from '../actions/types'
const intialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}
export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case Get_PROFILE:
    case Update_Profile:
      return {
        ...state,
        profile: payload,
        loading: false
      }
    case Get_PROFILES:
      return {
        ...state,
        loading: false,
        profiles: payload
      }
    case Get_Repos:
      return {
        ...state,
        repos: payload,
        loading: false
      }
    case Profile_Error:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case Clear_profile:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: []
      }
    default:
      return state;

  }

}