const initialState = {
    profile:{},
    profiles:{},
    searchProfile:{}
}



export const profileReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_CURRENT_PROFILE":
            return {
                ...state,
                profile:action.payload
            }
        case "SET_SEARCH_PROFILE":
            return{
                ...state,
                searchProfile:action.payload
            }
           
        
        default:
            return state
    }
}