//@ts-ignore
import cookie from 'cookie';

export const state = {
      loggedIn:false,
      user:{
        email: "",
    password: ""
      },

}

interface StateAuth{
  loggedIn:boolean,
  user:any
}

export const getters = {
    isAuthenticated  (state:StateAuth) {
      return state.loggedIn
    },
  
    loggedInUser(state:StateAuth) {
      return state.user
    }
  }

  export const mutations = {
    setUser(state:StateAuth,payload:any) {
      state.user= payload
     
    },
    setLoggedIn(state:StateAuth,payload:boolean) {
        state.loggedIn = payload
       
      },
     
        
      authlogout (state:StateAuth) {
          
           cookie.remove('isAuht')
           cookie.remove('Auht')
          },
  
  }

  export const actions = {
    nuxtServerInit ({ commit }:any, { req }:any) {    
          if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie);
        console.log("Auht",typeof cookies.Auth)  
        if (cookies.isAuth && JSON.parse(cookies.isAuth) === true) {
          commit('setLoggedIn',true)
          commit('setUser', JSON.parse(cookies.Auth))
        }
      
      }
    },
    logout ({ commit }:any) {
      commit('authlogout')
    },
  }

  
 