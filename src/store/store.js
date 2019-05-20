/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {},
        isLogin: false,
    },
    mutations: {
        loginUser(state, data){
            state.user = data;
            state.isLogin = (data != null && data != {})
        },
        userLogout(state) {
            state.user = {}
            state.isLogin = false
        }
        // [types.LOGOUT]: (state) => {
        //     localStorage.removeItem('token');
        //     state.token = null
        // },
    }
})